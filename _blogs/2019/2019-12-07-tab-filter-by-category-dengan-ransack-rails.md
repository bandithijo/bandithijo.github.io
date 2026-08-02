---
layout: "post"
title: "Membuat Tab Filter by Category dengan Ransack pada Rails"
date: "2019-12-07 17:45"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2019/2019-12-07-tab-filter-by-category-dengan-ransack-rails"
author: "BanditHijo"
category: "blog"
tags: ["rails", "ransack"]
description: "Catatan ini mengenai cara membuat filter by category menggunakan Ransack gem pada Ruby on Rails."
---

## Prerequisite

`ruby 2.6.3` `rails 5.2.3` `postgresql 11.5`


## Prakata

Beberapa waktu yang lalu, saya pernah membangun project dengan menggunakan **Ransack** gem untuk menghandle [MetaSearch](https://github.com/activerecord-hackery/meta_search).

Sedikit penjelasan mengenai Ransack,

Ransack sendiri pengertian singkatnya adalah **Object-based searching**.

Ditulis ulang dari MetaSearch yang dibuat oleh [Ernie Miller](http://twitter.com/erniemiller) dan didevelop/dimaintain selama bertahun-tahun oleh [Jon Atack](http://twitter.com/jonatack) dan [Ryan Bigg](http://twitter.com/ryanbigg) serta mendapatkan bantuan dari [sekelompok contributor](https://github.com/activerecord-hackery/ransack/graphs/contributors) yang hebat.

Ransack dapat membantu kita membuat [simple](http://ransack-demo.herokuapp.com/) dan [advanced](http://ransack-demo.herokuapp.com/users/advanced_search) search forms untuk Rails aplikasi kita.

Jika teman-teman mencari gem untuk menyederhanakan pembuatan query pada model dan controller, Ransack mungkin bukan gem yang tepat. Mungkin bisa mencoba [Squeel](https://github.com/activerecord-hackery/squeel).

Ransack kompatibel dengan Rails versi 6.0, 5.2, 5.1, 5.0, dan pada Ruby 2.3 ke atas.

Alasan kenapa memilih Ransack, karena Ransack works out-of-the-box pada Active Record.


## Instalasi

Seperti biasa, tambahkan pada `Gemfile`.

```ruby
!filename: Gemfile
# ...
# ...

gem 'ransack', '~> 2.3'
```

Setelah itu jangan lupa untuk menjalankan,

```
$ bundle install
```

Untuk menginstall Ransack pada web aplikasi kita.


## Penerapan

Pada catatan kali ini, saya tidak akan menuliskan tentang penggunaan Ransack untuk pencarian dengan menggunakan form `search_form_for`.

Namun, saya akan menuliskan penggunaan Ransack untuk membuat tab filter berdasarkan field tertentu. Misal, dalam kasus saya adalah nama negara (*country*).

Kira-kira seperti ini hasilnya.

![Gambar 1]({{ page.assets | absolute_url }}/gambar-01.png)

Gambar 1. Hasil dari filter pada tab All

![Gambar 2]({{ page.assets | absolute_url }}/gambar-02.png)

Gambar 2. Hasil dari filter pada tab tertentu, berdasarkan negara

Contoh di atas, sudah dapat kita perkirakan bahwa hasil dari object yang sudah difilter akan ditampilkan pada view `index.html.erb`.


### Controller

Nah, pada bagian controller, isinya sangat orisinil seperti yang dicontohkan pada halaman readme dari Ransack.

```ruby
!filename: app/controllers/careers_controller.rb
class CareersController < ApplicationController
  def index
    @q = Career.ransack(params[:q])
    @careers = @q.result(distinct: true).page(params[:page]).per(10)
  end

  # ...
  # ...
  # ...
end
```

Pada model dan route, tidak perlu kita tambahkan apa-apa.

Selanjutnya, tinggal bermain pada view template.

Pada view template, saya mem-*passing* nilai dari `params[:q][:country_cont]` yang dikirimkan oleh view ke controller.

Dapat teman-teman perhatikan, terdapat object `country_cont` pada params tersebut, dapet dari mana?

`country` adalah salah satu field di dalam tabel careers.

```
# careers table
+--------------------+-------------------------------------------+-----------+-----------+
| position_name      | description                               | city      | country   |
|--------------------+-------------------------------------------+-----------+-----------|
| Technology Planner | Responsibilities and Duties:              | Singapore | Thailand  |
|                    | - Neutra stumptown literally.             |           |           |
|                    | - Goth squid yolo etsy cliche kogi beard. |           |           |
```

`_cont` adalah **predicate** yang disediakan oleh Ransack yang berarti **Contains value**.


### View

Untuk view template style dari tab, sesuaikan dengan style yang teman-teman gunakan.

Yang saya berikan di bawah, hanya contoh saja.

```eruby
!filename: app/views/careers/index.html.erb
<nav class="nav">
  <% if (params.has_key?(:q)) %>
    <%= link_to 'All', careers_path, class: "nav-link" %>
    <%= link_to 'Singapore', careers_path(q: {country_cont: 'Singapore'}),
                             class: "nav-link #{'active' if params[:q][:country_cont] == 'Singapore'}" %>
    <%= link_to 'Malaysia',  careers_path(q: {country_cont: 'Malaysia'}),
                             class: "nav-link #{'active' if params[:q][:country_cont] == 'Malaysia'}" %>
    <%= link_to 'Thailand',  careers_path(q: {country_cont: 'Thailand'}),
                             class: "nav-link #{'active' if params[:q][:country_cont] == 'Thailand'}" %>
  <% else %>
    <%= link_to 'All', careers_path, class: "nav-link active" %>
    <%= link_to 'Singapore', careers_path(q: {country_cont: 'Singapore'}),
                             class: "nav-link" %>
    <%= link_to 'Malaysia',  careers_path(q: {country_cont: 'Malaysia'}),
                             class: "nav-link" %>
    <%= link_to 'Thailand',  careers_path(q: {country_cont: 'Thailand'}),
                             class: "nav-link" %>
  <% end %>
</nav>
```

Hmmm, kurang beautiful yaa...

Wkwkwkwk

Mungkin bisa disederhanakan lagi seperti ini.

```eruby
!filename: app/views/careers/index.html.erb
<nav class="nav">
    <%= link_to 'All', careers_path, class: "nav-link #{params.has_key?(:q) ? '' : 'active'}" %>
    <%= link_to 'Singapore', careers_path(q: {country_cont: 'Singapore'}),
                             class: "nav-link #{'active' if params.has_key?(:q) && params[:q][:country_cont] == 'Singapore'}" %>
    <%= link_to 'Malaysia',  careers_path(q: {country_cont: 'Malaysia'}),
                             class: "nav-link #{'active' if params.has_key?(:q) && params[:q][:country_cont] == 'Malaysia'}" %>
    <%= link_to 'Thailand',  careers_path(q: {country_cont: 'Thailand'}),
                             class: "nav-link #{'active' if params.has_key?(:q) && params[:q][:country_cont] == 'Thailand'}" %>
</nav>
```

Dah!

Lumayanlah yaa.

Sebenarnya kita masih dapat membuatnya menjadi lebih dinamis, dengan mengambil data country dari model.

Yuk kita lakukan, agar kode di view template kita lebih *compact*.

Buat instance variable baru untuk daftar negara-negara pada controller.

```ruby
!filename: app/controllers/careers_controller.rb
class CareersController < ApplicationController
  def index
    @q = Career.ransack(params[:q])
    @careers = @q.result(distinct: true).page(params[:page]).per(10)

    @country_list = Career.all.pluck(:country).uniq.sort
  end

  # ...
  # ...
  # ...
end
```

Sekarang kita memiliki instance variable `@country_list` yang dapat kita gunakan pada view template.

```eruby
!filename: app/views/careers/index.html.erb
<nav class="nav">
  <%= link_to 'All', careers_path, class: "nav-link #{params.has_key?(:q) ? '' : 'active'}" %>
  <% @country_list.each do |country| %>
    <%= link_to country, careers_path(q: {country_cont: country}),
                         class: "nav-link #{'active' if params.has_key?(:q) && params[:q][:country_cont] == country}" %>
  <% end %>
</nav>
```

Nah, gimana? Asik kan?

Wkwkwk

Selanjutnya, untuk menampilkan hasil dari index listnya, seperti ini.

```eruby
!filename: app/views/careers/index.html.erb
...
...

<div class="row no-gutters mb-5">
  <!-- Available Position -->
  <% @careers.each do |career| %>
   <div class="col-sm-12">
     <div>
       <div>
         <h6><%= career.position_name.upcase %></h6>
         <div>
           <i class="icon-location"></i>
           <%= career.city.titleize %>, <%= career.country.titleize %>
         </div>
       </div>
       <div>
         <%= link_to "View Detail", career_path(career), class: "btn btn-primary" %>
       </div>
     </div>
   </div>
  <% end %>
  <!-- END Available Position -->
</div>
```

Selesai!

Apabila berhasil, apabila kita klik tab buttonnya, maka akan menghasilkan list yang sudah terfilter berdasarkan country.

Seperti ilustrasi pada Gambar 1 dan Gambar 2 di atas.

Namun, ada hal yang masih kurang memuaskan.

Saya masih belum dapat membuat URL nya menjadi lebih cantik.

```
http://localhost:3000/careers?q%5Bcountry_cont%5D=Malaysia
```

Mungkin akan saya cari pada kesempatan yang lain.

Atau teman-teman punya rekomendasi untuk membuat URL menjadi lebih cantik, boleh tulis pada komentar di bawah yaa.


## Update


### Nice URL Form

Oke, akhirnya saya berhasil untuk membuat bentuk dari URL menjadi lebih bagus.

Kira-kira akan saya buat seperti ini.

```
http://localhost:3000/careers?country=Malaysia
```

Caranya sangat mudah, saya hanya perlu bermain pada router dan controller.

Pertama-tama definiskan url form yang diinginkan pada `routes.rb`.

```ruby
!filename: config/routes.rb

  # ...
  # ...

  get 'careers?country=:country', to: 'careers#index', as: 'career_country'
```

Pendefinisan routing ini, akan menghasilkan sebuah path baru untuk kita, yaitu `career_country_path`.

```
career_country_path GET    (/careers?country=:country(.:format)    careers#index
```

Selanjutnya akan saya gunakan pada controller.

Pada instance variable `@q`, ubah object params yang ditangkap  dari `:q` menjadi `:country`.

```ruby
!filename: app/controllers/careers_controller.rb
class CareersController < ApplicationController
  def index
    @q = Career.ransack(country_cont: params[:country])
    @careers = @q.result(distinct: true).page(params[:page]).per(10)

    @country_list = Career.all.pluck(:country).uniq.sort
  end

  # ...
  # ...
  # ...
end
```

Langkah terakhir, tinggal menggunakan path yang sudah didefinisikan di atas ke view template.

Serta merubah beberapa properti untuk `.active` class pada button tab yang aktif.

```eruby
!filename: app/views/careers/index.html.erb
<nav class="nav">
  <%= link_to 'All', careers_path, class: "nav-link #{params.has_key?(:country) ? '' : 'active'}" %>
  <% @country_list.each do |country| %>
    <%= link_to country, career_country_path(country: country),
                         class: "nav-link #{'active' if params[:country] == country}" %>
  <% end %>
</nav>
```

Selesai.

Sekarang bentuk dari url menjadi lebih bagus.

<!-- PERHATIAN -->
> PERHATIAN!
> 
> Saya tidak merekomendasikan menggunakan cara di atas untuk mempercantik URL, karena akan mempersulit apabila ingin dipadukan dengan sorting atau searching.

Oke, sepertinya segini saja.

Mudah-mudahan bermanfaat buat teman-teman.

Terima kasih.

(^_^)


## Referensi

1. [github.com/activerecord-hackery/ransack](https://github.com/activerecord-hackery/ransack) \
   Diakses tanggal: 2019-12-07

1. [github.com/activerecord-hackery/meta_search](https://github.com/activerecord-hackery/meta_search) \
   Diakses tanggal: 2019-12-07

1. [ransack-demo.herokuapp.com/](http://ransack-demo.herokuapp.com/) \
   Diakses tanggal: 2019-12-07

1. [ransack-demo.herokuapp.com/users/advanced_search](http://ransack-demo.herokuapp.com/users/advanced_search) \
   Diakses tanggal: 2019-12-07
