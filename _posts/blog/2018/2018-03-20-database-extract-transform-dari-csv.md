---
layout: "post"
title: "Melakukan Extract & Transform dari .CSV ke dalam Tabel Operasional ERD"
date: "2018-03-20"
permalink: "/blog/:title"
assets: "/assets/images/posts/2018/2018-03-20-database-extract-transform-dari-csv"
author: "BanditHijo"
category: "blog"
tags: ["database", "csv", "mysql"]
description: "Pada tulisan ini saya menggunakan aplikasi manajemen database berbasis GUI yang bernama MySQL Workbench untuk melakukan extract dan transform dari data CSV ke dalam tabel operasional dalam bentuk ERD."
---

## TUGAS 1

| Mata Kuliah | **Data Warehouse & Data Mining** |
| Nama | **Rizqi Nur Assyaufi** |
| NIM | **15.01.157** |
| Kelas | **TI2-B** |

> **Soal**
> 
> **Buatlah tutorial melakukan Extract dan Transform dari data .CSV ke dalam tabel operasional dalam bentuk ERD.**
> 
> Tutorial boleh dalam bentuk Video Youtube atau laporan makalah atau artikel Blog.
> 
> Materi tutorial silakan gunakan file yang disertakan.
> 
> Jika sudah selesai, segera kumpulkan disini.

