---
layout: 'post'
title: 'Dokumentasi Instalasi Fedora 21 pada Macbook Pro 8.1'
date: 2015-01-17
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Ulasan']
pin:
hot:
contributors: []
description:
---

<p class="notif-post">Post ini sudah tidak up to date !</p>

<img class="post-body-img" src="{{ site.lazyload.logo_blank_banner }}" data-echo="https://s20.postimg.cc/g07ex98dp/Default_Header_Template_Post_18_D2.jpg" onerror="imgError(this);">

# Pendahuluan
Tujuan dari penulisan dokumentasi ini untuk memudahkan pengguna mesin Apple khususnya Macbook Pro 8.1 (Late 2011) dalam menginstalasi sistem operasi Fedora 21. Untuk itu, saya mendokumentasikan proses setup Fedora 21 ini agar memudahkan pengguna Apple yang ingin beralih menggunakan sistem operasi Fedora 21.

# Kompatibilitas
Kita sama-sama tahu bahwa mesin Apple sudah menyertakan sistem operasi pada saat pembelian _hardware,_ yaitu OS X. Maka dari itu tidak semua sistem operasi berjalan sempurna pada mesin Apple. Fedora 21 adalah sistem operasi berbasis Linux yang termasuk mempunyai kompatibilitas yang baik pada mesin Apple khususnya Macbook Pro 8.1.

Berikut adalah daftar kompatibilitas yang sudah di-support dengan baik oleh Fedora 21 untuk mesin Macbook Pro 8.1

| HARDWARE | KETERANGAN |
| --- | --- |
| Brightnes Monitor | Berjalan dengan baik dengan fungsi key yang sama dengan OS X (F1 & F2) |
| Brightness Keyboard | Berjalan dengan baik dengan fungsi key yang sama dengan OS X (F5 & F6) |
| Sound Card | Berjalan dengan baik dengan fungsi key yang sama dengan OS X untuk pengaturan volume (F10, F11 & F12) |
| Keyboard | Berjalan dengan baik dengan fungsi yang sama dengan OS X |
| Touchpad | Berjalan dengan baik dengan pengaturan pada<br>"Settings > Mouse & Touchpad"<br>>> 2 Scroll Finger, Natural Scroll<br>>> tap to click<br>>> 2 tap for drag |
| Touchpad | lebih sensitif oleh sentuhan. * |
| Port Jack Audio | Berjalan dengan baik |
| Port USB | Berjalan dengan baik |
| Port Thunderbolt | Berjalan dengan baik |
| Eject Button on keyboard | Berjalan dengan baik |
| Delete / Backspace Button | Untuk fungsi backspace menggunakan tombol "delete"<br>Untuk fungsi delete menggunakan "fn+delete" |
| FaceTime HD Camera | Berjalan dengan baik |
| Multimedia Fungsi Key | Berjalan dengan baik pada program multimedia player<br>(Totem video player, Rhythmbox music player, VLC) |
| Support Read/Write HFS+ | Dengan pengaturan pada "Mount Option" dan perubahan UID pada user, kita dapat melakukan Read/Write pada partisi hfs+ Macintosh HD. * |
| Airport Card / Wifi adapter | Tidak berjalan baik. Kita perlu melakukan peng-install-an driver agar dapat menggunakan Airport Card. * |

_akan dijelaskan lebih lanjut_

# Airport Card / Wifi Adapter
Airport card / Wifi adapter tidak langsung dapat berfungsi. Kita membutuhkan driver broadcom-wl dari internet. Untuk itu, jangan terlebih dahulu sebaiknya anda men-download terlebih dulu sebelum melakukan peng-install-an Fedora 21.
1. Buka Browser anda dan copy paste link di bawah ini

   {% pre_url %}
https://www.lwfinger.com/b43-firmware/broadcom-wl-5.100.138.tar.bz2
{% endpre_url %}

   Simpan dan letakkan pada flashdisk anda.

