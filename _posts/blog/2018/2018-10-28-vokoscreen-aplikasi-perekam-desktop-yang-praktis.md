---
layout: "post"
title: "Vokoscreen, Aplikasi Screen Recorder yang Praktis"
date: "2018-10-28 20:00"
permalink: "/blog/:title"
assets: "/assets/images/posts/2018/2018-10-28-vokoscreen-aplikasi-perekam-desktop-yang-praktis"
author: "BanditHijo"
category: "blog"
tags: ["vokoscreen", "screen recorder"]
description: "Aplikasi yang membantu mempermudah pekerjaan saya ini adalah Vokoscreen. Saya sudah pernah mencicipi beberapa dari aplikasi *screen recorder* seperti: Simple Screen Recorder (SSR), Open Boradcaster Studio (OBS), dan Kazam. Namun, selera saya jatuh pada Vokoscreen."
---

![Banner]({{ page.assets }}/banner_post_22.png)


## Prakata

Akhir-akhir ini sering sekali beberapa dari teman-teman di group Telegram menanyakan perihal aplikasi *screen recorder* yang saya gunakan. Saya memang kerap kali menjawab pertanyaan dengan memberikan video-video pendek tanpa suara dengan ukuran yang tidak lebih dari 1-2 MB. Tujuannya agar jawaban yang saya berikan dapat lebih mudah dipahami.

Aplikasi yang membantu mempermudah pekerjaan saya ini adalah **Vokoscreen**. Saya sudah pernah mencicipi beberapa dari aplikasi *screen recorder* seperti: **Simple Screen Recorder** (SSR), **Open Boradcaster Studio** (OBS), dan **Kazam**. Namun, selera saya jatuh pada Vokoscreen.


## Mengapa Saya Memilih Vokoscreen?


### 1. Praktis

Sejak program dipanggil kemudian kita melakukan proses perekaman, Vokoscreen dapat dioperasikan dengan sangat praktis. Salah satu faktor yang menyebabkan Vokoscreen saya katakan praktis adalah karena mendukung *shortcut key* pada setiap tombol fungsinya. Berikut ini adalah beberapa *shortcut key* yang biasa saya gunakan :

| **Sortcut Key** | **Fungsi** |
| --- | --- |
| **Kontrol Perekaman** |
| <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F10</kbd> | **START Recording** |
| <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F11</kbd> | **STOP Recording** |
| <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F12</kbd> | **PAUSE Recording** |
| **Kontrol Tambahan** |
| <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F9</kbd> | **Magnification Switch** |

Kesemua fungsi dari *shortcut keys* di atas sudah sangat memenuhi kebutuhan saya dalam membuat video demonstrasi pendek.


### 2. Interface yang mudah dioperasikan

Vokoscreen memiliki *user interface* yang apabila kita baru pertama kali menggunakannya, kita sudah langsung dapat mengerti bagaimana cara mengoperasikan aplikasi ini.

![Gambar 1]({{ page.assets }}/gambar-1.png)

Gambar 1. Tab Video

Pada **Tab Video** kita dapat mengatur :

1. Area yang ingin kita rekam. Terdapat tiga spesifikasi area, **Fullscreen**, **Window**, atau **Area**
2. **Display**. Digunakan untuk memilih monitor mana yang ingin kita rekam apabila menggunakan lebih dari satu monitor
3. **Magnification**. Digunakan untuk menampilkan kaca pembesar. Terdapat tiga ukuran kaca pembesar yang dapat kita gunakan
4. **Showkey**. Digunakan untuk menampilkan inputan keyboard ke dalam screen yang kita rekam
5. **Showclick**. Digunakan untuk menandai area screen yang kita klik. Bagian ini juga dapat kita kustomisasi
6. **Countdown**. Kita dapat menentukan berapa detik lamanya proses hitung mundur sampai proses perekaman dimulai

![Gambar 2]({{ page.assets }}/gambar-2.png)

Gambar 2. Tab Audio

Pada **Tab Audio** kita dapat mengatur :

1. **Enable** / **Disable** audio dengan mencentang *checkbox* Audio
2. Memilih driver Pulse atau Alsa

![Gambar 3]({{ page.assets }}/gambar-3.png)

Gambar 3. Tab Format

Pada **Tab Format** kita dapat mengatur :

1. **Frames**. Jumlah frame yang ingin kita gunakan. 24/25/30
2. **Format**. Format yang dapat kita pilih adalah: mkv, webm, mp4, gif, mov
3. **Videocodec**. Video codec yang dapat kita gunakan adalah: libx264, libx264rgb, libx265, mpeg4
4. **Lossless**. Kita juga dapat memilih hasil output videonya mau dikompres atau tidak
5. **Audiocodec**. Audio codec yang dapat kita gunakan adalah: libmp3lame, mp2, aac
6. Kita juga dapat memilih untuk ingin merekam mouse cursor atau tidak

![Gambar 4]({{ page.assets }}/gambar-4.png)

Gambar 4. Tab Preferences

Pada **Tab Preferences** kita dapat mengatur :

