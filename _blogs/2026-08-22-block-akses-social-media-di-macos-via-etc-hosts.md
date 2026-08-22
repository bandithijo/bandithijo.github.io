---
layout: "post"
title: "Block Akses Social Media di macOS via /etc/hosts"
date: "2026-08-22 10:00"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["etchosts"]
description: "Salah satu distraksi ketika bekerja menggunakan laptop adalah Social Media. Disable saja aksesnya!"
---

Jika sosial media mulai terasa sebagai distraksi produktivitas kamu sehari-hari, mungkin sudah waktunya untuk break up dengan social media.

Tidak perlu sampai tutup akun. Sekedar membatasi akses atau bahkan menutup aksesnya, saya rasa sudah cukup.

Saya cenderung memilih untuk menutup aksesnya. Sehingga ketika saya buka browser dan mengakses alamat dari social media tertentu, browser akan menampilkan `ERR_CONNECTION_REFUSED` *This site can't be reached*.

Dengan begitu, keinginan saya yang tadinya explosive untuk melihat social media, tiba-tiba dipatahkan karena aksesnya diblokir oleh system.

Saya memanfaatkan `/etc/hosts` untuk mendaftarkan alamat-alamat social media yang ingin saya batasi aksesnya.

```shell
!filename: /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost

# Social Media
127.0.0.1 facebook.com
127.0.0.1 www.facebook.com

127.0.0.1 threads.com
127.0.0.1 www.threads.com
127.0.0.1 threads.net
127.0.0.1 www.threads.net
127.0.0.1 57.144.14.192

127.0.0.1 instagram.com
127.0.0.1 www.instagram.com

127.0.0.1 twitter.com
127.0.0.1 www.twitter.com
127.0.0.1 x.com
127.0.0.1 www.x.com
```

Baris ke-11 ke bawah adalah daftar social media yang saya tambahkan untuk diblok.

Simpan perubahan terdapat file tersebut.

Dan jalankan command di bawah ini untuk mengaktifkannya.

```
$ sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

Setelah command di atas dijalankan, coba kunjungi social media tadi lewat browser. Harusnya sudah tidak dapat diakses.

Jika ingin membuka aksesnya, tinggal comment saja alamat-alamat dari social media tersebut, simpan, dan jalankan lagi command di atas.
