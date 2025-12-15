---
layout: "post"
title: "Sharing Direktori Antara Host Linux dan Guest Windows pada Virt-Manager/KVM/Qemu"
date: "2021-05-06 00:40"
permalink: "/blog/:title"
assets: "/assets/images/posts/2021/2021-05-06-sharing-direktori-antara-host-dan-guest-pada-virt-manager"
author: "BanditHijo"
category: "blog"
tags: ["virt-manager", "kvm", "qemu", "samba"]
description: "Memiliki akses Home direktori yang dimiliki oleh Host dari dalam Guest, sangat memudahkan sekali untuk proses tukar menukar data. Tidak perlu repot-repot harus menggunakan aplikasi semacam Filezilla, scp, atau semacamnya. Semuanya cukup dilakukan dengan File Explorer di Linux dan Explorer Guest Windows."
---

## Latar Belakang Masalah

Saat membuat VM baru pada virt-manager, biasanya sharing Home direktori antara Host OS --dalam hal ini adalah GNU/Linux-- dan Guest OS --dalam hal ini adalah Windows-- tidak langsung tersedia. Kita perlu mengkonfigurasi secara manual.

**Bang, yang seperti apa sih "Sharing Home Direktori" itu?**

![Gambar 1]({{ page.assets }}/gambar-04.png)

Gambar 1. Home Dir Linux pada My Computer Windows

Bisa dilihat di **My Computer**, pada kategori **Network Location** seperti yang saya kotakin merah.

Kalau kita buka, isinya adalah Home direktori dari Host OS.


## Pemecahan Masalah

Untu memecahkan masalah di atas, teradapat beberapa prasyarat yang harus terpenuhi, diantaranya:

1. Mengaktifkan Samba service pada Host OS
2. Perlu membuat virtual network yang dapat diakses oleh Host OS (Bridge)
3. Menambahkan "Network Location" pada Guest OS yang dialamatkan pada IP address Host OS

Oke, saya akan jabarkan langkah-langkah di atas.


### Pasang Samba

Pasang Samba dulu apabila belum terinstal.

```
$ sudo pacman -S samba
```

Kalau di Artix Linux, ikutkan dengan paket initnya, misal untuk OpenRC.

```
$ sudo pacman -S samba samba-openrc
```


### Jalankan Samba Service

Sebelum dapat digunakan, tentunya Samba service harus dijalankan terlebih dahulu.

**systemd**

```
$ sudo systemctl start smb
```

**OpenRC**

```
$ sudo rc-service smb start
```


### Buat Samba User

Buat Samba user terlebih dahulu, saya merekomendasikan, agar mudah diingat, buat Samba user dengan credential yang sama dengan Guest OS yang digunakan.

Misal, di Guest OS (Windows), saya memiliki user:

```
username: bandithijo
password: hijobandit
```

Sekarang, buat Samba user,

```
$ smbpasswd -a bandithijo
```

```
New SMB password:
Retype new SMB password:
```

> INFO
> 
> Sekedar catatan saja, agar tidak perlu repot-repot mencari-cari.
> 
>**Mengganti Password**
> 
> ```
> $ smbpasswd bandithijo
> ```
> 
> **Menghapus Samba User**
> ```
> $ smbpasswd -x bandithijo
> ```


### Membuat Virtual Network

> PERHATIAN!
> 
> Harap dimaklumi, karena saya tidak begitu mahir dengan Networking. 😄

**Virtual Network yang dibuat harus memiliki network yang sama dengan Host OS**.

Misal, Host OS memiliki IP address, 192.168.1.7/24, artinya Host OS berada pada network 192.168.1.0/24 dengan jumlah IP address yang tersedia adalah 254. Mulai dari rentang 192.168.1.2 - 192.168.1.254

Kita akan mengambil sebagian IP address yang tersedia tersebut.

Misal, dari ip 192.168.1.100 dengan netmask /28.

Untuk membuat Virtual Network, buka menu **Edit > Connection Details**.

Pergi ke tab **Virtual Networks**.

Tambahkan network baru dengan menu **+** di pojok kiri bawah.

Nanti akan terbuka window seperti di bawah ini.

![Gambar 2]({{ page.assets }}/gambar-01.png)

Gambar 2. Proses create Virtual Network

Isi bagian-bagian yang saya kotak merah.

```
Name: network-bridge
Mode: NAT
IPv5:
  Network: 192.168.1.100/28
```

Lalu tekan **Finish**.

Nanti virt-manager secara pintar, akan mengalokasikan IP address yang tersedia untuk kita gunakan.

![Gambar 3]({{ page.assets }}/gambar-02.png)

Gambar 3. Detail dari Virtual Network

