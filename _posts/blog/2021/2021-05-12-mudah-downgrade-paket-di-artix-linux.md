---
layout: 'post'
title: "Mudah Downgrade Paket di Artix Linux"
date: '2021-05-12 22:13'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Artix Linux']
pin:
hot:
contributors: []
description: "Menggunakan distribusi yang menggunakan metode rilis 'rolling' mungkin merupakan kekhawatiran bagi sebagian besar GNU/Linux user. Mereka sering menyebut distro yang memiliki paket-paket yang tidak stabil. Apakah benar? Saya senyumin aja. Apakah saya pernah memiliki masalah dengan paket terbaru? Tentu. Bagaimana cara saya mengatasinya? Downgrade. Catatan ini adalah tips menggunakan tool yang bernama 'downgrade' yang defaultnya untuk Arch Linux pada Artix Linux."
---

> PERHATIAN!
> 
> Saya, sebagai penulis, **tidak bertanggung jawab** atas segala bentuk kejadian buruk yang menimpa sistem kalian.
> 
> Apabila kalian mengikuti catatan ini, berarti kalian **telah menyetujui** bahwa **segala bentuk risiko atas masalah** yang terjadi karena mengikuti catatan ini, adalah **tanggung jawab kalian sepenuhnya**.
> 
> Happy Hacking!


# Latar Belakang Masalah

Menggunakan distribusi yang menggunakan metode rilis "rolling" mungkin merupakan kekhawatiran bagi sebagian besar GNU/Linux user. Mereka sering menyebut distro yang memiliki paket-paket yang tidak stabil.

**Apakah benar?** Saya senyumin aja.

**Apakah saya pernah memiliki masalah dengan paket terbaru?** Tentu.

**Bagaimana cara saya mengatasinya?** Downgrade.

Catatan ini adalah tips menggunakan tool yang bernama 'downgrade' yang defaultnya untuk Arch Linux pada Artix Linux.


# Mengatasi Masalah


## Pasang Perkakas

Terdapat setidaknya 2 tools yang dapat kita gunakan, yaitu:

