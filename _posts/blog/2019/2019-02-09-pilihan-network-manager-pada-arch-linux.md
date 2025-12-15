---
layout: "post"
title: "Comprehensive Network Manager yang Saya Pergunakan pada Arch Linux"
date: "2019-02-09 05:52"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-02-09-pilihan-network-manager-pada-arch-linux"
author: "BanditHijo"
category: "blog"
tags: ["network manager"]
description: "Terdapat banyak sekali tools yang dapat kita gunakan untuk mengatur jaringan di GNU/Linux. Perkakas-perkakas ini sering diistilahkan dengan Comprehensive Network Manager, atau Network Manager saja. Tapi jangan salah paham yaa, karena salah satu Network Manager tersebut ada yang bernama NetworkManager."
---

## Prakata

Sebagai pengguna Arch Linux, kita dibebaskan untuk memilih **Network Manager** yang akan kita gunakan untuk menghandle jaringan (*networking*).

Kegunaan dari Network Manager ini adalah untuk memfasilitasi kita mengelola pengaturan koneksi jaringan melalui profil jaringan agar kita dapat dengan mudah melakukan perpindahan antar jaringan.

| Network manager | GUI | Archiso | <center>CLI tools</center> | PPP support (3G modem) | DHCP client | <center>Systemd units</center> |
| :--: | :--: | :--: | :-- | :--: | :--: | :-- |
| ConnMan | unofficial | No | connmanctl | Yes | internal | `connman.service` |
| netctl | unofficial | Yes (base) | netctl, wifi-menu | Yes | dhcpcd, dhclient | `netctl-ifplug@interface.service`, `netctl-auto@interface.service` |
| NetworkManager | Yes | No | nmcli, nmtui | Yes | internal, dhcpcd, dhclient | `NetworkManager.service` |
| systemd-networkd | No | Yes | networkctl | No | internal | `systemd-networkd.service`, `systemd-resolved.service` |
| Wicd | Yes | No | wicd-cli, wicd-curses | No | dhcpcd | `wicd.service` |

Sumber: [Arch Wiki/Network Configuration](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers)

Apabila kita melakukan instalasi Arch Linux dengan Archiso, biasanya yang paling populer untuk terkoneksi dengan jaringan wireless adalah `wifi-menu`, paket ini merupakah paket yang dibawa secara *default* oleh `netctl` yang merupakan salah satu Network Manger yang sudah ada di dalam Archiso, selain `systemd-network`.

Namun, apabila wireless card kita ternyata belum terdeteksi, kita masih dapat menggunakan `netctl` juga yang sudah membawa `dhcpcd` untuk menghandle konektifitas via *usb-tethering smartphone*.

Untuk catatan kali ini, saya hanya akan mendokumentasikan mengenai **NetworkManager**, karena ini yang saya pergunakan.

Saya juga merekomendasikan untuk teman-teman yang baru menggunakan Arch Linux atau yang ingin praktis dan simpel seperti saya, NetworkManager adalah pilihan yang mudah.


## Instalasi

Proses pemasangan paket `networkmanager` juga sangat mudah.

```
$ sudo pacman -S networkmanager
```

Secara *default* paket ini sudah membawa daemon untuk services, aplikasi CLI yaitu `nmcli` dan aplikasi TUI `nmtui`.

Atau dapat pula menambahkan paket untuk GUI.

```
$ sudo pacman -S nm-connection-editor
```

Namun, apabila paket ini sudah terdapat dalam proses pemasangan paket `networkmanager`, tidak perlu lagi kita instal kembali.

Untuk yang ingin menggunakan trayicon dapat menambahkan paket `network-manager-applet`.

```
$ sudo pacman -S Network-manager-applet
```

Setelah memasang paket `networkmanager` jangan lupa untuk mengaktifkan daemon services dari Network Manager.

```
$ sudo systemctl enable NetworkManager.service
$ sudo systemctl start NetworkManager.service
```

Perhatikan huruf besar dan kecilnya!


## Konfigurasi

Sejujurnya saya bingung apa yang harus dikonfigurasi, karena semua sudah dihandle oleh NetworkManager.

Kita hanya perlu memasukkan profil jaringan seperti SSID, dll.


## Paket Tambahan

Ada beberapa paket tambahan yang saya pergunakan, Seperti

