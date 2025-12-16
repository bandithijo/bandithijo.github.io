---
layout: "post"
title: "Tremc, Terminal Torrent Client yang Praktis dan Mudah Digunakan"
date: "2020-11-02 19:00"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-11-02-tremc-terminal-torrent-client-praktis"
author: "BanditHijo"
category: 'blog'
tags: ["torrent", "tui"]
description: "Sebelumnya, saya sering menggunakan torrent client favorit saya sejak masih menggunakan OSX, yaitu Transmission. Namun, ternyata transmission memiliki daemon yang berjalan di background, lantas saya terpikir, kenapa tidak menggunakan user interface yang lebih sederhana, bukan dengan GUI melainkan dengan TUI. Tremc adalah salah satu user interface alternatif untuk transmission daemon yang dapat kita operasikan cukup menggunakan Terminal."
---

## Latar Belakang

**Tremc**, adalah TUI client untuk BitTorrent client Transmission.

Sejak masih menggunakan macOS --dulu disebut OSX--, saya sudah menggunakan Transmission sebagai torrent client.

Hingga migrasi ke GNU/Linux pada Desember 2014 sampai hari ini, saya masih menjadikan Transmission sebagai torrent client.

Sudah hampir dua pekan ini saya mecoba beralih menggunakan curses interface untuk Transmission yang disebut dengan Tremc.

Tremc ini merupakan fork dari **transmission-remote-cli** (sudah tidak lagi dimaintain, last commit Jan 16, 2017) yang dibangun dengan Python 3.


## Instalasi

Karena Tremc ini hanya TUI interface, tentunya kita perlu memasang program utamanya terlebih dahulu, yaitu **transmission-cli**.

Untuk Arch Linux, pasang paket **extra/transmission-cli**.

```
$ sudo pacman -S transmission-cli
```

Kemudian, pasang paket **aur/tremc-git**.

```
$ yay -S tremc-git
```


## Eksekusi

**NOTE!** Sebelum dapat membuka **tremc**, kita harus menjalankan **transmission-daemon** terlebih dahulu.

```
$ transmission-daemon
```

Secara otomatis, akan berjalan di background process.

Kalau tidak, tremc akan gagal dibuka, atau tidak akan berjalan sebagaimana mestinya.


## Konfigurasi


### tremc config

Tremc sudah menyediakan command untuk mengenerate file config.

```
$ tremc --create-config
```

Maka, file config akan tergenerate dan berada di lokasi.

```
$HOME/.config/tremc/settings.cfg
```

Berikut ini adalah file **settings.cfg** milik saya.

Tidak banyak yang perlu diubah, hanya blok [Colors] saja yang saya modifikasi sesuai preferensi saya.

```conf
!filename: $HOME/.config/tremc/settings.cfg
[Connection]
host                       = localhost
port                       = 9091
path                       = /transmission/rpc
username                   =
password                   =

[Sorting]
order                      = name

[Filtering]
filter                     =
invert                     = False

[Misc]
lines_per_torrent          = 2
torrentname_is_progressbar = True
file_viewer                = xdg-open %%s
file_open_in_terminal      = True

[Colors]
title_seed                 = bg:green,fg:black
title_download             = bg:blue,fg:black
title_idle                 = bg:yellow,fg:black
title_verify               = bg:magenta,fg:black
title_paused               = bg:default,fg:default
title_error                = bg:red,fg:default
download_rate              = bg:white,fg:black
upload_rate                = bg:white,fg:black
eta+ratio                  = bg:white,fg:black
filter_status              = bg:default,fg:default
multi_filter_status        = bg:default,fg:black
dialog                     = bg:default,fg:default
dialog_important           = bg:default,fg:red
file_prio_high             = fg:red,bg:default
file_prio_normal           = fg:default,bg:default
file_prio_low              = fg:yellow,bg:default
file_prio_off              = fg:blue,bg:default
```

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Tampilan tremc


### transmission-daemon settings.json

Secara default, lokasi dari file unduhan akan berada pada `/var/lib/transmission/Downloads/` direktori.

Hal ini diatur oleh **transmission-daemon** bukan dari **tremc**.

Maka dari itu, kita perlu merubah lokasi hasil unduhannya ke direktori yang ada di Home user.

```
$ sudo vim /var/lib/transmission/.config/transmission-daemon/settings.json
```

```json
!filename: /var/lib/transmission/.config/transmission-daemon/settings.json
{
    ...,
    "download-dir": "~/dwn/Torrent",
    ...,
    "incomplete-dir": "~/dwn/Torrent",
    ...,
}
```

`"download-dir":` dan `"incomplete-dir":`, adalah direktori file unduhan, rubah sesuai keingian kalian. Saya meletakkannya pada direktori **~/Downloads/Torrent/**.


## Keyboard Mapping

Tremc, sudah membundle keybind help info yang sangat mudah dipahami dan mudah diakses.


### Keymap Help

Tekan <kbd>F1</kbd> atau <kbd>?</kbd>.

![Gambar 2]({{ page.assets }}/gambar-02.png)

Apabila terdapat keterangan **More...**, kita dapat scroll ke bawah dengan <kbd>Page Down</kbd>.

Untuk melihat detail dari torrent, tekan <kbd>Enter</kbd>.

![Gambar 3]({{ page.assets }}/gambar-03.png)

Kemudian, pindah ke tab selanjutnya dengan <kbd>Tab</kbd> atau <kbd>-></kbd>.

![Gambar 4]({{ page.assets }}/gambar-04.png)

![Gambar 5]({{ page.assets }}/gambar-05.png)


### Add Torrent

Kita dapat menambahkan torrent dengan menekan tombol <kbd>a</kbd>.

![Gambar 6]({{ page.assets }}/gambar-06.png)

Saya lebih sering memasukkan alamat Magnet Link, seperti ini contohnya.

```
magnet:?xt=urn:btih:ba7a8d78a535a9bf22dbb4482b9174ea8fd70891&dn=archlinux-2020.11.01-x86_64.iso
```


### Move Torrent File

Secara default, file torrent akan diletakkan di direktori Downloads.

Kita dapat memindahkan ke direktori yang kita mau, dengan menekan tombol <kbd>m</kbd>, kemudian arahkan manual path direktori. Kita dapat menggunakan tombol <kbd>Tab</kbd> untuk auto complete.


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Untuk panduan lebih lengkap, teman-teman dapat mengunjungi halaman GitHub Readme dari Tremc.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [github.com/tremc/tremc](https://github.com/tremc/tremc) \
   Diakses tanggal: 2020-11-02
