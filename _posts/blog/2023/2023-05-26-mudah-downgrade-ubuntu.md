---
layout: "post"
title: "Mudah! Downgrade Ubuntu 22.04 ke 20.04"
date: "2023-05-26 20:25"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2023/2023-05-26-mudah-downgrade-ubuntu"
author: "BanditHijo"
category: "blog"
tags: ["ubuntu"]
description: "Catatan kali ini, saya akan mendokumentasikan proses <i>downgrade</i> yang secara tidak terencana saya lakukan untuk menurunkan versi distribusi sistem operasi di salah satu komputer di Laboratorium Mikrobiologi Universitas Mulawarman, dari Ubuntu versi 22.04, turun ke versi 20.04, secara remote (jarak jauh) via TeamViewer."
---

## Pendahuluan

{{ page.description }}

> ***Downgrade*** merupakan proses yang bisa jadi sangat destruktif dan dapat merusak sistem anda.
> 
> Saya sangat merekomendasikan untuk melakukan ***backup*** terlebih dahulu, terhadap file-file yang penting.
> 
> Penulis tidak bertanggung jawab, terhadap kerusakan yang terjadi, akibat dari mengikuti catatan ini.


## Latar Belakang Masalah

Kakak kelas yang terkenal pintar dan santun, saat saya di sekolah, bernama **Alhawaris** menghubungi saya dengan maksud untuk berkonsultasi terkait sistem operasi Linux yang terpasang di salah satu komputer Laboratorium Mikrobiologi Fakultas Kedokteran Universitas Mulawarman, tempat ia bekerja. Kak Waris mengingat saya karena saya sering *sharing* perihal Linux di beranda Facebook. Saya mengatakan kepada beliau bahwa saya tidak percaya diri dengan kemampuan Linux saya, tapi saya akan coba dengarkan dulu, siapa tahu saya bisa bantu kak Waris.

Berdasarkan *short brief* yang disampaikan oleh kak Waris, bahwa **Dr. dr. Yadi, M.Si**, selaku Kepala Laboratorium Mikrobiologi Fakultas Kedokteran Universitas Mulawarman, menyampaikan untuk dapat dilakukan proses *downgrade* versi Ubuntu 22.04 ke 20.04, karena beberapa aplikasi yang digunakan untuk melakukan pengujian sample lab. tidak dapat berjalan dengan baik di Ubuntu 22.04.


## Strategi Pemecahan Masalah

Setelah saya *gathering information* dan melihat kebutuhan dari dokter Yadi dan kak Waris, saya coba untuk melakukan pendekatan *troubleshooting*, berdasarkan level risikonya.

1. **Level aplikasi**, menurut saya, level aplikasi memiliki risiko paling kecil, jika dihapus, masih dapat dipasang kembali. Jadi, saya mulai dari level aplikasi yang memiliki risiko paling kecil. Berdasarkan pengalaman saya, saya akan menurunkan beberapa library yang digunakan oleh aplikasi pendukung lab, dengan versi yang sesuai untuk library yang versionnya ikut naik bersama proses *distribution upgrade*. Jadi, tidak perlu menurunkan semua *packages* dari keseluruhan sistem, hanya beberapa *library packages* yang berkaitan dengan aplikasi pendukung lab saja.

2. **Level sistem**, level ini akan saya bagi dua,
    - ***Downgrade***, faktor risikonya cukup besar, tapi masih ada kemungkian berhasil. Secara teori, saya menilai hal ini *possible* untuk dilakukan. Seperti filosofi Unix, "*Everything (on Unix) is a file*" [2]. Jadi, hanya dengan mengganti konfiguasi beberapa file, memungkinkan untuk merubah value. Prinsip ini yang mendasari penilaian saya, bahwa *downgrade*, memungkinkan untuk dilakukan.
    - ***Reinstall***, adalah langkah paling akhir, apabila semua rencana di atas, gagal dilakukan. Sebisa mungkin saya menghindari langkah ini, karean *effort* yang dilakukan akan lebih besar, karena harus mengkonfigurasi dari awal.


## Batasan Pemecahan Masalah

Karena keterbatasan waktu, untuk membatasi *scope* penulisan dokumentasi ini agar tidak terlalu luas, saya memilih untuk mendokumentasikan proses pemecahan masalah hanya pada tahapan ***downgrade*** pada level sistem, untuk menurunkan versi dari distribusi sistem operasi Ubuntu 22.04 ke Ubuntu 20.04.