> **File Attachment**
> 
> 1. [pasar_2014.csv](https://drive.google.com/open?id=1Cqyc-D1e_8NawsbcFSxevO9WvyzsGBcU)
> 2. [pasar_data.sql](https://drive.google.com/open?id=17N-iWrWR3m9S11sbX9BTcaJP5qesB6EX)


## Jawaban

Pada tulisan ini saya menggunakan aplikasi manajemen database berbasis GUI yang bernama [**MySQL Workbench**](https://dev.mysql.com/downloads/workbench/) pada sistem operasi [**Arch Linux**](https://www.archlinux.org/).

![Gambar 1]({{ page.assets }}/gambar_01.png)


### Step 1: Membuat Connection

Apabila belum terdapat connection, kita dapat terlebih dahulu membuatnya dengan menekan icon (**+**) seperti yang ada pada Gambar di bawah.

![Gambar 2]({{ page.assets }}/gambar_02.png)

Nanti akan terbuka _window_ baru, seperti gambar di bawah.

![Gambar 3]({{ page.assets }}/gambar_03.png)

Isi pada bagian _text input_ berlabel **Connection Name :** dengan nama koneksi yang kalian inginkan. Sebagai contoh, saya mengisikan `localhost 3306`.

Lakukan tes koneksi dengan mengklik tombol **Test Connection** seperti yang ada pada gambar di bawah.

![Gambar 4]({{ page.assets }}/gambar_04.png)

Apabila berhasil, akan memunculkan _window_ seperti gambar di bawah ini.

![Gambar 5]({{ page.assets }}/gambar_05.png)

Pilih **OK**, maka akan terbuat satu buah _MySQL Connection_ yang bernama **localhost 3306**.

![Gambar 6]({{ page.assets }}/gambar_06.png)

Pada sistem operasi Arch Linux, akan terdapat _window_ yang berisi pemberitahuan bahwa versi _server_ yang sedang digunakan adalah versi 10, sedangkan yang didukung oleh MySQL Workbench adalah veri 5.1, 5.5, 5.6, 5.7. Kita dapat mengabaikan pesan ini dan memilih **Continue Anyway**.

![Gambar 7]({{ page.assets }}/gambar_07.png)

Akan terbuka sebuah _tab_ baru dengan tampilan seperti di bawah.

![Gambar 8]({{ page.assets }}/gambar_08.png)


### Step 2: Membuat Schema

Selanjutnya, kita akan mebuat _database schema_, dengan cara melakukan **klik kanan pada area kosong** di sisi _sidebar_ sebelah kiri pada _tab Schemas_.

![Gambar 9]({{ page.assets }}/gambar_09.png)

Kemudian, pada area tengah, akan terbuka _tab_ baru seperti di bawah.

![Gambar 10]({{ page.assets }}/gambar_10.png)

Isi _text input_ **Name :** sesuai yang diinginkan.

![Gambar 11]({{ page.assets }}/gambar_11.png)

Apabila telah diberikan nama, pilih tombol **Apply**, maka akan terbuka _window_ baru seperti di bawah.

![Gambar 12]({{ page.assets }}/gambar_12.png)

Pilih **Apply > Close**.

Akan terbuat _database scheme_ dengan struktur seperti gambar di bawah.

![Gambar 13]({{ page.assets }}/gambar_13.png)


### Step 3: Membuat Tabel-tabel

Selanjutnya kita akan memasukkan **SQL Script** untuk membuat tabel-tabel secara otomatis.

Pilih **File > Open SQL Script...**

Cari file **pasar_data.sql** yang telah disertakan bersama tugas. Apabila belum ada, bisa mengunduhnya terlebih dahulu di [sini](https://drive.google.com/open?id=17N-iWrWR3m9S11sbX9BTcaJP5qesB6EX).

Apabila sudah, nanti akan terbuka _tab_ baru di area tengah, seperti pada gambar di bawah.

![Gambar 14]({{ page.assets }}/gambar_14.png)

Selanjutnya, kita akan mengeksekusi SQL Script yang sudah kita masukkan.

Tapi sebelunya, kita perlu untuk membuat _database schema_ yang kita buat sebelumnya, untuk dijadikan _default schema_.

Caranya, pada _sidebar_ kiri, pada bagian _tab Schemas_ **klik kanan pada nama schema**, kemudian pilih **Set as Default Schema**, seperti contoh di bawah.

![Gambar 15]({{ page.assets }}/gambar_15.png)

Kemudian, eksekusi SQL script dengan melakukan klik pada tombol bergambar petir. Seperti gambar di bawah.

![Gambar 16]({{ page.assets }}/gambar_16.png)

Perhatikan pada bagian bawah, terdapat _Output Panel_, akan terdapat pesan seperti di bawah ini.

![Gambar 17]({{ page.assets }}/gambar_17.png)

Apabila, telah berhenti memberikan _output_, sekarang kita pergi ke _sidebar_ sebelah kiri, dan lakukan _refresh_ agar menampilkan _update_ terbaru dari _database scheme_.

Caranya dengan klik kanan pada area kosong dan pilih **Refresh All**.

![Gambar 18]({{ page.assets }}/gambar_18.png)

Hasilnya akan seperti gambar di bawah.

![Gambar 19]({{ page.assets }}/gambar_19.png)


### Step 4: Ekstrak dan Transform Data

Terdapat 5 buah tabel:

1. detil_komoditas
2. komoditas
3. pasar
4. satuan
5. transaksi

Kita tidak dapat memasukkan data hasil ekstrak dan transform secara acak. Kita perlu membaca _relationship tables_ (relasi antar tabel). Untuk itu kita memerlukan ERD (_Entity Relationship Diagram_).


#### 4.1 Entity Relationship Diagram

Caranya, pergi ke menu **Database > Reverse Engineer...**.

![Gambar 20]({{ page.assets }}/gambar_20.png)

Kemudian, masukkan **MySQL Connection** yang telah kita buat pada Step 1, ke dalam **Stored connection**. Pada contoh saya `localhost 3306`.

![Gambar 21]({{ page.assets }}/gambar_21.png)

Selanjutnya pilih **Next**.

![Gambar 22]({{ page.assets }}/gambar_22.png)

Pilih **Next**.

Pilih _Database Scheme_ yang kita buat.

![Gambar 23]({{ page.assets }}/gambar_23.png)

Pilih **Next**.

![Gambar 24]({{ page.assets }}/gambar_24.png)

Pilih **Next**.

![Gambar 25]({{ page.assets }}/gambar_25.png)

Pilih **Execute > Next > Close**.

Nanti akan terbuka _tab EER Diagram_.

![Gambar 26]({{ page.assets }}/gambar_26.png)

![Gambar 27]({{ page.assets }}/gambar_27.png)

Dari pembacaan relasi antar tabel di atas, dapat kita urutkan tabel mana yang akan kita kerjakan terlebih dahulu.

1. Tabel `pasar`
2. Tabel `komoditas`
3. Tabel `satuan`
4. Tabel `detil_komoditas`
5. Tabel `transaksi`


#### 4.2 Mengekstrak CSV

Kita akan melakukan ekstraksi file `pasar_2014.csv` ke dalam bentuk struktur tabel.

Caranya, kembali ke _tab localhost 3306_ (di bagian atas sebelah kiri, disebelah _icon Home_). Kemudian pada _sidebar_ kiri, pada _database schema_ yang kita buat, klik kanan dan pilih **Table Data Import Wizard**.

![Gambar 28]({{ page.assets }}/gambar_28.png)

Nanti akan terbuka _window_ baru seperti di bawah.

![Gambar 29]({{ page.assets }}/gambar_29.png)

Cari file **pasar_2014.csv** yang telah disediakan bersama soal. Atau kalian dapat mengunduhnya di [sini](https://drive.google.com/open?id=1Cqyc-D1e_8NawsbcFSxevO9WvyzsGBcU).

Kalo sudah, pilih **Next >**.

Berikan nama tabel dari file **.csv** yang ingin kita ekstraksi.

![Gambar 30]({{ page.assets }}/gambar_30.png)

Pilih **Next >**.

Periksa bagian **Columns :**, apakah sudah sesuai dengan kategori dari masing-masing kolom / _fields_.

![Gambar 31]({{ page.assets }}/gambar_31.png)

Pilih **Next >**.

![Gambar 32]({{ page.assets }}/gambar_32.png)

Pilih **Next >**.

Nah, kalo sudah menampilkan seperti di bawah, proses import data artinya telah sukses.

![Gambar 33]({{ page.assets }}/gambar_33.png)

Pilih **Next >**.

Selanjutnya periksa banyaknya data yang telah berhasil diimport, harus sesuai dengan banyaknya data yang ada pada file **pasar_2014.csv**, yaitu sebanyak **18.940** records.

![Gambar 34]({{ page.assets }}/gambar_34.png)

Pilih **Finish**.

Kemudian, kembali ke _sidebar_ sebelah kiri. Belum terdapat tabel **data** yang baru saja kita buat dari hasil ekstrak file **pasar_2014.csv**. Kita perlu melakukan **Refresh All** pada _database schema_. Setelah melakukan _refresh_, akan muncul tabel **data** seperti gambar di bawah.

![Gambar 35]({{ page.assets }}/gambar_35.png)

Kita akan melihat hasil ekstrak dari file .csv yang sudah kita _import_. Dengan cara melakukan klik pada _icon_ di samping.

![Gambar 36]({{ page.assets }}/gambar_36.png)

Akan memunculkan hasil seperti di bawah.

![Gambar 37]({{ page.assets }}/gambar_37.png)


#### 4.3 Transform Hasil Exstrak

Selanjutnya kita akan melakukan transformasi dari tabel data yang seelunya kita ekstrak dari file **pasar_2014.csv**.

Untuk melakukan transform data, kita berpindah saja ke _tab_ **Query 1**. Di sini kita akan mengetikkan perintah-perintah SQL untuk melakukan transformasi tabel **data**.

![Gambar 38]({{ page.assets }}/gambar_38.png)

Selanjutnya kita akan melakukan transformasi dari tabel **data** berurut sesuai dengan hasil pembacaan relasi tabel ERD.


##### 4.3.1 Tabel Pasar

Kita akan mentransformasi _fields_ **namapasar** dari tabel **data**, dengan _queries_ seperti di bawah ini.

```sql
SELECT @nomor:=@nomor+1 as id, namapasar
FROM data,(SELECT @nomor:=0)r
GROUP BY namapasar;
```
Kemudian **Excute** dengan menekan tombol bergambar petir.

Akan menghasilkan tabel hasil transformasi dari tabel data seperti gambar di bawah.

![Gambar 39]({{ page.assets }}/gambar_39.png)

Kemudian, _export_ ke dalam format **.csv**, dengan menekan tombol **Export**.

![Gambar 40]({{ page.assets }}/gambar_40.png)

berikan nama, misal **data_pasar.csv**, karena kita akan memasukkan ke dalam tabel **pasar**.

Buka tabel **pasar**, atau _view_ tabel **pasar**. Klik tombol **Import** untuk mengambil file **data_pasar.csv** yang tadi sudah kita _export_.

![Gambar 41]({{ page.assets }}/gambar_41.png)

Akan memunculkan hasil seperti gambar di bawah.

![Gambar 42]({{ page.assets }}/gambar_42.png)

Kita perlu menghapus baris pertama karena bukan berisi _record_ yang kita perlukan.

![Gambar 43]({{ page.assets }}/gambar_43.png)

Dan akan menghasilkan isi tabel seperti gambar di bawah.

![Gambar 44]({{ page.assets }}/gambar_44.png)

Apabila seperti di atas, artinya _records data_ yang kita perlukan sudah tepat.

Selanjutnya kita perlu melakukan **Apply**. Klik tombol **Apply** pada pojok kanan bawah.

![Gambar 45]({{ page.assets }}/gambar_45.png)

Akan terbuka _window_ seperti di bawah yang berisi _queries_ untuk memasukkan data ke dalam tabel **data**.

![Gambar 46]({{ page.assets }}/gambar_46.png)

Pilih **Apply**.

Apabila berhasil dan tidak ada _error_, pilih **Close**. Data yang kita _import_ tadi akan masuk ke dalam tabel **pasar**.

Apabila gagal, maka kita perlu meninjau kembali data yang kita dapat dari hasil _queries_ yang kita buat saat melakukan transformasi dari tabel **data**, apakah sudah sesuai dengan relasi dari tabel yang kita tuju.

> PERHATIAN!
> 
> Untuk tabel selanjutnya, proses **Export** dan **Import** sama seperti tabel **pasar**, sehingga tidak saya tuliskan kembali.
> 
> Selanjutnya saya hanya akan menuliskan _query syntax_ nya saja untuk melakukan transformasi tabel **data** ke bentuk yang diperlukan oleh tabel tujuan.


##### 4.3.2 Tabel Komoditas

Kita akan mentransformasi _fields_ **komoditas** dari tabel **data**, dengan _queries_ seperti di bawah ini.

```sql
SELECT @nomor:=@nomor+1 as id, komoditas
FROM data,(SELECT @nomor:=0)r
GROUP BY komoditas;
```

Kemudian **Excute** dengan menekan tombol bergambar petir.

Proses **Export** dan **Import** sama seperti tabel **pasar**, hanya saja proses _import_ dilakukan di tabel **komoditas**.


##### 4.3.3 Tabel Satuan

Kita akan mentransformasi _fields_ **satuan** dari tabel **data**, dengan _queries_ seperti di bawah ini.

```sql
SELECT @nomor:=@nomor+1 as id, satuan
FROM data,(SELECT @nomor:=0)r
GROUP BY satuan;
```

Kemudian **Excute** dengan menekan tombol bergambar petir.

Proses **Export** dan **Import** sama seperti tabel **pasar**, hanya saja proses _import_ dilakukan di tabel **satuan**.


##### 4.3.4 Tabel Detil Komoditas

Kita akan mentransformasi _fields_ **detilkomoditas** dari tabel **data** yang berelasi dengan tabel **komoditas**, dan **satuan** dengan _queries_ seperti di bawah ini.

```sql
SELECT
@nomor:=@nomor+1 as id,
data.detilkomoditas,
komoditas.id_komoditas,
satuan.id_satuan

FROM
data,
komoditas,
satuan

WHERE
data.komoditas=komoditas.nama_komoditas
AND
data.satuan=satuan.nama_satuan;
```

Kemudian **Excute** dengan menekan tombol bergambar petir.

Proses **Export** dan **Import** sama seperti tabel **pasar**, hanya saja proses _import_ dilakukan di tabel **detil_komoditas**.


##### 4.3.5 Tabel Transaksi

Kita akan mentransformasi _fields_ **tanggal**, **harga**, **jumlahterjual** dari tabel **data** yang berelasi dengan tabel **detil_komoditas** dan tabel **pasar** dengan _queries_ seperti di bawah ini.

```sql
SELECT
detil_komoditas.id_detil_komoditas,
pasar.id_pasar,
data.tanggal,
data.harga,
data.jumlahterjual

FROM
data,
detil_komoditas,
pasar

WHERE
data.detilkomoditas=detil_komoditas.nama_detil_komoditas
AND
data.namapasar=pasar.nama_pasar;
```

Kemudian **Excute** dengan menekan tombol bergambar petir.

Proses **Export** dan **Import** sama seperti tabel **pasar**, hanya saja proses _import_ dilakukan di tabel **transaksi**.

Maka proses ekstrak dan transformasi dari file pasar_2014.csv ke dalam tabel operasional ERD telah selesai.

![Gambar 27]({{ page.assets }}/gambar_27.png)
