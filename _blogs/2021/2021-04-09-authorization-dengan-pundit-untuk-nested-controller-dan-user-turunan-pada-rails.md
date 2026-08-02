---
layout: "post"
title: "Authorization dengan Pundit untuk Nested Controller dan User Turunan pada Rails"
date: "2021-04-09 05:40"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2021/2021-04-09-authorization-dengan-pundit-untuk-nested-controller-dan-user-turunan-pada-rails"
author: "BanditHijo"
category: "blog"
tags: ["rails", "pundit", "authorization"]
description: "Catatan ini mengenai bagaimana cara membuat authorization dengan bantuan gem Pundit pada controller bertingkat, misal Authors::Articles. Author merupakan turunan dari User, karena User memiliki lebih dari satu user type. Tujuannya adalah untuk membatasi Author hanya dapat mengedit & menghapus Article miliknya saja."
---

## Prerequisite

`ruby 3.0.1` `rails 6.1.3.1`


## Target

Membatasi antar Author untuk mengedit dan menghapus Article yang bukan miliknya.

Untuk feature authorization tersebut, kita akan gunakan **Pundit** gem.


## Sekenario

Author merupakan turunan dari User dengan type "Author".

Kita ingin membuat feature administrasi untuk Author yang menampilkan semua daftar Article dan Semua Author.

Hanya Author pemilik Article yang dapat mengedit/menghapus Article yang ia miliki.


## Eksekusi


### Pasang Pundit Gem

Pasang **Pundit** pada Gemfile.

```ruby
!filename: Gemfile
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# ...

gem 'pundit', '~> 2.1'

# ...
```

Install.

```
$ bundle install
```


### Generate pundit:install

Jalankan generator untuk membuat konfigurasi awal.

```
$ rails g pundit:install
```

Generator ini akan membuatkan direktori **app/policies** dan juga file bernama **application_policy.rb**.

```
📂 app/
│ 📁 assets/
│ 📁 channels/
│ 📁 controllers/
│ 📁 helpers/
│ 📁 javascript/
│ 📁 jobs/
│ 📁 mailers/
│ 📁 models/
│ 📂 policies/ 👈️
│ └ 📄 application_policy.rb 👈️
└ 📁 views
📁 bin
📁 config
📁 db
📁 lib
...
...
```


### Include Pundit

Saya akan mengincludekan Pundit pada **application_controller** agar setiap controller turunan dapat menggunakan Pundit.

```ruby
!filename: app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  include Pundit
end
```


### Define pundit_user

Pundit menyediakan objek **current_user** sebagai instansiasi terhadap user yang sudah melakukan authentication.

Namun, karena kita menggunakan user type berupa Author yang merupakan turunan dari User, kita perlu memodifikasi method **pundit_user**.

Kita letakkan pada controller.

Saya memiliki **authors_controller** yang merupakan induk dari semua controller yang ada di bawahnya.

```
📂 app/
│ 📁 assets/
│ 📁 channels/
│ 📂 controllers/
│ │ 📁 admins/
│ │ 📂 authors/
│ │ │ 📄 articles_controller.rb
│ │ │ 📄 confirmations_controller.rb
│ │ │ 📄 dashboard_controller.rb
│ │ │ 📄 omniauth_callbacks_controller.rb
│ │ │ 📄 passwords_controller.rb
│ │ │ 📄 registrations_controller.rb
│ │ │ 📄 sessions_controller.rb
│ │ └ 📄 unlocks_controller.rb
│ │ 📁 concerns/
│ │ 📁 public/
│ │ 📄 admins_controller.rb
│ │ 📄 application_controller.rb
│ │ 📄 articles_controller.rb
│ └ 📄 authors_controller.rb 👈️
│ 📁 helpers/
│ 📁 javascript/
│ 📁 jobs/
│ 📁 mailers/
│ 📁 models/
│ 📂 policies/
│ └ 📄 application_policy.rb
└ 📁 views/
📁 bin/
📁 config/
📁 db/
📁 lib/
...
...
```

```ruby
!filename: /app/controller/authors_controller.rb
class AuthorsController < ApplicationController
  protect_from_forgery prepend: true, with: :exception
  before_action :authenticate_author!
  layout "application_author"

  def pundit_user
    current_author
  end

  protected

  def after_sign_in_path_for(_resource)
    authors_root_path
  end
end
```

Baris ke 6-8, saya mendefinisikan **pundit_user** sebagai **current_author**.


### Buat policy untuk Article

Karena yang ingin kita batasi adalah Article agar hanya Author si pemilik Article saja yang dapat memodifikasinya.