## Knowing the Situation

Saat ini, saya berada di sistem dengan sistem operasi Ubuntu 22.04. Berdasarkan informasi yang saya dapatkan, sebelum mendapatkan Ubuntu 22.04 via *system upgrade*, sistem ini memiliki Ubuntu 20.04. Jadi, tergetnya adalah menurunkan versi Ubuntu 22.04 ke 20.04.


## Langkah-langkah Pemecahan Masalah


### 1. Gathering information


#### 1.1. Mendapatkan informasi dari os-release

Saya akan menggunakan *command* di bawah ini untuk mengetahui versi dari Ubuntu.

```
$ cat /etc/os-release
```

```
PRETTY_NAME="Ubuntu 22.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.2 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

Nantinya, akan saya jalankan lagi, ketika telah berhasil menyelesaikan proses *downgrade*.


#### 1.2. Mendapatkan informasi kernel

Informasi dari kernel version, sebenarnya tidak begitu bermanfaat, tapi cukup *nice to know*.

```
$ uname -mrs
```

```
Linux 5.15.0-72-generic x86_64
```


### 2. Backup & modifikasi file sources.list


#### 2.1. Mendapatkan informasi repositori dari file sources.list

Ciri-ciri sistem Ubuntu yang telah melakukan proses *distribution upgrade* adalah, terdapat file bernama `sources.list.distUpgrade` di dalam direktori `/etc/apt/`.

```
📂 /etc/apt/
    ├─ 📄 sources.list
    ├─ 📄 sources.list.distUpgrade
    ...
```

> File `sources.list.distUpgrade` merupakan file `sources.list` pada versi Ubuntu sebelum dilakukannya *distribution upgrade*, dengan kata lain, jika saat ini versi Ubuntu yang terpasang adalah versi 22.04, artinya file `sources.list.distUpgrade` menyimpan data repositori untuk versi Ubuntu 20.04. Sedangkan, file `sources.list` berisi repositori untuk Ubuntu versi 22.04.

Periksa isi dari file `sources.list`, apakah terdapat kata yang berhubungan dengan *codename* dari Ubuntu 22.04 (Jammy Jellyfish).

```
$ grep -wv "#" /etc/apt/sources.list
```

```
deb http://id.archive.ubuntu.com/ubuntu/ jammy main restricted
deb http://id.archive.ubuntu.com/ubuntu/ jammy-updates main restricted
deb http://id.archive.ubuntu.com/ubuntu/ jammy universe
deb http://id.archive.ubuntu.com/ubuntu/ jammy-updates universe
deb http://id.archive.ubuntu.com/ubuntu/ jammy multiverse
deb http://id.archive.ubuntu.com/ubuntu/ jammy-updates multiverse
deb http://id.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu jammy-security main restricted
deb http://security.ubuntu.com/ubuntu jammy-security universe
deb http://security.ubuntu.com/ubuntu jammy-security multiverse
```

Periksa juga isi dari file `sources.list.distUpgrade`, apakah terdapat kata yang berhubungan dengan *codename* dari Ubuntu 20.04 (Focal Fossa).

```
$ grep -wv "#" /etc/apt/sources.list.distUpgrade
```

```
#deb cdrom:[Ubuntu 20.04.6 LTS _Focal Fossa_ - Release amd64 (20230316)]/ focal main restricted
deb http://id.archive.ubuntu.com/ubuntu/ focal main restricted
deb http://id.archive.ubuntu.com/ubuntu/ focal-updates main restricted
deb http://id.archive.ubuntu.com/ubuntu/ focal universe
deb http://id.archive.ubuntu.com/ubuntu/ focal-updates universe
deb http://id.archive.ubuntu.com/ubuntu/ focal multiverse
deb http://id.archive.ubuntu.com/ubuntu/ focal-updates multiverse
deb http://id.archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu focal-security main restricted
deb http://security.ubuntu.com/ubuntu focal-security universe
deb http://security.ubuntu.com/ubuntu focal-security multiverse
```

Dari hasil pemeriksaan kedua file di atas, dapat terlihat, bahwa respositori Ubuntu 20.04 berada pada file `sources.list.distUpgrade`.

Karena tujuan saya, ingin melakukan *downgrade* dari Ubuntu 22.04 ke 20.04, maka saya akan melakukan modifikasi terhadap file `sources.list` yang saya lakukan pada langkah di bawah ini.


#### 2.2. Backup file sources.list

Saya perlu melakukan *backup* terhadap file repositori milik Ubuntu 22.04.

Masuk ke dalam direktori `/etc/apt/`.

```
$ cd /etc/apt
```

Ganti nama file `sources.list` menjadi `sources.list.jammy`. Saya berikan *suffix* ".jammy" karena *code name* dari Ubuntu 22.04 adalah "Jammy Jellyfish".

Karena file `sources.list` merupakan file dengan **root permission**, maka saya perlu menggunakan hak akses **root** dengan menambahkan *prefix command* `sudo` di bagian awal perintah `mv`.

```
$ sudo mv sources.list sources.list.jammy
```


#### 2.3. Rename file sources.list.distUpgrade

Kemudian, saya menjadikan file `sources.list.distUpgrade` menjadi file `sources.list`.

```
$ sudo mv sources.list.distUpgrade sources.list
```

Dengan begini, file `sources.list` sudah berisi mirror milik Ubuntu 20.04 (Focal Fossa).


### 3. Tambahkan APT Preference File

Saya perlu menambahkan file `focal` di dalam direktori `/etc/apt/preferences.d/`.

Tujuan dari menambahkan file APT preference, adalah untuk mengontrol *package version* yang akan digunakan dalam proses instalasi.

```
$ sudo vi /etc/apt/preferences.d/focal
```

```bash
!filename: /etc/apt/preferences.d/focal
Package: *
Pin: release n=focal
Pin-Priority: 1001

