---
layout: 'post'
title: "Restart Pipewire Tanpa Perlu Logout"
date: 2023-06-17 03:51
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips']
pin:
hot:
contributors: []
description: "Sistem tiba-tiba tidak terdengar suara. Jangan panik, segera jalankan protokol pertolongan pertama untuk mengatasi audio yang hilang pada Pipewire!"
---

# Pendahuluan

Terkadang, setelah sistem kita mengalami masalah audio server, terkhusus untuk yang sudah menggunakan Pipewire dan Wireplumber, terkadang bakal bertemu dengan berbagai macam kendala audio yang secara random akan muncul dan dengan berbagai sebab.

Kondisi ini terbilang cukup jarang terjadi, tapi kalau sedang terjadi, cukup dapat membuat kepala pening, kalau belum tahu cara menghandle-nya.

# Penyelesaian Masalah

Buka Terminal dan jalankan perintah di bawah,

**Kalau pakai Bash Shell**

{% shell_user %}
systemctl restart --user {pipewire,wireplumber}.service
{% endshell_user %}

**Kalau bukan Bash Shell**

{% shell_user %}
systemctl restart --user pipewire.service
systemctl restart --user wireplumber.service
{% endshell_user %}


# Referensi

1. [Arch Wiki - PipeWire](https://wiki.archlinux.org/title/PipeWire){:target="_blank"}
<br>Diakses tanggal: 2023/06/17
