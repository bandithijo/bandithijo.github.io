---
layout: "post"
title: "Export Data ke XLSX (SpreadSheet) pada Rails"
date: "2020-07-09 00:56"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-07-09-export-data-ke-xlsx-spreadsheet-pada-rails"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Saya memeiliki sejumlah data yang ingin saya eksport ke dalam bentuk spreadshet dengan format XLSX. Apakah saya dapat melakukannya dengan Ruby on Rails?"
---

# Prerequisite

`ruby 2.6.6` `rails 5.2.4` `postgresql 12.3`


# Sekenario Masalah

Saya punya data yang ingin di-*eksport* ke dalam bentuk *spreadsheet* dengan format **.xlsx**.


# Pemecahan Masalah

Kita dapat menggunakan bantuan gem [**axlsx**](https://github.com/randym/axlsx) & [**axlsx_rails**](https://github.com/caxlsx/caxlsx_rails). Namun, gem ini sudah tidak dimaintain lagi.

Nah, kita akan menggunakan versi yang dimaintain oleh komunitas bernama [**cxlsx**](https://github.com/caxlsx/caxlsx) & [**cxlsx_rails**](https://github.com/caxlsx/caxlsx_rails).


# Instalasi

Pasang gem yang dibutuhkan di `Gemfile`.

```ruby
!filename: Gemfile
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

...
...
gem 'caxlsx',                             '~> 3.0', '>= 3.0.1'
gem 'caxlsx_rails',                       '~> 0.6.2'
```

Kemudian install.

```
$ bundle install
```


# Implementasi

Kita akan membuat tombol pada view template dan akan di-respon oleh controller.


## Controller

Saya akan mengawali dengan membuat response ke controller apabila tombol pada view template di tekan.

```ruby
!filename: app/controllers/cases_controller.rb
class CasesController < ApplicationController

  def index
    @cases = Case.all

    respond_to do |format|
      format.html
      format.xlsx {
        response.headers['Content-Disposition'] = \
        "attachment; \
         filename=COVID-19_INDO_PERHARI_#{@cases.last.fetched_at}.xlsx"
      }
    end
  end
end
```

Apabila ingin merubah nama file, dapat merubah pada bagian `filename=...` di baris ke-13 tersebut.


## View Template

Selanjutnya, kita buat link atau button yang akan di respon oleh controller.

```eruby
!filename: app/views/cases/index.html.erb
<%= link_to cases_path(format: "xlsx"), class: "button is-fullwidth-mobile" do %>
  <span class="icon">
    <%= image_tag 'file-download-solid.svg', width: '12' %>
  </span>
  <span class="has-text-weight-normal">Export as SpreadSheet</span>
<% end %>
```

Bagian yang harus diperhatikan adalah baris ke-3, `..._path(format: "xlsx")`.

Selanjutnya, kita akan buat view template untuk file **.xlsx** yang akan di download.

Buat file view template `app/views/cases/index.xlsx.axlsx`.

```ruby
!filename: app/views/cases/index.xlsx.axlsx
wb = xlsx_package.workbook

wb.add_worksheet(name: "Cases") do |sheet|
  # Blok ini untuk head dari baris (baris head paling atas)
  sheet.add_row %w(id fetched_at positif_covid meninggal_covid
                   sembuh_covid jumlah_odp jumlah_pdp)

  # Blok ini untuk data, urutkan sesuai baris head di atas
  @cases.each do |kasus|
    sheet.add_row [kasus.id, kasus.fetched_at.strftime("%F"),
                   kasus.positif_covid, kasus.meninggal_covid,
                   kasus.sembuh_covid, kasus.jumlah_odp,
                   kasus.jumlah_pdp]
  end
end
```

Perhatikan pada baris ke-7 dan ke-12, basicnya `.add_row()` ini menampung value berupa Array.

Pada baris ke-7, adalah salah satu bentuk lain cara pemanggilan Array di Ruby.

Selesai!


# Pesan Penulis

Catatan ini bukan merupakan tutorial, saya hanya ingin memberikan gambaran betapa mudahnya mengeksport data ke dalam format **.xlsx** dari Rails menggunakan **cxlsx** dan **cxlsx_rails**.

Maka dari itu, apabila teman-teman ingin mendapatkan penjelasan yang lebih baik, silahkan mengunjungin dokumentasi dari cxlsx_rails. Tentunya akan lebih *up to date* dari yang saya tulis di sini.

Saya juga memanfaatkan gem ini untuk mengeksport data ke spreadsheet seperti yang saya lakukan di [bandithijo.github.io/covid19](https://bandithijo.github.io/covid19)

Saya rasa hanya ini yang dapat saya tuliskan saat ini.

Mudah-mudahan dapat bermanfaat untuk teman-teman.

Terima kasih.

(^_^)


# Referensi

1. [github.com/randym/axlsx](https://github.com/randym/axlsx) \
   Diakses tanggal: 2020-07-09

1. [github.com/caxlsx/caxlsx_rails](https://github.com/caxlsx/caxlsx_rails) \
   Diakses tanggal: 2020-07-09

1. [github.com/caxlsx/caxlsx](https://github.com/caxlsx/caxlsx) \
   Diakses tanggal: 2020-07-09

1. [github.com/caxlsx/caxlsx_rails](https://github.com/caxlsx/caxlsx_rails) \
   Diakses tanggal: 2020-07-09

1. [%Q, %q, %W, %w, %x, %r, %s](https://simpleror.wordpress.com/2009/03/15/q-q-w-w-x-r-s/) \
   Diakses tanggal: 2020-07-09
