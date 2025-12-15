---
layout: "post"
title: "Mudah Memasang Paket Aplikasi Fedora dengan Yumex-DNF"
date: "2017-01-30"
permalink: "/blog/:title"
assets: "/assets/images/posts/2017/2017-01-30-mudah-memasang-aplikasi-fedora-dengan-yumex-dnf"
author: "BanditHijo"
category: "blog"
tags: ["fedora", "dnf"]
description: "YumEx (YUM Extender) adalah Graphical User Interface untuk yum package manager. Seperti Synapctic pada distribusi sistem operasi Ubuntu/Debian/Mint dan Octopi/Pamac pada Arch/Manjaro."
---

![Banner]({{ site.url }}{{ page.assets }}/Default+Header+Template+Post+23.5.png)


## Latar Belakang


### Apa itu YumEx-DNF ?

Sebelumnya apa itu YumEx? YumEx (YUM _Extender_) adalah _Graphical User Interface_ untuk `yum` _package manager_. Seperti `Synapctic` pada distribusi sistem operasi Ubuntu / Debian / Mint dan `Octopi` / `Pamac` pada Arch / Manjaro.


### Sedangkan apa itu YUM?

YUM (Yellowdog _Updater, Modified_) sendiri adalah sebuah _open source command-line package-management_ untuk komputer yang menjalankan distribusi sistem operasi Linux yang menggunakan RPM _Package Manager_ (RedHat). Yang pada perkembangannya YUM ini digantikan (_replace_) oleh DNF. Dan YumEx pun bertambah namanya menjadi YumEx-DNF.

DNF sendiri adalah kependekan dari Dandified Yum, yaitu generasi versi selanjutnya dari YUM. DNF ini sudah dikenalkan sejak rilis Fedora 18 dan sudah menjadi _default package manager_ sejak rilis Fedora 22.


### Kenapa Saya Mengunakan YumEx-DNF ?

Saya menggunakan YumEx dikarenakan pengalaman saya sebelumnya, saat menggunakan Synaptic pada distribusi sistem operasi Ubuntu.
Kemudahan dalam mengetahui kegunaan sebuah aplikasi dari kolom deskripsi atau keterangan pada YumEx. Kalo saya bisa ibaratkan, ini seperti membaca-baca buku menu yang berisi berbagai macam menu makanan beserta penjelasannya.
Sebelumnya saya mencari tahu lewat Google, aplikasi apa yang saya butuhkan untuk menunjang kebutuhan saya. Namun dengan menggunakan YumEx, saya tidak perlu mencari semua informasi aplikasi yang saya perlukan di Google, cukup dengan membuka YumEx kemudian melakukan pencarian pada _search menu_.


## Anatomi dari YumEx-DNF

Agar lebih mudah dalam menggunakan YumEx-DNF maka saya akan mengenalkan anatomi (bagian-bagian) dari YumEx-DNF.

![Gambar1]({{ site.url }}{{ page.assets }}/Gambar+1.0.png)

Gambar 1. YumEx-DNF

Keterangan Gambar 1:

1. Tab Group Window
2. Tombol Search (Ctrl+F)
3. Tombol Apply Pending Actions
4. Tombol Menu
5. Sidebar
6. Window Utama
7. Tab Detail dari Package yang Terseleksi pada Window Utama


## Memasang / Meng-Install YumEx-DNF

YumEx-DNF pada distribusi sistem operasi Fedora 25 Workstation sudah terpasang secara _default_. Apabila belum terpasang / ter-instal maka langkah instalasinya sangatlah mudah karena YumEx-DNF ini sudah terdapat pada repositori resmi Fedora.
Buka Terminal, kemudian ketik atau _copy paste_ kode perintah di bawah ini.

```
$ sudo dnf install yumex-dnf
```

## Cara Menggunakan

Cari aplikasi yang anda ingin pasang dengan menekan icon **Search** (2) Kemudian ketik nama aplikasi yang ingin dipasang. Kemudia _checklist_ / centang nama aplikasi yang dimaksud (6). Setelah itu, klik tombol icon **Apply** (3). Akan muncul window konfirmasi, pilih “OK”, maka proses pemasangan aplikasi tinggal menunggu proses pemasangan.
Untuk menghapus aplikasi, caranya hampir sama dengan saat pemasangan, dengan _checklist_ / mencentang aplikasi yang dimaksud, maka disamping _box checklist_ akan terdapat icon bergambar tempat sampah. Langkah selanjutnya tinggal di **Apply**.

Gimana? Mudah bukan =)
