---
layout: "post"
title: "Setup WordPress Multisite"
date: "2026-01-13 06:28"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-01-13-setup-wordpress-multisite"
author: "BanditHijo"
category: "blog"
tags: ["wordpress"]
description: "WordPress Multisite adalah fitur bawaan WordPress yang memungkinkan Anda untuk membuat dan mengelola beberapa situs web dari satu instalasi WordPress. Fitur ini sangat berguna bagi mereka yang ingin mengelola jaringan situs web, seperti blog jaringan, situs klien, atau situs dengan subdomain atau subdirektori. Dalam catatan ini, saya akan mendokumentasikan langkah-langkah untuk mengatur WordPress Multisite."
---

## Prerequisites

`wordpress 6.x`


## Pendahuluan

{{ page.description }}


## Instalasi

Ada beberapa tahapan proses instalasi WordPress Multisite.


### Aktifkan Fitur Multisite

Edit file `wp-config.php` pada instalasi WordPress, dan cari bagian `/* That's all, stop editing! Happy publishing. */`. Tambakan kode berikut tepat sebelum baris tersebut.

```php
!filename: wp-config.php
/* Multisite enable */
define( 'WP_ALLOW_MULTISITE', true );

/* That's all, stop editing! Happy publishing. */
```

Setelah menambahkan kode tersebut, simpan perubahan pada file `wp-config.php`.


### Akses Menu Network Setup

Pada bagian WordPress Admin Dashboard, Anda akan melihat pada menu **Tools** terdapat submenu baru bernama **Network Setup**.

![Gambar 1]({{ page.assets }}/gambar_01.png)

Gambar 1. Sebelum mengaktifkan fitur Multisite

![Gambar 2]({{ page.assets }}/gambar_02.png)

Gambar 2. Setelah mengaktifkan fitur Multisite

Kemudian, coba refresh halaman admin dashboard WordPress Anda untuk memastikan bahwa fitur Multisite telah diaktifkan dengan benar.

![Gambar 3]({{ page.assets }}/gambar_03.png)

Gambar 3. Halaman Network Setup

Karena saya membuat di localhost, maka yang direkomendasikan adalah menggunakan subdirektori.

Selain subdirektori sebenarnya ada pilihan subdomain, namun untuk menggunakan subdomain di localhost perlu konfigurasi tambahan pada server lokal. Jadi saya pakai subdirektori saja.

> INFO
> 
> Jika bukan di localhost, di halaman Network Setup, sebenarnya akan diminta untuk mengkonfigurasi jaringan multisite dengan pilihan apakah ingin menggunakan subdomain (site1.example.com) atau subdirektori (example.com/site1).

Setelah menentukan **Network Title** dan **Network Admin Email**, klik tombol **Install** untuk melanjutkan proses instalasi.


### Update File Konfigurasi

![Gambar 4]({{ page.assets }}/gambar_04.png)

Gambar 4. Konfigurasi tambahan setelah instalasi Multisite untuk dipasang di `wp-config.php` dan `.htaccess`

Setelah mengkonfigurasi jaringan, WordPress akan memberikan beberapa kode yang perlu ditambahkan ke file `wp-config.php` dan `.htaccess`. Tambahkan kode tersebut sesuai petunjuk yang diberikan.

```php
!filename: wp-config.php
/* Multisite enable */
define( 'WP_ALLOW_MULTISITE', true );

/* Multisite settings */
define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', false );
define( 'DOMAIN_CURRENT_SITE', 'localhost' );
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );

/* That's all, stop editing! Happy publishing. */
```

```apache
!filename: .htaccess

# BEGIN WordPress
# The directives (lines) between "BEGIN WordPress" and "END WordPress" are
# dynamically generated, and should only be modified via WordPress filters.
# Any changes to the directives between these markers will be overwritten.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]

# add a trailing slash to /wp-admin
RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin$ $1wp-admin/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(wp-(content|admin|includes).*) $2 [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(.*\.php)$ $2 [L]
RewriteRule . index.php [L]
</IfModule>

# END WordPress
```

Setelah ditambahkan, simpan perubahan pada kedua file tersebut.

Kemudian, tekan link "Log in" di pojok kiri bawah halaman tersebut untuk masuk kembali ke dashboard admin WordPress.

Setelah login kembali, akan terdapat menu **My Sites** di bagian atas dashboard admin WordPress, yang menunjukkan bahwa jaringan multisite telah berhasil dikonfigurasi.

![Gambar 5]({{ page.assets }}/gambar_05.png)

Gambar 5. Menu My Sites di dashboard admin WordPress

![Gambar 6]({{ page.assets }}/gambar_06.png)

Gambar 6. WordPress Network Admin Dashboard

![Gambar 7]({{ page.assets }}/gambar_07.png)

Gambar 7. Daftar situs di WordPress Multisite

![Gambar 8]({{ page.assets }}/gambar_08.png)

Gambar 8. Plugin Install di WordPress Multisite. Bisa mengaktifkan untuk semua situs dengan "Network Activate"

Selesai!


## Referensi

1. [WordPress: WordPress Multisite / Network](https://developer.wordpress.org/advanced-administration/multisite/) \
  Tanggal diakses: 2026-01-13

1. [YouTube/WordPress: Setting up a WordPress multisite network](https://www.youtube.com/watch?v=NjYPQQq67MM) \
  Tanggal diakses: 2026-01-13