Struktur direktori dan file dari policy ini mengikuti dari controller namun menggunakan singular.

```
📂 app/
│ 📁 assets/
│ 📁 channels/
│ 📁 controllers/
│ 📁 helpers/
│ 📁 javascript/
│ 📁 jobs/
│ 📁 mailers/
│ 📁 models/
│ 📂 policies/
│ │ 📂 author_policy/ 👈️
│ │ └ 📄 article_policy.rb 👈️
│ │ 📄 application_policy.rb
│ └ 📄 author_policy.rb 👈️
└ 📁 views/
📁 bin/
📁 config/
📁 db/
📁 lib/
...
...
```

```ruby
!filename: app/policies/author_policy.rb
class AuthorPolicy < ApplicationPolicy
end
```

```ruby
!filename: app/policies/author/article_policy.rb
class Author::ArticlePolicy < AuthorPolicy
  def edit?
    record.user_id == user.id
  end
end
```

Dapat pula seperti ini.

```ruby
!filename: app/policies/author/article_policy.rb
class Author::ArticlePolicy < AuthorPolicy
  def edit?
    user.present? && user == record.author
  end
end
```

Misalkan, kita akan membatasi action **edit**, maka kita definisikan method **edit?** dengan isinya, apabila user_id dari record sama dengan id dari user yang sedang mengakses, maka diberikan ijin untuk mengedit.

**record** dapat pula kita buat menjadi method berisi **record**.

```ruby
!filename: app/policies/author/article_policy.rb
class Author::ArticlePolicy < AuthorPolicy
  def edit?
    user.present? && user == article.author
  end

  private

  def article
    record
  end
end
```

Letakkan di dalam **private** agar penamaan **article** hanya dapat diakses oleh class **Author::ArticlePolicy**.

Karena edit, sangat erat dengan update, maka saya akan buat seperti ini.

```ruby
!filename: app/policies/author/article_policy.rb
class Author::ArticlePolicy < AuthorPolicy
  def update?
    user.present? && user == article.author
  end

  def edit?
    update?
  end

  def

  private

  def article
    record
  end
end
```


### Authorize controller

Nah, kita telah mengatur policy untuk action edit, maka kita perlu memberikan authorization pada action edit di **articles_controller**.

```ruby
!filename: app/controllers/authors/articles_controller.rb
class Authors::ArticlesController < AuthorsController
  # ...

  def edit
    @article = Article.find(params[:id])
    authorize @article, policy_class: Author::ArticlePolicy
  end

  # ...
end
```

Baris ke-6 adalah pemberian authorization pada action edit.

Parameter **policy_class** ini sebenarnya adalah cara manual untuk mengarahkan file policy.

Saya menggunakannya hanya sebagai contoh siapa tahu kita mendapatkan kasus-kasus khusus, seperti nama Object dengan nama Controller atau Policy tidak sama.


### Views Template

Selanjutnya, cara membatasi button atau link yang hanya dikhususkan untuk Author yang memiliki Article.

Misalnya, button atau link untuk Edit atau Delete.

Sebelum menggunakan Pundit Policy, saya biasa menggunakan cara seperti ini (baris ke-1),

```eruby
!filename: app/views/authors/articles/show.html.erb
<% if @article.user_id == current_author.id %>
  <%= link_to 'Edit', edit_authors_article_path(@news), class: 'btn btn-info' %>
  <%= link_to 'Delete', authors_article_path(@article), method: :delete, data: {confirm: "Are you sure, you want to delete the article?"}, class: 'btn btn-danger' %>
<% end %>
```

Setelah menggunakan Pundit, kita dapat memanfaatkan policy yang ada.

```eruby
!filename: app/views/authors/articles/show.html.erb
<% if policy([Authors, @article]).edit? %>
  <%= link_to 'Edit', edit_authors_article_path(@news), class: 'btn btn-info' %>
  <%= link_to 'Delete', authors_article_path(@article), method: :delete, data: {confirm: "Are you sure, you want to delete the article?"}, class: 'btn btn-danger' %>
<% end %>
```

Saya menggunakan **[Authors, @article]**, karena **articles_controller** merupakan controller bertingkat (*nested controller*) dari Authors.

```ruby
policy([Authors, @article]).edit?
```

Kalau tidak bertingkat, dapat langsung memanggil objek modelnya saja.

```ruby
policy(Article).edit?
```

Selesai.


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [github.com/varvet/pundit](https://github.com/varvet/pundit) \
   Diakses tanggal: 2021-04-09
