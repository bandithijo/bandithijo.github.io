---
layout: 'post'
title: "Ubuntu: the following signatures were invalid: EXPKEYSIG"
date: '2023-08-10 01:41'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Ubuntu']
pin:
hot:
contributors: []
description: "Catatan kali ini, saya akan mendokumentasikan proses troubleshooting pada Ubuntu Server yang mengalami expired signature key saat melakukan apt update."
---

# Pendahuluan

{{ page.description }}

# Masalah

Saat menjalankan perintah `$ sudo apt update`, keluar pesan erorr seperti ini,

```
The following signatures were invalid: EXPKEYSIG 23E7166788B63E1E Yarn Packaging <yarn@dan.cx>
```

Ini berarti di Ubuntu saya, masih memiliki kunci GPG versi lama yang digunakan untuk menandatangani package Yarn.

# Pemecahan Masalah

Kita asumsikan package maintainer sudah memperbaharui public key mereka dan menguploadnya di keyserver.ubuntu.com. Jadi, kita tinggal menjalankan perintah di bawah ini.

```
$ sudo apt-key adv --refresh-keys --keyserver keyserver.ubuntu.com
```

# Pesan Penulis

Terima kasih sudah mampir yaa.

# Referensi

1. [https://github.com/yarnpkg/yarn/issues/7866](https://github.com/yarnpkg/yarn/issues/7866)
<br>Diakses tanggal: 2023/08/10
