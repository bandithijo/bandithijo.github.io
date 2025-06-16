---
layout: 'post'
title: "Berbagi WiFi Tethering dengan create_ap pada GNU/Linux"
date: '2019-12-22 09:51'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['create_ap']
pin:
hot:
contributors: []
description: "Fitur tethering Wi-Fi mungkin mudah didapatkan apabila menggunakan Desktop Environment tertentu. Karena biasanya sudah menyediakan menu untuk berbagi network dengan Wi-Fi. Namun, bagaimana apabila kita menggunakan Window Manager? comprehensive network manager seperti NetworkManager sejauh yang saya tahu, belum memiliki fitur ini, namun ConnMan sudah memiliki fitur Wi-F- tethering. Namun, jangan khawatir, sudah ada tools yang standalone yang dapat menyediakan layanan Wi-Fi tethering, yaitu create_ap."
---

# Prakata

Catatan ini juga sebagai ulasan dari script **create_ap**.

Seperti definisi singkat yang ditulis pada GitHub repo, create_ap adalah script yang dapat membuat NAT atau Bridge WiFi Access Point.

Bahasa awamnya WiFi Tethering, atau berbagi koneksi internet lewat WiFi. Nah.

Kira-kira seperti itu.


# Ulasan

Bagi pengguna GNU/Linux seperti saya yang hanya menggunakan Window Manager, script seperti ini sangat membantu dan nyaman digunakan. Karena tidak harus membuka aplikasi GUI.


## Fitur yang diberikan

Beberapa fitur yang diberikan oleh **create_ap** adalah:

