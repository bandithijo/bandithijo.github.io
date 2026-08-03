---
layout: "post"
title: "Melokalisasi File .lnk yang Dihasilkan oleh Microsoft Office pada Arch Linux"
date: "2019-03-28 08:33"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["wine", "arch linux", "microsoft office"]
description: "File .lnk dapat benar-benar membuat kotor direktori home kalian apabila tidak dilokalisasi dengan benar."
---

## Prakata

Beberapa waktu yang lalu, saya mencoba memasang **Microsoft Office 2010** pada distribusi sistem operasi **Arch Linux** menggunakan **Wine 4.4-1**.

![Gambar 1]({% assets_path %}/gambar-01.gif)

Hasilnya lumayan memuaskan, meskipun beberapa aplikasi yang dibawa oleh Microsoft Office ini belum dapat dijalankan.

![Gambar 2]({% assets_path %}/gambar-02.png)

Gambar 2. Microsoft Word 2010

![Gambar 3]({% assets_path %}/gambar-03.png)

Gambar 3. Microsoft Excel 2010

![Gambar 4]({% assets_path %}/gambar-04.png)

Gambar 4. Microsoft Access 2010

![Gambar 5]({% assets_path %}/gambar-05.png)

Gambar 5. Microsoft Outlook 2010

![Gambar 6]({% assets_path %}/gambar-06.png)

Gambar 6. Microsoft Clip Organizer

![Gambar 7]({% assets_path %}/gambar-07.png)

Gambar 7. Microsoft Publisher 2010

![Gambar 8]({% assets_path %}/gambar-08.png)

Gambar 8. Microsoft Office Picture Manager

Beberapa aplikasi Microsoft Office yang belum dapat dijalankan, diantaranya :

![Gambar 9]({% assets_path %}/gambar-09.png)

Gambar 9. Microsoft OneNote 2010

![Gambar 10]({% assets_path %}/gambar-10.png)

Gambar 10. Microsoft PowerPoint 2010

> INFO
> 
> Ternyata, untuk dapat menjalankan Microsoft PowerPoint, kita perlu menambahkan library pada `winecfg` bernama `riched20`.

Meski begitu saat ini saya tidak benar-benar menggunakan aplikasi Microsoft Office.

Saya hanya menggunakan Microsoft Word untuk melihat template dokumen-dokumen dari tugas akhir yang disediakan oleh kampus dalam format `.doc` dan `.docx` kemudian secara manual saya buat ulang untuk format `.odt` (LibreOffice Word Document).

> PERTANYAAN?
> 
> **Kenapa tidak menggunakan Microsoft Word saja? Kan sudah berhasil dipasang?**
> 
> 1. Saya tidak takut untuk menjadi berbeda.
> 1. Saya tidak takut untuk menggunakan LibreOffice.
> 1. Saya menggunakan format `.fodt` (*Flat XML Open Document Text*) yang dapat digunakan di dalam **Git** sehingga memudahkan saya dalam mengerjakan tugas akhir (*Version Control System*).
> 
> Poin ketiga adalah yang menjadi alasan terbesar saya. Mengapa saya bersikeras untuk menggunakan LibreOffice dalam mengerjakan tugas akhir.
> 
> Mengenai file berekstensi `.fodt` akan saya ulas pada tulisan yang lain.


## Permasalahan

Pada tulisan ini, saya hanya mengkhususkan pada **Microsoft Word** saja. Karena aplikasi ini yang sedang saya pergunakan.

Permasalahan yang muncul dari penggunaan aplikasi Microsoft Word di atas sistem operasi Arch Linux dengan menggunakan Wine adalah:

**Muncul file berekstensi '.lnk' dengan diawali oleh nama dari dokumen yang sedang kita buka pada Microsoft Word**.

File ini seperti file *shortcut*. Letaknya pun random. Kadang berada di direktori yang sama dengan file dokumen. Kadang berada di Home, kadang berada di direktori Documents.

Contohnya seperti ini.

**.lnk pada direktori yang sama**.

```
📂 /home/bandithijo/
├── 📁 Desktop/
├── 📂 Documents/
│   └── 📂 Tugas_akhir/
│       ├── 📄 Template-PROPOSAL.doc
│       ├── 📄 Template-PROPOSAL.lnk 👈️
│       ├── 📄 Template-SKRIPSI.doc
│       └── 📄 Template-SKRIPSI.lnk 👈️
├── 📁 Downloads/
├── 📁 Music/
├── 📁 Pictures/
├── 📁 Public/
├── 📁 Templates/
└── 📁 Videos/
```

**.lnk pada direktori Documents**.

```
📂 /home/bandithijo/
├── 📁 Desktop/
├── 📂 Documents/
│   ├── 📄 Template-PROPOSAL.lnk 👈️
│   ├── 📄 Template-SKRIPSI.lnk 👈️
│   └── 📂 Tugas_akhir/
│       ├── 📄 Template-PROPOSAL.doc
│       └── 📄 Template-SKRIPSI.doc
├── 📁 Downloads/
├── 📁 Music/
├── 📁 Pictures/
├── 📁 Public/
├── 📁 Templates/
└── 📁 Videos/
```

**.lnk pada direktori Home**.

```
📂 /home/bandithijo/
├── 📁 Desktop/
├── 📂 Documents/
│   └── 📂 Tugas_akhir/
│       ├── 📄 Template-PROPOSAL.doc
│       └── 📄 Template-SKRIPSI.doc
├── 📁 Downloads/
├── 📁 Music/
├── 📁 Pictures/
├── 📁 Public/
├── 📄 Template-PROPOSAL.lnk 👈️
├── 📄 Template-SKRIPSI.lnk 👈️
├── 📁 Templates/
└── 📁 Videos/
```