1. **Videopath**. Kita dapat menentukan pada direktori mana video hasil rekaman kita disimpan
2. **Player**. Kita dapat memilih player apa yang akan kita gunakan untuk melihat hasil rekaman apabila tombol <kbd>Play</kbd> yang ada di deretan bawah ditekan
3. **Recorder**. Kita dapat memilih aplikasi backend apa yang kita gunakan untuk merekam
4. Dan fitur-fitur lain yang dapat dilihat sendiri pada Gambar 4

![Gambar 5]({{ page.assets }}/gambar-5.png)

Gambar 5. Tab Webcam

Pada **Tab Webcam** kita dapat mengatur :

1. **Enable** / **Disable** webcam. Kita dapat merekam desktop sambil menyalakan webcam
2. Mengatur resolusi dari webcam
3. Mengatur mirrored, gray color, dan inverted

Namun, fitur ini jarang sekali saya gunakan. Saya biasa mengkombinasikan dengan aplikasi **Guvcview** untuk menampilkan webcam ke dalam layar.

![Gambar 6]({{ page.assets }}/gambar-6.png)

Gambar 6. Tab Ekstension

Saya belum pernah sama sekali menggunakan tab Ekstension ini.

![Gambar 7]({{ page.assets }}/gambar-7.png)

Gambar 7. Tab About


## Instalasi

Untuk memasang Vokoscreen terbilang cukup mudah. Silahkan siapkan direktori khusus atau direktori yang memang kalian sediakan untuk menyimpan aplikasi yang berupa source code.

Sebagai ilustrasi, saya selalu mengumpulkan aplikasi yang berupa *source code* pada direktori `~/app/`.

Kemudian jalankan perintah di bawah.

```
$ git clone https://github.com/vkohaupt/vokoscreen
```

Setelah proses *cloning* selesai, masuk ke dalam direktori yang sudah kita *cloning* dari GitHub tersebut.

```
$ cd vokoscreen
```

Di dalam direktori ini (`vokoscreen`) terdapat file bernama `INSTALL` yang berisi daftar paket-paket yang diperlukan oleh Vokoscreen (lihat bagian **Requires:**) dan yang dibutuhkan untuk mem-*build* Vokoscreen (lihat bagian **BuildRequires:**).

Lakukan pengecekan apakah semua paket-paket yang diperlukan sudah terpenuhi?

Apabila sudah, tinggal jalanakan perintah selanjutnya.

```
$ make
```

Perintah ini akan meng-*compile* *source code* Vokoscreen dan apabila proses kompilasi berhasil, akan menghasilkan file binary yang kita perlukan dengan nama `vokoscreen`.

Untuk menjalankannya, ikuti perintah di bawah.

```
$ ./vokoscreen
```


## Membuat App Launcher

Karena aplikasi ini kita kompilasi sendiri dari *source code*, terkadang belum terdapat *launcher* untuk memanggil Vokoscreen. Kita perlu untuk mengkonfigurasinya sendiri.


### 1. Membuat Symbolic Link

Pertama-tama kita akan membuat *symbolic link* untuk file binary `vokoscreen` yang sudah kita kompilasi sebelumnya yang akan kita letakkan pada `/usr/bin/` agar Vokoscreen dapat kita panggil via Terminal.

```
$ sudo ln -sf /home/bandithijo/app/vokoscreen/vokoscreen /usr/bin/vokoscreen
```

**Catatan:** gunakan alamat lengkap dari file `vokoscreen` yang kita kompilasi.

Apabila berhasil, sekarang coba buka Terminal dan panggil Vokoscreen.

```
$ vokoscreen
```

Apabila Vokoscreen berhasil terbuka, berarti kita dapat lanjut mengkonfigurasi *application launcher*.


### 2. Memindahkan Application Launcher

Beruntungnya di dalam direktori `../vokoscreen/applications/` sudah terdapat file `vokoscreen.desktop`. Ini adalah file *launcher* untuk memanggil aplikasi. Tinggal kita pindahkan ke tempat yang benar.

```
$ cd applications/
$ cp vokoscreen.desktop $HOME/.local/share/applications/vokoscreen.desktop
```

Apabila berhasil, sekarang coba panggil Vokoscreen menggunakan *application launcher* / *menu laucher* pada Desktop Environment yang kalian pergunakan.


## Workflow

Kira-kira seperti ini kebiasaan saya dalam menggunakan Vokoscreen.

![Voko 1]({{ page.assets }}/voko-1.gif)

Hasilnya seperti ini.

![Voko 2]({{ page.assets }}/voko-2.gif)

Nah, kira-kira seperti ini dulu yang dapat saya tuliskan.


## Pesan Penulis

Saat ini Vokoscreen 2.5.8-beta sudah tidak lagi dilanjutkan pengembangannya. Vokoscreen dilanjutkan ke project [**VokoscreeNG**](https://github.com/vkohaupt/vokoscreenNG) yang merupakan akronim dari Vokoscreen Next Generation. Saat tulisan ini ditulis VokoscrenNG sudah memasuki versi 2.9.5-beta.


## Referensi

1. [linuxecke.volkoh.de/vokoscreen/vokoscreen.html](http://linuxecke.volkoh.de/vokoscreen/vokoscreen.html) \
   Diakses tanggal: 2018-10-28

1. [github.com/vkohaupt/vokoscreen](https://github.com/vkohaupt/vokoscreen) \
   Diakses tanggal: 2018-10-28