1. Membuat Access Point (AP) pada channel mana saja
1. Dapat menggunakan salah satu dari enkripsi yang disediakan (WPA, WPA2, WPA/WPA2, Open (no encryption)
1. Menyembunyikan SSID
1. Menonaktifkan komunikasi antara client (client isolation)
1. Mendukung IEEE 802.11n dan 802.11ac
1. Internet sharing dengan metode: NATed, Bridged atau None (tidak ada internet sharing)
1. Memilih IP Gateway untuk AP (hanya dapat dilakukan pada NATed dan None)
1. Membuat Access Point (AP) dengan interface yang sama dengan koneksi internet yang kita gunakan.
1. Dapat membuat SSID dengan pipe atau dengan argument


## Dependensi

Paket-paket berikut ini perlu dipasang, agar dapat menggunakan **create_ap**.


### General

1. `bash`/`zsh`/dst.
1. `util-linux` (untuk getopt)
1. `procps` atau `procps-ng`
1. `hostapd`
1. `iproute2`
1. `iw`
1. `iwconfig` (kamu hanya memerlukan paket ini apabila `iw` tidak dapat mengenali adapter yang kita gunakan)
1. `haveged` (optional)


### Untuk NATed atau None

1. `dnsmasq`
1. `iptables`


## Instalasi


### Arch Linux

Beruntungnya saya menggunakan Arch Linux. Paket **create_ap** sudah terdapat pada official repo.

```
$ sudo pacman -S create_ap
```


### Distribusi lain

Untuk yang menggunakan distribusi lain, dapat membuild sendiri dari source.

```
$ git clone https://github.com/oblique/create_ap
$ cd create_ap
$ make install
```


## Penggunaan

Sekarang, coba saya jalankan dulu **create_ap**.

```
$ create_ap
```

```
Usage: create_ap [options] <wifi-interface> [<interface-with-internet>] [<access-point-name> [<passphrase>]]

Options:
  -h, --help              Show this help
  --version               Print version number
  -c <channel>            Channel number (default: 1)
  -w <WPA version>        Use 1 for WPA, use 2 for WPA2, use 1+2 for both (default: 1+2)
  -n                      Disable Internet sharing (if you use this, don't pass
                          the <interface-with-internet> argument)
  -m <method>             Method for Internet sharing.
                          Use: 'nat' for NAT (default)
                               'bridge' for bridging
                               'none' for no Internet sharing (equivalent to -n)
  --psk                   Use 64 hex digits pre-shared-key instead of passphrase
  --hidden                Make the Access Point hidden (do not broadcast the SSID)
  --mac-filter            Enable MAC address filtering
  --mac-filter-accept     Location of MAC address filter list (defaults to /etc/hostapd/hostapd.accept)
  --redirect-to-localhost If -n is set, redirect every web request to localhost (useful for public information networks)
  --hostapd-debug <level> With level between 1 and 2, passes arguments -d or -dd to hostapd for debugging.
  --isolate-clients       Disable communication between clients
  --ieee80211n            Enable IEEE 802.11n (HT)
  --ieee80211ac           Enable IEEE 802.11ac (VHT)
  --ht_capab <HT>         HT capabilities (default: [HT40+])
  --vht_capab <VHT>       VHT capabilities
  --country <code>        Set two-letter country code for regularity (example: US)
  --freq-band <GHz>       Set frequency band. Valid inputs: 2.4, 5 (default: 2.4)
  --driver                Choose your WiFi adapter driver (default: nl80211)
  --no-virt               Do not create virtual interface
  --no-haveged            Do not run 'haveged' automatically when needed
  --fix-unmanaged         If NetworkManager shows your interface as unmanaged after you
                          close create_ap, then use this option to switch your interface
                          back to managed
  --mac <MAC>             Set MAC address
  --dhcp-dns <IP1[,IP2]>  Set DNS returned by DHCP
  --daemon                Run create_ap in the background
  --stop <id>             Send stop command to an already running create_ap. For an <id>
                          you can put the PID of create_ap or the WiFi interface. You can
                          get them with --list-running
  --list-running          Show the create_ap processes that are already running
  --list-clients <id>     List the clients connected to create_ap instance associated with <id>.
                          For an <id> you can put the PID of create_ap or the WiFi interface.
                          If virtual WiFi interface was created, then use that one.
                          You can get them with --list-running
  --mkconfig <conf_file>  Store configs in conf_file
  --config <conf_file>    Load configs from conf_file

Non-Bridging Options:
  --no-dns                Disable dnsmasq DNS server
  -g <gateway>            IPv4 Gateway for the Access Point (default: 192.168.12.1)
  -d                      DNS server will take into account /etc/hosts

Useful informations:
  * If you're not using the --no-virt option, then you can create an AP with the same
    interface you are getting your Internet connection.
  * You can pass your SSID and password through pipe or through arguments (see examples).
  * On bridge method if the <interface-with-internet> is not a bridge interface, then
    a bridge interface is created automatically.

Examples:
  create_ap wlan0 eth0 MyAccessPoint MyPassPhrase
  echo -e 'MyAccessPoint\nMyPassPhrase' | create_ap wlan0 eth0
  create_ap wlan0 eth0 MyAccessPoint
  echo 'MyAccessPoint' | create_ap wlan0 eth0
  create_ap wlan0 wlan0 MyAccessPoint MyPassPhrase
  create_ap -n wlan0 MyAccessPoint MyPassPhrase
  create_ap -m bridge wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap -m bridge wlan0 br0 MyAccessPoint MyPassPhrase
  create_ap --driver rtl871xdrv wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap --daemon wlan0 eth0 MyAccessPoint MyPassPhrase
  create_ap --stop wlan0
```

Nah, kita dapat melihat, beberapa contoh yang disertakan.

Sangat mudah sekali penggunaannya.

Bentuk dari perintahnya akan seperti ini.

```
$ create_ap [options] &lt;wifi-interface> [&lt;interface-with-internet>] [&lt;access-point-name> [&lt;passphrase>]]
```


### Tanpa passphrase (open network)

```
$ create_ap wlan0 eth0 MyAccessPoint
```

Berarti, kita mendapatkan internet dari interface `eth0` dan akan kita sharing menggunakan interface `wlan0` dengan nama Access Point `MyAccessPoint`.

Mudah dimengerti kan?


### WPA + WPA2 passphrase

```
$ create_ap wlan0 eth0 MyAccessPoint MyPassPhrase
```


### Access Point tanpa internet

```
$ create_ap -n wlan0 MyAccessPoint MyPassPhrase
```


### Bridged internet sharing

```
$ create_ap -m bridge wlan0 eth0 MyAccessPoint MyPassPhrase
```


### Bridged Internet sharing (pre-configured bridge interface)

```
$ create_ap -m bridge wlan0 br0 MyAccessPoint MyPassPhrase
```


### Internet sharing sharing dari WiFi interface yang sama

Ini yang paling sering saya pergunakan.

```
$ create_ap wlan0 wlan0 MyAccessPoint MyPassPhrase
```


### Menggunakan WiFi adapter driver yang berbeda

```
$ create_ap --driver rtl871xdrv wlan0 eth0 MyAccessPoint MyPassPhrase
```


### Tanpa passphrase (open network) menggunakan pipe

Nah, ini adalah fitur yang dimention pada poin nomor 9 di atas.

```
$ echo -e "MyAccessPoint" | create_ap wlan0 eth0
```


### WPA + WPA2 passphrase menggunakan pipe

```
$ echo -e "MyAccessPoint\nMyPassPhrase" | create_ap wlan0 eth0
```


### Enable IEEE 802.11n

```
$ create_ap --ieee80211n --ht_capab '[HT40+]' wlan0 eth0 MyAccessPoint MyPassPhrase
```


### Client Isolation

Ini adalah contoh penggunaan fitur nomor 4 di atas.

```
$ create_ap --isolate-clients wlan0 eth0 MyAccessPoint MyPassPhrase
```


## Systemd Service

Kita juga dapat memanfaatkan systemd service untuk membuat konfigurasi yang persisten.


### Menjalankan service

```
$ sudo systemctl start create_ap
```


### Menjalankan service saat proses booting

```
$ sudo systemctl enable create_ap
```


# Troubleshooting


## ERROR: Failed to initialize lock

Apabila saat menjalankan `create_ap` muncul pesan seperti di atas, maka cukup hapus file `.lock` yang tersimpan pada direktori `/tmp`.

```
$ rm /tmp/create_ap.all.lock
```


# Pesan Penulis

Gimana?

Penggunaan script ini sangat mudah bukan?

Fitur yang disediakan juga cukup dapat meng-*cover* kebutuhan kita sehari-hari.

Apalagi saya yang hanya user biasa ini.

Untuk dokumentasi lebih lengkap dapat mengunjungi halaman GitHb repo dari **create_ap**.


# Referensi

1. [github.com/oblique/create_ap](https://github.com/oblique/create_ap)
<br>Diakses tanggal: 2019/12/22
