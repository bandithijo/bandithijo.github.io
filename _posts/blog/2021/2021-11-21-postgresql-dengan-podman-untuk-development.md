---
layout: 'post'
title: "Mudah Banget! Pasang PostgreSQL dengan Podman untuk Development"
date: '2021-11-21 15:06'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Database', 'PostgreSQL', 'Podman', 'Container']
pin:
hot:
contributors: []
description: "Memasang service database seperti PostgreSQL merupakan sebuah tantangan tersendiri di setiap distribusi sistem operasi GNU/Linux. Yang merepotkan, terkadang cara yang sebelumnya kita lakukan berhasil, namun tidak berhasil pada versi distribusi yang terbaru. Sudah saatnya kita gunakan cara modern, khususnya untuk development, yaitu menggunakan kontainerisasi. Catatan kali ini, kita akan menjalankan PostgreSQL service dari container dengan bantuan Podman."
---

# Latar Belakang Masalah

Memasang service database seperti PostgreSQL merupakan sebuah tantangan tersendiri di setiap distribusi sistem operasi GNU/Linux. Karena, setiap distribusi memiliki cara yang berbeda-beda untuk menjalankan PostgreSQL service karena pilihan stack yang digunakan pada masing-masing distribusi biasanya berbeda. Yang merepotkan adalah apabila cara yang sebelumnya kita lakukan berhasil, namun tidak berhasil pada versi distribusi yang terbaru.

# Pemecahan Masalah

Sudah saatnya kita gunakan cara modern, khususnya untuk development, yaitu menggunakan kontainerisasi.

Catatan kali ini, kita akan menjalankan PostgreSQL service dari container dengan bantuan Podman.

Dengan menggunakan container, kita akan mendapatkan kemudahan-kemudahan, diantaranya:

1. Mudah untuk dipasang
2. Mudah untuk mengganti versi
3. Mudah untuk menjalankan dua container dengan service yang sama
4. dan masih banyak lagi

# Instalasi

## Siapkan Podman

Untuk teman-teman yang menggunakan Fedora (saat tulisan ini dibuat, Fedora 35) sudah tersedia Podman secara default.

