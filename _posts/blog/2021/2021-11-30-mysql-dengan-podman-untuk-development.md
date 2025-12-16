---
layout: "post"
title: "Mudah Banget! Pasang MySQL dengan Podman untuk Development"
date: "2021-11-30 14:22"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2021/2021-11-30-mysql-dengan-podman-untuk-development"
author: "BanditHijo"
category: "blog"
tags: ["database", "mysql", "podman", "container"]
description: "Memasang service database seperti MySQL merupakan sebuah tantangan tersendiri di setiap distribusi sistem operasi GNU/Linux. Yang merepotkan, terkadang cara yang sebelumnya kita lakukan berhasil, namun tidak berhasil pada versi distribusi yang terbaru. Sudah saatnya kita gunakan cara modern, khususnya untuk development, yaitu menggunakan kontainerisasi. Catatan kali ini, kita akan menjalankan MySQL service dari container dengan bantuan Podman."
---

## Latar Belakang Masalah

Kalau kemarin kita sudah membahas [**Mudah Banget! Pasang PostgreSQL dengan Podman untuk Development**](/blog/postgresql-dengan-podman-untuk-development), kali ini kita akan bahasa untuk MySQL.

Memasang service database seperti MySQL merupakan sebuah tantangan tersendiri di setiap distribusi sistem operasi GNU/Linux. Karena, setiap distribusi memiliki cara yang berbeda-beda untuk menjalankan MySQL service karena pilihan stack yang digunakan pada masing-masing distribusi biasanya berbeda. Yang merepotkan adalah apabila cara yang sebelumnya kita lakukan berhasil, namun tidak berhasil pada versi distribusi yang terbaru.

## Pemecahan Masalah

Sudah saatnya kita gunakan cara modern, khususnya untuk development, yaitu menggunakan kontainerisasi.

Catatan kali ini, kita akan menjalankan MySQL service dari container dengan bantuan Podman.

Dengan menggunakan container, kita akan mendapatkan kemudahan-kemudahan, diantaranya:

1. Mudah untuk dipasang
2. Mudah untuk mengganti versi
3. Mudah untuk menjalankan dua container dengan service yang sama
4. dan masih banyak lagi

## Instalasi

### Siapkan Podman

Untuk teman-teman yang menggunakan Fedora (saat tulisan ini dibuat, Fedora 35) sudah tersedia Podman secara default.

