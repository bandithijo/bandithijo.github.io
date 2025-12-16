---
layout: "post"
title: "Barrier, Mengoperasikan Banyak Komputer hanya dengan Sebuah Mouse dan Keyboard"
date: "2020-01-05 18:22"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-01-05-berbagi-mouse-keyboard-dengan-barrier"
author: "BanditHijo"
category: "blog"
tags: ["barrier"]
description: "Mungkin gak sih mengoperasikan banyak komputer hanya dengan satu keyboard dan mouse? Sangat mungkin! Kita dapat menggunakan tools bernama Barrier. Barrier ini mirip dengan aplikasi berbayar Synergy. Kita dapat membuat 1 komputer menjadi server dan komputer-komputer lain sebagai client. Dengan begini, kita dapat mengontrol kursor dan keyboard hanya dari komputer server."
---

## Prakata

Mungkin teman-teman pernah dihadapkan pada situasi di mana, di depan kita, terdapat banyak komputer maupun laptop, yang mungkin bisa memiliki sistem operasi yang sama, maupun berbeda.

Setidaknya dua komputer/laptop saja yang kita perlukan untuk menyelesaikan pekerjaan kita, sudah cukup membuat repot karena kita harus berpindah mouse dan keyboard.

Artinya, semakin banyak komputer/laptop, semakin banyak mouse dan keyboard yang perlu kita gunakan untuk mengoperasikan komputer-komputer/laptop-laptop tersebut.

Saat masih menggunakan MacbookPro, beberapa tahun silam, saya pernah mencari-cari tools yang dapat mempermudah saya untuk berpindah-pindah cursor di antara dua laptop. Dalam pencarian ini, saya menemukan aplikasi yang bernama **Synergy**.[<sup>1</sup>](#referensi)

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Synergy

Synergy adalah aplikasi pembantu yang didevelop oleh Symless, yang dapat kita gunakan untuk berbagi mouse dan keyboard dengan banyak komputer  dengan usaha yang minim, yaitu, dengan menggerakkan cursor ke arah di mana posisi mesin yang lain kita tempatkan (*mapping*).

Synergy dapat dioperasikan pada sistem operasi macOS, Microsoft Windows, dan GNU/Linux. Cukup memerlukan jaringan Ethernet atau WiFi dan **tanpa memerlukan hardware tambahan**.


## Permasalahan

Sayangnya, Synergy tidak memiliki versi trial. Yang mengizinkan kita untuk terlebih dahulu mencoba. Namun, Synergy menjamin kalau aplikasi ini akan langsung berjalan dengan baik.


## Pemecahan Masalah

Lantas, baru-baru saja, saya menemukan alternatif dari Synergy namun bersifat open source.

**Barrier** adalah hasil *forked* dari *codebase* Synergy veri 1.9.[<sup>2</sup>](#referensi)


## Instalasi

Proses instalasinya juga cukup mudah.

Barrier sudah menyediakan aplikasi GUI untuk Windows, macOS dan GNU/Linux.

Saya hanya akan menjelaskan proses instalasi untuk GNU/Linx.

Untuk sistem operasi Windows dan macOS, dapat langsung mengunduh file instalasi pada halaman berikut ini.

[Download Barrier New Stable Release](https://github.com/debauchee/barrier/releases)

Untuk GNU/Linux, Barrier sudah terdapat pada repositori distro masing-masing.

![Gambar 2](https://repology.org/badge/vertical-allrepos/barrier.svg)

Gambar 2. [https://repology.org/project/barrier/versions](https://repology.org/project/barrier/versions)

Karena saya menggunakan Arch, maka saya menggunakan AUR helper.

```
$ yay barrier
```

Terdapat dua tipe, Barrier GUI dan Barrier Headless

```
2 aur/barrier-headless 2.3.2-1 (+31 2.24%)
    Open-source KVM software based on Synergy (client and server CLI binaries)

1 aur/barrier 2.3.2-1 (+31 2.24%)
    Open-source KVM software based on Synergy (GUI)
```

![Gambar 3]({{ page.assets }}/gambar-02.png)

Gambar 3. Proses instalasi Barrier dengan Yay

Saya mencoba memasang yang GUI, untuk mendapatkan *user experience* GUI terlebih dahulu.

Bagi yang ingin memasang sendiri dari source code, dapat merujuk ke panduan yang disertakan pada wiki Barrier [di sini](https://github.com/debauchee/barrier/wiki/Building-on-Linux).

Nah, kalo sudah dipasang, saat pertama kali dijalankan, kita akan dihadapkan pada tampilan window seperti ini.

![Gambar 4]({{ page.assets }}/gambar-03.png)

Gambar 4. Welcome Page dari Barrier

![Gambar 5]({{ page.assets }}/gambar-04.png)

Gambar 5. Window Utama untuk Memilih Sebagai Client atau Server

Pada contoh di atas, saya menggunakan ThinkPad X61 (GNU/Linux) sebagai server, dan ThinkPad X260 (Windows 10) sebagai client.

Server artinya, mesin yang kita setup sebagai server akan kita gunakan mouse dan keyboardnya untuk menjelajah ke mesin-mesin lain yang di setup sebagai client.

![Gambar 6]({{ page.assets }}/gambar-05.png)

Gambar 6. Konfigurasi Layout yang ada di Server

Nah, sepertinya segini saja dulu.

Untuk lebih lengkapnya silahkan merujuk pada dokumentasi dari Barrier.

Demonstrasi video menyusul yaa.

Terima kasih.

(^_^)


## Referensi

1. [symless.com/synergy](https://symless.com/synergy) \
   Diakses tanggal: 2020-01-05

1. [github.com/debauchee/barrier](https://github.com/debauchee/barrier) \
   Diakses tanggal: 2020-01-05