2. Setelah anda menyelesaikan proses instalasi Fedora 21. Masukkan flashdisk yang di dalamnya sudah terdapat driver broadcom-wl yang sudah di-download sebelumnya.

3. Kemudian copy ke direktori home. Setelah itu, buka Terminal dan ikuti perintah di bawah ini

   {% shell_user %}
ls
{% endshell_user %}

   Pastikan driver sudah ada pada direktori home ini. (atau bisa folder lain apabila anda mengerti)

```
```
   {% shell_user %}
tar xjf broadcom-wl-5.100.138.tar.bz2
sudo export FIRMWARE_INSTALL_DIR="/lib/firmware"
sudo b43-fwcutter -w "$FIRMWARE_INSTALL_DIR" broadcom-wl-5.100.138/linux/wl_apsta.o
reboot
{% endshell_user %}

   \*Lakukan sesuai dengan urutan.

# Touchpad
Pada dasarnya touchpad pada Macbook Pro 8.1 sudah didukung cukup baik pada sistem operasi Fedora 21. Namun kita tetap perlu melakukan penyesuaian agar penggunaan touchpad mendekati seperti pada OS X.

Salah satu kelebihan menggunakan sistem operasi Linux, kita dapat merubah setting-an sesuai dengan yang kita inginkan secara manual.
Program atau driver yang mendukung untuk berjalannya touchpad ini adalah "synaptics".

Anda dapat melihat setting-an sebelum dimodifikasi dengan cara, buka Terminal dan ketik

{% shell_user %}
synclient -l
{% endshell_user %}

Maka akan keluar semua keterangan dan nilai-nilai untuk pengaturan synaptics touchpad kita.
Nah apabila anda masih merasa kurang nyaman dengan pengaturan touchpad secara default, anda bisa mengikuti settingan synaptics saya.

Berikut ini adalah keterangan dari setting-an synaptics saya :

| Nama | Keterangan |
| --- | --- |
| Natural Scrolling | Seperti pada OS X, scroll 2 jari ke bawah untuk menaikkan halaman. Sebaliknya, scroll 2 jari ke atas untuk menurunkan halaman. Begitu juga untuk scroll 2 jari ke kanan dan ke kiri. |
| Sensitivitas | Mengurangi sensitivitas touchpad saat mengetik |
| Tap to Click | Cukup menyentuh touchpad untuk melakukan klik |
| Right Click | 2 jari untuk melakukan klik kanan |
| Midle Click | 3 jari untuk melakukan klik tengah |
| Drag | Kita dapat melakukan drag dengan cara menyentuh (tap) 2 kali dan tahan (hold), lalu geser sesuka hati anda |

Nah, sekarang kita akan melakukan setting-an touchpad.

Buka Terminal anda, kita akan membuat file `synaptics.conf` pada direktori `/etc/X11/xorg.conf.d`.

{% shell_user %}
sudo gedit /etc/X11/xorg.conf.d/synaptics.conf
{% endshell_user %}

Setelah Gedit terbuka, copy dan paste kode di bawah ini.

```
Section
"InputClass"
Identifier "touchpad"
Driver
"synaptics"
MatchIsTouchpad "on"
MatchDevicePath "/dev/input/event*"
Option "FingerHigh" "75"
Option "RTCornerButton" "0"
Option "RBCornerButton" "0"
Option "MinSpeed" "0.7"
Option "MaxSpeed" "1.7"
Option "SHMConfig" "on"
Option "TapAndDragGesture" "on"
Option "PalmDetect" "on"
Option "TapButton2" "3"
Option "TapButton3" "2"
Option "TapButton1" "1"
Option "VertScrollDelta" "-243"
Option "HorizScrollDelta" "-243"
Option "VertTwoFingerScroll" "1"
Option "HorizTwoFingerScroll" "1"
EndSection
```

Save dan quit Gedit.

