---
layout: "post"
title: "Konfigurasi Anonymized DNSCrypt dengan DNSCrypt-Proxy di macOS"
date: "2025-12-14 06:30"
permalink: "/blog/:title"
assets: "/assets/images/posts/2025/2025-12-14-konfigurasi-anonymized-dnscrypt-dengan-dnscrypt-proxy-di-macos"
author: "BanditHijo"
category: "blog"
tags: ["dnscrypt"]
description: "Anonymized DNSCrypt adalah fitur yang memungkinkan kita untuk menyembunyikan alamat IP asli kita saat melakukan resolusi nama domain menggunakan DNSCrypt-Proxy."
---

## Pendahuluan

DNSCrypt adalah sebuah protokol yang mengamankan komunikasi antara client dan DNS resolver dengan mengenkripsi permintaan DNS.

Meskipun komunikasi itu sendiri sudah terenkripsi, dan sifat stateless dari protokol DNSCrypt membantu mencegak fingerprinting terhadap perangkat individual, operator server DNSCrypt tetap dapat mengamati alamat IP asli dari client yang terhubung.

Cara umum untuk mencegah hal ini adalah dengan menggunakan DNSCrypt melalui protokol Tor atau proxy SOCKS. Namun, Tor secara signifikan meningkatkan latensi response DNS sehingga sangat lambat untuk penggunaan sehari-hari.

Anonymized DNSCrypt adalah ekstensi dari protokol DNSCrypt v2 yang memungkinkan query dan response diteruskan melalui server perantara (relay) sebelum mencapai resolver DNSCrypt tujuan. Dengan cara ini, resolver hanya melihat alamat IP dari relay, bukan alamat IP asli client.

```
[Client]   --encrypted query-->   [Relay]   --encrypted query-->   [DNSCrypt Resolver Server]
[Client] <--encrypted responses-- [Relay] <--encrypted responses-- [DNSCrypt Resolver Server]
```

Client mengenkripsi query menggunakan public key server sebagaimana protokol DNSCrypt standar. Relay hanya meneruskan paket terenkripsi secara pasif dan tidak mengetahui shared secret. Hasilnya:

1. Relay tidak mempelajari apa pun tentang query dan respons DNS yang dipertukarkan antara client dan server. Relay juga tidak dapat memodifikasinya.
1. Server tidak mempelajari apa pun tentang alamat IP client. Satu-satunya alamat IP yang dapat diamati oleh server adalah alamat IP relay.

Sebuah server DNSCrypt dapat sekaligus bertindak sebagai relay, pada alamat IP dan port yang sama.

Anonymized DNS dapat diimplementasikan di atas semua protokol terenkripsi yang ada, tapi DNSCrypt sejauh ini adalah yang paling simple dan efisien untuk diimplementasikan.


## Implementasi Anonymized DNS di macOS dengan DNSCrypt-Proxy

Buka konfigurasi DNSCrypt-Proxy di macOS dan tambahkan konfigurasi berikut:

```
$ nvim /opt/homebrew/etc/dnscrypt-proxy.toml
```

```toml
!filename: /opt/homebrew/etc/dnscrypt-proxy.toml
###############################################################################
#                             Global settings                                  #
###############################################################################

# Tambahkan `disabled_` di depan `server_names` untuk menonaktifkan server DNS
# server_names = ['cloudflare', 'quad9-dnscrypt-ip4-filter-pri']
disabled_server_names = ['cloudflare', 'quad9-dnscrypt-ip4-filter-pri']


###############################################################################
#                            Server Selection                                  #
###############################################################################

dnscrypt_servers = true
doh_servers = false


###############################################################################
#                          Anonymized DNS                                      #
###############################################################################

[anonymized_dns]
routes = [
    { server_name='anon-cs-singapore', via=['sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw'] },
    { server_name='anon-cs-singapore6', via=['sdns://gRhbMmEwZDo1NjAwOjFmOjc6OjUzXTo0NDM'] }
]

skip_incompatible = true
```

Sekarang coba jalankan DNSCrypt-Proxy dulu secara manual,

```
$ sudo dnscrypt-proxy -config /opt/homebrew/etc/dnscrypt-proxy.toml
```

