---
layout: "post"
title: "Mudah Manajemen Service dengan OpenRC"
date: "2021-01-06 06:45"
permalink: "/blog/:title"
assets: "/assets/images/posts/2021/2021-01-06-mudah-manajemen-service-dengan-openrc"
author: "BanditHijo"
category: "blog"
tags: ["artix linux", "openrc"]
description: "Sedikit catatan-catatan kecil dalam memanajemen service dengan OpenRC. Mungkin cukup membantu untuk teman-teman yang baru bermigrasi ke init system OpenRC."
---

# Latar Belakang

Akhir Desember 2020, saya memigrasikan Arch Linux yang sudah saya pakai sejak April 2020 -- karena Maret 2020, saya bermigrasi ke FreeBSD -- ke Artix Linux OpenRC.

Teman-teman dapat membaca catatan migrasi saya di sini, [**Memigrasikan Arch Linux ke Artix Linux (OpenRC)**](/blog/memigrasikan-arch-ke-artix-openrc).

Menggunakan init system, selain **systemd** merupakan hal yang baru bagi saya. Karena sejak Desember 2014 -- awal migrasi saya menggunakan GNU/Linux dengan distribusi sistem operasi **Fedora Linux**, sudah menggunakan **systemd**.

Catatan kali ini saya ingin menyimpan bagaimana cara menggunakan OpenRC dalam memanajemen service.


# Cara Penggunaan

> INFO
> 
>Selama proses catatan ini, saya akan menggunakan **sshd** sebagai contoh service.
> 
>Di Artix Linux, paket **openssh** harus dipasang sesuai init yang digunakan.
> 
>Misal, saya menggunakan OpenRC.
> 
> ```
> $ sudo pacman -S openssh openssh-openrc
> ```


## 1. Melihat Daftar Service yang Tersedia; RC-SERVICE(8)

```
NAME
     rc-service — locate and run an OpenRC service with the given arguments

DESCRIPTION
     Service scripts could be in different places on different systems.
     rc-service locates the specified service and runs it with the given argu‐
     ments.  If -i, --ifexists is given then rc-service returns 0 even if the
     service does not exist.  If -I, --ifinactive or -N, --ifnotstarted is given
     then rc-service returns 0 if the service exists but is in the wrong state.

     If given the -l, --list argument then rc-service will list all available
     services.
```

Untuk melihat daftar service apa saja yang tersedia, kita dapat menggunakan perintah,

```
$ rc-service -l
```

Atau,

```
$ rc-service --list
```

```
acpid
agetty
agetty.tty1
agetty.tty2
agetty.tty3
agetty.tty4
agetty.tty5
agetty.tty6
--- dipotong ---
udev
udev-settle
udev-trigger
urandom
virtlockd
virtlogd
wpa_supplicant
xinetd
```

Atau kombinasikan dengan **grep**.

Misal, ingin mencari **wpa_supplicant** service.

```
$ rc-service --list | grep wpa_supplicant
```

```
wpa_supplicant
```


## 2. Menambahkan Service ke runlevel; RC-UPDATE(8)

```
NAME
     rc-update — add and remove services to and from a runlevel

DESCRIPTION
     OpenRC uses named runlevels.  Rather than editing some obscure file or man‐
     aging a directory of symlinks, rc-update exists to quickly add or delete
     services to and from from different runlevels.  All services must reside in
     the /etc/init.d or /usr/local/etc/init.d directories.  They must also be
     standard OpenRC scripts, meaning they must use openrc-run.

     add service             Add the service to the runlevel or the current one
                             if none given.  Services added to the boot runlevel
                             must exist in /etc/init.d.

     delete service          Delete the service from the runlevel or the current
                             one if none given.

     show                    Show all enabled services and the runlevels they be‐
                             long to.  If you specify runlevels to show, then
                             only those will be included in the output.
```

**runlevel** adalah level dimana service akan dijalankan.

