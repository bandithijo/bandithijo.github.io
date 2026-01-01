---
layout: "post"
title: "Mendapatkan ADB Authorized pada Layar Android yang Rusak (TWRP) di GNU/Linux & Windows"
date: "2020-07-26 15:08"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2020/2020-07-26-authorized-adb-tanpa-menyentuh-layar"
author: "BanditHijo"
category: "blog"
tags: ["android", "adb", "twrp"]
description: "Ide tulisan ini, bermula dari keinginan saya untuk menggambil data yang ada di dalam Smartphone Android yang telah rusak layarnya."
---

## Sekenario Masalah

Saya memiliki Android Mi-4C dengan screen yang sudah pecah akibat terlempar dari kantong.

*Smartphone* ini hanya mengalami kerusakan pada layar, tidak dapat dioperasikan karena layar tidak merespon sentuhan.

Namun, mesin masih dapat berfungsi dengan baik.

Saya ingin kembali dapat menggunakan untuk keperluan yang lain, misalkan sekedar menjadikannya perangkat webcam atau memeriksa mobile responsive untuk web yang sedang saya develop.

Namun, apabila saya akses menggunakan adb. Saya ditolak, karena saya harus memberikan persetujuan, yang mana persetujuan ini harus diberikan dengan mengoperasikan layar *smartphone*.

```
$ adb devices
```

```
List of devices attached
dd46fe2b        unauthorized
```


## Pemecahan Masalah

Agar proses mendaapatkan akses ke dalam *smartphone*, ada beberapa persyaratan yang harus dipenuhi dan langkah-langkah yang harus dikerjakan.


### Persyaratan

1. Syarat utama adalah **smartphone sudah harus terpasang TWRP** --artinya sudah UBL (*Unlock Bootloader*). \
   Untuk recovery mode tools yang lain, saya belum pernah mencobanya.

2. Sudah terpasang Android Tools, seperti `adb`.
   ```
   $ sudo pacman -S android-tools
   ```


### Inject adbkey.pub

1. Masuk ke TWRP (Recovery Mode)

2. Hubungkan *smartphone* dengan computer melalui kabel data

3. Buka Terminal dan jalankan
   ```
   $ adb devices
   ```

   ```
   List of devices attached
   dd46fe2b        recovery
   ```

   Nah, device kita sudah terdeteksi dan sedang berada di Recovery Mode (Fasboot). \
   Selanjutnya, kita perlu memeriksa RSA public key yang kita punya.
   ```
   $ cd ~/.android
   ```

   ```
   $ ls
   ```

   ```
   adbkey adbkey.pub
   ```

   > INFO
   > 
   > Kalau di windows, lokasinya berada di:
   > 
   > ```
   > C:\Users\<username>\.android\
   > ```

   File **adbkey.pub** adalah file RSA public key yang kita akan *push* ke dalam *smartphone*. \
   Tujuannya agar kita langsung mendapatkan akses masuk ke dalam *smartphone* saat sudah di Normal Mode. \
   **adbkey.pub** ini, ibarat kita menggembok *smartphone* kita dengan gembok yang kita siapkan, yang nantinya kita akan buka gembok tersebut, karena kita sudah punya kuncinya, **adbkey** (private key).

4. Lakukan perintah di bawah untuk meng-inject / meng-upload file adbkey.pub tersebut ke dalam *smartphone* kita.

   ```
   $ adb push adbkey.pub /data/misc/adb/adb_keys
   ```

5. Reboot dan biarkan *smartphone* masuk ke Normal Mode.

   ```
   $ adb shell reboot
   ```

6. Setelah berada di Normal Mode, coba jalankan

   ```
   $ adb devices
   ```

   ```
   List of devices attached
   dd46fe2b        device
   ```

Nah, setelah mendapatkan hak akses, kita bisa ngapain aja deh.

Misalkan untuk menjalankan **scrcpy** dan lain-lain.

![Gambar 1]({{ page.assets | absolute_url }}/gambar-01.png)

![Gambar 2]({{ page.assets | absolute_url }}/gambar-02.png)

Mantap!!!

Saya rasa hanya ini yang dapat saya tuliskan saat ini.

Mudah-mudahan dapat bermanfaat untuk teman-teman.

Terima kasih.

(^_^)


## Referensi

1. [stackoverflow.com/a/36507541/4862516](https://stackoverflow.com/a/36507541/4862516) \
   Diakses tanggal: 2020-07-26

1. [wiki.archlinux.org/index.php/Android_Debug_Bridge](https://wiki.archlinux.org/index.php/Android_Debug_Bridge) \
   Diakses tanggal: 2020-07-26
