---
layout: "post"
title: "Menambahkan Database pada Rails Project"
date: "2019-10-09 21:30"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2019/2019-10-09-menambahkan-database-pada-rails-project"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Catatan kali ini mengenai cara menambahkan atau mengganti database pada Ruby on Rails project yang sudah ada."
---

## Latar Belakang Masalah

Setelah pada blog post sebelumnya saya menulis tentang "[Membuat Rails Project tanpa Database](/blog/rails-project-tanpa-database)".

Pada tulisan kali ini, saya akan membahas mengenai bagaimana cara menambahkan database engine pada Rails project yang sudah ada.


## Tambahkan Gem

Pertama-tama, tentukan dahulu database engine apa yang akan teman-teman gunakan.

Untuk tulisan ini saya akan menggunakan PostgreSQL sebagai contoh.

Tambahkan saja ke dalam file `Gemfile`.

```ruby
!filename: Gemfile
ruby '2.6.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.3'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
```


## Tambahkan Database.yml

Setelah itu, kita perlu membuat file `config/database.yml`.

Untuk PostgreSQL engine, memiliki isi sebagia berikut.

```yaml
!filename: config/database.yml
# PostgreSQL. Versions 9.1 and up are supported.
#
# Install the pg driver:
#   gem install pg
# On OS X with Homebrew:
#   gem install pg -- --with-pg-config=/usr/local/bin/pg_config
# On OS X with MacPorts:
#   gem install pg -- --with-pg-config=/opt/local/lib/postgresql84/bin/pg_config
# On Windows:
#   gem install pg
#       Choose the win32 build.
#       Install PostgreSQL and put its /bin directory on your path.
#
# Configure Using Gemfile
# gem 'pg'
#
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # http://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: project_mahal_development

  # The specified database role being used to connect to postgres.
  # To create additional roles in postgres see `$ createuser --help`.
  # When left blank, postgres will use the default role. This is
  # the same name as the operating system user that initialized the database.
  #username: project_mahal

  # The password associated with the postgres role (username).
  #password:

  # Connect on a TCP socket. Omitted by default since the client uses a
  # domain socket that doesn't need configuration. Windows does not have
  # domain sockets, so uncomment these lines.
  #host: localhost

  # The TCP port the server listens on. Defaults to 5432.
  # If your server runs on a different port number, change accordingly.
  #port: 5432

  # Schema search path. The server defaults to $user,public
  #schema_search_path: myapp,sharedapp,public

  # Minimum log levels, in increasing order:
  #   debug5, debug4, debug3, debug2, debug1,
  #   log, notice, warning, error, fatal, and panic
  # Defaults to warning.
  #min_messages: notice

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: project_mahal_test

# As with config/secrets.yml, you never want to store sensitive information,
# like your database password, in your source code. If your source code is
# ever seen by anyone, they now have access to your database.
#
# Instead, provide the password as a unix environment variable when you boot
# the app. Read http://guides.rubyonrails.org/configuring.html#configuring-a-database
# for a full rundown on how to provide these environment variables in a
# production deployment.
#
# On Heroku and other platform providers, you may have a full connection URL
# available as an environment variable. For example:
#
#   DATABASE_URL="postgres://myuser:mypass@localhost/somedatabase"
#
# You can use this database configuration with:
#
#   production:
#     url: <%= ENV['DATABASE_URL'] %>
#
production:
  <<: *default
  database: project_mahal_production
  username: project_mahal
  password: <%= ENV['PROJECT_MAHAL_DATABASE_PASSWORD'] %>
```


## Aktifkan Active Record

Selanjutnya, kita perlu mengaktifkan Active Record pada `config/application.rb`.

```ruby
!filename: config/application.rb
require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"    # <- aktifkan ini
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"
```

Mantap, tinggal langkah terakhir, membuat database.


## Create Database

Jalankan dengan perintah `rake`.

```
$ rails db:create
```

Apabila menghasilkan output seperti di bawah ini.

```
Created database 'project_mahal_development'
Created database 'project_mahal_test'
```
Maka, proses menambahkan database pada Rails project kita telah berhasil.

Mudah-mudahan dapat bermanfaat buat teman-teman.

Terima kasih (^_^)v


## Referensi

1. [How to add a Postgre Database to an existing Rails project](https://stackoverflow.com/a/48025954/4862516) \
   Diakses tanggal: 2019-10-09
