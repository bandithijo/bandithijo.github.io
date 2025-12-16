---
layout: "post"
title: "Konfigurasi DNSCrypt-Proxy di macOS"
date: "2025-12-11 22:13"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2025/2025-12-11-konfigurasi-dnscrypt-proxy-di-macos"
author: "BanditHijo"
category: "blog"
tags: ["dnscrypt"]
description: "DNSCrypt-Proxy adalah aplikasi open source yang berfungsi untuk mengenkripsi lalu lintas DNS antara perangkat kita dengan server DNS."
---

## Tentang DNSCrypt-Proxy

DNSCrypt-Proxy adalah aplikasi open source yang berfungsi untuk mengenkripsi lalu lintas DNS antara perangkat kita dengan server DNS. Dengan menggunakan DNSCrypt-Proxy, kita dapat meningkatkan privasi dan keamanan saat melakukan resolusi nama domain.

Secara default, DNSCrypt-Proxy sudah menyertakan berbagai server DNS yang mendukung protokol DNSCrypt dan DoH (DNS over HTTPS). Kita dapat memilih server DNS yang diinginkan sesuai kebutuhan.

Daftar publik server DNS yang didukung oleh DNSCrypt-Proxy dapat ditemukan di sini, [DNSCrypt Public Servers](https://dnscrypt.info/public-servers/).


## Cara kerja DNSCrypt-Proxy

DNSCrypt-Proxy bekerja dengan cara mengalihkan permintaan DNS dari sistem operasi ke server DNS yang mendukung protokol DNSCrypt atau DoH. Proses ini melibatkan beberapa langkah berikut:

1. **Permintaan DNS**: Ketika aplikasi atau sistem operasi mengirimkan permintaan DNS, DNSCrypt-Proxy menangkap permintaan tersebut.
2. **Enkripsi**: DNSCrypt-Proxy mengenkripsi permintaan DNS menggunakan protokol DNSCrypt atau DoH.
3. **Pengiriman ke Server DNS**: Permintaan yang telah dienkripsi dikirimkan ke server DNS yang dipilih.
4. **Penerimaan Respon**: Server DNS memproses permintaan dan mengirimkan respon yang telah dienkripsi kembali ke DNSCrypt-Proxy.
5. **Dekripsi**: DNSCrypt-Proxy mendekripsi respon yang diterima.
6. **Pengiriman ke Aplikasi**: Respon yang telah didekripsi dikirimkan kembali ke aplikasi atau sistem operasi yang melakukan permintaan DNS.


## Instalasi DNSCrypt-Proxy di macOS

Untuk menginstal DNSCrypt-Proxy di macOS, saya menggunakan [Homebrew](https://brew.sh/).

```
$ brew install dnscrypt-proxy
```

Setelah instalasi selesai, kita dapat memeriksa versi DNSCrypt-Proxy yang terpasang dengan perintah berikut:

```
$ dnscrypt-proxy -version
```

```
2.1.15
```


## Konfigurasi DNSCrypt-Proxy

Setelah menginstal DNSCrypt-Proxy, langkah selanjutnya adalah mengkonfigurasi aplikasi ini sesuai kebutuhan kita. File konfigurasi utama DNSCrypt-Proxy terletak di `/usr/local/etc/dnscrypt-proxy/dnscrypt-proxy.toml`. Kita dapat mengedit file ini menggunakan editor teks favorit kita, saya akan menggunakan `nvim`.

```
$ nvim /opt/homebrew/etc/dnscrypt-proxy.toml
```

Dalam file konfigurasi, kita dapat mengatur berbagai opsi seperti server DNS yang akan digunakan, metode enkripsi, dan pengaturan lainnya.

Berikut adalah 2 opsi minimal yang biasa saya ubdah dalam file konfigurasi:

- `server_names`: Daftar server DNS yang akan digunakan. Kita dapat memilih server dari daftar yang tersedia atau menambahkan server kustom.
- `listen_addresses`: Alamat IP dan port yang akan digunakan oleh DNSCrypt-Proxy untuk mendengarkan permintaan DNS.

```toml
!filename: /opt/homebrew/etc/dnscrypt-proxy.toml
##############################################
#                                            #
#        dnscrypt-proxy configuration        #
#                                            #
##############################################

## This is an example configuration file.
## You should adjust it to your needs, and save it as "dnscrypt-proxy.toml"
##
## Online documentation is available here: https://dnscrypt.info/doc

# ...

## List of servers to use
# ...
server_names = ['cloudflare', 'quad9-dnscrypt-ip4-filter-pri']

## List of local addresses and ports to listen to. Can be IPv4 and/or IPv6.
# ...
listen_addresses = ['127.0.0.1:53', '[::1]:53']
```

Setelah melakukan perubahan pada file konfigurasi, simpan dan tutup editor teks.


## Menjalankan DNSCrypt-Proxy

2 hal yang diperlukan untuk menjalankan DNSCrypt-Proxy:

1. run DNSCrypt-Proxy service
1. set local DNS ke 127.0.0.1


### Menjalankan DNSCrypt-Proxy secara manual

Sebelum menjalankan DNSCrypt-Proxy sebagai background service, saya akan mencoba menjalankannya secara manual di terminal untuk memastikan konfigurasi sudah benar.

Saya menjalankan DNSCrypt-Proxy dengan perintah berikut:

```
$ sudo dnscrypt-proxy -config /opt/homebrew/etc/dnscrypt-proxy.toml
```

```
[2025-12-13 19:30:31] [NOTICE] dnscrypt-proxy 2.1.15
[2025-12-13 19:30:31] [NOTICE] Using default Weighted Power of Two (WP2) load balancing strategy
[2025-12-13 19:30:31] [NOTICE] Network connectivity detected
[2025-12-13 19:30:31] [NOTICE] Now listening to 127.0.0.1:53 [UDP]
[2025-12-13 19:30:31] [NOTICE] Now listening to 127.0.0.1:53 [TCP]
[2025-12-13 19:30:31] [NOTICE] Now listening to [::1]:53 [UDP]
[2025-12-13 19:30:31] [NOTICE] Now listening to [::1]:53 [TCP]
[2025-12-13 19:30:31] [NOTICE] dnscrypt-proxy service is not usable yet
[2025-12-13 19:30:31] [NOTICE] Resolving server host [raw.githubusercontent.com] using bootstrap resolvers over udp
[2025-12-13 19:30:32] [NOTICE] Source [public-resolvers] loaded
[2025-12-13 19:30:32] [NOTICE] Source [relays] loaded
[2025-12-13 19:30:32] [NOTICE] Firefox workaround initialized
[2025-12-13 19:30:32] [NOTICE] Hot reload is disabled
[2025-12-13 19:30:32] [NOTICE] [quad9-dnscrypt-ip4-filter-pri] should upgrade to XChaCha20 for encryption
[2025-12-13 19:30:32] [NOTICE] [quad9-dnscrypt-ip4-filter-pri] OK (DNSCrypt) - rtt: 81ms
[2025-12-13 19:30:32] [NOTICE] [quad9-dnscrypt-ip4-filter-pri] OK (DNSCrypt) - rtt: 81ms - additional certificate
[2025-12-13 19:30:33] [NOTICE] [cloudflare] OK (DoH) - rtt: 62ms
[2025-12-13 19:30:33] [NOTICE] Sorted latencies:
[2025-12-13 19:30:33] [NOTICE] -    62ms cloudflare
[2025-12-13 19:30:33] [NOTICE] -    81ms quad9-dnscrypt-ip4-filter-pri
[2025-12-13 19:30:33] [NOTICE] Server with the lowest initial latency: cloudflare (rtt: 62ms), live servers: 2
```

Setelah DNSCrypt-Proxy berjalan dan tidak ada error, selanjutnya saya perlu melakukans setup local DNS ke 127.0.0.1.

Saya menggunakan koneksi Wi-Fi, maka saya menjalankan perintah berikut untuk mengatur DNS server ke localhost:

```
$ networksetup -setdnsservers Wi-Fi 127.0.0.1
```

Kemudian cek, apakah DNS server sudah berubah:

```
$ networksetup -getdnsservers Wi-Fi
```

```
127.0.0.1
```

Sip! Sudah berubah.

Jika mengembalikan output seperti ini:

```
There aren't any DNS Servers set on Wi-Fi.
```

Berarti local DNS belum di set ke 127.0.0.1.

Sekarang coba test dengan [https://www.dnsleaktest.com/](https://www.dnsleaktest.com/) untuk memastikan DNSCrypt-Proxy sudah berjalan dengan baik.

![gambar 1]({{ page.assets }}/gambar_1.png)

Gambar 1. Sebelum menggunakan DNSCrypt-Proxy

![gambar 2]({{ page.assets }}/gambar_2.png)

Gambar 2. Setelah menggunakan DNSCrypt-Proxy

Bisa juga dengan mencoba mengunjungi beberapa situs yang biasanya diblokir, seperti [https://reddit.com/](https://reddit.com/).


### Menjalankan DNSCrypt-Proxy sebagai background service

Sekarang hentikan dulu DNSCrypt-Proxy yang berjalan di terminal dengan menekan `CTRL + C`.

Selanjutnya jalankan DNSCrypt-Proxy sebagai background service menggunakan `brew services`:

Agar DNSCrypt-Proxy berjalan dengan hak akses root, saya menjalankan perintah berikut:

```
$ sudo brew services start dnscrypt-proxy
```

```
Warning: Taking root:admin ownership of some dnscrypt-proxy paths:
  /opt/homebrew/Cellar/dnscrypt-proxy/2.1.15/sbin
  /opt/homebrew/Cellar/dnscrypt-proxy/2.1.15/sbin/dnscrypt-proxy
  /opt/homebrew/opt/dnscrypt-proxy
  /opt/homebrew/opt/dnscrypt-proxy/sbin
  /opt/homebrew/var/homebrew/linked/dnscrypt-proxy
This will require manual removal of these paths using `sudo rm` on
brew upgrade/reinstall/uninstall.
==> Successfully started `dnscrypt-proxy` (label: homebrew.mxcl.dnscrypt-proxy)
```

Sip! Sekarang DNSCrypt-Proxy sudah berjalan sebagai background service di macOS.

Selanjutnya cek local DNS server, pastikan masih di set ke 127.0.0.1.

```
$ networksetup -getdnsservers Wi-Fi
```

Kalau memberikan output seperti ini:

```
There aren't any DNS Servers set on Wi-Fi.
```

Berarti local DNS belum di set ke 127.0.0.1. Silakan set ulang local DNS ke 127.0.0.1.

```
$ networksetup -setdnsservers Wi-Fi 127.0.0.1
```

Cek apakah sudah berhasil di set:

```
$ networksetup -getdnsservers Wi-Fi
```

```
127.0.0.1
```

Sip! Sekarang DNSCrypt-Proxy sudah berjalan dengan baik di macOS.


## Pesan Penulis

DNSCrypt-Proxy adalah cara yang mudah dan efektif untuk meningkatkan privasi dan keamanan saat melakukan resolusi nama domain. Namun, Public Server DNS yang digunakan tetap dapat melacak aktivitas browsing kita. Oleh karena itu, penting untuk memilih server DNS yang terpercaya dan sesuai dengan kebutuhan privasi kita.

Selain itu, kita juga dapat menambahkan konfigurasi Anonymized DNS Relay untuk meningkatkan privasi lebih lanjut. Dengan menggunakan Anonymized DNS Relay, permintaan DNS kita akan melewati server perantara sebelum mencapai server DNS tujuan, sehingga menyulitkan pelacakan aktivitas browsing kita.

Mengenai Anonymized DNS ini akan saya bahas di artikel selanjutnya.


## Referensi

1. [DNSCrypt Official Website](https://dnscrypt.info/) \
   Tanggal diakses: 2025-12-13

1. [DNSCrypt-Proxy GitHub Repository](https://github.com/DNSCrypt/dnscrypt-proxy) \
   Tanggal diakses: 2025-12-13
