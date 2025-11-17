---
layout: "post"
title: "Memasang Bootstrap 4 pada Rails 6 dengan Yarn"
date: "2020-12-20 07:52"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-12-20-memasang-bootstrap-pada-rails-menggunakan-yarn"
author: "BanditHijo"
category: "blog"
tags: ["rails", "bootstrap"]
description: "Mungkin belum ada gem yang menyediakan integrasi Bootstrap 4 dengan Rails 6. Jangan khawatir, karena kita tetap dapat memasang Bootstrap 4 dengan menggunakan Yarn. Caranya juga sangat mudah sekali!"
---

# Latar Belakang

Saya mulai membiasaka membuat project-project latihan dengan Rails 6, agar saat mengerjakan project sungguhan sudah terbiasa dengan versi terbaru dari Rails ini.

Kali ini, saya akan mencatat bagaimana cara memasang Bootstrap 4 ke dalam Rails 6.

Pasti terdapat banyak cara, namun yang saya catat kali ini dalah menggunakan **Yarn**.

Yarn ini ibarat package manager untuk Javascript yang dapat digunakan untuk mengambil dan memasang package/library/module dari repository yang tersedia ke sistem kita dengan mudah --kira-kira seperti itulah. 😁

Jadi, kalau teman-teman belum memiliki yarn, boleh dipasang terlebih dahulu.

Oke langsung saja.


# Instalasi

Untuk memsang Bootstrap 4 dengan yarn, pastikan kita sudah berada di root direktori project yang akan dipasang Bootstrap.

Lalu jalankan,

```
$ yarn add bootstrap@4 jquery popper.js
```

\* Karena Bootstrap sangat tergantung dengan JQuery dan Popper.js, maka kita juga perlu menyertakan dalam proses instalasi.

Tunggu saja prosesnya hingga selesai.

```
success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
├─ bootstrap@4.6.0
├─ jquery@3.5.1
└─ popper.js@1.16.1
info All dependencies
├─ bootstrap@4.6.0
├─ jquery@3.5.1
└─ popper.js@1.16.1
Done in 9.33s.
```

Kalau sudah selesai, Coba teman-teman buka file `package.json` yang ada di root project direktori.

```json
!filename: package.json
{
  "name": "photo_app",
  "private": true,
  "dependencies": {
    "@rails/actioncable": "^6.0.0",
    "@rails/activestorage": "^6.0.0",
    "@rails/ujs": "^6.0.0",
    "@rails/webpacker": "4.3.0",
    "bootstrap": "4.5",
    "jquery": "^3.5.1",
    "popper.js": "^1.16.1",
    "turbolinks": "^5.2.0"
  },
  "version": "0.1.0",
  "devDependencies": {
    "webpack-dev-server": "^3.11.0"
  }
}
```

Perhatikan pada baris 9-11 adalah paket yang baru saja kita pasang menggunakan yarn.


# Konfigurasi


## 1. Konfigurasi Webpack

```javascript
!filename: config/webpack/environment.js
const { environment } = require('@rails/webpacker')

const webpack = require("webpack")

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

module.exports = environment
```

Tambahkan pada baris 3-9 di antara baris 1-11.


## 2. Konfigurasi Javascript

Pada Rails 6, struktur direktori untuk Javascript bukan lagi berada di dalam `app/assets/`, melainkan sudah berada di `app/javascript/`.

Kita perlu mengimport Bootstrap ke dalamnya.

```javascript
!filename: app/javascript/packs/application.js
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "bootstrap"
```

Baris ke 18 adalah baris yang perlu ditambahkan.


## 3. Konfigurasi StyleSheet

Selanjutnya, buat file scss baru pada direktori yang sama dengan nama **custom.scss**.

```scss
!filename: app/assets/stylesheets/custom.scss
@import 'bootstrap/scss/bootstrap';
```

Selesai!

> PERTANYAAN?
> 
> **Darimana saya mengetahui path stylesheet dari sebuah javascript library?**
> 
> Telusuri file stylesheet dari Javascript library yang digunakan, di dalam direktori **node_modules** (dalam root project direktori).


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [mashrurhossain.com/blog/rails6bootstrap4](https://www.mashrurhossain.com/blog/rails6bootstrap4) \
   Diakses tanggal: 2020-12-20

1. [dev.to/somnathpaul/add-bootstrap-4-to-your-ruby-on-rails-6-application-ole](https://dev.to/somnathpaul/add-bootstrap-4-to-your-ruby-on-rails-6-application-ole) \
   Diakses tanggal: 2020-12-20
