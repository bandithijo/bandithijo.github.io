---
layout: "post"
title: "Mudah Meremote Windows dengan FreeRDP"
date: "2020-11-27 09:17"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-11-27-mudah-meremote-windows-dengan-freerdp"
author: "BanditHijo"
category: "blog"
tags: ["freerdp", "remotedesktop"]
description: "Meremote desktop bukan lagi hal asing kalau kita menggunakan GNU/Linux. Saya pun juga sering menggunakan remote desktop untuk mengakses laptop Windows yang ada di ruangan lain. Dengan cara ini, saya tidak perlu repot-repot membawa dan memindahkan laptop tersebut ke ruangan saya. Cukup akses secara remote dengan RDP."
---

## Latar Belakang

Sejak masih kecil hingga sekarang, saya selalu kagum dengan hal-hal terkait "pengendali jarak jauh" (remote).

Baru 2019-2020 ini saya memanfaatkan workflow dimana saya me-remote laptop Windows (yang saat ini dipegang oleh istri) ke laptop saya, untuk mengerjakan sesuatu dengan aplikasi Windows. Namun, saya cukup mengoperasikannya melalui laptop saya. Keren 😎 !

**Kangen dengan Windows, bang?**

Bukan bukan. Ini lebih ke "menunjukkan betapa fleksibel-nya GNU/Linux (dalam hal ini user dan didukung oleh aplikasinya)" dalam menyelesaikan suatu pekerjaan.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Tampilan dual monitor yang saya pergunakan

Bagian monitor di bagian atas adalah monitor external, tempat saya menampilkan Windows. Dan Monitor di bawah adalah latop, tempat saya menggunakan Linux.

Saya dapat dengan mudah berpindah-pindah antar Windows dan Linux.

Misal, saya manfaatkan untuk melihat desain dari web yang sedang saya kerjakan dengan menggunakan Chrome.

![Gambar 2]({{ page.assets }}/gambar-02.png)

Gambar 2. Workflow saya dalam bekerja ketika mendevelop web

Kalau saya buka di Laptop saya, akan cukup memakan resource. Maka saya memilih membukanya di Windows, kemudian saya akses dengan remote.


## Pemecahan Masalah

Untuk terhubung dengan sistem Windows secara remote, kita dapat memanfaatkan protokol komunikasi yang dibangun oleh Mirosoft. Protokol yang digunakan adalah Remote Desktop, atau yang lebih dikenal dengan RDP (*Remote Desktop Protocol*).

RDP sendiri adalah *propietary procotol* yang di-develop oleh Microsoft guna memberikan pengguna *graphical interface* untuk terhubung dengan komputer yang lain melalui *network connection*.

Biasanya saya hanya melakukan transfer file protokol dengan samba atau sftp.

Saya baru terpapar dan mencoba RDP ketika mengikuti course dari Dicoding Cloud Academy dengan materi AWS (kira2 2019). Saat itu ada submission yang menugaskan untuk melakukan remote ke instance yang dibangun dengan GNU/Linux dan Windows Server. Nah, saat melakukan remote ke Windows Server inilah saya baru mencicipi RDP secara langsung. Dan ketagihan sampai sekarang 😄.

Ada beberapa client untuk RDP yang pernah saya coba, yang pertama kali saya gunakan adalah [**Remmina**](https://remmina.org/). Remmina memiliki graphical user interface yang sangat mudah dipahami. Saya cukup lama menggunakan Remmina.

Namun, semakin kesini, saya memilih untuk menggunakan RDP client yang lebih minimalis, yaitu [**FreeRDP**](https://www.freerdp.com/). FreeRDP dapat kita jalankan dengan menggunakan opsi-opsi tertentu dari Terminal. Kemudian, setelah terhubung, akan terbuka Window yang menampilkan Windows. Sangat sederhana sekali. Tidak ada toolbar dan tombol-tombol --ini yang saya mau. Gambar 1 & 2 adalah contoh dari RDP client menggunakan FreeRDP.


## Instalasi FreeRDP

Kalau teman-teman menggunakan Arch Linux.

```
$ sudo pacman -S freerdp
```


## Cara Menggunakan

Binary dari FreeRDP diberi nama `xfreerdp`.

Panduan penggunaan dari FreeRDP, dapat dengan mudah dibaca pada,

```
$ man xfreerdp
```

Terdapat banyak sekali **options** yang dapat digunakan.

Yang saya gunakan seperti ini.

```
$ xfreerdp /u:bandithijo /v:192.168.4 /sound /video +auto-reconnect +clipboard +home-drive +drives /f
```

Option yang saya gunakan di atas,

`/u:`, adalah username dari Windows yang akan saya remote.

`/v:`, adalah alamat IP server RDP, dalam hal ini adalah alamat IP dari Windows yang akan saya remote.

`/w:`, adalah lebar window yang akan terbuka.

`/h:`, adalah tinggi window yang akan terbuka.

`/sound` & `/video`, untuk mengaktifkan fitur sound dan audio. Tapi tidak begitu nyaman.

`+auto-reconnect`, otomatis reconnect.

`+clipboard`, mengaktifkan fitur clipboard.

`+home-drive`, sharing Host home directory ke guest.

`/f`, full screen.

Saya tidak memasukkan password, karena `/p:` password akan diminta saat kita terhubung dengan Windows.

Option-option lain yang lebih lengkap, dapat teman-teman lihat di man pages dari FreeRDP.

Mungkin ada option-option luar biasa yang teman-teman perlukan, namun saya belum sempat mencobanya.


## Tambahan


### Bagaimana cara berpindah focus?

Untuk melepaskan focus dari mouse pointer yang berada di dalam FreeRDP, dapat menggunakan <kbd>Right Ctrl</kbd>.


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [freerdp.com](https://www.freerdp.com) \
   Diakses tanggal: 2020-11-27

1. [github.com/FreeRDP/FreeRDP](https://github.com/FreeRDP/FreeRDP) \
   Diakses tanggal: 2020-11-27

1. [https://github.com/FreeRDP/FreeRDP/issues/931#issuecomment-340802163](https://github.com/FreeRDP/FreeRDP/issues/931#issuecomment-340802163) \
   Diakses tanggal: 2020-11-27
