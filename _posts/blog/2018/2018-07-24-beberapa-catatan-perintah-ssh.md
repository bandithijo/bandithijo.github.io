---
layout: "post"
title: "Beberapa Catatan Kaki Mengenai Perintah-perintah SSH"
date: "2018-07-30 21:56"
permalink: "/blog/:title"
assets: "/assets/images/posts/2018/2018-06-22-memperbaiki-gpg-permissions-on-homedir"
author: "BanditHijo"
category: "blog"
tags: ["ssh"]
description: "Sudah hampir dua minggu ini saya terpilih sebagai peserta untuk mengikuti kelas yang membahas tentang Cloud Computing. Ini merupakan bidang yang sangat baru pertama kali saya sentuh. Sebelumnya, memang saya sering membaca (meski hanya judul) di beberapa blog GNU/Linux yang membahas tentang teknologi-teknologi yang digunakan dalam Cloud Computing. Meskipun sama-sama dalam bidang teknologi, namun jujur saja, istilah-istilah yang digunakan sangat asing buat saya pahami."
---

![Banner](https://s20.postimg.cc/dwqipcfgd/banner_post_18.png)


## Pendahuluan

Sudah hampir dua minggu ini saya terpilih sebagai peserta untuk mengikuti kelas yang membahas tentang *Cloud Computing*. Ini merupakan bidang yang sangat baru pertama kali saya sentuh. Sebelumnya, memang saya sering membaca (meski hanya judul) di beberapa blog GNU/Linux yang membahas tentang teknologi-teknologi yang digunakan dalam *cloud computing*. Meskipun sama-sama dalam bidang teknologi, namun jujur saja, istilah-istilah yang digunakan sangat asing buat saya pahami.


## Keresahan

Di kelas yang saya ikuti, saya menemukan beberapa penerapan perintah-perintah `ssh` yang saya rasa perlu untuk mendokumentasikannya. Saya khawatir akan sangat membuang-buang waktu lagi apabila saya harus melakukan *research* kembali jika suatu saat nanti saya membutuhkannya. Jadi, kenapa tidak saya tulis.


## Catatan Kaki

Berikut ini adalah beberapa perintah-perintah SSH yang saya gunakan. Belum dapat saya jelaskan secara detail masing-masing fungsinya dan penjabaran masing-masing parameter yang digunakan.


### SSH Tunneling dengan Keybase Login & Spesifik Port

```
$ ssh -i .ssh/{private-key} {user}@{server-address} -p {port}
```

```
$ ssh -i .ssh/id_rsa bandithijo@dev.bandithijo.com -p 2200
```

Atau,

```
$ ssh -i .ssh/id_rsa bandithijo@10.1.41.200.1 -p 2200
```


### SSH Tunneling dengan Keybase Login, Spesifik Port & Dynamic Port Forwarding

Nah, kalo ini saya gunakan untuk *Dynamic Port Forwarding*, kegunannya untuk mengakses server agar dapat kita akses dari *web browser* kita.

```
$ ssh -D {proxy-port} -i .ssh/{private-key} {user}@{server-address} -p {port}
```

```
$ ssh -D 8080 -i .ssh/id_rsa bandithijo@dev.bandithijo.com -p 2200 -q
```

Atau,

```
$ ssh -D 8888 -i .ssh/id_rsa bandithijo@10.1.41.200 -p 2200 -q
```

*port* 8080 dapat diganti dengan nilai berapapun, asalkan *port* tersebut tidak digunakan oleh service yang lain.

Setelah itu, untuk mengaksesnya dari *web browser*, saya menggunakan perintah di bawah.

**Firefox**

1. Pilih menu **Preferences** > *find in Preferences*, isikan "Proxy"
2. Nanti akan keluar **Network Proxy**, pilih **Settings...**
3. Pilih **Manual proxy configuration** > SOCKS Host: **localhost** Port: **8080**, samakan nilai port dengan nilai *dynamic port forwarding* yang kalian berikan pada saat SSH tunneling port forwarding di atas.
4. Pilih bullet **SOCKS v5**
5. Optional untuk mencentang **Proxy DNS when using SOCKS v5**
6. Pastikan Server kalian sudah mengaktifkan service HTTP

**Chromium / Google Chrome**

Pada *browser* Chromium atau Google Chrome, cukup menjalankan perintah di bawah ini pada Terminal.

**Google Chrome**

```
$ google-chrome-stable --proxy-server="socks5://localhost:8080"
```

**Chromium**

```
$ chromium --proxy-server="socks5://localhost:8080"
```


### SSH Tunneling dengan Username yang Terdaftar pada Server

```
$ ssh -l banditbiru dev.bandithijo.com
```

Atau,

```
$ ssh -l banditbiru 10.1.41.200
```

Perintah di atas akan membawa kita langsung memasuki user **banditbiru** di server. Tentu saja perintah ini dapat dilakukan setelah kita memasukkan **public key** kita ke dalam file `/home/banditbiru/.ssh/authorized_keys` di server pada user **banditbiru**.


### Generate Private & Public Key SSH

Saya menggunakan beberapa bentuk format perintah `ssh-keygen` untuk mengenerate key. Berikut ini adalah beberapa bentuk format yang saya gunakan dalam pelatihan.


#### Generate Key untuk User Biasa

Yang sederhana,

```
$ ssh-keygen
```

Atau agak kompleks,

```
$ ssh-keygen -t rsa -b 4096
```

Yang lebih kompleks,

```
$ ssh-keygen -t rsa -b 4096 -C "bandithijo@rumah"
```

Hasil dari perintah di atas adalah dua buah file dengan nama yang sama, namun yang tidak memiliki ekstensi disebut sebagai **Private Key** dan yang memiliki ekstensi **.pub** disebut sebagai **Public Key**.

```
$ ls -l $HOME/.ssh/
```

```
📂 /home/bandithijo/.ssh/
├── 📄 authorized_keys
├── 📄 id_rsa 👈️
├── 📄 id_rsa.pub 👈️
└── 📄 known_hosts
```

Sebagai catatan, apabila kita melakukan perintah `ssh-keygen` pada user biasa, maka otomatis file *private* dan *public key* akan diletakkan pada direktori `.ssh/` milik user biasa tersebut. Seperti contoh di atas, terletak pada direktori `.ssh` milik user **bandithijo**.


#### Generate Key untuk Root dari User Biasa

Kita dapat mengenerate key untuk user root melalui user biasa, dengan cara menambahkan `sudo` pada awal perintah `ssh-keygen`.

```
$ sudo ssh-keygen
```

Apabila seperti di atas, maka file *private* dan *public key* akan terdapat pada direktori `.ssh/` milik root, yaitu `/root/.ssh/`.

```
$ sudo ls -l /root/.ssh/
```

```
📂 /root/.ssh/
├── 📄 authorized_keys
├── 📄 id_rsa 👈️
├── 📄 id_rsa.pub 👈️
└── 📄 known_hosts
```

Tentu saja, apabila *private* dan *public key* yang kita generate berada pada direktori `/root/`, maka untuk mengakses SSH Gateway kita juga harus mengawalinya dengan menambahkan perintah `sudo` di awal baris perintah.

```
$ sudo ssh -l bandithijo dev.bandithijo.com
```

Atau,

```
$ sudo ssh -l bandithijo 10.1.41.200
```

> PERTANYAAN?
> 
> **Apakah private dan public key dapat kita rename?**
> 
> Tentu saja kita dapat mengganti nama dari file *private* dan *public key* tersebut, namun sangat direkomendasikan untuk memberikan nama yang sama diantara keduanya. Agar tetap berpasangan.


### Menampilkan Public Key

```
$ cat $HOME/.ssh/{nama_public_key}.pub
```

```
$ cat $HOME/.ssh/id_rsa.pub
```


### Menyimpan public key di server target

```
$ ssh-copy-id -i ~/.ssh/id_rsa.pub <username@ipaddress>
```

```
$ ssh-copy-id -i ~/.ssh/id_rsa.pub bandithijo@192.168.1.7
```


## Pesan Penulis

Oke, saya rasa untuk saat ini, cukup seperti ini saja. Saya tidak berhenti menulis, mungkin lain kali kamu datang lagi, tulisan di halaman ini sudah bertambah dengan perintah-perintah SSH yang lain.

Terima kasih. ^_^


## Referensi

1. [wiki.archlinux.org/index.php/Secure_Shell](https://wiki.archlinux.org/index.php/Secure_Shell) \
   Diakses tanggal: 2018-07-24
