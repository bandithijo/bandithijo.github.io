---
layout: "post"
title: "Memperbaiki Blank Putih pada Aplikasi Berbasis Java di GNU/Linux"
date: "2020-05-11 08:14"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-05-11-blank-putih-pada-aplikasi-java-di-gnu-linux"
author: "BanditHijo"
category: "blog"
tags: ["java"]
description: "Saya mendapati beberapa aplikasi berbasis Java, apabila dibuka, hanya menampilkan *canvas* putih dan tidak merender *asset* seperti form, menu, button, text, gambar dan lain-lain."
---

# Permasalahan

Saya mendapati beberapa aplikasi berbasis Java, apabila dibuka, hanya menampilkan *canvas* putih dan tidak merender *asset* seperti form, menu, button, text, gambar dan lain-lain.


# Pemecahan Masalah

Misalkan, dalam kasus saya, saya ingin menjalankan binary dari aplikasi Jdownloader 2 Beta. Nama file binarynya adalah `JDownloader2`.

Coba jalankan program yang akan dijalankan di atas terminal dengan menambahkan env variable seperti ini.

```
$ _JAVA_AWT_WM_NONREPARENTING=1 ./JDownloader2
```

Kalau berhasil dijalankan dan semua *asset* terlihat sudah berhasil dirender, tinggal tambahkan pada `.desktop` dari launcher aplikasi tersebut.

```
$ vim ~/.local/share/applications/JDownloader2.desktop
```

```bash
!filename: $HOME/.local/share/applications/JDownloader2.desktop
[Desktop Entry]
Name=JDownloader 2
Exec=_JAVA_AWT_WM_NONREPARENTING=1 $HOME/app/jdownloader2beta/JDownloader2
Icon=/home/bandithijo/app/jdownloader2beta/jd2/.install4j/JDownloader2.png
Categories=Network;Application;
Type=Application
```

Selesai!

Sepertinya segini dulu yang dapat saya bagikan.

Terima kasih.

(^_^)


# Referensi

1. [bbs.archlinux.org/viewtopic.php?id=159016](https://bbs.archlinux.org/viewtopic.php?id=159016) \
   Diakses tanggal: 2020-05-11
