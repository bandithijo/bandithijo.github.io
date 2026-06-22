---
layout: "post"
title: "Mengganti Fingerprint ThinkPad X260"
date: "2026-06-22 06:17"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-06-22-mengganti-fingerprint-thinkpad-x260"
author: "BanditHijo"
category: "blog"
tags: ["thinkpad", "fingerprint"]
description: "Proses penggantian fingerprint ThinkPad X260."
---

Fingerprint di ThinkPad X260 adalah peripheral yang sangat memudahkan saya untuk authentikasi, terutama saat menjalankan command terminal yang menggunakan `sudo`. Sangat praktis, tinggal finger scroll, tidak perlu mengetik password.

Meskipun saya menggunakan Linux, tapi fingerprint tetap dapat digunakan. Saya sudah pernah menulis artikel tentang ini, [Mengatur Fungsi dari Fingerprint pada Arch Linux]({{ site.url | absolute_url  }}/blog/mengatur-fungsi-fingerprint-arch-linux).

Kepraktisan tersebut tidak berlangsung lama, karena plafon kamar saya bocor, dan tetesannya mengenai palmrest (kejadian sekitar tahun 2017-2018). Untungnya fingerprint di ThinkPad X260 ini adalah modul board terpisah dari Motherboard, jika rusak, cukup mengganti fingerprint board module saja.

![Gambar 1]({{ page.assets | absolute_url }}/gambar_01.jpg)

Gambar 1. Fingerprint Board (Tampak Atas)

![Gambar 2]({{ page.assets | absolute_url }}/gambar_02.jpg)

Gambar 2. Fingerprint Board (Tampak Bawah)

*Long story short*, fingerprint board yang saya pakai ini (berdasarkan keterangan seller) adalah copotan dari fingerprint board ThinkPad X250. Berdasarkan bentuk ThinkPad X260 memang memiliki kesamaan dengan seri X240 dan X250. Ketiga lineup seri ini memang memiliki parts yang bisa digunakan bersama.

Untuk mengganti fingerprint, harus mengangkat: internal battery (jika ada), drive (SSD) case, speaker left & right, dan motherboard.

![Gambar 3]({{ page.assets | absolute_url }}/gambar_03.jpg)

Gambar 3. Bongkar ThinkPad X260 sampai Motherboard

Kita melepas plat cover besi yang menutupi fingerprint board (Gambar 4).

![Gambar 4]({{ page.assets | absolute_url }}/gambar_04.jpg)

Gambar 4. Fingerprint Board Baru (Kiri) dan Fingerpint Board Lama (Kanan, masih tercover plat)

Setelah plat cover besi terlepas, fingerprint board sudah bisa untuk diganti. Jangan lupa untuk melepaskan kabel flexiblenya.

![Gambar 5]({{ page.assets | absolute_url }}/gambar_05.jpg)

Gambar 5. Fingerprint Board Baru (Kiri) dan Fingerpint Board Lama (Kanan, cover sudah terlepas, siap diganti)

Selesai.

Meskipun terlihat mengerikan, sebenarnya proses pembongkaran ini tidak terlalu sulit. Yang terpenting pelan-pelan dan hati-hati.