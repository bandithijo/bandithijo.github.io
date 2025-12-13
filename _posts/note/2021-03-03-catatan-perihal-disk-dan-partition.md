---
layout: "post"
title: "Catatan dalam Berinteraksi dengan Disk dan Partition"
date: "2021-03-03 13:38"
permalink: "/note/:title"
assets: "/assets/images/notes/2021-03-03-catatan-perihal-disk-dan-partition"
author: "BanditHijo"
category: "note"
tags: ["disk", "partition", "udisksctl"]
description: "Berinteraksi dengan disk partition mungkin merupakan pekerjaan harian bagi sebagian teman-teman, namun tidak dengan saya dan sebagian teman-teman yang lain. Catatan ini hadir untuk menyimpan beberapa 'Best Practice' yang dapat kita gunakan, apabila sewaktu-waktu kita berurusan dengan partition."
---

## Prakata

Berinteraksi dengan disk dan partition mungkin merupakan pekerjaan harian bagi sebagian teman-teman, namun tidak dengan saya dan sebagian besar teman-teman yang lain.

Catatan ini hadir untuk menyimpan beberapa "best practice" yang dapat kita gunakan, apabila kita memerlukannya saat akan berurusan dengan disk dan partition.


## Perbedaan Disk dan Partition

Saya lihat banyak sekali teman-teman yang masih suka tertukar-tukar dalam membedakan dan mengidentifikasi sebuah block termasuk disk atau partition.

Sederhananya seperti ini,

```
NAME
sda      ← disebut, disk,      biasanya ditulis /dev/sda
├─sda1   ← disebut, partition, biasanya ditulis /dev/sda1
└─sda2   ← disebut, partition  biasanya ditulis /dev/sda2
```


## Tips & Tricks


### Melihat list block disk

Atau dapat kita artikan mengecek struktur dari partisi.

```
lsblk
```

Kita juga dapat memformat tampilan output untuk menampilkan field apa saya yang ingin kita tampilkan.

```
$ lsblk --output=NAME,FSTYPE,SIZE,TYPE,LABEL,MOUNTPOINT
```

Teman-teman tinggal mendefinisikan aliasnya saja biar praktis.


### Mounting file ISO dengan Udisks

Terdapat 2 tahap:

**1. Setup loop block disk**

```
$ udisksctl loop-setup -f file_image.iso
```

```
$ udisksctl loop-mount -f archlinux.iso
```

Kalau berhasil, fileiso akan terpasang ke loop block disk.

```
$ lsblk
NAME      FSTYPE    SIZE TYPE LABEL       MOUNTPOINT
loop0     iso9660   681M loop ARCH_202010
├─loop0p1 iso9660   681M part ARCH_202010
└─loop0p2 vfat       56M part ARCHISO_EFI
```

Tinggal dimounting.

**2. Mounting loop block disk**

```
$ udisksctl mount -p /dev/block_partition
```

```
$ udisksctl mount -p /dev/loop0p1
```

```
$ lsblk
NAME      FSTYPE    SIZE TYPE LABEL       MOUNTPOINT
loop0     iso9660   681M loop ARCH_202010
├─loop0p1 iso9660   681M part ARCH_202010 /run/media/bandithijo/ARCH_202010 👈
└─loop0p2 vfat       56M part ARCHISO_EFI
```

Secara otomatis **udisks** akan membuat mount point ke path $XDG_RUNTIME_USER.


### Unmounting file ISO dengan Udisks

Sekenarionya tinggal dibalik dari proses mounting di atas.

**1. Unmounting loop block disk**

```
$ udisksctl unmount -p /dev/block_partition
```

```
$ udisksctl unmount -p /dev/loop0p1
```

```
$ lsblk
NAME      FSTYPE    SIZE TYPE LABEL       MOUNTPOINT
loop0     iso9660   681M loop ARCH_202010
├─loop0p1 iso9660   681M part ARCH_202010
└─loop0p2 vfat       56M part ARCHISO_EFI
```

**2. Delete loop block disk**

```
$ udisksctl loop-delete -b /dev/block_partition
```

```
$ udisksctl loop-delete -b /dev/loop0
```


### Membuat bootable flash drive dengan dd

Kita dapat menggunakan tools yang bernama **dd** untuk membuat bootable flash drive dari file ISO.

Misal, kita memiliki file ISO dari Arch Linux yang berlokasi di **$HOME/iso/archlinux.iso** dan sebuah flash drive yang apabila di pasangkan ke laptop, akan beralamat di **/dev/sdb**.

> INFO
> 
> Kita dapat mengetahui alamat blok dari flashdrive dengan perintah **lsblk**.

Selanjutnya tinggal kita ekseskusi.

```
$ sudo dd if=/path/source of=/path/target
```

```
$ sudo dd if=~/iso/archlinux.iso of=/dev/sdb
```

Kita juga dapat menambahkan beberapa parameter seperti `bs=BYTES` atay `status=LEVEL`.

Seringnya, saya gunakan seperti ini:

```
$ sudo dd if=~/iso/archlinux.iso of=/dev/sdb bs=1M status=progress
```

Untuk penjelasan mengenai parameter lebih lengkapnya, teman-teman dapat membaca sendiri di [**man dd**](https://man.archlinux.org/man/dd.1).

> PERHATIAN!
> 
> Jangan tambahkan nomor atau partition number, seperti: **/dev/sdb1**.
> 
> Tapi, gunakan block disk, seperti: **/dev/sdX**, di mana **X** merupakan abjad yang nilainya berbeda-beda (kondisional), sesuai dengan banyaknya external drive yang terhubung dengan sistem kita.
> 
> ---
> 
> Kesalahan mendefinisikan **if=** dan **of=** dapat berakibat fatal.
> 
> Telitilah sebelum mengeksekusi.
