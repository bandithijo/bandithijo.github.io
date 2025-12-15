---
layout: "post"
title: "Konfigurasi Ruby on Rails ActionMailer pada Local Environment dengan MailCatcher"
date: "2021-03-11 17:01"
permalink: "/blog/:title"
assets: "/assets/images/posts/2021/2021-03-11-ruby-on-rails-actionmailer-local-mailcatcher"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Sebelumnya, saya sudah pernah mencatat tentang konfigurasi ActionMailer dengan memanfaatkan Gmail SMTP protokol untuk mengirimkan email confirmation. Untuk testing di lokal, kita dapat memanfaatkan tools MailCatcher."
---

## Prerequisite

`ruby 3.0.0` `rails 6.1.3` `postgresql 12.5` `rspec 4.0.0`


## Latar Belakang Masalah

Mungkin teman-teman pernah dalam situasi harus mendevelop fitur email di web aplikasi yang teman-teman bangun, tapi tidak ada internet.

Hahaha jarang sekali yaa. Tapi, misalkan kita sedang apes dan terjebak dalam situasi seperti itu.


## Pemecahan Masalah

Kita akan menggunakan MailCatcher.

> MailCatcher runs a super simple SMTP server which catches any message sent to it to display in a web interface.
>
> Run mailcatcher, set your favourite app to deliver to `smtp://127.0.0.1:1025` instead of your default SMTP server, then check out `http://127.0.0.1:1080` to see the mail that's arrived so far.

Dengan MailCatcher, kita dapat manangkap email yang dikirimkan dengan prokotol SMTP ke localhost.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Interface dari MailCatcher

Sebenarnya, kita dapat membaca email dari log yang ditampilkan pada Rails server log. Namun, tentu saja kita tidak dapat melihat view template dari email.


## Instalasi

Proses instalasi sangat mudah, selayaknya memasan gem.

```
$ gem install mailcatcher
```


## Jalankan MailCatcher Daemon

Setelah proses instalasi selesai, jalankan MailCatcher daemon.

```
$ mailcatcher
```

```
Starting MailCatcher
==> smtp://127.0.0.1:1025
==> http://127.0.0.1:1080/
*** MailCatcher runs as a daemon by default. Go to the web interface to quit.
```

Port **1025** denga protokol SMTP, akan kita pasangkan pada Rails.

Untuk mengakses MailCatcher Web Interface, dapat diakses dengan alamat,

```
http://127.0.0.1:1080
```


## Rails Config

```ruby
!filename: config/environments/development.rb
config.action_mailer.raise_delivery_errors = false
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = { address: "127.0.0.1", port: 1025 }
```

Kalau menggunakan Devise, biasanya diminta untuk menambahkan,

```ruby
config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
```

Jadinya akan seperti ini

```ruby
!filename: config/environments/development.rb
config.action_mailer.raise_delivery_errors = false
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = { address: "127.0.0.1", port: 1025 }
config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
```

Sesuaikan saja dengan yang sudah ada. Jangan ada baris konfig yang berulang.

**Perhatian!**

Karena **action_mailer.delivery_method** di atas menggunakan protokol `:smtp`, kita perlu memisahkan antara ActionMailer development dengan production.

Apabila terdapat configurasi untuk ActionMailer pada file **config/environment.rb**, tinggal tambahkan kondisi untuk environment production.

```ruby
!filename: config/environment.rb
# ...

# ActionMailer with Gmail
if Rails.env.production?
  ActionMailer::Base.smtp_settings = {
    port:                 587,
    address:              'smtp.gmail.com',
    user_name:            Rails.application.credentials.gmail[:SMTP_USER_NAME],
    password:             Rails.application.credentials.gmail[:SMTP_PASSWORD],
    authentication:       :plain,
    enable_starttls_auto: true
  }
end
```

Selesai!


## Demonstrasi

![Gambar 2]({{ page.assets }}/gambar-02.gif)

Gambar 2. Demo registration dan get confirmation email dengan MailCatcher

Dengan begini, kita dapat menguji fitur email dengan berbagai macam alamat email yang akan langsung ditangkap oleh MailCatcher.


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [mailcatcher.me](https://mailcatcher.me/) \
   Diakses tanggal: 2021-03-11
