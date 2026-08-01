---
layout: "post"
title: "Memperbaiki GPG: Keydb Search Failed"
date: "2026-08-01 06:11"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-08-01-memperbaiki-gpg-keydb-search-failed"
author: "BanditHijo"
category: "blog"
tags: ["gpg", "gnupg", "keyboxd", "keydb"]
description: "Memperbaiki error gpg: keydb_search_failed: Operation time out."
---

## Latar Belakang Masalah

Saat akan membuka file yang dienkripsi dengan GnuPG (`.gpg`), saya mendapati error sebagai berikut.

```
[bandithijo@MacBookAir ~]$ gpgconf --kill all
[bandithijo@MacBookAir ~]$ gpgconf --launch gpg-agent
[bandithijo@MacBookAir ~]$ pass -c 'BanditHijo/example.com/bandithijo@example.com'
gpg: Note: database_open 134217901 waiting for lock (held by 1909) ...
gpg: Note: database_open 134217901 waiting for lock (held by 1909) ...
gpg: Note: database_open 134217901 waiting for lock (held by 1909) ...
gpg: Note: database_open 134217901 waiting for lock (held by 1909) ...
gpg: Note: database_open 134217901 waiting for lock (held by 1909) ...
gpg: keydb_search failed: Operation timed out
gpg: public key decryption failed: No secret key
gpg: decryption failed: No secret key
```

Ini adalah masalah klasik dari `keyboxd` (komponen baru di GnuPG 2.4+ yang bertugas mengelola public keyring lewat SQLite, menggantikan `pubring.kbx`).

Error ini disebabkan karena terjadi proses _locking_ dari _session_ yang crash. Hal ini membuat key tetap dalam keadaan terkunci, meskipun proses aslinya sudah mati/terminated. Yang biasanya menyebabkan hal ini adalah karena kunci/lock dipegang oleh PID yang ternyata sudah tidak aktif. Biasanya karena mesin sempat hang->force-shutdown. Solusinya sesederhana menghapus file lock nya secara manual.


## Pemecahan Masalah


### 1. Matikan semua proses dari komponen gpg

Matikan semua komponen gpg yang terlibat secara eksplisit, termasuk keyboxd.

```
$ gpgconf --kill gpg-agent
$ gpgconf --kill keyboxd
$ gpgconf --kill dirmngr
$ pkill -9 -f gpg-agent
$ pkill -9 -f keyboxd
```

> info
>
> `gpgconf --kill all` terkadang tidak dapat menjangkau keyboxd, tergantung versi GnuPG-nya.


### 2. Hapus lock file yang stale

Karena yang terkunci adalah file lock, biasanya terdapat ekstensi `.lock` pada bagian akhir nama file db nya (misal: `pubring.db.lock`).

```
$ ls -la ~/.gnupg/public-keys.d/
$ rm -f ~/.gnupg/public-keys.d/pubring.db.lock
```

### 3. Hapus file `.lock` yang lain

Jika ada file dengan ekstensi `.lock` yang lain di `~/.gnupg/` (bukan di dalam `public-key.d/`), sebaiknya dihapus juga.

```
$ find ~/.gnupg/ -name '*.lock' -delete
```

### 4. Restart agent

Langkah terakhir tinggal restart agent.

```
$ gpgconf --launch gpg-agent
```

Selesi!


## Referensi

1. [iamyaash. GPG: Fix 'database_open waiting for lock. Des 2025](https://iamyaash.github.io/stashed/posts/gpg/dblock-gpg/) \
   Diakses tanggal: 2026-08-01

2. [Tanin Srivaraphong. gpg: Note: database_open...waiting for lock (held by 30991)... Medium, Sep 2025](https://zrevig.medium.com/gpg-note-database-open-134217901-waiting-for-lock-held-by-30991-7ef593e19662) \
   Diakses tanggal: 2026-08-01
   
3. [thelinux.pro. Fixing GPG Lock Issues. Jun 2024](https://thelinux.pro/osx/linux/gpg/git/2024/06/23/fixing-gpg-lock-issues.html) \
   Diakses tanggal: 2026-08-01
   
4. [Priyansh Khodiyar. Git commit signing and Troubleshooting GPG Key Issues. Medium, Mar 2025](https://zriyansh.medium.com/git-commit-signing-and-troubleshooting-gpg-key-issues-441b0c889707) \
   Diakses tanggal: 2026-08-01
