---
layout: 'post'
title: 'Konfigurasi Custom Domain GitHub Page dengan Cloudflare dan Dewaweb'
date: '2018-04-03'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Cloudflare']
pin:
hot:
contributors: []
description: "Menggunakan GitHub Pages bukan berarti tidak dapat menggunakan Custom Domain seperti .com, .net, .org. Tentu saja bisa. Berikut ini saya memberikan salah satu cara, yaitu dengan menggunakan layanan Cloudflare. Caranya mudah sekali!"
---

![Banner](https://s20.postimg.cc/6w9qd7o2l/banner_post_01.png)


# Latar Belakang
Tepat tiga minggu yang lalu, [saya memigrasikan blog ini dari .blogspot.com ke .github.io](http://bandithijo.com/blog/migrasi-blog-2-0). Saya pikir, saya tidak akan tertarik untuk membeli _custom domain_ .com untuk blog ini, karena menurut saya .github.io sudah sangat keren.

Beberapa alasan yang mendorong saya akhirnya membeli _custom domain_ untuk blog ini salah satunya berangkat dari belum familiarnya .github.io dikalangan teman-teman saya. Sedangkan target pembaca dari blog ini adalah mereka, karena blog ini sekaligus akan saya jadikan tempat untuk mengambil bahan-bahan perkuliahan yang sebelumnya harus susah-susah diambil di Google Drive kelas.


# Pelaksanaan


## Pemilihan Layanan

Langkah awal yang perlu dilakukan adalah mencari penyedia layanan _custom domain_. Sebenarnya, saya pernah beberapa kali membeli _custom domain_ di owned-host, namun untuk kali ini saya memutuskan mencoba layanan dari penyedia _custom domain_ yang lain. Sekalian mencari suasana baru.

Saya pikir akan lebih baik apabila saya memilih penyedia layanan _custom domain_ yang juga dipakai oleh teman sesama blogger. Saya ingat beberapa waktu lalu [kabarlinux.web.id](https://kabarlinux.web.id/) milik om [Ramdziana](https://ramdziana.wordpress.com/) pernah menuliskan artikel terkait membutuhkan dukungan finansial, namun saya tidak dapat menemukan link terkait perihal ini, mungkin telah diganti dengan artikel lain. Seingat saya terdapat link afiliasi yang merujuk pada nama salah satu penyedia jasa layanan _custom domain_ yang digunakan oleh kabarlinux.web.id. Yaitu, [dewaweb.com](https://client.dewaweb.com/aff.php?aff=22096). Saya pun mencoba mendaftar melalui link afiliasi dewaweb.com yang terdapat pada kabarlinux.web.id.

Selanjutnya saya akan melakukan order.


## Order Custom Domain

![Gambar 1](https://s20.postimg.cc/zfnikq5t9/gambar_01.png)

Pilih menu **Order > Domain > Beli Domain Baru**.

Nanti akan terbuka halaman seperti di bawah.

![Gambar 2](https://s20.postimg.cc/ostpf907x/gambar_02.png)

Isikan nama _domain_ dan ekstensi _domain_ yang kamu inginkan. Pada contoh di atas, saya menggunakan nama _domain_ `devikamarina` dengan ekstensi _domain_ `.com`. Kemudian tekan tombol **Cek Domain**.

Apabila tersedia, pilih jangka waktu penagihan pembayaran. 1 tahun, 2 tahun, atau 3 tahun. Kemudian tekan tombol **Order**.

Nanti akan diarahkan pada halaman **Konfigurasi Domain**.

![Gambar 3](https://s20.postimg.cc/97cdvbbf1/gambar_03.png)

Yang perlu diperhatikan pada halaman ini adalah apakah kamu ingin memberikan **Whois Privacy Protection** terhadap domain kamu. Layanan ini bersifat _optional_.

Maksudnya apa sih bang ?

Maksud dari _Whois Privacy Protection_ ini adalah untuk mengkamuflasekan data-data kamu seperti nama, alamat, nomor telepon yang kamu daftarkan pada dewaweb.com yang tidak ingin kamu bagikan kepada publik. Jadi, setiap kita membeli domain, wajib untuk menyertakan identitas domain tersebut milik siapa. Namun, karena satu dan lain hal terutama masalah _privacy_ data pribadi, saya tidak ingin menampilkan nama, alamat, dan nomor telepon saya kepada publik. Infromasi ini dapat kamu coba cek dengan melakukan perintah `whois namadomain.ekstensidomain` kepada salah satu website yang ingin kamu lihat pemiliknya.

Saya akan mencontohkan melakukan pengecekan `whois` kepada kaskus.co.id.

```
$ whois kaskus.co.id
```

```
Domain ID:PANDI-DO253792
Domain Name:KASKUS.CO.ID
Created On:17-Jul-2008 13:33:41 UTC
Last Updated On:11-Jun-2017 09:27:06 UTC
Expiration Date:19-Jul-2019 23:59:59 UTC
Status:ok
Registrant ID:08domai47
Registrant Name:Andrew Darwis
Registrant Organization:PT Darta Media Indonesia
Registrant Street1:Menara Palma, Annex Building P11
Registrant Street2:Jl. HR Rasuna said Blok X2 Kav. 6
Registrant City:Jakarta
Registrant State/Province:DKI Jakarta
Registrant Postal Code:12950
Registrant Country:ID
Registrant Phone:+62.2129223600
Registrant Email:domain@kaskusnetworks.com
...
...
```

Kemudian saya akan melakukan pengecekan informasi domain dengan menggunakan `whois` kepada domain yang saya beli di dewaweb.com dengan menggunakan tambahana layanan _Whois Privacy Protection_.

```
$ whois bandithijo.com
```

```
Domain Name: BANDITHIJO.COM
Registry Domain ID: 2247257697_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.tucows.com
Registrar URL: http://www.tucowsdomains.com
Updated Date: 2018-04-03T05:55:28Z
Creation Date: 2018-04-02T20:53:56Z
Registry Expiry Date: 2019-04-02T20:53:56Z
Registrar: Tucows Domains Inc.
Registrar IANA ID: 69
Registrar Abuse Contact Email:
Registrar Abuse Contact Phone:
Domain Status: ok https://icann.org/epp#ok
Name Server: ELLE.NS.CLOUDFLARE.COM
Name Server: WESLEY.NS.CLOUDFLARE.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
...
...
```

Gimana? Sudah dapet gambaran kan, apa yang dimaksud dengan layanan _Whois Privacy Protection_. Setahu saya, hampir setiap penyedia layanan _custom domain_ menyediakan fasilitas ini. Jadi apapun layanan penyedia _custom domain_ yang kamu pilih, apabila kamu ingin melindungi informasi pribadi kamu dari publik, kamu dapat mencari layanan ini. Layanan ini seharga Rp 40.000, di dewaweb.com

Untuk pengaturan **Nameserver** akan kita ubah nanti saja. Saya berencana menggunakan nameserver dari **Cloudflare**, mengikuti rekomendasi yang diberikan oleh sahabat saya kang [Sucipto.net](https://sucipto.net/).

Kemudian tekan tombol **Update Keranjang Belanja**.

![Gambar 4](https://s20.postimg.cc/48ovgrzwd/gambar_04.png)

Setelah dipastikan kembali tidak ada yang kurang atau yang lebih dari daftar item yang kita pesan di atas. Selanjutnya tekan tombol **Checkout dan Bayar**.

Setelah kita menyelesaikan pembayaran dan _custom domain_ yang kita inginkan sudah di tangan kita. Langkah selanjutnya adalah konfigurasi _custom domain_ pada GitHub.

## Konfigurasi GitHub

Untuk membuat GitHub dapat menerima _traffic_ dari _custom domain_ yang sudah kita buat, kita perlu membuat `CNAME` records di dalam repositori milik kita.

Buat file bernama `CNAME` pada direktori root dari website kita.

```
├── 📁 _drafts/
├── 📁 _includes/
├── 📁 _layouts/
├── 📁 _plugins/
├── 📁 _posts/
├── 📁 _site/
├── 📁 assets/
├── 📁 pages/
├── 📄 404.html
├── 📄 _config.yml
├── 📄 CNAME  👈 Tambahkan file ini
├── 📄 favicon.ico
├── 📄 Gemfile
├── 📄 Gemfile.lock
├── 📄 index.html
└── 📄 LICENSE
```

Kemudian, isi dengan nama domain yang ingin kita tampilkan.

Misalkan, kita ingin menampilkan domain berupa nama dan ekstensi domain, seperti halnya blog ini `bandithijo.com` (APEX domain) atau `www.bandithijo.com` (WWW Sub Domain).

Isikan sebagaimana kalian ingin menampilkan nama blog kalian pada _address bar_.

```
https://bandithijo.com
```

*Perhatikan! Isi dari CNAME ini hanya 1 baris.

Langkah selanjutnya commit file CNAME yang baru saja kita buat ke dalam repositori GitHub kita.

```
$ git add -A
$ git commit -m “Added CNAME file.”
$ git push origin master
```

Kemudian, buka repositori GitHub tempat dimana kamu menyimpan repositori dari .github.io. Lakukan pengecekan apakah file CNAME yang kita buat sudah berada pada repositori GitHub kita.

Kemudian selanjutnya pilih menu **Settings**.

![Gambar 5](https://s20.postimg.cc/rzo8yvcy5/gambar_05.png)

Selanjutnya, _scrolling page_ ke bagian **GitHub Pages** dan isikan nama domain yang baru saja kamu beli pada kolom **Custom domain**.

![Gambar 6](https://s20.postimg.cc/irw0i78gt/gambar_06.png)

Pilih **Save**.

Pada tahap ini konfigurasi GitHub hanya seperti ini saja. Namun, _custom domain_ yang kita konfigurasi belum selesai dan belum dapat kita panggil di _browser_. Kita perlu melakukan konfigurasi **nameserver** pada **Cloudflare**.


## Konfigurasi Nameserver Cloudflare

Buka [cloudflare.com](https://www.cloudflare.com/). Apabila belum memiliki akun, sebaiknya buat akun terlebih dahulu. Kemudian Login dan tambahkan website kamu. **+ Add site**.

![Gambar 7](https://s20.postimg.cc/sp71b8sx9/gambar_07.png)

Setelah itu, pergi ke tab **DNS**.

![Gambar 8](https://s20.postimg.cc/dtma8qvwt/gambar_08.png)

Isi dan ikuti seperti gambar di atas.

IP pada `A` records tersebut saya dapatkan dari [help.github.com](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider).

```
192.30.252.153
192.30.252.154
```

Selanjutnya, kita perlu merubah **nameserver** pada dewaweb.com menjadi nameserver yang sudah diberikan oleh Cloudflare. Seperti pada Gambar di atas.

Untuk kasus saya, nameserver yang diberikan oleh Cloudflare adalah.

```
elle.ns.cloudflare.com
wesley.ns.cloudflare.com
```

Saya lupa urutan detail konfigurasi nameserver pada Cloudflare ini seperti apa, yang jelas, nanti akan diberikan contoh bagaimana cara melakukan pengisian nameserver pada dewaweb.com menjadi nameserver Cloudflare. Seperti contoh di bawah.

![Gambar 9](https://s20.postimg.cc/mo9ce78vx/gambar_09.png)

Secara _default_, dewaweb.com sudah memberikan 3 alamat nameserver bawaan dewaweb.com. Kita perlu mengganti Nameserver 1 dan 2 dengan nameserver yang sudah diberikan oleh Cloudflare, kemudian menghapus Nameserver 3.

Buka kembali dewaweb.com, dan pergi ke bagian [**Login ke Client Area**](https://client.dewaweb.com/clientarea.php). Setelah login, pilih menu **Domain > Domain Saya**.

![Gambar 10](https://s20.postimg.cc/i2d85ufn1/gambar_10.png)

Selanjutnya, pada domain yang akan kita konfigurasi, pilih tanda panah pada tombol **Edit**. Dan pilih **Pengaturan Nameserver**.

![Gambar 11](https://s20.postimg.cc/boo52lq6l/gambar_11.png)

Masukkan nameserver yang kita dapat dari Cloudflare.

![Gambar 12](https://s20.postimg.cc/mo9ce83r1/gambar_12.png)

Kosongkan Nameserver 3.

Kemudian, pilih tombol **Ubah Nameserver**.

Sekarang coba lakukan pemanggilan domain kita pada Browser. Apabila belum dapat dipanggil, mungkin ~~perlu menunggu 5-30 menit~~, sampai konfigurasi yang kita atur dapat diterapkan.


## Konfigurasi HTTPS

Karena kita menggunakan _custom domain_, maka pengaturan HTTPS pada GitHub Pages tidak dapat kita gunakan.

![Gambar 13](https://s20.postimg.cc/k7bdc6ga5/gambar_13.png)

Untuk mengakali ini kita perlu melakukan pengaturan HTTPS pada Cloudflare.


### SSL

Buka tab **Crypto** dan pada bagian SSL, pilih **Full**.

![Gambar 14](https://s20.postimg.cc/62am7cg3h/gambar_14.png)

Setelah mengaktifkan SSL ini kita perlu menunggu 24 jam setelah situs aktif di Cloudflare untuk menerbitkan sertifikat baru.

Sampai nanti status **Active Certificate** sudah tersedia, seperti pada gambar di atas.


### Page Rules

Selanjutnya, buka tab **Page Rules**.

![Gambar 14](https://s20.postimg.cc/bezglg1f1/gambar_19.png)

Kita akan menambahkan 3 _rules_ baru untuk _domain_ kita.

1. Always Use HTTPS
2. Forwarding URL
3. Cache Everything

**Always Use HTTPS**

![Gambar 15](https://s20.postimg.cc/q9o1zr8gt/gambar_15.png)

Saya memilih menggunakan APEX domain, dengan nama **bandithijo.com**, sehingga url yang harus saya masukkan adalah `https://bandithijo.com/*`. Penggunaan tanda `*` dimaksudkan untuk membuat _dynamic patterns_ yang dapat mencocokkan banyak URL.

**Forwarding URL**

![Gambar 16](https://s20.postimg.cc/d5ihn2o4t/gambar_16.png)

Dikarenakan saya menggunakan nama domain **bandithijo.com**, maka saya perlu melakukan _forwarding URL_. Tujuannya, apabila terdapat pengunjung yang mengetikkan **www.bandithijo.com** akan langsung diarahkan ke URL **https://bandithijo.com**.

**Cache Level**

![Gambar 17](https://i.postimg.cc/wMxbT1Xw/gambar-17.png)

Mungkin teman-teman ingin menggunakan fitur cache level yang diberikan oleh CloudFlare.

Berikut ini adalah kutipan yang saya ambil dari halaman [support.cloudflare.com](https://support.cloudflare.com/hc/en-us/articles/200172266) yang akan menjelaskan setiap properties dari Cache Level.

```
No overrides
Defaults to the caching level option you have in your Cloudflare performance settings for the domain.

Bypass cache
Will not cache at all

Standard / Aggressive caching
Caches all static content that has a query string in it

Ignore query string
Caches static content that has a query string and treats it as one file

Cache everything
Caches all file types on your site, including static content and HTML. Cloudflare Cache Everything will automatically respect any default cache headers set by the web server or CMS software like WordPress. See this article for more details on how headers affect this setting.

NOTE: When using "Cache everything" you might have trouble with login forms on your site. A common one is WordPress. To correct this you'll need to add another rule as the first rule for the wp-login.php  file that is set to "bypass cache"

```

Konfigurasi cache level ini akan memungkinkan website kita di-cache dan ditampilkan langsung dari CDN Cloudflare. Tentu saja hal ini akan membuat _page load_ dari website kita menjadi lebih cepat lagi.

Sebagai contoh di atas, saya menggunakan "No Query String".

Sebelumnya saya menggunakan "Cache Everything", namun kekurangannya, setiap kita melakukan perubahan pada website kita, hasilya tidak langsung dapat terlihat dalam beberapa saat. Untuk memaksanya, ~~mungkin~~ kita dapat melakukan pembersihan cache dengan **Purge Everything**.

![Gambar 18](https://s20.postimg.cc/h4fp62kjh/gambar_20.png)

Nah! setelah selesai melakukan 3 konfigurasi **Page Rules** di atas, maka, tampilan akhir dari konfigurasi **Page Rules** akan seperti ini.

![gambar 19](https://i.postimg.cc/J0TYyRKM/gambar-18.png)

*Perhatikan! **Always Use HTTPS**, harus berada di layer paling atas.

Dikarenakan kita menggunakan **Free Plan**, maka kita hanya dapat membuat 3 _page rules_. Tapi ini bukan masalah, karena sudah mencakup apa yang kita butuhkan.

> PERHATIAN!
> 
> Saya menggunakan **SSH** untuk melakukan `push` ke dalam repositori GitHub, bukan menggunakan **HTTPS**.
> 
> Saya mencurigai adanya indikasi kegagalan melakukan push ke dalam repositori GitHub, setelah melakukan konfigurasi di atas.
> 
> Apabila hal ini terjadi, maka teman-teman perlu merubah jalur push ke repositori GitHub melalui SSH.
> 
> **Caranya :**
> 
> Buka folder `.git`, kemudian cari file `config`.
> 
> Cari bagian,
> 
> ```
> [remote "origin"]
>     url = https://github.com/bandithijo/bandithijo.github.io.git
> ```
> 
> Diganti menjadi,
> 
> ```
> [remote "origin"]
>     url = git@github.com:bandithijo/bandithijo.github.io.git
> ```
> 
> **Tentunya teman-teman harus melakukan konfigurasi SSH dengan GitHub terlebih dahulu** ([Connecting to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)


# Akhir Kata

Demikian, pengalaman saya melakukan konfigurasi terhadap _custom domain_ untuk GitHub Page, Cloudflare dan DewaWeb yang dapat saya dokumentasikan pada tulisan ini.

Terima kasih saya ucapkan kepada kang [Sucipto](https://sucipto.net/) yang telah meluangkan waktunya untuk dapat membantu saya dalam menjawab pertanyaan-pertanyaan seputar konfigurasi ini.

> INFO
> 
> Pertanggal 28 Januari 2019, saya sudah bermigrasi dari layanan CloudFlare ke Netlify.
> 
> Ceritanya, dapat teman-teman baca di sini, "[BanditHijo.com, Bermigrasi dari Cloudflare ke Netlify]({{ site.url }}/blog/bermigrasi-dari-cloudflare-ke-netlify)".


# Referensi

1. [help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider)
<br>DiaksesTanggal: 2018/04/08

2. [blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/)
<br>DiaksesTanggal: 2018/04/08
