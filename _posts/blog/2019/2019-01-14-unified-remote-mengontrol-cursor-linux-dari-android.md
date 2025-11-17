---
layout: "post"
title: "Unified Remote, Mengontrol Mouse Cursor GNU/Linux dari Android"
date: "2019-01-14 19:35"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-01-14-unified-remote-mengontrol-cursor-linux-dari-android"
author: "BanditHijo"
category: "blog"
tags: ["unified remote", "tool"]
description: "Siapa yang tidak kagum dengan remote control? Menggerakkan benda jarak jauh? Keren sekali yaa! Catatan kali ini saya akan membahasa dan mengulas tentang sebuah perkakas untuk mengontrol mouse cursor GNU/Linux dari Smartphone Android."
---

# Prakata

Setelah pada postingan sebelumnya, saya menuliskan tentang "[Bagaimana Mengrontrol Android Device dari Komputer]({{ site.url }}/blog/scrcpy-menampilkan-dan-mengontrol-android-dari-komputer)". Sekarang saya akan mereview aplikasi yang mempunyai fungsi kebalikan dari **scrcpy**, yaitu mengontrol komputer dari Android.

**Unified Remote**, adalah aplikasi yang saya gunakan untuk membuat Android *smartphone* saya menjadi *remote control*. Seperti tagline dari Unified Remote, "*Turn your smartphone into a universal remote control*".

Unified Remote pada Google PlayStore memiliki dua versi, yaitu:
1. **Free** - dengan fungsi-fungsi yang terbatas
2. **Full** - dengan fungsi-fungsi yang sudah sudah dibuka. Untuk mendapatkan versi Full, kita hanya perlu melakukan pembayaran sekali saja (bukan sistem *subscribe* per bulan atau per tahun)

