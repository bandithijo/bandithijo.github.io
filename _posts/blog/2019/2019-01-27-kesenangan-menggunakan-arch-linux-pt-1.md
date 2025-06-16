---
layout: 'post'
title: 'Kesenangan Dalam Menggunakan Arch Linux Pt. 1'
date: '2019-01-27 08:56'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc:
category: 'blog'
tags: ['Arch Linux']
pin:
hot:
contributors: []
description: "Pada catatan ini saya sedikit bercerita kemudahan dalam menelusuri sebuah paket di repositori Arch Linux."
---

Arch Linux, distribusi sistem operasi GNU/Linux yang sudah saya pergunakan sejak pertengahan 2016 hingga hari ini.

Salah satu kesenangan menggunakan distribusi Arch adalah kemudahan dalam hal menelusuri paket di repository.

Beberapa waktu lalu `dunstify` masih terdapat di AUR, namun begitu sudah di merge dari upstream, repo `dunst` official pun ikut membawa `dunstify`.

![Gambar 1](https://i.postimg.cc/Jn5zQgJW/gambar-01.png)

Gambar 1. Kemudahan mengecek paket pada archlinux.org

---

Untuk mengecek apakah `dunstify` sudah terdapat pada paket `dunst`, kita dapat menggunakan perintah.

```
$ sudo pacman -Ql dunst
```

![Gambar 2](https://i.postimg.cc/ydHNcBDP/gambar-02.png)

Gambar 2. Kemudahan mengecek paket pada pacman

Karena `dunstify` sudah terdapat pada paket `dunst`, saya harus menghapus paket `dunstify` yang saya pasang melalui AUR.

```
$ sudo pacman -R dunsitfy
```

Lalu melakukan instalasi kembali paket `dunst` untuk memperbaharui `dunst`, gunanya agar perintah `/bin/dunstify` dibuat kembali.

```
$ sudo pacman -S dunst
```

---

Saya menggunakan `dunstify` untuk keperluan menampilkan **HELP** dari daftar keyboard shortcut pada masing-masing aplikasi yang saya pergunakan.

![Gambar 3](https://i.postimg.cc/gjcktDqL/gambar-03.gif)

Gambar 3. Salah satu pemanfaatan dunstify

Kapan-kapan akan saya tuliskan mengenai "Pemanfaatan **dunstify** untuk menjadi fitur **HELP**" seperti yang saya pergunakan ini.

---

Sesuai janji, saya sudah menuliskan catatan mengenai hal ini, [di sini]({{ site.url }}/blog/dunst-sebagai-notifikasi-bantuan-pengingat-shortcut).


# Referensi

1. [twitter.com/bandithijo/status/1088634885286199296](https://twitter.com/bandithijo/status/1088634885286199296)
<br>Diakses tanggal: 2019/01/27

2. [twitter.com/bandithijo/status/1088636816498905088](https://twitter.com/bandithijo/status/1088636816498905088)
<br>Diakses tanggal: 2019/01/27

3. [twitter.com/bandithijo/status/1088639007368474624](https://twitter.com/bandithijo/status/1088639007368474624)
<br>Diakses tanggal: 2019/01/27

4. [wiki.archlinux.org/index.php/Dunst](https://wiki.archlinux.org/index.php/Dunst)
<br>Diakses tanggal: 2019/01/27
