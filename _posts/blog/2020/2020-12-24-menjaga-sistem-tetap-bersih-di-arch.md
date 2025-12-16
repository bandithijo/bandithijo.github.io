---
layout: "post"
title: "Menjaga Sistem Tetap Bersih di Arch Linux"
date: "2020-12-24 12:23"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-12-24-menjaga-sistem-tetap-bersih-di-arch"
author: "BanditHijo"
category: "blog"
tags: ["pacman"]
description: "Kita mungkin gak sadar, kalau banyak cache yang menumpuk di sistem kita. Apalagi kalau kita tidak pernah membersihkannya, bisa mencapai ukuran Giga, loh! Berikut ini catatan yang mungkin dapat membantu teman-teman membersihkan cache agar sistem kita tetap bersih dan masih banyak space yang dapat kita gunakan. Sayang kan, kalau space bergiga-giga hanya untuk cache yang beberapa diantaranya mungkin sudah tidak kita perlukan."
---

## Latar Belakang Masalah

Seiring berjalannya waktu, sistem yang kita gunakan pasti akan penuh dengan file-file cache dan log.

Mulai dari cache dan log proses instalasi package hingga log dari penggunaan sehari-hari.

Apabila dibiarkan, tentu saja hal ini akan menumpuk sedikit-demi sedikit lama-lama menjadi bukit. 😄

Sistem komputer bukanlah sebuah makhluk yang pintar, tentu saja kita perlu untuk memprogramkan terlebih dahulu agar sistem komputer dapat melakukan hal-hal sesuai dengan yang kita programkan. Termasuk membersihkan sampah-sampah yang sudah tidak terpakai.


## 1. Clean Package Cache (Pacman)

Secara default Arch akan menyimpan cache package hasil proses unduhan dari repositori. Tentu dengan maksud dan tujuan tertentu.

Namun, saya tidak memerlukan hal ini, karena saya dapat mengakses internet 24 jam. Apabila saya memerlukan versi sebelumnya, saya tinggal unduh lagi.

Arch menyimpan paket hasil unduhan dari repositori pada direktori ini.

```
$ ls /var/cache/pacman/pkg | less
```

Untuk memeriksa kapasitasnya gunakan perintah,

```
$ du -sh /var/cache/pacman/pkg
```

```
4.5G    /var/cache/pacman/pkg
```

Lihat, ini adalah besarnya cache dari package-package pacman yang ada di sistem saya yang sebenarnya tidak saya perlu-perlukan banget.

Kapasitas sebesar itu saya dapatkan dari proses migrasi Arch ke Artix, dimana saya memilih untuk mengunduh ulang semua pakcages kurang lebih sebanyak 2000an packages. 😄


### a. Clean Manually

```
$ sudo pacman -Sc
```

```
Packages to keep:
  All locally installed packages

Cache directory: /var/cache/pacman/pkg/
:: Do you want to remove all other packages from cache? [Y/n] y

removing old packages from cache...

Database directory: /var/lib/pacman/
:: Do you want to remove unused repositories? [Y/n] y

removing unused sync repositories...
```

`-c` berfungsi untuk menghapus "old packages" from cache.

Nah, kalau hanya menggunakan satu buah option c, yang terhapus hanya cache packet yang terbaru.

Untuk menghapus semuanya gunakan double option c.

```
$ sudo pacman -Scc
```

Ikuti langkah2nya dengan menekan huruf **y**.

Kemudian periksa lagi kapasitas direktori tersebut.

```
$ du -sh /var/cache/pacman/pkg
```

```
268K    /var/cache/pacman/pkg
```

```
$ ls /var/cache/pacman/pkg
```

```
total 0
```

Nah, sudah benar-benar bersih.

> INFO
> 
> Selain menggunaka **pacman**, untuk teman-teman yang menggunakan AUR Helper **yay**, dapat mengganti pacman dengan yay agar package cache dari yay yang terdapat pada direktori Home, ikut dibersihkan.


### b. Clean Automatically

Kita akan memasang script untuk membantu kita membersikan sistem secara otomatis.

```
$ sudo pacman -S pacman-contrib
```

Lalu jalankan scriptnya.

```
$ paccache -r
```

`-r` untuk menghapus "candidate package".

Kalau outputnya seperti ini,

```
==> no candidate packages found for pruning
```

