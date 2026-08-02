---
layout: "post"
title: "10 Tahun Pakai Vim, Akhirnya Migrasi ke Emacs"
date: "2026-08-02"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-08-02-10-tahun-pakai-vim-akhirnya-migrasi-ke-emacs"
author: "BanditHijo"
category: "blog"
tags: ["emacs"]

description: "Tidak satu atau dua vim user yang bermigrasi ke Emacs tetapi tidak kembali dan tetap menggunakan Emacs. Kok bisa? Apa alasannya? Ada apa di Emacs?"
---

## Background Story

Pertama kali saya menggunakan Vim tahun 2016. Tentu saja saat itu saya tidak semahir sekarang (walaupun sekarang juga tetep masih cupu, wkwkwk).

2016 juga adalah tahun dimana saya sudah mulai bermigrasi secara penuh menggunakan Linux dari sebelumnya menggunakan macOS (saat itu namanya masih OSX) sejak tahun 2009.

Sudah beberapa kali melihat orang menggunakan Vim di YouTube. Tetapi baru tertarik saat melihat demonstrasi editing/manipulation text dengan menggunakan Vim yang terlihat seperti magic. Karena cursornya hanya bergerak sedikit tetapi modifikasi atau perubahan textnya bisa signifikan. Ajaib! Pikir saya saat itu. Petualangan saya menggunakan Vim pun dimulai.

Sudah 10 tahun ternyata!

Menggunakan Vim mengantarkan saya bertualang dan bertemu hal-hal baru dan juga teman-teman baru. Sungguh perjalanan yang luar biasa. Kalau saya tidak pakai Vim, mungkin tidak akan bisa berjalan sejauh ini.

Vim juga membersamai saya membuat hal-hal hebat bersama. Membuat konten-konten di YouTube tentang programming atau apapun, ngoding untuk hobi, ngoding untuk kerja, menulis dokumentasi teknis untuk kantor, menulis catatan belajar, bahkan blog ini pun dibangun dengan Vim dan artikelnya ditulis dengan Vim.


## Berkenalan dengan Emacs

Di antara tahun-tahun tersebut, sebenarnya saya juga sempat mencoba Emacs. Tapi selalu gagal.

> *Saat pakai Sublime Text, pengen pakai Atom.* \
> *Saat sudah pakai Atom, pengen pakai Vim.* \
> *Saat sudah pakai Vim, pengen pakai Emacs.* \
> *Saat sudah pakai Neovim, pengen pakai Emacs.*

Rumput tetangga memang selalu terlihat lebih hijau. Sudah pakai Vim/Neovim malah kepengen pakai Emacs.

Sebagai orang di luar ekosistem Emacs, saya tertarik dengan **Org mode** karena saya banyak melihat Emacs user menggunakan Org mode untuk:

1. Menulis catatan
2. Menulis buku atau dokumen atau artikel atau blog
3. Mengelola schedule dan to-do list
4. Mengelola project planning
5. Menulis configurasi namun ditulis dengan lebih naratif. (Belakangan saya tahu ternyata konsep ini disebut "Literate Programming" atau yang sekarang populer dengan "Literate Configuration" atau "Literate Dotfiles")

Yang membuat saya tertarik adalah cara mereka menulis hal itu semua (yang tersebut di atas) cukup berbeda dengan yang saya lakukan di Vim. Saya menggunakan Markdown sedangkan mereka menggunakan Org. Pikir saya mengapa mereka tidak menggunakan Markdown? Mengapa mereka menggunakan markup language sendiri yang tidak umum?

Yang lebih aneh lagi, mengapa mereka menulis file config seperti menulis artikel di blog? Dengan narasi deskriptif yang menjelaskan block code yang ada di bawahnya. Tapi anehnya ketika file yang terlihat seperti artikel blog itu disimpan, file configurasinya juga sudah jadi. Ilmu hitam macam apa lagi ini? Wkwkwk.

Ternyata Org itu adalah markup language khusus yang sudah sangat populer di environment Emacs. Format ini sudah banyak diadaptasi dan digunakan di berbagai macam framework atau package di Emacs.


## Percobaan Kesekian

Tahun ini pun, saya punya kesempatan mencoba Emacs lagi. Kalau saya ingat-ingat, ini sudah kali ketiga saya mencoba Emacs dengan menyelesaikan "**Emacs Tutorial**". Kali pertama dan kali kedua menyelesaikan Emacs Tutorial tidak menumbuhkan rasa nyaman. Mungkin karena saya masih sangat attach dengan Vim/Neovim karena saya masih pakai untuk ngoding.

