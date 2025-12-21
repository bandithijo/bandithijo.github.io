---
layout: "post"
title: "Merubah Default External Program Open Files pada Calibre"
date: "2018-04-14 00:45"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2018/2018-04-14-merubah-external-program-open-calibre"
author: "BanditHijo"
category: "blog"
tags: ["calibre"]
description: "Untuk mengelola ebook yang saya kumpulkan, karena jumlahnya tidak sedikit, saya tidak menggunakan manajemen direktori untuk mengatur dan mengkategorikan koleksi ebook yang saya miliki. Karena, akan sangat merepotkan apabila kita ingin mencari dan menelusuri semua ebook yang kita miliki dalam satu waktu. Lebih mudah apabila kita menggunakan aplikasi yang menampilkan koleksi ebook yang kita miliki layaknya sebuah galeri foto atau rak buku di toko buku. Sehingga dapat memudahkan kita dalam memilih ebook apa yang akan kita baca, dan masih banyak segudang kemudahan lainnya yang bisa kita nikmati apabila kita menggunakan aplikasi untuk memanajemen koleksi ebook yang kita miliki. Karena latar belakang tersebut, saya menggunakan aplikasi ebook management yang bernama, Calibre."
---

![Banner]({{ page.assets | absolute_url }}/banner_post_02.png)


## Latar Belakang

Beberapa hari lalu saya sedang giat-giatnya membaca beberapa *ebook* yang saya kumpulkan dari *resources free learning*, [**Packt>**](https://www.packtpub.com/packt/offers/free-learning).

Untuk mengelola *ebook* yang saya kumpulkan, karena jumlahnya ~~tidak sedikit~~, saya tidak menggunakan manajemen direktori untuk mengatur dan mengkategorikan koleksi *ebook* yang saya miliki. Karena, akan sangat merepotkan apabila kita ingin mencari dan menelusuri semua *ebook* yang kita miliki dalam satu waktu. Lebih mudah apabila kita menggunakan aplikasi yang menampilkan koleksi *ebook* yang kita miliki layaknya sebuah galeri foto atau rak buku di toko buku. Sehingga dapat memudahkan kita dalam memilih *ebook* apa yang akan kita baca, dan masih banyak segudang kemudahan lainnya yang bisa kita nikmati apabila kita menggunakan aplikasi untuk memanajemen koleksi *ebook* yang kita miliki. Karena latar belakang tersebut, saya menggunakan aplikasi *ebook management* yang bernama, [**Calibre**](https://calibre-ebook.com/).

![Gambar 1]({{ page.assets | absolute_url }}/gambar_1.png)

Gambar 1. Calibre pada GNU/Linux


## Masalah

Calibre, secara default sudah memiliki *ebook reader* yang biasa saya gunakan untuk membaca *file* dengan format EPUB, namun untuk membaca *file* dengan format PDF saya lebih *prefer* menggunakan [**Evince**](https://github.com/GNOME/evince).

Belakangan saya dapati, ketika saya melakukan *view ebook* yang hanya mempunyai format PDF, Calibre akan membuka aplikasi Libreoffice Draw, dan bukan menggunakan Evince. Padahal pada pengaturan *default* untuk *view* PDF sudah saya arahkan agar dapat dibuka menggunakan Evince.


## Pemecahan Masalah

Calibre menggunakan `QDesktopServices.openUrl(qurl)` method, yang menggunakan `xdg-utils` untuk membuka *files*.

File PDF mempunyai mimetype berupa `application/pdf`, yang dapat kamu temukan di dalam file `~/.local/share/applications/mimeinfo.cache`. Terdapat beberapa aplikasi yang berasosiasi untuk membuka file PDF di dalam sistem operasi saya. Namun, pada kasus ini saya hanya akan mengarahkan file PDF agar dapat dibuka secara *default* dengan menggunakan Evince.

Caranya sangat mudah, cukup jalankan perintah di bawah.

```
$ xdg-mime default evince.desktop application/pdf
```

Kita dapat melakukan verifikasi, apakah format PDF sudah secara *default* dibuka dengan menggunakan Evince dengan menjalankan perintah `xdg-open` pada file PDF yang kalian miliki.

```
$ xdg-open pemrograman_pyton.pdf
```

Apabila file PDF terbuka menggunakan Evince, maka konfigurasi *default* mimetype kita, telah berhasil.

Sekarang, saat kita melakukan *view* file PDF pada Calibre, maka Calibre akan menggunakan Evince untuk membuka file PDF tersebut.


## Rekomendasi dari Teman

Rekomendasi dari: **Pirate Professor**

Kita dapat menggunakan plugins yang sudah disediakan oleh Calibre, yaitu **Open With**.

Berikut ilustrasinya.

![Gambar 2]({{ page.assets | absolute_url }}/gambar_02.gif)

Gambar 2. Sebelum dipasang Plugin

![Gambar 3]({{ page.assets | absolute_url }}/gambar_03.gif)

Gambar 3. Instalasi Plugin

![Gambar 4]({{ page.assets | absolute_url }}/gambar_04.gif)

Gambar 4. Konfigurasi Open With


## Referensi

1. [jb-blog.readthedocs.io/en/latest/posts/0016-how-to-change-what-program-calibre-uses-to-open-stuff.html](http://jb-blog.readthedocs.io/en/latest/posts/0016-how-to-change-what-program-calibre-uses-to-open-stuff.html) \
   Diakses tanggal: 2018-04-14
