---
layout: "post"
title: "Restart PulseAudio Dummy Output Tanpa Perlu Logout"
date: "2020-06-21 12:27"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-06-21-restart-pulseaudio-dummy-output-tanpa-logout"
author: "BanditHijo"
category: "blog"
tags: ["pulseaudio"]
description: "Sistem tiba-tiba tidak terdengar suara. Jangan panik, segera jalankan protokol pertolongan pertama untuk mengatasi audio yang hilang pada pulseaudio!"
---

## Pendahuluan

Terkadang, setelah kembali dari restart karena sebelumnya melakukan update Arch Linux, mungkin kita mendapatin sistem kita tidak dapat mengeluarkan suara.

Kalau kita cek di aplikasi seperti **pavucontrol** akan ada keterangan seperti **Dummy Output**.

Kondisi ini sangat jarang, bahkan saya baru pertama kalinya mengalami hal ini beberapa hari yang lalu.

Namun, saya perlu mencatat agar dikemudian hari mengalami hal ini lagi, saya tidak perlu jauh-jauh mencari.


## Penyelesaian Masalah

Buka Terminal dan jalankan perintah di bawah, satu-persatu.

```
$ pulseaudio --check
$ pulseaudio --kill
$ pulseaudio --start
```

Atau, langsung jalankan bentuk satu baris, lebih praktis.

```
$ pulseaudio --check; pulseaudio --kill; pulseaudio --start
```


## Referensi

1. [How can I restart pulseaudio without having to logout?](https://askubuntu.com/questions/15223/how-can-i-restart-pulseaudio-without-having-to-logout/15224#15224) \
   Diakses tanggal: 2020-06-21
