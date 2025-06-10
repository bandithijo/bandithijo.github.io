---
layout: 'post'
title: "Mudah Memberikan Screen Annotation di Mana Saja dengan Gromit-MPX"
date: '2020-10-26 15:44'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips', 'Ulasan']
pin:
hot:
contributors: []
description: "Mencoret-coret layar untuk memberikan atensi kepada lawan bicara, kini sudah tidak lagi sulit. Dengan Gromit-MPX kita dapat mencoret-coret di mana saja."
---

# Latar Belakang Masalah

Saat presentasi menggunakan aplikasi presentasi semacam LibreOffice Impress, pasti teman-teman pernah menggunakan --setidaknya pernah melihat-- menu atau tools yang digunakan untuk memberikan coretan berupa garis, panah, atau tulisan tangan dengan tujuan untuk memberikan catatan pada bagian slide yang dipresentasikan.

Menurut saya, memberikan anotasi pada slide, lebih efektif untuk menjelaskan dan lebih mudah dimengerti oleh penyimak, ketimbang hanya menunjuk-nujuk bagian-bagian dari slide.

![Gambar 1](https://i.postimg.cc/J4XY6mZt/gambar-01.png)

Gambar 1. Slide Annotation pada LibreOffice

Kalau teman-teman menggunakan aplikasi Flameshot, pasti juga pernah menggunakan tools-tools untuk memberikan anotasi yang disediakan oleh Flameshot.

Yang menjadi masalah adalah,

**Bagaimana agar kita tetap dapat memberikan anotasi pada layar, diluar dari aplikasi LibreOffice & Flameshot?**

Misal, saat kita mendemonstrasikan blok kode yang ada di dalam text editor dan ingin memberikan anotasi pada bagian-bagian tertentu.

Atau saat kita ingin menunjukkan bagian atau area tertentu pada layar yang harus di klik.

Tentunya hal-hal tersebut tidak dapat dilakukan dengan LibreOffice Impress. Masih mungkin kalau dengan Flameshot, namun tidak cukup nyaman, karena tujuan dibuatnya Flameshot memang bukan untuk membuat screen annotation, melainkan untuk membuat screenshot annotation.


# Pemecahan Masalah

**Gromit-MPX** adalah aplikasi multi-pointer yang diporting dari **Gromit (Annotation Tool)** yang dikembangkan oleh Simon Budig.

Gromit sendiri adalah kependekan dari "**GR**aphics **O**ver **MI**scellaneous **T**hings"

Latar belakang Simon Budig mengembangkan Gromit karena saat ia membuat presentasi mengenai GIMP, ia mendapati dirinya sering menggerak-gerakkan mouse pointer ke sekeliling bagian yang dimaksud sambil berharap seseorang dapat paham bagian yang ditunjuk tersebut. Hal ini sangat mengganggu dirinya. Maka dibuatlah program sederhana yang dapat membantu dirinya secara mudah untuk menggambar di layar.

Berikut ini adalah ilustrasi dari Simon Budig yang saya ambil dari website [Gromit](http://www.home.unix-ag.org/simon/gromit/).

![Gambar 2](https://i.postimg.cc/rFYyJ1Gq/gambar-02.jpg)

![Gambar 3](https://i.postimg.cc/52h4cfkG/gambar-03.jpg)

![Gambar 4](https://i.postimg.cc/BnLSwjNH/gambar-04.jpg)


# Instalasi

Saya memilih membuild sendiri aplikasi ini.

Untuk teman-teman yang kurang nyaman, bisa mencari di repositori dari distribusi sistem operasi masing-masin.

```
$ git clone https://github.com/bk138/gromit-mpx.git
$ cd gromit-mpx
$ mkdir build
$ cd build
$ cmake ..
$ make
```

Tunggu proses make sampai selesai.

Kalau tidak ada masalah, kita bisa pasang ke sistem.

```
$ sudo make install
```

Untuk proses uninstall, tinggal masuk lagi ke direktori `build/` dan jalankan.

```
$ sudo make uninstall
```


# Konfigurasi

Secara default, Gromit-MPX akan mmebaca file `gromit-mx.cfg` yang berada pada direktori `$XDG_CONFIG_HOME` biasanya `~/.config`.

Artinya, tidak didalam direktori khusus Gromit-MPX.

```
$HOME/.config/gromit-mpx.cfg
```

Sekarang, kita perlu mencontek config default yang disediakan oleh Gromit-MPX.

```
$ cp /usr/local/etc/gromit-mpx/gromit-mpx.cfg ~/.config
```

Kemudian buka file **gromit-mpx.cfg** tersebut.

```conf
!filename: $HOME/.config/gromit-mpx.cfg
# Default gromit-mpx configuration
# taken from  Totem's telestrator mode config
# added default entries

# Uncomment to set Hot key and/or Undo key to a custom value
# HOTKEY = "F9";
# UNDOKEY = "F8";

"red Pen" = PEN (size=5 color="red");
"blue Pen" = "red Pen" (color="blue");
"yellow Pen" = "red Pen" (color="yellow");
"green Marker" = PEN (size=6 color="green" arrowsize=1);

"Eraser" = ERASER (size = 75);

"default" = "red Pen";
"default"[SHIFT] = "blue Pen";
"default"[CONTROL] = "yellow Pen";
"default"[2] = "green Marker";
"default"[Button3] = "Eraser";
```

Kalau sudah seperti ini, saya serahkan kepada teman-teman untuk berimajinasi dalam memodifikasi sesuai kebutuhan masing-masing.

Untuk panduan konfigurasi, teman-teman dapat mengunjungin halaman GitHub readme dari Gromit-MPX, [di sini](https://github.com/bk138/gromit-mpx#configuration).

Ini adalah contoh konfigurasi yang saya pergunakan.

```conf
!filename: $HOME/.config/gromit-mpx.cfg
# Default gromit-mpx configuration
# taken from  Totem's telestrator mode config
# added default entries

# Uncomment to set Hot key and/or Undo key to a custom value
HOTKEY  = "F9";
UNDOKEY = "F8";

"white Pen"  = PEN (size=8 color="white");
"red Pen"    = "white Pen" (color="#FF0000");
"yellow Pen" = "white Pen" (color="#FFBB00");
"blue Pen"   = "white Pen" (color="#0000FF");

"Eraser"     = ERASER (size = 50);

"default"          = "white Pen";
"default"[SHIFT]   = "red Pen";
"default"[CONTROL] = "yellow Pen";
"default"[ALT]     = "Eraser";
```


# Demonstrasi

![Gambar 5](https://i.postimg.cc/SxzC4NDb/gambar-05.gif)

![Gambar 6](https://i.postimg.cc/5NZRjCmP/gambar-06.gif)

![Gambar 7](https://i.postimg.cc/2Sbqp0Gc/gambar-07.gif)


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [github.com/bk138/gromit-mpx](https://github.com/bk138/gromit-mpx)
<br>Diakses tanggal: 2020/10/26
