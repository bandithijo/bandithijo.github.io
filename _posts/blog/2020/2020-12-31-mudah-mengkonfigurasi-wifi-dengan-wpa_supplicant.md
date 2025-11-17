---
layout: "post"
title: "Mudah Mengkonfigurasi Wi-Fi dengan wpa_supplicant"
date: "2020-12-31 07:31"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-12-31-mudah-mengkonfigurasi-wifi-dengan-wpa_supplicant"
author: "BanditHijo"
category: "blog"
tags: ["wpasupplicant"]
description: "Saya jarang sekali menggunakan comprehensive network manager seperti NetworkManager atau ConnMan. Terhubung ke jaringan juga hanya lewat Wi-Fi. Maka saya putuskan untuk menghapus NetworkManager dan hanya menggunakan wpa_supplicant. Ternyata tidak semengerikan yang saya bayangkan. wpa_supplicant juga memiliki interaktif shell yang bernama wpa_cli. Sangat memudahkan untuk digunakan memanajemen jaringan konektifitas Wi-Fi di sistem kita."
---

# Latar Belakang Masalah

Saya baru menyadari kalau saya ternyata lebih sering menggunakan koneksi wireless ketimbang menggunakan kabel.

Artinya, NetworkManager yang saya pergunakan sebagai network manager yang memiliki banyak sekali fitur yang dapat memudahkan kita untuk mengkonfigurasi segala sesuatu tentang jaringan, hanya saya pergunakan salah satu sari sekian banyak fiturnya.

Hal ini mulai terasa kurang efisien buat saya.

Terlebih lagi, NetworkManager ini mungkin sebenarnya hanya layer tambahan yang digunakan untuk memudahkan dalam mengkonfigurasi wireless networking yang menggunakan **wpa_supplicant**.

Lantas, karena saya lebih banyak menggunakan wireless network ketimbang ethernet, maka saya memutuskan untuk hanya menggunkan **wpa_supplicant** dalam menghandle konektifitas dengan Wi-Fi.

Saya terinspirasi ketika berpindah dari Arch Linux ke Artix Linux.

