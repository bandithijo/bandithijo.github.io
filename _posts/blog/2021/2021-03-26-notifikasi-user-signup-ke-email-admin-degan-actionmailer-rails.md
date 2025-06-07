---
layout: 'post'
title: "Notifikasi User Sign Up ke Email Admin dengan ActionMailer Rails"
date: '2021-03-26 19:00'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Rails']
pin:
hot:
contributors: []
description: "Catatan kali ini, saya akan mencatatat tentang bagaimana membuat email notifikasi yang dikirimakan ke email admin, apabila terdapat user yang baru mendaftar (signup) ke web aplikasi yang kita develop. Kita dapat menggunakan Rails ActionMailer untuk fitur ini."
---

# Prerequisite

`Ruby 3.0.0` `Rails 6.1.3`


# Latar Belakang Masalah

Membuat fitur email notifikasi ke email admin apabila terdapat user baru yang mendaftar (*signup*) ke web aplikasi yang kita develop.


# Pemecahan Masalah


## Generate Mailer

Saya akan memberikan nama **AdminMailer** untuk fitur mailer yang akan dibuat.

```
$ rails g mailer AdminMailer
```

Perintah ini akan mengenerate file mailers dan juga directory views yang bernama **admin_mailer**.

```
📂 app/
│ 📁 assets/
│ 📁 channels/
│ 📁 controllers/
│ 📁 helpers/
│ 📁 javascript/
│ 📁 jobs/
│ 📂 mailers/
│ │ 📄 admin_mailer.rb 👈️
│ └ 📄 application_mailer.rb
│ 📁 models/
└ 📂 views/
  │ 📁 admin_mailer/ 👈️
  └ 📁 layouts/
📁 bin/
📁 config/
📁 db/
...
...
```


## Konfigurasi Mailer

Modifikasi alamat **from**,

```ruby
default from: 'from@example.com'
```

sesuai yang kita inginkan.

```ruby
@filename: app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@siaga-covid19.herokuapp.com"
  layout "mailer"
end
```

Selanjutnya, modifikasi file **admin_mailer.rb**, yang sudah kita generate sebelumnya.

Kita akan mendefinisikan alamat email admin **default to:** dan juga mendefinisikan fungsi untuk **new_user(user)**.

```ruby
@filename: app/mailers/admin_mailer.rb
class AdminMailer < ApplicationMailer
  default to: "admin@siaga-covid19.herokuapp.com"

  def new_user(user)
    @user = user
    mail(subject: "SiagaCOVID19 - New User: #{user.email}")
  end
end
```

Saya membuat instance variable `@user` yang akan saya gunakan pada view template.


## Mailer Views Template

Pada file **app/mailers/admin_mailer.rb**, kita sudah mendefinisikan sebuah method yang bernama **new_user()**.

Seperti halnya controller, method tersebut juga merupakan action yang akan menghubungkan dengan view template.

Jadi kita akan membuat file bernama **app/views/admin_mailer/new_user.html.erb**.

```eruby
@filename: app/views/admin_mailer/new_user.html.erb
<h1>New User!</h1>
<p>There is new user joined SiagaCOVID19:</p>
<h3><%= @user.email %></h3>
```

Template di atas, dapat teman-teman buat sesuai preferensi masing-masing.

Yang saya catat di atas, hanya contoh sederhana saja.


## Models

Karena kita akan memberikan notifikasi email apabila terdapat user baru yang mendaftar, maka logika bisnis untuk mengirimkan notifikasi akan kita letakkan pada **user** model.

```ruby
@filename: app/models/user.rb
class User < ApplicationRecord
  after_create :send_notification

  def send_notification
    AdminMailer.new_user(self).deliver
  end
end
```

Selesai!


# Hasilnya

Apabila terdapat user baru yang mendaftarkan account, admin akan mendapatkan email seperti ini.

![Gambar 1](https://i.postimg.cc/Ls7zRQbx/gambar-01.png)

Gambar 1. Email yang dikirimkan ke admin jika ada user baru yang mendaftar

Template email ini, sesuai dengan template yang kita didefinisikan pada **app/views/admin_mailer/new_user.html.erb**.


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [Rails Guides - Action Mailer Basics](https://guides.rubyonrails.org/action_mailer_basics.html)
<br>Diakses tanggal: 2021/03/26

2. [github.com/rails/rails/](https://github.com/rails/rails/)
<br>Diakses tanggal: 2021/03/26

3. [GoRails - Sending Emails in Rails with Mandrill](https://youtu.be/LcO5BuyFFAk)
<br>Diakses tanggal: 2021/03/26
