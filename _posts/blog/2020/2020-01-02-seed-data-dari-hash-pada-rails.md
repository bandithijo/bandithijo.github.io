---
layout: "post"
title: "Membuat Seed Data dari Hash pada Rails"
date: "2020-01-02 07:46"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-01-02-seed-data-dari-hash-pada-rails"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Catatan kali ini tentang cara membuat seed data dari data yang berbentuk hash pada Ruby on Rails."
---

## Prerequisite

`ruby 2.6.3` `rails 5.2.3` `postgresql 11.5`


## Prakata

Catatan kali ini akan singkat saja.

Saya akan mencatat cara yang saya temukan dari berbagai macam sumber, untuk membuat populasi data dari variable yang bertipe hash.

Maksud dari catatan ini adalah, untuk membuat data pada seed untuk web aplikasi Rails.


## Gambaran Masalah

Misal, saya memiliki field `location` dan `meeting_point` yang merupakan entitas dari tabel experiences.

```ruby
irb(main):001:0> Experience
=> Experience(id: integer, ..., ..., location: string, meeting_point: string, ... )
```

Kedua entitas ini merupakan entitas yang berkaitan. Seperti key dan value. Antara kota dengan tempat populer di kota tersebut.

Maka, saya bisa membuat populasi data untuk kedua entitas ini sebagai hash yang menampung nilai kota dan tempat populer.

1. location, berisi key
2. meeting_point, berisi value

Seperti di bawah ini.

```ruby
# ruby hash

places = {
  'Kuala Lumpur': 'National Museum of Malaysia',
  'George Town': 'Penang Botanic Gardens',
  'Kuching': 'Kuching Waterfront Bazaar',
  'Melaka': 'Zoo Melaka',
  ...
  ...
  ...
}
```


## Pemecahan Masalah

Pertama-tama generate dulu fake data untuk experiences.

Saya akan mengenerate sebanyak 100 data.

```ruby
!filename: db/seeds.rb
puts "Creating Fake Experiences"
100.times do
  Experience.create(
    # ...
    # ...
    # ...
  )
end
```

Setelah jadi, saya akan mengupdate data2 pada experience untuk menambahkan data location dan meeting_point.

```ruby
!filename: db/seeds.rb
puts "Creating Fake Experiences"
# ...
#   ...
#   ...
# ...

puts "Creating Fake Experiences Location & Meeting Address"
places = {
  'Kuala Lumpur': 'National Museum of Malaysia',
  'George Town': 'Penang Botanic Gardens',
  'Kuching': 'Kuching Waterfront Bazaar',
  'Melaka': 'Zoo Melaka',
  'Kinabalu': 'Sabah State Museum',
  'Miri': 'Niah National Park',
  'Ipoh': 'Geology Museum',
  'Kuala Terengganu': 'Masjid Kristal',
  'Bharu': 'Istana Balai Besar',
  'Johor Bahru': 'Austin Heights Water & Adventure Park',
  'Sandakan': 'Puu Jih Syh Temple',
  'Sibu': 'Sibu Heritage Centre',
  'Kuantan': 'Sungai Pandan Waterfall',
  'Taiping': 'Taiping Zoo',
  'Alor Setar': 'Kedah Paddy Museum'
}
100.times do |exp_id|
  exp_id = exp_id + 1
  experience = Experience.find(exp_id)
  experience.update(
    location: places.keys.sample.to_s,
    meeting_point: places[places.keys.sample]
  )
end
```

Nah, tinggal jalankan <code>$ <b>rails db:seed</b></code> dan field location dan meeting_point akan terisi oleh data dari variable hash places tersebut.

Seperti ini.

```sql
> SELECT id, location, meeting_point FROM experiences;
```

```
+------+------------------+---------------------------------------+
| id   | location         | meeting_point                         |
|------+------------------+---------------------------------------|
| 2    | Taiping          | Kuching Waterfront Bazaar             |
| 4    | Kinabalu         | Zoo Melaka                            |
| 5    | Kuantan          | Sabah State Museum                    |
| 6    | Sandakan         | National Museum of Malaysia           |
| 7    | Sandakan         | Masjid Kristal                        |
| 8    | Alor Setar       | Masjid Kristal                        |
| 9    | Bharu            | National Museum of Malaysia           |
| 10   | Kuala Terengganu | Austin Heights Water & Adventure Park |
| 11   | Kuala Terengganu | Zoo Melaka                            |
| 13   | Kuala Terengganu | Kedah Paddy Museum                    |
| ...  | ...              | ...                                   |
| ...  | ...              | ...                                   |
| ...  | ...              | ...                                   |
+------+------------------+---------------------------------------+
```

Selesai!

Sekian catatan kali ini.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [docs.ruby-lang.org/en/2.0.0/Hash.html](https://docs.ruby-lang.org/en/2.0.0/Hash.html) \
   Diakses tanggal: 2020-01-02

1. [launchschool.com/books/ruby/read/hashes](https://launchschool.com/books/ruby/read/hashes) \
   Diakses tanggal: 2020-01-02
