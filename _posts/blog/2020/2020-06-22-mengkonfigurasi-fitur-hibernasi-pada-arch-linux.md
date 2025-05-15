---
layout: 'post'
title: "Mengkonfigurasi Fitur Hibernasi pada Arch Linux"
date: 2020-06-22 07:20
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips', 'Arch Linux']
pin:
hot:
contributors: []
description: "Hibernasi terkadang memang tidak langsung berjalan out of the box, kita perlu untuk mengaturnya sendiri. Catatan ini mungkin dapat membantu teman-teman mengkonfigurasi hibernasi di Arch Linux."
---

# Pendahuluan

Fitur hibernasi (*hybernation*) tidak secara otomatis akan aktif apabila kita beru memasang Arch Linux. Kita perlu untuk melakukan konfigurasi terlebih dahulu agar fitur hibernasi dapat kita nikmati.

**Susah ndak, Bang?**

Kagak, Bro. Mudah banget.

# Konfigurasi

## Membuat Swap Space

Ada beberapa metode dalam membuat swap space, seperti **swap partition**, **swapfile**. Silahkan merujuk ke Arch Wiki untuk membaca lebih lanjut. Pada post kali ini saya akan mendemonstrasikan menggunakan swapfile.

### Membuat Swapfile

Saya menggunakan Swapfile pada filesystem **ext4**. Untuk teman-teman yang menggunakan filesystem yang lain seperti **BTRFS** atau yang lainnya, saya sarankan untuk melakukan eksplorasi lebih jauh.

{% shell_user %}
sudo dd if=/dev/zero of=/swapfile bs=1M count=<mark>2048</mark> status=progress
{% endshell_user %}

Saya mendefinisikan Swapfile sebesar **2048M** atau 2G. Kapasitas RAM saya sebesar 4G.

Besar dari Swapfile, tergantung dari kebutuhan teman-teman.

Perintah di atas akan membuat Swapfile `/swapfile` pada root direktori.

### Merubah permission dari swapfile

Swap space dapat menjadi lubang keamanan yang besar pada sistem kita, karena itu kita perlu menutup segala macam akses selain root.

{% shell_user %}
sudo chmod 600 /swapfile
{% endshell_user %}

### Format Swapfile

Sebelum dapat digunakan, kita perlu memformat `/swapfile` menjadi berformat swap.

{% shell_user %}
sudo mkswap /swapfile
{% endshell_user %}

### Mengaktifkan Swapfile

Setelah semua langkah di atas sudah dilakukan, Swapfile tidak langsung aktif. Selaaknya swap partition, kita perlu mengaktifkannya terlebih dahulu.

{% shell_user %}
sudo swapon /swapfile
{% endshell_user %}

## Tambahkan Swapfile pada /etc/fstab

Agar Swapfile sudah enable otomatis saat sistem startup, kita perlu menambahkan pada `/etc/fstab`.

{% highlight_caption /etc/fstab %}
{% pre_caption %}
# &lt;file system&gt; &lt;dir&gt; &lt;type&gt; &lt;options&gt; &lt;dump&gt; &lt;pass&gt;
# /dev/sda1
UUID=00000000-0000  /     ext4  rw,noatime   0 1

# Swapfile
<mark>/swapfile           none  swap  defaults     0 0</mark>
{% endpre_caption %}

## Edit Kernel Module

Kita perlu menambahkan `resume` dan `resume_offset`. Karena saya menggunakan Grub, maka saya akan menambahkan pada file `/etc/default/grub`.

{% highlight_caption /etc/default/grub %}
{% pre_caption %}
# GRUB boot loader configuration

GRUB_DEFAULT=saved
GRUB_TIMEOUT=0
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 <mark>resume=/dev/sda1 resume_offset=7049216</mark>"
GRUB_CMDLINE_LINUX=""
{% endpre_caption %}

Perhatikan bagian yang saya marking.

`resume=/dev/sda1` adalah blok dimana terdapat file `/swapfile`.

`resume_offset=7049216` didapatkan dengan cara menjalankan perintah di bawah.

{% shell_user %}
sudo filefrag -v /swapfile
{% endshell_user %}

<pre>
Filesystem type is: ef53
File size of /swapfile is 2147483648 (524288 blocks of 4096 bytes)
 ext:     logical_offset:        physical_offset: length:   expected: flags:
   0:        0..    2047:    <mark>7049216</mark>..   7051263:   2048:
   1:     2048..    6143:    7045120..   7049215:   4096:    7051264:
   2:     6144..  284671:    7061504..   7340031: 278528:    7049216:
   3:   284672..  409599:    7372800..   7497727: 124928:    7340032:
   ---------------------------- dipotong ---------------------------
   8:   516096..  518143:    7680000..   7682047:   2048:    7675904:
   9:   518144..  524287:    7684096..   7690239:   6144:    7682048: last,eof
/swapfile: 10 extents found
</pre>

Ambil value pertama dari `physical_offset`.

Karena kita baru saja mengedit dan menambahkan module, kita perlu mengupdate Grub.

{% shell_user %}
sudo grub-mkconfig -o /boot/grub/grub.cfg
{% endshell_user %}

## Edit mkinitcpio

Kita perlu menambahkan `resume` hook pada startup hook di mkinitcpio. Hal ini akan memastikan sistem dapat kembali dari proses hibernasi.

Edit file `/etc/mkinitcpio.conf` dan cari baris berawalan `HOOKS="base ... "`.

{% highlight_caption /etc/mkinitcpio.conf %}
{% pre_caption %}
# HOOKS
# This is the most important setting in this file.  The HOOKS control the
# modules and scripts added to the image, and what happens at boot time.
# Order is important, and it is recommended that you do not change the
# order in which HOOKS are added.  Run 'mkinitcpio -H &lt;hook name&gt;' for
# help on a given hook.
...
...
HOOKS=(base systemd <mark>resume</mark> autodetect modconf block filesystems keyboard fsck)
{% endpre_caption %}

Saya mengganti `udev` hook dengan `systemd` hook. Jadi jangan binggung. Tambahkan saja setelah `udev` atau `systemd` -- sebelum `autodetect` hook.

Setelah kita memodifikasi mkinitcpio, kita perlu mengenerate ulang kembali.

{% shell_user %}
sudo mkinitcpio -p <mark>linux</mark>
{% endshell_user %}

`linux` sesuaikan dengan image kernel yang teman-teman pergunakan. Misalkan menggunakan kernel `linux-lts` maka gunakan `-p linux-lts`.

Selesai.

{% box_info %}
<p markdown=1>Kalau yang menggunakan init sistem selain **systemd**, tetap dapat menggunakan **udev** di dalam HOOKS.</p>
<p>Saya sudah mencobanya dengan OpenRC, dan berhasil.</p>
{% endbox_info %}

# Demonstrasi Hasil

{% youtube y0h6pbkrITo %}









# Referensi

1. [wiki.archlinux.org/index.php/Swap](https://wiki.archlinux.org/index.php/Swap){:target="_blank"}
<br>Diakses tanggal: 2020/06/22

2. [All about Linux swap space](https://www.linux.com/news/all-about-linux-swap-space/){:target="_blank"}
<br>Diakses tanggal: 2020/06/22

2. [Archlinux enabling hibernation](http://blog.programmableproduction.com/2016/02/22/ArchLinux-Powermanagement-Setting-Hibernate/){:target="_blank"}
<br>Diakses tanggal: 2020/06/22