Untuk yang belum memasang Podman, silahkan merujuk pada [dokumentasi pemasangan Podman](https://podman.io/getting-started/installation).

~~Jalankan service Podman.~~

<pre>
<del>$ sudo systemctl start podman.service</del>
</pre>

~~Cek status apakah sudah berhasil running atau belum.~~

<pre>
<del>$ sudo systemctl status podman.service</del>
</pre>

<pre><del>● podman.service - Podman API Service
     Loaded: loaded (/usr/lib/systemd/system/podman.service; disabled; vendor preset: disabled)
     Active: active (running) since Sun 2021-11-21 19:13:59 WITA; 2s ago
TriggeredBy: ● podman.socket
       Docs: man:podman-system-service(1)
   Main PID: 250724 (podman)
      Tasks: 10 (limit: 9306)
     Memory: 40.0M
     CGroup: /system.slice/podman.service
             └─250724 /usr/bin/podman --log-level=info system service
</del></pre>

~~Kalau sudah `active (running)` , artinya Podman sudah siap digunakan.~~

## Persiapkan PostgreSQL Image

Sebelum mebuat PostgreSQL container, kita perlu mengunduh PostgreSQL image terlebih dahulu.

Kali ini saya akan menggunakan Official Image dari PostgreSQL 13 yang berada di dari [Docker Hub](https://hub.docker.com/_/postgres).

```
$ podman pull postgres:13
```

Podman akan memberikan beberapa pilihan registry atau repository tempat kita akan mendownload image PostgreSQL.

Saya akan pilih image yang berasal dari docker.io

```
? Please select an image:
    registry.fedoraproject.org/postgres:13
    registry.access.redhat.com/postgres:13
  ▸ docker.io/library/postgres:13
    quay.io/postgres:13
```

Tunggu proses download image PostgreSQL selesai.

```
✔ docker.io/library/postgres:13
Trying to pull docker.io/library/postgres:13...
Getting image source signatures
Copying blob d25d54a3ac3a skipped: already exists
Copying blob c43dfd845683 skipped: already exists
Copying blob 7d63c13d9b9b skipped: already exists
Copying blob ff74a7a559cb skipped: already exists
Copying blob bbc6df00588c skipped: already exists
Copying blob e554331369f5 skipped: already exists
Copying blob d4deb2e86480 skipped: already exists
Copying blob cad0f9d5f5fe skipped: already exists
Copying blob 4e6d0469c332 done
Copying blob 3d03efa70ed1 done
Copying blob 3cc7074f2000 done
Copying blob 645312b7d892 done
Copying blob d4132927c0d9 done
Copying config 113197da03 done
Writing manifest to image destination
Storing signatures
113197da0347a82925486217beece0386a4de3b4aa3a34e53a20c988606ffa96
```

Kalau sudah selesai, kita bisa melakukan pengecekan dengan,

```
$ podman images
```

```
REPOSITORY                  TAG         IMAGE ID      CREATED      SIZE
docker.io/library/postgres  13        113197da0347  3 weeks ago  379 MB
```

> INFO
> 
> Kalau ingin menghapus image,
> 
> ```
> $ podman image rm <nama_image/image_ID>
> ```
> 
> ```
> $ podman image rm postgres:13
> ```
> 
> Pastikan sudah tidak ada container yang menggunakan image yang ingin dihapus. Karena proses image remove akan gagal apabila masih ada container yang menggunakan image tersebut.

## Persiapkan Direktori untuk Mounted Volume

Saya ingin membuat data yang ada di dalam container dapat terus digunakan. Maka, saya memilih menggunakan mounted volume agar data yang ada di dalam container dapat disimpan di system.

Saya akan simpan pada direktori `$HOME/Podman/postgresql/data/`.

```
📂 $HOME/
└ 📂 Podman/
  └ 📂 postgresql/
    └ 📁 data/
```

## Buat PostgreSQL Container

Untuk membuat PostgreSQL container dengan praktis, saya menggunakan perintah,

```
$ podman run --name postgres --net host -e POSTGRES_PASSWORD=postgres -v ~/Podman/postgresql/data:/var/lib/postgresql/data:Z -d library/postgres:13
```

`--name postgres`, container ini saya beri nama **postgres**.

`--net host`, saya menggunakan network yang sama dengan host.

`-e POSTGRES_PASSWORD=postgres`, environment variable default password untuk PostgreSQL, `POSTGRES_PASSWORD` wajib digunakan.

`-v ~/Podman/postgresql/data:/var/lib/postgresql/data:Z`, mounted volume yang saya gunakan (source:target). `:Z` option indicates that the bind mount content is private and unshared.

`-d`, menandakan kita akan menjadikan container ini sebagai daemon.

`library/postgresql:13`, adalah container image yang akan kita buat dan jalankan.

Setelah *command* di atas dieksekusi, kalau outputnya berupa hash,

```
2b32fd1a84497e4ef1970c32dc16004123f27a9ebf24f4596a79c027e4fdacaf
```

Dan bukan pesan error, berarti container berhasil dibuat.

Sekarang kita periksa, apakah continer berhasill *running* atau tidak.

```
$ podman ps -a
```

```
CONTAINER ID  IMAGE                          COMMAND     CREATED        STATUS            PORTS       NAMES
2b32fd1a8449  docker.io/library/postgres:13  postgres    3 seconds ago  Up 4 seconds ago              postgres
```

Lihat pada kolom STATUS, **Up 4 seconds ago**, berarti sudah berhasil *running*.

Tahap pembuatan container sudah berhasil.

## Akses PostgreSQL Shell

Biasanya, untuk mengakses PostgreSQL shell, kita memerlukan tools yang bernama `psql`. Namun, karena host sistem yang kita gunakan tidak perlu memasang paket PostgreSQL client/server, maka kita tidak akan menemukan `psql`.

Untuk mengakses PostgreSQL shell yang berada di dalam container dari host, kita dapat menggunakan,

```
$ podman exec -ti postgres psql -U postgres
```

`podman exec`, digunakna untuk execute the specified command inside a running container.

`-t`, kependekan dari `--tty`, allocate a pseudo-TTY. The default is false.

`-i`, kependekan dari `--interactive`, keep STDIN open even if not attached.

`postgres`, adalah nama PostgreSQL container yang sedang *running*.

`psql -U postgres`, adalah untuk masuk ke PostgreSQL shell dengan user **postgres** (default user).

Kalau berhasil, kita akan masuk ke dalam PostgreSQL shell,

```
psql (13 (Debian 13-4.pgdg110+1))
Type "help" for help.

postgres=# █
```

## Buat PostgreSQL user untuk host username

Tujuannya membuat PostgreSQL user dengan nama yang sama dengan username yang kita gunakan pada host adalah agar kita tidak perlu melakukan authentikasi untuk mengakses PostgreSQL shell.

> PERHATIAN!
> 
> Saya menggunakan nama user **bandithijo**, silahkan sesuaikan dengan milik teman-teman, samakan dengan username dari host yang digunakan.

```
postgres=# CREATE USER bandithijo SUPERUSER CREATEDB;
```

Perintah di atas berarti, saya membuat user **bandithijo** dengan role berupa **SUPERUSER** dan **CREATEDB**.

> INFO
> 
> Untuk mengecek daftar user pada PostgreSQL,
> 
> ```
> postgres=# \du
> ```
> 
> ```
>                                     List of roles
>  Role name  |                         Attributes                         | Member of
> ------------+------------------------------------------------------------+-----------
>  bandithijo | Superuser, Create DB                                       | {}
>  postgres   | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
> ```

Kita juga perlu membuat database dengan nama yang sama dengan nama user.

```
postgres=# CREATE DATABASE bandithijo OWNER bandithijo;
```

> INFO
> 
> Untuk mengecek apakah database telah berhasil dibuat,
> 
> ```
> postgres=# \l
> ```
> 
> ```
>                                              List of databases
>         Name       |   Owner    | Encoding |  Collate   |   Ctype    |   Access privileges
> -------------------+------------+----------+------------+------------+-----------------------
>  bandithijo        | bandithijo | UTF8     | en_US.utf8 | en_US.utf8 |
>  postgres          | postgres   | UTF8     | en_US.utf8 | en_US.utf8 |
>  template0         | postgres   | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
>                    |            |          |            |            | postgres=CTc/postgres
>  template1         | postgres   | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
>                    |            |          |            |            | postgres=CTc/postgres
> (8 rows)
> ```

Exit dengan,

```
postgres=# \q
```

Sekarang, coba masuk ke PostgreSQL shell dengan user yang baru saja kita buat.

```
$ podman exec -it postgres psql -U bandithijo
```

Kalau berhasil, maka prompt nya akan menunjukkan nama user **bandithijo**.

```
psql (13 (Debian 13-4.pgdg110+1))
Type "help" for help.

bandithijo=# █
```

# Troubleshooting

## 1. Connection on Unix Domain Socket

Ketika menjalankan perintah,

```
$ podman exec -ti postgres psql -U bandithijo
```


Kalau teman-teman mendapatkan error seperti ini,

```
could not connect to server: No such file or directory
        Is the server running locally and accepting
        connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

Coba test jalankan,

```
$ podman exec -ti postgres psql -h localhost -p 5432 -U bandithijo
```

\* Ganti user **bandithijo** dengan user kalian.

Kalau bisa masuk ke PostgreSQL shell, berarti tinggal mendefinisikan **PGHOST** sebagai **localhost** ke dalam file shell rc (`.zshrc`, `.bashrc`, `.bash_profile`, atau yang lain).

```bash
!filename: $HOME/.zshrc
export PGHOST=localhost
```

Kemudian restart shell,

```
$ exec $SHELL
```

# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)

# Referensi

1. [Memasang PostgreSQL dengan Docker untuk Local Development](https://bandithijo.github.io/blog/postgresql-dengan-docker-untuk-local-development)
<br>Diakses tanggal: 2021/11/21

2. [https://docs.podman.io/en/latest/Introduction.html](https://docs.podman.io/en/latest/Introduction.html)
<br>Diakses tanggal: 2021/11/21

3. [Mencoba Bermain Container dengan Podman di Fedora (Bitnami/Postgresql)](https://bandithijo.github.io/v2/blog/mencoba-bermain-container-dengan-podman-di-fedora-bitnami-postgresql)
<br>Diakses tanggal: 2021/11/21
