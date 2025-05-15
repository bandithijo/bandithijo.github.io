---
layout: 'post'
title: "Menambahkan Email Kedua ke dalam GPG Key"
date: 2020-12-11 10:43
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips']
pin:
hot:
contributors: []
description: "Memiliki email yang banyak tidak berarti juga memiliki GPG key yang banyak. Kita dapat membuat alias untuk masing-masing email agar menggunakan GPG key kita yang sudah ada. Simak caranya di catatan berikut ini. Mudah banget!"
---

# Latar Belakang

Maksud dari judul catatan ini adalah, menambahkan Email lain --email milik kita yang berbeda alamat, bisa lebih dari satu email-- ke dalam satu GPG key yang sama --GPG key yang sudah pernah kita buat sebelumnya.

Mungkin teman-teman, belum mengetahui apa itu GPG key? Bisa terlebih dahulu melihat catatan kecil yang pernah saya tulis di sini, ["**Generate Private dan Public GPG Key Sendiri**"](blog/generate-gpg-key){:target="_blank"}.

Baru-baru ini saya memiliki kasus harus mengirim email dengan alamat email yang lain --alamat email yang saya gunakan untuk bekerja.

Dalam berkirim email, biasanya untuk memberikan jaminan bahwa email yang kita kirim adalah benar email yang kita tulis, tidak cukup dari alamat email saja.

Seperti halnya di dunia nyata, kalau kita berkirim surat, alamat email ibarat kop header dari surat.

**Lantas, bagian mana yang menandakan bahwa surat tersebut adalah surat yang dibuat oleh si pengirim?**

Yak betul! Pada bagian "tanda tangan".

Email pun juga demikian. Kita perlu memberikan tanda tangan (signature) agar email tersebut memiliki nilai otentik yang dapat dipertanggungjawabkan keasliannya.

**Signature seperti apa yang kita berika pada email?**

Apakah seperti pada surat, kita menuliskan nama pembuat surat dan memasukkan gambar tanda tangan pada bagian paling bawah email.

Mungkin bisa. Tapi bukan signature seperti ini yang saya maksudkan.

Namun, signature yang saya maksudkan adalah signature digital berupa GPG key. Signature yang yang juga digunakan dalam pemaketan aplikasi --yang pakai AUR pasti paham.

# Permasalahan

Saya sudah memiliki GPG key, yang menggunakan email sebelumnya.

**Apakah bisa, saya mendaftarkan email-email saya yang lain ke dalam GPG key yang saya gunakan saat ini?**

Bisa. Sangat bisa.

GPG memang sudah dirancang untuk menyimpan banyak alias.

Alias, dalam hal ini adalah alamat-alamat email kita yang lain.

Saya akan berikan ilustrasi agar lebih mudah dipahami.

{% shell_user %}
gpg --list-public-keys
{% endshell_user %}

```
pub   rsa4096 2014-10-22 [SC] [expires: 2021-10-29]
      A4CBEA7974898599195E4FEC46EC46F39F3E2EF1
uid           [ unknown] Remi Gacogne <rgacogne@archlinux.org>
sub   rsa4096 2014-10-22 [E] [expires: 2021-10-29]

pub   rsa2048 2011-09-20 [SC]
      ABAF11C65A2970B130ABE3C479BE3E4300411886
uid           [ unknown] Linus Torvalds <torvalds@kernel.org>
uid           [ unknown] Linus Torvalds <torvalds@linux-foundation.org>
sub   rsa2048 2011-09-20 [E]

pub   rsa4096 2014-09-05 [SC]
      C100346676634E80C940FB9E9C02FF419FECBE16
uid           [ unknown] Morten Linderud <morten@linderud.pw>
uid           [ unknown] Morten Linderud <mcfoxax@gmail.com>
uid           [ unknown] Morten Linderud <foxboron@archlinux.org>
uid           [ unknown] Morten Linderud <morten.linderud@fribyte.uib.no>
uid           [ unknown] Morten Linderud <morten.linderud@student.uib.no>
sub   rsa4096 2014-09-05 [E]
sub   rsa4096 2018-11-13 [S]
sub   rsa4096 2018-11-26 [A]

pub   rsa4096 2011-11-07 [SC] [expires: 2021-12-30]
      E240B57E2C4630BA768E2F26FC1B547C8D8172C8
uid           [ unknown] Levente Polyak (anthraxx) <levente@leventepolyak.net>
uid           [ unknown] Levente Polyak <Z3r0.0x00@gmail.com>
uid           [ unknown] Levente Polyak <anthraxx@archlinux.org>
uid           [ unknown] Levente Polyak <anthraxx@hamburg.ccc.de>
uid           [ unknown] Levente Polyak <levente@leventepolyak.de>
uid           [ unknown] Levente Polyak (Jabber/XMPP only) <anthraxx@jabber.ccc.de>
sub   rsa4096 2011-11-07 [E] [expires: 2021-12-30]

pub   rsa4096 2014-05-22 [SC] [expires: 2021-12-18]
      903BAB73640EB6D65533EFF3468F122CE8162295
uid           [ unknown] Santiago Torres-Arias <santiago@archlinux.org>
uid           [ unknown] Santiago Torres <torresariass@gmail.com>
uid           [ unknown] Santiago Torres-Arias <santiago@nyu.edu>
sub   rsa4096 2014-05-22 [E]
```

