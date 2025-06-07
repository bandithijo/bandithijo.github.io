---
layout: 'post'
title: "Menyimpan Unfinished Modification dengan Git Stash"
date: '2023-09-17 11:07'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Git']
pin:
hot:
contributors: []
description: "Pada catatan kali ini saya akan mendokumentasikan salah satu feature dari Git yang cukup sering saya pergunakan di kerjaan, yaitu Git-stash."
---

# Pendahuluan

{{ page.description }}


# Masalah

Dalam sebuah project yang menggunakan Git, terkadang saya memiliki beberapa perubahan terhadap file-file project yang tidak ingin saya commit dulu.

Beberapa alasan diantaranya:

1. Saya memiliki lebih dari 1 algoritma problem solving yang ingin saya dokumentasikan
1. Saya harus berpindah branch karena ada konteks yang lebih urgent (misal: Bug Fixing)
1. Saya harus melakukan fast-forward commit dengan branch lain (misal: development branch)
1. Menyimpan perubahan sebagai patch dan akan di-apply pada pull terbaru
1. Alasan-alasan lain, yang menyebabkan saya harus mengabaikan perubahan yang sedang saya kerjakan saat ini


# Pemecahan Masalah

Alasan-alasan tersebut di atas, dapat terselesaikan dengan **Git-stash**. [^1]


## 1. Membuat Stash

Dengan Git-stash, saya bisa menyimpan segelondongan perubahan file yang tidak ingin saya commit, namun saya simpan terlebih dahulu, untuk saya kerjakan (panggil) lagi nanti, di waktu yang lain.

Caranya,

```
$ git stash save 'fix: bug on create product ver.1' -u
```

`git stash`, adalah prefix git untuk melakukan stash-ing.

`save`, adalah option untuk menyimpan stash dengan diikuti message.

`-u` atau `--include-untracked`, adalah option untuk melakukan stash terhadap semua untracked files. Saya menggunakan option ini karena semua modifikasi file belum saya staging.

Kita dapat menyimpan lebih dari 1 stash.


## 2. Melihat Daftar Stash

Ada 3 cara untuk melihat daftar stash.


### 2.1 Git-stash list

```
$ git stash list
```

```
stash@{0}: On feature/xxxxxxxx-xxxxxx: Modularity script ver.1
stash@{1}: On feature/xxxxxxxx-xxxxxx: xxxxxxx-xxxxxx: Update logic ver.1
stash@{2}: On feature/xxxxxxxx-xxxxxx: xxxxxxxx xxxxxx ver.1
stash@{3}: On feature/admin-xxxxxxx-xxxx: Add set_default xxxxxxx_xxxxxxxxxx
stash@{4}: On feature/admin-xxxxxxx-xxxx: Update ver.1
```

`stash@{Nth}` adalah identitas dari stash, untuk `{Nth}` adalah index dari stash yang dimulai dari 0. Dengan order (urutan), stash dengan index ke 0 adalah stash yang paling terakhir ditambahkan ke dalam stash.

> INFO
> 
> **Kekurangan:**
> 
> 1. Output list stash, akan tampil dalam bentuk *less like*. Apabila value lebih dari jumlah baris yang dapat ditampilkan di layar, maka, akan ada indikator berupa `-- More --` di pojok kiri bawah
> 1. Dengan kekurangan yang ada di nomor 1, artinya tidak ada navigasi untuk melihat detail dari isi stash


### 2.2 Git-log

```
$ git log -g stash
```

`-g`, atau `--walk-reflogs`, adalah option yang digunakan untuk mengurutkan reflog yang masuk dari yang paling terbaru (terakhir masuk) sampai yang terlama. [^2]

Outputnya akan seperti ini,

