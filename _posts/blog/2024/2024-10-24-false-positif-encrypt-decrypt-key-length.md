---
layout: "post"
title: "False Positif Encrypt dan Decrypt Akibat Key Length"
date: "2024-10-24 07:14"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2024/2024-10-24-false-positif-encrypt-decrypt-key-length"
author: "BanditHijo"
category: "blog"
tags: ["encryption"]
description: "Tidak semua tool webapp converter atau encrypt/decrypt itu mampu mengkonversi dengan benar."
---

![Gambar 1]({{ page.assets | absolute_url }}/gambar_01.jpg)

TLDR; TIL. Tidak semua tool webapp converter atau encrypt/decrypt itu mampu mengkonversi dengan benar.

Kebetulan sedang kerja bareng dengan pihak eksternal, dan tool webapp converter yang menjadi rujukan untuk (memvalidasi) hasil konversi encrypt dan decrypt nya menggunakan salah satu tool; webapp converter yang ternyata setelah saya coba, terdapat kejanggalan pada proses pembuatan IV (Initialization Vector) yang merupakan salah satu bahan untuk membuat sample encrypt/decrypt dengan AES.

Panjang data pada IV yang diperbolehkan untuk AES adalah sebesar 128 bits / 16 bytes / 16 octets. No more, no less. Panjang IV harus sama panjang dengan block size dari algoritma cipher yang digunakan, dimana algoritma ciphernya adalah AES, dan AES menggunakan block size sebesar 128 bits / 16 bytes / 16 octets. [^1] [^2]

> "The AES uses a block size of sixteen octets (128 bits)." [^1]

> "The IV field MUST be the same size as the block size of the cipher algorithm being used." [^2]

16 bytes tidak hanya bisa didapatkan dari 16 digit karakter, namun 32 digit hexadecimal setelah dikonversi ke binary juga akan memiliki panjang 16 bytes. Namun, alih-alih mengkonversi 32 digit hexadecimal menjadi binary data sebesar 16 bytes, tool webapp converter tersebut malah memotong inputan IV yang berupa 32 digit hexadecimal menjadi 16 digit hexadecimal, dan menjadikannya sebagai IV. Walah!

Memang value hasil pemotongan 32 digit hexadecimal, menjadi 16 digit hexadecimal tersebut dapat diterima menjadi IV yang valid, namun sisa karakter yang dipotong menjadi tidak bermanfaat. Namun akan menjadi hal yang lain, jika memang disepakati untuk membuat "partial key / subset key", dimana dalam satu buah kunci, hanya sebagaian dari karakter atau bytes saja yang valid untuk digunakan sebagai key.

Karena tool webapp converter ini adalah usulan dari tim eksternal, saya mungkin perlu waktu lebih untuk menjelaskan perihal "bug" ini. Tidak cukup praktis, mengingat pace dari development sedang ngebut. Jadi, saya putuskan untuk mengusulkan menggunakan IV key sebesar 16 digit decimal, bukan 32 digit hexadecimal. Dengan begitu menjadi win-win solution. Library yang saya buat tidak perlu mengubah IV key apabila berupa 32 digit hexadecimal, cukup menggunakan 16 digit decimal yang sudah jelas memiliki panjang data sebesar 16 bytes / 16 octets / 128 bits. Daripada harus membahas perbedaan value yang dihasilkan oleh tool webapp converter dengan library yang saya buat. 😁

[^1]: [https://www.rfc-editor.org/info/rfc3602/#section-2.4](https://www.rfc-editor.org/info/rfc3602/#section-2.4)
[^2]: [https://www.rfc-editor.org/info/rfc3602/#section-3](https://www.rfc-editor.org/info/rfc3602/#section-3)