Perhatikan, terdapat 5 fingerprint yang saya tampilkan di atas.

1. Remi Gacogne<br>A4CBEA7974898599195E4FEC46EC46F39F3E2EF1
2. Linux Torvalds<br>ABAF11C65A2970B130ABE3C479BE3E4300411886
3. Morten Linderud<br>C100346676634E80C940FB9E9C02FF419FECBE16
4. Levente Polyak<br>E240B57E2C4630BA768E2F26FC1B547C8D8172C8
5. Santiago Torres<br>903BAB73640EB6D65533EFF3468F122CE8162295

<br>
4 diantaranya, memiliki lebih dari 1 email dalam 1 GPG key.

Nah, gimana? Sudah kebayang kan?

> Dengan begini, kita **tidak perlu membuat banyak GPG key untuk masing-masing email yang kita memiliki**.

## Pemecahan Masalah

**Bagaimana cara membuat GPG key yang dapat menyimpan banyak email, sepeti di atas?**

Sangat mudah.

Ikuti langkah-langkahnya sebagai berikut ini.

## 1. Identifikasi GPG Secret Key yang Kita Miliki

GPG adalah pasangan kunci (*key pairs*), **public key** dan **private key**.

Kunci yang kita publikasikan, adalah kunci publik (*public key*).

Sedangkan, kunci yang kita simpan adalah kunci private (*private key*).

Private key ini lah yang kita gunakan untuk membuka paket --apa saja yang dienkripsi dengan GPG public key-- milik kita.

Untuk mengecek daftar GPG private key, atau ada juga yang menyebut dengan istilah **secret key**, kita gunakan perintah,

{% shell_user %}
gpg --list-secret-keys
{% endshell_user %}

Nanti akan keluar GPG key yang merupakan secret key (private key).

```
/home/bandithijo/.gnupg/pubring.kbx
-----------------------------------
sec   rsa4096 2018-08-11 [SC] [expires: 2021-12-30]
      AE706A616B252A6822635041560691E942A02F91
uid           [ultimate] Rizqi Nur Assyaufi <bandithijo@gmail.com>
ssb   rsa4096 2018-08-11 [E] [expires: 2021-12-30]

```

Terlihat, kalau saya baru memiliki 1 email di dalam GPG key ini.

Sepintas tampilannya mirip dengan public key. Tapi jangan bingung, seperti yang saya katakan tadi di awal. GPG merupakan pasangan kunci.

Artinya, kunci yang tampil tersebut, memili **private key** dan **public key** di sistem kita --karena kita sendiri yang buat.

Kalau teman-teman pernah membuat (men-*generate*) lebih dari 1 kunci, tentunya tampilannya tidak hanya satu saja.

Catat atau copy fingerprint yang berupa Hex-string dari GPG secret key yang ingin ditambahkan email lain.

Contohnya seperti milik saya,

```
AE706A616B252A6822635041560691E942A02F91
```


### Key ID Format

