---
layout: 'post'
title: 'Merubah Default Save Direktori pada GNOME-Screenshot'
date: '2018-04-28 06:09'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['GNOME']
pin:
hot:
contributors: []
description: "GNOME-ScreenShot adalah aplikasi untuk mengambil gambar layar monitor yang sudah tersedia secara native pada GNOME desktop environment. Saya sudah menggunakan aplikasi ini sejak masih GNOME versi 2. Saat ini saya sedang menggunakan XFCE4, namun saya kurang menyukai aplikasi screenshot milik XFCE4 karena terlalu sederhana."
---

![Banner](https://s20.postimg.cc/yjw814lz1/banner_post_08.png)


# Latar Belakang

**GNOME-ScreenShot** adalah aplikasi untuk mengambil gambar layar monitor yang sudah tersedia secara *native* pada **GNOME** *desktop environment*. Saya sudah menggunakan aplikasi ini sejak masih GNOME versi 2. Saat ini saya sedang menggunakan **XFCE4**, namun saya kurang menyukai aplikasi *screenshot* milik XFCE4 karena terlalu sederhana (subjektif penulis).


# Permasalahan

Saat mengambil *screenshot* menggunakan *shortcut* dengan kombinasi tombol pada keyboard. File gambar otomatis langsung diletakkan pada direktori **~/Pictures**. Tentunya hal ini sangat tidak menyenangkan buat saya, karena file tidak terorganisir sesuai tempatnya.


# Solusi

Kita membutuhkan aplikasi bantuan untuk merubah konfigurasi, yang bernama [**dconf-editor**](https://www.archlinux.org/packages/extra/x86_64/dconf-editor/).

```
$ sudo pacman -S dconf-editor
```

Setelah, dconf-editor berhasil dipasang. Buka dconf-editor.

Lalu pergi ke **org** > **gnome** > **gnome-screenshot**.

Klik dua kali pada bagian **auto-save-directory**.

![Gambar 1](https://s20.postimg.cc/kq7vc3vyl/gambar_01.png)

Nanti akan terbuka *section* seperti di bawah.

![Gambar 2](https://s20.postimg.cc/rhyaek099/gambar_02.png)

Pada bagian paling bawah, **Custom value**, ganti ke direktori tempat dimana kalian ingin menyimpan hasil *screenshot*.

Namun sebelumnya, untuk memberikan nilai pada Custom value, harus men-disable **Use default value**.

Pada contoh di atas, saya meletakkan hasil *screenshot* pada direktori `file:///home/bandithijo/pix/ScreenShot`.

*And we're redy to go !*


# Referensi

1. [askubuntu.com/questions/114429/default-save-directory-for-gnome-screenshot](https://askubuntu.com/questions/114429/default-save-directory-for-gnome-screenshot)
<br>Diakses tanggal: 2018/04/28