Setelah ini, kita perlu men-disable setting-an pada gnome-settings-daemon. Ini dapat dilkakukan dengan dconf-editor.

Apabila belum menginstal dconf-editor, dapat diinstal terlebih dahulu dengan cara

{% shell_user %}
sudo dnf install dconf-editor
{% endshell_user %}

Lalu jalankan dcof-editor dengan cara mengetik

{% shell_user %}
dconf-editor
{% endshell_user %}

Setelah terbuka, kita akan men-disable nilai dari mouse pada gnome-settings-daemon.

Buka `org/gnome/settings-daemon/plugins/mouse`.

Kemudian, uncheck variable "active" - yang sebelumnya tercentang. kalau sudah, quit saja.

Maka dengan begini, setting-an synaptics kita akan berjalan otomatis saat startup.

>Setting-an ini tidak akan merubah setting pada mouse external. Kita hanya merubah setting-an pada touchpad saja.

Sekarang, coba reboot dan rasakan perbedaan touchpad anda. Apakah sudah lebih mendekati seperti pada OS X?

# Update Semua Sistem
Hal yang tidak kalah penting dari sistem operasi adalah update terbaru. Setelah berhasil mengaktifkan Airport Card, sebaiknya sebelum melakukan hal-hal lain, kita melakukan update terlebih dahulu.

{% shell_user %}
sudo dnf update
{% endshell_user %}

Proses ini akan memakan waktu yang lumayan lama. Pastikan koneksi internet anda stabil. Silahkan bersantai minum kopi dan makan pisang goreng dahulu, dan biarkan dnf menyelesaikan tugasnya.

# Mengatur Read / Write pada Partisi HFS+ Macintosh HD
Secara default, partisi ber-format Hfs+ sudah dapat di-mount dengan baik namun kita hanya dapat membaca tanpa bisa menulis ke dalam partisi tersebut. Tentu saja ini mengganggu keleluasaan bagi kita yang hanya menggunakan Fedora sebagai sistem operasi dan ingin menggunakan partisi OS X sebagai media penyimpanan.

Untuk bisa membaca dan menulis (Read & Write) partisi Hfs+ Macintosh HD, kita perlu melakukan modifikasi terlebih dahulu.
1. Logout dari user kita, kemudian login menggunakan root. Caranya pada halaman login pilih Not in List, nanti akan keluar textbox username. Masukkan "root" (tanpa tanda kutip) dan masukkan password root anda.

2. Selanjutnya,kita membutuhkan nama username & nama home direktori kita. Caranya dengan membuka Terminal dan ketik

   {% shell_root %}
cd /home
ls
{% endshell_root %}

   Direktori yang tampil setelah perintah "ls", adalah direktori home untuk username anda. Nama direktori ini yang akan dijadikan patokan sebagai nama username anda.

3. Sekarang, kita akan merubah userid, dan merubah hak permission pada direktori home username anda. Buka Terminal dan ketik perintah di bawah dengan mengganti kode yang saya warnai merah.

   {% shell_root %}
usermod --uid 501 usernameanda
chown -R 501:usernameanda /home/direktorihomeusernameanda
{% endshell_root %}

4. Saat ini hak permission direktori dan userid pada user anda sudah berubah.

5. Langkah selanjutnya, meng-edit hak permission untuk login. Karena pada pembacaan uid yang diizinkan untuk login adalah uid min 1000 - 60.000. Sedangkan kita telah mengganti uid kita dengan nilai 501 (sama dengan uid pada OS X). Maka kita harus merubah akses minimal uid untuk login dengan cara

   {% shell_root %}
gedit /etc/login.defs
{% endshell_root %}

   Gedit adalah aplikasi texteditor yang secara default sudah terinstal pada Fedora 21 anda.
6. Setelah Gedit terbuka, kita akan meng-edit isi dari file login.defs

