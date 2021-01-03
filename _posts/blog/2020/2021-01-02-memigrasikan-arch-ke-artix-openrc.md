---
layout: 'post'
title: "Memigrasikan Arch Linux ke Artix Linux (OpenRC)"
date: 2021-01-02 07:45
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips', 'Arch Linux']
pin:
hot:
contributors: []
---

# Latar Belakang

Saat saya pertama kali bermigrasi dari macOS dan memutuskan untuk menggunakan GNU/Linux saya pikir tidak ada kontroversi yang terjadi beberapa tahun terakhir. Karena, sejak 2010 saya tidak lagi mengikuti perkembangan dunia GNU/Linux.

Ternyata pada tahun 2010, init system yang bernama **systemd** mulai diinisialisasikan.

Pada tahun 2011, Fedora yang menjadi distro pertama yang menggunakan systemd secara default.

Sepanjang Oktober 2013 - Februari 2014, terjadi perdebatan yang cukup panjang diantara Debian Technical Commitee, untuk memutuskan default init yang akan digunakan pada Debian 8 dengan codename "jessie".

Arch Linux sendiri mulai mengadopsi systemd pada Januari 2012. Teman-teman dapat melihat commitnya di sini, [upstream release v38: initial move of systemd into extra](https://git.archlinux.org/svntogit/packages.git/commit/trunk/PKGBUILD?h=packages/systemd&id=982ee75b9cda95d9357e9b80a931f7b52638c42b){:target="_blank"}. Dan mulai digunakan sebagai default init system pada Oktober 2012.

Saya bermigrasi ke GNU/Linux pada Desember 2014. Saat itu belum ngerti dan tahu polemik yang terjadi di komunitas tentang init system ini. Saya masih senang bermain-main karena akhirnya dapat secara serius menggunakan GNU/Linux lagi.

Tahun 2020 ini, sudah mulai banyak distribusi sistem operasi yang membundle init system selain systemd secara default, seperti OpenRC, Runit, dan s6.

Lantas saya pun juga mulai gatal untuk tidak ikut mencicipi init system tersebut.

Maka, Desember 2020 ini saya mulai dengan bermigrasi ke Artix OpenRC langsung dari Arch Linux tanpa perlu install ulang.

Berikut ini adalah catatan yang saya simpulkan dari [Artix Wiki: Migration](https://wiki.artixlinux.org/Main/Migration){:target="_blank"}.


# Tahapan Migrasi

<!-- PERHATIAN -->
<div class="blockquote-red">
<div class="blockquote-red-title">[ ! ] Perhatian</div>
<p markdown=1>Migrasi dari Arch Linux ke Artix Linux **hanya dilakukan oleh advanced users** yang benar-benar mengetahui apa yang mereka lakukan.</p>
<p markdown=1>Saya, sebagai penulis, **tidak bertanggung jawab** atas segala bentuk kejadian buruk yang menimpa sistem kalian.</p>
<p markdown=1>Apabila kalian mengikuti catatan ini, berarti kalian **telah menyetujui** bahwa **segala bentuk risiko atas masalah** yang terjadi karena mengikuti catatan ini, adalah **tanggung jawab kalian sepenuhnya**.</p>
<p markdown=1>Happy Hacking!</p>
</div>

<!-- PERHATIAN -->
<div class="blockquote-red">
<div class="blockquote-red-title">[ ! ] Perhatian</div>
<p markdown=1>**Semua perintah di bawah, harus dijalankan sebagai root**.</p>
<pre>
$ <b>sudo su</b>
</pre>

<pre>
# <b>_</b>
</pre>
</div>

## 1. Mempersiapkan pacman.conf, repositori dan mirrorlist

Kita akan memodifikasi file **pacman.conf** dan juga **mirrorlist**.

Kita akan mendefinisikan mirror di dalam file **pacman.conf** agar menggunakan dua file **mirrorlist**.

1. **mirrorlist**, yang akan berisi daftar mirror server dari Artix Linux.
2. **mirrorlist-arch**, yang akan berisi daftar mirror server dari Arch Linux.

<br>
**Bang, kok pakai mirrorlist-arch juga?**

Untuk repo **community** dan **extra**, Artix menggunakan mirror milik Arch.

Kira-kira seperti ini kalau saya gambarkan dalam bentuk tabel.

| Nama Repo | mirrorlist file |
| :-- | :-- |
| system | /etc/pacman.d/mirrorlist |
| world | /etc/pacman.d/mirrorlist |
| galaxy | /etc/pacman.d/mirrorlist |
| extra | /etc/pacman.d/mirrorlist-arch |
| community | /etc/pacman.d/mirrorlist-arch |

<br>
Rename **pacman.conf** yang lama dengan nama **pacman.confg.arch**.
<pre>
# <b>mv -vf /etc/pacman.conf /etc/pacman.conf.arch</b>
</pre>

<br>
Download file **pacman.conf** versi Artix Linux dari gittea.artixlinux.org.
<pre>
# <b>curl https://gitea.artixlinux.org/packagesP/pacman/raw/branch/master/trunk/pacman.conf -o /etc/pacman.conf</b>
</pre>
Setelah selesai, kita sudah memiliki file **/etc/pacman.conf** versi Artix Linux.

<br>
Rename **mirrorlist** yang lama dengan nama **mirrorlist-arch**.
<pre>
# <b>mv -vf /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist-arch</b>
</pre>

<br>
Download file **mirrorlist** yang berisi mirror server dari gittea.artixlinux.org.
<pre>
# <b>curl https://gitea.artixlinux.org/packagesA/artix-mirrorlist/raw/branch/master/trunk/mirrorlist -o /etc/pacman.d/mirrorlist</b>
</pre>
Setelah selesai, kita sudah memiliki file **/etc/pacman.d/mirrorlist** yang berisi daftar mirror server dari Artix Linux.

<br>
Copy **mirrorlist** yang telah berisi mirror server Artix menjadi **mirrorlist.artix**.
<pre>
# <b>cp -vf /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.artix</b>
</pre>
Tujuannya sebagai bakcup, apabila ditengah-tengah proses akan ada command yang menghapus mirrorlist. Kita dapat melakukan resorasi dengan cepat tanpa perlu mengunduh kembali.

<br>
Oke, tahapan persiapan file pacman.conf dan mirrorlist dari Artix Linux telah selesai.


## 2. Bersihkan Package Cache

Kita perlu membersihkan semua cache, karena beberapa package yang dimiliki oleh Artix Linux memiliki signature yang berbeda, kondisi ini tentu saja akan menyebabkan pacman memberikan pesan error atau warning.

Saya tidak berkeberatan menghapus package cache dan mengunduh ulang package-package tersebut.

<pre>
# <b>pacman -Scc && pacman -Syy</b>
</pre>


## 3. Lemahkan Tingkat Keamanan dari Pacman (Sementara)

Untuk menginstall package `artix-keyring`, kita perlu untuk melemahkan tingkat keamanan yang dimiliki oleh Pacman untuk sementara, hanya selama proses mendaftarkan **master key**.

{% highlight_caption /etc/pacman.conf %}
{% highlight conf linenos %}
#
# /etc/pacman.conf
#
# See the pacman.conf(5) manpage for option and repository directives

# ...
# ...

# By default, pacman accepts packages signed by keys that its local keyring
# trusts (see pacman-key and its man page), as well as unsigned packages.
#SigLevel    = Required DatabaseOptional
SigLevel    = Never

{% endhighlight %}


## 4. Install Artix PGP Keyring

Untuk menginstall `artix-keyring`, kita harus mendaftarkan **master key** nya secara manual.

<pre>
# <b>pacman -S artix-keyring</b>
</pre>

<pre>
# <b>pacman-key --populate artix</b>
</pre>

<pre>
# <b>pacman-key --lsign-key 95AEC5D0C1E294FC9F82B253573A673A53C01BC2</b>
</pre>

## 5. Pulihkan Kembali Tingkat Keamanan dari Pacman

Pulihkan kembali tingkat keamanan dari Pacman, atau kita akan benar-benar lupa.

{% highlight_caption /etc/pacman.conf %}
{% highlight conf linenos %}
#
# /etc/pacman.conf
#
# See the pacman.conf(5) manpage for option and repository directives

# ...
# ...

# By default, pacman accepts packages signed by keys that its local keyring
# trusts (see pacman-key and its man page), as well as unsigned packages.
SigLevel    = Required DatabaseOptional

{% endhighlight %}


## 6. Backup Daftar Daemon yang sedang Aktif

Mungkin teman-teman perlu untuk menyimpan daftar-daftar service daemon yang sedang aktif, agar setelah proses instalasi selesai, kita dapat memasangnya kembali satu-persatu.

<pre>
# <b>systemctl list-units --state=running | grep -v systemd | awk '{print $1}' | grep service > /root/daemon.list</b>
</pre>

Saya memilih menyimpannya di `/root/daemon.list`.

Oke, sekarang kita telah siap untuk melakukan instalasi dari komponen-komponen Artix Linux, serta init script pengganti systemd.


## 7. Download Artix Packages

Kita akan mengunduh package `base` dan `base-devel` termasuk paket-paket pendukung untuk init yang baru.

<pre>
# <b>pacman -Sw base base-devel openrc-system grub linux linux-headers openrc elogind-openrc netifrc grub mkinitcpio archlinux-mirrorlist net-tools rsync vi lsb-release esysusers etmpfiles</b>
</pre>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Perhatikan kembali paket-paket yang dipasang di atas.</p>
<p>Apakah telah sesuai dengan paket yang teman-teman akan pergunakan?</p>
<p markdown=1>Seperti,</p>
<div markdown=1>
1. Kernel: `linux`, `linux-headers`, karena saya memang menggunakan vanilla kernel.
2. Text editor: `vi`, karena saya tidak menggunakan nano.
</div>
</div>


`-w`, adalah option yang berarti **Download packages only**.

Saat tulisan ini dibuat, total package yang saya download sebesar,

<pre>
Total Download Size:  <b style="color:white;">165.86 MiB</b>
</pre>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Pastikan dalam proses unduh ini, paket-paket tersebut benar-benar telah selesai.</p>
<p>Kalau ditengah proses tiba-tiba internet kita mati, maka ulangi dengan menjalankan kembali command di atas.</p>
</div>

## 8. Hapus systemd

Setelah kita selesai mengunduh dan mempersiapkan init pengganti, dalam hal ini adalah OpenRC, kita siap untuk mengirim systemd dan keluarganya untuk dilupakan.

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p markdown=1>Jawab "yes" untuk semua pertanyaan yang diajukan di bawah.</p>
</div>

<pre>
# <b>pacman -Rdd --noconfirm systemd systemd-libs systemd-sysvcompat pacman-mirrorlist dbus</b>
</pre>

<pre>
# <b>rm -fv /etc/resolv.conf</b>
</pre>

<!-- PERHATIAN -->
<div class="blockquote-red">
<div class="blockquote-red-title">[ ! ] Perhatian</div>
<p markdown=1>Perintah untuk menghapus file **/etc/resolv.conf** di atas, tidak saya jalankan.</p>
<p markdown=1>Karena saya mendapatkan DNS secara otomatis dari ISP, apabila saya jalankan perintah untuk menghapus file **/etc/resolv.conf** di atas, maka akan mematikan akses internet saya.</p>
</div>

Kembalikan kembali file **mirrorlist** yang terhapus diakibatkan oleh proses di atas (mengapus `pacman-mirrorlist` package).

<pre>
# <b>cp -vf /etc/pacman.d/mirrorlist.artix /etc/pacman.d/mirrorlist</b>
</pre>

## 9. Install OpenRC Init System

Sekarang saatnya memasang paket `base`, `base-devel`, dan paket-paket OpenRC init yang sebelumnya kita telah download dengan option `pacman -Sw` di atas.

<pre>
# <b>pacman -S base base-devel openrc-system grub linux linux-headers openrc elogind-openrc netifrc grub mkinitcpio archlinux-mirrorlist net-tools rsync vi lsb-release esysusers etmpfiles networkmanager-openrc artix-branding-base</b>
</pre>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Perhatikan kembali paket-paket yang dipasang di atas.</p>
<p>Apakah telah sesuai dengan paket yang teman-teman akan pergunakan?</p>
<p markdown=1>Seperti,</p>
<div markdown=1>
1. Kernel: `linux`, `linux-headers`, karena saya memang menggunakan vanilla kernel.
2. Text editor: `vi`, karena saya tidak menggunakan nano.
</div>
<p markdown=1>Terdapat paket untuk comprehensive network manager, seperti `networkmanager-openrc`, saya memilihkan paket ini karena sebagian teman-teman biasanya menggunakan NetworkManager. Meskipun pada panduan Artix Wiki: Migration menggunakan `connman`.</p>
<p>Intinya, pasang sesuai yang teman-teman perlukan.</p>
</div>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p markdown=1>Terdapat paket `artix-branding-base`, paket ini bertujuan untuk "Base branding for Artix ISOs".</p>
<p markdown=1>Intinya, paket ini adalah sebuah script yang mengotomatisasi rebranding segala hal tentang Arch menjadi Artix.</p>
<p markdown=1>Contohnya seperti hasil output dari Neofetch yang tidak lagi Arch Linux, melainkan Artix Linux.</p>
</div>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p markdown=1>Kalau diperhatikan, terdapat paket-paket dengan suffix `-openrc`.</p>
<p markdown=1>Paket-paket tersebut adalah paket yang telah dilakukan modifikasi agar sesuai dengan OpenRC init.</p>
<p markdown=1>Selain untuk OpenRC, tersedia juga untuk init lainnya dengan suffix `-runit` dan `-s6`.</p>
</div>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p markdown=1>Kalau ada paket-paket yang belum sempat kita pasang versi `-openrc` nya, kita bisa pasang nanti setelah proses migrasi selesai.</p>
</div>

Tunggu prosesnya hingga selesai.

## 10. Reinstall Paket-paket dari Arch Repositori

Pertama-tama, pastikan locale yang kita gunakan adalah **C**.

<pre>
# <b>export LC_ALL=C</b>
</pre>

Saatnya mengganti semua paket-paket Arch dengan paket-paket Artix.

Kita akan jalankan masing-masing per level repositori (`system`, `world`, `galaxy`).

Satu persatu secara urut.

<pre>
# <b>pacman -Sl system | grep installed | cut -d" " -f2 | pacman -S -</b>
</pre>

<pre>
# <b>pacman -Sl world  | grep installed | cut -d" " -f2 | pacman -S -</b>
</pre>

<pre>
# <b>pacman -Sl galaxy | grep installed | cut -d" " -f2 | pacman -S -</b>
</pre>

Tunggu prosesnya hingga selesai.

## 11. Pasang init Scripts

Kita akan memasang init scripts untuk menggantikan systemd init script.

<pre>
# <b>pacman -S --needed acpid-openrc alsa-utils-openrc autofs-openrc cronie-openrc cups-openrc fuse-openrc haveged-openrc hdparm-openrc openssh-openrc samba-openrc syslog-ng-openrc</b>
</pre>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Sesuaikan dengan init script yang teman-teman gunakan.</p>
</div>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p markdown=1>Kalau masih ada yang terlewatkan dan belum ingat, kira-kira init apa saja yang kita perlukan, kita dapat memasangnya nanti seiring kita gunakan.</p>
</div>

## 12. Enable Services

Berdasarkan init scripts yang telah kita install pada langkah 11, kita akan mengenablekannya, agar dijalankan saat sistem startup.

<pre>
# <b>for daemon in acpid alsasound autofs cronie cupsd fuse haveged hdparm smb sshd syslog-ng; do rc-update add $daemon default; done</b>
</pre>

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Sesuaikan dengan init script yang teman-teman gunakan.</p>
<p markdown=1>Misal,</p>
<div markdown=1>
1. Service untuk networking menggunakan `NetworkManager` atau `connman`.
2. Apakah menggunakan service `dhcpcd`
3. Dan lain sebagainya
</div>
<p markdown=1>Saya tidak mengaktifkan service *comprehensive network manager* seperti **NetworkManager** maupun **connmand**. Melainkan hanya menggunakan **wpa_supplicant** maupun **iwd** dengan **dhcpcd**.</p>
</div>

Oh yaa, khusus untuk OpenRC init, kita perlu mengaktifkan **udev** dan **sysinit**.

<pre>
# <b>rc-update add udev sysinit</b>
</pre>

## 13. Konfigurasi Networking

### Traditional Network Interface Namespace

Saya rasa, kita perlu untuk mengembalikan network interface namespace menjadi bentuk *traditional network interface namespace*.

Saya tidak paham apakah langkah ini harus dilakukan, tapi kalau saya pribadi, saya memang sejak awal menggunakan *traditional network interface namespace*, jadi saya tidak ada masalah dengan langkah ini.

Tambahkan `net.ifnames=0` ke dalam kernel parameter.

Karena saya menggunakan GRUB, saya cukup menambahkan pada GRUB config saja.

{% highlight_caption /etc/default/grub %}
{% highlight conf linenos %}
# GRUB boot loader configuration

GRUB_FORCE_HIDDEN_MENU="true"
GRUB_DISABLE_SUBMENU=y
GRUB_TIMEOUT=5
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT="true"
GRUB_DISTRIBUTOR="Artix"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 ... ... ..."
GRUB_CMDLINE_LINUX="net.ifnames=0"
{% endhighlight %}

### Enable eth0 Interface on Boot

Untuk yang menggunakan ehternet, saya pikir perlu untuk mengjalankan langkah ini.

Karena saya tidak menggunakan ethernet, dan hanya menggunakan wireless, saya tidak menjalankan langkah ini.

OpenRC sendiri memiliki network manager sendiri, bernama **netifrc**.

Konfigurasinya ada di,

{% highlight_caption /etc/config.d/net %}
{% highlight conf linenos %}

#...
#...

##############################################################################
# INTERFACE HANDLERS
#
# We provide two interface handlers presently: ifconfig and iproute2.
# You need one of these to do any kind of network configuration.
# For ifconfig support, emerge sys-apps/net-tools
# For iproute2 support, emerge sys-apps/iproute2

# If you don't specify an interface then we prefer iproute2 if it's installed
# To prefer ifconfig over iproute2
#modules="!iproute2"

# For a static configuration, use something like this
# (They all do exactly the same thing btw)
#config_eth0="192.168.0.2/24"
#config_eth0="192.168.0.2 netmask 255.255.255.0"

#...
#...
 
{% endhighlight %}

Secara default, **DHCP** akan digunakan kalau kita tidak mengeset `config_eth0=`.

Jadi, saya biarkan saja tidak mengeset apa-apa. Karena saya ingin menggunakan **DHCP** saja.

<br>
Selanjutnya, kita buat symlink file init script dengan menyesuaikan ethernet interface name yang kita punya. Punya saya `eth0`.

<pre>
# <b>ln -s /etc/init.d/net.lo /etc/init.d/net.eth0</b>
</pre>

Kemudian tambahkan servicenya ke boot, agar dijalankan saat proses booting.

<pre>
# <b>rc-update add net.eth0 boot</b>
</pre>

Lalu, pasang paket **netifrc**.

<pre>
# <b>pacman -S --needed netifrc</b>
</pre>

<br>
Untuk referensi lebih lanjut, teman-teman bisa juga membaca [**Gnome Wiki: Netifrc**](https://wiki.gentoo.org/wiki/Netifrc){:target="_blank"}.

## 14. LVM Setup

Saya tidak menggunakan LVM, jadi saya tidak menjalankan langkah ini.

Jika teman-teman menggunakan LVM (*Logical Volume Management*), kalian harus banget memasang paket `lvm2-openrc` dan `device-mapper-openrc`.

Jika tidak, logical volume tidak akan aktif saat proses booting.

Kedua paket ini adalah bagian dari group **system** init, jadi kemungkinan kalian mungkin sudah memasangnya.

Tinggal kalian enable-kan saja.

<pre>
# <b>rc-update add lvm boot</b>
</pre>

<pre>
# <b>rc-update add device-mapper boot</b>
</pre>

## 15. Remove More systemd Cruft

Kita juga dapat menghapus beberapa script yang digunakan oleh systemd.

<pre>
# <b>for user in journal journal-gateway timesync network bus-proxy journal-remote journal-upload resolve coredump; do userdel systemd-$user; done</b>
</pre>

<pre>
# <b>rm -vfr /{etc,var/lib}/systemd</b>
</pre>

## 16. Update Bootloader dan Kernel initramfs

Pada tahapan-tahapan sebelumnya, kita telah menginstall kembali **mkinitcpio** dan **grub**.

Maka, sebaiknya kita harus mengkonfigurasi ulang.

### Kernel initramfs

Backup file **mkinitcpio.conf** yang lama.

<pre>
# <b>mv -vf /etc/mkinitcpio.conf /etc/mkinitcpio.conf.arch</b>
</pre>

Salin file `.pacnew` yang tersedia.

<pre>
# <b>cp -vf /etc/mkinitcpio.conf.pacnew /etc/mkinitcpio.conf</b>
</pre>

Kalau tidak ada `.pacnew`, bisa ambil dari file backup saja.

<br>
Kalau teman-teman pernah menambahkan konfigurasi tertentu, bisa di copy ke file yang baru.

Misal, seperti yang saya lakukan untuk hibernasi, saya menambahkan `resume` hook.

{% highlight_caption /etc/mkinitcpio.conf %}
{% highlight sh linenos %}
#...
#...

HOOKS=(base udev resume autodetect modconf block filesystems keyboard fsck)

#...
#...
 
{% endhighlight %}

Selanjutnya kita recreate kernel initramfs.

<pre>
# <b>mkinitcpio -p linux</b>
</pre>

`linux` adalah kernel yang saya gunakan, sesuaikan dengan kernel yang teman-teman gunakan.

Atau, kalau teman-teman memiliki banyak kernel, gunakan option `-P`.

<pre>
# <b>mkinitcpio -P</b>
</pre>

Agar lebih praktis untuk me-recreate semua kernel initramfs.

### GRUB

Backup file **/etc/default/grub** yang lama.

<pre>
# <b>mv -vf /etc/default/grub /etc/default/grub.arch</b>
</pre>

Salin file `.pacnew` yang tersedia.

<pre>
# <b>cp -vf /etc/default/grub.pacnew /etc/default/grub</b>
</pre>

Kalau tidak ada `.pacnew`, bisa ambil dari file backup saja.

<br>
Kalau teman-teman pernah menambahkan konfigurasi tertentu, bisa di copy ke file yang baru.

{% highlight_caption /etc/default/grub %}
{% highlight conf linenos %}
# GRUB boot loader configuration

GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="Artix"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3"
GRUB_CMDLINE_LINUX="net.ifnames=0"
{% endhighlight %}

Pada bagian baris ke-7, `GRUB_CMDLINE_LINUX=`, saya menambahkan option-option yang saya pindahkan dari konfigurasi GRUB yang lama. Teman-teman bisa melihat dari file `/etc/default/grub.arch`.

Initinya, tambahkan modifikasi atau kernel parameter yang teman-teman gunakan.

Kalau sudah jagan lupa diupdate.

<pre>
# <b>update-grub</b>
</pre>

## 17. Reinstall GRUB

Untuk **UEFI**.

**Default for most setups**

<pre>
# <b>grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub</b>
</pre>

If not success, **some users reported success with this one**

<pre>
# <b>grub-install --target=x86_64-efi --efi-directory=esp_mount --bootloader-id=grub</b>
</pre>

<br>
Untuk **BIOS**.

<pre>
# <b>grub-install <mark>/dev/sdX</mark></b>
</pre>

Ganti **sdX** dengan disk name yang teman-teman miliki.

<!-- INFORMATION -->
<div class="blockquote-blue">
<div class="blockquote-blue-title">[ i ] Informasi</div>
<p>Bukan partition name yaa. Kalau ada numbernya, berarti partition name.</p>
<pre>
sda         <- Disk name
└─sda1      <- Partition name
</pre>
</div>

## 18. Reboot

Kita tidak lagi dapat melakukan reboot dengna cara yang biasa (cara systemd).

Kita dapat melakukan dengan cara memicu **SysRq** kernel.

Namun, buat saya lebih mudah dengan memanggil **loginctl** tapi harus dengan user biasa.

<pre>
# <b>exit</b>
$ <b>loginctl reboot</b>
</pre>

<pre>
$ <span style="color:white;">PID1: Received "reboot" from FIFO...</span>
Starting reboot runlevel

Broadcast message from root@arch.bandithijo.x61 (null)(Sat Jan  2 15:15:15 2021):

The system will reboot now
</pre>

Selesai.

Setelah reboot, kita sudah akan berada di Artix.

Good luck!



# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)



# Referensi

1. [wiki.artixlinux.org/Main/Migration](https://wiki.artixlinux.org/Main/Migration){:target="_blank"}
<br>Diakses tanggal: 2021/01/02

2. [en.wikipedia.org/wiki/Systemd](https://en.wikipedia.org/wiki/Systemd){:target="_blank"}
<br>Diakses tanggal: 2021/01/02

3. [wiki.gentoo.org/wiki/Netifrc](https://wiki.gentoo.org/wiki/Netifrc){:target="_blank"}
<br>Diakses tanggal: 2021/01/02