Untuk yang belum memasang Podman, silahkan merujuk pada [dokumentasi pemasangan Podman](https://podman.io/getting-started/installation).


### Persiapkan MySQL Image

Sebelum mebuat MySQL container, kita perlu mengunduh MySQL image terlebih dahulu.

Kali ini saya akan menggunakan Official Image dari MySQL 8 yang berada di dari [Docker Hub](https://hub.docker.com/_/mysql).

```
$ podman pull mysql:8
```

Podman akan memberikan beberapa pilihan registry atau repository tempat kita akan mendownload image MySQL.

Saya akan pilih image yang berasal dari docker.io

```
? Please select an image:
    registry.fedoraproject.org/mysql:8
    registry.access.redhat.com/mysql:8
  ▸ docker.io/library/mysql:8
    quay.io/mysql:8
```

Tunggu proses download image MySQL selesai.

```
✔ docker.io/library/mysql:8
Trying to pull docker.io/library/mysql:8...
Getting image source signatures
Copying blob d25d54a3ac3a done
Copying blob c43dfd845683 done
Copying blob 7d63c13d9b9b done
Copying blob ff74a7a559cb done
Copying blob bbc6df00588c done
Copying blob e554331369f5 done
Copying blob d4deb2e86480 done
Copying blob cad0f9d5f5fe done
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
docker.io/library/mysql     8           b05128b000dd  12 days ago  521 MB
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
> $ podman image rm mysql:8
> ```
> 
> Pastikan sudah tidak ada container yang menggunakan image yang ingin dihapus. Karena proses image remove akan gagal apabila masih ada container yang menggunakan image tersebut.

### Persiapkan Direktori untuk Mounted Volume

Saya ingin membuat data yang ada di dalam container dapat terus digunakan. Maka, saya memilih menggunakan mounted volume agar data yang ada di dalam container dapat disimpan di system.

Saya akan simpan pada direktori `$HOME/Podman/mysql/data/`.

```
📁 $HOME/
└ 📁 Podman/
  └ 📁 mysql/
    └ 📁 data/
```

### Buat MySQL Container

Untuk membuat MySQL container dengan praktis, saya menggunakan perintah,

```
$ podman run --name mysql --net host -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -v ~/Podman/mysql/data:/var/lib/mysql:Z -d library/mysql:8
```

`--name mysql`, container ini saya beri nama **mysql**.

`--net host`, saya menggunakan network yang sama dengan host.

`-e MYSQL_ALLOW_EMPTY_PASSWORD=yes`, environment variable untuk menginjinkan akun MySQL tanpa password.

`-v ~/Podman/mysql/data:/var/lib/mysql:Z`, mounted volume yang saya gunakan (source:target). `:Z` option indicates that the bind mount content is private and unshared.

`-d`, menandakan kita akan menjadikan container ini sebagai daemon.

`library/mysql:8`, adalah container image yang akan kita buat dan jalankan.

Setelah *command* di atas dieksekusi, kalau outputnya berupa hash,

```
d19e10ce9ac07ba6754c8acfda77ca03f893737639c949c4bc322e061c6719c2
```

Dan bukan pesan error, berarti container berhasil dibuat.

Sekarang kita periksa, apakah continer berhasill *running* atau tidak.

```
$ podman ps -a
```

```
CONTAINER ID  IMAGE                          COMMAND     CREATED        STATUS            PORTS       NAMES
d19e10ce9ac0  docker.io/library/mysql:8      mysqld      3 seconds ago  Up 4 seconds ago              mysql
```

Lihat pada kolom STATUS, **Up 3 seconds ago**, berarti sudah berhasil *running*.

Tahap pembuatan container sudah berhasil.

### Akses MySQL Shell

Biasanya, untuk mengakses MySQL shell, kita memerlukan tools yang bernama `mysql`. Namun, karena host sistem yang kita gunakan tidak perlu memasang paket MySQL client/server, maka kita tidak akan menemukan `mysql`.

Untuk mengakses MySQL shell yang berada di dalam container dari host, kita dapat menggunakan,

```
$ podman exec -it mysql mysql -u root
```

`podman exec`, digunakna untuk execute the specified command inside a running container.

`-t`, kependekan dari `--tty`, allocate a pseudo-TTY. The default is false.

`-i`, kependekan dari `--interactive`, keep STDIN open even if not attached.

`mysql`, adalah nama MySQL container yang sedang *running*.

`mys -u root`, adalah untuk masuk ke MySQL shell dengan user **root** (default user).

Tidak perlu menggunakan `-p` (password) karena ketika membuat container, kita tidak mendefinisikan `MYSQL_ROOT_PASSWORD` dan juga menginjinkan `MYSQL_ALLOW_EMPTY_PASSWORD=yes`.

Kalau berhasil, kita akan masuk ke dalam MySQL shell,

```
Your MySQL connection id is 20
Server version: 8.0.27 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> _
```

### Perlu membuat MySQL user?

Tidak perlu.

Biasanya pada **development environment**, MySQL account yang digunakan adalah **root**.

Sebagai contoh, contoh konfigurasi file `config/database.yml` untuk Rails app yang baru digenerate, akan seperti ini.

```yaml
!filename: config/database.yml
# MySQL. Versions 5.5.8 and up are supported.
#
# Install the MySQL driver
#   gem install mysql2
#
# Ensure the MySQL gem is defined in your Gemfile
#   gem 'mysql2'
#
# And be sure to use new-style password hashing:
#   https://dev.mysql.com/doc/refman/5.7/en/password-hashing.html
#
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password:
  host: localhost

development:
  <<: *default
  database: blog_devika_development

# ...
```

Perhatikan pada baris ke 16, **username** secara default digenerate menggunakan **root**.

Karena catatan ini ditujukan untuk development environment, pembuatan user selain root tidak akan saya bahas.

## Ganti nilai host localhost jadi 127.0.0.1

Apabila terdapat variable **host** bernilai **localhost**, ganti dengan **127.0.0.1**

Tujuannya agar MySQL service dapat diakses dari Host.

Kalau tidak diganti, kita akan menemukan *error* semacam,

```
Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)
```

<br>
Selesai!


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [https://hub.docker.com/\_/mysql](https://hub.docker.com/_/mysql) \
   Diakses tanggal: 2021-11-30