7. Cari dengan <kbd>CTRL</kbd>+<kbd>F</kbd> kata "UID_MIN" (tanpa tanda petik), lalu ganti nilai "1000" dengan "501"<br>Tujuan dari perubahan nilai ini agar saat login screen uid kita dapat login kedalam direktori home kita.

8. Langkah selanjutnya, silahkan logout dari root melalui menu yang ada di pojok kanan atas. Lalu login dengan username anda seperti biasa.

9. Kemudian, kita akan merubah "mount option" dari partisi Macintosh HD. Dengan cara, buka aplikasi bernama Disk.

10. Kemudian cari partisi Macintosh HD dan klik gambar "gear" kemudian pilih edit Mount Options...

11. Lalu geser switch Automatic Mount Option menjadi Off

12. Kemudian ikuti gambar di bawah, an isikan kode di bawah

    ```
    rw,force,x-gvfs-show,noauto
    ```

    ![gambar1]({{ site.lazyload.logo_blank }}){:data-echo="https://2.bp.blogspot.com/-0nRxbXutOo8/ViMiGYA2fFI/AAAAAAAAByM/NXhd-mF_DGE/s400/Mount%2BOptions_003.png" onerror="imgError(this);"}{:class="myImg"}

    Kemudian klik tombol OK. Sekarang anda bisa mencoba dengan meng-klik Macintosh HD pada file manager Nautilus pada aplikasi Files, kemudian anda akan diminta memasukkan password username anda.

13. Kemudian check apakah anda dapat membuat folder baru, me-rename, men-delete, dan meng-copy pada direktori `/User/namauseranda/Desktop/`.

    Apabila dikemudian hari read/write mengalami masalah tidak dapat menulis kembali. Jangan khawatir saya juga pernah mengalaminya. Partisi Macintosh HD tidak dapat menulis kembali dikarenakan (biasanya) battery habis total, atau force shutdown (shutdown paksa).

    Yang perlu anda lakukan adalah membuka Terminal dan ketik perintah di bawah

    {% shell_root %}
sudo fsck.hfsplus -p /dev/sda2
{% endshell_root %}

    Kemudian tunggu prosesnya hingga selesai. Ini akan memakan waktu lumayan lama.
    fsck adalah aplikasi dimana aplikasi ini akan melakukan beberapa proses-proses yang diperlukan (saya kurang paham seperti apa, pokoknya menurut saya canggih deh, hehe).
    Apabila dengan option [-p] di atas tidak berhasil, bisa dganti dengan [-f].

    {% box_perhatian %}
     <p>Sebaiknya melakukan unmount terlebih dahulu partisi Macintosh HD anda sebelum melakukan perintah fsck.</p>
    {% endbox_perhatian %}

# Menambahkan Repositori Pihak Ketiga
Tidak semua repositori resmi memenuhi paket yang kita inginkan. Untuk itu kita perlu menambahkan repositori pihak ketiga. Salah satu yang paling banyak digunakan adalah

**RPMfusion**

Buka Terminal anda dan copy paste perintah di bawah.

{% shell_user %}
su -c 'yum localinstall --nogpgcheck http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm'
{% endshell_user %}

# Install YUM Plugin
Ada beberapa yum plugin yang efisien jika digunakan, namun plugin ini tidak terpasang secara default. Yum Fastest Mirror, plugin ini akan memilih server mirror paling cepat saat melakukan instalasi atau update paket.

Buka Terminal anda dan copy paste perintah di bawah.

{% shell_user %}
su -c 'yum install yum-plugin-fastestmirror'
{% endshell_user %}

# Instal Browser Plugin
Browser Firefox memerlukan beberapa plugin untuk kebutuhan anda ber-internet.

**Repo Flash 64 Bit**

{% shell_user %}
su -c 'yum install http://linuxdownload.adobe.com/adobe-release/adobe-release-x86_64-1.0-1.noarch.rpm'
{% endshell_user %}

**Flash Player**

{% shell_user %}
su -c 'yum install flash-plugin'
{% endshell_user %}