```
commit 08335778789d5b70228a4f47da95b89f99f5bc3d
Reflog: stash@{0} (Rizqi Nur Assyaufi <bandithijo@gmail.com>)
Reflog message: On feature/xxxxxxxx-xxxxxx: Modularity script ver.1
Merge: 23efe1d1e 6e4e19906
Author: Rizqi Nur Assyaufi <bandithijo@gmail.com>
Date:   Thu Jun 8 14:50:12 2023 +0800

    On feature/xxxxxxxx-xxxxxx: Modularity script ver.1

commit b3987dadfd79daf1b7a33ab61b7761a9281b3ca7
Reflog: stash@{1} (Rizqi Nur Assyaufi <bandithijo@gmail.com>)
Reflog message: On feature/xxxxxxxx-xxxxxx: xxxxxxx-xxxxxx: Update logic ver.1
Merge: 4335369f9 c24229e8b
Author: Rizqi Nur Assyaufi <bandithijo@gmail.com>
Date:   Mon May 22 14:38:06 2023 +0800

    On feature/xxxxxxxx-xxxxxx: xxxxxxx-xxxxxx: Update logic ver.1

commit 039ba27c4388d7f2dea17a627903580442ea4967
Reflog: stash@{2} (Rizqi Nur Assyaufi <bandithijo@gmail.com>)
Reflog message: On feature/xxxxxxxx-xxxxxx: xxxxxxxx xxxxxx ver.1
Merge: 60655d305 3f4a2cc7e
Author: Rizqi Nur Assyaufi <bandithijo@gmail.com>
Date:   Mon Apr 24 15:29:55 2023 +0800

    On feature/xxxxxxxx-xxxxxx: xxxxxxxx xxxxxx ver.1

commit 272e653bf7b31ec10c587bdfdabf28b88a2d1bc0
Reflog: stash@{3} (Rizqi Nur Assyaufi <bandithijo@gmail.com>)
Reflog message: On feature/admin-xxxxxxx-xxxx: Add set default xxxxxxx xxxxxxxxxx
Merge: 65542c241 ad4763514
Author: Rizqi Nur Assyaufi <bandithijo@gmail.com>
Date:   Wed Mar 29 22:38:14 2023 +0800

    On feature/admin-xxxxxxx-xxxx: Add set default xxxxxxx xxxxxxxxxx

commit a8430b442e3c6db0476e8b369a99b1707821ca1c
Reflog: stash@{4} (Rizqi Nur Assyaufi <bandithijo@gmail.com>)
Reflog message: On feature/admin-xxxxxxx-xxxx: Update ver.1
Merge: 4de02c94b 00df18f4a
Author: Rizqi Nur Assyaufi <bandithijo@gmail.com>
Date:   Tue Mar 28 17:57:42 2023 +0800

    On feature/admin-xxxxxxx-xxxx: Update ver.1
```

Pada bagian `Reflog:`, adalah identitas stash dengan format `stash@{Nth}`, untuk `{Nth}` adalah index dari stash yang dimulai dari 0. Dengan order (urutan), stash dengan index ke 0 adalah stash yang paling terakhir ditambahkan ke dalam stash.


### 2.3 Git-reflog

Dengan menggunakan Git-reflog show, kita dapat melihat detail dari stash. [^3]

```
$ git reflog show stash
```

Akan terbuka window split horizontal baru dengan output,

```
083357787 stash@{0}: On feature/xxxxxxxx-xxxxxx: Modularity script ver.1
b3987dadf stash@{1}: On feature/xxxxxxxx-xxxxxx: xxxxxxx-xxxxxx: Update logic ver.1
039ba27c4 stash@{2}: On feature/xxxxxxxx-xxxxxx: xxxxxxxx xxxxxx ver.1
272e653bf stash@{3}: On feature/admin-xxxxxxx-xxxx: Add set_default xxxxxxx_xxxxxxxxxx
a8430b442 stash@{4}: On feature/admin-xxxxxxx-xxxx: Update ver.1
```

Outputnya hampir mirip dengan Git-stash list, namun perbedaannya terdapat prefix commit hash di awalnya.

Commit hash ini memungkinkan kita untuk membuka isi dari stash dan melihat patch di dalamnya dengan cara menekan tombol <kbd>Enter</kbd> di atas commit hash.

Outputnya akan seperti ini,

