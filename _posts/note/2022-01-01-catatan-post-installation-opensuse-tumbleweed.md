---
layout: 'post'
title: "Catatan Post Installation openSUSE Tumbleweed"
date: 2022-01-01 05:50
permalink: '/note/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'note'
tags: ['Tips', 'openSUSE']
wip: true
pin:
contributors: []
description: "Catatan ini merupakan kumpulan packages dan beberapa konfigurasi yang saya lakukan setelah melakukan proses instalasi openSUSE Tumbleweed."
---

# Prakata

Catatan ini merupakan kumpulan packages dan beberapa konfigurasi yang saya lakukan setelah melakukan proses instalasi openSUSE Tumbleweed.

Saya memutuskan untuk mengkategorikan catatan ini sebagai "note" dan bukan sebagai "blog" karena kemungkinan saya akan terus memperbaharui isinya seiring dengan berjalannya waktu pemakaian apabila saya menemukan paket-paket yang menarik.

Selain itu, memiliki sebuah catatan "perjalanan" akan **menumbuhkan rasa percaya diri untuk terus maju ke depan**. Maksud saya, apabila terjadi kegagalan karena satu dan lain hal, kita tidak segan untuk memulai lagi dari awal. Ataupun, kita dapat dengan mudah memulai percabangan untuk awal baru yang lain.

# NaN Things I Must Do

## Updating system

Lakukan refresh repositories,

{% shell_user %}
sudo zypper ref
{% endshell_user %}

**ref**, adalah *shorthand* dari **refresh**.

Kemudian, lakukan update,

{% shell_user %}
sudo zypper up
{% endshell_user %}

**up**, adalah *shorthand* dari **update**.

## Add additional package repositories (Packman)

