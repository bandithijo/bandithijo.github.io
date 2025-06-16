---
layout: 'post'
title: "Memasang PostgreSQL dengan Docker untuk Local Development"
date: '2021-01-12 09:29'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Docker', 'PostgreSQL']
pin:
hot:
contributors: []
description: "Saya sedang memanfaatkan docker untuk memasang beberapa komponen-komponen pendukuk web development. Kali ini, yang saya coba pasang adalah PostgreSQL."
---

> PERHATIAN!
> 
> Cara yang akan saya tunjukkan pada catatan kali ini **hanya dilakukan pada level local development**.
> 
> **Sebaiknya tidak diterapkan pada level production, karena berkaitan dengan security** (dalam hal akses data).


# Latar Belakang Masalah

Saya sedang mencoba untuk memanfaatkan docker untuk memasang beberapa komponen-komponen pendukung web development.

Kali ini, yang saya coba pasang adalah PostgreSQL.


# Sekenarion Masalah

PostgreSQL akan memberikan layanan dari Docker container.

Yang selama ini saya lakukan adalah, memasang PostgreSQL di sistem saya kemudian mengkonfigurasinya.

Untuk mengkonfigurasi PostgreSQL di Arch Linux untuk tujuan local Development memang sangat mudah sekali.

Tinggal merujuk ke Arch Wiki, dan proses inisialisasi dan konfigurasi awal sudah dijelaskan dan sudah berkali-kali saya coba dan berhasil.


# Tujuan Mencari Masalah

1. Mempelajari Docker
2. Mencari workflow yang fleksible dengan memanfaatkan Docker


# Eksekusi Masalah


## 1. Mematikan PostgreSQL Service

Kalau kita sudah memiliki PostgreSQL service yang berjalan, sebaiknya kita hentikan dahulu.

**systemd**

```
$ sudo systemctl stop postgresql.service
```

**OpenRC**

```
$ sudo rc-service postgresql stop
```


## 2. Pulling PostgreSQL Docker Image

Untuk versi, pada contoh kali ini saya akan menggunakan tag **13.1**.

```
$ docker pull postgres:13.1
```

