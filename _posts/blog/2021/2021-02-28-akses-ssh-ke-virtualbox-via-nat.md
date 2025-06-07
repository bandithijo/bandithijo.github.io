---
layout: 'post'
title: "Mengakses VirtualBox Instance dengan SSH via NAT"
date: '2021-02-28 06:17'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['VirtualBox']
pin:
hot:
contributors: []
description: "Apabila kita memasang sistem operasi server yang hanya menjalankan CLI pada VirtualBox, saya lebih memilih untuk mengaksesnya menggunakan SSH ketimbang harus menggunakan UI dari VirtualBox. Alasannya karena, saya lebih familiar dengan Terminal Emulator yang saya gunakan."
---

# Latar Belakang Masalah

Ketika kita memasang sistem operasi server degan VirtualBox, saya secara pribadi tidak begitu menyukai berinteraksi degan VirtualBox secara Command Line way.

Saya lebih familiar dengan Terminal Emulator yang saya biasa gunakan sehari-hari.

Karena tidak ada GUI pada sistem operasi server, lantas kenapa tidak saya gunakan Terminal Emulator sendiri dan mengakses server dengan SSH?

Selain itu, saya merasa kurang praktis untuk berpindah-pindah antara Guest dan Host karena harus menekan "Host Key Combination" yang saya atur ke <kbd>Right Alt</kbd> untuk melepaskan fokus input keyboard dari Guest.

Nah, biasanya karena ingin praktis, saya menggunakan konfigurasi NAT agar Guest mendapatkan akses internet dari Host. Karena itu, saya tidak dapat melakukan SSH dengan cara biasa.


# Peyelesaian Masalah

Karena saya menggunakan NAT untuk memberikan akses internet Guest dengan Host, saya perlu mengkonfigurasi **Port Forwarding** agar saya dapat mengakses Guest dengan SSH dari Host.

![Gambar 1](https://i.postimg.cc/zf5bnjHP/gambar-01.png)

Gambar 1. Button "Port Forwarding" di dalam menu Network

Saya sudah mengaktifkan service SSH di Guest, jadi tinggal saya akses saja via SSH.

![Gambar 2](https://i.postimg.cc/QCBHXYvV/gambar-02.png)

Gambar 2. Buat rule baru dengan Guest IP

Bagian **Guest IP** adalah IP address dari Guest yang bisa didapatkan dengan,

```
$ ip a s eth0
```

**eth0** adalah ethernet interface.

Sesuaikan dengan nama ethernet interface yang digunakan oleh Guest.

Berbeda distro, bisa berbeda nama (new namspace atau old namespace).

Selajutnya, tinggal kita akses dari Host menggunakan Terminal Emulator favorit.

```
$ ssh -p 2222 &lt;username>@127.0.0.1
```

```
The authenticity of host '[127.0.0.1]:2222 ([127.0.0.1]:2222)' can't be established.
ECDSA key fingerprint is SHA256:DR5yuwPzVQNpAaM6n9VT/fGESGGSJFVhJAY/LKoCpFA.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added '[127.0.0.1]:2222' (ECDSA) to the list of known hosts.
<userame>@127.0.0.1's password: _
```

Masukkan password **&lt;username>** dari Guest.

Kalau berhasil, kita akan langsung masuk ke dalam Guest.

```
Last login: Sun Feb 28 06:15:13 2021 from 10.0.2.2
OpenBSD 6.8 (GENERIC) #97: Sun Oct  4 18:00:46 MDT 2020

Welcome to OpenBSD: The proactively secure Unix-like operating system.

Please use the sendbug(1) utility to report bugs in the system.
Before reporting a bug, please try to reproduce it with the latest
version of the code.  With bug reports, please try to ensure that
enough information to reproduce the problem is enclosed, and if a
known fix for it exists, include that as well.

openbsd$ _
```

Mantap!

> INFO
> 
> Pengaturan **Port Forwarding** ini, dapat dilakukan meski instance sedang berjalan.


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [https://bobcares.com/blog/virtualbox-ssh-nat](https://bobcares.com/blog/virtualbox-ssh-nat)
<br>Diakses tanggal: 2021/02/28
