---
layout: "post"
title: "Evince, PDF Reader yang Menjadi Favorit Saya Sejak Lama"
date: "2019-02-04 23:24"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-02-04-evince-pdf-reader-yang-saya-gunakan"
author: "BanditHijo"
category: "blog"
tags: ["evince"]
description: "Saya adalah Gnome user sejak GNOME2. Sayangnya, laptop saya saat ini sudah tidak dapat menggunakan GNOME3. Namun, meski demikian, keuntungan dari GNU/Linux adalah kita bebas menggunakan komponen aplikasi yang ada di dalamnya. Evince adalah salah PDF reader yang menjadi default PDF reader di GNOME yang meski saat ini saya sudah menggunakan Window Manager, namun masih tetap saya gunakan. Apa alasannya? Simak catatan dan ulasannya pada artikel ini."
---

## Prakata

PDF reader adalah salah satu aplikasi yang sudah menjadi kebutuhan saya selain Terminal dan Browser. Saya juga cukup sering menghabiskan waktu sembari membaca-baca *ebook* melalui aplikasi PDF reader.

Setiap dari pengguna distribusi sistem operasi GNU/Linux biasanya memiliki PDF reader favorit masin-masing. Saya pun demikian, memiliki satu PDF reader yang menjadi andalan, yaitu **Evince**.

Apapun *Desktop Environment* yang saya gunakan, seperti: GNOME, XFCE, maupun *Window Manager*, seperti: i3wm, saya tetap menggunakan Evince sebagai PDF reader.

