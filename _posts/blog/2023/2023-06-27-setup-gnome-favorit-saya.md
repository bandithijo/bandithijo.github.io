---
layout: 'post'
title: "GNOME Desktop dan Setup Favorit Saya"
date: '2023-06-27 20:32'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['GNOME']
pin:
hot:
contributors: []
description: "GNOME memang terkenal Desktop Environment yang berat dan membutuhkan banyak resource. Namun, saya tidak bisa tidak suka dengan GNOME. Mungkin karena saya cukup lama dengan OSX yang menjadi rujukan UI/UX design dari GNOME, sehingga saya merasa cukup nyaman menggunakan GNOME. Di catatan kali ini, saya akan mencatat tips ketika saya menggunakan GNOME di Arch Linux."
---

# Pendahuluan

{{ page.description }}

# Prerequisite

## dconf

Pasang paket `dconf` dan `dconf-editor`

```
$ sudo pacman -S dconf dconf-editor
```

# Tips

## GDM (GNOME Display Manager (Login Manager))

### GDM: Login Screen Logo (Bottom Logo)

GDM di Arch Linux, tidak langsung menampilkan logo distribusi di bagian bawah dari GDM. Kita perlu melakukan setup manual.

Pindah ke direktori `/etc/dconf/db/`

```
$ cd /etc/dconf/db
```

Buat direktori baru dengan nama `gdm.d/`

```
$ sudo mkdir /etc/dconf/db/gdm.d
```

Buat file dengan nama `02-logo`

```
$ sudo touch /etc/dconf/db/gdm.d/02-logo
```

Isi dengan konfigurasi di bawah ini

```conf
!filename: /etc/dconf/db/gdm.d/02-logo
[org/gnome/login-screen]
logo='/usr/share/pixmaps/archlinux-logo-text-dark.svg'
```

> `/usr/share/pixmaps/archlinux-logo-text-dark.svg` sudah secara default disediakan oleh Arch Linux, tinggal digunakan saja.

### GDM: Cursor Theme & Size

Untuk mengganti cursor theme dan size pada GDM.

Buat file baru dengan nama `10-cursor-settings`

```
$ sudo touch /etc/dconf/db/gdm.d/10-cursor-settings
```

Isi dengan konfigurasi di bawah ini

```conf
!filename: /etc/dconf/db/gdm.d/10-cursor-settings
[org/gnome/desktop/interface]
cursor-theme='ComixCursors-White'
cursor-size=48
```

Pada variable `cursor-theme=`, isi dengan cursor theme yang kalian inginkan. Alamatnya harus berada di path global `/usr/share/icons/`.

Pada variable `cursor-size=`, isi dengan size yang tersedia dari cursor theme, umumnya antara: 16, 24, 36, 48. Saya menggunakan 48, karena saya menggunakan layar FHD (1920x1080).

## Gnome Desktop

### Disable Super+Num function on Dash

For disable Super+Number function on Dash,

```
$ for i in $(seq 1 9); do gsettings set org.gnome.shell.keybindings switch-to-application-${i} '[]'; done
```

### Setup cursor size on GNOME for Gtk apps

For check the current cursor size,

```
$ gsettings get org.gnome.desktop.interface cursor-size
```

The default is `24`.

Depending on the theme, sizes are 24, 32, 48, 64.

To change the cursor size,

```
$ gsettings set org.gnome.desktop.interface cursor-size 32
```

### Setup cursor size on GNOME for Qt apps

Just set the env `XCURSOR_SIZE=` before run the Qt apps, or define on local/global env file.

My local env variables are on `~/.profile` (some people keep it on `~/.bashrc` or `~/.bash_profile`).

```bash
!filename: ~/.profile
export XCURSOR_SIZE=36
```


## Extensions

### Dash to Dock: Disable Default Super App Key (Super+Num)

Secara default, kalau kita menekan <kbd>SUPER</kbd>+<kbd>Number</kbd>, maka app yang terdapat pada Dash pada index yang terpanggil, akan terbuka. Fitur ini sangat mengganggu bagi saya yang terbiasa menggunakan Window Manager (WM). Saya akan disable fitur ini.

Disable `dash-to-dock hot-keys` properties

```
$ gsettings set org.gnome.shell.extensions.dash-to-dock hot-keys false
```

Kemudian, disable `keybinding switch-to-application-${index}` properties, kita akan buat nilai array nya menjadi array kosong.

```
$ for i in $(seq 1 9); do gsettings set org.gnome.shell.keybindings switch-to-application-${i} '[]'; done
```


# Pesan Penulis

Terima kasih sudah mampir yaa.

# Referensi

1. [Arch Wiki: GDM > Login Screen Logo](https://wiki.archlinux.org/title/GDM#Login_screen_logo)
<br>Diakses tanggal: 2023/06/27

1. [Arch Wiki: GDM > Change Cursor Theme](https://wiki.archlinux.org/title/GDM#Changing_the_cursor_theme)
<br>Diakses tanggal: 2023/06/27

1. [Disable the default app key (super+num) functionality on Ubuntu 17.10 and later](https://askubuntu.com/a/1425621/777616)
<br>Diakses tanggal: 2023/06/27

1. [wiki.archlinux.org: _Cursor themes_](https://wiki.archlinux.org/title/Cursor_themes#GNOME)
<br>Diakses tanggal: 2023/10/07

1. [github.com/telegramdesktop/tdesktop: _Big cursor in GNOME Wayland #16920_](https://github.com/telegramdesktop/tdesktop/issues/16920#issuecomment-915085406)
<br>Diakses tanggal: 2023/10/07