# Install Media Codec
Fedora tidak langsung dapat memutar musik berformat .mp3, .wav atau memutar video berformat .mp4, .flv, .mkv, dll, untuk itu kita perlu menginstal plugin / codec untuk multimedia agar dapat diputar pada player-player multimedia di Fedora kita.

Buka Terminal dan copy paste perintah di bawah.

{% shell_user %}
su -c 'yum install gstreamer1-plugins-ugly gstreamer1-plugins-bad-freeworld gstreamer1-libav gstreamer-plugin-crystalhd gstreamer1-vaapi gstreamer1-plugins-bad-free gstreamer1-plugins-good'
{% endshell_user %}

# Instal Paket-paket Tambahan
Dalam hal ini, setiap pengguna memiliki kebutuhan yang berbeda-beda. Ada beberapa hal yang mungkin terlewatkan untuk pengguna yang masih awam. Seperti, bagaimana cara membuka file ber-ekstensi .rar.

Caranya, buka Terminal dan copy paste perintah di bawah ini.

{% shell_user %}
su -c 'yum install p7zip audacity unrar gimp inkscape gnome-tweak-tool vlc'
{% endshell_user %}

{% box_pertanyaan %}
<p><b>Apakah ada aplikasi pengganti Adobe Pohotoshop dan Corel Draw atau Adobe Illustrator?</b></p>
<p>Jawabannya ada. GIMP (GNU Image Manipulation Program) sebagai pengganti Adobe Photoshop dan Inkscape (Sebagai penganti Corel Draw atau Adobe Illustrator). p7zip (Sebagai pengganti WinRar, dan file-file kompresi berformat yang lain).</p>
{% endbox_pertanyaan %}

# Instal Fedy
Fedy, saya kurang begitu bisa mendefinisikan Fedy. Menurut taksiran saya, Fedy ini seperti "one stop app installer". Jadi, dengan menginstal Fedy kita dengan mudah menginstall aplikasi hanya dengan menekan tombol Install. Hanya saja proses instalasinya tidak dapat kita lihat. Jadi, harus sabar menunggu sampai selesai dan tombolnya berubah menjadi Remove.

Aplikasi-aplikasi seperti Fedy, seperti easyLife, tapi saya lebih suka mengunakan Fedy, karena lebih mudah diinstal dan digunakan.

Cara instalasinya, buka Terminal dan copy paste perintah di bawah.

{% shell_user %}
su -c "curl https://satya164.github.io/fedy/fedy-installer -o fedy-installer && chmod +x fedy-installer && ./fedy-installer"
{% endshell_user %}

Saya merekomendasikan untuk menginstal aplikasi dan paket-paket yang anda inginkan di Fedy satu-persatu.

# Referensi
1. [www.denniskanbier.nl/blog/fedora/fedora-20-on-a-macbook-82/](http://www.denniskanbier.nl/blog/fedora/fedora-20-on-a-macbook-82/){:target="_blank"}
2. [id.fedoracommunity.org/2013/12/instal-fedora.html](http://id.fedoracommunity.org/2013/12/instal-fedora.html){:target="_blank"}
3. [askubuntu.com/questions/283908/how-can-i-install-and-use-powerline-plugin](http://askubuntu.com/questions/283908/how-can-i-install-and-use-powerline-plugin){:target="_blank"}
4. [forums.fedoraforum.org/showpost.php?p=1686425&postcount=3](http://forums.fedoraforum.org/showpost.php?p=1686425&postcount=3){:target="_blank"}
5. [satya164.github.io/fedy/](http://satya164.github.io/fedy/){:target="_blank"}
6. [techblog.tthu.net/2015/01/apple-trackpadtouchpad-sensitivity-under-linux/#more-7](http://techblog.tthu.net/2015/01/apple-trackpadtouchpad-sensitivity-under-linux/#more-7){:target="_blank"}
