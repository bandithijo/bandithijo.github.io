---
layout: "post"
title: "Konfigurasi Ruby on Rails ActionMailer dengan Gmail"
date: "2020-12-22 08:13"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2020/2020-12-22-konfigurasi-rails-actionmailer-dengan-gmail"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Pada umumnya, tutorial ActionMailer pasti mendemonstrasikan penggunaan SendGrid dengan Heroku. Sudah terlalu mainstream, dan juga sejak SendGrid diakuisisi, jadi lebih sering gagal. Catatan kali ini mungkin dapat membantu teman-teman agar dapat menggunakan layanan Gmail saja. Hari gini, siapa yang gak pakai Gmail?"
---

## Latar Belakang Masalah

Catatan kali ini terinspirasi saat saya mencoba menggunakan SendGrid dengan Heroku sebagai Add-ons, namun tidak berjalan dengan baik.

![Gambar 1]({{ page.assets | absolute_url }}/gambar-01.png)

Gambar 1. Virtual User untuk SendGrid yang dibuatkan oleh Heroku, dibanned oleh SendGrid

Ternyata, masalah tersebut bukan saya saja yang mengalami.

Dari beberapa diskusi di berbagai tempat yang saya baca, satu yang paling menarik adalah diskusi yang dilakukan di GitHub Issues dari SendGrid/doc, [issue #2908](https://github.com/sendgrid/docs/issues/2908).

Dan, pada komentar [yang ini](https://github.com/sendgrid/docs/issues/2908#issuecomment-732194727), saya menemukan solusinya.

Pada komenetar tersebut, ia memberikan resource ini, ["Ruby on Rails Action Mailer configuration"](https://hixonrails.com/ruby-on-rails-tutorials/ruby-on-rails-action-mailer-configuration/).

Pada halaman tersebut ditunjukkan bagaimana cara mengkonfigurasi ActionMailer dengan beberapa layanan, diantaranya:

1. Amazon SES
2. Mailgun
3. SendGrid
4. Mandrill
5. Gmail


## Pemecahan Masalah

Saya memutuskan untuk mencoba konfigurasi dengan Gmail, dengan alasan saya sudah memiliki akun Gmail, jadi tidak perlu daftar lagi.

Karena Gmail menyediakan layanan SMTP sebagai protokol untk berkirim email, maka kita dapat mengkonfigurasi ActionMailer untuk menggunakan protokol SMTP juga.

Gmail memberikan kita jatah 500 email per hari yang dapat dikirim dengan protokol SMTP ini pada paket "free plan", untuk GSuit Standard memiliki jatah 2000 email per hari.

500 email per hari sudah lebih dari cukup, karena saya hanya ingin coba-coba fitur ActionMailer saja.

Ayo kita konfigurasi Gmail terlebih dahulu.


## Konfigurasi Google Account

Cara terbaik untuk menggunakan Google Account tanpa mengendorkan keamanan yang berlapis (2-Step Verification) adalah dengan memanfaatkan fitur **App passwords**.

Dengan fitur App passwords ini, kita dapat mengenerate password untuk masing-masing aplikasi yang ingin kita berikan akses ke akun Gmail kita. Jadi, tidak menggunakan password utama, dan juga masing-masing app akan mendapatkan hasil generate password yang berbeda-beda.

Caranya, teman-teman dapat mengikuti langkah-langkahnya di bawah ini.

1. Buka [**Google Account Security Settings**](https://myaccount.google.com/security).

2. Pastikan **2-Step Verification** sudah di-**enable**-kan (1).

   ![Gambar 2]({{ page.assets | absolute_url }}/gambar-02.png)

3. Pilih **App passwords** (2), untuk men-generate App passwords.

4. Berikan nama aplikasi dengan cara seperti gambar di bawah ini (3).

   ![Gambar 3]({{ page.assets | absolute_url }}/gambar-03.png)

5. Isikan saja dengan nama bebas sesuai nama Rails project yang sedang dikerjakan, agar tidak bingung (4).

   ![Gambar 4]({{ page.assets | absolute_url }}/gambar-04.png)

6. Catat password yang berada di kotak kuning (5).

   ![Gambar 5]({{ page.assets | absolute_url }}/gambar-05.png)

7. Nah, kalau sudah seperti ini. Kita telah berhasil men-generate App password yang nantinya akan kita gunakan untuk ActionMailer.

   ![Gambar 6]({{ page.assets | absolute_url }}/gambar-06.png)

> INFO
> 
> Cara di atas dilakukan dengan mengaktifkan 2-Step Verification, agar kita dapat mengontrol app apa yang akan kita berikan akses dan yang tidak.
> 
> Namun, kalau teman-teman tidak ingin menggunakan 2-Step Verification, tidak perlu melakukan langkah di atas.


## Konfigurasi Rails ActionMailer


### 1. Konfigurasi Gmail SMTP

Untuk mendefinisikan Gmail SMTP, saya memilih mendefinisikan di **config/environment.rb**.

Alasannya, agar konfigurasi Gmail SMTP ini dapat diakses oleh ketiga environment (Developer, Test, dan Production).

```ruby
!filename: config/environment.rb
# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  port:                 587,
  address:              'smtp.gmail.com',
  user_name:            Rails.application.credentials.gmail[:SMTP_USER_NAME],
  password:             Rails.application.credentials.gmail[:SMTP_PASSWORD],
  authentication:       :plain,
  enable_starttls_auto: true
}
```

Baris ke 7- 4, adalah baris yang kita tambahkan.

Dapat dilihat, pada `user_name` & `password`, saya menyimpan credential dengan cara Rails, yaitu memanfaatkan file **config/credentials.yml.enc**. Yang belum pernah tahu, boleh baca di artikel ini, ["Cara Aman Menyimpan Credentials di Rails"](/blog/cara-aman-menyimpan-credentials-di-rails).

Selanjutnya, daftarkan dulu credential tersebut.

```
$ rails credentials:edit
```

```yaml
!filename: config/credentials.yml.enc
# aws:
#   access_key_id: 123
#   secret_access_key: 345

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: f9c45a057d6a...dipotong & diperpendek...ba3d28ecc618f5473746ce

gmail:
  SMTP_USER_NAME: rizqiassyaufi@gmail.com
  SMTP_PASSWORD: aakuruhhfwxlaupa
```

Nah, password yang sebelumnya sudah kita generate pada langkah 6 di atas, kita masukkan sebagai password akun Gmail kita.

Kalau yang tidak menggunakan cara **App passwords**, tinggal masukkan password Gmail.

Simpan dan exit.

Selanjutnya, jangan lupa definisikan **RAILS_MASTER_KEY** yang berisi **config/master.key**, ke server tempat kita mendeploy aplikasi.

Misal, untuk Heroku.

```
$ heroku config:set RAILS_MASTER_KEY=`cat config/master.key`
```


## Konfigurasi Environment


### 1. Development

```ruby
!filename: config/environments/development.rb
Rails.application.configure do
  #...
  #...

  config.action_mailer.delivery_method = :test
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

  #...
  #...
end
```

**delivery_method** `:test` diganti menjadi `:smtp` apabila teman-teman ingin mencoba mengirimkan link konfirmasi dari via email dari Gmail SMTP.

Jika, link konfirmasi hanya ingin di Rails server log saja, biarkan tetap `:test`.


### 2. Production

```ruby
!filename: config/environments/production.rb
Rails.application.configure do
  #...
  #...

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.default_url_options = { host: 'bandithijo-saas-app.herokuapp.com', protocol: 'https' }

  #...
  #...
end
```

Ganti **host:** sesuai dengan alamat dari project teman-teman.

Selesai!

Dengan begini tinggal diuji coba.

Saya akan coba dengan ActionMailer untuk Email Confirmation dengan Devise gem.

{% youtube Vio7yGUJEgw %}


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [hixonrails.com/ruby-on-rails-tutorials/ruby-on-rails-action-mailer-configuration](https://hixonrails.com/ruby-on-rails-tutorials/ruby-on-rails-action-mailer-configuration/) \
   Diakses tanggal: 2020-12-22