**runlevel** merupakan direktori yang berlokasi di **/etc/runlevel/**.

Terdapat 3 internal runlevel dan 4 user defined runlevel.

**Internal runlevel**:

1. **sysinit**
2. **shutdown**
3. **reboot**

**User Defined runlevel**:

1. **boot**, Starts all system-necessary services for other runlevels
2. **default**, Used for day-to-day-operations
3. **nonetwork**, Used when no network connectivity is required
4. **single**, Single-user mode

Contoh:

```
Runlevel: shutdown
 killprocs                                                            [  stopped  ]
 ...
 ...
Runlevel: default
 agetty.tty1                                     [  started 2 day(s) 06:11:21 (0) ]
 agetty.tty2                                     [  started 2 day(s) 06:11:21 (0) ]
 ...
 ...
Runlevel: nonetwork
 local                                                                [  started  ]
Runlevel: sysinit
 dmesg                                                                [  started  ]
 ...
 ...
Runlevel: boot
 root                                                                 [  started  ]
 ...
 ...
```

Biasanya, service-service yang kita tambahkan, apabila tidak diberikan argument spesifik runlevel apa yang akan digunakan, akan diletakkan di runlevel **default**.

Proses menambahkan service ke runlevel ini, mirip dengan proses pada systemd yang menggunakan option **enable**.

```
$ sudo rc-service add <nama_service>
```

Misal, saya ingin menjalankan service SSH.

Service SSH memiliki service name bernama **sshd**.

Cara menambahkan ke runlevel,

```
$ sudo rc-update add sshd
```

```
* service sshd added to runlevel default
```

Service **sshd** telah berhasil ditambahka ke runlevel **default**.

```
Runlevel: default
 sshd                                                                 [  stopped  ]
```

Tapi, statusnya masih **stopped**, kita akan jalankan di section selanjutnya.


## 3. Menjalankan, Menghentikan, Merestart Service; RC-SERVICE(8)

**Kok pakai `rc-service` lagi?**

Yak, benar! Selain kita gunakan untuk melihat daftar service, kita juga dapat gunakan untuk memanipulasi service, seperti:

Kalau pada systemd, proses ini mirip dengan **start**, **stop**, **reload**, **status**.

**Start Service**

```
$ sudo rc-service &lt;nama_service> start
```

```
$ sudo rc-service sshd start
```

```
sshd              | * Starting sshd ...                                       [ ok ]
```

> INFO
> 
> Kita dapat menjalankan service tanpa perlu menambahkan ke dalam runlevel.
> 
> Kalau kita jalankan tanpa terlebih dulu memasukkannya ke dalam runlevel **default**, maka akan dimasukkan ke runlevel **manual**.

**Stop Service**

```
$ sudo rc-service <nama_service> stop
```

```
$ sudo rc-service sshd stop
```

```
sshd              | * Stopping sshd ...                                       [ ok ]
```

**Restart Service**

```
$ sudo rc-service <nama_service> restart
```

```
$ sudo rc-service sshd restart
```

```
sshd              | * Stopping sshd ...                                       [ ok ]
sshd              | * Starting sshd ...                                       [ ok ]
```

**Status Service**

```
$ sudo rc-service &lt;nama_service> status
```

```
$ sudo rc-service sshd status
```

```
* status: started
```

atau,

```
* status: stopped
```


## 4. Menghapus Service dari runlevel; RC-UPDATE(8)

Untuk menghapus service dari runlevel, sangat mudah sekali.

Biasanya hal ini kita lakukan apabila ada service yang ingin kita hentikan secara permanent.

Misalnya, saya tidak memerlukan service SSH untuk berjalan terus menerus. Maka saya akan disable dari runlevel default.

Pada systemd, proses ini mirip seperti **disable** service.

```
$ rc-update del <nama_service>
```

```
$ sudo rc-update del sshd
```

```
* service sshd removed from runlevel default
```


## 5. Melihat Service pada runlevel; RC-UPDATE(8)

Kita dapat gunakan perintah ini untuk melihat service tertentu ada pada runlevel apa saja.

```
$ rc-update show
```

```
          agetty.tty1 |      default
          agetty.tty2 |      default
              cgroups |                                 sysinit
               cronie |      default
                 dbus |      default
                devfs |                                 sysinit
               dhcpcd |      default
                dmesg |                                 sysinit
       dnscrypt-proxy |      default
              elogind | boot
                 fsck | boot
---------------------------- dipotong -------------------------
                 sshd |      default
                 swap | boot
               sysctl | boot
                sysfs |                                 sysinit
         termencoding | boot
                  tlp |      default
                 udev |                                 sysinit
         udev-trigger |                                 sysinit
              urandom | boot
       wpa_supplicant |      default
```

Kita juga dapat menggunakan untuk melihat service yang ada pada runlevel tertentu, misal runlevel **default**.

```
$ rc-update show default
```

```
          agetty.tty1 | default
          agetty.tty2 | default
            alsasound | default
               cronie | default
                 dbus | default
               dhcpcd | default
       dnscrypt-proxy | default
                local | default
           postgresql | default
                 sshd | default
                  tlp | default
       wpa_supplicant | default
```


## 6. Melihat Service Status; RC-STATUS(8)

```
NAME
     rc-status — show status info about runlevels

DESCRIPTION
     rc-status gathers and displays information about the status of services in
     different runlevels.  The default behavior is to show information about the
     current runlevel and any unassigned services that are not stopped, but any
     runlevel can be quickly examined.

     If an active service is being supervised by supervise-daemon(8,) the amount
     of time the daemon has been active along with the number of times it has
     been respawned in the current respawn period will be displayed.
```

Option yang tersedia:

```
     The options are as follows:

     -a, --all             Show all runlevels and their services.

     -c, --crashed         List all services that have crashed.

     -f, --format          Select a format for the output. Currently, the only
                           one that can be specified is ini, which outputs in
                           *.ini format.

     -l, --list            List all defined runlevels.

     -m, --manual          Show all manually started services.

     -r, --runlevel        Print the current runlevel name.

     -S, --supervised      Show all supervised services.

     -s, --servicelist     Show all services.

     -u, --unused          Show services not assigned to any runlevel.

     -C, --nocolor         Disable color output.

     runlevel              Show information only for the named runlevel.
```

Sudah sangat jelas yaa, **rc-status** kita gunakan untuk melihat service status.

Kalau kita hanya menjalankan tanpa option, akan ditampilkan runlevel default, manual, hotplugged, needed/wanted.

```
$ rc-status
```

```
Runlevel: default
 local                                                                 [  started  ]
 agetty.tty1                                      [  started 2 day(s) 10:15:05 (0) ]
 agetty.tty2                                      [  started 2 day(s) 10:15:05 (0) ]
 ...
 ...
Dynamic Runlevel: hotplugged
Dynamic Runlevel: needed/wanted
 virtlogd                                                              [  started  ]
Dynamic Runlevel: manual
 libvirtd                                                              [  started  ]
```

Kalau ingin melihat service status dari semua runlevel, gunakan option `--all`.


## 7. Direktori Config

Untuk file-file konfigurasi dari init script, dapat dilihat pada direktori **/etc/conf.d/**

Misal,

Untuk konfigurasi dari **dnscrypt-proxy**.

```bash
!filename: /etc/conf.d/dnscrypt-proxy
#rc_use="tor"
#DNSCRYPT_PROXY_OPTS="-config /etc/dnscrypt-proxy/dnscrypt-proxy.toml"
#DNSCRYPT_PROXY_USER="dnscrypt"
#DNSCRYPT_PROXY_GROUP="dnscrypt"
DNSCRYPT_PROXY_USER="root"
DNSCRYPT_PROXY_GROUP="root"
```

Selayaknya file config, isinya berupa variabel-variabel yang akan digunakan di init script.

Kita akan lihat init script dari **dnscrypt-proxy**.

```bash
!filename: /etc/init.d/dnscrypt-proxy
#!/usr/bin/openrc-run

# Copyright 1999-2019 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

command="/usr/bin/dnscrypt-proxy"
command_args="${DNSCRYPT_PROXY_OPTS:--config /etc/dnscrypt-proxy/dnscrypt-proxy.toml}"
command_user="${DNSCRYPT_PROXY_USER:-dnscrypt}:${DNSCRYPT_PROXY_GROUP:-dnscrypt}"
pidfile="/run/${RC_SVCNAME}.pid"
retry="SIGTERM/5/SIGTERM/5/SIGKILL/5"
start_stop_daemon_args="--background --make-pidfile"

depend() {
	use logger net
	provide dns
}

# start_pre() {
# 	checkpath -q -d -m 0775 -o "${command_user}" /var/cache/"${RC_SVCNAME}"
# 	checkpath -q -d -m 0775 -o "${command_user}" /var/log/"${RC_SVCNAME}"
# }
```

Nah, teman-teman dapat melihat variabel-variabel pada file config tersebut digunakan pada init script.


# Head to Head Table

| systemd | OpenRC | Description |
| :-- | :-- | :-- |
| <code>systemctl list-units</code> | <code>rc-status</code> | List running services status |
| <code>systemctl --failed</code> | <code>rc-status --crashed</code> | Check failed services |
| <code>systemctl --all</code> | <code>rc-update -v show</code> | Display all available services. |
| <code>systemctl (start, stop, restart, status) daemon.service</code> | <code>rc-service daemon (start, stop, restart, status)</code> | Change service state. |
| <code>systemctl (enable, disable) daemon.service</code> | <code>rc-update (add, del) daemon</code> | Turn service on or off. |
| <code>systemctl daemon-reload</code> | - | Create or modify configuration. |

Sumber: [Arch Wiki: OpenRC - Usage](https://wiki.archlinux.org/index.php/OpenRC#Usage)


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [Gentoo Wiki: OpenRC](https://wiki.gentoo.org/wiki/OpenRC) \
   Diakses tanggal: 2021-01-06

1. [Artix Wiki: OpenRC](https://wiki.artixlinux.org/Main/OpenRC) \
   Diakses tanggal: 2021-01-06

1. [Arch Wiki: OpenRC](https://wiki.archlinux.org/index.php/OpenRC) \
   Diakses tanggal: 2021-01-06

1. [GitHub/OpenRC/openrc: OpenRC Users Guide](https://github.com/OpenRC/openrc/blob/master/user-guide.md) \
   Diakses tanggal: 2021-01-06