Selain menggunakan fingerprit seperti di atas, kita juga dapat menggunakan key id.

Terdapat beberapa keterangan tentang key id.

{% pre_whiteboard %}
sec => 'SECret key'
ssb => 'Secret SuBkey'
pub => 'PUBlic key'
sub => 'public SUBkey'
{% endpre_whiteboard %}

Untuk melihat key id yang kita miliki, kita dapat melihat dengan setidaknya 4 format.

1. 0xshort
2. short
3. 0xlong
4. long

<br>
{% shell_term $ %}
gpg --keyid-format 0xshort -K
{% endshell_term %}

<pre>
/home/bandithijo/.gnupg/pubring.kbx
-----------------------------------
sec   rsa4096/<mark>0x66666666</mark> 2018-08-11 [SC] [expires: 2021-12-30]
      AE706A616B252A6822635041560691E942A02F91
uid           [ultimate] Rizqi Nur Assyaufi <bandithijo@gmail.com>
ssb   rsa4096/<mark>0x99999999</mark> 2018-08-11 [E] [expires: 2021-12-30]

</pre>

**0x66666666** adalah bentuk dari SECret key id.

**0x99999999** adalah bentuk dari Secret SuBkey.

Tinggal disesuaikan saja format yang diperlukan, apakah **0xshort**, **short**, **0xlong**, dan **long**.


### Fingerprit

Untuk menampilkan fingerprint, kita dapat menambahkan option `--fingerprint`, baik untuk melihat public key ataupu private key.

Misal, untuk melihat key id kita sendiri dengan format `0xshort` dan `--fingerprint`

{% shell_term $ %}
gpg --keyid-format 0xshort -K --fingerprint
{% endshell_term %}

<pre>
/home/bandithijo/.gnupg/pubring.kbx
-----------------------------------
sec   rsa4096/<mark>0x66666666</mark> 2018-08-11 [SC] [expires: 2021-12-30]
      Key fingerprint = <mark>AE70 6A61 6B25 2A68 2263  5041 5606 91E9 42A0 2F91</mark>
uid           [ultimate] Rizqi Nur Assyaufi <bandithijo@gmail.com>
ssb   rsa4096/<mark>0x99999999</mark> 2018-08-11 [E] [expires: 2021-12-30]

</pre>



## 2. Edit GPG Key untuk Menambahkan Email Lain

Untuk menambahkan email lain, kita gunakan option, `--edit-key` diikuti dengan keyID.

{% pre_url %}
gpg --edit-key &lt;key_id&gt;
{% endpre_url %}

Misal,

{% shell_user %}
gpg --edit-key AE706A616B252A6822635041560691E942A02F91
{% endshell_user %}

Nanti, kita akan dibawa masuk ke GPG shell. Ditandai dengan tampilnya GPG shell prompt seperti di bawah.

<pre>
gpg> <b>_</b>
</pre>

Dan teman-teman dapat memperhatikan, dibagian atasnya terdapat semacam MOTD (*message of the day*), yang berisi informasi tertentu, seperti ini.

```
gpg (GnuPG) 2.2.24; Copyright (C) 2020 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1)  Rizqi Nur Assyaufi <bandithijo@gmail.com>

gpg> _
```

Kemudian, masukkan perintah `adduid`.

<pre>
<span class="cmd">gpg> </span><b>adduid</b>
</pre>

Ikuti pertanyaan-pertanyaan yang diajukan,

<pre>
Real name: <span style="font-weight:bold;color:#FFCC00;">Rizqi Nur Assyaufi</span>
Email address: <span style="font-weight:bold;color:#FFCC00;">rizqiassyaufi@gmail.com</span>
Comment:
You selected this USER-ID:
"Rizqi Nur Assyaufi <rizqilassyaufi@gmail.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? <span class="is-warning">o</span>
</pre>

Kalau berhasil nanti email yang baru ditambahkan, akan masuk ke dalam list.

<pre>
sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-11-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-11-30  usage: E
[ultimate] (1)  Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ unknown] (2). Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>

gpg> _
</pre>

Lalu, masukkan `save` untuk save dan quit.

<pre>
<span class="cmd">gpg> </span><b>save</b>
</pre>

