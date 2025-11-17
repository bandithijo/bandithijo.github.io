---
layout: "post"
title: "Mengenkripsi Home Direktori pada GNU/Linux"
date: "2019-06-14 15:41"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-06-14-mengenkripsi-home-direktori-pada-gnu-linux"
author: "BanditHijo"
category: "blog"
tags: ["ecryptfs"]
description: "Home direktori merupakan direktori yang sangat personal untuk kita. Ketika laptop saya hilang, mungkin orang lain akan dapat mengakses home direktori tersebut. Maka dari itu, saya memutuskan untuk mengenkripsi home direktori. Dan membuat proses decrypt dan encrypt berjalan secara otomatis saat session login. Sehingga, kita hanya perlu memasukkan password sekali saat login, dan enkripsi dari home direktori akan terbuka."
---

> PERHATIAN!
> 
> Lakukan *backup* data sebelum melakukan proses di bawah.
> 
> Segala bentuk kerugian, seperti kehilangan data maupun rusaknya perangkat yang kalian gunakan, **bukan merupakan tanggung jawab penulis**.
> 
> *Do with Your Own Risk!*


# Prakata

Saya tidak akan berbasa-basi mengenai *privacy* di sini.

Saya yakin teman-teman yang tertarik dengan topik ini memiliki alasan dan kepentingan masing-masing.