Untuk perbedaan fungsi-fungsi (fitur) antara versi Free dan Full, dapat di lihat [di sini - Features](https://www.unifiedremote.com/features).

Hal lain yang perlu diperhatikan dari aplikasi remote seperti ini adalah "**konektifitas**". Unified Remote mendukung 2 tipe konektifitas, **Wifi/Data** dan **Bluetooth**.

Apabila di rumah, saya menggunakan konektifitas wifi karena berada dalam satu network. Sedangkan di luar rumah, saya menggunakan konektifitas bluetooth. Nah karena konektifitas bluetooth inilah yang menyebabkan saya sebaiknya menuliskan dokumentasi pribadi, karena cara untuk menghubungkannya terbilang tidak biasa (baca: ~~ribet~~).


# Instalasi

Sebelum memasuki proses instalasi, ada hal yang harus saya jelaskan terlebih dahulu.

Karena aplikasi ini bersifat *remote*, tentunya akan ada 2 hal yang akan kita bahas, yaitu: *client* dan *server*.

Dalam hal ini,
1. Komputer/laptop akan bertindak sebagai server, yang nanti akan kita jalankan aplikasi **Unified Remote Server** yang kita unduh dari website.
2. Android *smartphone* akan bertindak sebagai client, yang akan kita pasangkan aplikasi **Unified Remote** dari Google PlayStore.

Oke, sekarang proses instalasi.


## Instalasi Unified Remote Server

1. Dari komputer/laptop, buka browser favorit dan pergi ke *official* website Unified Remote pada halaman ini: [unifiedremote.com/download](https://www.unifiedremote.com/download)

2. Pilih untuk Desktop GNU/Linux

3. Pilih **Other distros**, pilih yang **Portable Archive (64-bit)**, atau langsung saja saya berikan link nya: [Portable Archive (64-bit)](https://www.unifiedremote.com/download/linux-x64-portable)

4. Pindahkan ke direktori khusus tempat kalian menyimpan aplikasi-aplikasi. Misalnya seperti saya, selalu mengumpulkan aplikasi yang saya build sendiri pada direktori `~/app/` dan buat direktori khusus untuk Unified Remote.
   Contohnya seperti ini,

   ```
   📂 ~/app/
       └── 📂 unifiedremote/
           └── 📦️ urserver-3.6.0.745.tar.gz 👈️
   ```

5. Selanjutnya ekstraksi isi dari paket `urserver-x.x.x.xxx.tar.gz` tersebut

   ```
   $ tar -xvf urserver-3.6.0.745.tar.gz
   ```

   Nanti akan terbuat sebuah direktori dengan nama `urserver-3.6.0.745`

   ```
   📂 ~/app/
      └── 📂 unifiedremote/
          ├── 📄 urserver-3.6.0.745 👈️
          └── 📦️ urserver-3.6.0.745.tar.gz
   ```

   Nah, Unified Remote server sudah ada di dalam direktori `urserver-3.6.0.745` tersebut dengan nama `urserver`, namun jangan dulu dijalankan, karena kita perlu melakukan beberapa konfigurasi koneksi untuk Wifi dan Bluetooth.

   > PERTANYAAN?
   > 
   > **Distro saya ada di dalam tipe paket yang di sediakan. Sebaiknya saya pilih yang mana?**
   > 
   > Kalau saya, tentu saja akan tetap memilih **Portable Archive**.


## Konfigurasi Koneksi

Konfigurasi Koneksi akan terbagi menjadi 2 bagian, Wifi/Data dan Bluetooth.


### Koneksi dengan Wifi/Data

Untuk konfigurasi menggunakan Wifi/Data pada komputer/laptop kita tidak diperlukan konfigurasi apapun. Asalkan komputer/laptop dan Android *smartphone* kita berada pada satu network yang sama (LAN), maka tidak akan terjadi masalah.

Saya mencurigai bahwa Unified Remote ini juga dapat digunakan jarak jauh di luar LAN, namun belum saya pelajari lebih lanjut.


### Koneksi dengan Bluetooth

Bagian konektifitas menggunakan bluetooth adalah bagian yang menjadi alasan saya menuliskan dokumentasi ini.

Ada beberapa hal yang perlu dipersiapkan sebelum kita dapat menggunakan konektifitas bluetooth dengan Unified Remote.

1. Edit file `/etc/systemd/system/dbus-org.bluez.service`

   ```
   $ sudo vim /etc/systemd/system/dbus-org.bluez.service
   ```

   ```
   [Unit]
   ...
   ...
   [Service]
   Type=dbus
   BusName=org.bluez
   ExecStart=/usr/lib/bluetooth/bluetoothd --compat
   ...
   ...
   [Install]
   ...
   ...
   ```

   Pada `ExecStart=` tambahkan `--compat` seperti contoh di atas.

   > INFO
   > 
   > Menambahkan `--compat` diperlukan karena kebanyakan distribusi sistem operasi GNU/Linux saat ini sudah menggunakan Bluez5 sedangkan Unified Remote Server masih memerlukan fungsi yang sudah deprecated pada Bluez4.
   > 
   > Tujuan penambahaan ini untuk membuat Bluetooth Daemon berjalan pada *compatibility mode*.

   Simpan dan keluar dari text editor.

2. Selanjutnya kita perlu me-*reload* ulang daemon dan bluetooth service

   ```
   $ sudo systemctl daemon-reload
   $ sudo systemctl restart bluetooth
   ```

   Proses di atas akan membuat file baru `/var/run/sdp`. Apabila langkah 1 di atas tidak di lakukan, maka kita tidak akan menemukan file `sdp` ini.

3. Ubah kepemilikan file `/var/run/sdp` yang awalnya milik **root** menjadi milik kita

   ```
   $ sudo chown bandithijo:users /var/run/sdp
   ```

   Ganti `bandithijo` dengan nama username kalian.

   Kemudian cek apakah file `/var/run/sdp` sudah berpindah kepemilikan.

   ```
   $ ls -l /var/run/sdp
   ```

   ```
   srw-rw---- 1 bandithijo users 0 Jan 15 00:52 /var/run/sdp
   ```

   Apabila menunjukkan *output* seperti di atas, berarti file `sdp` sudah berhasil berpindah tangan.

   Dengan begini, Unified Remote Server sudah dapat kita jalankan.

   > INFO
   > 
   > Ketiga langkah di atas, dapat kita sederhanakan dengan menjalankan Python script sederhana yang sudah saya buat.
   > 
   > Download: [<b>preconfigure_urserver.py</b>](https://raw.githubusercontent.com/bandithijo/scriptbox/master/preconfig_urserver.py)*
   > 
   > \* Download dengan menggunakan klik kanan "**Save Link As...**"
   > 
   > Contohnya akan seperti ini.
   > 
   > ```
   > $ python preconfig_urserver.py 'bandithijo'
   > ```
   > 
   > ```
   > [ DONE ] Adding compatibility mode to Bluez5
   > [ DONE ] Daemon Reloaded and Bluetooth Service Restarted
   > [ DONE ] User: bandithijo has owned the SDP files
   > ```
   > 
   > Atau kalau kalian lupa memasukkan username, akan seperti di bawah ini.
   > 
   > ```
   > $ python preconfig_urserver.py
   > ```
   > 
   > ```
   > Masukkan username kamu: bandithijo
   > &nbsp;
   > [ DONE ] Adding compatibility mode to Bluez5
   > [ DONE ] Daemon Reloaded and Bluetooth Service Restarted
   > [ DONE ] User: bandithijo has owned the SDP files
   > ```
   > 
   > Ganti `bandithijo` dengan username kalian.
   > 
   >> PERHATIAN!
   >> 
   >> Menjalankan script di atas akan memerlukan password **sudo**.
   >> 
   >> Hal ini diperlukan untuk mengubah file **bluez.service** dan melakukan reload serta restart pada **bluetooth.service**.
   >
   >> PERTANYAAN?
   >> 
   >> **Kapan saatnya kita perlu menjalankan script ini kembali sebelum menjalankan urserver ?**
   >> 
   >> Tergantung dua kondisi:
   >> - file <code>/var/run/sdp</code>, apabila ownernya kembali menjadi milik <b>root</b> (biasanya setelah restart)
   >> - Setelah paket <code>bluez</code> update, biasanya <code>--compat</code> akan menghilang


## Jalankan Unified Remote Server

Untuk menjalankan server, sangat mudah sekali.

1. Masuk ke direktori `urserver-3.6.0.745/`

   ```
   $ cd urserver-3.6.0.745
   ```

2. Lalu jalankan `urserver`

   ```
   $ ./urserver
   ```

   ```
   Unified Remote Server (3.6.0.745)
   Copyright (c) 2010-2015 Unified Intents AB.  All rights reserved.

   starting...
   loading remotes...
   skipped: Beamer.Beamer
   skipped: Beamer.BeamerFilePicker
   -------------- dipotong ----------------
   starting server...
   tcp interface started
   udp interface started
   bluetooth interface started
   http interface started
   discovery interface started
   &nbsp;
   *** Access Manager ***
   http://192.168.1.4:9510/web
   ready (waiting for connection or debug command)
   enter 'help' to see a list of available commands
   enter 'exit' to terminate server
   > _
   ```

   Kalau server sudah berjalan seperti ini, kita biarkan saja. Karena jarang sekali kita berurusan dengan server kecuali untuk menjalankan perintah **restart**. Itupun juga bisa dilakukan di web interfacenya.

3. Buka ip address yang diberikan dengan browser.

   ![Gambar 1](https://i.postimg.cc/yxM1qzjK/gambar-01.png)

   Gambar 1. Status Bluetooth Interface

   Apaila status **Bluetooth: Interface is Listening** berwarna hijau, artinya kita telah berhasil mengkonfigurasi server untuk menerima konektifitas dengan Bluetooth.

   Langkah selanjutnya tinggal memasangkan Unified Remote pada Android.


## Instalasi Unified Remote Client

1. Buka Google PlayStore dan cari "**Unified Remote**"

   ![Gambar 2](https://i.postimg.cc/7ZWNFHJd/gambar-02.jpg)

   Gambar 2. Unified Remote di Google PlayStore

   Pasang dan tunggu prosesnya hingga selesai.


## Konfigurasi Unified Remote Client

1. Hubungkan komputer/laptop dengan Android menggunakan Bluetooth. Saya menggunakan aplikasi `blueman-manager`

   ![Gambar 3](https://i.postimg.cc/wBD9CBbj/gambar-03.png)

   Gambar 3. Interface dari Blueman Manager

   ![Gambar 4](https://i.postimg.cc/YqWGrQ0p/gambar-04.jpg)

   Gambar 4. Tampilan Bluetooth Settings Android

   Kita dapat melihat dari kedua gambar di atas bahwa komputer/laptop dan Android sudah saling terhubung.

2. Setelah laptop dan Android saling terhubung, buka aplikasi Unified Remote di Android.

   ![Gambar 5](https://i.postimg.cc/fyYzNRbK/gambar-05.jpg)

   Gambar 5. Hamburger menu

   Pilih menu di pojok kiri atas.

3. Kita perlu untuk menambahkan server

   ![Gambar 6](https://i.postimg.cc/Qt45TSgP/gambar-06.jpg)

   Gambar 6. Tambahkan server

   Bisa dilihat pada Status server di kotak hijau, "No servers added", karena kita belum membuat konektifitas dengan server.

4. Pada bagian **Servers** ini lah kita akan memilih konektifitas.

   ![Gambar 7](https://i.postimg.cc/13WZbjS4/gambar-07.jpg)

   Gambar 7. Tempat untuk memilih, membuat, mengubah, atau menghapus konektifitas dengan server

   Pilh nama dari Bluetooth Android *smartphone* kita.

   ![Gambar 8](https://i.postimg.cc/MpnsKPRn/gambar-08.jpg)

   Gambar 8. Android kita sudah masuk dalam daftar "saved Servers"

5. Selanjutnya kembali ke menu, dan pilih Remotes

   ![Gambar 9](https://i.postimg.cc/HnCxjhVd/gambar-09.jpg)

   Gambar 9. Dapat dilihat status server yang kota hijau, kita sudah terhubung dengan Bluetooth Android

   Pilih **Remotes**

6. Pada bagian ini, kita dapat memilih berbagai macam jenis fungsi remote

   ![Gambar 10](https://i.postimg.cc/HkSV3zP9/gambar-10.jpg)

   Gambar 10. Tekan tanda ( + ) untuk menambahkan fungsi remote baru

   Silhkan bereksplorasi sendiri, karena di dalamnya terdapat banyak sekali fungsi remote yang berbeda-beda. Saya hanya menggunakan 2 fungsi remote, yaitu : **Basic Input** dan **Slide Show**

   ![Gambar 11](https://i.postimg.cc/N05LnX3q/gambar-11.jpg)

   Gambar 11. Tampilan Basic Input remote

   ![Gambar 12](https://i.postimg.cc/KYw4hzbK/gambar-12.jpg)

   Gambar 12. Tampilan Slide Show remote


# Preview Video

{% youtube 7QACnojH5Ks %}


# Pesan Penulis

Unified Remote ini memiliki dua versi, yaitu Free dan Full. Kalian dapat mencoba terlebih dahulu, apakah Unified Remote ini cocok untuk kebutuhan kalian atau tidak. Saya pun awalnya seperti itu, hingga akhirnya saya berani memutuskan untuk membeli versi yang Full di Google PlayStore.

Kenali baik-baik kebutuhan kalian, agar tidak ada penyesalan diantara kita.

Sedap!


# Referensi

1. [unifiedremote.com/tutorials](https://www.unifiedremote.com/tutorials) \
   Diakses tanggal: 2019-01-14

1. [unifiedremote.com/features](https://www.unifiedremote.com/features) \
   Diakses tanggal: 2019-01-14