Evince, yang sekarang lebih dikenal dengan **GNOME/Document viewer** adalah salah satu aplikasi pendukung GNOME desktop yang dapat kita pergunakan untuk membuka/membaca dokumen dengan banyak format, yaitu: PDF, PostScript, DjVu, tiff, dvi, XPS, Comic (cbr, cbz, cbt). Untuk daftar lebih lengkap dapat mengunjungi [*Supported Document Formats*](https://wiki.gnome.org/Apps/Evince/SupportedDocumentFormats).

Saya sendiri lebih sering memanfaatkan Evince untuk membuka file dengan format PDF.

Untuk dapat mendukung format PDF, Evince menggunakan *backend* **Poppler**. Poppler adalah kepustakaan yang digunakan untuk merender file PDF yang berbasiskan `xpdf-3.0`.

Meskipun Evince saat ini lebih dikenal dengan **Document viewer**, namun penggunaan nama **evince** masih diterapkan dalam beberapa hal seperti: *excutable name* (`Exec=evince`), *nama paket*, dll.


## Instalasi

Untuk memasang **Evince**, biasaya sudah terdapat pada daftar paket-paket yang ada pada **Gnome Desktop**. Namun, kita dapat memasangnya secara independen.

Pilih saja salah satu mana dari paket Evince di bawah yang sesuai untuk teman-teman.

1. [extra/evince](https://www.archlinux.org/packages/extra/x86_64/evince/)
2. [aur/evince-no-gnome](https://aur.archlinux.org/packages/evince-no-gnome)

**extra/evince**

```
$ sudo pacman -S evince
```

**aur/evince-no-gnome**

```
$ yay -S evince-no-gnome
```


## Fitur-fitur

Apa keunggulan dari Evince yang membuat saya menjadikan Evince sebagai PDF reader andalan?


### User Interface yang Sederhana

![Gambar 1]({{ site.url }}{{ page.assets }}/gambar-01.png)

Gambar 1. Dual Page

![Gambar 2]({{ site.url }}{{ page.assets }}/gambar-02.png)

Gambar 2. Single Page

![Gambar 3]({{ site.url }}{{ page.assets }}/gambar-03.png)

Gambar 3. Side Pane: Thumbnails (kiri), Outline(tengah), Annotations(kanan)

![Gambar 4]({{ site.url }}{{ page.assets }}/gambar-04.png)

Gambar 4. Night Mode

![Gambar 5]({{ site.url }}{{ page.assets }}/gambar-05.png

Gambar 5. Highlight (Membuat dan Menghapus)


### Last Page Read

Evince akan menyimpan halaman terakhir yang kita baca. Sehingga memungkinkan saat kita buka file PDF tersebut, Evince akan menampilkan halaman dimana kita terkahir membaca.


### Keyboard Shortcut yang Mudah

**Navigasi**

Pada area kertas, kita dapat menggunakan navigasi yang mirip seperti Vim.

| Tombol | Fungsi |
|:---: | :--- |
| <kbd>J</kbd> | Scrolling kertas ke bawah |
| <kbd>K</kbd> | Scrolling kertas ke atas |
| <kbd>H</kbd> | Membuka halaman sebelumnya |
| <kbd>L</kbd> | Membuka halaman selanjutnya |

**Zoom in/out**

| Tombol | Fungsi |
|:---: | :--- |
| <kbd>+</kbd> | Zoom in |
| <kbd>-</kbd> | Zoom out |
| <kbd>CTRL</kbd>+<kbd>0</kbd> | Zoom 1:1 |
| <kbd>F</kbd> | Zoom Fit page |
| <kbd>W</kbd> | Zoom Fit width |

**Fungsi Lain-lain**

| Tombol | Fungsi |
|:---: | :--- |
| <kbd>C</kbd> | Contiuous scrolling |
| <kbd>D</kbd> | Toggle single/dual page |
| <kbd>F9</kbd> | Toggle open/close side pane |
| <kbd>CTRL</kbd>+<kbd>i</kbd> | Toggle Night Mode |
| <kbd>CTRL</kbd>+<kbd>L</kbd> | Go to Page Number |
| <kbd>CTRL</kbd>+<kbd>F</kbd> | Menampilkan Search bar |
| <kbd>CTRL</kbd>+<kbd>H</kbd> | Hightlihgt text |

**Touchpad Gesture**

![Gambar 6]({{ site.url }}{{ page.assets }}/gambar-06.png)


## Tambahan Konfigurasi

Apabila teman-teman ingin mengatur konfigurasi default Evince dapat menggunakan aplikasi `dconf-editor`.

Alamatnya ada di:

```
/org/gnome/evince/default
```

Di dalam sini terdapat beberapa konfigurasi *default* yang bisa kita atur seprti:

1. continuous
1. dual-page
1. show-sidebar
1. sidebar-size
1. show-toolbar
1. dll.

Maksud dari "*default*" di sini adalah konfigurasi yang akan diterapkan kepada Evince saat pertama kali di jalankan.


## Autoupdate Konten

Apabila teman-teman berurusan dengan edit-mengedit file PDF, misalkan seperti LaTeX yang kemudian dikonversi ke PDF menggunakan `pdflatex`. Maka setelah proses kompilasi `.tex` menjadi `.pdf` selesai, Evince akan langsung mengupdate isi dari file PDF tersebut secara otomatis.

![Gambar 7]({{ site.url }}{{ page.assets }}/gambar-07.png)

Gambar 7. Vim (kiri) sebagai LaTeX editor dengan Evince (kanan)


## Kekurangan

Kekurangan yang sampai saat ini masih saya rasakan adalah, pada sistem saya, Evince masih belum dapat digunakan untuk *push to print* (ngeprint langsung dari Evince, <kbd>CTRL</kbd>+<kbd>P</kbd>) -- Print Settings Window terbuka, namun tidak berdampak apa-apa saat kita menekan tombol print.

Untuk mengakali ini, saya biasa membuka PDF di Firefox, kemudian baru memanfaatkan fitur print dari PDF reader yang dimiliki oleh Firefox.


## Pesan Penulis

Apabila dari teman-teman mempunyai PDF reader favorit boleh banget direkomendasikan kepada saya. Tentunya yang memiliki fitur setidaknya sama atau ada fitur lebih yang tidak dimiliki oleh Evince.

Saya sudah pernah mencoba **Okular**, namun karena aplikasi Qt, saya kurang begitu senang dengan interface yang terlalu banyak icon. **xpdf**, **mupdf**, terlalu sederhana, tidak ada fitur-fitur yang saya perlukan seperti membuat da menghapus *highlight*.

Sepertinya segini dulu, mudah-mudahan bermanfaat.


## Referensi

1. [wiki.archlinux.org/index.php/GNOME/Document_viewer](https://wiki.archlinux.org/index.php/GNOME/Document_viewer) \
   Diakses tanggal: 2019-02-04

1. [wiki.gnome.org/Apps/Evince](https://wiki.gnome.org/Apps/Evince) \
   Diakses tanggal: 2019-02-04

1. [wiki.gnome.org/Apps/Evince/SupportedDocumentFormats](https://wiki.gnome.org/Apps/Evince/SupportedDocumentFormats) \
   Diakses tanggal: 2019-02-04

1. [poppler.freedesktop.org/](https://poppler.freedesktop.org/) \
   Diakses tanggal: 2019-02-04
