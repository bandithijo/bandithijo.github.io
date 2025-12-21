---
layout: "post"
title: "Menjalankan Macromedia Flash 8 di GNU/Linux"
date: '2018-05-20 10:51'
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2018/2018-05-20-menjalankan-macromedia-flash-8-linux"
author: "BanditHijo"
category: "blog"
tags: ["wine"]
description: "Kira-kira tiga minggu yang lalu, saya mendapat tugas kuliah oleh dosen saya untuk membuat 'Media Pembelajaran bagi siswa SMP atau SMA' dengan menggunakan aplikasi Macromedia Flash. Dalam hati ada sedikit rasa haru karena senang tapi tidak lama rasa senang itu langsung tertutupi kabut kenyataan bahwa saya saat ini sudah menggunakan sistem operasi GNU/Linux."
---

![Banner]({{ page.assets | absolute_url }}/banner_post_13.png)


## Latar Belakang

Kira-kira tiga minggu yang lalu, saya mendapat tugas kuliah oleh dosen saya untuk membuat "Media Pembelajaran bagi siswa SMP atau SMA" dengan menggunakan aplikasi **Flash**. Dalam hati ada sedikit rasa haru karena senang tapi tidak lama rasa senang itu langsung tertutupi kabut kenyataan bahwa saya saat ini sudah menggunakan sistem operasi GNU/Linux.

Sekedar bercerita sedikit, saat masih duduk di bangku SMA, saya memang pernah beberapa kali menggunakan aplikasi Flash ini untuk mengerjakan beberapa proyek-proyek sekolah, antara lain (yang saya masih ingat) :

1. Membuat animasi denah sekolah untuk film perkenalan sekolah
2. Membuat bumper untuk film/video pendek yang saya produksi
3. Membuat media pembelajaran berlalu lintas atas permintaan Polres Bontang

Yes, proyek terakhir, menurut saya adalah pencapaian paling tinggi saat itu bagi saya karena kreatifitas saya diakui oleh guru saya dan dipercaya untuk membuat media pembelajaran berlalu lintas ini. Sebuah perjalanan belajar yang panjang dan tidak mudah. Waktu, tenaga, dan ide-ide yang saya habiskan semasa sekolah untuk mempelajari Macromedia Flash dengan sumber yang sangat terbatas karena saya tinggal di kota kecil, di kalimantan timur.

Oke, cukup nostalgia masa lalunya. Sekarang kita kembali ke topik pembahasan.


## Sedikit Penjelasan

Kita memerlukan versi Flash yang memiliki dukungan paling baik dengan aplikasi Wine. Yaa tentu saja karena untuk menjalankan aplikasi Windows di sistem operasi GNU/Linux, kita memerlukan Wine.

Saya selalu melakukan pengecekan **Rating** sebuah aplikasi yang berjalan di atas Wine pada situs [appdb.winehq.org](https://appdb.winehq.org/). Saya sudah mengincar versi Macromedia Flash 8, karena versi ini adalah versi yang dulu saya gunakan. Sebagai informasi, sepertinya sekitar tahun 2005 Macromedia telah diakuisisi oleh Adobe. Otomatis Flash sudah bukan lagi milik Macromedia, melainkan sudah berada di bawah bendera Adobe. Dan namanya juga bukan lagi Flash melainkan Adobe Animate.

Setelah saya lakukan pengecekan, ternyata Macromedia Flash 8, ada yang memberikan rating Platinum sebanyak 2 orang, Gold 2 orang, dan Bronze. Ini adalah hasil yang sangat bagus. Karena artinya, ada kesempatan yang sangat besar untuk dapat menjalankan aplikasi ini di atas platform Linux.


## Instalasi

Langkah awal adalah, instalasi **Wine**.

Untuk Arch Linux.

```
$ sudo pacman -S wine wine_gecko wine-mono winetricks
```

Untuk distribusi sistem operasi GNU/Linux yang lain, silahkan merujuk pada dokumentasi atau wiki yang tersebar di Internet untuk proses instalasi dari Wine.

Selanjutnya, kamu harus memiliki instalasi Macromedia Flash 8 beserta serial numbernya. Karena alasan tertentu, saya tidak dapat menuliskan pada dokumentasi ini bagaimana cara mendapatkannya. Silahkan teman-teman cari tahu sendiri yaa. Hehehe.

Oke, setelah memasang Wine dan menyediakan Macromedia Flash 8 installer, saatnya kita pasang.

![Gambar 1]({{ page.assets | absolute_url }}/gambar_01.gif)

Gambar 1. Instalasi Macromedia Flash 8 di atas Wine

Nah, setelah berhasil di pasang, saatnya kita menjalankanya.

Saat proses instalasi, kita mencentang pilihan untuk membuat *shortcut* di dekstop. Kita tinggal pergi ke Desktop dan mencari *shortcut* bertuliskan **Macromedia Flash 8**.

![Gambar Shortcut]({{ page.assets | absolute_url }}/Screenshot_from_2018-05-20_13-18-33.png)

Akan terdapat file satu lagi bernama **Macromedia Flash 8.lnk**, ini adalah file wine loader, tapi pada prakteknya saya tidak pernah menggunakan file ini, sehingga saya hapus saja, hehehe.

Kalau kalian ingin memindahkan file shortcut **Macromedia Flash 8** ini keluar dari desktop, pindahkan saja ke dalam direktori `~/.local/share/applications/`, pada direktori ini adalah tempat berkumpulnya file-file launcher dari semua aplikasi yang kita miliki.

Sekarang, kita coba menjalankannya.

![Gambar 2]({{ page.assets | absolute_url }}/gambar_02.gif)

Gambar 2. Menjalankan Shortcut Macromedia Flash 8


## Pengujian

Kebetulan karena saya sedang mengerjakan tugas kuliah untuk membuat media pembelajaran, jadi langsung saja sekalian kita coba.

Pengujian ini berdasarkan subjektif saya saja, apakah saya dapat mengerjakan animasi dengan Macromedia Flash 8 di atas Wine semulus saya mengerjakan di atas Microsoft Windows.

Berikut adalah hasilnya.

![Gambar 3]({{ page.assets | absolute_url }}/gambar_03.gif)

Gambar 3. SneakPeek timeline dan scene

Selama proses pengerjaan, tidak ada kendala yang mengganggu.

Aspek-aspek yang jadi penilaian subjektif saya adalah sebagai berikut:

| Aspek Penilaian | Nilai |
| --------------- | ----- |
| Keyboard Shrortcut | 100% Berfungsi |
| Tools | 100% Berfungsi |
| Export GIF | 100% Berfungsi |
| Export EXE | 100% Berfungsi |
| Export AVI | 100% Berfungsi |
| ActionScript | 100% Berfungsi |

Ketika di publish, hasilnya akan seperti ini.

![Gambar 4]({{ page.assets | absolute_url }}/gambar_04.gif)

Gambar 4. Setelah di Publish


## Kesimpulan

Setelah menggunakan Macromedia Flash 8 menggunakan Wine pada sistem operasi GNU/Linux, saya merasa tidak ada kendala yang mengganggu selama proses pengerjaan tugas ini.


## Referensi

1. [appdb.winehq.org/objectManager.php?sClass=version&iId=3673&iTestingId=57604](https://appdb.winehq.org/objectManager.php?sClass=version&iId=3673&iTestingId=57604) \
   Diakses tanggal: 2018-05-20
