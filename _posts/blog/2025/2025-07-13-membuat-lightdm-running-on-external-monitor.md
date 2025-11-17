---
layout: "post"
title: "Membuat LightDM Berjalan pada External Monitor"
date: "2025-07-13 16:40"
permalink: "/blog/:title"
assets: "/assets/images/posts/2025/2025-07-13-membuat-lightdm-running-on-external-monitor"
author: "BanditHijo"
category: "blog"
tags: ["lightdm"]
description: "Setup laptop ThinkPad saya sekarang lebih banyak dalam keadaan lid-closed (layar tertutup). Secara default, LightDM akan ditampilkan pada primary monitor, karena laptop saya dalam keadaan tertutup, saya ingin menampilkannya pada external monitor. Sehingga lid akan tetap menutup ketika login."
---

# Problem

{{ page.description }}


# Solusi

Saya menggunakan *display manager* atau *session manager* seperti LightDM, yang masih mendukung Xorg. Xorg diperlukan karena saya akan menjalankan script yang berisi perintah Xrandr untuk memodifikasi *display output* antar monitor. Karena pada LightDM sendiri tidak terdapat pengaturan *display output*.

# Strategi

Saya membagi proses login menjadi dua tahap.

1. pre-login, adalah proses dimana LightDM akan ditampilkan.
2. post-login, adalah proses setelah login dan masuk ke desktop.


# Pre-login

Proses ini adalah proses dimana LightDM perlu dikonfigurasi untuk diarahkan mau dikeluarkan di external monitor.


## 1. Daftarkan script pada konfigurasi LightDM

Untuk mendaftarkan script pada LightDM, saya perlu mengubah isi dari `/etc/lightdm/lightdm.conf`.

Cari properti `display-setup-script=` pada section `[Seat:*]` dan isi valuenya dengan *path* dari script.

```bash
!filename: /etc/lightdm/lightdm.conf
...
...

[Seat:*]
...
...
display-setup-script=/etc/lightdm/display-setup.sh

...
...
```

Saya akan membuat script pada direktori `/etc/lightdm/` dengan nama `display-setup.sh`.


## 2. Pastikan nama interface output

Sebelum membuat script `display-setup.sh`, pastikan terlebih dahulu nama interface external monitor yang akan digunakan. Apakah mengandung simbol *dash* atau tidak? `HDMI-1` atau `HDMI1`.

Jalankan perintah berikut ini untuk mengetahui jumlah dan nama interface monitor.

```
$ xrandr --listmonitors
```

```
Monitors: 2
 0: +*eDP1 1920/280x1080/160+0+0  eDP1
 1: +HDMI2 1920/480x1080/260+0+0  HDMI2
```

Saya memiliki 2 buah monitor.

`eDP1` adalah interface display dari laptop saya.

`HDMI2` adalah interface display dari external monitor.

Setelah mengetahui nama interface dari external monitor, saatnya membuat script.


## 3. Buat script display-setup.sh

Masuk ke direktori `/etc/lightdm`.

```
$ cd /etc/lightdm
```

Buat file baru dengan nama `display-setup.sh`.

```
$ sudo touch display-setup.sh
```

Buat jadi executable.

```
$ sudo chmod +x display-setup.sh
```

Sekarang buka dan isi scriptnya akan seperti ini.

```bash
!filename: /etc/lightdm/display-setup.sh
#!/bin/bash

EXTERNAL=$(xrandr | grep " connected" | grep -E "DVI-I|HDMI|DisplayLink" | cut -d" " -f1 | head -n1)
if [ -n "$EXTERNAL" ]; then
    xrandr --output "$EXTERNAL" --primary --auto --output eDP1 --off
fi
```

Pada script di atas,

1. saya mendefinisikan variable `EXTERNAL` untuk external monitor yang mengandung kata "DVI-I", "HDMI", atau "DisplayLink".
2. jika `EXTERNAL` valuenya exist, maka jalankan `xrandr` *command* untuk membuat output `EXTERNAL` sebagai primary monitor dan mematikan output dari internal monitor.

Selesai.

Dengan begini, tidak perlu membuka lid laptop untuk login.


## Post Login

Proses ini adalah proses setelah login dan akan memasuki desktop. Saya perlu mengarahkan desktop agar menampilkan gambar pada external monitor.


## 1. Tambahkan command xrandr pada .xprofile

Pada LightDM command pada post-login akan dibaca dari `$HOME/.xprofile`. Maka dari itu, saya akan menambahkan command xrandr yang mengatur tampilan external monitor.

```bash
!filename: $HOME/.xprofile
...
...

# external monitor
EXTERNAL=$(xrandr | grep " connected" | grep -E "DVI-I|HDMI|DisplayLink" | cut -d" " -f1 | head -n1)
if [ -n "$EXTERNAL" ]; then
    sleep 5
    xrandr --output "$EXTERNAL" --primary --auto --output eDP1 --off
fi
```

Dengan begini, setelah login dari LightDM, ketika masuk desktop akan dibawa ke external monitor.

Selesai.


# Opsional: Cara mencegah jika laptop jatuh pada kondisi standby saat lid-closed pada waktu login

Jika lid-closed membuat sistem menjadi standby pada saat login, perlu juga dilakukan konfigurasi pada file `/etc/systemd/logind.conf`.

Rubah value dari properti `HandleLidSwitch` jadi `ignore`.

```bash
!filename: /etc/systemd/logind.conf
...
...

[Login]
...
...
HandleLidSwitch=ignore
```

Kemudian restart servicenya.

```
$ sudo systemctl restart systemd-logind
```

Selesai.