2026 ini adalah tahunnya AI Agent. Saya sudah tidak lagi mengetik code program, tetapi lebih banyak menyusun dokumen spesification atau plan bersama AI dan AI Agent yang akan mengeksesuinya setelah specification atau plan selesai disusun. Mungkin ini sebabnya, ikatan antara saya dengan Vim/Neovim sudah jauh berkurang dari tahun-tahun sebelumnya. Hal ini pula yang menyebabkan saya mendapatkan rasa nyaman ketika menyelesaikan Emacs Tutorial di kali ketiga.

**30 Juni 2026 menjadi awal commitment saya untuk menggunakan Emacs!**

*Kenapa malah terdengar seperti komitmen karyawan korporat yaa ...*

Komitmen ini artinya saya bersungguh-sungguh untuk menelan semua keluhan dan menyelesaikan problem yang saya temukan selama menggunakan Emacs. Saya tidak akan mengeluh dan merengek saja tanpa berusaha menyelesaikan problem dalam saya menggunakan Emacs. Kalaupun ternyata masih belum ketemu atau tidak ada, saya tinggal buat sendiri. Kalaupun saya belum mampu membuat sendiri, saya akan simpan dulu idenya.


## Orang-orang yang Bermigrasi

Selama menjadi Vim user, tidak sekali saya melihat Vim user yang bermigrasi menggunakan Emacs tidak lagi melihat jalan pulang. Mereka tetap tinggal, tetap maju, dan berkembang dengan Emacs. Jujur rasanya *mixed feelings* antara ~~kecewa~~, ~~sedih~~, heran, dan penasaran.

Beberapa nama diantaranya,

