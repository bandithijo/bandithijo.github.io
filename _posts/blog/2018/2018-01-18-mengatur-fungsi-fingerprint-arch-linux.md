---
layout: "post"
title: "Mengatur Fungsi dari Fingerprint pada Arch Linux"
date: "2018-01-18"
permalink: "/blog/:title"
assets: "/assets/images/posts/2018/2018-01-18-mengatur-fungsi-fingerprint-arch-linux"
author: "BanditHijo"
category: "blog"
tags: ["thinkpad", "fingerprint"]
description: "Kelebihan memiliki ThinkPad adalah terdapat fingerprint scanner module. Apakah di GNU/Linux fingerprint scanner dapat kita gunakan? Tentu saja! Saya menggunakannya setiap hari untuk authentication sudo dan unlock screenlock."
---

![Banner]({{ site.baseurl }}{{ page.assets }}/Default+Header+Template+Post+2X.png)


## Latar Belakang

Untuk dapat menggunakan _fingerprint scanner_, terlebih dahulu kalian harus memastikan apakah tipe dari _fingerprint scanner_ yang kalian miliki telah didukung atau tidak. Kalian dapat melakukan pengecekan dengan mengunjungi link berikut ini: [libfprint_supported_devices](https://www.freedesktop.org/wiki/Software/fprint/libfprint/Supported_devices/).

_FingerPrint scanner_ dapat digunakan secara _plug and play_ pada Arch Linux (dan beberapa distro tertentu yang saya sudah coba seperti Fedora) diatur oleh _fprint project_. Idenya adalah untuk membuat _built-in fingerprint scanner_ pada beberapa jenis laptop dapat melakukan _login_ dengan memanfaatkan [PAM](https://wiki.archlinux.org/index.php/PAM) (_Pluggable Authentication Modules_).


## Prasyarat

Untuk mengetahui tipe dan _brand_ dari _fingerprint scanner_ yang kalian miliki, gunakan _command_ berikut ini,

```
$ lsusb
```

```
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 004: ID 138a:0017 Validity Sensors, Inc. VFS 5011 fingerprint sensor 👈
Bus 001 Device 003: ID 04f2:b52c Chicony Electronics Co., Ltd
Bus 001 Device 005: ID 046d:c52b Logitech, Inc. Unifying Receiver
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Dari keterangan di atas dapat terlihat bahwa _fingerprint_ saya ada pada baris kedua.


## Instalasi

Untuk dapat menggunakan _fingerprint scanner_, kalian membutuhkan paket bernama [fprintd](https://www.archlinux.org/packages/?name=fprintd). Mungkin beberapa paket lain seperti [imagemagick](https://www.archlinux.org/packages/?name=imagemagick) juga akan diperlukan sebagai dependensi.

```
$ sudo pacman -S fprintd libfprint
```

**libfprint** adalah dependensi sari **fprintd**.


## Konfigurasi

Setelah melakukan instalasi paket fprintd, lantas kita perlu melakukan beberapa konfigurasi. Kalian dapat memilih konfigurasi-konfigurasi apa saja yang kalian perlukan dari beberapa konfigurasi yang saya lakukan di bawah ini. Tidak harus semua dilakukan, pilih saja yang kalian butuhkan.


### Login

Untuk kalian yang menggunakan Gnome 3.26, _login manager_ diatur oleh GDM. Apabila kalian ingin menggunakan _fingerprint scanner_ untuk _login_ pada GDM, kalian dapat mengikuti langkah ini. Gnome sudah menyediakan _fingerprint option_ yang dapat kalian atur pada **Settings > Details > Users**. Kalian akan melihat window seperti di bawah ini,

![Gambar 1]({{ site.baseurl }}{{ page.assets }}/gambar_1.png)

Gambar 1. Settings > Details > Users

Kalian dapat melihat pada Gambar 1, terdapat _Fingerprint Login option_ dengan nilai “_Enabled_”. Bagi teman-teman yang belum melakukan konfigurasi maka akan tertulis “_Disabled_”.

Untuk dapat mengaktifkan _fingerprint login_, kalian perlu membuka kunci dari Settings dengan meng-klik tombol “_Unlock_” yang terdapat pada _top bar window Settings_ terlebih dahulu. Kemudian pilih _Fingerprint Login_, dan ikuti petunjuk untuk melakukan _enroll_ terhadap sidik jari kalian.

> PERHATIAN!
> 
> Apabila fingerprint option tidak terdapat pada menu Settings, kalian dapat menambahkan username kalian ke dalam input group.
> 
> Dengan cara,
> 
> ```
> $ sudo usermod -aG input username
> ```
> 
> Ganti username dengan nama username kalian.

> PERTANYAAN?
> 
> Apakah penulis juga menggunakan fingerprint scanner saat login?
> 
> Saya sendiri, menggunakan LightDM untuk login kedalam i3wm, dan saya tidak mengatur option fingerprint scanner untuk login ke dalam sistem. Karena alasan tertentu yang berhubungan dengan dekripsi direktori tertentu pada sistem, saya memilih untuk memasukkan password secara manual.
> 
> Lagipula memasukkan password pada login manager juga tidak sering kita lakukan seperti halnya memasukkan password sudo atau permission yang lainnnya. Maka dari itu saya teteap memilih untuk memasukkan password login secara manual. Hehehe 😁


### Membuat Fingerprint Signature secara Manual

Bagi teman-teman yang tidak menggunakan Gnome seperti di atas, Ada 2 cara untuk membuat _signature_ sidik jari kalian, yaitu dengan _signature_ hanya 1 jari dan _signature_ dengan semua jari (banyak jari).


#### Satu Jari (satu jari tertentu)

Untuk menambahkan _signature_ 1 jari, defaultnya adalah telunjuk kanan.

```
$ fprintd-enroll username
```

\* Ganti `username` dengan nama _username_ kamu.

Untuk jari tertentu, gunakan flag `-f` dikuti nama jarinya.

Berikut ini daftar nama jari.

| Left Fingers | Right Fingers |
| :-- | :-- |
| left-thumb | right-thumb |
| left-index-finger | right-index-finger |
| left-middle-finger | right-middle-finger |
| left-ring-finger | right-ring-finger |
| left-little-finger | right-little-finger |

```
$ fprintd-enroll username -f nama_jari
```


#### Semua Jari (10 jari)

Atau, dengan membuat baru _signature_ untuk semua jari, namun terlebih dahulu kita perlu menghapus _signature_ yang sudah kita buat sebelumnya,

```
$ fprintd-delete username
```

\* Ganti `username` dengan nama _username_ kamu.

Selanjutnya, langkah memasukkan _signature_ untuk semua jari,

```
$ for finger in {left,right}-{thumb,{index,middle,ring,little}-finger}; do fprintd-enroll -f $finger username; done
```

\* Ganti `username` dengan nama username kamu.

Kemudian, kalian akan diminta memasukkan 10 sidik jari dengan masing-masing 3x scan setiap jari.


### Konfirmasi Fingerprint

Setelah kita mendaftarkan sidik jari, kita perlu melakukan konfirmasi, apakah sidik jari yang usdah kita inputkan dapat digunakan atau tidak.

```
$ fprintd-verify username
```

```
Using device /net/reactivated/Fprint/Device/0
Listing enrolled fingers:
 - #0: right-index-finger
```

Nah, kita diminta untuk melakukan scanning terhadap jari yang dimaksud.

Apabila benar, akan keluar tampilan seperti ini.

```
Verify result: verify-match (done)
```


### Mengamankan FingerPrint Signature

Secara _default_, hasil _enroll_ dari _fingerprint scanner_ yang sudah kita buat dapat dengan mudah ditimpa dengan yang baru atau dihapus dengan perintah `$ fprintd-delete`, tanpa perlu terlebih dahulu menggunakan `sudo` _permission_. Kalian dapat mengubah aturan ini dengan memanfaatkan pengaturan pada _Polkit rules_.

Kita akan membuat file baru pada `/etc/polkit-1/rules.d/` dengan isi hanya _superuser_ yang dapat melakukan perubahan pada _fingerprint signature_.

```
$ sudo vim /etc/polkit-1/rules.d/50-net.reactivated.fprint.device.enroll.rules
```

```bash
!filename: /etc/polkit-1/rules.d/50-net.reactivated.fprint.device.enroll.rules
polkit.addRule(function (action, subject) {
    if (action.id == "net.reactivated.fprint.device.enroll") {
        return subject.user == "root" ? polkit.Result.YES : polkit.result.NO
    }
})
```

Sekarang, untuk melakukan _enroll fingerprint_ harus **membutuhkan _sudo permission_ terlebih dahulu**.


#### PAM

Untuk menggunakan _fingerprint scanner_ pada saat Terminal meminta kita memasukan _password sudo_, atau saat sistem meminta kita memasukkan _password Polkit_, kita perlu mengedit dan melakukan penambahan beberapa baris perintah pada isi dari file-file yang terdapat pada direktori `/etc/pam.d/` berikut ini.


#### Sudo

Untuk menggunakan _fingerprint_ pada saat menggunakan `sudo`,

```
$ sudo vim /etc/pam.d/sudo
```

```bash
!filename: /etc/pam.d/sudo
#%PAM-1.0

auth  	 sufficient  pam_unix.so try_first_pass likeauth nullok
auth     sufficient  pam_fprintd.so

auth     include    system-auth
account  include    system-auth
session  include    system-auth
```

Letakkan pada bagian atas dari aturan (*rules*) yang sudah ada sebelumnya.

Tujuannya agar kita diminta untuk memasukkan password terlebih dahulu, apabila gagal, baru kita akan diminta fingerprint.

Kalau tidak ingin menginputkan password, langsung saja tekan <kbd>Enter</kbd> untuk melewati inputan password dan langsung ke permintaan fingerprint.

![Gambar 1]({{ site.url }}{{ page.assets }}/gambar-01.gif)


#### Polkit

Untuk menggunakan _fingerprint_ pada saat ada aplikasi GUI yang membutuhkan akses _superuser_ dengan bantuan _Polkit_,

```
$ sudo vim /etc/pam.d/polkit-1
```

```bash
!filename: /etc/pam.d/polkit-1
#%PAM-1.0

auth      sufficient  pam_fprintd.so
auth      include     system-auth
account   include     system-auth
password  include     system-auth
session   include     system-auth
```

Demonya begini,

![Gambar 2]({{ site.url }}{{ page.assets }}/gambar-02.gif)


#### i3lock

Untuk membuka i3lock dengan menggunakan _fingerprint scanner_,

```
$ sudo vim /etc/pam.d/i3lock
```

```bash
!filename: /etc/pam.d/i3lock
#
# PAM configuration file for the i3lock-color screen locker. By default, it includes
# the 'system-auth' configuration file (see /etc/pam.d/system-auth) for Arch and Gentoo
# and 'login' for Debian. Note that vanilla i3lock upstream uses 'login' instead.
#

#auth   include      system-auth     # For Arch/Gentoo
#auth   include      login           # For Debian

auth   sufficient   pam_unix.so    try_first_pass likeauth nullok
auth   sufficient   pam_fprintd.so
```

\* Disable isi sebelumnya dengan menambahkan tanda `#` pada awal baris, kemudian tambahkan 3 baris di bawahnya, seperti contoh di atas.

Untuk dapat menggunakannya, saat i3lock sudah aktif, terlebih dahulu kita harus menekan tombol <kbd>Enter</kbd>, maka _fingerprint scanner_ akan aktif, kemudian _unlock_ i3lock dengan melakukan _enroll fingerprint_.

![Gambar 3]({{ site.url }}{{ page.assets }}/gambar-03.gif)


## Referensi

1. [wiki.archlinux.org/index.php/Fprint](https://wiki.archlinux.org/index.php/Fprint) \
   Diakses tanggal: 2018-01-18

1. [bbs.archlinux.org/viewtopic.php?id=176181](https://bbs.archlinux.org/viewtopic.php?id=176181) \
   Diakses tanggal: 2018-01-18
