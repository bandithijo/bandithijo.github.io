---
layout: 'post'
title: "Mengkonfigurasi Fitur Hibernasi pada Arch Linux"
date: '2020-06-22 07:20'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Arch Linux']
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

```
$ sudo dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress
```

Saya mendefinisikan Swapfile sebesar **2048M** atau 2G. Kapasitas RAM saya sebesar 4G.

Besar dari Swapfile, tergantung dari kebutuhan teman-teman.

Perintah di atas akan membuat Swapfile `/swapfile` pada root direktori.


### Merubah permission dari swapfile

Swap space dapat menjadi lubang keamanan yang besar pada sistem kita, karena itu kita perlu menutup segala macam akses selain root.

```
$ sudo chmod 600 /swapfile
```


### Format Swapfile

Sebelum dapat digunakan, kita perlu memformat `/swapfile` menjadi berformat swap.

```
$ sudo mkswap /swapfile
```


### Mengaktifkan Swapfile

Setelah semua langkah di atas sudah dilakukan, Swapfile tidak langsung aktif. Selaaknya swap partition, kita perlu mengaktifkannya terlebih dahulu.

```
$ sudo swapon /swapfile
```


## Tambahkan Swapfile pada /etc/fstab

Agar Swapfile sudah enable otomatis saat sistem startup, kita perlu menambahkan pada `/etc/fstab`.

```bash
!filename: /etc/fstab
# <file system> <dir> <type> <options> <dump> <pass>
# /dev/sda1
UUID=00000000-0000  /     ext4  rw,noatime   0 1

# Swapfile
/swapfile           none  swap  defaults     0 0
```


## Edit Kernel Module

Kita perlu menambahkan `resume` dan `resume_offset`. Karena saya menggunakan Grub, maka saya akan menambahkan pada file `/etc/default/grub`.

```bash
!filename: /etc/default/grub
# GRUB boot loader configuration

GRUB_DEFAULT=saved
GRUB_TIMEOUT=0
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 resume=/dev/sda1 resume_offset=7049216"
GRUB_CMDLINE_LINUX=""
```

Perhatikan bagian yang saya marking.

`resume=/dev/sda1` adalah blok dimana terdapat file `/swapfile`.

`resume_offset=7049216` didapatkan dengan cara menjalankan perintah di bawah.

```
$ sudo filefrag -v /swapfile
```

```
Filesystem type is: ef53
File size of /swapfile is 2147483648 (524288 blocks of 4096 bytes)
 ext:     logical_offset:        physical_offset: length:   expected: flags:
   0:        0..    2047:    7049216..   7051263:   2048:
   1:     2048..    6143:    7045120..   7049215:   4096:    7051264:
   2:     6144..  284671:    7061504..   7340031: 278528:    7049216:
   3:   284672..  409599:    7372800..   7497727: 124928:    7340032:
   ---------------------------- dipotong ---------------------------
   8:   516096..  518143:    7680000..   7682047:   2048:    7675904:
   9:   518144..  524287:    7684096..   7690239:   6144:    7682048: last,eof
/swapfile: 10 extents found
```

Ambil value pertama dari `physical_offset` yaitu `7049216`.

Karena kita baru saja mengedit dan menambahkan module, kita perlu mengupdate Grub.

```
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```


## Edit mkinitcpio

Kita perlu menambahkan `resume` hook pada startup hook di mkinitcpio. Hal ini akan memastikan sistem dapat kembali dari proses hibernasi.

Edit file `/etc/mkinitcpio.conf` dan cari baris berawalan `HOOKS="base ... "`.

```bash
!filename: /etc/mkinitcpio.conf
# HOOKS
# This is the most important setting in this file.  The HOOKS control the
# modules and scripts added to the image, and what happens at boot time.
# Order is important, and it is recommended that you do not change the
# order in which HOOKS are added.  Run 'mkinitcpio -H &lt;hook name&gt;' for
# help on a given hook.
...
...
HOOKS=(base systemd resume autodetect modconf block filesystems keyboard fsck)
```

Saya mengganti `udev` hook dengan `systemd` hook. Jadi jangan binggung. Tambahkan saja setelah `udev` atau `systemd` -- sebelum `autodetect` hook.

Setelah kita memodifikasi mkinitcpio, kita perlu mengenerate ulang kembali.

```
$ sudo mkinitcpio -p linux
```

`linux` sesuaikan dengan image kernel yang teman-teman pergunakan. Misalkan menggunakan kernel `linux-lts` maka gunakan `-p linux-lts`.

Selesai.

> INFO
> 
> Kalau yang menggunakan init sistem selain **systemd**, tetap dapat menggunakan **udev** di dalam HOOKS.
> 
> Saya sudah mencobanya dengan OpenRC, dan berhasil.


# Demonstrasi Hasil

{% youtube y0h6pbkrITo %}


# Referensi

1. [wiki.archlinux.org/index.php/Swap](https://wiki.archlinux.org/index.php/Swap)
<br>Diakses tanggal: 2020/06/22

2. [All about Linux swap space](https://www.linux.com/news/all-about-linux-swap-space/)
<br>Diakses tanggal: 2020/06/22

2. [Archlinux enabling hibernation](http://blog.programmableproduction.com/2016/02/22/ArchLinux-Powermanagement-Setting-Hibernate/)
<br>Diakses tanggal: 2020/06/22
