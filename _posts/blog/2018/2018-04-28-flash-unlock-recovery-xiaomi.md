---
layout: 'post'
title: 'Flash, Unlock Bootloader, dan Pasang TWRP Recovery XiaoMi pada GNU/Linux'
date: '2018-04-28 22:21'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Bootloader', 'XiaoMi']
pin:
hot:
contributors: []
description: "Punya smartphone XiaoMi dan cuman punya komputer atau laptop yang sistem operasinya GNU/Linux? Tidak perlu repot-repot meminjam laptop teman atau memasang Windows pada VirtualBox. Karena semua pekerjaan untuk memasang Custom ROM pada smartphone XiaoMi dapat dengan mudah kita lakukan dengan bermodalkan Terminal."
---

![Banner](https://s20.postimg.cc/mp2f9pxkt/banner_post_10.png)


# Latar Belakang

Punya *smartphone* **XiaoMi** dan cuman punya komputer atau laptop yang sistem operasinya GNU/Linux ?

Tidak perlu repot-repot meminjam laptop teman atau memasang Windows pada VirtualBox. Karena semua pekerjaan untuk memasang **Custom ROM** pada *smartphone* XiaoMi dapat dengan mudah kita lakukan dengan bermodalkan Terminal.


# Prasyarat

Pasang paket-paket yang dibutuhkan.

1. **adb**
2. **fastboot**

Nah, kedua paket ini, apabila teman-teman menggunakan distribusi sistem operasi Arch Linux, dapat dengan mudah kita dapatkan di AUR (*Arch User Repository*) dengan nama paket [`android-sdk-platform-tools`](https://aur.archlinux.org/packages/android-sdk-platform-tools/). Atau secara *official* dapat di unduh [di sini](https://developer.android.com/studio/releases/platform-tools). Pilih **SDK Platform-Tools for Linux**.

Untuk distribusi sistem operasi lain, seperti Ubuntu dan Fedora, dapat mencari pada repositori masing-masing (Google saja, bosku).

Apabila telah dipasang, maka kita akan dapat memanggil perintah `adb` dan `fastboot` melalui Terminal.

Lakukan pengecekan versi `adb`.

```
$ adb --version
```

```
Android Debug Bridge version 1.0.39
Version 0.0.1-4500957
```

Lakukan pengecekan versi `fastboot`.

```
$ fastboot - version
```

```
fastboot version 0.0.1-4500957
```

Apabila sudah seperti di atas, maka `adb` dan `fastboot` siap kita ajak bertempur. Meskipun pada dokumentasi ini kita akan lebih banyak menggunakan `fastboot`.

> PERTANYAAN?
> 
> **Apakah kegunaan kedua program tersebut?**
> 
> `adb` (*Android Device Bridge*), hanya dapat digunakan apabila *smartphone* dalam kondisi berada di *desktop*. Artinya sistem Android sudah *up and runnning*.
> 
> `fastboot`, hanya dapat kita gunakan pada mode **Fastboot**, penjelasan lebih lanjut ada di bawah.


# Ngoprek

Terdapat beberapa tahapan sebelum kita dapat memasang *custom* ROM yang kita inginkan. Saya memilih menggunakan **LineageOS**. Namun dokumentasi ini dapat digunakan untuk memasang *custom* ROM apa saja, karena langkah-langkah yang ada pada dokumentasi ini yang akan menjembatani hal tersebut.

Sekenarionya, kira-kira seperti ini :

1. *Flash*, ROM saat ini menjadi ROM MIUI ver. 6 (*Downgrade* ROM) \
   Tujuannya untuk memudahkan proses *unlock bootloader*.
2. *Unlock Bootloader*
3. *Install Recovery Custom* ROM (dalam hal ini TWRP)
4. Masuk ke dalam TWRP (*Recovery Mode*)
5. *Copy image custom* ROM ke dalam *internal memory* dengan kabel data
6. *Install custom* ROM menggunakan TWRP


## Flash ROM for Downgrade

Kita perlu menurunkan versi ROM MIUI atau memasang MIUI ver. 6 ke dalam ROM *smartphone* kita. Tujuan kita melakukan hal ini adalah karena MIUI ver. 6 adalah MIUI ver. 6 ini paling minim pembatasan terhadap fitur-fitur yang *developer* butuhkan. Secara *default*, *bootloader* pada MIUI ver. 6 tidak dalam keadaan *locked*, sehingga memberikan kita kebebasan untuk bermain-main dengan *smartphone* XiaoMi. Meskipun beberapa sumber mengatakan hal ini adalah opsional, namun tidak ada salahnya kita coba.

Untuk melakukan *flashing* pada ROM *smartphone* pada sistem operasi Windows, kita menggunakan MiFlash atau MiPhone2015 yang terlebih dahulu harus kita pasang di sistem kita.

![Gambar 1](https://s20.postimg.cc/4beeipcv1/gambar_01.jpg)

Gambar 1. MiFlash 2015 Windows

Sejujurnya, proses *flashing* menggunakan aplikasi ini lebih ribet, karena kita harus memasang driver Qualcom dan berpindah ke mode EDL (*Emergency Download Mode*) agar kita mendapatkan akses level tertinggi dari sistem. Untuk masuk ke dalam mode EDL seingat saya menggunakan perintah `$ sudo fastboot oem edl`.

Cobain saja, bro. Karena saya bukan hanya 1-10 kali menggunakan aplikasi ini. Puluhan kali sudah saya berurusan dengan aplikasi ini sejak baru beli *smartphone* XiaoMi. Bahkan sudah pernah menghidupkan kembali *smartphone* saya dari keadaan *hardbrick*.

Sedangkan, pada sistem operasi GNU/Linux, kita cukup menggunakan Terminal saja untuk melakukan *flashing* ROM. Dan **tidak perlu masuk ke dalam mode EDL**.

**Kenali Ciri-ciri Fastboot ROM**

Bahan yang dibutuhkan tentu saja adalah *fastboot* ROM. Ini adalah ROM khusus yang memang diperuntukkan untuk proses instalasi ROM dengan cara *flashing*.

Berikut ini adalah contoh *fastboot* ROM yang diperuntukkan untuk XiaoMi Mi4C.

* [**libra_images_6.1.7_20151221.0000.11_5.1_cn_b09dac7 0a0.tgz**](http://bigota.d.miui.com/6.1.7/libra_images_6.1.7_20151221.0000.11_5.1_cn_b09dac70a0.tgz)
* **libra_images_9.5.2.0.NXKCNFA_20180405.0000.00_7.0_cn_3dce54155d.tgz**

Kamu dapat melihat daftar *fastboot* ROM versi paling baru, [di sini](http://en.miui.com/a-234.html).

Bukan file *image* ROM dengan penamaan seperti ini :

* **miui_MI4c_V9.5.2.0.NXKCNFA_81f363e363_7.0.zip**

Kenali ciri-ciri dari penamaan *fastboot* ROM ini. Di awali dengan nama mesin. **Libra** adalah *codename* untuk XiaoMi Mi4C. Perhatikan juga *file extension* dengan format **.tgz**.

Apabila kita ekstrak, di dalam file *fastboot* ROM **.tgz** tersebut akan berisi :

```
📂 libra_images_6.1.7_20151221.0000.11_5.1_cn/
├── 📄 flash_all.bat
├── 📄 flash_all_except_data_storage.bat
├── 📄 flash_all_except_data_storage.sh
├── 📄 flash_all.sh
├── 📂 images/
│   ├── 📄 bk2.img
│   ├── 📄 boot.img
│   ├── 📄 BTFM.bin
│   ├── 📄 cache.img
│   ├── ...
│   └── ...
└── 📄 misc.txt
```

Nah, kalo sudah ROM apa yang akan kita gunakan, kalian perlu mencari *fastboot* ROM untuk tipe XiaoMi yang kalian miliki.

**Flashing ROM**

1. Ekstrak file *fastboot* ROM **.tgz** yang kita miliki.

   ```
   $ tar -xvf libra_images_6.1.7_20151221.0000.11_5.1_cn_b09dac7 0a0.tgz
   ```

   Nanti akan terbuat sebuah direktori baru yang memiliki nama yang sama seperti *fasboot* ROM.

2. Masuk ke dalam direktori tersebut.

   ```
   $ cd libra_images_6.1.7_20151221.0000.11_5.1_cn
   ```

   Di dalam direktori ini berisi file-file seperti yang sudah saya jelaskan di atas.
   Kamu dapat mengeceknya dengan perintah.

   ```
   $ ls -al
   ```

   ```
   total 72
   drwxr-xr-x 3 bandithijo users 4096 Dec 18  2016 .
   drwxr-xr-x 4 bandithijo users 4096 Apr 29 07:49 ..
   -rwxr-xr-x 1 bandithijo users 1362 Jan  7  2016 flash_all.bat
   -rwxr-xr-x 1 bandithijo users 1310 Jan  7  2016 flash_all_except_data_storage.bat
   -rwxr-xr-x 1 bandithijo users 1436 Jan  7  2016 flash_all_except_data_storage.sh
   -rwxr-xr-x 1 bandithijo users 1496 Jan  7  2016 flash_all.sh
   drwxr-xr-x 2 bandithijo users 4096 Dec 18  2016 images
   -rwxr-xr-x 1 bandithijo users   66 Jan  7  2016 misc.txt
   ```

3. Buat *smartphone* kamu dalam mode **Fastboot** dengan menekan kombinasi tombol. Tekan dan tahan <kbd>Volume Down</kbd> + <kbd>Power</kbd> secara berurutan.

   ![Gambar 1](https://s20.postimg.cc/sbu6t0nfx/gambar_02.png)

   Gambar 2. Mode Fastboot

   Setelah *smartphone* kita sudah dalam mode *fastboot*, kita dapat menghubungkannya dengan komputer / laptop menggunakan kabel data.

4. Deteksi apakah *smartphone* dengan komputer / laptop sudah terhubung atau tidak.

   ```
   $ sudo fastboot devices
   ```

   ```
   dd46fe2b	fastboot
   ```

   Apabila berhasil akan memberikan *output* seperti di atas. Apabila gagal tidak akan memberikan *output* apapun.

5. Saat ini di Terminal, pastikan kamu masih berada pada direktori hasil ekstrak dari file *fastboot* ROM (pada step 2 di atas).
   Terdapat 2 file BASH *script* yang memiliki kegunaan berbeda.

   * `flash_all_except_data_storage.sh` : untuk menghapus system namun tidak menghapus data dan storage
   * `flash_all.sh` : untuk menghapus semua system, data, dan storage

   Pilih sesuai kebutuhan kalian. Kalo saya lebih memilih `flash_all.sh`. Kita akan membuat file **.sh** yang kita pilih, agar menjadi *excutable*.

   ```
   $ chmod +x flash_all.sh
   ```

   Sebenarnya file BASH *script* tersebut sudah mendapatkan *excutable permission* `-rwxr-xr-x`, namun saya hanya mengantisipasi apabila ada dari teman-teman yang belum memahami perbedaan file *excutable* dan *non excutable*.

6. Eksekusi file *script* tersebut.

   ```
   $ sudo sh flash_all.sh
   ```

   Tunggu prosesnya hingga selesai.

   Setelah selesai, *smartphone* XiaoMi kalian akan *reboot* dan masuk ke ROM yang baru saja kita pasang. Mudah bukan ?

**Video Demonstrasi Proses Flashing ROM**

{% youtube IwZZbfXzNWA %}


## Unlock Bootloader

Salah satu syarat untuk memodifikasi ROM (berganti-ganti ROM dengan menggunakan Custom Recovery) adalah **Bootloader** yang sudah dalam keadaan **Unlock**. Karena dengan ini, kita dapat memasangkan **Custom Recovery** ke dalam partisi **Recovery** di *smartphone* kita.

Prosesnya simple saja, ndak rumit.

1. Masuk kembali ke dalam mode **Fastboot**.
2. Hubungkan *smartphone* dengan komputer / laptop. Dan periksa apakah sudah terhubung atau belum.

   ```
   $ sudo fastboot devices
   ```

   ```
   dd46fe2b	fastboot
   ```

3. Periksa status **Bootloader**, apakah **Device unlocked : false** atau **true**.

   ```
   $ sudo fastboot oem device-info
   ```

   ```
   ...
   (bootloader) 	Device tampered: false
   (bootloader) 	Device unlocked: false 👈️
   (bootloader) 	Charger screen enabled: false
   (bootloader) 	Display panel:
   OKAY [  0.060s]
   finished. total time: 0.060s
   ```

   Apabila **Device unlocked: false**, lakukan perintah di bawah untuk membuatnya menjadi **true**.

   ```
   $ sudo fastboot oem unlock
   ```

   Periksa kembali, apakah sudah menjadi **true**.

   ```
   $ sudo fastboot oem device-info
   ```

   ```
   ...
   (bootloader) 	Device tampered: false
   (bootloader) 	Device unlocked: true 👈️
   (bootloader) 	Charger screen enabled: false
   (bootloader) 	Display panel:
   OKAY [  0.060s]
   finished. total time: 0.060s
   ```

   Apabila **Device unlocked:** sudah menjadi **true**, maka kita dapat memasangkan **Custom Recovery**.


## Install Custom Recovery

Teman-teman dapat menggunakan *custom recovery* apa saja, dalam dokumentasi ini saya memilih menggunakan **TWRP** karena saya akan menggunakan **LineageOS** ROM.

Untuk teman-teman yang menggunkan XiaoMi Mi4C dan ingin menggunakan LineageOS, dapat mengunduh versi TWRP yang support untuk tipe *smartphone* kita.

* [twrp-3.1.1-1-libra.img](https://dl.twrp.me/libra/twrp-3.1.1-1-libra.img)
* [twrp-3.1.1-1-libra.img](https://dl.twrp.me/libra/twrp-3.1.1-0-libra.img)
* [twrp-3.1.0-0-libra.img](https://dl.twrp.me/libra/twrp-3.1.0-0-libra.img)
* [twrp-3.0.2-0-libra.img](https://dl.twrp.me/libra/twrp-3.0.2-0-libra.img)

Saya masih menggunakan **3.1.0.0** dan belum sempat naik ke versi 3.1.1.0 -- mungkin lain waktu.

Proses instalasinya sangat mudah.

1. Buka Terminal. Masuk ke dalam direktori tempat kamu menyimpan file *image* TWRP.
2. Jalankan perintah di bawah.

   ```
   $ sudo fastboot flash recovery twrp-3.1.0-0-libra.img
   ```

   Sesuaikan dengan *image* TWRP yang kalian pilih.

   Apabila berhasil, akan menampilkan *output* seperti ini.

   ```
   target reported max download size of 536870912 bytes
   sending 'recovery' (50584 KB)...
   OKAY [  1.675s]
   writing 'recovery'...
   OKAY [  0.897s]
   finished. total time: 2.573s
   ```

3. Kemudian, setelah berhasil, kita langsung masuk saja ke dalam mode **Recovery** menggunakan perintah di bawah.

   ```
   $ sudo fastboot boot twrp-3.1.0-0-libra.img
   ```

   ```
   downloading 'boot.img'...
   OKAY [  1.709s]
   booting...
   OKAY [  0.517s]
   finished. total time: 2.225s
   ```

   Tunggu beberapa detik, sampai *smartphone* kita akan *reboot* dan masuk ke dalam mode **Recovery**.

   ![Gambar 3](https://s20.postimg.cc/kgjnegtbh/gambar_03.png)

   Gambar 3. Tampilan Depan Custom Recovery TWRP

   Cara lain untuk masuk ke dalam mode **Recovery** dengan menggunakan kombinasi tombol.

   Terlebih dahulu matikan *smartphone* kalian, kemudian tekan dan tahan tombol <kbd>Volume Up</kbd> + <kbd>Power</kbd> secara berurutan.

   Dengan begini, maka penggunaan Terminal cukup sampai di sini saja. Tapi jangan di cabut dulu kabel datanya, karena kita masih harus memasukkan bahan-bahan untuk proses instalasi *custom* ROM ke dalam *internal memory* dari *smartphone*.


## Copy Bahan-bahan ke dalam Internal Memory

Kita melakukan instalasi *custom* ROM dengan bantuan TWRP. Untuk itu kita perlu memasukkan semua bahan-bahan yang akan kita pasang ke dalam *internal memory* dengan bantuan **File Manager**. Dalam hal ini saya menggunakan **Thunar** atau **PCMANFM**.

![Gambar 4](https://s20.postimg.cc/fzrafmmrh/gambar_04.png)

Gambar 4. Bahan-bahan yang diperlukan

Ini adalah bahan-bahan untuk memasang sistem operasi **LineageOS** beserta **OpenGAPS** (*Google Apps packages*) arm64 - 7.1 - nano. Saya juga menambahkan **SuperSU** untuk mendapatkan akses root. Apabila teman-teman tidak ingin menggunakan root, **SuperSU** tidak perlu ikut diinstal.

Bahan-Bahan LineageOS:

1. [**lineage-14.1-20180427-nightly-libra-signed.zip**](https://mirrorbits.lineageos.org/full/libra/20180427/lineage-14.1-20180427-nightly-libra-signed.zip)<br>versi paling *update*, [di sini](https://download.lineageos.org/libra)
2. [**open_gapps-arm64-7.1-nano-20180423.zip**](https://github-production-release-asset-2e65be.s3.amazonaws.com/35368384/2c2c60a8-46e6-11e8-9419-6589ed209c63?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20180429%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180429T072524Z&X-Amz-Expires=300&X-Amz-Signature=a8d809293ca172444edb4e9dd5294acbf1714b731977b206327ac34716131693&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=attachment%3B%20filename%3Dopen_gapps-arm64-7.1-nano-20180423.zip&response-content-type=application%2Foctet-stream) versi paling *update*, [di sini](http://opengapps.org/?api=7.1&variant=nano)
3. [**SuperSU-v2.82-201705271822.zip**](https://s3-us-west-2.amazonaws.com/supersu/download/zip/SuperSU-v2.82-201705271822.zip)<br>versi paling *update*, [di sini](http://www.supersu.com/download) (*flashable*)
4. [**BusyBox-v1.22.1-bionic.zip**](https://drive.google.com/open?id=1bQZlsdCkhQxvxqc9KIZGoMlQ_9aul-HL)<br>versi paling *update*, terdapat di [PlayStore](https://play.google.com/store/apps/details?id=stericson.busybox&hl=en)

Download semua bahan-bahan yang diperlukan. Sesuaikan dengan kebutuhan dan tipe XiaoMi kalian.

Selanjutnya, masukkan ke dalam *internal memory* *smartphone* XiaoMi kita. Letakkan saja di luar, agar lebih mudah di akses dari TWRP. Untuk melihat file-file tersebut, masuk ke dalam menu **Install**.

![Gambar 5](https://s20.postimg.cc/8eo9k7wwt/gambar_06.png)

Hasilnya akan seperti di bawah.

![Gambar 6](https://s20.postimg.cc/4iaxoc6t9/gambar_05.png)

Gambar 6. Bahan-bahan yang sudah dimasukkan


## Instalasi Custom ROM

Masih pada menu **Install**, pilih file **.zip** secara berurutan:

1. **lineage-14.1-20180427-nightly-libra-signed.zip**
2. **open_gapps-arm64-7.1-nano-20180423.zip**
3. **SuperSU-v2.82-201705271822.zip**
4. **BusyBox-v1.22.1-bionic.zip**

Untuk menambahkan lebih dari 1 **.zip**, pilih **Add more Zips**.

![Gambar 7](https://s20.postimg.cc/nne6y7o31/gambar_07.png)

Lakukan terus menerus sampai keempat semua bahan yang diperlukan masuk ke dalam daftar **queued** instalasi.

Kemudian lakukan eksekusi, dengan menggeser tombol biru yang ada di paling bawah.

![Gambar 8](https://s20.postimg.cc/zds4f31al/gambar_08.png)

Proses instalasi akan seperti di bawah ini.

![Gambar 9](https://s20.postimg.cc/c28m47x4d/gambar_09.png)

Tunggu sampai proses instalasi dari semua file selesai di eksekusi.

Apabila sudah selesai akan muncul tombol **Reboot**.

*Reboot* dan proses *booting* akan menampilkan animasi logo **LineageOS**. Proses ini akan berjalan agak lama disertai 1 - 2 kali *reboot*. Jangan khawatir, proses seperti ini normal sekali.

Tunggu saja sampai proses *booting* memasuki halaman awal pengaturan sistem operasi **LineageOS** untuk pertama kali.

Saya rasa cukup seperti ini saja proses *flash*, *unlock bootloader*, *install custom recovery* dan instalasi LineageOS. Mudah-mudahan tulisan dokumentasi ini sudah mencakup kesemua dari proses pemasangan *custom* ROM pada *smartphone* XiaoMi dengan sistem operasi GNU/Linux.

**Video Demonstrasi Proses Unlock Bootloader, Install TWRP**

{% youtube CGyxdElPPcQ %}


# Referensi

1. [en.miui.com/thread-285121-1-1.html](http://en.miui.com/thread-285121-1-1.html)
<br>Diakses tanggal: 2018/04/28

2. [forum.xda-developers.com/mi-4c/general/guide-unlocking-mi4c-bl-verification-t3336779/page18](https://forum.xda-developers.com/mi-4c/general/guide-unlocking-mi4c-bl-verification-t3336779/page18)
<br>Diakses tanggal: 2018/04/28

3. [wiki.lineageos.org/devices/libra/install](https://wiki.lineageos.org/devices/libra/install)
<br>Diakses tanggal: 2018/04/28
