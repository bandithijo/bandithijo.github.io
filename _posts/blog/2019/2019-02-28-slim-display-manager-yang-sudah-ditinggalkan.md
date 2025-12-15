---
layout: "post"
title: "SLiM, Display Manager yang Sudah Lama Ditinggalkan"
date: "2019-02-28 17:47"
permalink: "/blog/:title"
assets: "/assets/images/posts/2019/2019-02-28-slim-display-manager-yang-sudah-ditinggalkan"
author: "BanditHijo"
category: "blog"
tags: ["slim"]
description: "SLiM Display Manager termasuk display manager favorit yang banyak digunkan oleh para ricer. Karena sangat mudah untuk dimofifikasi. Catatan kali ini, saya ingin berbagi bagaimana cara saya dalam mengkonfigurasi SLiM."
---

## Prakata

Mungkin sebagian dari teman-teman ada yang sudah pernah mencicipi distribusi sistem operasi GNU/Linux yang menggunakan SLiM display manager.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. SLiM display manager dengan default theme

Dari informasi yang saya baca pada halaman [Arch Wiki/SLiM](https://wiki.archlinux.org/index.php/SLiM#Match_SLiM_and_Desktop_Wallpaper). Proyek ini sudah ditinggalkan. Rilis paling akhir pada tahun 2013. Website dari proyek inipun sudah tidak ada lagi.

Pada halaman Arch Wiki tersebut juga kita disarankan untuk mempertimbangkan menggunakan Display Manager yang lain. Karena SLiM tidak secara penuh *support* dengan systemd, termasuk logind sessions.


## Mengapa Tertarik dengan SLiM?

Sebenarnya sudah lama mencari-cari pengganti dari LightDM display manager. Saya merasa kurang fleksibel dalam mengkostumisasi sesuai preferensi sendiri. Belum lagi transisi antara verbose mode dari journalctl ke tampilan LightDM tidak begitu *smooth*.

Sampai beberapa waktu lalu, menemukan halaman pada Slant.co yang membahas [What is the best Linux Display Manager?](https://www.slant.co/topics/2053/~best-linux-display-manager).

![Gambar 2]({{ page.assets }}/gambar-02.png)

Saya agak heran, karena bukan LightDM yang menduduki peringkat no. 1 saat ini (2019/02/28), melainkan SLiM dengan perolehan point sebanyak 92, disusul LightDM sebesar 84.

Dengan selisih yang tidak terlampau jauh, tidak menutup kemungkinan LightDM akan segera menyusul ke peringkat pertama.

Namun, saya tetap ingin mencoba SLiM. Karena rasa penasaran saya atas apa yang membuat SLiM masih menduduki peringkat pertama, padahal telah 5 tahun ditinggalkan.


### Kelebihan dan Kekurangan SLiM

![Gambar 3]({{ page.assets }}/gambar-08.png)

Gambar 3. Sumber: [Slant.co - SLiM Pros and Cons](https://www.slant.co/topics/2053/~best-linux-display-manager)


## Pengecekan Paket

Karena paket SLiM display manager ini termasuk paket yang sudah tidak lagi dimaintain oleh upstream developer, tentunya akan sangat penting untuk mengetahui apakah paket yang akan kita gunakan memiliki *bug reports*, *security reposts*, dll.

Pada distribusi Arch Linux, untuk menelusuri sebuah paket sangatlah mudah. Kita hanya perlu mengunjungi [archlinux.org/packages](https://www.archlinux.org/packages/). Kemudian, mencari paket bernama `slim`.

Beberapa hal yang saya perhatikan adalah:

1. **Last Updated**
2. **View Changes**
3. **Bug Reports**

Berikut ini tampilan dari ketiga hal di atas.

![Gambar 4]({{ page.assets }}/gambar-03.png)

Gambar 4. [last Updated](https://www.archlinux.org/packages/extra/x86_64/slim/)

![Gambar 5]({{ page.assets }}/gambar-04.png)

Gambar 5. [View Changes](https://git.archlinux.org/svntogit/packages.git/log/trunk?h=packages/slim)

![Gambar 6]({{ page.assets }}/gambar-05.png)

Gambar 6. [Bug Reports](https://bugs.archlinux.org/?project=1&string=slim)

Nah, dengan begini, kita dapat memantau, apakah paket SLiM ini **tidak lagi dimaintain** di Arch Linux atau **memiliki bug**.

Kita juga dapat sekalian mengecek apakah paket `slim` ini memiliki *security issue* atau tidak, pada halaman [security.archlinux.org](https://security.archlinux.org/).

Untuk teman-teman yang menggunakan distribusi selain Arch atau turunan Arch, silahkan menyesuaikan saja yaa.


## Instalasi

> PERHATIAN!
> 
> **Saya tidak merekomendasikan untuk menggunakan SLiM Display Manager**.
> 
> Apabila terjadi sesuatu yang merugikan teman-teman di kemudian hari, bukan merupakan tanggung jawab saya sebagai penulis.
> 
> Tanggung jawab sepenuhnya ada di tangan teman-teman.
> 
> Kalau setuju, yuk kita kemon!

Untuk distribusi Arch Linux, sangat saya sarankan memasang paket SLiM menggunakan *package manager*, dikarenakan alasan di atas. Agar paket yang kita gunakan, adalah paket yang sudah jelas ter-*maintained* dengan baik.

```
$ sudo pacman -S slim
```

Untuk distribusi yang lain, silahkan menyesuaikan.


## Konfigurasi


### Jalankan Service SLiM

Setelah memasang paket SLiM, kita perlu menjalankan `slim.service`.

Dikarenakan kita harus memilih salah satu Display Manager yang digunakan, karena sebelumnya saya menggunakan LightDM Display Manager, saya akan men-*disable* service dari LightDM terlebih dahulu.

```
$ sudo systemctl disable lightdm.service
```

Selanjutnya, baru meng-*enable*-kan service dari SLiM.

```
$ sudo systemctl enable slim.service
```


### Sessions

SLiM dapat secara otomatis mendeteksi daftar sessions yang terdapat pada direktori `/usr/share/xsessions/`.

Contohnya seperti milik saya. Saya memiliki 3 sessions.

1. i3
1. dwm
1. qtile

```
📂 /usr/share/xsessions/
.
├── 📄 dwm.desktop
├── 📄 i3.desktop
└── 📄 qtile.desktop
```

Sejak versi 1.3.6-2, SLiM sudah menyediakan fitur ini.

Untuk konfigurasi "pemilihan session", saya akan menuliskan dua cara.

1. Dapat memilih session pada saat login
1. Tidak dapat memilih session pada saat login

Kedua cara di atas, pada dasarnya, kita akan berurusan dengan 2 file.

1. `/etc/slim.conf`
1. `~/.xinitrc`

Saya mulai dari cara pertama.


#### Menampilkan Pilihan Session pada saat Login

Edit file `/etc/slim.conf` dengan *text editor* favorit kalian.

```
$ sudo vim /etc/slim.conf
```

```bash
!filename: /etc/slim.conf
# ...
# ...

# Set directory that contains the xsessions.
# slim reads xsesion from this directory, and be able to select.
sessiondir            /usr/share/xsessions/

# ...
# ...
```

Perhatikan baris ke-6, pastikan sudah *enable* (tidak ada tanda # dibagian paling depan).

Bagian inilah yang akan mengaktifkan pilihan session pada saat login.

(Perbaikan dari: **Harry Kurn**)

**Penting!** untuk menambahkan baris di bawah ini pada file `~/.xinitrc`.

```bash
!filename: $HOME/.xinitrc
# ...
# ...

exec $1
```

Tujuannya agar inputan yang dipilih menggunakan <kbd>F1</kbd> akan dieksekusi.

![Gambar 7]({{ page.assets }}/gambar-06.gif)

Kita dapat memilih session dengan menekan tombol <kbd>F1</kbd>.


#### Tidak Dapat Memilih Session pada saat Login

Untuk Cara kedua ini, dapat pula kita sebut sebagai *automatic session*, karena kita tidak memilih session sendiri dengan menekan tombol <kbd>F1</kbd> seperti di atas. Melainkan, kita sudah terlebih dahulu mendefinisikan *default session* yang akan kita pergunakan.

Edit file `/etc/slim.conf` dengan *text editor* favorit teman-teman.

```
$ sudo vim /etc/slim.conf
```

```bash
!filename: /etc/slim.conf
# ...
# ...

# Set directory that contains the xsessions.
# slim reads xsesion from this directory, and be able to select.
#sessiondir            /usr/share/xsessions/

# ...
# ...
```

**Perhatikan!** pada baris ke-6. Tambahkan tanda pagar `#`, untuk mendisable konfigurasi pada baris ini.

Selanjutnya, definisikan *default session* yang akan kita pergunakan.

Edit file `~/.xinitrc` dengan *text editor* favorit kalian.

```
$ vim ~/.xinitrc
```

Ada dua cara yang saya tawarkan.


##### Cara Sederhana

```bash
!filename: $HOME/.xinitrc
# ...
# ...
exec i3
#exec dwm
#exec qtile
# ...
# ...
```

Karena saya menggunakan i3wm sebagai *default session* saya, maka saya meng-*enable*-kan dengan menghapus tanda pagar `#`, seperti contoh di atas.


##### Cara Keren

> PERHATIAN!
> 
> (Perbaikan dari: **Harry Kurn**)
> 
> Cara keren ini sudah **tidak direkomendasikan** lagi.

```bash
!filename: $HOME/.xinitrc
# ...
# ...

# Untuk SLiM Session
DEFAULTSESSION=i3
case "$1" in
    i3) exec i3 ;;
    sway) exec sway ;;
    dwm) exec dwm ;;
    qtile) exec qtile ;;
    bspwm) exec bspwm ;;
    *) exec $DEFAULTSESSION ;;
esac

# ...
# ...
```

Untuk mengganti *default session* yang ingin digunakan, ubah nilai dari *variabel* `DEFAULTSESSION=`.

![Gambar 8]({{ page.assets }}/gambar-07.png)


## System Sessions

SLiM juga dapat mengakses *system sessions* seperti: reboot, shutdown, suspend, exit dan console.

| <center>System Sessions</center> | <center>Username</center> | <center>Password</center> |
| :--: | :-- | :-- |
| **REBOOT** | `reboot` | `<root_password>` |
| **SHUTDOWN** | `halt` | `<root_password>` |
| **SUSPEND** | `suspend` | `<root_password>` |
| **EXIT** | `exit` | `<root_password>` |
| **CONSOLE** | `consle` | `<root_password>` |

Untuk mengaktifkan dan menonaktifkan fitur ini, teman-teman dapat melihat pada file `/etc/slim.conf`.

```bash
!filename: /etc/slim.conf
# Commands for halt, login, etc.
halt_cmd            /sbin/shutdown -h now
reboot_cmd          /sbin/shutdown -r now
console_cmd         /usr/bin/xterm -C -fg white -bg black +sb -T "Console login" -e /bin/sh -c "/bin/cat /etc/issue; exec /bin/login"
#suspend_cmd        /usr/sbin/suspend
```

**suspend**, secara default dalam keadaan tidak aktif.


### Instalasi Themes

Instalasi themes pada SLiM display manager termasuk sangat mudah.

Hanya perlu memindahkan atau mengcopy paste direktori themes ke direktori `/usr/share/slim/themes`.

Salah satu contoh direktori SLiM themes, biasanya mengandung sedikitnya 3 file.

```
📂 darky_solarized_dark_yellow
.
├── 📄 background.png
├── 📄 panel.png
└── 📄 slim.theme
```

> INFO
> 
> Saya menggunakan theme **darky_solarized_dark_yellow** yang merupakan hasil modifikasi dari **darky_pink** milik [GitHub/adi1090x/slim_themes](https://github.com/adi1090x/slim_themes).


![Gambar 9]({{ page.assets }}/gambar-09.png)

Gambar 9. Themes: darky_pink

![Gambar 10]({{ page.assets }}/gambar-10.png)

Gambar 10. Themes: darky_solarized_dark_yellow

Cara instalasi themes sangat mudah.

Secara garis besar proses instalasi dibagi dalam 2 tahap.

1. Copy direktori themes ke dalam direktori `/usr/share/slim/themes/`
2. Merubah nilai dari variabel `current_theme` pada file `/etc/slim.conf`


#### Copy Direktori Themes

```
$ sudo cp -rvf &lt;dir_themes> /usr/share/slim/themes
```

Sebagai contoh, saya memiliki themes bernama `darky_solarized_dark_yellow`.

```
$ sudo cp -rvf darky_solarized_dark_yellow /usr/share/slim/themes
```

Kemudian lakukan pengecekan pada direktori `/usr/share/slim/themes/` apakah sudah berhasil dicopy.

```
$ ll /usr/share/slim/themes
```

<pre>
</pre>
```
drwxr-xr-x root root darky_solarized_dark_yellow 👈️
drwxr-xr-x root root default
```

Nah, kalau sudah ada, berarti sudah terinstall.


#### Menginisialisasi Nama Themes

Apabila langkah copy direktori themes sudah dilakukan, selanjutnya tinggal mengganti nilai dari variabel `current_theme` pada file `/etc/slim.conf` yang tadinya bernilai `default` menjadi `<nama_theme>`.

```
$ sudo vim /etc/slim.conf
```

```bash
!filename: /etc/slim.conf
# ...
# ...

# current theme, use comma separated list to specify a set to
# randomly choose from
current_theme        darky_solarized_dark_yellow

# ...
# ...
```


## Pesan Penulis

Untuk diperhatikan, SLiM display manager tidak menggunakan `~/.profile` untuk mengambil data-data aplikasi atau PATH apa saja yang harus dijalankan saat sistem startup, melainkan menggunakan `~/.xinitrc`.

Hal tersebut di atas sangat berbeda dengan Display Manager seperti GDM dan LightDM yang mengambil data-data startup applications dan PATH pada `~/.profile`.

Apabila hal ini tidak dikonfigurasi dengan benar, maka akan ada beberapa hal yang tidak berjalan sebagaimana mestinya.

Silahkan merujuk pada [.xinitrc](https://github.com/bandithijo/dotfiles/blob/master/.xinitrc) milik saya yang berada di GitHub/dotfiles, apabila memang diperlukan.

Sepertinya seperti ini dulu.

Mudah-mudahan dapat bermanfaat buat teman-teman.

Terima kasih.


## Terima Kasih

Terima kasih, Bro **Harry Kurn**.

![Gambar 11]({{ page.assets }}/gambar-11.png)


## Referensi

1. [wiki.archlinux.org/index.php/SLiM](https://wiki.archlinux.org/index.php/SLiM) \
   Diakses tanggal: 2019-02-28

1. [github.com/data-modul/slim](https://github.com/data-modul/slim) \
   Diakses tanggal: 2019-02-28

1. [www.slant.co/topics/2053/~best-linux-display-manager](https://www.slant.co/topics/2053/~best-linux-display-manager) \
   Diakses tanggal: 2019-02-28

1. [wiki.archlinux.org/index.php/GNOME/Keyring#Using_the_keyring_outside_GNOME](https://wiki.archlinux.org/index.php/GNOME/Keyring#Using_the_keyring_outside_GNOME) \
   Diakses tanggal: 2019-02-28
