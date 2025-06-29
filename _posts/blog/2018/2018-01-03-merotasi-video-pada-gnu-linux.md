---
layout: 'post'
title: 'Cara Mudah Merotasi Video pada GNU/Linux'
date: '2018-01-03'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tools', 'Tips']
pin:
hot:
contributors: []
description: "Merotasi video mungkin menjadi hal yang cukup memusingkan apabila kita tidak terbiasa menggunakan perkakas GUI. Namun, cukup dengan ffmpeg, kita dapat merotasi video sesuai dengan parameter yang tersedia. Caranya mudah sekali!"
---

![Banner](https://4.bp.blogspot.com/-8Zdbis7q7Zg/WmLxSO4-GHI/AAAAAAAAG64/NtBEawlhLpcXQiDANDzezBpBMjd_8jJWQCLcBGAs/s1600/Default%2BHeader%2BTemplate%2BPost%2B2X.png)


# Latar Belakang

Pernah mendapati video yang saat diputar, axisnya tidak sesuai dengan seharusnya ?

Masalah ini dapat kita atasi dengan mudah pada sistem operasi GNU/Linux. Tidak perlu menggunakan aplikasi GUI, cukup dengan Terminal dan mengetikkan sebaris _command line_.


# Prasyarat

Kita membutuhkan paket bernama [ffmpeg](https://www.archlinux.org/packages/extra/x86_64/ffmpeg/). Biasanya, paket ini sudah tersedia pada distribusi sistem operasi GNU/Linux modern, sehingga kita tidak perlu repot-repot lagi memasangnya. Karena paket ini biasanya merupakan dependensi yang dibutuhkan oleh paket yang lain. Apabila pada distro kalian ternyata belum terdapat `ffmpeg`, kalian harus memasangnya terlebih dahulu.


# Penerapan

Buka Terminal dan masuk ke dalam direktori tempat dimana kalian menyimpan file video yang akan dirotasi. Kemudian ketikkan _command_ di bawah,

```
$ ffmpeg -i in.mp4 -vf "transpose=1" out.mp4
```

> Transpose Parameter :
> 
> **0** = 90 counterclockwise and vertical flip (default) \
> **1** = 90 clockwise \
> **2** = 90 counterclockwise \
> **3** = 90 clockwise and vertical flip

Ganti nilai dari _transpose parameter_, sesuai dengan yang kalian butuhkan.

Ganti `in.mp4` dengan nama file dari video kalian, dan berikan sembarang nama pada file `out.mp4`.


# Referensi

1. [archlinux.org/packages/extra/x86_64/ffmpeg/](https://www.archlinux.org/packages/extra/x86_64/ffmpeg/)
<br>Diakses tanggal: 2018/01/19