1. [**downgrader-git**](https://aur.archlinux.org/packages/downgrader-git/)<sup>AUR</sup>
2. [**downgrade**](https://aur.archlinux.org/packages/downgrade/)<sup>AUR</sup>

Perbedaan antar keduanya, kurang begitu jelas buat saya. Teman-teman dapat mencari tahu sendiri dan dapat memilih antara keduanya. Namun, yang saya pergunakan pada catatan ini adalah tool yang kedua, yaitu **downgrade**.

```
$ yay -S downgrade
```


## Cara Penggunaan

Saya anggap, teman-teman sudah familiar dengan aturan berkaitan degan paket (library) di Arch Linux, bahwa:

> **Partial upgrades are unsupported**
>
> Arch Linux is a **rolling release** distribution. That means when new library versions are pushed to the repositories, the developers and Trusted Users rebuild all the packages in the repositories that need to be rebuilt against the libraries. For example, if two packages depend on the same library, upgrading only one package might also upgrade the library (as a dependency), which might then break the other package which depends on an older version of the library.
>
> **That is why partial upgrades are not supported**. Do not use `pacman -Sy package` or any equivalent such as `pacman -Sy` followed by `pacman -S package`. Note that `pacman -Syuw` does imply the same risks like `pacman -Sy`, as it will update the pacman sync database without installing the newer packages. Always upgrade (with `pacman -Syu`) before installing a package. Note that if `pacman -Syu` does not perform the upgrade because of an error, the end result is the same as running `pacman -Sy`. Therefore, the error must be resolved and the upgrade operation completed as soon as possible. Be very careful when using `IgnorePkg` and `IgnoreGroup` for the same reason. If the system has locally built packages (such as AUR packages), users will need to rebuild them when their dependencies receive a soname bump.
>
> Sumber: [wiki.archlinux.org/title/System_maintenance#Partial_upgrades_are_unsupported](https://wiki.archlinux.org/title/System_maintenance#Partial_upgrades_are_unsupported)

Jadi... teliti, cermat, dan pintar-pintar lah dalam proses downgrade.

Proses downgrade bukan hal yang mustahil ataupun sulit dilakukan, namun memerlukan ketelitian dan kecermatan paket-paket mana saja yang terkait dengan versi tertentu.

Sejak 2016, saya sudah menggunakan Arch Linux dan tidak satu dua kali melakukan downgrade paket untuk menyesuaikan dengan kebutuhan sistem dan mesin saya.

Okelah, balik ke topik Artix Linux karena catatan ini bukan membahas secara mendalam tentang proses downgrade package.

**Apakah downgrade pada Artix berbeda dengan Arch?**

Ya berbeda.

Pada Arch Linux, proses downgrade mengambil package dari repositori arsip yang berada di [**Arch Linux Archive**](https://archive.archlinux.org/). Yang mana alamat ini sudah menjadi default dari option `--ala-url`, sehingga tanpa perlu menggunakan option ini, sudah otomatis diarahkan ke alamat tersebut.

Namun, pada Artix Linux, tentu saja kita harus mengarahkan alamat arsip tersebut ke alamat arsip untuk Artix Linux, yang beralamat di [**Artix Linux Archive**](https://archive.artixlinux.org/).

Seperti ini,

**Single package**

```
$ sudo downgrade --ala-url "https://archive.artixlinux.org" <package>
```

**Multiple packages**

```
$ sudo downgrade --ala-url "https://archive.artixlinux.org" <package1> <package2> <package3>
```


## Kapan Harus Menggunakan ala-url ?

_Sedang dalam proses riset..._


## Contoh Penggunaan

Misal, kita mau downgrade kernel **linux**. Saya mencontohkan package **linux** karena perbedaannya terlihat di nama packagenya **-arch** dan **-artix**.

**Downgrade linux di Arch Linux**

```
$ sudo downgrade linux
```

```
Available packages:

     1)  linux    4.20.1.arch1    1  x86_64  (remote)
     2)  linux    4.20.2.arch1    1  x86_64  (remote)
     3)  linux    4.20.3.arch1    1  x86_64  (remote)
     4)  linux    4.20.4.arch1    1  x86_64  (remote)
   -------------------- dipotong --------------------
   221)  linux    5.12.1.arch1    1  x86_64  (remote)
   222)  linux    5.12.1.arch1    1  x86_64  (remote)
   223)  linux    5.12.2.arch1    1  x86_64  (remote)
   224)  linux    5.12.2.arch1    1  x86_64  (remote)

select a package by number:
```

**Downgrade linux di Artix Linux**

```
$ sudo downgrade --ala-url "https://archive.artixlinux.org" linux
```

```
Available packages:

    1)  linux    5.7.2.artix1    1  x86_64  (remote)
    2)  linux    5.7.8.artix1    1  x86_64  (remote)
    3)  linux    5.7.10.artix1   1  x86_64  (remote)
    4)  linux    5.7.12.artix1   1  x86_64  (remote)
   ------------------- dipotong --------------------
   37)  linux    5.12.1.artix1   1  x86_64  (remote)
   38)  linux    5.12.1.artix1   1  x86_64  (remote)
   39)  linux    5.12.2.artix1   1  x86_64  (remote)
   40)  linux    5.12.2.artix1   1  x86_64  (remote)

select a package by number:
```

Cara penggunaan **downgrade** lebih lengkapnya, dapat teman-teman baca di:

```
$ man downgrade
```


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [wiki.archlinux.org/title/Downgrading_packages](https://wiki.archlinux.org/title/Downgrading_packages)
<br>Diakses tanggal: 2021/05/12

2. [wiki.archlinux.org/title/Downgrading_packages](https://wiki.archlinux.org/title/Downgrading_packages)
<br>Diakses tanggal: 2021/05/12

3. [archive.artixlinux.org/](https://archive.artixlinux.org/)
<br>Diakses tanggal: 2021/05/12