1. Modem Support:
   - [`modemmanager`](https://www.archlinux.org/packages/?name=modemmanager)
   - [`mobile-broadband-provider-info`](https://www.archlinux.org/packages/?name=mobile-broadband-provider-info)
   - [`usb_modeswitch`](https://www.archlinux.org/packages/?name=usb_modeswitch)

2. VPN Support:
   - [`networkmanager-openvpn`](https://www.archlinux.org/packages/?name=networkmanager-openvpn)
   - [`networkmanager-pptp`](https://www.archlinux.org/packages/?name=networkmanager-pptp)
   - dan masih banyak lagi, silahkan lihat di [Arch Wiki](https://wiki.archlinux.org/index.php/NetworkManager#VPN_support)


## Tampilan


### GUI

Berikut ini adalah beberapa tampilan NetworkManager menggunakan GUI.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. nm-applet

![Gambar 2]({{ page.assets }}/gambar-02.png)

Gambar 2. nm-connection-editor


### TUI

Untuk saat ini, saya lebih sering menggunakan TUI, dan tidak menggunakan kedua paket di atas untuk memilih network profile.

Fungsinya sama saja, hanya berbeda tampilan.

![Gambar 3]({{ page.assets }}/gambar-03.png)

Gambar 3. nmtui, bagian depan

![Gambar 4]({{ page.assets }}/gambar-04.png)

Gambar 4. nmtui, bagian Edit connection

![Gambar 5]({{ page.assets }}/gambar-05.png)

Gambar 5. nmtui, bagian Activate a connection

![Gambar 6]({{ page.assets }}/gambar-06.png)

Gambar 6. nmtui, bagian Set system hostname

Sejak menggunakan `nmtui`, saya tidak memerlukan lagi `nm-applet`. Sehingga membuat saya terbebas dari menggunakan trayicon.


### Memanfaatkan Rofi untuk Interface NetworkManager

Saya tidak menggunakan trayicon untuk memilih network dan memanggil Network Manager Settings. Saya lebih senang tidak menggunakan trayicon agar tampilan desktop tetap clean dan tidak terlalu banyak icon yang tidak konvergen dengan theme.

Sebelumnya, saya menggunakan aplikasi `nmtui` untuk melakukan konfigurasi jaringan, seperti: memilih-milih SSID. Namun, baru-baru saja saya menggunakan `networkmanager_dmenu`.

Untuk memanggilnya, saya menggunakan <kbd>SUPER</kbd>+<kbd>F8</kbd>.

```bash
!filename: $HOME/.config/sxhkd/sxhkdrc
# ...
# ...

# Network Manager Dmenu
bindsym $mod+F8 exec --no-startup-id networkmanager_dmenu
```

Aplikasi ini dapat kita gunakan untuk memilih-mili jaringan dan beberapa menu jaringan. Dapat menggunakan `dmenu` atau `rofi` sebagai frontend nya. Tentu saja saya memilih menggunakan `rofi` agar seragam dengan theme. Hehehe.

![Gambar 7]({{ page.assets }}/gambar-07.gif)

Gambar 7. Tampilan NetworkManager_dmenu dengan Rofi


## Pesan Penulis

Sekali waktu, apabila ada waktu luang, coba sempatkan untuk mencoba network manager yang lain juga.

Menggunakan Arch Linux memberikan kita kemudahan untuk membongkar-pasang berbagai macam aplikasi pendukung yang kita perlukan.

Beberapa waktu yang lalu, saya pun sempat mencoba **connman** dan **wicd**.

![Gambar 8]({{ page.assets }}/gambar-08.png)

Gambar 8. Tampilan GUI dari `connman-gtk`

![Gambar 9]({{ page.assets }}/gambar-09.png)

Gambar 9. Tampilan GUI dari `wicd-gtk`

Sebaik-baik dokumentasi adalah yang ditulis dan dikelola secara aktif oleh developer dari aplikasi yang bersangkutan.

Silahkan menggali informasi lebih jauh dan lebih luas pada daftar referensi yang saya sertakan.

Karena tulisan ini bukan ditujukan untuk membuat tandingan dari dokumentasi resmi yang sudah ada. Melainkan sebagai catatan dan ulasan berkaitan dengan aplikasi ini yang saya pergunakan sehari-hari.

Sepertinya ini saja yang dapat saya tulisakan. Mudah-mudahan dapat bermanfaat bagi teman-teman yang memerlukan.


## Referensi

1. [wiki.archlinux.org/index.php/Network_configuration#Network_managers](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers) \
   Diakses tanggal: 2019-02-09

1. [wiki.archlinux.org/index.php/NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) \
   Diakses tanggal: 2019-02-09
