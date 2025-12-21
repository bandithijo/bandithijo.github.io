---
layout: "post"
title: "Memperbaiki Font Rendering pada Jitsi - VoIP dan IM Client pada GNU/Linux"
date: "2019-04-22 14:11"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2019/2019-04-22-memperbaiki-font-rendering-jitsi"
author: "BanditHijo"
category: "blog"
tags: ["jitsi"]
description: "Catatan kali ini mengenai cara memperbaiki font rendering yang jelek pada aplikasi Jitsi di GNU/Linux."
---

## Masalah

Bagi teman-teman yang menggunakan Jitsi pada distribusi Arch Linux, mungkin mengalami hal yang sama seperti yang saya alami.

Jitsi, VoIP dan IM client yang menggunakan backend Java ini memiliki tampilan antar muka terkhusus font rendering yang sangat buruk.

Persis seperti font rendering yang ada pada aplikasi yang menggunakan Java pada umumnya apabila belum di konfigurasi.

Mungkin beberapa distribusi seperti Ubuntu atau Fedora tidak mengalami hal semacam ini. Tapi bagi saya pengguna Arch Linux dan beberapa distribusi untuk pengguna tingkat mahir, kami harus mengkonfigurasi beberapa bagian terlebih dahulu untuk dapat membuat font rendering pada aplikasi yang menggunkan Java dapat terlihat mulus.


## Pemecahan Masalah

Tambahkan pada file `~/.profile`,

```
$ vim ~/.profile
```

Copy dan paste baris di bawah ini ke dalam `~/.profile`.

```bash
!filename: $HOME/.profile
export _JAVA_OPTIONS='-Dawt.useSystemAAFontSettings=gasp -Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel'
```

Letakkan di mana saja.

Selanjutnya, **logout** dan **login** kembali.

> PERHATIAN!
> 
> Logout diperlukan setiap kita ingin melihat dampak dari perubahan yang kita lakukan pada isi dari file `~/.profile`.
> 
> Sebelum kita logout, perubahan yang kita lakukan tidak akan dijalankan.

Selanjutnya, buka Jitsi dan lihat perbedannya.

![Gambar 1]({{ page.assets | absolute_url }}/gambar-01.png)

Gambar 1. Setelah ditambahkan JAVA_OPTIONS

Sekian, mudah-mudahan bermanfaat.


## Referensi

1. [lists.jitsi.org/pipermail/dev/2013-November/018919.html](http://lists.jitsi.org/pipermail/dev/2013-November/018919.html) \
   Diakses tanggal: 2019-04-22