<br>
Kemudian, lakukan verifikasi, untuk melihat apakah sudah berhasil atau belum.

{% shell_user %}
gpg --list-secret-keys
{% endshell_user %}

<pre>
/home/bandithijo/.gnupg/pubring.kbx
-----------------------------------
sec   rsa4096 2018-08-11 [SC] [expires: 2021-12-30]
      AE706A616B252A6822635041560691E942A02F91
uid           [ultimate] Rizqi Nur Assyaufi <rizqinurassyaufi@gmail.com>
uid           [ultimate] Rizqi Nur Assyaufi <bandithijo@gmail.com>
ssb   rsa4096 2018-08-11 [E] [expires: 2021-12-30]
</pre>

Mantap!

# Tambahan

## GPG shell, Help!

Untuk meminta bantuan pada GPG shell, gunaka perintah,

<pre>
<span class="cmd">gpg> </span><b>help</b>
</pre>

## Menghapus uid

Bagaimana cara menghapus email (uid) yang sudah tidak kita gunakan lagi?

<pre>
<span class="cmd">gpg> </span><b>list</b>

sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1). Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ultimate] (2)  Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
</pre>

Misal, saya ingin menghapus uid ke-2, dengam alamat email rizqiassyaufi@gmail.com.

Gunakan perintah `uid <id>` untuk memilih uid yang dimakdudkan.

<pre>
<span class="cmd">gpg> </span><b>uid 2</b>
</pre>

Nanti, akan ada tanda bintang `*` pada uid yang telah terpilih.

```
sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1). Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ultimate] (2)* Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
```

Perhatikan, pada uid 2, terdapat tanda `*`, artinya uid 2 telah kita tandai.

Kemudian, gunakan perintah `deluid` untuk menghapus uid terpilih.

<pre>
<span class="cmd">gpg> </span><b>deluid</b>
Really remove this user ID? (y/N) <span style="font-weight:bold;color:#FFCC00;">y</span>
</pre>

Masukkan `y`, dan uid terpilih akan dihapus dari list.

## Memilih Primary uid

Kalau kita memiliki lebih dari satu uid, tentunya kita perlu memilih uid mana yang menjadi uid primary.

Hal ini dapat dengan mudah kita lakukan menggunakan perintah `primary`.

Misal,

<pre>
<span class="cmd">gpg> </span><b>list</b>

sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1). Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ultimate] (2)  Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
</pre>

Terlihat, uid 1 adalah primary dari tanda `.` yang ada disebelah uid (1).

Untuk mengubah uid 2 menjadi primary, sebelumnya, marking dulu uid yang ingin dijadikan primary.

<pre>
<span class="cmd">gpg> </span><b>uid 2</b>
</pre>

```
sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1). Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ultimate] (2)* Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
```

Nanti, uid 2 akan memiliki marking `*`.

Selanjutnya, jalankan perintah,

<pre>
<span class="cmd">gpg> </span><b>primary</b>
</pre>

```
sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1)  Rizqi Nur Assyaufi <bandithijo@gmail.com>
[ultimate] (2)* Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
```

Nanti, tanda `.` pada uid 1 menghilang. Artinya primary sudah berpindah.

Lalu jalankan `save` untuk save dan quit.

<pre>
<span class="cmd">gpg> </span><b>save</b>
</pre>

Lakukan verifikasi,

{% shell_user %}
gpg --list-secret-keys
{% endshell_user %}

```
sec  rsa4096/6666666666666666
     created: 2018-08-11  expires: 2021-12-30  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa4096/9999999999999999
     created: 2018-08-11  expires: 2021-12-30  usage: E
[ultimate] (1). Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
[ultimate] (2)  Rizqi Nur Assyaufi <bandithijo@gmail.com>
```

Nah, sekarang email rizqiassyaufi@gmail.com sudah menjadi primary.

Posisi primary akan selalu berada di uid 1.




# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [Redmine - Adding Secondary Email Addresses to GPG Keys](https://redmine.dicelab.net/projects/instructibels/wiki/Adding_Secondary_Email_Addresses_to_GPG_Keys){:target="_blank"}
<br>Diakses tanggal: 2020/12/11