Kira-kira, ilustrasinya seperti di atas.

Awalnya, saya tidak begitu menghiraukan. Namun, lama-kelamaan menjadi tidak sedap dipandang juga.


## Penyelesaian

Untuk mengatasi permasalahan ini, ternyata sangat mudah sekali.

Kita hanya perlu membuatkan direktori di dalam direktori Wine yang akan berguna sebagai tempat penyimpanan *Recent Documents*.

Asumsi saya, permasalahan ini terjadi karena Microsoft Office, dalam hal ini Microsoft Word yang sedang saya pergunakan, selalu membuat daftar *Recent Documents* agar dapat dengan mudah kita panggil kembali di dalam Microsoft Word, sedangkan pada direktori Home di GNU/Linux, tidak terdapat direktori yang dapat dipergunakan oleh Microsoft Word untuk menyimpan file *Recent Documents* ini.

Memang, tidak semua aplikasi Windws yang berjalan di atas Wine memiliki polah dan tingkah laku seperti Microsoft Office ini. Contohnya saya, saya sudah menggunakan Macromedia Flash, Naver Line, dan Balsamiq Mockups 3. Ketiga aplikasi ini tidak memiliki perilaku yang sama seperti Microsoft Office.

Nah, sekarang kita akan sediakan direktori *Recent* untuk mengatasi permasalahan ini.

1. Masuk ke dalam direktori **WINEPREFIX**.

   Secara *default* berada pada `~/.wine/`.

   Kemudian, lanjutkan ke dalam direktori *users* yang kita miliki di dalam WINEPREFIX.

   Contohnya seperti punya saya.

   ```
   $ cd ~/.wine/drive_c/users/bandithijo
   ```

2. Kemudian , lihat isi di dalam direktori ini. Apakah sudah terdapat direktori yang bernama `Recent` atau tidak.

   ```
   $ ls -la
   ```

   ```
   drwxr-xr-x  AppData
   drwxr-xr-x 'Application Data'
   drwxr-xr-x  Contacts
   drwxr-xr-x  Cookies
   lrwxrwxrwx  Desktop -> /home/bandithijo/dex
   drwxr-xr-x  Downloads
   drwxr-xr-x  Favorites
   drwxr-xr-x  .LINE
   drwxr-xr-x  Links
   drwxr-xr-x 'Local Settings'
   lrwxrwxrwx 'My Documents' -> /home/bandithijo/doc
   lrwxrwxrwx 'My Music' -> /home/bandithijo/snd
   lrwxrwxrwx 'My Pictures' -> /home/bandithijo/pix
   lrwxrwxrwx 'My Videos' -> /home/bandithijo/vid
   drwxr-xr-x 'Saved Games'
   drwxr-xr-x  Searches
   drwxr-xr-x 'Start Menu'
   drwxr-xr-x  Temp
   ```

   Dapat dilihat, tidak ada direktori yang bernama `Recent`.

   Maka, kita akan buatkan.

3. Ketik perintah di bawah untuk membuat direktori `Recent`.

   ```
   $ mkdir Recent
   ```

   Lalu, periksa kembali keberadaan direktori ini, apakah sudah berhasil dibuat atau tidak.

   ```
   drwxr-xr-x  AppData
   drwxr-xr-x 'Application Data'
   drwxr-xr-x  Contacts
   drwxr-xr-x  Cookies
   lrwxrwxrwx  Desktop -> /home/bandithijo/dex
   drwxr-xr-x  Downloads
   drwxr-xr-x  Favorites
   drwxr-xr-x  .LINE
   drwxr-xr-x  Links
   drwxr-xr-x 'Local Settings'
   lrwxrwxrwx 'My Documents' -> /home/bandithijo/doc
   lrwxrwxrwx 'My Music' -> /home/bandithijo/snd
   lrwxrwxrwx 'My Pictures' -> /home/bandithijo/pix
   lrwxrwxrwx 'My Videos' -> /home/bandithijo/vid
   drwxr-xr-x  Recent 👈️
   drwxr-xr-x 'Saved Games'
   drwxr-xr-x  Searches
   drwxr-xr-x 'Start Menu'
   drwxr-xr-x  Temp
   ```

   Buat juga, direktori **Recent** pada *users* Public.

   Yang beralamat di `~/.wine/drive_c/users/Public`.

   Selesai.


## Pengujian

Sekarang coba buka kembali file dokumen yang berekstensi `.doc` atau `.docx` dari dalam Microsoft Word.

Lalu, periksa direktori Home, Documents, dan direktori tempat file dokumen berada, apakah masih terdapat file berkestensi `.lnk` atau tidak.

Apabila tidak, sekarang coba periksa pada direktori **Recent** yang baru saja kita buat.

```
$ ls -l ~/.wine/drive_c/users/bandithijo/Recent
```

Hasilnya,

```
total 12
-rw-r--r-- Template-PROPOSAL.doc.lnk 👈️
-rw-r--r-- Template-SKRIPSI.doc.lnk 👈️
```

Sekarang file berekstensi `.lnk` yang dihasilkan oleh Microsoft Office sudah tidak lagi berhamburan pada struktur direktori GNU/Linux, karena sudah kita lokalisasi pada direktori **Recent** sebagaimana pada habitat asalnya. Hehe.


## Referensi

1. [Office 2010 and .lnk files ](https://www.codeweavers.com/support/forums/general/?t=26;msg=128936) \
   Diakses tanggal: 2019-03-27

1. [Microsoft Office under Linux: .lnk files, WINE, Crossover, and you](http://www.efficientsoftware.co.nz/microsoft-office-linux-lnk-wine/) \
   Diakses tanggal: 2019-03-27
