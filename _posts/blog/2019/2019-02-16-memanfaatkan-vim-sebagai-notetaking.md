---
layout: "post"
title: "Memanfaatkan Vim Sebagai Note-Taking"
date: "2019-02-16 12:22"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-02-16-memanfaatkan-vim-sebagai-notetaking"
author: "BanditHijo"
category: "blog"
tags: ["vim", "note-taking"]
description: "Sebagai seorang vimers tentu saja lebih senang menulis di atas Vim. Catatan kali ini saya ingin berbagi pengalaman saya dalam memanajeman Vim untuk digunakan sebagai note-taking."
---

# Prakata

**Apa itu *Note-Taking*?**

*Note-Taking* adalah kegiatan pencatatan informasi yang perlu kita catat. Misalnya, saat guru/dosen menerangkan di kelas, saat seminar, kajian, dan lain sebagainya. Terdengar sangat familiar bukan?

Tujuan dari *note-taking* dapat beraneka ragam, salah satu yang mendasari adalah untuk mengikat/mengabadikan informasi yang kita dapatkan, agar tidak hilang begitu saja.

Ada berbagai cara untuk melakukan *note-taking*, tapi dalam tulisan ini, tentu saja bukan itu yang ingin saya ulas. Hehe.

Bagi Teman-teman tertarik mempelajari beberapa metode *note-taking*, mungkin dapat memulai dari tautan ini: [The Best Note-Taking Methods For college students & serious note-takers](https://medium.goodnotes.com/the-best-note-taking-methods-for-college-students-451f412e264e).


# Permasalahan

Saya tidak ingin menggunakan aplikasi pihak ketiga untuk melakukan *note-taking*, dengan beberapa alasan yang mungkin dapat saya rincikan sebagai berikut:

1. Saya tidak ingin bergantung pada *platform* tertentu
1. Saya ingin menggunakan Vim text editor agar proses pencatatan menjadi lebih efektif dan efisien
1. Saya ingin menggunakan Markdown format, agar dapat dengan mudah saya salin menjadi bahan tulisan untuk Blog -- yang juga menggunakan Markdown format untuk menuliskan artikel
1. Saya ingin *note-taking* yang saya panggil dapat keluar dengan cepat, tanpa harus menunggu lama


# Pemecahan Masalah

Sekenario saat ini yang terpikirkan untuk memecahkan masalah yang saya hadapi adalah:

1. Membuat direktori khusus untuk menyimpan hasil dari *note-taking*
1. Membuat Shell script untuk memanggil Vim dan langsung membuka direktori dimana *note-taking* disimpan

Seperti itu saja. Sederhana bukan?


# Eksekusi

1. Buat direktori untuk menyimpan hasil *note-taking*. Terserah teman-teman.

   Saya memilih untuk meletakkan di dalam direktori `~/doc/notetaking/`.

   ```
   $ mkdir -p ~/doc/notetaking
   ```

   **doc** -- adalah Kependekan dari **Documents**. [Lihat bagaimana cara saya merubah penamaan direktori ini]({{ site.url }}/blog/merubah-nama-direktori-pada-home).

2. Selanjutnya, saya akan membuat file `README.md`, hanya untuk gaya-gaya saja, sebagai penanda bahwa ini adalah direktori yang saya pergunakan untuk *note-taking* dan mungkin di lain waktu akan saya tambahkan beberapa *rules* yang akan saya pergunakan dalam melakukan *note-taking* versi saya sendiri.

   ```
   $ cd ~/doc/notetaking
   $ touch README.md
   ```

   Isikan terserah kalian, saya akan mengisikan seperti ini.

   <pre>
   ```
    ████     ██            ██
   ░██░██   ░██           ░██
   ░██░░██  ░██  ██████  ██████  █████
   ░██ ░░██ ░██ ██░░░░██░░░██░  ██░░░██
   ░██  ░░██░██░██   ░██  ░██  ░███████
   ░██   ░░████░██   ░██  ░██  ░██░░░░
   ░██    ░░███░░██████   ░░██ ░░██████
   ░░      ░░░  ░░░░░░     ░░   ░░░░░░

    ██████████           ██     ██
   ░░░░░██░░░           ░██    ░░            █████
       ░██      ██████  ░██  ██ ██ ███████  ██░░░██
       ░██     ░░░░░░██ ░██ ██ ░██░░██░░░██░██  ░██
       ░██      ███████ ░████  ░██ ░██  ░██░░██████
       ░██     ██░░░░██ ░██░██ ░██ ░██  ░██ ░░░░░██
       ░██    ░░████████░██░░██░██ ███  ░██  █████
       ░░      ░░░░░░░░ ░░  ░░ ░░ ░░░   ░░  ░░░░░
   ```

   # NOTETAKING

   Adalah kumpulan dari notetaking yang saya kumpulkan dalam format markdown.
   Berada dalam satu direkotri bernama `notetaking`.

   Dipanggil menggunkaan shell script.

   ```
   $ touch ~/.local/bin/notetaking
   $ chmod +x ~/local/bin/notetaking
   $ vim ~/.local/bin/notetaking
   ```

   ```
   #!/bin/env sh

   $ cd $HOME/doc/notetaking
   $ vim .
   ```
   </pre>

3. Selanjutnya, saya akan membuat Shell script agar dapat saya panggil menggunakan Terminal atau *application launcher* seperti Rofi.

   Saya beri nama Shell script ini dengan `notetaking`.

   ```
   $ cd ~/.local/bin
   $ touch notetaking
   $ chmod +x notetaking
   $ vim notetaking
   ```

   Saya isikan dengan perintah dasar saja.

   ```bash
   #!/bin/env sh

   # Diperlukan untuk masuk ke dalam direktori
   cd $HOME/doc/notetaking

   # Diperlukan untuk membuka Vim pada current dir.
   # dan langsung membuka NERDtree
   vim .
   ```

4. Agar dapat mengaktifkan **NERDTree** pada Vim yang terbuka pada *current directory*, saya perlu menambahkan perintah di bawah pada `~/.vimrc`.

   ```
   $ vim ~/.vimrc
   ```

   Tambahkan saja pada bagian/section NERDTree apabila teman-teman memilikinya.

   ```viml
   " ...
   " ...

   " Open NERDTree when open a directory
   autocmd StdinReadPre * let s:std_in=1
   autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists("s:std_in") | wincmd p | ene | exe 'NERDTree' argv()[0] | endif

   " ...
   " ...
   ```

   **Sebelum,**

   ![Gambar 1](https://i.postimg.cc/nLgKpDzY/gambar-02.png)

   **Sesudah,**

   ![Gambar 2](https://i.postimg.cc/qRKsRv6f/gambar-03.png)

   Saya menggunakan NERDTree, untuk membuat file baru. Karena sudah terbiasa menggunakan NERDTree.

   Dengan menggunakan *keyboard shortcut*, <kbd>M</kbd>, Lalu untuk membuat file baru, <kbd>A</kbd>. Tinggal isi nama file yang akan kita buat.

5. Terakhir, tinggal membuat lauchernya saja, agar dapat dipanggil menggunakan *application launcher* seperti Rofi.

   ```
   $ cd ~/.local/share/applications
   $ touch notetaking.desktop
   $ vim notetaking.desktop
   ```

   Lalu, saya isikan seperti di bawah.

   ```
   [Desktop Entry]
   Name=Notetaking
   Comment=Script for Calling Vim to open Note-Taking Directory
   Exec=st -e '/home/bandithijo/.local/bin/notetaking'
   Icon=tomboy
   Categories=Documents;
   ```

   Pada bagian yang saya *marking*, saya menggunakan **St** terminal. Teman-teman dapat mengganti dengan Terminal emulator yang kalian pergunakan.


# Hasilnya

![Gambar 1](https://i.postimg.cc/mkGQFW7P/gambar-01.gif)


# Pesan Penulis

Sejauh ini saya puas dan sangat nyaman menggunakan cara ini untuk melakukan *note-taking*. Saya dapat memanggil *notetaking* dengan cepat tanpa harus ketinggalan mencatat informasi yang saya perlukan dari dosen. Sangat memudahkan urusan saya.

Sebenarnya cara inilah yang saya pergunakan sembari belajar menggunakan Vim text editor. Melakukan hal remeh temeh namun bermanfaat. Hehe.

Bagaimana? Apakah teman-teman memiliki cara yang seru juga? Boleh dong bagi-bagi informasinya.

Mudah-mudah tulisan sederhana ini dapat bermanfaat.
