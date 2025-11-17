---
layout: "post"
title: "St, Simple/Suckless Terminal yang Sudah Lama Saya Dambakan"
date: "2019-02-08 17:08"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-02-08-st-simple-terminal-dari-suckless"
author: "BanditHijo"
category: "blog"
tags: ["terminal emulator", "simple terminal", "st"]
description: "ST sangat saya inginkan karena kesederhanannya. Karena minimalisnya inilah saya ingin menjadikannya basis untuk meracik terminal yang sesuai dengan yang saya inginkan."
---

# Prakata

Tidak saya pungkiri bahwa [Kai Hendry](https://github.com/kaihendry) yang memperkenalkan saya dengan [suckless.org](https://suckless.org/) melalui [video-video log-nya di YouTube](https://www.youtube.com/user/kaihendry) banyak memberikan saya pengaruh dalam menggunakan sistem operasi GNU/Linux, terkhusus Arch Linux.

Ditambah lagi [Donovan Nagel](https://www.i-bsd.com/) melalui [video-video log-nya](https://www.youtube.com/c/iBSDTV) yang memperkenalkan BSD family dengan menggunakan beberapa aplikasi Suckless juga. Rasa-rasanya sayang kalau saya tidak ikut-ikutan mencoba aplikasi-aplikasi dari Suckless.

Selama ini saya hanya memanfaatkan **dmenu**, itu pun tidak benar-benar menggunakan dmenu karena saya kombinasikan dengan **Rofi** sebagai application launcher dan banyak hal lainnya.

Saya tertarik menggunakan **dwm**, *Dynamic Window Manager*, sebuah window manager yang dikelola oleh Suckless. Karena kedua orang di atas menggunakan window manager ini. Namun, saya masih menyukai [**i3wm** dan belum menemukan jalan buntu]({{ site.url }}/blog/i3wm-window-manager-yang-taktis-namun-praktis).


# Permasalahan

Malam tadi, **Termite** salah satu Terminal emulator yang saya gunakan dan saya andalkan tiba-tiba saja salah dalam menampilkan glyph font untuk simbol-simbol bawaan dari **Devicons**. Saya mendapati kesalahan ini pada **NERDTree** (vim sidebar file manager) dan **Ranger**.

![Gambar 1](https://i.postimg.cc/4N8gJ2p5/gambar-01.png)

Gambar 1. Termite dan ST

Saya sudah mencoba Terminal emulator yang lain, seperti gnome-terminal, xfce4-terminal, lxterminal, kitty, alacritty, semua menampilkan kesalahan yang sama seperti yang dialami oleh Termite. Permasalahan ini hanya dialami oleh Terminal yang berbasis VTE.


# Pemecahan Masalah

Karena alasan tersebut, saya akhirnya memutuskan untuk bermigrasi secara penuh dalam menggunakan St Terminal.

Mungkin saja, sebenarnya saya dapat mengatasi permasalahan dalam menampilkan glyph font ini, namun saya lebih memilih jalan untuk memigrasikan Terminal. Mumpung momennya sedang pas. Karena saya memang ingin pelan-pelan bermigrasi menggunakan aplikasi besutan dari Suckless. Karena dapat sekalian mengerti sedikit-sedikit bahasa C.

**Apa itu Simple/Suckless Terminal?**

Dapat di baca sendiri [di sini](https://st.suckless.org/patches/alpha/)


# Instalasi

Proses instalasi St Terminal menurut saya sangat-sangat mudah.

1. Kunjungi link dari St Terminal, [di sini](https://st.suckless.org/).

2. Scroll ke bagian paling bawah dari halaman, kita akan menemukan dua versi St yang dapat kita gunakan. Saya memilih versi `st 0.8.1` ketimbang menggunakan versi development dari Git.

3. Klik kanan link dari [`st 0.8.1`](https://dl.suckless.org/st/st-0.8.1.tar.gz) (2018-03-20) dan pilih **Copy Link Location**.

4. Buka Terminal, dan arahkan ke dalam direktori `~/.config/`.

   ```
   $ shell:user
   ```

5. Download dengan menggunakan `wget`.

   ```
   $ wget "https://dl.suckless.org/st/st-0.8.1.tar.gz"
   ```

6. Ekstraksi paket `st-0.8.1.tar.gz` tersebut.

   ```
   $ tar -xvf st-0.8.1.tar.gz
   ```

7. Rename direktori hasil ekstraksi.

   ```
   $ mv st-0.8.1 st
   ```

8. Masuk ke dalam direktori `st`

   ```
   $ cd st
   ```

   Secara default paket `st-0.8.1` akan berisi seperti ini.

   ```
   total 292
   -rw-r--r--  1036 arg.h
   -rw-r--r-- 20114 config.def.h
   -rw-r--r--   602 config.mk
   -rw-r--r--  7158 FAQ
   -rw-r--r--   732 LEGACY
   -rw-r--r--  1834 LICENSE
   -rw-r--r--  1253 Makefile
   -rw-r--r--   723 README
   -rw-r--r--  3667 st.1
   -rw-r--r-- 55693 st.c
   -rw-r--r--  2835 st.h
   -rw-r--r--  3685 st.info
   -rw-r--r--   458 TODO
   -rw-r--r--  1039 win.h
   -rw-r--r-- 44048 x.c
   ```

9. Saya memilih untuk me-*rename* file `config.def.h` daripada meng-*copy* nya.

   ```
   $ mv config.def.h config.h
   ```

   File konfig header ini berisi konfigurasi untuk font style, font size, fungsi keyboard, colorscheme, dan lain-lain.

10. Selanjutnya, bisa coba di compile dulu. Sekedar memastikan bisa di compile saja.

    ```
    $ sudo make install
    ```

    Nanti akan terbuat file binary yang bernama `st`.

    Kalau ingin dibuild lagi secara **clean**.

    ```
    $ sudo make uninstall; sudo make install
    ```

    Hasil make ini akan berada pada `/usr/local/bin/st`.

Pada versi `0.8.1` ini, St sudah memiliki fitur-fitur bawaan seperti:

| <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>C</kbd> | Copy |
| <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>V</kbd> | Paste |
| <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>PgUp</kbd> | Zoom In |
| <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>PgDn</kbd> | Zoom Out |
| <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>Home</kbd> | Zoom Normal |

Namun, belum terdapat beberapa fungsi yang saya perlukan seperti:

1. Scroll back dengan keyboard dan mouse
1. Transparansi (optional)

Untuk itu, saya perlu untuk menambahkan beberapa patch.


# Patch

Patch yang saya gunakan tidak banyak. Beberapa di antaranya.

**Solarized Colors**

1. [st-no bold colors-0.8.1.diff](https://st.suckless.org/patches/solarized/st-no_bold_colors-0.8.1.diff) \
  Patch ini untuk memperbaiki warna pada bold font yang biasanya ditampilkan salah.

2. [st-solarized-both-0.8.1.diff](https://st.suckless.org/patches/solarized/st-solarized-both-0.8.1.diff) \
  Patch ini untuk dapat menggunakan Solarized colorshceme dan berganti antara Dark dan Light menggunakan <kbd>F6</kbd>.

**Scrollback**

1. [st-scrollback-0.8.diff](https://st.suckless.org/patches/scrollback/st-scrollback-0.8.diff) \
  Patch ini untuk menambahkan fitur scrolling back ke atas dan ke bawah menggunakan keyboard, <kbd>SHIFT</kbd>+<kbd>PgUp</kbd> dan <kbd>SHIFT</kbd>+<kbd>PgDn</kbd>.

2. [st-scrollback-mouse-0.8.diff](https://st.suckless.org/patches/scrollback/st-scrollback-mouse-0.8.diff) \
  Patch ini untuk menambahkan fitur scrolling back ke atas dan ke bawah menggunakan mouse, <kbd>SHIFT</kbd>+Scrolling Up  dan <kbd>SHIFT</kbd>+Scrolling Down.

3. [st-scrollback-mouse-altscreen-0.8.diff](https://st.suckless.org/patches/scrollback/st-scrollback-mouse-altscreen-0.8.diff) \
  Patch ini untuk membuat scrolling back ke atas dan ke bawah tanpa perlu menekan tombol <kbd>SHIFT</kbd> terlebih dahulu.

**Alpha**

1. [st-alpha-0.8.1.diff](https://st.suckless.org/patches/alpha/st-alpha-0.8.1.diff) \
  Patch ini untuk menambahkan fitur alpha atau transparansi pada background Terminal.

   > INFO
   > 
   > 2019/04/24, Saya sudah tidak lagi menggunakan patch Alpha. Saya lebih memilih mengatur alpha atau opacity menggunakan `compsitor` seperti `compton`.
   > 
   > Berikut ini adalah pengaturan pada compton yang saya gunakan.
   > 
   > ```
   > opacity-rule = [
   > "95:class_g = 'URxvt'",
   > "95:class_g = 'st-256color'",
   > ];
   > ```
   > Nilai dari `95` adalah nilai dari opacity (0 - 100).

**Bagaimana cara menggunakan patch ini?**

Saya melakukan *patching* secara manual dan tidak menggunakan perintah `patch`. Proses *patching* inipun tidak sulit, hanya copy dan paste saja. Tidak memerlukan pengetahuan bahasa C.

Setelah melakukan *patching* jangan lupa di *compile* kembali untuk dapat melihat hasilnya.

**Bagaimana caranya?**

Akan saya buatkan video tutorialnya di kesempatan yang lain. Saat ini sedang kurang enak badan.

Saya kasih previewnya dulu saja gpp yaa. Hehe.

{% youtube w9l3-ZkXPT4 %}


# Hasilnya

Saya sangat puas dengan hasilnya. Dikarenakan ada beberapa hal yang saya tidak dapati pada Terminal emulator yang lain. Seperti:

1. Sangat cepat saat dipanggil (*startup*)
1. Bold font dapat menampilkan warna yang sesuai
1. Perpindahan dari Solarized Dark dan Light sangat halus dan tidak ada warna yang salah.
1. Glyph font yang sesuai
1. Dapat menghandle w3m dalam Ranger dengan baik

![Gambar 2](https://i.postimg.cc/gcQWhNYs/gambar-02.gif)


# Kekurangan

1. Saya masih belum dapat menggunakan tombol <kbd>DELETE</kbd> sebagai mana fungsinya. Karena saat ini fungsi tombol ini malah menampilkan karakter `~`.

   Ada patch untuk **delkey**, namun setelah saya coba, malah berfungsi selayaknya <kbd>BACKSPACE</kbd>.

   Saya memerlukan <kbd>DELETE</kbd> untuk fungsi "Move to Trash" pada Ranger. Sehingga saat ini saya memindahkan fungsinya ke tombol <kbd>F8</kbd>.

2. Link/URL yang *clickable*. Fitur ini juga masih belum saya cari tahu.


# Tambahan Konfigurasi


## Window Title

Secara *default*, pada Window Title, st hanya menampilkan detail berupa tulisan "st".

Untuk dapat membuat Window Title menjadi lebih dinamis, dapat mengikuti catatan yang sudah saya tulis pada artikel ini, ["Konfigurasi Window Title untuk Simple/Suckless Terminal"]({{ site.url }}/blog/konfigurasi-window-title-st-terminal).


## Pengetesan Font

Akan sangat melelahkan apabila kita melakukan kompilasi berulang kali hanya sekedar untuk melihat dan menguji tampilan dari font yang ingin kita gunakan.

Teman-teman dapat menggunakan perintah di bawah ini,

```
$ st -f "Fira Code Retina:pixelsize=12"
```

atau seperti ini untuk penambahan style,

```
$ st -f "FuraCode Nerd Font:style=Retina:pixelsize=12"
```

Perintah di atas akan menghasilkan Simple/Suckless Terminal yang terbuka dengan konfigurasi font yang sudah kita berikan pada argument dengan option `-f`.

Gampang kan?


# Referensi

1. [st.suckless.org/](https://st.suckless.org/) \
   Diakses tanggal: 2019-02-08

1. [wiki.archlinux.org/index.php/St](https://wiki.archlinux.org/index.php/St) \
   Diakses tanggal: 2019-02-08
