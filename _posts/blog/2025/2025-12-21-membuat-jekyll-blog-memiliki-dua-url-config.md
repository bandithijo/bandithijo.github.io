---
layout: "post"
title: "Membuat Jekyll Blog Memiliki Dua URL Domain"
date: "2025-12-21 05:40"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2025/2025-12-21-membuat-jekyll-blog-memiliki-dua-url-config"
author: "BanditHijo"
category: "blog"
tags: ["jekyll", "netlify"]
description: "Blog ini memiliki dua URL domain, yaitu domain utama dan domain alternatif yang diatur melalui konfigurasi GitHub Workflow untuk domain di GitHub Pages dan Netlify untuk custom domain."
---

{{ page.description }}

Kebutuhan dua domain ini bertujuan untuk membuat blog ini dapat diakses melalui dua jalur berbeda, yaitu:

1. GitHub Pages, [https://bandithijo.github.io](https://bandithijo.github.io)
1. Custom Domain, [https://bandithijo.dev](https://bandithijo.dev)

Hal ini saya lakukan agar ketika saya sudah tidak aktif mengelola custom domain (misal: karena meninggal), blog ini masih dapat diakses melalui domain GitHub Pages. Sehingga konten blog (mudah-mudahan) masih dapat memberikan manfaat bagi yang memerlukan.


## Konsep Dasar

Terdapat banyak cara untuk membuat banyak pintu akses yang mengarah ke blog/web kita. Yang paling umum adalah menggunakan DNS configuration, misalnya dengan membuat CNAME atau ALIAS record yang mengarah ke domain tertentu.

Namun, karena saya menggunakan Jekyll sebagai static site generator, maka saya memilih cara yang lebih sederhana yaitu dengan memanfaatkan fitur konfigurasi Jekyll itu sendiri.

Karena Jekyll mendukung build dengan menggunakan flag `--config` untuk menentukan file konfigurasi yang berbeda, maka saya memanfaatkan fitur ini untuk membuat dua jenis build berdasarkan file config.

```
$ bundle exec jekyll build --config _config_custom.yml
```

Flag `--config` ini juga dapat menerima beberapa file konfigurasi sekaligus, sehingga kita dapat membuat file konfigurasi tambahan yang hanya berisi pengaturan yang ingin diubah saja.

```
$ bundle exec jekyll build --config _config.yml,_config_custom.yml
```


## Implementasi

Strateginya adalah, saya ingin pengaturan `url` untuk file config utama yaitu `_config.yml` mengarah ke domain GitHub Pages, sedangkan untuk file config tambahan yaitu `_config_netlify.yml` mengarah ke custom domain.


### Membuat File Konfigurasi Tambahan

Saya membuat 1 file configurasi tambahan dengan nama `_config_netlify.yml` yang isinya hanya meng-overwrite pengaturan `url` saja.

```yaml
!filename: _config_netlify.yml
url: https://bandithijo.dev
```

Sebgai gambaran, berikut adalah isi dari file `_config.yml` utama.

```yaml
!filename: _config.yml
title: BanditHijo.dev
description: Here's where I started writing some notes that someday I will call it, a book
baseurl: "" # the subpath of your site, e.g. /blog
url: https://bandithijo.github.io # the base hostname & protocol for your site, e.g. http://example.com
author: Rizqi Nur Assyaufi
```

Dapat dilihat bahwa pada file `_config.yml`, pengaturan `url` mengarah ke domain GitHub Pages dan pada file `_config_netlify.yml`, pengaturan `url` mengarah ke custom domain.


### Mengatur Build di GitHub Workflow

Untuk build di GitHub Pages, saya tidak perlu mengubah apapun karena secara default Jekyll akan menggunakan file `_config.yml` secara default jika tidak didefinisikan secara eksplisit.

```yaml
!filename: .github/workflows/jekyll.yml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@4a9ddd6f338a97768b8006bf671dfbad383215f4
        with:
          ruby-version: '3.3.5'
          bundler-cache: true
          cache-version: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${% raw %}{{ steps.pages.outputs.base_path }}{% endraw %}" # 👈 Default config _config.yml
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Pada bagian `Build with Jekyll`, perintah build secara default menggunakan file config `_config.yml` sehingga tidak perlu didefinisikan secara eksplisit.


## Mengatur Build di Netlify

Untuk build di Netlify, saya menambahkan perintah build pada pengaturan di Netlify pada bagian:

**Projects > Deploys > Deploy settings > Build settings > Configure**

Pada bagian `BUild command`, saya menambahkan flag `--config` untuk menggunakan kedua file konfigurasi sekaligus.

```
bundle exec jekyll build --config _config.yml,_config_netlify.yml
```

![Gambar 1]({{ page.assets | absolute_url }}/gambar_01.png)

Gambar 1. Pengaturan Build Command di Netlify

Selesai!


## Pengecekan

Setelah melakukan git push ke repository, saya melakukan pengecekan pada kedua domain, pada bagian `<head>...</head>` untuk memastikan bahwa tag `<link rel="canonical" ...>` mengarah ke domain yang sesuai.

1. Pada domain GitHub Pages,
   ```html
   <link rel="canonical" href="https://bandithijo.github.io/">
   ```

1. Pada custom domain,
   ```html
   <link rel="canonical" href="https://bandithijo.dev/">
   ```

Dengan demikian, blog Jekyll ini sekarang dapat diakses melalui dua URL domain yang berbeda.


## Pemanfaatan

Jika pada Jekyll blog menggunakan `{% raw %}{{ site.url }}{% endraw %}` pada template, maka hasilnya akan menyesuaikan dengan domain yang diakses.
