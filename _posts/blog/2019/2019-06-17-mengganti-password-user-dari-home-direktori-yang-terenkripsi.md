---
layout: "post"
title: "Mengganti Password User dari Home Direktori yang Terenkripsi"
date: "2019-06-17 13:18"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-06-17-mengganti-password-user-dari-home-direktori-yang-terenkripsi"
author: "BanditHijo"
category: "blog"
tags: ["ecryptfs", "encryption"]
description: "Memiliki Home direktori yang terenkripsi bukan berarti kita hanya dapat mengeset password hanya pada saat pertama kali enkripsi dibuat dan tidak dapat menggantinya. Tentu saja kita dapat menggantinya. Catatan berikut ini mudah-mudahan dapat membantu kalian memberikan gambaran, tentang bagaimana mengganti password terhadap home direktori yang terenkripsi."
---

> PERHATIAN!
> 
> Lakukan *backup* data sebelum melakukan proses di bawah.
> 
> Segala bentuk kerugian, seperti kehilangan data maupun rusaknya perangkat yang kalian gunakan, bukan merupakan tanggung jawab penulis.
> 
> *Do with Your Own Risk!*


## Prakata

Sudah merupakan sebuah keharusan sebagai *system administrator* untuk menerapkan penggantian *password* secara berkala.

Kedengarannya memang aneh kalau laptop pribadi sering berganti-ganti *password* secara berkala.

Saya adalah salah satu dari orang yang aneh tersebut.

Alasannya bukan karena menerapkan jadwal khusus untuk berganti *password* secara berkala, namun karena seringnya berkontribusi dalam menjawab pertanyaan teman-teman pada group Telegram, yang terkadang perlu untuk menampilkan demonstrasi berupa video dengan menampilkan *screenkey*. Hal ini menyebabkan *password* user saya terekspose karena saya lupa untuk menonaktifkannya.


## Permasalahanan

Karena Home direktori saya adalah direktori yang terenkripsi (menggunakan eCryptfs), disinilah letak tantangannya. Karena tentu saja prosedur untuk mengganti *password* menjadi tidak biasa.

Teman-teman dapat melihat catatan proses enkripsi Home direktori yang saya lakukan di sini, "[Mengenkripsi Home Direktori pada GNU/Linux]({{ site.url }}/blog/mengenkripsi-home-direktori-pada-gnu-linux)".


## Pemecahan Masalah

Setelah saya melakukan *research* kecil-kecilan, ternyata proses penggantian *password* pada Home direktori yang terenkripsi menggunakan eCryptfs tidaklah begitu sulit.

Saya akan bagi dalam dua langkah, agar lebih mudah untuk dipahami.

1. Mengganti *password* Home direktori yang terenkripsi dengan eCryptfs
2. Mengganti *password* username

Langkah di atas, memang tidak harus berurutan, namun saya merekomendasikan untuk mengerjakan tahap pertama lebih dahulu.


### Mengganti Password Home Direktori Terenkripsi

Memang kita dapat melakukannya pada *user* yang sedang kita aktif (*active session*).

Di awal saya mencoba pun, saya menggunakan *user* yang sedang aktif.

Namun, **saya sangat merekomendasikan untuk *logout* terlebh dahulu, dan menggunakan akun root**.

1. *Logout* terlebih dahulu.

2. Masuk ke TTY shell. Bisa TTY2 - TTY6. Pilih saja yang kosong.

   Dengan cara <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>F2</kbd> untuk TTY2

3. Login dengan **root**.

4. Jalankan perintah di bawah ini untuk mengganti *password* Home direktori yang terenkripsi dengan eCryptfs.

   ```
   $ ecryptfs-rewrap-passphrase /home/.ecryptfs/bandithijo/.ecryptfs/wrapped-passphrase
   ```

   Jangan lupa mengganti `bandithijo`, dengan username yang teman-teman gunakan.

   Apabila berhasil, akan mengeluarkan *output* seperti di bawah ini.

   ```
   Old wrapping passphrase: _
   ```

   Masukkan Terlebih dahulu *password* lama, kemudian baru dua kali *password* baru.

5. Dengan begini, proses mengganti *passphrase* dari Home direktori yang terenkripsi dengan eCryptfs telah selesai.

   **Jangan *logout* dulu, karena kita akan lanjut ke tahap berikutnya**.


### Mengganti Password User

Setelah sebelumnya kita berhasil mengganti *passphrase*/*password* dari Home direktori, langkah selanjutnya, kita akan mengganti *password* dari user yang kita gunakan.

Ini penting mengingat cara kerja dekripsi dari Home direktori menggunakan eCryptfs adalah dengan memanfaatkan PAM, maka kita perlu menyamakan *password* user dengna *passphrase* untuk dekripsi Home direktori.

Caranya tentu saja sudah sangat familiar.

```
$ passwd bandithijo
```

Jangan lupa mengganti `bandithijo` dengan username kalian.

Dengan begini tahapan mengganti *password* user dari Home direktori yang terenkripsi telah selesai.

Lakukan pengujian, apakah kalian bisa masuk ke desktop, dan lihat apakah Home direktori berhasil di-dekripsi secara otomatis.


## Pesan Penulis

Tulisan ini bukan merupakan tandingan dari dokumentasi eCryptfs. Silahkan merujuk pada dokumentasi eCryptfs resmi yang sudah saya sertakan pada bagian referensi di bawah.

Dapat pula teman-teman yang menggunakan Arch Linux, merujuk pada Arch Wiki eCryptfs yang sudah saya sertakan di bawah.

Sepertinya seperti ini saja.

Terima Kasih.


## Referensi

1. [wiki.archlinux.org/index.php/ECryptfs#Mounting_2](https://wiki.archlinux.org/index.php/ECryptfs#Mounting_2) \
   Diakses tanggal: 2019-06-17