1. **Protesilaos Stavrou (Prot)** \
   [YouTube: @protesilaos](https://www.youtube.com/@protesilaos) \
   [Website: protesilaos.com](https://protesilaos.com/)
2. **Derek Taylor (DistroTube)** \
   [YouTube: DistroTube](https://www.youtube.com/distrotube) \
   [Website: distrotube.com](http://distrotube.com/)
3. Lupa ... \*

\* Selain mereka berdua ada banyak lagi video di YouTube yang dapat ditemukan terkait Vim user yang sudah migrasi ke Emacs.

Saya pikir mereka hanya sekedar membuat content, tapi kok sampai sekarang masih dipakai. Hal tersebut semakin membuktikan kalau bener-bener ada yang tidak beres dengan Emacs.

Kalau diperhatikan, sebabnya selalu sama. "**Org mode**". Dari konten video mereka terlihat kalau mereka mulai bereksplorasi dengan Org mode.


## Lagi-lagi tentang Org Mode

Kalau saya bukan Vim user, mungkin saya tidak akan mengenal apa itu Org mode. Namun, karena saya Vim user dan rival dari Vim adalah Emacs, saya cukup sering melihat Emacs user sedang menulis dengan format Org mode. Menulis artikel blog dengan Org mode. Menulis buku dengan Org mode. Menulis agenda, menyusun schedule, mengatur to-do list dengan Org mode. Bahkan menulis file konfigurasi dengan Org mode. Dan cara mereka menulis file konfigurasi tersebut sangat "aneh" karena mereka terlihat seperti sedang menulis artikel blog. Dengan header di setiap sectionnya dan narasi yang panjang untuk mendeskripsikan block code konfigurasi di bawahnya. Ketika file tersebut disimpan, file config nya pun sudah jadi. Seperti menulis dokumentasi dengan configurasi dalam satu file yang sama. *Ilmu hitam macam apa itu!*

Belakangan baru saya tahu kalau konsep itu disebut dengan "**Literate Programming**" yang diprakarsai oleh Donald Knuth tahun 1984.

Literate Programming ini adalah konsep cara menulis program dengan menjelaskan logika kerjanya menggunakan bahasa sehari-hari yang diselingi dengan *snippet code*, seperti narasi, penjelasan algoritma dalam satu dokumen.

Core concepts dari Literate Programming,

1. **Tangling** yaitu proses mengekstraksi dan menggabungkan *code snippets* dari dokumen teks menjadi file yang dapat dijalankan oleh compiler.
2. **Weaving** yaitu proses merubah sumber file yang sama menjadi dokumen yang terformat dengan rapi atau untuk dibaca oleh manusia.
3. **Narative First** yaitu proses menyusun kode dalam urutan logis sesuai alur pemikiran kita, bukan berdasarkan batasan-batasan ketat yang disyaratkan oleh compiler.

Konsep ini menarik bagi saya yang sudah ngoding lebih dari 10 ribu jam (sumber: [WakaTime](https://wakatime.com/@bandithijo). Karena tidak sekali waktu saya harus membuat 2 file terpisah untuk dokumentasi dan code program. Secara tidak langsung, saya bekerja 2 kali.


## Berhasil Migrasi!

![gambar_01]({{ page.assets | absolute_url }}/gambar_01.png)

Gambar 01. Diagram ini menunjukkan waktu yang saya perlukan untuk bisa commit bermigrasi ke Emacs.

Ya, saya memerlukan hampir 11 jam! Kelihatan banyak, tapi itu merupakan akumulasi dari beberapa jam dalam 4 hari atau 1 minggu. Sejauh ini saya sudah cukup percaya diri untuk bisa full migrasi menggunakan Emacs.

### Apa yang saya pelajari dalam 11 jam?

Saya tidak ingin terburu-buru dalam proses migrasi ke Emacs. Saya juga tidak mau menggunakan prebuilt config atau framework config yang sudah jadi. Saya ingin membangun file config saya sendiri *from scratch*. Saya ingin mengerti setiap statement yang saya tulis di file config saya. Di jaman AI, hal seperti ini mudah dilakukan. Apa yang saya tidak pahami, bisa saya diskusikan dengan AI. Dengan AI, proses membangun sekaligus memahami setiap statement yang saya tulis di file config menjadi lebih mudah dan lebih cepat.

Berikut ini bahan belajar yang saya kerjakan selama 11 jam tersebut,

1. **Emacs Tutorial** \
   Hal pertama yang wajib untuk ditamatin. Isinya mencangkup hal-hal dasar yang diperlukan untuk bisa menggunakan Emacs. Sebagian besar isinya tentang cara mengoperasikan Emacs dengan keybinding. Bisa lewat link yang ada di Welcome Page atau dengan keybind `C-h t`. Pelajari dengan sabar. Tidak perlu sekali duduk, karena buffer tutorial tersebut akan menawarkan kita untuk mau menyimpan posisi cursor terakhir atau tidak.
2. [**YouTube: [1] Learning Vanilla Emacs from Scratch with Prot as a Neovim User - linkarzu, linkarzu-podcast, Protesilaos**](https://www.youtube.com/watch?v=btAOBkcLEkg)
3. [**YouTube: [2] Vanilla Emacs with Prot: I’ll Repent for My Markdown Sins - linkarzu, Protesilaos**](https://www.youtube.com/watch?v=Crp2e5D_Q78)
4. [**YouTube: Emacs – A Gentle Introduction - hexdump**](https://www.youtube.com/watch?v=WHYCQmIlbxM)
5. [**YouTube: 
Why I Prefer Emacs Over VSCode and vim - Code to the Moon**](https://www.youtube.com/watch?v=cxoE2FhOIgI)
6. [**YouTube: 
An Introduction to the Ultimate Git Interface, Magit! - System Crafters**](https://www.youtube.com/watch?v=_zfvQkJsYwI)
7. [**YouTube: Getting Started with Org Roam - Build a Second Brain in Emacs - System Crafters**](https://www.youtube.com/watch?v=AyhPmypHDEw)

Sejauh ini materi-materi di atas yang saya lahap dalam 11 jam.

Saya juga sudah mulai mencoba Org mode. Saya mulai dengan memigrasikan file Emacs config dari `init.el` menjadi `config.org`. Repositorinya saya letakkan di sini, [GitHub:BanditHijo:Emacs.d](https://github.com/bandithijo/emacs.d).

{% youtube oigPWmTRl3s %}


### Kenapa fundamental penting?

Dalam manga/anime "Kimetsu No Yaiba", pada kisah Zenitsu dan kakaknya, Kaigaku. Zenitsu hanya bisa menguasai jurus pertama (bentuk pertama) dari aliran Pernafasan Petir. Sedangkan, Kakaknya bisa menguasai semua bentuk (jurus) kecuali bentuk pertama. Tapi, pada pertarungan mereka yang terakhir di Infinity Castle, Zenitsu mengeluarkan bentuk (jurus) ciptaannya sendiri yang bernama *Honoikazuchi no Kami* (Dewa Petir Berapi) yang sukses memenggal kepala Kaigaku.

{% youtube zJ6fDGmDe6U %}

Nah! Dari kisah tersebut dapat dilihat bahwa orang yang ~~hanya~~ menguasai ilmu dasar atau basic atau fundamental memiliki potensi untuk mengembangkan ilmu tersebut menjadi bentuk (jurus) yang baru atau ilmu yang baru. Sedangkan kakaknya, Kaigaku yang bisa semua jurus kecuali jurus pertama, ilmu berpedangnya tidak berkembang dan hanya menguasai juru-jurus yang sudah dipelajari dari gurunya saja.

Kisah Kaigaku tersebut sebenarnya *relate* dengan saya sebagai seorang Vim user. Tampak luar, saya terlihat dapat menggunakan Vim dengan mahir, namun sebenarnya saya tidak memiliki pengetahuan dasar yang sebaiknya dimiliki oleh seorang Vim user. Saya tidak tahu bagaimana cara mencari dan mengaitkan "problem" dengan dokumentasi yang ada di Vim. Sederhananya, saya tidak benar-benar tahu cara membaca dokumentasi Vim. Itulah sebabnya saya merasa kesulitan untuk mengikuti hal-hal terbaru yang ada di Vim. **Karena saya tidak menguasai jurus pertama**.


## Pesan Penulis

Migrasi adalah sesuatu yang membutuhkan resource yang besar. Waktu, attention, motivation, dan hal-hal lain yang harganya tidak murah. Jika kamu tidak memiliki alasan atau motivasi yang benar untuk migrasi, sebaiknya buang jauh-jauh rencana untuk migrasi. Migrasi adalah perjalanan panjang yang membutuhkan management resource dan motivasi yang baik. Jika kamu tidak memiliki mereka dalam jumlah yang cukup, kamu akan segera kehabisan perbekalan dan perjalanan migrasimu berakhir.

Lamanya proses migrasi tergantung dari sejauh mana kamu menentukan titik tujuan migrasi. Semakin jauh kamu menentukan titik tujuan, semakin jauh perjalanan migrasimu, tentu akan semakin banyak perbekalan yang kamu butuhkan. Jadi, keberhasilan migrasi juga tergantung dari sejauh mana tujuan migrasimu.

Pada proses migrasi dari Vim/Neovim ke Emacs yang saya lakukan ini, saya tidak membuat tujuan yang panjang (dapat diartikan: "ekspektasi yang banyak/besar") terhadap Emacs. Saya tidak ingin membuat Emacs yang saya gunakan dapat berfungsi selayaknya Vim/Neovim yang saya gunakan. Saya hanya membawa "konsep kerja" yang biasa saya gunakan di Vim/Neovim dan apabila di Emacs ada konsep yang sama atau pun berbeda, saya akan gunakan konsep yang ditawarkan oleh Emacs. Saya tidak berkeberatan untuk ~~menyesuaikan~~ mengganti konsep yang saya bawa dari Vim/Neovim dengan konsep yang ditawarkan oleh Emacs.

Tujuan migrasi saya ke Emacs adalah **untuk menggunakan Org mode**. *That's it!* Sesederhana itu saja. Tujuan yang menurut saya pendek. Maka dengan cepat saya akan sampai ke tujuan. Perasaan puas datang karena sebuah "kemenangan kecil" berhasil di dapatkan. Ini adalah strategi migrasi saya dengan menentukan tujuan-tujuan pendek.

Strategi A

```
A------------------>B
```

Strategi B

```
A-->B-->C-->D-->E-->F
```

Dengan menggunakan Strategi B, kita dapat dengan mudah dan cepat untuk memperoleh "kemenangan-kemenangan kecil" itu.

*Well, Let's see!* Apakah saya akan masih menggunakan Emacs untuk beberapa waktu kedepan?

Oh ya! Artikel ini adalah artikel pertama yang saya tulis dengan Emacs.

![gambar_2]({{ page.assets | absolute_url }}/gambar_02.png)

Gambar 02. Statistik Wakatime terhadap project blog ini dan artikel ini


## Referensi

1. [http://www.literateprogramming.com/](http://www.literateprogramming.com/) \
   Diakses tanggal: 2026-08-02
2. [https://en.wikipedia.org/wiki/Literate_programming](https://en.wikipedia.org/wiki/Literate_programming) \
   Diakses tanggal: 2026-08-02
3. [https://orgmode.org/](https://orgmode.org/) \
   Diakses tanggal: 2026-08-02
