---
layout: "post"
title: "Aplikasi Download Alternatif untuk OSX dengan JDownloader"
date: "2013-07-03"
permalink: "/blog/:title"
assets: "/assets/images/posts/2013/2013-07-03-download-client-osx-with-jdownloader"
author: "BanditHijo"
category: "blog"
tags: ["osx", "jdownloader"]
description: "Sudah beralih ke OS X dan masih berharap bisa download video di Youtube, donwload kontent-kontetn di website yang tidak terdapat menu download, download dari situs-situs yang membutuhkan account premium, ketergantungan dengan IDM (Internet Download Manager) di Windows ? Tapi sudah benar-benar terpojok dengan OS X ? Jangan khawatir. Saya akan memperkenalkan sebuah software sebagai alternatif bagi anda sebagai pengganti IDM di Windows."
---

![Banner]({{ page.assets }}/Default+Header+Template+Post+10.jpg)


## Latar Belakang

Sudah beralih ke OS X dan masih berharap bisa download video di Youtube, donwload kontent-kontetn di website yang tidak terdapat menu download, download dari situs-situs yang membutuhkan account premium, ketergantungan dengan IDM (Internet Download Manager) di Windows ? Tapi sudah benar-benar terpojok dengan OS X ? Jangan khawatir. Saya akan memperkenalkan sebuah software sebagai alternatif bagi anda sebagai pengganti IDM di Windows.


## JDownloader

Adalah software gratis, open-source download manajemen tool yang di tulis dengan bahasa pemrograman Java, dengan komunitas pengembang yang besar, yang membuat download menjadi mudah dan secepat seharusnya. Pengguna dapat memulai, menghentikan atau memberikan jeda, menetapkan batasan bandwidth, arsip auto-ekstrak dan banyak lagi. Termasuk dapat mendownload dari website bertipe One-Click Hoster seperti Rapidshare.com atau Megaupload.com -tidak hanya untuk pengguna dengan account premium, tetapi juga untuk pengguna yang gak bayar.

Bagaimana ? Tertarik untuk menggunakannya ? Kalau anda sudah pernah menggunakannya pasti sangat menyukai software ini. Apalagi bagi user yang suka berselancar ke website-website "zona merah".

Ada lagi kelebihan pada JDownloader yaitu semua link yang kita copy, akan otomatis terdeteksi pada JDownloader. Hahaha entah ini kelebihan atau kekurangan.

Bagi pengguna Ubuntu & Windows, tutorial pada artikel ini bisa digunakan untuk memandu anda menggunakan JDownloader.


## Step by Step

1. Download dulu aplikasinya [di sini](http://jdownloader.org/download/index) (link ini tidak langsung dapat mendownload aplikasi JDownloader. Tetapi anda diarahkan untuk memilih platform yang sesuai dengan yang anda gunakan berikut dengan update Java-nya).

2. Saya anggap anda sudah selesai menginstal JDownloader di komputer anda. Sekarang buka JDownloader yang sudah anda instal. Harap maklum, starting up aplikasi ini memang agak sedikit lambat. Namanya juga aplikasi hebat. (ngeles)

3. Setelah terbuka, maka cuekin saja nih aplikasinya dulu. Sekarang kita balik lagi ke browser kita.

4. Copy & paste link yang ada di address bar browser kita. Sebagai contoh tutorial kali ini saya meng-copy link dari Youtube.com

5. Maka pada JDownloader, akan terdapat proses decrypt yang dapat dilihat pada progress bar di bagian bawah window JDownloader (bagian yang di kotak merah).

   ![Gambar 1]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.09.19+AM.png)

6. Ini memerlukan proses agak lama. Setelah selesai, makan akan secara otomatis berpidah ke tab "LinkGrabber" dan keluarlah file-file yang available untuk kita donwload. Seperti gambar di bawah.

   ![Gambar 2]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.17.00+AM.png)

7. Perhatikan gambar di atas. Sama seperti IDM bukan ? Apabila website tersebut menyediakan banyak format dan ukuran file maka akan ditampilakan juga di JDownloader.

8. Selanjutnya, pilih satu atau lebih (bisa menggunakan <kbd>Command</kbd> pada Apple atau <kbd>Ctrl</kbd> pada Windows) file yang akan anda download, dan klik kanan

9. Pada tahap pemilihan, perhatikan besar dan ukuran file yang anda inginkan.

10. Lalu pilih "Continue with selected item"

    ![Gambar 3]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.22.49+AM.png)

11. Maka secara otomatis akan berpindah ke tab "Download" dimana proses download sedang berlangsung.

    ![Gambar 4]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.28.34+AM.png)

12. Disini kita dapat melihat kecepatan bandwidth yang digunakan (lihat kotak nomer 1), melihat progress bar besar file yang sudah ter-download dan estimasi waktunya (lihat kotak nomer 2), mengatur banyaknya part donwload dalam satu file (lihat kotak nomer 3), mengatur maksimal jumlah file download dalam sekali download (lihat kotak nomer 3), dan mengatur kecepatan download apabila kita sedang menggunakan koneksi kita untuk buffering (lihat kotak nomer 3)


## Jangan Lupa

1. Pada tab "Linkgrabber" masih terdapat sisa link yang tadi tidak kita pilih

2. Tentu saja link ini akan merepotkan apabila kita meng-copy link baru dan akan bertumpuk pada tab Linkgrabber. Jadi kita harus menghapusnya agar memudahkan proses pemilihan file pada link selanjutnya.

3. Cara menghapusnya cukup mudah

4. Pilih tombol pojok kanan bawah "Clear List" untuk menghapus semua.

   ![Gambar 5]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.45.50+AM.png)

5. Atau jika ingin menghapus yang kita pilih saja caranya

6. Klik kanan file link yang mau dihapus (bisa di pilihin juga pake command pada  atau ctrl pada windows) lalu pilih Remove > Remove seperti pada gambar

   ![Gambar 6]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.48.58+AM.png)

7. Jadi dengan kata lain kita bisa men-nahan dahulu untuk mendownload dan mengumpulkan file-file link lalu mendownload setelah semua file yang kita inginkan terkumpul.


## Error No Connection !

1. Banyak faktor, bisa jadi server situsnya sedang trouble, atau

2. Yang paling menyebalkan terjadi Error No Connection kalau internet kita "LEMODDD" seperti punya saya.

   ![Gambar 7]({{ page.assets }}/Screen+Shot+2013-07-03+at+1.40.58+AM.png)

3. Kalau terjadi hal ini apa yang kita lakukan ?

4. Coba saja klik kanan dan Resume

5. Kalau tidak bisa juga, coba Close dulu JDownloadernya, lalu buka kembali dan Start download lagi

6. Kalau tidak bisa juga coba link grab ulang

7. Kalau tidak bisa juga, jongkok gan sapa tahu nemu ide bagus. Hehehe

Demikian tutorial mengenai cara penggunaan aplikasi JDownloader ini. Yaa tentu saja setiap aplikasi ada kelebihan dan kekurangannya masing-masing. Ribet ? Ini cuman salah satu trik kok. Sebenarnya sudah ada fasilitas terintegrasi dengan Flashget untuk browser Mozilla Firefox. Tapi saya lebih suka dengan gaya seperti ini. jadi, tutorial ini saya persembahkan untuk mereka-mereka yang mau ribet sedikit. Hehehe


## Referensi

1. [jdownloader.org/](http://jdownloader.org/) \
   Diakses tanggal: 2013-07-03
