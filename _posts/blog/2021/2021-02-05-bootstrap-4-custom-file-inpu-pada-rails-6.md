---
layout: "post"
title: "Bootstrap 4 Custom File Input dengan bs-custom-file-input Javascript pada Rails 6"
date: "2021-02-05 01:19"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2021/2021-02-05-bootstrap-4-custom-file-inpu-pada-rails-6"
author: "BanditHijo"
category: "blog"
tags: ["rails", "bootstrap"]
description: "Bootstrap 4 menyediakan component untuk custom file input, namun component ini memiliki dependensi Javascript library yang bernama bs-custom-file-input. Catatan kali ini, saya akan membahas bagaimana cara memasang bs-custom-file-input pada Rails 6 yang menggunakan Webpacker."
---

## Prerequisite

`ruby 2.7.2` `rails 6.1.1` `bootstrap 4.6` `bs-custom-file-input 1.3.4`


## Latar Belakang Masalah

Catatan kali ini, saya akan membicarakan developing dari sisi front-dend. Yaitu memasang component **Custom File Input** Bootstrap 4 pada Rails 6.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Form input csv file

Component ini, dapat teman-teman lihat di sini, [**Components > Custom file input**](https://getbootstrap.com/docs/4.6/components/input-group/#custom-file-input).

Seperti yang kita tahu, Rails 6 secara default menggunakan Webpacker untuk mem-packaging dan mem-bundling aset-aset Javascript. Sehingga cara mengkonfigurasi Javascript library tentu akan sedikit berbeda dengan saat kita menggunakan Rails 5 yang menggunakan Sprockets.


## Permasalahan

Component custom file input milik Bootstrap tersebut memerlukan Javascript library yang berama [**bs-custom-file-input**](https://www.npmjs.com/package/bs-custom-file-input).

Kalau kita belum memasang library tersebut, maka akan seperti di bawah ini.

![Gambar 2]({{ page.assets }}/gambar-02.gif)

Gambar 2. Demo tidak bisa melakukan import CSV file

Dapat dilihat, **nama file** yang kita pilih, tidak tampil di input field.

Nah, ini karena bs-custom-file-input belum dipasang.


## Instalasi


### Pasang bs-custom-file-input library

Saya memilih menggunakan **yarn** untuk memasang library ini.

```
$ yarn add bs-custom-file-input
```


### Definisikan pada pack

Kita perlu memanggil library bs-custom-file-input ke dalam pack yang terletak pada **app/javascript/packs/application.js**.

```javascript
!filename: app/javascript/packs/application.js
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'bootstrap'
import bsCustomFileInput from 'bs-custom-file-input'

$(document).on('turbolinks:load', function() {

  // for bs-custom-file-input
  bsCustomFileInput.init()

})
```

Baris ke-7, adalah proses import dari bs-custom-file-input library.

Baris ke-12, adalah proses inisialisasi, untuk menjalankan library.

Kelar!

Hanya seperti ini saja.

Sekarang, seharusnya sudah berhasil memunculkan nama file pada input field.

![Gambar 3]({{ page.assets }}/gambar-03.gif)

Gambar 3. Demo proses import CSV file

Mantap!


## Pesan Penulis

Ngomong-ngomong, kalau masih kesulitan mengintegrasikan Bootstrap 4 dengan Rails 6, dapat membaca catatan saya di sini, [**Memasang Bootstrap 4 pada Rails 6 dengan Yarn**](/blog/memasang-bootstrap-pada-rails-menggunakan-yarn).

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [getbootstrap.com/docs/4.6/components/input-group/](https://getbootstrap.com/docs/4.6/components/input-group/) \
   Diakses tanggal: 2021-02-05

1. [www.npmjs.com/package/bs-custom-file-input](https://www.npmjs.com/package/bs-custom-file-input) \
   Diakses tanggal: 2021-02-05