Untuk tak yang lain, teman-teman dapat merujuk ke [**Docker Hub: Postgres**](https://hub.docker.com/_/postgres?tab=tags).

Setelah selesai, bisa cek images dulu untuk memastikan.

```
$ docker images
```

```
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
postgres     13.1      1f1bd4302537   13 days ago   314MB
```

Sip.


## 3. Create Container

Saatnya membuat container.

Saya menggunakan cara praktis saja untuk melakukan instansiasi dari image dengan option **dockern run**.

```
$ docker run \
--name postgres \
-p 5432:5432 \
-v /var/run/postgresql:/var/run/postgresql \
-e POSTGRES_PASSWORD=postgres \
-d postgres:13.1
```

Teman-teman dapat memodifikasi bagian:

`--name postgres` & `-e POSTGRES_PASSWORD=postgres`, sesuai dengan preferensi teman-teman.

`-d postgres:13.1`, sesuaikan dengan image, yang kalian gunakan.

`-p 5432:5432`, saya menggunakan port yang biasa digunakan oleh postgresql service.

> PERHATIAN!
> 
> Saya memang sengaja menggunakan volume `-v` yang berlokasi di `/var/run/postgresql:/var/run/postgresql`
> 
> Tujuannya agar dapat diakses oleh Host dengan Unix Domain Socket.
> 
> Bagian inilah yang saya katakan tadi, **jangan digunakan pada level production**.

Cek status container apakah sudah berhasil dibuat dan dijalankan.

```
$ docker container ls
```

```
CONTAINER ID   IMAGE           COMMAND                  CREATED       STATUS       PORTS                    NAMES
dc005b14dab0   postgres:13.1   "docker-entrypoint.s…"   2 hours ago   Up 1 second   0.0.0.0:5432->5432/tcp   postgres
```

Sip, sudah berhasil dijalankan.


## 4. Membuat User

Proses pembuatan container pada langkah ketiga di atas, juga secara otomatis akan membuatkan kita user bernama `postgres` dengan database yang juga bernama `postgres`.

Berdasarkan keterangan dari [**Arch Wiki: Create your first database/user**](https://wiki.archlinux.org/index.php/PostgreSQL#Create_your_first_database/user),

> **Tip**: If you create a PostgreSQL user with the same name as your Linux username, it allows you to access the PostgreSQL database shell without having to specify a user to login (which makes it quite convenient).

Gimana? Cocok untuk local development environment bukan?

Kalau kita membuat user role yang bernama sama dengan user yang kita gunakan di sistem, kita tidak perlu repot-repot dengan authentication process.

Misal, username sistem saya **bandithijo**, maka untuk menikmati kemudahan di atas, saya perlu membuat user role dengan nama **bandithijo**.

Masuk dengan user role **postgres** terlebih dahulu,

```
$ psql -h localhost -p 5432 -U postgres
```

```
Password for user postgres: _
```

Masukkan password untuk role **postgres**, dengan password yang sudah kita definisikan pada proses pembuatan container di atas. `-e POSTGRES_PASSWORD=postgres`.

Artinya password role **postgres** saya adalah `postgres`.

Kalau berhasil, kita akan dibawa ke psql shell.

```
psql (13.1)
Type "help" for help.

postgres=# _
```

Saatnya membuat user role dengan nama yang sama dengan username sistem kita.

```
postgres=# CREATE USER bandithijo SUPERUSER CREATEDB;
```

Saya juga memberikan role berupa **SUPERUSER** dan **CREATEDB**.

Cek apakah sudah terdaftar, dengan perintah:

```
postgres=# \du
```

```
                                    List of roles
 Role name  |                         Attributes                         | Member of
------------+------------------------------------------------------------+-----------
 bandithijo | Superuser, Create DB                                       | {}
 postgres   | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

Sip, sudah terdaftar.

Kemudian, buat database dengan nama yang sama dengan nama user role kita.

```
postgres=# CREATE DATABASE bandithijo OWNER bandithijo;
```

Cek apakah database berhasil dibuat, dengan perintah:

```
postgres=# \l
```

```
                                             List of databases
        Name       |   Owner    | Encoding |  Collate   |   Ctype    |   Access privileges
-------------------+------------+----------+------------+------------+-----------------------
 bandithijo        | bandithijo | UTF8     | en_US.utf8 | en_US.utf8 |
 postgres          | postgres   | UTF8     | en_US.utf8 | en_US.utf8 |
 template0         | postgres   | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
                   |            |          |            |            | postgres=CTc/postgres
 template1         | postgres   | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
                   |            |          |            |            | postgres=CTc/postgres
(8 rows)
```

Mantap.


## 5. Pengujian

Sekarang tinggal ditest saja.

Kita akan masuk psql shell lagi dengan user role yang baru saja kita buat.

Tapi tidak dengan menggunakan option apa-apa.

```
$ psql
```

Kalau berhasil, akan langsung masuk ke dalam database user role kita.

```
psql (13.1)
Type "help" for help.

bandithijo=# _
```

Nah, hal tersebut yang dimaksudkan oleh **tips** dari Arch Wiki di atas.

Dengan begini, kita tidak perlu mengkonfigurasi apa-apa (hostname, port, username, password) di setiap konfigurasi database dari web app yang kita gunakan.

Cukup *convenient* bukan?

Tapi, jangan digunakan pada level production yaa.


# Troubleshooting


## 1. Connection on Unix Domain Socket

Ketika menjalankan perintah,

```
$ psql
```

Jika mendapatkan error seperti ini,

```
could not connect to server: No such file or directory
        Is the server running locally and accepting
        connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

 Kita bisa atas dengan cara yang sedikit kotor.

Yaitu dengan membuatkan simbolik link.

```
$ sudo ln -sf /var/run/postgresql/.s.PGSQL.5432 /tmp
```

Coba test jalankan,

```
$ psql -h localhost -p 5432 -U bandithijo
```

\* Ganti user **bandithijo** dengan user kalian.

Kalau bisa masuk ke psql shell, berarti tinggal mendefinisikan **PGHOST** sebagai **localhost**.

Bisa di file shell rc.

```bash
!filename: $HOME/.zshrc
export PGHOST=localhost
```

Kemudian restart shell,

```
$ exec $SHELL
```


# Tambahan


## 1. Mengcopy/Backup Postgres data Direktori dari Container ke Host

Mungkin kita ingin melakukan backup data yang ada di dalam postgres container.

Postgres container yang kita buat, menyimpan data pada direktori **/var/lib/postgresql/data/**.

Kita bisa melakukan pengecekan dengan menggunakan perintah,

```
$ sudo -iu postgres psql
```

Kalau berhasil, nanti akan dibawa masuk ke dalam psql shell.

```
psql (13.1)
Type "help" for help.

postgres=# _
```

Jalankan perintah di bawah ini untuk melihat lokasi dari direktori data.

```
postgres=# SHOW data_directory;
```

```
      data_directory
--------------------------
 /var/lib/postgresql/data
(1 row)
```

Nah, lokasi dari direktori data sudah ketemu.

Tentunya lokasi ini bukan lokasi yang ada pada Host sistem kita, melainkan lokasi yang ada pada postgres coontainer.

> INFO
> 
> Lokasi ini sedikit berbeda dengan postgres yang kita pasang pada Arch Linux, yang berlokasi di **/var/lib/postgres/data/**.

Lihat nama atau container_id, dari postgres container yang mau dicopy datanya.

```
$ docker container ls
```

```
CONTAINER ID   IMAGE           COMMAND                  CREATED       STATUS          PORTS                    NAMES
dc005b14dab0   postgres:13.1   "docker-entrypoint.s…"   2 hours ago   Up 34 minutes   0.0.0.0:5432->5432/tcp   postgres
```

Bisa gunakan container id atau nama container.

Agar praktis, saya gunaka nama container dan saya akan letakkan di direktori HOME.

```
$ docker cp postgres:/var/lib/postgresql/data $HOME
```

Kalau berhasil,

```
total 188
drwx------ base
drwx------ global
drwx------ pg_commit_ts
drwx------ pg_dynshmem
-rw------- pg_hba.conf
-rw------- pg_ident.conf
drwx------ pg_logical
drwx------ pg_multixact
drwx------ pg_notify
drwx------ pg_replslot
drwx------ pg_serial
drwx------ pg_snapshots
drwx------ pg_stat
drwx------ pg_stat_tmp
drwx------ pg_subtrans
drwx------ pg_tblspc
drwx------ pg_twophase
-rw------- PG_VERSION
drwx------ pg_wal
drwx------ pg_xact
-rw------- postgresql.auto.conf
-rw------- postgresql.conf
-rw------- postmaster.opts
-rw------- postmaster.pid
```


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)
<br>Diakses tanggal: 2021/01/12

2. [wiki.archlinux.org/index.php/PostgreSQL](https://wiki.archlinux.org/index.php/PostgreSQL)
<br>Diakses tanggal: 2021/01/12

3. [digitalocean.com/community/tutorials/how-to-move-a-postgresql-data-directory-to-a-new-location-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-move-a-postgresql-data-directory-to-a-new-location-on-ubuntu-16-04)
<br>Diakses tanggal: 2021/01/13