Artinya, sudah tidak ada lagi package yang perlu dibersihkan dari sistem.


#### b.1. paccache dengan Systemd Timer

Kalau yang mau dihapus otomatis secara berkala (periode tertentu) bisa menggunakan systemd timer.

Misal untuk sekali dalam sebulan.

```
$ sudoedit /etc/systemd/system/paccache.timer
```

```conf
!filename: /etc/systemd/system/paccache.timer
[Unit]
Description=Clean-up old pacman pkg

[Timer]
OnCalendar=monthly
Persistent=true

[Install]
WantedBy=multi-user.target
```

Lalu enablekan dan sekalian jalankan,

```
$ sudo systemctl enable --now paccache.timer
```

Cek statusnya,

```
$ sudo systemctl status paccache.timer
```


### c. Clean After Run Pacman

```
$ sudoedit /usr/share/libalpm/hooks/paccache.hook
```

```conf
!filename: /usr/share/libalpm/hooks/paccache.hook
[Trigger]
Operation = Upgrade
Operation = Install
Operation = Remove
Type = Package
Target = *

[Action]
Description = Cleaning pacman cache with paccache...
When = PostTransaction
Exec = /usr/bin/paccache -r
```

Nah, sekarang setiap kita memasang atau menghapus program, maka **paccache** akan teraktivasi untuk menghapus cache package.

> INFO
> 
> Teman-teman juga dapat mengatur *trigger operation* yang diinginkan.
> 
> Lihat blok **[Trigger]**
> 
> Tinggal pilih sesuai kebutuhan teman-teman, ingin menggunakan ketiganya (Upgrade, Install, Remove) atau salah satu dari ketiganya.

Contohnya seperti ini,

```
$ sudo pacman -R kermit
```

```
checking dependencies...

Package (1)  Old Version  Net Change

kermit       3.2-1         -0.04 MiB

Total Removed Size:  0.04 MiB

:: Do you want to remove these packages? [Y/n] Y
:: Processing package changes...
(1/1) removing kermit                               [###########################] 100%
:: Running post-transaction hooks...
(1/1) Cleaning pacman cache with paccache... 👈️
==> no candidate packages found for pruning
```


## 2. Clean Cache on Home

Besar cache yang berada di home bisa cukup gila-gilaan kalau kita tidak pernah membersihkannya.

```
$ du -sh ~/.cache
```

```
8.0G    /home/bandithijo/.cache
```

Cache ini berasal dari berbagai macam aplikasi. Termasuk kalau teman-teman menggunakan AUR helper seperti **yay**.

Teman-teman bisa mencari tahu apa itu cache dan tujuannya digunakan cache.

Saya tidak berkeberatan untuk membersihkan cache yang ada di direktori sistem saya.

```
$ rm -rvf ~/.cache/*
```

Nah, sekarang Home cache kita sudah bersih.


## 3. Mencari Direktori Tergemuk

Kita dapat menggunakan program bernama **ncdu** untuk mendeteksi direktori mana yang paling obesitas.

```
$ sudo pacman -S ncdu
```

Lalu, bisa coba jalankan di Home direktori.

```
$ ncdu ~
```

![Gambar 1]({{ page.assets }}/gambar-01.gif)

Gambar 1. Proses listing direktori yang kegemukan

Masih ada tools-tools dengan fungsi yang sama, yang teman-teman dapat gunakan untuk mencari direktori yang kegemukan, seperti:

1. **Filelight** (Qt)
2. **Baobab** (Gtk)
3. **duc**
4. **GdMap**
5. **gt5**

Teman-teman dapat melihat daftarnya di Arch Wiki, [di sini](https://wiki.archlinux.org/index.php/List_of_applications#Disk_usage_display).


## Pesan Penulis

Catatan ini terinspirasi dari YouTube video [**Average Linux User - How to clean Arch Linux (Manjaro)**](https://youtu.be/3OoMvyHYWDY). Namun, saya hanya mengambil langkah-langkah yang saya butuhkan. Apabila teman-teman tertarik melihat langkah-langkah yang lebih lengkap, saya merekomendasikan untuk mengunjungin video tersebut.

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [Average Linux User - How to clean Arch Linux (Manjaro)](https://youtu.be/3OoMvyHYWDY) \
   Diakses tanggal: 2020-12-24