Dan membaca Arch Wiki, pada bagian yang ini [**Network configuration/Wireless > Options**](https://wiki.archlinux.org/index.php/Network_configuration/Wireless#Utilities).

Pada Arch Wiki disebutkan,

> Just like other network interfaces, the wireless ones are controlled with ip from the [iproute2](https://archlinux.org/packages/?name=iproute2) package.
>
> Managing a wireless connection requires a basic set of tools.
>
> **Either use a [network manager](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers) or use one of the following directly**.

| Software | Package | WEXT | nl80211 | WEP | WPA/WPA2 | ArchISO |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| wireless_tools | wireless_tools | Yes | No | Yes | No | Yes |
| iw | iw | No | Yes | Yes | No | Yes |
| Wpa Supplicant | wpa_supplicant | Yes | Yes | Yes | Yes | Yes |
| iwd | iwd | No | Yes | No | Yes | Yes |

\***wireless_tools** sudah deprecated.


# Apa itu wap_supplicant

Secara sederhana wpa_supplicant adalah tools yang dapat kita pergunakan untuk meminta/me-request otentikasi ke jaringan. Awalan **wpa_** menandakan bahwa tools ini mendukung WPA. Tidak hanya WPA, tapi juga WEP dan WPA2.

**WPA2 itu apa, bang?**

Adalah kependekan dari **Wi-Fi Protected Access II**, adalah standar yang digunakan untuk menetapkan keamanan untuk jaringan wireless. WPA2 ini hadir untuk menggantikan WEP yang sudah deprecated (usang).

wpa_supplicant sangat cocok digunakan untuk desktop, laptop, maupun embedded system.

Yok, tanpa berlama-lama, langsung saja kita pasang.


# Instalasi

Pasang dulu paket **wpa_supplicant**.

```
$ sudo pacman -S wpa_supplicant
```

Kalau kita memasang paket ini, kita akan mendapatkan:

1. `wpa_supplicant` (main program)
2. `wpa_passphrase` (passphrase tool)
3. `wpa_cli` (front-end cli)

Kita juga dapat memasang package [**wpa_supplicant_gui**](https://aur.archlinux.org/packages/wpa_supplicant_gui/) `wpa_gui`, untuk yang lebih senang berinteraksi dengan aplikasi GUI.


# Konfigurasi


## Kenali Wireless Interface yang Digunakan

Pertama-tama, periksa dulu nama wireless interface yang teman-teman gunakan.

```
$ ip a s
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 00:16:d3:c4:fb:d2 brd ff:ff:ff:ff:ff:ff
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default
qlen 1000
    link/ether 08:11:96:00:00:00 brd ff:ff:ff:ff:ff:ff
```

Punya saya bernama `wlan0`.

> INFO
> 
> Kalau teman-teman ingin menggunakan **Traditional Network Interface Name** seperti `wlan0`, kalian dapat mengunjungi catatan saya [**Mengembalikan Nama Interface Menjadi Traditional Interface Name (eth0, wlan0, etc.)**](/blog/mengembalikan-nama-interface-ke-raditional-interface-name).
> 
> Tapi, **saya tidak merekomendasikan** yaa.

Selanjutnya, untuk terhubung dengan network yang ada, kita dapat menggunakan 2 cara.

1. Menggunakan `wpa_cli`
2. Menggunakan `wpa_passphrase`


## Menjalankan Service

Sebelum dapat menggunakan **wpa_supplicant**, kita perlu untuk menjalankan wpa_supplicant daemon terlebih dahulu.

Umumnya, menggunakan systemd service.

**systemd**

```
$ sudo systemctl start wpa_supplicant.service
```

**OpenRC**

```
$ sudo rc-service wpa_supplicant start
```

Atau, kita juga dapat menjalankan daemon secara langsung.

```
$ sudo wpa_supplicant -B -i <i>nama_interface</i> -c /etc/wpa_supplicant/wpa_supplicant.conf
```

`-B`, untuk *run daemon in the background*.

`-i`, untuk mendefinisikan nama interface.

`-c`, untuk mendefinisikan lokasi dari wpa_supplicant.conf.

Ganti *nama_interface* dengan yang teman-teman pergunakan.

Cara di atas, biasanya saya lakukan untuk debugging, apabila saya memiliki file konfigurasi selain file konfigurasi default.


## 1. Menggunakan wpa_cli

Terlebih dahulu kita harus menambahkan sedikit konfigurasi agar dapat menyimpan config dari wpa_cli.

```
$ sudoedit /etc/wpa_supplicant/wpa_supplicant.conf
```

```bash
!filename: /etc/wpa_supplicant/wpa_supplicant.conf
ctrl_interface=/run/wpa_supplicant
update_config=1
```

Kalau sudah ada, tidak perlu diubah-ubah.

Selanjutnya, kita akan gunakan **wpa_cli**.

```
$ sudo wpa_cli
```

```
wpa_cli v2.9
Copyright (c) 2004-2019, Jouni Malinen <j@w1.fi> and contributors

This software may be distributed under the terms of the BSD license.
See README for more details.

Selected interface 'wlan0'

Interactive mode

> _
```

Di dalam shell ini, kita dapat memanfaatkan auto completion untuk perintah-perintah yang tersedia menggunakan tombol <kbd>Tab</kbd>.


### Bantuan

Seperti biasa, untuk melihat ketersediaan command yang ada, kita dapat menggunakan.

```
> help
```


### Scanning

Untuk melakukan pencarian nama network yang ada di sekitar kita.

```
> scan
```

```
OK
<3>CTRL-EVENT-SCAN-STARTED
<3>CTRL-EVENT-SCAN-RESULTS
<3>WPS-AP-AVAILABLE
```


### Melihat Hasil Scan

Untuk melihat hasil yang telah di-scan.

```
> scan_results
```

```
bssid / frequency / signal level / flags / ssid
00:67:62:78:91:40       2462    -49     [WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]                      KIKEL
60:18:88:00:00:00       2432    -61     [WPA-PSK-CCMP][WPA2-PSK-CCMP][WPS][ESS]                 bandithijo
fc:a6:cd:be:d8:b0       2462    -88     [WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]                      SALSHA
e8:01:8d:ae:fb:00       2437    -86     [WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]                      SIHOMBING
88:c3:97:6d:44:37       2462    -89     [WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][WPS][ESS]       SURYA
```


### Mendaftarkan Network

Saya ingin mendaftarkan network baru degan SSID bernama **bandithijo**.

Namun, kita perlu mengambil nomor index --ibarat nomor antrian.

```
> add_network
```

```
0
```

Nah, berarti saya akan menggunakan index ke-**0** untuk mendaftarkan network ini.

Selanjutnya, kita akan mengeset credential untuk network tersebut.

```
> set_network 0 ssid "bandithijo"
```

```
OK
```

```
> set_network 0 psk "passwordinirahasiasekali"
```

```
OK
```

> INFO
> 
> Kalau SSID nya tanpa password, kalian dapat menggantinya dengan:
> 
> ```
> > set_network 0 ssid "bandithijo"
> > set_network 0 key_mgmt NONE
> ```

> INFO
> 
> Kalau terjadi kesalahan input, tinggal jalankan perintah yang sama dengan nilai yang benar.


### Melihat Daftar Network yang Tersimpan

Untuk melihat daftar network yang pernah didaftarkan, gunakan perintah:

```
> list_networks
```

```
network id / ssid / bssid / flags
0       bandithijo      any     [TEMP-DISABLED]
```


### Untuk Terhubung dengan Network

Dapat dilihat, pada network index ke-0, saya telah berhasil menyimpan konfigurasi untuk network **bandithijo**.

Untuk terkoneksi dengan network tersebut, kita gunakan perintah:

```
> select_network 0
```

```
OK
```

atau

```
> enable_network 0
```

```
OK
```

Kalau berhasil, outputnya akan seperti ini.

```
<3>CTRL-EVENT-SSID-REENABLED id=0 ssid="bandithijo"
<3>CTRL-EVENT-SCAN-STARTED
<3>CTRL-EVENT-SCAN-RESULTS
<3>WPS-AP-AVAILABLE
<3>SME: Trying to authenticate with 60:18:88:00:00:00 (SSID='bandithijo' freq=2432 MHz)
<3>Trying to associate with 60:18:88:00:00:00 (SSID='bandithijo' freq=2432 MHz)
<3>Associated with 60:18:88:00:00:00
<3>CTRL-EVENT-SUBNET-STATUS-UPDATE status=0
<3>WPA: Key negotiation completed with 60:18:88:00:00:00 [PTK=CCMP GTK=CCMP]
<3>CTRL-EVENT-CONNECTED - Connection to 60:18:88:00:00:00 completed [id=0 id_str=]
<3>CTRL-EVENT-REGDOM-CHANGE init=CORE type=WORLD
```

Mantap, coba test `$ ip a s`, untuk melihat apakah wireless interface yang kita gunakan telah mendapatkan IP address atau belum. Seharusnya pada tahap ini, sudah mendapatkan IP address.

Kalau sudah, laukan test koneksi dengan `ping`.


### Simpan Hasil Konfigurasi

Sebelum keluar, jangan lupa untuk menyimpan hasil konfigurasi.

```
> save_config
```

```
OK
```


### Keluar dari wpa_cli

Untuk keluar, kita dapat menggunakan perintah.

```
> quit
```


### Disconnect

Untuk disconnect dari jaringan, masuk lagi ke **wpa_cli**, dan jalankan printah:

```
> disconnect
```

```
OK
<3>CTRL-EVENT-DISCONNECTED bssid=60:18:88:00:00:00 reason=3 locally_generated=1
<3>CTRL-EVENT-REGDOM-CHANGE init=CORE type=WORLD
```


## 2. Menggunakan wpa_passphrase

Metode ini dapat kita gunakan untuk terkoneksi secara cepat ke SSID apabila kita sudah tahu nama SSID dan passwordnya.

Sebenarnya `wpa_passphrase` ini digunakan untuk mengenerate konfigurasi minimal yang dapat kita gunakan ke konfigurasi wpa_supplicant.

```
$ wpa_passphrase bandithijo iniadalahpassword
```

```
network={
        ssid="bandithijo"
        #psk="iniadalahpassword"
        psk=de91478f405cc6685267c972844591e1adfde34e5e74c525c44b0b5e3e16a968
}
```

Kita bisa copy dan masukkan ke dalam **/etc/wpa_supplicant/wpa_supplicant.conf** untuk konfigurasi yang lebih persistent.

Atau dengan cara mengkombinasikan dengan perintah wpa_supplicant.

> PERHATIAN!
> 
> Pastikan **wpa_supplicant belum berjalan** di process maupun di service.

```
$ sudo wpa_supplicant -B -i interface -c <(wpa_passphrase MYSSID passphrase)
```

```
$ sudo wpa_supplicant -B -i wlan0 -c <(wpa_passphrase bandithijo iniadalahpassword)
```

> PERHATIAN!
> 
> Namun, karena proses substitusi, kita tidak dapat menjalankan proses ini dengan **sudo**.
> 
> ```
> Successfully initialized wpa_supplicant
> Failed to open config file '/dev/fd/63', error: No such file or directory
> Failed to read or parse configuration '/dev/fd/63'
> ```
> 
> Kita perlu menggunakan **root shell**,
> 
> ```
> $ sudo su
> ```
> 
> ```
> $ wpa_supplicant -B -i wlan0 -c <(wpa_passphrase bandithijo iniadalahpassword)
> ```
> 
> ```
> Successfully initialized wpa_supplicant
> ```

Nah, mantap!

Sekarang seharusnya wireless interface sudah mendapatkan IP address.

```
$ ip a s wlan0
```

```
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 08:11:96:00:00:00 brd ff:ff:ff:ff:ff:ff
 👉️ inet 192.168.1.7/24 brd 192.168.1.255 scope global dynamic noprefixroute wlan0
       valid_lft 86006sec preferred_lft 75206sec
    inet6 fe80::9373:975b:0000:0000/64 scope link
       valid_lft forever preferred_lft forever
```

Nah, dapat dilihat, saya sudah mendapatkan IP address.

> INFO
> 
> Saya menggunakan **dhcpcd** service.

Sekarang coba tes koneksi internet dengan ping.

```
$ ping archlinux.org
```

```
PING archlinux.org (95.217.163.246) 56(84) bytes of data.
64 bytes from archlinux.org (95.217.163.246): icmp_seq=1 ttl=52 time=226 ms
64 bytes from archlinux.org (95.217.163.246): icmp_seq=2 ttl=52 time=215 ms
64 bytes from archlinux.org (95.217.163.246): icmp_seq=3 ttl=52 time=246 ms

--- archlinux.org ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 215.292/228.954/245.752/12.631 ms
```

Mantap! Kita telah berhasil terhubung ke internet.


# Penggunaan yang Lebih Advanced

Untuk konfigurasi dan penggunaan yang lebih advanced, teman-teman dapat membaca sendiri di Arch Wiki.

[**wpa_supplicant: Advanced usage**](https://wiki.archlinux.org/index.php/Wpa_supplicant#Advanced_usage).


# Tambahan


## Bagaimana Saya Menggunakan wpa_supplicant?

Kalau saya, karena tidak banyak berpindah2 tempat, saya memilih menggunakan service untuk menjalankan **wpa_supplicant**.

Saat ini saya sudah menggunakan **OpenRC**. Secara default, service akan membaca file `/etc/wpa_supplicant/wpa_supplicant.conf`.

Namun, saya ingin lebih fleksible, saya buat file **wpa_supplicant.conf** ini menjadi symbolic link dari beberapa file configurasi yang tergantung dari tempat.

1. Rumah
2. Kantor

Misal seperti ini

```
📂 /etc/wpa_supplicant
├── 📄 wpa_cli.sh
├── 📄 wpa_supplicant.conf -> wpa_supplicant-home.conf
├── 📄 wpa_supplicant-home.conf
└── 📄 wpa_supplicant-office.conf
```

Dapat dilihat, saat ini saya sedang menggunakan Wi-Fi di rumah, maka saya menghubungkan symbolic link konfigurasi `-home.conf` dengan `wpa_supplicant.conf`.

Isi dari file **wpa_supplicant-home.conf** maupun **wpa_supplicant-office.conf**, kira-kira seperti ini:

```bash
!filename: /etc/wpa_supplicant/wpa_supplicant-home.conf
ctrl_interface=/run/wpa_supplicant
update_config=1

network={
  ssid="bandithijo"
  #psk="iniadalahpassword"
  psk=de91478f405cc6685267c972844591e1adfde34e5e74c525c44b0b5e3e16a968
}
```

Hanya berbeda di SSD dan passphrase.

Untuk berganti-ganti symbolic link, saya mengunakan cara seperti ini:

**Home**

```
$ sudo ln -sf /etc/wpa_supplicant/wpa_supplicant-home.conf /etc/wpa_supplicant/wpa_supplicant.conf
```

**Office**

```
$ sudo ln -sf /etc/wpa_supplicant/wpa_supplicant-office.conf /etc/wpa_supplicant/wpa_supplicant.conf
```

Setelah file konfigurasi siap, tinggal jalankan service dari **wpa_supplicant**.

Misal, pada **OpenRC**.

Tambahkan ke dalam service default yang akan dijalankan ketika sistem startup.

\* Tidak perlu menggunakan **default** juga bisa.

```
$ sudo rc-update add wpa_supplicant default
```

```
* service wpa_supplicant added to runlevel default
```

Lihat, apakah sudah masuk daftar status list.

```
$ rc-status --all
```

```
Runlevel: default
 cronie                                                                [  started  ]
 wpa_supplicant 👈️                                                     [  stopped  ] 👈️
 dhcpcd                                                                [  started  ]
 alsasound                                                             [  started  ]
 dbus                                                                  [  started  ]
```

Tinggal di-start saja.

```
$ sudo rc-service wpa_supplicant start
```

```
wpa_supplicant    | * Starting WPA Supplicant Daemon ...
wpa_supplicant    |Successfully initialized wpa_supplicant                    [ ok ]
```

Mantap, sekarang seharusnya kita sudah dapat terhubung dengan jaringan.

Untuk systemd, mohon maaf saya belum sempat mencoba menggunakan systemd. Kemungkin hanya perlu menjalankan service dari wpa_supplicant.service seperti biasa. Silahkan merujuk ke Arch Wiki.


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [wiki.archlinux.org/index.php/Wpa_supplicant](https://wiki.archlinux.org/index.php/Wpa_supplicant) \
   Diakses tanggal: 2020-12-31

1. [wiki.archlinux.org/index.php/Network_configuration/Wireless#Utilities](https://wiki.archlinux.org/index.php/Network_configuration/Wireless#Utilities) \
   Diakses tanggal: 2020-12-31
