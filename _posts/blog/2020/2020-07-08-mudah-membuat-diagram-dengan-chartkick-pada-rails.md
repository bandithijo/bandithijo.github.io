---
layout: "post"
title: "Mudah Membuat JavaScript Diagram dengan ChartKick pada Rails"
date: "2020-07-08 11:32"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-07-08-mudah-membuat-diagram-dengan-chartkick-pada-rails"
author: "BanditHijo"
category: "blog"
tags: ["rails", "javascript", "chartkick"]
description: "Mudah membuat grafik diagram pada Ruby on Rails dengan menggunakan ChartKick gem."
---

# Sekenario Masalah

Saya membuat sebuah *side project* untuk melakukan *scraping* data dan dicatat perhari.

Ketika data sudah mulai berkembang, maka diperlukan grafik untuk mempermudah dalam melakukan penilaian terhadap data yang telah dikumpulkan.


# Pemecahan Masalah

Untuk membuat atau menambahkan grafik, JavaScript library yang terkenal adalah **Chart.JS**.

Nah, pada Ruby on Rails, sudah ada yang membuatkan librarynya bernama **ChartKick**.

Dengan menggunakan ChartKick, kita hanya perlu memanggil dengan satu baris sintaks saja. Enak banget kan!


# Instalasi ChartKick

Pasang gem di `Gemfile`.

```ruby
!filename: Gemfile
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

...
...
gem 'chartkick',                          '~> 3.3', '>= 3.3.1'
```

Kemudian install.

```
$ bundle install
```


# Konfigurasi

**Rails 6 / Webpacker**

```
$ yarn add chartkick chart.js
```

Kemudian tambahkan pada `app/javascript/packs/application.js`,

```javascript
!filename: app/javascript/packs/application.js
require("chartkick")
require("chart.js")
```

**Rails 5 / Sprockets**

Cukup menambahkan pada `app/assets/javascripts/application.js`,

```javascript
!filename: app/assets/javascripts/application.js
//= require chartkick
//= require Chart.bundle
```

Konfigurasi di atas akan mengeset ChartKick untuk menggunakan **Chart.JS**.

Apabila teman-teman ingin menggunakan JavaScript chart library yang lain, seperti **Google Charts** dan **Highcharts**, dapat mengunjungi dokumentasi dari ChartKick [di sini](https://chartkick.com/#installation).

Sekarang tinggal implementasi.


# Contoh-contoh Chart

Kita dapat langsung membuat chart dengan cara seperti ini.

**Line Chart (Grafik Garis)**

```eruby
<%= line_chart a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3 %>
```

![Gambar 1](https://i.postimg.cc/sxLgvFk5/gambar-01.png)

**Area Chart**

```eruby
<%= area_chart a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3 %>
```

![Gambar 2](https://i.postimg.cc/Y0CTThyx/gambar-02.png)

**Column Chart (Grafik Batang Berdiri)**

```eruby
<%= column_chart a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3 %>
```

![Gambar 3](https://i.postimg.cc/QCYvDh2Z/gambar-03.png)

**Bar Chart (Grafik Batang Tidur)**

```eruby
<%= bar_chart a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3 %>
```

![Gambar 4](https://i.postimg.cc/ZK01cvNb/gambar-04.png)

**Pie Chart (Grafik Lingkaran)**

```eruby
<%= pie_chart a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3 %>
```

![Gambar 5](https://i.postimg.cc/G3XWGxHg/gambar-05.png)

Dan masih banyak lagi chart yang tidak dapat saya tampilkan di blog ini, silahkan teman-teman mengunjungi halaman depan dari **ChartKick**.


# Options

Kita juga dapat menambahkan option-option lain agar grafik yang kita tampilkan lebih informatif.

Dapat pula ditambahkan tombol download yang nanti akan disimpan dalam bentuk file gambar.

Contohnya seperti ini.

```eruby
<%= area_chart({a: 2, b: 5, c: 3, d: 15, e: 6, f: 12, g: 3},
                title: "Grafik Area",
                xtitle: "X Title",
                ytitle: "Y Title",
                colors: ["#B10000"],
                download: {
                  filename: "Grafik Area.png",
                  background: "#ffffff"
                },
                dataset: {
                  borderWidth: 1
                }) %>
```

![Gambar 6](https://i.postimg.cc/T1BQQ181/gambar-06.png)

Dan masih banyak lagi option-option yang dapat digunakan, silahkan teman-teman mengunjungi dokumentasi dari ChartKick.


# Implementasi

Nah, setelah teman-teman mengenal bentuk-bentuk dari chart dan option-option yang dapat digunakan, selanjutnya kita akan memasangkan dengan data yang ada di database kita.

Untuk implementasi ke dalam Rails, ada bermacam-macam.

Sekenarionya, saya memiliki model `Case`. Saya mau mengambil data total `:positif_covid` setiap harinya berdasarkan tanggal `:fetched_at`.


## Langsung diletakkan di view template

```eruby
!filename: app/views/cases/index.rb
<%= line_chart Case.group_by_day(:fetched_at).sum(:positif_covid) %>
```


## Melalui Controller

Definisikan instance variable di controller.

```ruby
!filename: app/controllers/case_controller.rb
  def index
    ...
    ...
    @data_positif_covid = Case.group_by_day(:fetched_at).sum(:positif_covid)
  end
```

> INFO
> 
> Saya menggunakan method `.group_by_day()` yang disediakan oleh [**groupdate**](https://github.com/ankane/groupdate) gem.

Kemudian, tinggal dipakai di view template.

```eruby
!filename: app/views/cases/index.rb
<%= line_chart @data_positif_covid %>
```

Nah, contoh-contoh lain, mengenai bagaimana cara mengambil data yang kita miliki, dapat teman-teman lihat pada dokumentasi **ChartKick**, baik di official websitenya maupun dari halaman README GitHubnya.


# Pesan Penulis

Catatan ini bukan merupakan tutorial, saya hanya ingin memberikan gambaran betapa mudahnya memasang grafik ke dalam Rails menggunakan ChartKick gem.

Maka dari itu, apabila teman-teman ingin mendapatkan penjelasan yang lebih baik, silahkan mengunjungin dokumentasi ChartKick. Tentunya akan lebih *up to date* dari yang saya tulis di sini.

Saya juga memanfaatkan gem ini untuk menampilkan grafik seperti yang saya lakukan di [bandithijo.github.io/covid19](https://bandithijo.github.io/covid19).

Saya rasa hanya ini yang dapat saya tuliskan saat ini.

Mudah-mudahan dapat bermanfaat untuk teman-teman.

Terima kasih.

(^_^)


# Referensi

1. [chartkick.com/](https://chartkick.com/) \
   Diakses tanggal: 2020-07-08

1. [github.com/ankane/chartkick](https://github.com/ankane/chartkick) \
   Diakses tanggal: 2020-07-08

1. [chartjs.org/](https://www.chartjs.org/) \
   Diakses tanggal: 2020-07-08