```
[2025-12-14 07:16:32] [NOTICE] dnscrypt-proxy 2.1.15
[2025-12-14 07:16:32] [NOTICE] Using default Weighted Power of Two (WP2) load balancing strategy
[2025-12-14 07:16:32] [NOTICE] Network connectivity detected
[2025-12-14 07:16:32] [NOTICE] Now listening to 127.0.0.1:53 [UDP]
[2025-12-14 07:16:32] [NOTICE] Now listening to 127.0.0.1:53 [TCP]
[2025-12-14 07:16:32] [NOTICE] Now listening to [::1]:53 [UDP]
[2025-12-14 07:16:32] [NOTICE] Now listening to [::1]:53 [TCP]
[2025-12-14 07:16:32] [NOTICE] Source [public-resolvers] loaded
[2025-12-14 07:16:32] [NOTICE] Source [relays] loaded
[2025-12-14 07:16:32] [NOTICE] Anonymized DNS: routing everything via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw sdns://gRhbMmEwZDo1NjAwOjFmOjc6OjUzXTo0NDM]
[2025-12-14 07:16:32] [NOTICE] Firefox workaround initialized
[2025-12-14 07:16:32] [NOTICE] Hot reload is disabled
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [dct-fr] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:40] [NOTICE] [dnscry.pt-calgary-ipv4] OK (DNSCrypt) - rtt: 252ms
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [cs-berlin] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:40] [NOTICE] [dnscry.pt-milan-ipv4] OK (DNSCrypt) - rtt: 211ms
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [plan9dns-nj] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:40] [NOTICE] [dnscry.pt-fujairah-ipv4] OK (DNSCrypt) - rtt: 142ms
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [dnscry.pt-marseille-ipv4] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:40] [NOTICE] [cs-sea] OK (DNSCrypt) - rtt: 232ms
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [dnscry.pt-naaldwijk-ipv4] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:40] [NOTICE] [plan9dns-nj] OK (DNSCrypt) - rtt: 277ms
[2025-12-14 07:16:40] [NOTICE] [plan9dns-nj] OK (DNSCrypt) - rtt: 277ms - additional certificate
[2025-12-14 07:16:40] [NOTICE] Anonymizing queries for [dnscry.pt-singapore-ipv4] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
[2025-12-14 07:16:44] [NOTICE] Anonymizing queries for [cs-singapore] via [sdns://gREzNy4xMjAuMTUxLjExOjQ0Mw]
------------------------------------------ dipotong ------------------------------------------
[2025-12-14 07:16:46] [NOTICE] [dnscry.pt-helsinki-ipv4] OK (DNSCrypt) - rtt: 230ms
[2025-12-14 07:16:46] [NOTICE] [dnscry.pt-marseille-ipv4] OK (DNSCrypt) - rtt: 180ms
[2025-12-14 07:16:46] [NOTICE] [cs-milan] OK (DNSCrypt) - rtt: 476ms
[2025-12-14 07:16:46] [NOTICE] [dnscry.pt-dallas-ipv4] OK (DNSCrypt) - rtt: 257ms
[2025-12-14 07:16:46] [NOTICE] [dnscry.pt-london-ipv4] OK (DNSCrypt) - rtt: 284ms
[2025-12-14 07:16:48] [NOTICE] [saldns02-conoha-ipv4] OK (DNSCrypt) - rtt: 136ms
[2025-12-14 07:16:49] [NOTICE] [cs-singapore] OK (DNSCrypt) - rtt: 40ms
[2025-12-14 07:16:55] [NOTICE] Sorted latencies:
[2025-12-14 07:16:55] [NOTICE] -    40ms cs-singapore
[2025-12-14 07:16:55] [NOTICE] -    42ms quad9-dnscrypt-ip4-nofilter-pri
[2025-12-14 07:16:55] [NOTICE] -    42ms quad9-dnscrypt-ip4-nofilter-ecs-pri
[2025-12-14 07:16:55] [NOTICE] -    43ms dnscry.pt-singapore-ipv4
[2025-12-14 07:16:55] [NOTICE] -    76ms dnscry.pt-hongkong03-ipv4
------------------------------------------ dipotong ------------------------------------------
[2025-12-14 07:16:55] [NOTICE] -   478ms cs-hungary
[2025-12-14 07:16:55] [NOTICE] -   478ms cs-ro
[2025-12-14 07:16:55] [NOTICE] -   479ms cs-serbia
[2025-12-14 07:16:55] [NOTICE] -   485ms cs-norway
[2025-12-14 07:16:55] [NOTICE] -   485ms cs-finland
[2025-12-14 07:16:55] [NOTICE] Server with the lowest initial latency: cs-singapore (rtt: 40ms), live servers: 175
```

Dapat dilihat dari log di atas bahwa DNSCrypt-Proxy berhasil menghubungkan ke berbagai server DNSCrypt dengan menggunakan protokol Anonymized DNSCrypt. Setiap server diuji untuk latensi (rtt) dan hasilnya dicatat. Server dengan latensi terendah adalah `cs-singapore` dengan rtt 40ms.

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

![gambar 1]({{ page.assets }}/gambar_1.png)

Gambar 1. Sebelum menggunakan DNSCrypt-Proxy dengan Anonymized DNS

![gambar 2]({{ page.assets }}/gambar_2.png)

Gambar 2. Setelah menggunakan DNSCrypt-Proxy tanpa Anonymized DNS

![gambar 3]({{ page.assets }}/gambar_3.png)

Gambar 3. Setelah menggunakan DNSCrypt-Proxy dengan Anonymized DNS

Sip! Sekarang DNSCrypt-Proxy sudah berjalan dengan Anonymized DNS di macOS.

Tinggal dijalankan DNSCrypt-Proxy sebagai service.

Sekarang hentikan dulu DNSCrypt-Proxy yang berjalan di terminal dengan menekan `CTRL + C`.

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



## Referensi

1. [DNSCrypt Official Website](https://dnscrypt.info/) \
   Tanggal diakses: 2025-12-14

1. [DNSCrypt-Proxy GitHub Repository](https://github.com/DNSCrypt/dnscrypt-proxy) \
   Tanggal diakses: 2025-12-14

1. [Anonymized DNSCrypt Protocol](https://github.com/DNSCrypt/dnscrypt-protocol/blob/master/ANONYMIZED-DNSCRYPT.txt) \
   Tanggal diakses: 2025-12-14

1. [Anonymized DNSCrypt Configuration Guide](https://github.com/DNSCrypt/dnscrypt-proxy/wiki/Anonymized-DNS) \
   Tanggal diakses: 2025-12-14
