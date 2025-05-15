---
layout: 'post'
title: "Cara Aman Menyimpan Credentials di Rails"
date: 2020-11-26 11:59
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips', 'Rails']
pin:
hot:
contributors: []
description: "Menyimpan credentials merupakan hal yang wajib sebagai seorang developer atau sistem administrator. Ada banyak sekali cara yang dapat diimplementasikan. Catatan kali ini mungkin hanya salah satu cara yang mungkin dapat teman-teman gunakan."
---

# Latar Belakang

Biasanya Junior Programmer (seperti saya) belum mengetahui bagaimana cara mendefinisikan dan menyimpan credential dengan aman.

Credential di sini, biasanya API token dari service-service yang akan kita gunakan dalam web aplikasi yang kita bangun.

Contoh kasus:

Di awal project, kita membuat sebuah file bernama **local_env.yml.example**. File ini yang nantinya dicopy dan direname menjadi **local_env.yml**. Kemudian, kita masukkan file tersebut (local_env.yml) ke dalam **.gitignore**.

<pre>
PREOJECT_DIR/
├─ app/
├─ bin/
├─ config/
│  ├─ <mark>local_env.yml.example</mark>
│  └─ <mark>local_env.yml</mark>   <- di-include ke .gitignore
├─ db/
├─ lib/
├─ ...
└─ ...
</pre>

Nah, pada file **local_env.yml** ini, yang nantinya semua dev akan menempatkan credential. Biasanya credential didapatkan dari group chat internal (biasanya ada di catatan/note dari project). Jadi tidak diikutkan bersama project yang akan di push ke Git repo.

Biasanya, pada implementasi di code program, akan menggunakan cara seperti ini.


{% highlight_caption config/local_env.yml %}
{% highlight yaml linenos %}
# config/local_env.yml

# ...
# ...
SENDGRID_USERNAME: "engineering"
SENDGRID_PASSWORD: "d3v3l0p3r"
{% endhighlight %}

{% highlight_caption config/environments/development.rb %}
{% highlight ruby linenos %}
Rails.application.configure do
# ...
# ...

config.action_mailer.smtp_settings = {
address:              "smtp.sendgrid.net",
port:                 587,
domain:               "localhost:3000",
authentication:       "plain",
user_name:            ENV["SENDGRID_USERNAME"],
password:             ENV["SENDGRID_PASSWORD"],
enable_starttls_auto: true
}
end
{% endhighlight %}

Perhatikan, pada baris ke 15 & 16. Seperti itu cara kita memanggilnya.

Menggunakan,

```ruby
ENV["..."]
```

# Pemecahan Masalah

Rails sudah menyediakan file **credentials.yml.enc** (.enc adalah abreviation dari encrypted) dan juga **master.key**.

<pre>
PREOJECT_DIR/
├─ app/
├─ bin/
├─ config/
│  ├─ <mark>credentials.yml.enc</mark>
│  └─ <mark>master.key</mark>
├─ db/
├─ lib/
├─ ...
└─ ...
</pre>

**credentials.yml.enc**, adalah file terenkripsi yang akan kita gunakan untuk menyimpan credential yang kita miliki. Untuk membukanya, kita memerlukan kunci, dan kunci tersebut adalah **master.key**.

Untuk membuka enkripsi tersebut, gunakan perintah di bawah ini di Terminal.

{% shell_user %}
rails credentials:edit
{% endshell_user %}

{% box_info %}
<p markdown=1>Namun, sebelum menjalankanya, teman-teman perlu mengecek terlebih dahulu, apa hasil dari,</p>
<pre>
$ <b>echo $EDITOR</b>
</pre>
<p markdown=1>Karena, perintah `rails credentials:edit` akan membuka text editor yang didefinikan di `$EDITOR`.</p>
<p markdown=1>Misal seperti saya, isinya adalah `vim` (karena saya mendefinikan `export EDITOR=vim`).</p>
<div style="border-bottom: 1px dashed #0B4AB9;margin: 15px 0;"></div>
<p markdown=1>Tapi, teman-teman juga dapat menggunakan editor lain, misal VSCode.</p>
<pre>
$ <b>EDITOR="code --wait" rails credentials:edit</b>
</pre>
{% endbox_info %}

Kalau berhasil, file tersebut akan terbuka sebagai **credentials.yml**

{% highlight_caption config/credentials.yml.enc %}
{% highlight yaml linenos %}
# aws:
#   access_key_id: 123
#   secret_access_key: 345

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: 5877ac9c9c1ee0e...40e65a9c453...d2e1c70a9f12a6
{% endhighlight %}

Secara default, isinya hanya seperti di atas.

File ini berformat yaml, artinya kita menggunakan struktur yaml dalam mendifinikan variable di dalamnya.

Contohnya seperti pada bagian `#aws:`.

Nah, sekarang, kita dapat menambahkan credential dari API token yang kita miliki.

{% highlight_caption config/credentials.yml.enc %}
{% highlight yaml linenos %}
# aws:
#   access_key_id: 123
#   secret_access_key: 345

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: 5877ac9c9c1ee0e...40e65a9c453...d2e1c70a9f12a6

# iexcloud.io sandbox
iex_sandbox:
  publishable_token: Tpk_f854a7..................1de44260
  secret_token: Tsk_0a7246...................f8a3886
{% endhighlight %}

Kemudian, cara memanggilnya pada code program.

{% highlight_caption app/models/stock.rb %}
{% highlight ruby linenos %}
class Stock < ApplicationRecord
  # you can find the API token here: https://iexcloud.io/console/tokens
  def self.new_lookup(ticker_symbol)
    client = IEX::Api::Client.new(
      publishable_token: Rails.application.credentials.iex_sandbox[:publishable_token],
      secret_token:      Rails.application.credentials.iex_sandbox[:secret_token],
      endpoint:          'https://sandbox.iexapis.com/v1'
    )
    client.price(ticker_symbol)
  end
end
{% endhighlight %}

Perhatikan, baris ke 7 & 8. Seperti itu cara kita memanggilnya.

Menggunakan,

```ruby
Rails.application.credentials
```

# Tambahan

## Heroku Environment Variable

Kita perlu mendefinisikan **RAILS_MASTER_KEY** pada menu **Settings > Config Vars**.

**Syarat!** file **credentials.yml.enc** jangan dimasukkan ke dalam **.gitignore**.

Cukup jalankan perintah di bawah ini untuk mengeset `RAILS_MASTER_KEY` pada Heroku.

{% shell_user %}
heroku config:set RAILS_MASTER_KEY=`cat config/master.key`
{% endshell_user %}

Kalau berhasil, akan memberikan output seperti ini.

```
Setting RAILS_MASTER_KEY and restarting ⬢ apps_name... done, v25
▸ Release command executing: this config change will not be available until the command succeeds. Use `heroku releases:output` to view the log.
RAILS_MASTER_KEY: 8ab10......................f4864
```

Maka, variable **RAILS_MASTER_KEY** sudah otomatis dibuatkan.

Dengan begini, aplikasi kita di Heroku sudah dapat membuka dan membaca file **credentials.yml.enc**.






# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)



# Referensi

1. [https://edgeguides.rubyonrails.org/security.html#custom-credentials](https://edgeguides.rubyonrails.org/security.html#custom-credentials){:target="_blank"}
<br>Diakses tanggal: 2020/11/26