Sumber: [https://en.opensuse.org/Additional_package_repositories](https://en.opensuse.org/Additional_package_repositories){:target="_blank"}

Packman merupakan repositori eksternal terbesar. Packman menawarkan berbagai macam paket-paket tambahan untuk openSUSE, khususnya tapi tidak terbatas hanya pada aplikasi yang berkaitan dengan multimedia dan library-library yang [di-"blacklist" di openSUSE Build Service](https://en.opensuse.org/openSUSE:Build_Service_application_blacklist){:target="_blank"}.

Packman terdiri dari 4 jenis repositori:

1. [**Essentials**](https://pmbs.links2linux.de/project/show/Essentials){:target="_blank"}, menyediakan codecs dan audio dan video player applications, untuk memenuhi kebutuhan yang paling penting
2. [**Multimedia**](https://pmbs.links2linux.de/project/show/Multimedia){:target="_blank"}, berisikan lebih banyak lagi aplikasi yang berkaitan dengan multimedia
3. [**Extra**](https://pmbs.links2linux.de/project/show/Extra){:target="_blank"}, berisikan tambahan aplikasi yang tidak berkaitan dengan multimedia, kebanyakan berkaitan dengan networking
4. [**Games**](https://pmbs.links2linux.de/project/show/Games){:target="_blank"}, berisikan aplikasi-aplikasi permainan

\
Keempat repositori di atas dapat kita tambahkan semuanya atau kita pilih-pilih yang mana yang mau kita tambahkan ke dalam sistem kita.

**All of Packman**:

{% shell_user %}
sudo zypper ar -cfp 90 https://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Tumbleweed/ packman
{% endshell_user %}

atau,

**Only Essentials Repository**:

{% shell_user %}
sudo zypper ar -cfp 90 https://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Tumbleweed/Essentials packman-essentials
{% endshell_user %}

\
Setelah menambahkan Packman repository, pastikan untuk mengganti paket official yang terpasang di sistem dengan paket yang ada di daftar Packman repository, karena campuran keduanya dapat menyebabkan berbagai masalah.

Kita dapat mengautomatisasi proses penggantian tersebut dengan perintah,

**All of Packman**:

{% shell_user %}
sudo zypper dup --from packman --allow-vendor-change
{% endshell_user %}

atau,

**Only Packman-Essentials**:

{% shell_term $ %}
sudo zypper dup --from packman-essentials --allow-vendor-change
{% endshell_term %}

# NaN Packages That I Need

## make

Repository: Main Repository (OSS)

Summary : GNU make

Description: The GNU make command with extensive documentation.

{% shell_user %}
sudo zypper in make
{% endshell_user %}

## cmake

Repository: Main Repository (OSS)

Summary: Cross-platform make system

Description: CMake is a cross-platform build system.

{% shell_user %}
sudo zypper in cmake
{% endshell_user %}

## gcc-c++

Repository: Main Repository (OSS)

Summary: The system GNU C++ Compiler

Description: The system GNU C++ Compiler.

{% shell_user %}
sudo zypper in gcc-c++
{% endshell_user %}

## luajit-devel

Repository: Main Repository (OSS)

Summary: Devel files for luajit

Description: Devel files for luajit package

{% shell_user %}
sudo zypper in luajit-devel
{% endshell_user %}

## libX11-devel

{% shell_user %}
sudo zypper in libX11-devel
{% endshell_user %}

## git-core

Repository: Main Repository (OSS)

Summary: Core git tools

Description: Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals. These are the core tools with minimal dependencies.

{% shell_user %}
sudo zypper in git-core
{% endshell_user %}

## git-credential-libsecret

{% shell_user %}
sudo zypper in git-credential-libsecret
{% endshell_user %}

Edit file `$HOME/.gitconfig`.

{% highlight_caption $HOME/.gitconfig %}
{% highlight shell linenos %}
...

[credential]
	helper = /usr/libexec/git/git-credential-libsecret
{% endhighlight %}

## tig

{% shell_user %}
sudo zypper in tig
{% endshell_user %}

## systemd-zram-service

Sumber: [https://build.opensuse.org/package/show/openSUSE%3AFactory/systemd-zram-service](https://build.opensuse.org/package/show/openSUSE%3AFactory/systemd-zram-service)

{% shell_user %}
sudo zypper in systemd-zram-service
{% endshell_user %}

## neofetch

Repository: Main Repository (OSS)

Summary: CLI system information tool written in BASH

Description: Displays information about the system next to an image, the OS logo, or any ASCII file of choice. The main purpose of Neofetch is to be used in screenshots to show other users what OS/Distro is running, what Theme/Icons are being used, etc.

{% shell_user %}
sudo zypper in neofetch
{% endshell_user %}

## htop

Repository: Main Repository (OSS)

Summary: An Interactive text-mode Process Viewer for Linux

Description: htop is an interactive text-mode process viewer for Linux. It aims to be a better 'top' and requires ncurses.

{% shell_user %}
sudo zypper in htop
{% endshell_user %}

## iftop

{% shell_user %}
sudo zypper in iftop
{% endshell_user %}

## nmap

{% shell_user %}
sudo zypper in nmap
{% endshell_user %}

## nmon

{% shell_user %}
sudo zypper in nmon
{% endshell_user %}

## wavemon

{% shell_user %}
sudo zypper in wavemon
{% endshell_user %}

## nethogs

{% shell_user %}
sudo zypper in nethogs
{% endshell_user %}

## glances

{% shell_user %}
sudo zypper in glances
{% endshell_user %}

## zenity

{% shell_user %}
sudo zypper in zenity
{% endshell_user %}

## vizex

{% shell_user %}
pip install --user vizex
{% endshell_user %}

## sensors (lm_sensors)

{% shell_user %}
sudo zypper in sensors
{% endshell_user %}

## soundconverter

{% shell_user %}
sudo zypper in soundconverter
{% endshell_user %}

## audaciy

{% shell_user %}
sudo zypper in audacity
{% endshell_user %}

## audacious

{% shell_user %}
sudo zypper in audacious
{% endshell_user %}

## telegram-desktop

Repository: Main Repository (OSS)

Summary: Messaging application with a focus on speed and security

Description: Telegram is a non-profit cloud-based instant messaging service.  Users can send messages and exchange photos, videos, stickers, audio and files of any type.  Its client-side code is open-source software but the source code for recent versions is not always immediately published, whereas its server-side code is closed-source and proprietary.  The service also provides APIs to independent developers.

{% shell_user %}
sudo zypper in telegram-desktop
{% endshell_user %}

## password-store

Repository: Main Repository (OSS)

Summary: Utility to store, retrieve, generate and synchronize passwords

Description: With password-store, each password lives inside of a gpg encrypted file whose filename is the title of the website or resource that requires the password.  These encrypted files may be organized into meaningful folder hierarchies, copied from computer to computer, and, in general, manipulated using standard command line file management utilities.

{% shell_user %}
sudo zypper in password-store
{% endshell_user %}

## pwgen

{% shell_user %}
sudo zypper in pwgen
{% endshell_user %}

## hascat

{% shell_user %}
sudo zypper in hashcat
{% endshell_user %}

## arandr

{% shell_user %}
sudo zypper in arandr
{% endshell_user %}

## xcalib

{% shell_user %}
sudo zypper in xcalib
{% endshell_user %}

## google-chrome

Sumber: [https://linuxhint.com/install_google_chrome_opensuse/](https://linuxhint.com/install_google_chrome_opensuse/)

Repository: Google-Chrome

Summary: Google Chrome

Description: The web browser from Google Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.

Adding Google Chrome repo:

{% shell_user %}
sudo zypper ar http://dl.google.com/linux/chrome/rpm/stable/x86_64 Google-Chrome
{% endshell_user %}

Add Google public signing key:

{% shell_user %}
wget https://dl.google.com/linux/linux_signing_key.pub
sudo rpm --import linux_signing_key.pub
{% endshell_user %}

Update Zypper cache:

{% shell_user %}
sudo zypper ref -f
{% endshell_user %}

Installing Google Chrome:

{% shell_user %}
sudo zypper in google-chrome-stable
{% endshell_user %}

## neovim

Repository: Main Repository (OSS)

Summary: Vim-fork focused on extensibility and agility

Description: Neovim is a refactor - and sometimes redactor - in the tradition of Vim, which itself derives from Stevie. It is not a rewrite, but a continuation and extension of Vim. Many rewrites, clones, emulators and imitators exist; some are very clever, but none are Vim. Neovim strives to be a superset of Vim, notwithstanding some intentionally removed misfeatures; excepting those few and carefully-considered excisions, Neovim is Vim. It is built for users who want the good parts of Vim, without compromise, and more.

{% shell_user %}
sudo zypper in neovim
{% endshell_user %}

{% shell_user %}
sudo zypper in xsel
sudo zypper in xclip
sudo zypper in ctags
sudo zypper in nodejs
sudo zypper in python38-neovim
{% endshell_user %}

**manual built**

Deps,

{% shell_user %}
sudo zypper in make
sudo zypper in cmake
sudo zypper in automake
sudo zypper in autoconf
sudo zypper in ninja
sudo zypper in gcc-c++
sudo zypper in gettext-tools
sudo zypper in curl
sudo zypper in libtool
{% endshell_user %}

{% shell_user %}
git clone https://github.com/neovim/neovim.git
cd neovim
make CMAKE_BUILD_TYPE=RelWithDebInfo -j$(expr nproc + 1)
sudo make install
{% endshell_user %}

## tmux

Repository: Main Repository (OSS)

Summary: Terminal multiplexer

Description: tmux is a terminal multiplexer: it enables a number of terminals (or windows), each running a separate program, to be created, accessed, and controlled from a single screen. tmux may be detached from a screen and continue running in the background, then later reattached. tmux is intended to be a modern, BSD-licensed alternative to programs such as GNU screen.

{% shell_user %}
sudo zypper in tmux
{% endshell_user %}

## clipnotify

Deps,

{% shell_user %}
sudo zypper in libX11-devel
sudo zypper in libXfixes-devel
{% endshell_user %}

{% shell_user %}
git clone https://github.com/cdown/clipnotify.git
cd clipnotify
sudo make install
{% endshell_user %}

## ffmpeg

{% shell_user %}
sudo zypper in ffmpeg-4
{% endshell_user %}

## SimpleScreenRecorder

{% shell_user %}
sudo zypper in simplescreenrecorder
{% endshell_user %}

## flameshot

{% shell_user %}
sudo zypper in flameshot
{% endshell_user %}

## scrot

{% shell_user %}
sudo zypper in scrot
{% endshell_user %}

## maim

{% shell_user %}
sudo zypper in maim
{% endshell_user %}

## Qt5ct

{% shell_user %}
sudo zypper in qt5ct
{% endshell_user %}

## calibre

{% shell_user %}
sudo zypper in calibre
{% endshell_user %}

## rofi

{% shell_user %}
sudo zypper in rofi
{% endshell_user %}

## dmenu

{% shell_user %}
sudo zypper in dmenu
{% endshell_user %}

## jq

{% shell_user %}
sudo zypper in jq
{% endshell_user %}

## dnscrypt-proxy

Karena di openSUSE Tumbleweed belum secara default memasang paket **systemd-network** (networkd & resolved), maka saya lebih *prefer* menggunakan paket **openresolv** sebagai alternatif.

{% shell_user %}
sudo zypper in openresolv
{% endshell_user %}

Pasang dnscrypt-proxy:

{% shell_user %}
sudo zypper in dnscrypt-proxy
{% endshell_user %}

Edit file dnscrypt-proxy.toml

{% shell_user %}
sudo vim /etc/dnscrypt-proxy/dnscrypt-proxy.toml
{% endshell_user %}

Minimal edit 2 variabel yang diperlukan, yaitu: **server_names** dan **listen_addresses**.

{% highlight_caption /etc/dnscrypt-proxy/dnscrypt-proxy.toml %}
{% highlight conf linenos %}
server_names = ['cloudflare']
listen_addresses = []
{% endhighlight %}

\* **Info**: server_names bebas mau menggunakan server yang menyediakan service dnscrypt.

Kemudian, jalankan **dnscrypt-proxy.socket** (bukan **.service**).

{% shell_user %}
sudo systemctl enable --now dnscrypt-proxy.socket
{% endshell_user %}

Kemudian, konfigurasi NetworkManager agar dapat menggunakan openresolv.

Edit file,

```
$ sudo vim /etc/NetworkManager/NetworkManager.conf
```

Tambahkan baris `rc-manager=resolvconf` dan `dns=none`di dalam section `[main]`

{% highlight_caption /etc/NetworkManager/NetworkManager.conf %}
{% highlight shell linenos %}
[main]
dhcp=dhclient
plugins=keyfile
rc-manager=resolveconf
dns=none

[connectivity]
uri=http://conncheck.opensuse.org
{% endhighlight %}

Oke, urusan dengan NetworkManager selesai.

Selanjutnya configurasi networkconfig.

```
$ sudo vim /etc/sysconfig/network/config
```

Cari bagian `NETCONFIG_DNS_POLICY="auto"`, kosongin aja valuenya.

{% highlight_caption /etc/sysconfig/network/config %}
{% highlight shell linenos %}
## Type:        string
## Default:     "auto"
#
# Defines the DNS merge policy as documented in netconfig(8) manual page.
# Set to "" to disable DNS configuration.
#
NETCONFIG_DNS_POLICY=""
{% endhighlight %}

Selanjutnya, konfigurasi openresolv.

Edit file **/etc/resolvconf.conf**.

```
$ sudo vim /etc/resolvconf.conf
```

Uncomment bagian **name_servers=127.0.0.1**.

{% highlight_caption /etc/resolvconf.conf %}
{% highlight shell linenos %}
# Configuration for resolvconf(8)
# See resolvconf.conf(5) for details

resolv_conf=/etc/resolv.conf
# If you run a local name server, you should uncomment the below line and
# configure your subscribers configuration files below.
name_servers=127.0.0.1
{% endhighlight %}

Selanjutnya, restart NetworkManager.

{% shell_user %}
sudo systemctl restart NetworkManager.service
{% endshell_user %}

Cek, apakah file **/etc/resolv.conf** sudah berubah isinya menjadi `nameserver 127.0.0.1`.

Atau, kalau belum jalankan perintah di bawah ini,

{% shell_user %}
sudo resolvconf -u
{% endshell_user %}

Selesai.

## pavucontrol

{% shell_user %}
sudo zypper in pavucontrol
{% endshell_user %}

## pulsemixer

{% shell_user %}
pip install --user pulsemixer
{% endshell_user %}

## MozillaThunderbird

{% shell_user %}
sudo zypper in MozillaThunderbird
{% endshell_user %}

## gparted

{% shell_user %}
sudo zypper in gparted
{% endshell_user %}

## barrier

{% shell_user %}
sudo zypper in barrier
{% endshell_user %}

## go

{% shell_user %}
sudo zypper in go
{% endshell_user %}

## lazygit

Source: [https://github.com/jesseduffield/lazygit](https://github.com/jesseduffield/lazygit)

{% shell_user %}
go get github.com/jesseduffield/lazygit
{% endshell_user %}

## lazydocker

Source: [https://github.com/jesseduffield/lazydocker](https://github.com/jesseduffield/lazydocker)

{% shell_user %}
go get github.com/jesseduffield/lazydocker
{% endshell_user %}

## docker

{% shell_user %}
sudo zypper in docker
{% endshell_user %}

Masukkan **docker** ke dalam groups user yang digunakan.

{% shell_user %}
sudo gpasswd -a ${USER} docker
{% endshell_user %}

## freecad

{% shell_user %}
sudo zypper in freecad
{% endshell_user %}

## blender

{% shell_user %}
sudo zypper in blender
{% endshell_user %}

## transmission-daemon

{% shell_user %}
sudo zypper in transmission-daemon
{% endshell_user %}

## youtube-dl

{% shell_user %}
sudo zypper in youtube-dl
{% endshell_user %}

## yt-dlp

{% shell_user %}
sudo zypper in yt-dlp
pip install --user yt_dlp
{% endshell_user %}

## newsboat

{% shell_user %}
sudo zypper in newsboat
{% endshell_user %}

## ranger

{% shell_user %}
sudo zypper in ranger
{% endshell_user %}

{% shell_user %}
sudo zypper in python3-devel
sudo zypper in libX11-devel
sudo zypper in libXext-devel
pip install --user ueberzug
{% endshell_user %}

{% shell_user %}
pip zypper in mediainfo
pip zypper in highlight
pip zypper in atool
pip zypper in bsdtar
pip zypper in unrar
pip zypper in p7zip
pip zypper in odt2txt
{% endshell_user %}

## tor

{% shell_user %}
sudo zypper in tor
{% endshell_user %}

## handbrake-gtk

{% shell_user %}
sudo zypper in handbrake-gtk
{% endshell_user %}

## mpv

{% shell_user %}
sudo zypper in mpv
{% endshell_user %}

## celluloid

{% shell_user %}
sudo zypper in celluloid
{% endshell_user %}

## nodejs

{% shell_user %}
sudo zypper in nodejs
{% endshell_user %}

## yarn

{% shell_user %}
npm i -g yarn
{% endshell_user %}

## Ruby on Rails Developer

{% shell_user %}
sudo zypper in libopenssl-devel
sudo zypper in libxml2-devel
{% endshell_user %}

{% shell_user %}
sudo zypper in postgresql-server-devel
{% endshell_user %}

## Flatpak via Flathub Remote

{% shell_user %}
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
{% endshell_user %}

## Spotify

{% shell_user %}
flatpak install flathub com.spotify.Client
{% endshell_user %}

## fontforge

{% shell_user %}
sudo zypper in fontforge
{% endshell_user %}

## tilix terminal emulator

{% shell_user %}
sudo zypper in tilix
{% endshell_user %}






{% comment %}
# Referensi

1. [](){:target="_blank"}
2. [](){:target="_blank"}
3. [](){:target="_blank"}
{% endcomment %}