Package: *
Pin: release n=focal-updates
Pin-Priority: 1002

Package: *
Pin: release n=focal-security
Pin-Priority: 1003
```


### 4. Update mirrorlist

Setelah memodifikasi file `sources.list`, saya perlu melakukan sinkroniasi metadata.

```
$ sudo apt update -y
```

```
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]
Get:2 http://security.ubuntu.com/ubuntu focal-security/main amd64 DEP-11 Metadata [59,9 kB]
Get:3 http://security.ubuntu.com/ubuntu focal-security/universe amd64 DEP-11 Metadata [95,6 kB]
Get:4 http://security.ubuntu.com/ubuntu focal-security/multiverse amd64 DEP-11 Metadata [940 B]
Hit:5 http://id.archive.ubuntu.com/ubuntu focal InRelease
Get:6 http://id.archive.ubuntu.com/ubuntu focal-updates InRelease [114 kB]
Get:7 http://id.archive.ubuntu.com/ubuntu focal-backports InRelease [108 kB]
Get:8 http://id.archive.ubuntu.com/ubuntu focal-updates/main amd64 DEP-11 Metadata [275 kB]
Get:9 http://id.archive.ubuntu.com/ubuntu focal-updates/universe amd64 DEP-11 Metadata [409 kB]
Get:10 http://id.archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 DEP-11 Metadata [944 B]
Get:11 http://id.archive.ubuntu.com/ubuntu focal-backports/main amd64 DEP-11 Metadata [7.992 B]
Get:12 http://id.archive.ubuntu.com/ubuntu focal-backports/universe amd64 DEP-11 Metadata [30,5 kB]
Fetched 1.216 kB in 9s (133 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
27 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

Dapat terlihat, mirror sudah berganti mnejadi `focal-`.

Jika ada indikasi *upgrade packages*, abaikan dulu. Karena saat ini sistem masih berada pada Ubuntu 22.04, namun repositori sudah diarahkan ke Ubuntu 20.04.


### 5. Pasang aptitude package manager

Saya memerlukan package `aptitude` karena memiliki option `dist-upgrade` untuk melakukan *distribution upgrade*. Yang akan saya manfaatkan untuk proses *downgrade*. Option ini, sekarang dikenal dengan nama `full-upgrade`.

```
$ sudo apt install aptitude -y
```


### 6. Mulai proses downgrade

Proses *distribution update* ini akan memakan waktu yang cukup lama, karena banyaknya paket-paket yang harus diunduh.

```
$ sudo aptitude dist-upgrade -y
```


## Pesan Penulis

Terima kasih sudah mampir yaa.


## Referensi

1. [OMER CAKMAK, Downgrade Ubuntu to previous version? (100% Working)](https://www.golinuxcloud.com/downgrade-ubuntu/) \
   Diakses tanggal: 2023-05-26

1. [Wikipedia, Everything is a file](https://en.wikipedia.org/wiki/Everything_is_a_file) \
   Diakses tanggal: 2023-05-26
