---
layout: 'post'
title: "Catatan dalam Menggunakan Command Line Shell"
date: '2021-03-01 00:35'
permalink: '/note/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'note'
tags: ['CMD']
wip: true
pin:
contributors: []
description: "Menggunakan command line shell, mungkin merupakan mimpi buruk bagi sebagian orang. Jangan khawatir, terkadang memang terasa mengerikan memasuki dunia baru yang kita belum mengenalnya. Belum terbiasa. Saya pun, terkadang masih sering lupa perintah-perintah yang akan digunakan. Untuk itulah catatan ini saya dokumentasikan."
---

# Prakata

Menggunakan Command Line Shell, mungkin merupakan mimpi buruk bagi sebagian orang.

Untuk teman-teman yang masih merasa seperti itu, jangan khawatir, kalian hanya belum terbiasa saja.

Saya pun, terkadang juga masih sering lupa perintah-perintah apa saja yang pernah saya gunakan.

Terlebih lagi, kalau perintah tersebut tidak sering saya gunakan, bisa dipastikan minggu depan, saya pasti sudah lupa.

Untuk itu, saya mempublikasikan catatan untuk teman-teman pembaca Blog BaditHijo, agar dapat sama-sama kita manfaatkan.

Terima kasih telah menjadi pembaca setia dan menemani saya sampai saat ini.


# Tips & Tricks


## Megecek lokasi direktori saat ini

Current Working Directory atau biasa disingkat dengan **cwd**, adalah lokasi/path lengkap, yang menunjukkan keberadaan kita saat ini.

Kita dapat menggunakan perintah,

```
$ pwd
```

```
/home/bandithijo/app/blog/
```

**pwd** adalah abreviation dari print name of current/working directory.


## Kembali ke direktori sebelumnya

Misalkan kita berada pada,

```
/home/bandithijo/app/blog/
```

Dan kita ingin mundur satu level ke direktori **app**, maka kita dapat menggunakan cara ini,

```
$ cd ..
```

Sekarang, kita sudah berada pada direktori **app**.

```
/home/bandithijo/app/
```


## Keluar dan masuk, lagi dari dan ke direktori saat ini

Cara cepatnya untuk keluar satu level dan masuk lagi ke direktori yang sama, dapat menggunakan,

```
$ cd -
```


## Menghapus seluruh inputan karakter

Apabila kita memiliki command yang panjang, namun tidak jadi dijalankan dan ingin dibersihkan,

Kita dapat membersihkannya dengan menggunakan kombinasi tombol:

<kbd>Ctrl</kbd>+<kbd>U</kbd>

Ilustrasinya,

**Sebelum**

```
$ sudo reflector --verbose --latest 5 --sort rate --save /etc/pacman.d/mirrorlist
```

**Sesudah**

```
_
```

Maka, inputan karakter yang kita masukkan sebelumnya, akan dihapus semua, dan dimulai dari awal.

Cara ini, juga dapat kita lakukan untuk membersihkan inputan password yang tidak terlihat (tidak ditampilkan).


## Melihat perubahan output dari waktu ke waktu

Ada beberapa tools yang ketika dijalankan hanya menampilkan output (stdout) satu kali, lalu berakhir.

Beberapa diantaranya seperti: `lsblk`, `lsusb`, `sensors`, dan lain-lain.

**Contoh kasus**

Misalnya saja, kita ingin melihat apakah flashdrive yang kita pasang sudah terdeteksi atau tidak dengan menggunakan perintah **lsblk**. Maka, kita perlu melakukannya berulang kali apabila ternyata setelah kita sambungkan dengan komputer, flashdrive belum terdeteksi.

Kita tidak perlu menjalankan perintah **lsblk** berulang kali. Cukup tambahkan **watch** tepat sebelum menjalankan **lsblk**.

```
$ watch lsblk
```

Maka **lsblk** akan dijalankan dan outputnya akan diperbaharui setiap 2 detik.

Untuk keluar dari **watch**, dapat menggunakan kombinasi tombol <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Cara penggunaan **watch** lebih lengkap, teman-teman dapat membaca [**man watch(1)**](https://man.archlinux.org/man/watch.1).
