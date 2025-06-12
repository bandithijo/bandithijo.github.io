---
layout: 'post'
title: "Membuat Web Scraper dengan Ruby (Output: POSTGRESQL: ACTIVERECORD)"
date: '2020-06-18 11:06'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Ruby', 'PostgreSQL', 'Active Record']
pin:
hot:
contributors: []
description: "Web scraping adalah teknik mengambil atau mengekstrak sebagian data dari suatu website secara spesifik secara otomatis."
---

> PERHATIAN!
> 
> Data yang penulis gunakan adalah data yang bersifat ***free public data***. Sehingga, siapa saja dapat mengakses dan melihat tanpa perlu melalui layer authentikasi.
> 
> Penyalahgunaan data, bukan merupakan tanggung jawab dari penulis seutuhnya.


# Prerequisite

`ruby 2.6.6` `rails 5.2.4` `postgresql 12.3`


# Pendahuluan

*Web scraping* adalah teknik mengambil atau mengekstrak sebagian data dari suatu website secara spesifik, spesifik dalam arti hanya data tertentu saja yang diambil. Script atau program untuk melakukan hal tersebut, disebut dengan *web scraper*.


# Objektif

Catatan kali ini saya akan mendokumentasikan proses dalam membuat *web scraper* dengan tujuan untuk mengambil data nama-nama dosen yang ada pada website resmi Biro Akademik Universitas Mulia Balikpapan yang ada pada halaman [ini](http://baak.universitasmulia.ac.id/dosen/).

Hasil yang akan di dapatkan dari script yang akan kita buat adalah daftar nama-nama dosen beserta nidn dalam bentuk tabel di dalam database PostgreSQL. Kita akan memasukkan data menggunakan Active Record yang merupakan salah satu komponen dari Ruby on Rails yang digunakan untuk menghandle model.


# Penerapan

Langkah awal adalah persiapkan direktori untuk proyek.

Saya akan beri nama `ruby-web-scraper-dosen`.

Biasakan untuk memberi nama proyek tidak menggunakan karakter **spasi**.

```
$ mkdir ruby-web-scraper-dosen
```

Kemudian masuk ke dalam direktori proyek.

```
$ cd ruby-web-scraper-dosen
```

Buat file dengan nama `Gemfile`. dan kita akan memasang gem yang diperlukan di dalam file ini.

```ruby
!filename: Gemfile
source 'https://rubygems.org'

gem 'httparty',              '~> 0.18.1'
gem 'nokogiri',              '~> 1.10', '>= 1.10.9'
gem 'byebug',                '~> 11.1', '>= 11.1.3'
gem 'activerecord',          '~> 6.0', '>= 6.0.3.2'
gem 'standalone_migrations', '~> 6.0'
gem 'pg',                    '~> 1.2', '>= 1.2.3'
```

Setelah memasang gem pada Gemfile, kita perlu melakukan instalasi gem-gem tersebut.

```
$ bundle install
```

Proses bundle install di atas akan membuat sebuah file baru bernama `Gemfile.lock` yang berisi daftar dependensi dari gem yang kita butuhkan --daftar requirements--.

Pastikan kalau service dari PostgreSQL sudah berjalan.

```
$ sudo systemctl status postgresql.service
```

```
● postgresql.service - PostgreSQL database server
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; vendor preset: disabled)
     Active: active (running) since Thu 2020-06-18 11:06:53 WITA; 1m ago
   Main PID: 36698 (postgres)
      Tasks: 8 (limit: 4610)
     Memory: 28.9M
     CGroup: /system.slice/postgresql.service
             ├─ 36698 /usr/bin/postgres -D /var/lib/postgres/data
             ├─ 36700 postgres: checkpointer
             ├─ 36701 postgres: background writer
             ├─ 36702 postgres: walwriter
             ├─ 36703 postgres: autovacuum launcher
             ├─ 36704 postgres: stats collector
             ├─ 36705 postgres: logical replication launcher
             └─397565 postgres: bandithijo web_scraper [local] idle
```

Selanjutnya, untuk melihat database dan table, teman-tema dapat mengguakan **PostBird** (Database Management GUI) atau **pgcli**, saya akan menggunakan **pgcli**.

Jalankan **pgcli**,

```
$ pgcli
```

```
Server: PostgreSQL 12.3
Version: 3.0.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
bandithijo>
```

Pada tahap ini, kita **tidak perlu membuat database secara manual**, kita akan membuat database dengan bantuan **rake**.

Langkah pertama adalah membuat `Rakefile` di root direktori kita.

```
📂 ruby-web-scraper-dosen/
├── 📄 Gemfile
├── 📄 Gemfile.lock
└── 📄 Rakefile 👈️
```

Isi `Rakefile` seperti di bawah ini.

```ruby
!filename: Rakefile
require 'standalone_migrations'
StandaloneMigrations::Tasks.load_tasks
```

Selanjutnya kita perlu membuat database konfiguration `config.yml` pada direktori `db/`.

```
📂 ruby-web-scraper-dosen/
├── 📂 db/
│   └── 📄 config.yml 👈️
├── 📄 Gemfile
├── 📄 Gemfile.lock
└── 📄 Rakefile
```

Lalu isikan `config.yml` seperti di bawah.

```yaml
!filename: db/config.yml
development:
  adapter: postgresql
  database: web_scraper_development
  pool: 5
  timeout: 5000
  host: localhost
  encoding: unicode
```

`web_scraper_development` adalah nama database yang akan kita gunakan.

Kalau sudah, sekarang kita akan membuat database dengan cara, buka Terminal dan jalankan perintah,

```
$ rake db:create
```

```
Created database 'web_scraper_development'
```

Perintah di atas akan menjalankan **rake** untuk membuat database dengan nama `web_scraper_development` seperti yang sudah kita definisikan pada file `config.yml`.

> INFO
> 
> Untuk menghapus database, gunakan perintah:
> 
> ```
> $ rake db:drop
> ```
> 
> ```
> Dropped database 'web_scraper_development'
> ```

Setelah database dibuat, kita perlu membuat tabel untuk menyimpan data-data yang sudah kita parsing dari wbesite target.

Untuk membuat tabel, kita akan menggunakan migration.

Buat migration dengan cara seperti di bawah, dan berikan nama, seperti:

1. `CreateDaftarDosens` (CamelCase), atau
2. `create_daftar_dosens` (snake_case)

```
$ rake db:new_migration name=CreateDaftarDosens
```

**atau**,

```
$ rake db:new_migration name=create_daftar_dosens
```

Perintah migrasi di atas akan membuat sebuah file migrasi.

```
created db/migration/20200618031037_create_daftar_dosens.rb
```

```
📂 ruby-web-scraper-dosen/
├── 📂 db/
│   ├── 📄 config.yml
│   └── 📂 migrate/
│       └── 📄 20200618031037_create_daftar_dosens.rb 👈️
│
├── 📄 Gemfile
├── 📄 Gemfile.lock
└── 📄 Rakefile
```

Apabila kita membuat migrasi lagi, maka file-file migrasi akan terdapat pada direktori `db/migrate/`.

Migrasi yang kita buat di atas, dari namanya tentu sudah terbayang fungsinya adalah untuk membuat tabel dengan nama `daftar_dosens`. Penamanan tabel yang berbentuk jamak merupakan *convention* dari Ruby on Rails.

Pemberian awalan `Create` atau `create_` pada awal migrasi memiliki maksud tertentu, yaitu untuk membuat tabel/schema. Dengan menambahkan awalan tersebut maka, isi dari file migrasi akan otomatis berbentuk seperti di bawah ini.

```ruby
!filename: db/migrate/20200618031037_create_daftar_dosens.rb
class CreateDaftarDosens < ActiveRecord::Migration[6.0]
  def change
    create_table :daftar_dosens do |t|
    end
  end
end
```

Bari ke 3 & 4 adalah baris yang secara pintar dibuatkan apabila kita menambahkan awalan `Create` atau `create_` pada nama migrasi. Enak banget yaa (^_^)

Selanjutnya, kita perlu menyempurnakan file migrasi. Kita perlu menambahkan nama kolom yang kita perlukan, yaitu kolom **nama_dosen** dan **nidn_dosen**.

```ruby
!filename: db/migrate/20200618031037_create_daftar_dosens.rb
class CreateDaftarDosens < ActiveRecord::Migration[6.0]
  def change
    create_table :daftar_dosens do |t|
      t.string :nama_dosen, null: false
      t.string :nidn_dosen
    end
  end
end
```

Setelah kita memodifikasi file migrasi `..._create_daftar_dosens.rb`, selanjutnya adalah menjalankan migrasi tersebut.

```
$ rake db:migrate
```

```
== 20200618031037 CreateDaftarDosens: migrating ===============================
-- create_table(:daftar_dosens)
   -> 0.0103s
== 20200618031037 CreateDaftarDosens: migrated (0.0104s) ======================
```
Kalau migrasi berhasil, outputnya akan seperti di atas.

Untuk mengecek status migrasi, gunakan perintah di bawah.

```
$ rake db:migrate:status
```

```
database: web_scraper_development

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20200618031037  Create daftar dosens

```

Terlihat, bahwa status migrasi dari "Create daftar dosens" sudah **up**. Artinya, sekarang pada database `web_scraper_development` sudah terdapat tabel bernama `daftar_dosens`.

Untuk mengeceknya, buka **pgcli** dan jalankan perintah di bawah.

```
web_scraper> \dt
```

```
+----------+----------------------+--------+------------+
| Schema   | Name                 | Type   | Owner      |
|----------+----------------------+--------+------------|
| public   | ar_internal_metadata | table  | bandithijo |
| public   | daftar_dosens 👈️     | table  | bandithijo |
| public   | schema_migrations    | table  | bandithijo |
+----------+----------------------+--------+------------+
SELECT 3
Time: 0.014s
```

Untuk melihat detail dari tabel, gunakan perintah di bawah.

```
web_scraper> \d daftar_dosens;
```

```
+------------+-------------------+-------------------------------------------------------------+
| Column     | Type              | Modifiers                                                   |
|------------+-------------------+-------------------------------------------------------------|
| id         | bigint            |  not null default nextval('daftar_dosens_id_seq'::regclass) |
| nama_dosen | character varying |  not null                                                   |
| nidn_dosen | character varying |                                                             |
+------------+-------------------+-------------------------------------------------------------+
Indexes:
    "daftar_dosens_pkey" PRIMARY KEY, btree (id)

Time: 0.026s
```

Tentu saja tabel tersebut belum ada isinya.

Langkah selanjutnya adalah membuat model.

Sambil mdembuat model, saya akan merapikan struktur direktori saya dan mengganti nama dari aktor utama dari `scrapper.rb` menjadi `main.rb`.

```
📂 ruby-web-scraper-dosen/
├── 📂 app/
│   ├── 📄 main.rb 👈️
│   └── 📂 models/
│       └── 📄 daftar_dosen.rb 👈️
├── 📂 db/
│   ├── 📄 config.yml
│   ├── 📂 migrate/
│   │   └── 📄 20200618031037_create_daftar_dosens.rb
│   └── 📄 schema.rb
├── 📄 Gemfile
├── 📄 Gemfile.lock
└── 📄 Rakefile
```

Penamaan dari model `daftar_dosen.rb` menggunakan penamaan tunggal karena convention dari Ruby on Rails mengharuskan kita membuat model dengan penamaan singular.

Buka file `app/models/daftar_dosen.rb` dan isi seperti di bawah ini.

```ruby
!filename: app/models/daftar_dosen.rb
class DaftarDosen < ActiveRecord::Base
  validates :nama_dosen, presence: true
end
```

Saya menambahkan validasi `presence` ke kolom nama_dosen. Teman-teman dapat mempelajari tentang validasi [di sini](https://guides.rubyonrails.org/active_record_validations.html).

Setelah membuat model, sekarang kita akan membuat aktor utamanya.

Buka file `app/main.rb`.

```ruby
!filename: app/main.rb
# daftar gem yang diperlukan
require 'httparty'
require 'nokogiri'
require 'byebug'
require 'active_record'
require_relative './models/daftar_dosen'
require 'rake'

# blok untuk menghubungkan project dengan postgresql
def db_configuration
  db_configuration_file = File.join(File.expand_path('..', __FILE__), '..', 'db', 'config.yml')
  YAML.load(File.read(db_configuration_file))
end

# blok untuk menghubungkan project dengan active record
ActiveRecord::Base.establish_connection(db_configuration['development'])

def scraper
  # blok ini bertugas untuk mengambil data dengan output berupa variabel array
  target_url = "http://baak.universitasmulia.ac.id/dosen/"
  unparsed_page = HTTParty.get(target_url)
  parsed_page = Nokogiri::HTML(unparsed_page)
  dosens = Array.new
  dosen_listings = parsed_page.css('div.elementor-widget-wrap')
  dosen_listings.each do |dosen_list|
    dosen = {
      # perlu mengganti ' dengan ` agar tidak mengacaukan proses input data nama
      nama_dosen: dosen_list.css("h2")[0]&.text&.gsub("\n", "")&.gsub(/'/, "`")&.squeeze,
      nidn_dosen: dosen_list.css("h2")[1]&.text&.gsub("\n", "")
    }
    if dosen[:nama_dosen] != nil
      dosens << dosen   # dosens, variable array yang menampung data para dosen
    end
  end
  # aktifkan byebug apabila diperlukan
  #byebug

  # blok ini bertugas untuk membuat membandingkan jumlah dosen dari target
  # dengan jumlah dosen yang ada di lokal database
  # apabila sama, maka tidak akan diinputkan ke database
  # apabila berbeda, maka akan tabel akan dihapus dan data baru akan diinput
  if dosens.size == DaftarDosen.all.size
    puts "INFO: Data Dosen sudah diparsing. Tidak ada data baru."
    puts "TOTAL DOSEN: #{DaftarDosen.all.size} dosen"
  elsif DaftarDosen.all.size.nil? || dosens.size > DaftarDosen.all.size
    unless DaftarDosen.all.size.nil?
      total_dosen_lama = DaftarDosen.all.size

      # blok ini untuk menjalankan rake task rollback & migrasi untuk menghapus & membuat tabel
      rake = Rake.application
      rake.init
      rake.load_rakefile
      rake['db:rollback'].invoke
      rake['db:migrate'].invoke
    else
      total_dosen_lama = 0
    end

    # blok ini untuk memasukkan data ke dalam tabel
    dosens.each do |dosen|
      DaftarDosen.create(nama_dosen: dosen[:nama_dosen], nidn_dosen: dosen[:nidn_dosen])
      puts "Dosen: #{dosen[:nama_dosen]}, berhasil diinputkan!"
    end

    puts "TOTAL DOSEN (remote): #{dosens.size} dosen"
    puts "TOTAL DOSEN (local) : #{DaftarDosen.all.size} dosen"
    puts "TOTAL DOSEN BARU    : #{dosens.size - total_dosen_lama} dosen" if total_dosen_lama != 0
  end
end

scraper
```

Setelah itu, jalankan dengan perintah,

```
$ ruby app/main.rb
```

Apabila berhasil, akan keluar output di Terminal seperti ini.

```
== 20200618031037 CreateDaftarDosens: reverting ===============================
-- drop_table(:daftar_dosens)
   -> 0.0028s
== 20200618031037 CreateDaftarDosens: reverted (0.0154s) ======================

== 20200618031037 CreateDaftarDosens: migrating ===============================
-- create_table(:daftar_dosens)
   -> 0.0144s
== 20200618031037 CreateDaftarDosens: migrated (0.0145s) ======================

Dosen: Abdul Fatah, berhasil diinputkan!
Dosen: Abdul Hamid Kurniawan, S.kom., M.TI, berhasil diinputkan!
Dosen: Abi Habibi, berhasil diinputkan!
...
...
Dosen: Teguh Pribadi, S.H., M.H, berhasil diinputkan!
Dosen: Sampara, S.H., M.H., berhasil diinputkan!
Dosen: Candra Bagus Agung P, S.E., M.M., berhasil diinputkan!
TOTAL DOSEN (remote): 138 dosen
TOTAL DOSEN (local) : 138 dosen
```

nah, data sudah masuk ke dalam database.

Sekarang coba cek ke database.

Masuk terlebih dahulu ke databse `web_scraper`.

```
bandithijo> \c web_scraper;
```

```
You are now connected to database "web_scraper" as user "bandithijo"
Time: 0.012s
web_scraper>
```

Setelah kita berada di dalam database `web_scraper` kita dapat melihat hasil dari data-data yang sudah diinputkan dengan cara.

```
web_scraper> SELECT * FROM daftar_dosens;
```

```
+------+------------------------------------------------+--------------+
| id   | nama_dosen                                     | nidn_dosen   |
|------+------------------------------------------------+--------------|
| 1    | Abdul Fatah                                    | 1114107001   |
| 2    | Abdul Hamid Kurniawan, S.kom., M.TI            | 1114107001   |
| 3    | Abi Habibi                                     | 1114107001   |
| 4    | Abiratno, S.T., M.Sc.                          | 1107017201   |
| 5    | Dr. Agung Sakti Pribadi, S.H., M.H.            | 1131036301   |
| 6    | Alfa                                           | 9911002592   |
...
...
| 133  | Zara Zerina Azizah, S.Pd.I, S.E., M.M          | 1103039301   |
| 134  | Heru Zulkifli, S.Kom., M.Kom                   | 1115027501   |
| 135  | M.Andhi Rohmat Basuki, S.Kom., M.Kom           | -            |
| 136  | Teguh Pribadi, S.H., M.H                       | -            |
| 137  | Sampara, S.H., M.H.                            | -            |
| 138  | Candra Bagus Agung P, S.E., M.M.               | -            |
+------+------------------------------------------------+--------------+
SELECT 138
(END)
```

Kalau kita coba jalankan kembali, tapi tidak ada data baru dari website target, maka akan seperti ini hasil outputnya.

```
INFO: Data Dosen sudah diparsing. Tidak ada data baru.
TOTAL DOSEN: 138 dosen
```

Selesai!


# Demonstrasi Video

{% youtube 2zYDrEaj9EQ %}


# Referensi

1. [It's Time To HTTParty!](https://blog.teamtreehouse.com/its-time-to-httparty)
<br>Diakses tanggal: 2020/06/18

2. [nokogiri.org](https://nokogiri.org/)
<br>Diakses tanggal: 2020/06/18

3. [pgcli](https://www.pgcli.com/)
<br>Diakses tanggal: 2020/06/18

4. [Active Record Basics](https://guides.rubyonrails.org/active_record_basics.html)
<br>Diakses tanggal: 2020/06/18

5. [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html)
<br>Diakses tanggal: 2020/06/18

6. [thuss/standalone-migrations](https://github.com/thuss/standalone-migrations/)
<br>Diakses tanggal: 2020/06/18