```
tree a7510e9ce2fdc6026fce8a3f8dbc614d522560c1
parent b6540c374b9cab4d47d91f133261b805ed8ead03
parent d33698aabf3538e52372b5561a356830503d36a1
author Rizqi Nur Assyaufi <bandithijo@gmail.com> Fri Dec 23 07:07:58 2022 +0800
committer Rizqi Nur Assyaufi <bandithijo@gmail.com> Fri Dec 23 07:07:58 2022 +0800

On feature/admin-xxxxxxx-xxxx: Update ver.1


diff --git a/serializer/admin.rb b/serializer/admin.rb
index 392ea6f9d..c936694ba 100644
--- a/serializer/admin.rb
+++ b/serializer/admin.rb
@@ -32,6 +32,10 @@ class SerializerAdmin
     encrypt(object.phone)
   end

+  attribute :request_payload do
+    # new logic statement here
+  end
+
   attribute :links do
     {
       # self: admin_path(object),
```

Untuk, kembali ke stash list, dapat menggunakan tombol <kbd>Ctrl</kbd>+<kbd>^</kbd>.

Kekurangannya adalah tidak dapat melihat *untracked files* (file yang baru dibuat). Untuk case ini, dapat menggunakan Git-stash show.


## 3. Melihat Detail dari Stash dengan Git-stash show

Untuk melihat detail dari stash dalam bentuk patch diff, gunakan perintah ini, [^1]

```
$ git stash show -p stash@{Nth} -u
```

Atau shorthandnya untuk `stash{0}`, hanya tuliskan index nya saja,

```
$ git stash show -p 0 -u
```

`-p` adalah shorthand dari `--patch`.

`-u` adalah shorthand dari `--include-untracked`.

> INFO
> 
> Jika tanpa `-u` maka file yang baru dibuat, tidak akan ditampilkan.


## 4. Mengeluarkan Stash

Sekarang cara mengeluarkan dari stash, apabila stash yang telah disimpan, ingin digunakan kembali, yaitu dengan perintah, [^1]

Ada 2 cara untuk mengeluarkan stash:


### 4.1 Mengeluarkan tanpa menghapus stash

```
$ git stash apply stash@{Nth}
```

`{Nth}` adalah index, yang paling akhir (paling baru) ditambahkan adalah index ke `0`.

Atau langsung dengan indexnya,

```
$ git stash apply 0
```

Artinya, kita akan melakukan apply pada stash dengan index ke `0`.

> INFO
> 
> Perintah `git stash apply` ini tidak akan menghilangkan stash dengan index terpilih dari dalam stash list. Stash tersebut masih akan tetap ada. Untuk mengeluarkan sekaligus melakukan apply terhadap stash terpilih, dapat menggunakan Git-stash pop.


### 4.2 Mengeluarkan sambil menghapus stash

Jika stash terpilih sudah tidak diperlukan lagi, kita bisa menerapkan stash sambil menghapus stash dari daftar list.

```
$ git stash pop stash@{Nth}
```

`{Nth}` adalah index dari stash. Index ke 0 adalah stash dengan index paling akhir (paling baru ditambahkan).

Atau bisa langsung dengan index nya saja.

```
$ git stash pop 0
```


## 5. Menghapus Stash


### 5.1 Menhapus Selected Stash

Jika stash yang ada dalam daftar stash list sudah tidak digunakan lagi, kita dapat langsung menghapusnya dengan perintah Git-stash drop, [^1]

```
$ git stash drop stash@{Nth}
```

`{Nth}` adalah index dari stash terpilih, dengan index 0 adalah stash paling akhir ditambahkan (paling baru).

Atau bisa langsung dengan index nya,

```
$ git stash drop 0
```


### 5.2 Menghapus Seluruh Daftar Stash

Untuk menghapus seluruh stash atau mengosongkan seluruh stash dari list, kita dapat menggunakan Git-stash clear. [^1]

```
$ git stash clear
```

> PERHATIAN!
> 
> Perintah ini akan menghapus seluruh stash dari daftar list. Dan mungkin akan tidak mungin dapat di-recover.


# Pesan Penulis

Terima kasih sudah mampir yaa.

(^_^)



[^1]: [git-scm.com: _git-stash - Stash the changes in a dirty working directory away_](https://www.git-scm.com/docs/git-stash)
[^2]: [git-scm.com: _git-log - Show commit logs_](https://www.git-scm.com/docs/git-log)
[^3]: [git-scm.org: _git-reflog - Manage reflog information_](https://www.git-scm.com/docs/git-reflog)
