---
layout: "post"
title: "sxiv, Simple X Image Viewer (sxiv) yang Praktis namun Powerfull"
date: "2022-08-07 15:53"
permalink: "/blog/:title"
assets: "/assets/images/posts/2022/2022-08-07-sxiv-simple-x-image-viewer-yang-praktis"
author: "BanditHijo"
category: "blog"
tags: ["sxiv"]
description: "Simple or Small or Suckless, X Image Viewer (sxiv), adalah aplikasi image viewer yang sudah saya pergunakan sejak sekitar Maret 2019. Catatan ini adalah tentang review singkat dari sxiv dan kenapa saya memutuskan untuk migrasi ke nsxiv."
---

# Pendahuluan

Simple or Small or Suckless, X Image Viewer (sxiv), adalah aplikasi image preview yang sudah saya pergunakan sejak sekitar Maret 2019. Catatan ini adalah tentang review singkat dari sxiv dan kenapa saya memutuskan untuk migrasi ke nsxiv.


# Sedikit tentang sxiv

sxiv adalah abreviasi dari Simple X Image Viewer. Penampil gambar yang dibangun dengan bahasa C. Ringan dan mudah untuk menambahkan fitur dengan menggunakan bahasa scripting seperti: bash.


## Fitur-fitur

Fitur-fitur yang dimiliki oleh sxiv, antara lain:
1. Operasi image dasar, sepert: *zooming*, *panning*, *rotating*
1. Customizable key and mouse button mappings (dengan file config.h)
1. Thumbnail mode, untuk menampilkan semua gambar di dalam direktori dalam bentuk thumbnail
1. Cache thumbnail, untuk mempercepat proses re-loading gambar
1. Basic support untuk gambar-gambar dengan multi-frame
1. Play GIF animations
1. Menampilkan image information di statusbar


## Kelebihan

Kalau kelebihan dari sxiv (subjektif menurut saya):
1. Tampilan yang simple. Tidak ada *kitchenset*, seperti: toolbar dan buttons. Cocok digunakan pengguna Window Manager
1. Pengoperasian yang simple, dengan menggunakan keyboard shortcut
1. Kecepatan saat dipanggil (*startup*) yang "fantastis"
1. Kecepatan saat menampilkan gambar-gambar di mode thumbnails yang "bombastis"


## Kekurangan

Kalau kekurangan dari sxiv (subjektif menurut saya):
1. Kurang yang menggunakan, jadi belum terkenal di kalangan umum. Hihihi 😋


# Screenshots

![Gambar 1](/assets/images/posts/2022/2022-08-07-01-gambar-01.png)

Gambar 1. sxiv with image mode

![Gambar 2](/assets/images/posts/2022/2022-08-07-01-gambar-02.png)

Gambar 2. sxiv with thumbnail mode


# Demo


## Rotation

![Gambar 3](/assets/images/posts/2022/2022-08-07-01-gambar-03.gif)

Gambar 3. sxiv with rotate left & right


## Flipping

![Gambar 4](/assets/images/posts/2022/2022-08-07-01-gambar-04.gif)

Gambar 4. sxiv with flip vertical & horizontal


## Zooming & Panning

![Gambar 5](/assets/images/posts/2022/2022-08-07-01-gambar-05.gif)

Gambar 5. sxiv with zoom in & out

![Gambar 6](/assets/images/posts/2022/2022-08-07-01-gambar-06.gif)

Gambar 6. sxiv with zoom in movement, zoom level 100%, fit image to window


## Navigation

![Gambar 7](/assets/images/posts/2022/2022-08-07-01-gambar-07.gif)

Gambar 7. sxiv with navibation next & previous

![Gambar 8](/assets/images/posts/2022/2022-08-07-01-gambar-08.gif)

Gambar 8. sxiv with navigation on thumbnails mode

![Gambar 9](/assets/images/posts/2022/2022-08-07-01-gambar-09.gif)

Gambar 9. sxiv with zoom in/out thumbnails


# Rekomendasi

Karena **sxiv** sudah tidak lagi dilanjutkan proses maintain and developing nya, maka saya rekomendasikan teman-teman untuk bermigrasi ke **nsxiv** yang merupakan fork project dari sxiv.


# Tips & Tricks


## 1. Modifikasi color & font dengan X resources

Dari `man nsxiv` pada section **configuration**, ada beberapa color & font properties yang dapat kita gunakan.

```
window.background
       Color of the window background

window.foreground
       Color of the window foreground

bar.font
       Name of Xft bar font

bar.background
       Color of the bar background. Defaults to window.background

bar.foreground
       Color of the bar foreground. Defaults to window.foreground

mark.foreground
       Color of the mark foreground. Defaults to window.foreground
```

Untuk dapat menggunakannya pada Xresources, tambahkan awalan `Nsxiv.` (window class name).

Contoh,

```conf
!filename: ~/.Xresources
Nsxiv.bar.font:          JetBrainsMono Nerd Font Bandit:pixelsize=17
Nsxiv.bar.background:    #005F87
Nsxiv.bar.foreground:    #D4D4D4
```


## 2. Open all images inside directory on Ranger

*Sedang dalam proses penulisan...*


# Pesan Penulis

Penggunaan lebih lanjut saya serahkan pada imajinasi dan kreatifitas teman-teman.

Terima kasih sudah mampir yaa.


# Referensi

1. [https://github.com/muennich/sxiv](https://github.com/muennich/sxiv) \
   Diakses tanggal: 2022-08-07

1. [https://github.com/nsxiv/nsxiv](https://github.com/nsxiv/nsxiv) \
   Diakses tanggal: 2022-08-07

1. [https://codeberg.org/nsxiv/nsxiv](https://codeberg.org/nsxiv/nsxiv) \
   Diakses tanggal: 2022-08-07

1. [https://wiki.archlinux.org/title/Sxiv](https://wiki.archlinux.org/title/Sxiv) \
   Diakses tanggal: 2022-08-07
