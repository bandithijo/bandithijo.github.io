---
layout: "post"
title: "Catatan Instalasi OpenBSD"
date: "2021-02-28 05:54"
permalink: "/note/:title"
assets: "/assets/posts/note/2021-02-28-catatan-perihal-instalasi-openbsd"
author: "BanditHijo"
category: "note"
tags: ["openbsd"]
description: "Migrasi ke OpenBSD mungkin akan menjadi perjalaan yang panjang dan penuh persiapan. Karena proses pengerjaannya diwaktu luang dan tidak sekali waktu langsung selesai, saya merasa perlu untuk mendokumentasikan catatan, agar tidak lupa begitu saja."
sitemap: false
---

## Prakata

Migrasi ke OpenBSD mungkin akan menjadi perjalanan yang panjang dan penuh persiapan.

Karena prosesnya yang tidak sekali waktu langsung selesai, namun saya cicil di waktu luang, maka saya merasa perlu untuk mendokumentasikan catatan, agar tidak hilang begitu saja.

Saya mempublikasikan catatan untuk teman-teman pembaca Blog BaditHijo, agar dapat sama-sama kita manfaatkan.

Terima kasih telah menjadi pembaca setia dan menemani saya sampai saat ini.


## Troubleshooting


### Mengakses Root

Untuk berpindah ke root shell, dapat menggunakan.

```
$ su
```

Masukkan password root yang dibuat pada saat proses instalasi.


### Root permission from user

**doas** is preinstalled by default, kita hanya perlu melakukan konfigurasi,

```bash
!filename: /etc/doas.conf
permit :wheel
```

Kalau kita mau user hanya memasukkan password sekali, dan sementara waktu tidak perlu memasukkan password,

```bash
!filename: /etc/doas.conf
permit persist :wheel
```


### Text editor

**vi** is preinstalled by default, jadi kita dapat menggunakan text editor ini.

```
$ vi
```


### Firmware update

Dapat dilakukan dengan:

```
$ fw_update
```


### USB tethering

Lihat interface dari usb tethering,

```
$ ifconfig
```

```
...


urndis0: flags=8802<BROADCAST,SIMPLEX,MULTICAST> mtu 1500
        lladdr 0a:12:52:cf:95:21
        index 5 priority 0 llprio 3
```

Biasanya akan bernama **urndis0**.

Tinggal kita jalankan,

```
# dhclient urndis0
```

Kalau berhasil, kita akan mendapatkan IP address.

```
urndis0: 192.168.42.224 lease accepted from 192.168.42.129 (6e:45:af:fc:be:9f)
```

Kalau kita cek dengan **ifconfig**.

```
urndis0: flags=808843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST,AUTOCONF4> mtu 1500
        lladdr d2:58:ec:ab:0c:62
        index 5 priority 0 llprio 3
        inet 192.168.42.224 netmask 0xffffff00 broadcast 192.168.42.255
```


### Connect Wifi

Untuk melakukan scaning, misal wifi interface kita **iwn0**. Sudah dapat ditebak kalau wireless card saya adalah intel.

```
# ipconfig iwn0 scan
```

Kemudian, setelah mendapatkan SSID yang kita inginkan, tinggal connect.

```
# ifconfig iwn0 nwid <network-name> wpakey <passphrase>
```

Kemudian, untuk mendapatkan IP address, dapat menggunakan dhcp.

```
# dhclient iwn0
```


### DHCP Server

Jika ingin mengaktifkan DHCP server service saat startup, dapat menggunakan,

```
# rcctl enable dhcpd
```

Atau untuk mengeset perinterface saja, dapat menggunkan,

Misal, untuk etheret interface **em0** dan **iwn0**.

```
# rcctl set dhcpd flags em0 iwn0
```


### Tmux

Sejak OpeBSD 4.6, tmux telah menjadi bagian dari base system, sehingga kita tidak perlu repot-repot memasangnya.

Tinggal jalankan tmux di terminal.

```
$ tmux
```


### Starting X (Xenodm)

The recommended way to run X is with the xenodm(1) display manager. It offers some important security benefits over the traditional startx(1) command.
If xenodm(1) wasn't enabled during installation, it can be done so later like any other system daemon:

```
# rcctl enable xenodm
# rcctl start xenodm
```

On some platforms, you will need to disable the console getty(8) to use it. **This is not needed on amd64, i386 or macppc**.

Cara di atas akan meng-enable-kan Display Manager yang --mungkin bernama-- **xenodm**.

Dan ketika kita login, default sessionnya adalah **fvwm** yang merupakan turunan dari **twm**.


### Mirror pkg_add OpenBSD

Versi OpenBSD yang baru-baru menyimpan mirror pada **/etc/installurl**.

```bash
!filename: /etc/installurl
https://cdn.openbsd.org/pub/OpenBSD
```


## Referensi

1. [openbsdhandbook.com/openbsd_for_linux_users/](https://www.openbsdhandbook.com/openbsd_for_linux_users/)
