---
layout: "post"
title: "Menjalankan Distro Linux yang Lain dengan Distrobox di Fedora Linux"
date: "2022-01-21 17:41"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2022/2022-01-21-menjalankan-distro-linux-lain-dengan-distrobox-di-fedora-linux"
author: "BanditHijo"
category: "blog"
tags: ["distrobox", "container"]
description: "Dengan adanya teknologi container, untuk menggunakan distribusi lain langsung dari dalam Terminal Emulator distro yang kita gunakan tidak lagi rumit. Mudahnya seperti berpindah shell dengan SSH. Distrobox adalah tool yang akan menjembatani kita masuk ke dalam distribusi lain dalam bentuk container. Cara ini, dapat saya manfaatkan untuk memasang paket yang tidak tersedia di distro yang saya gunakan."
---

## Pendahuluan

Dengan adanya teknologi container, untuk menggunakan distribusi lain langsung dari dalam Terminal Emulator distro yang kita gunakan tidak lagi rumit.

Mudahnya seperti berpindah shell dengan SSH.

Distrobox adalah tool yang akan menjembatani kita masuk ke dalam distribusi lain dalam bentuk container. Cara ini, dapat saya manfaatkan untuk memasang paket yang tidak tersedia di distro yang saya gunakan.


## Sekilas tentang Distrobox