Sebenarnya, saya sudah pernah menuliskan mengenai topik ini, namun terletak pada sub bab dari ebook proses instalasi Arch Linux pada UEFI firmware yang saya tulis [di sini]({{ site.url }}/arch/step-7-install-gnome-and-complete-installation#710-encrypt-home-directory).

Karena tidak aksesible banget, jadi saya memutuskan untuk membuat post tersendiri.


# Mengenkripsi Home Direktori

> PERHATIAN!
> 
> Saya sangat merekomendasikan untuk tidak menerapkan proses enkripsi ini pada Home direktori yang sudah terisi penuh dengan banyak file.
> 
> Karena, proses pengenkripsian file-file yang ada didalam direktori Home akan memakan waktu yang sangat lama dan akan menambah kapasitas hardisk menjadi 2x Home (direktori Home lama + direktori Home baru).
> 
> Saya menyarankan untuk membuat user baru saja.
> 
> Best practicenya memang biasa saya terapkan pada saat awal instalasi sistem operasi.

Proses mengenkripsi Home direktori ini akan saya bagi dalam beberapa tahapan, agar teman-teman mudah untuk memahami dan mudah memetakan apabila nanti akan mengajukan pertanyaan atau pembahasan saat berdiskusi.

Oke, berikut ini adalah sekenarionya.


## Instalasi Paket-paket yang Diperlukan

Kita memerlukan paket tambahan yang wajib dipasang untk melakukan proses enkripsi.

```
$ sudo pacman -S ecryptfs-utils lsof
```

Yak! Sudah bisa ditebak, paket yang saya gunakan untuk mengenkripsi Home direktori adalah **eCryptfs**.

**Kenapa menggunkan eCryptfs?**

Karena praktis. Tidak memerlukan partisi yang berbeda untuk memasang (*mounting*) direktori yang kita enkripsi. Proses dekripsi file-file yang ada pada direktori yang terenkripsi akan dimounting ke dalam satu direktori yang sudah kita tentukan.

Saya memerlukan paket `lsof` untuk mendeteksi apakah masih terdapat proses yang berjalan (*running*) pada user tertentu pada saat berada di TTY.

Setelah kedua paket yang kita perlukan telah selesai dipasang, langkah selanjutnya adalah menambahkannya pada kernel module.

```
$ sudo modprobe ecryptfs
```

Apabila tidak menampilkan *error*, artinya perintah di atas telah berhasil.

Tahap selanjutnya kita akan masuk ke dalam TTY shell.

Oke, langsung saja kita eksekusi.


## Login Root dengan TTY Shell

1. Langkah pertama, kita perlu **logout** dari sistem.

   Jadi, teman-teman yang berniat mengenkripsi Home direktorinya, perlu membuka post blog ini menggunakan *smartphone*.

2. Masuk ke TTY shell, bisa TTY2 - TTY6, pilih saja mana yang menampilkan login shell seperti di bawah ini.

   Cara masuk dan berpindah antar TTY, gunakan <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>F2</kbd> untuk TTY2. <kbd>F3</kbd> untuk TTY3, dan begitu seterusnya.

   ```
   Arch Linux 5.1.9-arch1-1-ARCH (tty6)

   BANDITHIJO-X61 login: root
   Password: _
   ```
   Apabila sudah masuk ke TTY, login dengan akun **root**.

3. Setelah berhasil login dengan akun root, lakukan pengecekan apakah user yang kamu gunakan tadi masih memiliki proses yang berjalan (*running process*).

   ```
   $ ps -U bandithijo
   ```

   Ganti `bandithijo` dengan username yang kamu gunakan, yang ingin dienkripsi Home direktorinya.

   Apabila perintah di atas menampilkan *output* seperti di bawah ini.

   ```
   PID  TTY      TIME  CMD

   ```

   Artinya, sudah tidak lagi terdapat proses yang *running* pada user tersebut.

   Dengan begini, kita dapat lanjut ke tahap berikutnya.


## Migrasi Home dengan Enkripsi

1. Perintah di bawah ini akan memigrasikan atau membuat salinan (*cloning*) dari Home direktori kalian namun dalam bentuk yang sudah terenkripsi.

   ```
   $ ecryptfs-migrate-home -u bandithijo
   ```

   Jangan lupa untuk mengganti `bandithijo` dengan nama username dari user yang Home direktorinya ingin teman-teman enkripsi.

   Perintah di atas, akan menghasilkan *output* seperti di bawah ini.

   ```
   INFO: Checking disk space, this may take a few minutes. Please be patient.
   INFO: Checking for open files in /home/bandithijo

   Enter your login passphrase [bandithijo]: _
   ```

   > PERHATIAN!
   > 
   > Masukkan **password** yang sama dengan **login password username** kalian.

   Perhatikan dengan seksama *output* tersebut.

   Kita diminta memasukkan ***passphrase*** atau ***password*** yang sama seperti password username kita.

   Tujuannya agar saat kita login menggunakan username kita, secara otomatis **eCryptfs** akan mendekripsi direktori `/home/username` yang terenkripsi.

   Proses ini akan memakan ~~sedikit~~ waktu, tergantung dari banyaknya file yang terdapat di dalam Home direktori yang dienkripsi.

2. Setelah proses enkripsi selesai, kita dapat *logout* (**jangan *reboot**).

   ```
   $ exit
   ```


## Pengetesan Dekrip Home Direktori

Setelah kita melakukan enkripsi Home direktori, tentunya kita ingin melakukan pengetesan apakah proses enkripsi terhadap Home direktori yang kita lakukan telah berhasil.

1. *Login* kembali menggunakan user yang Home direktorinya baru saja kita enkripsi.

   ```
   Arch Linux 5.1.9-arch1-1-ARCH (tty6)

   BANDITHIJO-X61 login: &lt;mark&gt;bandithijo&lt;/mark&gt;
   Password: _
   ```

2. Jalankan perintah di bawah untuk mendekripsi Home direktori (sekaligus me-*mounting*-nya).

   ```
   $ ecryptfs-mount-private
   ```

   ```
   Enter your login passphrase: _
   ```

   Masukkan *password* yang sudah kita buat sama dengan *login password user* kita.

   Perintah di atas akan mendekripsi Home direktori.

3. Sekarang coba lakukan pengetesan dengan perintas `ls`.

   ```
   $ ls -la /home/bandithijo
   ```

   Jangan lupa mengganti `bandithijo` dengan nama username kalian.

   Nama username juga berarti nama direktori dari Home user tersebut.

   > INFO
   > 
   > Kita perlu mencatat kunci simetris 128-bit value yang kita gunakan untuk mengenkripsi/dekripsi.
   > 
   > ```
   > $ ecryptfs-unwrap-passphrase
   > ```
   > 
   ```
   Pas phrase: _
   ```

   Masukkan *login password* yang juga menjadi *password dekripsi* dari Home direktori.
   > 
   > Apabila benar, kira-kira hasilnya akan seperti ini.
   > 
   > ```
   > c17 10cc56hj093gj7930lkfip3vn24g
   > ```
   > 
   > Bentuknya mirip MD5 hash, tapi bukan.
   > 
   > Catat pada secarik kertas dan simpan baik-baik.
   > 
   > Kita akan gunakan kembali untuk me-*recovery* Home direktori yang terenkripsi pada kasus misalkan `wrapped-passphrase` tidak sengaja terhapus atau `corrupted` atau bahkan kalian lupa *login password*.

4. Selanjutnya lakukan pengecekan keberadaan dari file-file berikut ini.

   ```
   $ ls .ecryptfs
   ```

   ```
   auto-mount auto-unmount Private.mnt Private.sig wrapped-passphrase
   ```

   Pastikan file-file `auto-mount`, `auto-unmount`, dan `wrapped-passphrase` harus ada pada direktori `.ecryptfs`

   Direktori ini merupakan *symbolic link* dari `/home/.ecryptfs/bandithijo/.ecryptfs/`


## Memberikan eCryptfs Akses PAM

Pada langkah sebelumnya kita sudah berhasil men-dekripsi Home direktori kita.

Namun, kalau diperhatikan, proses dekripsi tersebut tidak otomatis dilakukan bersamaan dengan saat kita *login*.

Sedangkan, pasti kita mau proses yang praktis.

Untuk mengatasi masalah ini sangat mudah. Tinggal kita tambahkan beberapa baris aturan (*rules*) pada file konfigurasi PAM.

1. Gunakan *text editor* favorit kalian untuk mengedit file di bawah ini.

   ```
   $ sudo vim /etc/pam.d/system-auth
   ```

   ```
   !filename: /etc/pam.d/system-auth
   #%PAM-1.0

   auth      required  pam_unix.so     try_first_pass nullok
   auth      required  pam_ecryptfs.so unwrap 👈️
   auth      optional  pam_permit.so
   auth      required  pam_env.so

   account   required  pam_unix.so
   account   optional  pam_permit.so
   account   required  pam_time.so

   password  optional  pam_ecryptfs.so 👈️
   password  required  pam_unix.so     try_first_pass nullok sha512 shadow
   password  optional  pam_permit.so

   session   required  pam_limits.so
   session   required  pam_unix.so
   session   optional  pam_ecryptfs.so unwrap 👈️
   session   optional  pam_permit.so
   ```

   Tambahkan tiga baris yang saya *marking* kuning sesuai posisinya.

   **Pastikan benar-benar tidak ada yang *typo*!**

2. Simpan dan keluar dari *text editor*.

3. *Reboot* dan *login*.

   Pastikan kalian dapat masuk ke dalam desktop kalian.

4. Apabila berhasil, tinggal periksa, apakah isi dari Home direktori kita berhasil di-*mouting* atau tidak.


## Menghapus Direktori Home Backup

Saat kita melakukan tahap pertama, yaitu tahap migrasi atau mengenkripsi Home direktori, proses yang terjadi adalah Home direktori kita akan disalin dalam bentuk terenkripsi ke dalam direktori `/home/.ecryptfs/bandithijo/.Private` dan Home direktori lama kita akan di-*rename* menjadi `/home/bandithijo.p7o6p7R2`. Sedangkan direktori `/home/bandithijo` akan menjadi direktori kosong sebagai tempat untuk *mounting* pada saat proses dekripsi.

Bagian yang saya *marking* kuning adalah deretan karakter random yang di-*generate* oleh eCryptfs pada saat proses migrasi Home direktori.

Coba lakukan pemeriksaan isi dari Home direktori kita.

```
$ ls -a /home
```

```
bandithijo bandithijo.p7o6p7R2 .ecryptfs
```

Nah, kita perlu menghapus direktori `bandithijo.p7o6p7R2` tersebut.

Karena sudah tidak lagi kita gunakan.

Penjelasan mudahnya, direktroi ini adalah Home direktori lama kita yang sudah di-*rename* oleh eCryptfs pada saat proses Home migrasi.

Kita dapat menghapusnya dengan aman.

```
$ sudo rm -rvf bandithijo.p7o6p7R2
```

Tunggu proses penghapusan sampai selesai.

Dengan begini, proses enkripsi Home direktori kita telah selesai.

Apabila teman-teman ingin mengganti *password* dari user yang berarti juga harus mengganti *passphrase* dari Home direktori yang terenkripsi, silahkan mengunjungi tulisan saya yang ini, "[Mengganti Password User dari Home Direktori yang Terenkripsi]({{ site.url }}/blog/mengganti-password-user-dari-home-direktori-yang-terenkripsi)".


# Pesan Penulis

Tulisan ini bukan merupakan tandingan dari dokumentasi eCryptfs. Silahkan merujuk pada dokumentasi eCryptfs resmi yang sudah saya sertakan pada bagian referensi di bawah.

Dapat pula teman-teman yang menggunakan Arch Linux, merujuk pada Arch Wiki eCryptfs yang sudah saya sertakan di bawah.

Sepertinya seperti ini saja.


# Referensi

1. [bandithijo.com/arch/step-7-install-gnome-and-complete-installation#710-encrypt-home-directory](https://bandithijo.com/arch/step-7-install-gnome-and-complete-installation#710-encrypt-home-directory) \
   Diakses tanggal: 2019-06-14

1. [wiki.archlinux.org/index.php/ECryptfs](https://wiki.archlinux.org/index.php/ECryptfs) \
   Diakses tanggal: 2019-06-14