Dapat dilihat pada Gambar 3 di atas, kita mendapatkan network 192.168.1.96/28, dengan alokasi IP address yang dapat kita gunakan pada rentang 192.168.1.104 - 192.168.1.110

Jadi, nanti ketika kita membuat Vitual Machine, IP address yang akan diambil dari rentang tersebut apabila kita gunakan Virtual Network **network-bridge**.


### Attach VM dengan Virtual Network

Anggaplah kita sudah memiliki Virtual Machine yang berisi Windows.

Pasang/attach Network Interface Controller (NIC) dengan Virtual Network yang kita buat di atas dengan nama **network-bridge**.

Seperti ini ilustrasinya,

![Gambar 4]({{ page.assets }}/gambar-03.png)

Gambar 4. Detail dari Virtual Network Interface

Dapat dilihat pada Gambar 4 di atas, Virtual Machine saya mendapatkan IP address 192.168.1.105, yang mana IP address ini masih dalam rentang yang kita bahas di atas (.104 - .110).

Karena Virtual Machinve (Guest OS) memiliki IP yang berada pada rentang Host OS, maka keduaya dapat saling berkomunikasi.

```
Host  OS IP Address : 192.168.1.7
Guest OS IP Address : 192.168.1.105
```

Coba lakukan pengetesan dengan mengirimkan sinyal **ping**.

**Host OS (Linux) ping ke Guest OS (Windows)**

```
$ ping -c 3 192.168.1.105
```

```
PING 192.168.1.105 (192.168.1.105) 56(84) bytes of data.
64 bytes from 192.168.1.105: icmp_seq=1 ttl=128 time=0.312 ms
64 bytes from 192.168.1.105: icmp_seq=2 ttl=128 time=0.341 ms
64 bytes from 192.168.1.105: icmp_seq=3 ttl=128 time=0.353 ms

--- 192.168.1.105 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2016ms
rtt min/avg/max/mdev = 0.312/0.335/0.353/0.017 ms
```

Di sisi lain,

**Guest OS (Windows) ping ke Host OS (Linux)**

```
$ ping 192.168.1.7
```

```
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Users\bandithijo>ping 192.168.1.7

Pinging 192.168.1.7 with 32 bytes of data:
Reply from 192.168.1.7: bytes=32 time=1ms TTL=64
Reply from 192.168.1.7: bytes=32 time<1ms TTL=64
Reply from 192.168.1.7: bytes=32 time<1ms TTL=64
Reply from 192.168.1.7: bytes=32 time<1ms TTL=64

Ping statistics for 192.168.1.7:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 1ms, Average = 0ms
```

Oke, kita sudah punya network yang sesuai dengan prasyarat yang ditentukan.


### Buat Network Location di Guest OS

Buka Guest OS --dalam hal ini adalah Windows, kemudian buka **My Computer**.

Klik kanan dan pilih **Add a network location**.

![Gambar 5]({{ page.assets }}/gambar-05.png)

Gambar 5. Proses menambahkan network location baru

Next-next aja, sampai ketemu halaman seperti di bawah ini.

![Gambar 6]({{ page.assets }}/gambar-06.png)

Gambar 6. Masukkan IP address host dan hostname

Isi dengan format seperti yang saya kotakin merah.

```
\\192.168.1.7\bandithijo
```

Dapat dilihat bahwa formulanya adalah,

```
\\host_ip_address\host_username
```

Halaman selanjutnya adalah memberikan nama,

![Gambar 7]({{ page.assets }}/gambar-07.png)

Gambar 7. Proses memberikan nama dari network location

Finish!

Kalau berhasil, akan ada Home dari Host OS di my computer.

![Gambar 8]({{ page.assets }}/gambar-04.png)

Gambar 8. Home Directory Linux sudah berhasil ditambahkan

**Bang, saya tidak mau Home direktori yang dishare, tapi direktori tertentu. Bisa tidak?**

Tetu saja, Bisa!

Misal, direktori yang mau dishare ada di **/home/bandithijo/Documents/**.

Tinggal buat saja locationnya seperti ini.

```
\\192.168.1.7\bandithijo\Documents
```

Hasilnya,

![Gambar 9]({{ page.assets }}/gambar-08.png)

Gambar 9. Contoh network location selain Home Directory


## Demo

![Gambar 10]({{ page.assets }}/gambar-09.gif)

Gambar 10. Demo menambhakn network location


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Terima Kasih

1. Arya Pramudika, atas informasi membuat Virtual Network Bridge.


## Referensi

1. [wiki.archlinux.org/title/Samba](https://wiki.archlinux.org/title/Samba) \
   Diakses tanggal: 2021-05-06
