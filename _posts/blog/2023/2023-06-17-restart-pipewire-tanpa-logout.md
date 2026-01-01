---
layout: "post"
title: "Restart PipeWire Tanpa Perlu Logout"
date: "2023-06-17 03:51"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2023/2023-06-17-restart-pipewire-tanpa-logout"
author: "BanditHijo"
category: "blog"
tags: ["pipewire"]
description: "Sistem tiba-tiba tidak terdengar suara. Jangan panik, segera jalankan protokol pertolongan pertama untuk mengatasi audio yang hilang pada PipeWire!"
---

## Pendahuluan

Terkadang, setelah sistem kita mengalami masalah audio server, terkhusus untuk yang sudah menggunakan PipeWire dan Wireplumber, terkadang bakal bertemu dengan berbagai macam kendala audio yang secara random akan muncul dan dengan berbagai sebab.

Kondisi ini terbilang cukup jarang terjadi, tapi kalau sedang terjadi, cukup dapat membuat kepala pening, kalau belum tahu cara menghandle-nya.


## Penyelesaian Masalah

Buka Terminal dan jalankan perintah di bawah,

**Kalau pakai Bash Shell**

```
$ systemctl restart --user {pipewire,wireplumber}.service
```

**Kalau bukan Bash Shell**

```
$ systemctl restart --user pipewire.service
$ systemctl restart --user wireplumber.service
```


## Referensi

1. [Arch Wiki - PipeWire](https://wiki.archlinux.org/title/PipeWire) \
   Diakses tanggal: 2023-06-17