Project Distrobox digaungi oleh [**Lucas Di Maio (89luca89)**](https://github.com/89luca89/) seorang Computer Scientist yang tertarik dengan unix sistem, devops, machine learning dan cyber security dari Universitas of Rome, La Sapienza. [1]

Distrobox menggunakan **podman** atau **docker** untuk membantu kita dalam mempermudah proses membuat container menggunakan image container dari distribusi yang tersedia. Container yang dibuat bukan sembarang container. Namun, container yang dibuat dengan Distrobox akan memiliki integrasi yang baik dengan host sistem (distribusi yang kita gunakan). Seperti: sharing HOME direktori, external storage, external USB devices, and graphical apps (X11/Wayland), dan juga audio. [2]

Praktis dan tidak perlu konfigurasi tambahan. Cukup buat distro container yang diinginkan, cari aplikasi yang ingin dipasang, dan voila! aplikasi dapat dinikmati dari host sistem. Semudah dan sepraktis itu!


## Target

Objektif atau tujuan catatan ini adalah untuk mencoba memasang aplikasi-aplikasi Terminal & GUI yang tidak tersedia pada distribusi Fedora Linux.

Maka, untuk menyelesaikan objektif dari catatan ini, saya memilih menggunakan container Arch Linux. Untuk mempermudah saya dalam mendapatkan aplikasi yang saya inginkan. Sebagaimana yang ~~kita~~ saya tahu, Arch Linux memiliki koleksi paket yang cukup luas, mulai dari yang tersedia di official repo maupun resep-resep yang tersedia di AUR (Arch User Repository).

Beberapa dari aplikasi tersebut, antara lain:

1. [**Spotify**](https://aur.archlinux.org/packages/spotify/), A proprietary music streaming service
1. [**Beekeeper Studio**](https://aur.archlinux.org/packages/beekeeper-studio-bin/), Modern and easy to use SQL client for MySQL, Postgres, SQLite, SQL Server, and more
1. [**Figma Linux**](https://aur.archlinux.org/packages/figma-linux/), The collaborative interface design tool. Unofficial Figma desktop client for Linux
1. [**WhatsApp Nativevier**](https://aur.archlinux.org/packages/whatsapp-nativefier/), WhatsApp desktop built with nativefier (electron)


## Instalasi

Pada distribusi Fedora Linux, sudah terpasang **Podman**. Kita tinggal memasang **Distrobox**.

```
$ sudo dnf in distrobox
```


## Penggunaan

Distrobox menyediakan 6 perintah yang dapat kita gunakan.

1. `distrobox-create`, untuk membuat container
1. `distrobox-enter`, untuk masuk (mengakses) ke dalam container
1. `distrobox-list`, untuk daftar container yang ada (pernah dibuat)
1. `distrobox-rm`, untuk menghapus container yang ada (pernah dibuat)
1. `distrobox-init`, ini adalah *entrypoint* dari container (tidak ditujukan untuk digunakan secara manual)
1. `distrobox-export`, ini ditujukan untuk digunakan di dalam container, berguna untuk mengekspor apps dan service yang dipasang di dalam container ke host

<br>
Selain menggunakan *single command* seperti di atas, dapat pula menggunakan `distrobox COMMAND`. Misal,

```
$ distrobox-list
```

Akan memberikan hasil yang sama dengan,

```
$ distrobox list
```


### Membuat Container

Untuk membuat container, kita dapat menggunakan perintah `distrobox-create IMAGE`.


#### Tanpa nama image

Kalau digunakan tanpa parameter apapun,

```
$ distrobox-create
```

```
Image not found.
Do you want to pull the image now? [y/N]: y
Trying to pull registry.fedoraproject.org/fedora-toolbox:35...
```

Maka, image yang dipilihkan akan menggunakan **fedora-toolbox:35** dari **registry.fedoraproject.org**.


#### Dengan nama image

Apabila ingin menggunakan image lain, pada catatan ini saya menggunakan image Arch Linux Latest dari Docker Hub Registry.

```
$ distrobox-create --name arch-distrobox --image archlinux:latest
```

`--name`, digunakan untuk memberikan nama container. Bebas mau memberikan nama apa saja.

`--image`, digunakan untuk mendefinisikan image yang akan kita gunakan. Kalau image tersebut belum ada di local, maka akan di-download-kan dari registry.

> Untuk mengecek daftar images yang sudah pernah diunduh, dapat menggunakan perintah,
>
> ```
> $ podman images
> ```
>
> ```
> REPOSITORY                                 TAG         IMAGE ID      CREATED      SIZE
> docker.io/library/archlinux                latest      2a4e5b8e6c26  2 weeks ago  397 MB
> registry.fedoraproject.org/fedora-toolbox  35          40b181c70b73  4 weeks ago  573 MB
> ```


### Melihat daftar container

Untuk melihat daftar container yang sudah pernah dibuat, gunakan perintah,

```
$ distrobox-list
```

```
ID           | NAME                      | STATUS          | IMAGE
ba3ee7918d87 | arch-distrobox            | Created         | docker.io/library/archlinux:latest
59b59d5dcabc | fedora-toolbox-35         | Created         | registry.fedoraproject.org/fedora-toolbox:35
```


### Masuk ke dalam container

Untuk masuk ke dalam container, gunakan perintah,

```
$ distrobox-enter --name NAMA_IMAGE
```

`NAMA_IMAGE` didapatkan dari perintah `distrobox-list`.

Misal, saya ingin masuk ke dalam container bernama `arch-distrobox` yang sudah saya buat sebelumnya,

```
$ distrobox-enter --name arch-distrobox
```

```
Starting container arch-distrobox
run this command to follow along:
        podman --remote logs -f arch-distrobox
.
done!
[bandithijo@arch-distrobox ~]$ █
```

Perhatikan prompt shell bagian hostname sudah berubah dari `fedora-thinkpad` (Hostname sistem saya) menjadi `arch-distrobox` (Container name).

Artinya, saat ini saya sudah berhasil memasuki container dengan nama **arch-distrobox**.

Lakukan pengecekan dengan perintah,

```
$ echo $HOSTNAME
```

```
arch-distrobox.fedora-thinkpad
```

`arch-distrobox` adalah nama container yang saat ini sedang digunakan.

`fedora-thinkpad` adalah hostname system yang saya pergunakan.


### Konfigurasi Package Manager

Karena saya menggunakan Arch Linux, saya akan merubah beberapa konfigurasi default yang dibuat oleh Arch Linux image container.

Namun, sebelumnya pasang dulu text editor seperti `vim` atau `nano` untuk memudahkan mengedit file config, karena text editor tidak terpasang secara default di Arch Linux image container.

```
[bandithijo@arch-distrobox] sudo pacman -S vim
```

> Apabila terdapat warning atau pesan error seperti di bawah ini, dapat diabaikan saja.
>
> ```
> Failed to check for chroot() environment: Permission denied
>   Skipped: Current root is not booted.
> ```
>
> Karena, sebenarnya paket sudah terpasang.

Edit file konfigurasi pacman yang ada pada,

```
[bandithijo@arch-distrobox] sudo vim /etc/pacman.conf
```

```bash
# /etc/pacman.conf

# ...
#
# GENERAL OPTIONS
#
[options]
# ...

# Misc options
#UseSyslog
Color
#NoProgressBar
# We cannot check disk space from within a chroot environment
#CheckSpace
VerbosePkgLists
ParallelDownloads = 5

# ...
```

Saya meng-enable **Color** dan men-disable **NoProgressBar**.

Tujuannya agar tampilan pacman lebih berwarna dan juga terdapat progressbar agar proses unduhan paket dapat tervisualisasikan.



### Pasang Aplikasi

#### Aplikasi yang berjalan di Terminal

##### Case 1: neofetch

Saya akan coba pasang `neofetch`. Kebetulan **neofetch** tidak tersedia pada Arch Linux docker image yang kita pasang sebagai container.

```
[bandithijo@arch-distrobox] neofetch
```

```
bash: neofetch: command not found
```

Nah, artinya **neofetch** memang belum tersedia pada container Arch Linux yang kita gunakan.

Karena kita menggunakan Arch Linux, kita bisa melakukan pencarian terlebih dahulu, untuk paket **neofetch** apakah terdapat di official repositori, mungkin ada di **community** repo.


```
[bandithijo@arch-distrobox] sudo pacman -Ss neofetch
```

```
community/neofetch 7.1.0-2
    A CLI system information tool written in BASH that supports displaying images.
```

Oke, benar.

Tinggal dipasang saja,

```
[bandithijo@arch-distrobox] sudo pacman -S neofetch
```

Tunggu proses instalasi sampai selesai.

Setelah selesai, kita bisa menjalankan `neofetch`.

```
[bandithijo@arch-distrobox] neofetch
```

```
                   -`
                  .o+`
                 `ooo/
                `+oooo:                   Arch Linux x86_64
               `+oooooo:                  5.15.16-200.fc35.x86_64
               -+oooooo+:                 20F5S0W206 ThinkPad X260
             `/:-:++oooo+:                Intel i5-6300U (4)
            `/++++/+++++++:               Intel Skylake GT2 [HD Graphics 520]
           `/++++++++++++++:              1366x768
          `/+++ooooooooooooo/`            2477MiB / 7795MiB
         ./ooosssso++osssssso+`           2 hours, 40 mins
        .oossssso-````/ossssss+`          dwm
       -osssssso.      :ssssssso.         en_US.UTF-8
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   `/ossssso+/:-        -:/+osssso+-
  `+sso+:-`                 `.-/+oso:
 `++:.                           `-/+/
 .`                                 `/

[bandithijo@arch-distrobox ~]$ █
```

![Gambar 1]({{ page.assets | absolute_url }}/gambar-01.png)

Gambar 1. Shell default host system (kiri) & Shell pada arch-distrobox container (kanan)


##### Case 2: gping

```
community/gping 1.2.7-1
    Ping, but with a graph
```

`gping` merupakan tool visualisasi ping yang belum tersedia di Fedora repositori. Sehingga sangat cocok untuk dijadikan contoh kasus untuk aplikasi terminal (TUI) yang dipasang dari dalam container yang diekspor ke host system.

Langkah pertama, pasang paket `gping`.


```
[bandithijo@arch-distrobox] sudo pacman -S gping
```

Setelah dipasang, coba langsung jalankan, seharusnya berhasil.

```
[bandithijo@arch-distrobox] gping google.com
```

Kemudian, tentunya akan sangat merepotkan kalau hanya untuk menjalankan gping, kita perlu masuk dulu ke dalam container.

Maka, kita perlu mengekspor gping ke host system.

> Pastikan kalau kamu sudah memiliki **PATH** yang berlokasi di `~/.local/bin`.
>
> Kalau belum, coba Googling yaa.

```
[bandithijo@arch-distrobox] distrobox-export --bin /usr/bin/gping --export-path ~/.local/bin
```

Kalau berhasil diekspor, akan menampilkan output seperti di bawah ini.

```
/usr/bin/gping from arch-distrobox exported successfully in /home/bandithijo/.local/bin/.
OK!
```

Kalau sudah, bisa dicoba jalankan `gping` pada host system.

```
$ gping google.com
```

Berikut ini demonstrasinya,

![Gambar 2]({{ page.assets | absolute_url }}/gambar-02.gif)

Gambar 2. Demonstrasi menjalankan gping hasil export dari distrobox-export

Kalau file `gping` yang ada di `~/.local/bin/gping` kita buka, isiny akan seperti ini,

```bash
#!/bin/sh
# distrobox_binary
# name: arch-distrobox
if [ ! -f /run/.containerenv ]; then
    /usr/bin/distrobox-enter -n arch-distrobox --  /usr/bin/gping  $@
else
    /usr/bin/gping $@
fi
```


##### Case 3: yay

Salah satu alasan saya memilih Arch Linux agar dapat memanfaatkan AUR.

Untuk mengakses AUR, kita memerlukan AUR helper untuk mempermudah bisnis kita. 😎

Saya biasa menggunakan **yay**.

```
[bandithijo@arch-distrobox] sudo pacman -S --needed git base-devel
[bandithijo@arch-distrobox] git clone https://aur.archlinux.org/yay.git
[bandithijo@arch-distrobox] cd yay
[bandithijo@arch-distrobox] makepkg -si
```

Setelah proses instalasinya selesai, kita dapat menjalankannya dari dalam container,

```
[bandithijo@arch-distrobox] yay
```

Atau, tinggal kita export untuk mempermudah menjalankannya dari host system.

```
[bandithijo@arch-distrobox] distrobox-export --bin /usr/bin/yay --export-path ~/.local/bin
```

```
/usr/bin/yay from arch-distrobox exported successfully in /home/bandithijo/.local/bin/.
OK!
```

Coba test update Arch Linux dengan `yay` dari host.

```
$ yay -Syu
```

Sip! Sekarang kita dapat memasang paket-paket dari AUR dengan menggunakan `yay` dari host system.

> Direktori **yay** hasil git clone sebelumnya, dapat kita hapus.


#### Aplikasi GUI

##### Case 1: Spotify (Electron)

`spotify` dapat kita temukan di AUR, dan kebetulan ada beberapa nama paket yang memiliki nama yang mirip.

Namun, yang ingin saya pasang adalah spotify yang memang bernama `spotify`.

```
aur/spotify 1:1.1.72.439-3 (+2296 31.40)
  A proprietary music streaming service
```

Tinggal dipasang menggunakan `yay`.

```
[bandithijo@arch-distrobox] yay -S spotify
```

Setelah instalasi selesai, kita dapat menjalankan langsung dari dalam container,

```
[bandithijo@arch-distrobox] spotify
```

Atau, lakukan export agar dapat dipanggil dengan mudah dari host system.

```
[bandithijo@arch-distrobox] distrobox-export --app spotify
```

```
Application spotify successfully exported.
OK!
spotify will appear in your applications list in a few seconds.
```

Perintah tersebut akan membuat file desktop entry spec pada `~/.local/share/applications/spotify.desktop` di host system.

```bash
[Desktop Entry]
Type=Application
Name=Spotify
GenericName=Music Player
Icon=spotify-client
TryExec=true
Exec=/usr/bin/distrobox-enter -H -n arch-distrobox -- "  spotify --uri= %U"
Terminal=false
MimeType=x-scheme-handler/spotify;
Categories=Audio;Music;Player;AudioVideo;
StartupWMClass=spotify
```

Berikut ini demonstrasinya,

![Gambar 3]({{ page.assets | absolute_url }}/gambar-03.gif)

Gambar 3. Demonstrasi pemasangan Spotify menggunakan yay dengan Distrobox


##### Case 2: Beekeeper Studio (AppImage)

> Paket yang menggunakan AppImage, memerlukan paket `fuse2` untuk dapat dijalankan.
> ```
> [bandithijo@arch-distrobox] yay -S fuse2
> ```
> 
> Kalau belum dipasang, akan mengeluarkan warning error seperti ini,
> 
> ```
> dlopen(): error loading libfuse.so.2
> 
> AppImages require FUSE to run.
> You might still be able to extract the contents of this AppImage
> if you run it with the --appimage-extract option.
> See https://github.com/AppImage/AppImageKit/wiki/FUSE
> for more information
> ```
> 
> Pasang terlebih dahulu paket `fuse2` sebelum memasang paket yang menggunakan AppImage.

Terdapat 2 macam paket `beekeeper-studio` di AUR, namun yang saya ingin pasang adalah yang menggunakan AppImage.

```
aur/beekeeper-studio-appimage 3.0.9-1 (+1 0.18)
  Cross platform SQL editor and database management app for Windows, Linux, and Mac
```

```
[bandithijo@arch-distrobox] yay -S beekeeper-studio-appimage
```

Setelah selesai, kita dapat langsung menjalankan dari dalam container,

```
[bandithijo@arch-distrobox] beekeeper-studio
```

Atau, tinggal kita export agar dapat dipanggil lebih mudah dari host system.

```
[bandithijo@arch-distrobox] distrobox-export --app beekeeper-studio
```

Berikut ini demonstrasinya,

![Gambar 4]({{ page.assets | absolute_url }}/gambar-04.gif)

Gambar 4. Demonstrasi pemasangan Beekeeper Studio menggunakan yay pada Distrobox


### Ekspor Aplikasi dari Container ke Host

Dari case-case pemasangan beberapa aplkasi di atas, saya sudah menunjukkan cara mengekspor aplikasi dari container ke host system.

Kita dapat mengekspor aplikasi GUI, aplikasi terminal, bahkan systemd service.

Untuk melakukan export, kita menggunakan perintah `distrobox-export` dari dalam container.

#### GUI Application

Misal, mengekspor aplikasi chromium dari container ke host.

Karena chromium merupakan aplikasi GUI, maka kita gunakan option `--app`.

```
[bandithijo@arch-distrobox] distrobox-export --app chromium
```

```
Application chromium successfully exported.
OK!
chromium will appear in your applications list in a few seconds.
```

Nah, maka kita langsung dapat memanggil chromium dari application launcher host system yang kita gunakan.

Untuk menghapusnya, tinggal jalankan perintah yang sama, namun dengan penambahan option `--delete`.

```
[bandithijo@arch-distrobox] distrobox-export --app chromium --delete
```

```
Application chromium successfully un-exported.
OK!
chromium will disappear from your applications list in a few seconds.
```

Maka, chromium tidak lagi tersedia di host system kita.


#### Terminal Application

Misal, mengekspor aplikasi gping dari container ke host.

Karena gping merupakan aplikasi terminal, maka kita gunakan option `--bin` diikuti dengan `--export-path`.

```
[bandithijo@arch-distrobox] distrobox-export --bin /usr/bin/gping --export-path ~/.local/bin
```

```
/usr/bin/gping from arch-distrobox exported successfully in /home/bandithijo/.local/bin/.
OK!
```

Nah, maka kita langsung dapat memanggil gping dari terminal host system yang kita gunakan.

Untuk menghapusnya, tinggal jalankan perintah yang sama, namun dengan penambahan option `--delete`.

```
[bandithijo@arch-distrobox] distrobox-export --bin /usr/bin/gping --export-path ~/.local/bin --delete
```

```
/usr/bin/gping from arch-distrobox exported successfully in /home/bandithijo/.local/bin/.
OK!
```

Maka, gping tidak lagi tersedia di terminal host system kita.


### Menghapus Container

Untuk menghapus container, kita perlu memastikan bahwa container tidak sedang berjalan dengan menggunakan perintah,

```
$ distrobox-list
```

```
 ID           | NAME                      | STATUS                 | IMAGE
 59b59d5dcabc | fedora-toolbox-35         | Created                | registry.fedoraproject.org/fedora-toolbox:35
 7cdc389dd7f4 | arch-distrobox            | Up 12 hours ago        | docker.io/library/archlinux:latest
```

Dalam kasus ini, saya ingin menghapus **arch-distrobox** container.

Namun, container ini masih *running* karena memiliki **STATUS Up 12 hours ago**.

Untuk menghentikan container yang sedang *running*, kita gunakan bantuan **podman** (atau docker).

```
$ podman stop CONTAINER_NAME
```

```
$ podman stop arch-distrobox
```

Kemudian cek kembali apakah container sudah tidak *running*.

```
 ID           | NAME                      | STATUS                         | IMAGE
 59b59d5dcabc | fedora-toolbox-35         | Created                        | registry.fedoraproject.org/fedora-toolbox:35
 7cdc389dd7f4 | arch-distrobox            | Exited (143) 6 seconds ago     | docker.io/library/archlinux:latest
```

Sip, statusnya sudah **Exited**.

Sekarang container tersebut dapat kita hapus dengan menggunakan perintah,

```
$ podman rm CONTAINER_NAME
```

```
$ podman rm arch-distrobox
```

Proses menghapus container sudah selesai.

Panduan lebih lengkapnya dapat dilihat di `$ podman rm --help`.


### Menghapus Image Container

Container yang kita gunakan dibuat dengan menggunakan image.

Kita dapat melihat daftar image container yang kita miliki (yang pernah kita unduh) dengan menggunakan perintah,

```
$ podman images
```

```
REPOSITORY                                 TAG         IMAGE ID      CREATED      SIZE
docker.io/library/archlinux                latest      9f9b229575b2  4 days ago   392 MB
registry.fedoraproject.org/fedora-toolbox  35          40b181c70b73  4 weeks ago  573 MB
```

Dalam kasus ini, saya ingin menghapus image **docker.io/library/archlinux** yang memiliki image ID **9f9b229575b2**.

```
$ podman image rm IMAGE_ID
```

```
$ podman image rm 9f9b229575b2
```

Kalau mendapati error seperti ini,

```
Error: Image used by 7cdc389dd7f46230e1afd0bebf54b224497a72433741220441392a6b15208442: image is in use by a container
```

Artinya, masih terdapat container yang menggunakan image tersebut, meskipun dalam keadaan Exited.

Kalau memang sudah dipastikan tidak digunakan, dan kita ingin menghapus image beserta container yang menggunakan image tersebut, kita dapat mnambahkan option `-f` atau `--force`.

```
$ podman image rm 9f9b229575b2 -f
```

```
Untagged: docker.io/library/archlinux:latest
Deleted: 9f9b229575b2cb787cf104f4706142dcba61af1ed63f045e3bf7204a721de15f
```

Selesai, image beserta container yang menggunakan image tersebut telah berhasil dihapus.

Panduan lebih lengkapnya dapat dilihat di `$ podman image rm --help`.


### Menghapus Unused Data

> Command ini cukup beresiko.
> 
> Perhatikan baik-baik instruksi yang ditampilkan oleh command yang dijalankan.

Command ini digunakan untuk menghapus data-data baik container maupun image yang sudah tidak lagi digunakan.

```
$ podman system prune
```

```
WARNING! This command removes:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache

Are you sure you want to continue? [y/N] █
```

Atau,

```
$ podman system prune --all
```

```
WARNING! This command removes:
        - all stopped containers
        - all networks not used by at least one container
        - all images without at least one container associated with them
        - all build cache

Are you sure you want to continue? [y/N] █
```

Panduan lebih lengkapnya dapat dilihat di `$ podman system prune --help`.


## Tambahan

Tentu saja, catatan ini tidak dapat mengcover semua dari dokumentasi Distrobox:

1. untuk melihat tips-tips yang lain dapat mengunjungi halaman [**github:distrobox:useful tips**](https://github.com/89luca89/distrobox/blob/main/docs/useful_tips.md)

1. untuk melihat beberapa contoh penggunaan yang lain dapat mengunjungi halaman [**github:distrobox:usage**](https://github.com/89luca89/distrobox/blob/main/docs/usage/usage.md)


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [https://twitter.com/LucaDiMaio11](https://twitter.com/LucaDiMaio11) \
   Diakses tanggal: 2022-01-22

1. [https://github.com/89luca89/distrobox](https://github.com/89luca89/distrobox) \
   Diakses tanggal: 2022-01-22

1. [https://fedoramagazine.org/run-distrobox-on-fedora-linux/](https://fedoramagazine.org/run-distrobox-on-fedora-linux/) \
   Diakses tanggal: 2022-01-22
