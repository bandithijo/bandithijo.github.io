---
layout: 'post'
title: "Membuat Checkbox dengan Multiple Selection pada Rails"
date: '2019-12-10 09:07'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Rails', 'JavaScript']
pin:
hot:
contributors: []
description: "Catatan kali ini mengenai cara membuat checkbox dengan multiple selection pada Ruby on Rails."
---

# Prerequisite

`ruby 2.6.3` `rails 5.2.3` `postgresql 11.5`


# Prakata

Rails, menyediakan helper method untuk menampilkan multiple checkbox pada view template yang bernama `collection_check_boxes`.

Kalau tidak salah, helper method ini mulai diperkenalkan pada Rails versi 4.0.2 hingga sekarang (6.0.0).

Helper ini masuk ke dalam kelas **ActionView::Helpers::FormOptionsHelper**. Nah, artinya, helper method ini kita gunakan di dalam form.

> **collection_check_boxes**(object, method, collection, value_method, text_method, options = {}, html_options = {}, &block) *public*

Lebih jauh mengenail helper method ini, dapat teman-teman baca sendiri pada dokumentasi di [**apidock.com/rails**](#referensi) yaa.


# Sekenario

Misalkan, saya memiliki 3 pilihan berupa, Adult, Teen, dan Children.

Saya ingin user dapat memilih salah satu, dua atau ketiganya.

Hasil dari inputan checkbox ini akan dimasukkan ke dalam field `:age_preference` dengan tipe data string.

Checkbox ini akan harus dapat:

1. Memasukkan data, pada saat membuat data baru `:new`
1. Menampilkan data yang sudah ada pada database, pada saat mengedit data `:edit`
1. Menampilkan data dengan format (bentuk) yang benar
1. Memiliki fitur "Select All" agar mudah dioperasikan

Kira-kira seperti ini hasilnya,

![Gambar 1](https://i.postimg.cc/5yCpTnr2/gambar-01.gif)

Gambar 1. Multiple checkbox dengan fitur Select All

![Gambar 2](https://i.postimg.cc/HWcSrkL1/gambar-02.gif)

Gambar 2. Uncheck Select All jika salah satu dari checkbox tidak dicentang


# Eksekusi

Saya sudah memiliki field `:age_preference` dengan tipe data string pada skema database.

```ruby
!filename: db/scheme.rb
create_table "experiences", force: :cascade do |t|
  # ...
  # ...
  # ...
  t.string "age_preference"
  # ...
  # ...
  # ...
end
```


## Controller

Bagian controller ini tidak penting pada catatan ini.

Karena pada intinya, saya hanya akan membuat sebuah instance variable yang akan digunakan form di view template.

```ruby
!filename: app/controllers/experiences_controller.rb
class ExperiencesController < ApplicationController
  def index
    # ...
  end

  def show
    # ...
  end

  def new
    @experience = Experience.new
  end

  def create
    @experience = Experience.new(experience_params)

    if @experience.save
      redirect_to experience_path(@experience)
    else
      render :new
    end
  end

  def edit
    @experience = Experience.find(params[:id])
  end

  def update
    @experience = Experience.find(params[:id])

    if @experience.update(experience_params)
      redirect_to experience_path(@experience)
    else
      render :edit
    end
  end

  def destroy
    # ...
  end

  private

  def experience_params
    params.require(:experience).permit( ..., :age_preference, ..., ...)
  end
end
```

Selanjutnya, saya akan membuat tampilan multiple checkbox pada view template.


## View

Berdasarkan sekenario di atas, pada nomor 1 dan 2, artinya, saya memiliki form pada saat `:new` dan `:edit`.

Lebih mudah, dibuatkan render partial agar bisa berbagi form. Wkwkwk.

```eruby
!filename: app/view/experiences/new.html.erb 
<%= form_for(@experience, url: {action: :create}, html: {id: 'form'}) do |f| %>
  <%= render 'form', f: f, experience: @experience %>
<% end %>
```

```eruby
!filename: app/view/experiences/edit.html.erb
<%= form_for(@experience, url: {action: :update}, html: {id: 'form'}) do |f| %>
  <%= render 'form', f: f, experience: @experience %>
<% end %>
```

Nah, selanjutnya tinggal membuat view template form yang akan digunakan oleh kedua view template di atas.

Namun, saya akan pangkas hanya pada bagian input untuk `:age_preference` saja.

CSS class yang ada pada contoh di bawah, hanya *dummy*.

```eruby
!filename: app/view/experiences/_form.html.erb
<div class="form-group">
  <label>Age Preference</label>
  <!-- Untuk [] Adult, [] Teen, [] Children -->
  <%= f.collection_check_boxes :age_preference, ['Adult', 'Teen', 'Children'], :to_s, :to_s,
  (experience.age_preference.nil? ? {} : {checked: JSON.parse(experience.age_preference.to_json).split(", ")}) do |b| %>
    <div class="custom-checkbox">
      <%= b.check_box class: 'custom-control-input checkbox-item' %>
      <%= b.label class: 'custom-control-label' %>
    </div>
  <% end %>
  <!-- Untuk [] Select All -->
  <div class="custom-checkbox">
    <%= check_box_tag "Select All", nil, nil, class: "custom-control-input checkbox-all" %>
    <%= label_tag "Select All", nil, class: "custom-control-label" %>
  </div>
</div>
```

Puanjang sekali yaa? Wkwkwk

Apa kegunaan dari option,

```ruby
(experience.age_preference.nil? ? {} : {checked: JSON.parse(experience.age_preference.to_json).split(", ")})
```

Option tersebut saya tambahan untuk menampilkan data yang sudah ada pada database pada saat proses `:edit`. Kalau tanpa baris itu, maka pada saat proses edit, checkbox akan kembali uncheck all.

Nah, kita memerlukan bantuan Javascript, untuk membuat feature "Select All".

Pada class yang dimiliki oleh `check_box`, terdapat 2 kelas yang berbeda.

`checkbox-item` untuk Adult, Teen, dan Children. Sdangkan `checkbox-all` untuk Select All.

Langsung kita tambahkan Javascript pada bagian paling bawah dari file `_form.html.erb` ini.

```eruby
!filename: app/view/experiences/_form.html.erb
<script>
  // For age preference select all feature
  $(".checkbox-checkall").change(function(){
    $(".checkbox-item").prop("checked", $(this).is(":checked"))
  });

  // For unchecked select all checkbox if one of checkbox-item unchecked
  $(".checkbox-item").change(function () {
    if ($(".checkbox-item:checked").length == $(".checkbox-item").length){
      $(".checkbox-checkall").prop("checked",true);
    }
    else {
      $(".checkbox-checkall").prop("checked",false);
    }
  });
</script>
```

Nah, feature multiple checkbox dengan tambahan select all sudah selesai.

Selanjutnya kita perlu merubah data yang di passing dari view template ini ke model dalam bentuk yang mudah untuk dibaca di database.

Kita akan tambahkan method untuk mempercantik bentuk datanya terlebih dahulu pada model.


## Model

Karena data output dari helper method `collection_check_boxes` ini berupa array, maka saya akan merubahnya menjadi string karena field `:age_preference` bertipe data string. Namun, kalau langsung disimpan, bentuk datanya akan jelek, wkwkwk.

Sebenarnya ini bukan masalah, karena kita dapat membuat helper method lain untuk mengkonversi tampilan data, namun saya lebih memilih untuk merubah bentuk datanya sebelum disimpan. Maka dari itu saya membuat method untuk merubah bentuk data yang akan disimpan pada model.

Bentuk data yang akan disimpan seperti ini apabila belum dirubah.

```
"[\"Adult\", \"Teen\", \"Children\"]"
```

Sedangkan, yang saya inginkan seperti ini,

```
"Adult, Teen, Children"
```

Nah, ini adalah method yang saya tambahkan pada model, untuk merubah bentuk data hasil dari `collection_check_boxes`.

```ruby
!filename: app/models/experience.rb
class Experience < ApplicationRecord
  # ...
  # ...
  # ...

  before_save do
    self.age_preference.gsub!(/[\[\]\"]/, "")&.delete_prefix!(", ") if attribute_present?("age_preference")
  end
end
```

Dengan begini, pada saat akan menggunakan data `:age_preference` untuk digunakan pada view temlate, tidak perlu repot, karena bentuk datanya sudah bagus.

Misal pada `:show`.

```eruby
!filename: app/view/experiences/show.html
Age Preference : <%= @experience.age_preference %>
```

Mungkin bukan cara yang baik, jadi teman-teman tidak harus mengikutinya atau menggunakan cara yang lebih baik yaa.

Bagaimanapun juga saya masih seorang Junior Rails Developer yang belum memiliki pengalaman yang cukup dalam mendevelop web app yang baik.

Sepertinya segini saja, mudah-mudahan dapat bermanfaat buat teman-teman.

Terima kasih.

(^_^)


# Referensi

1. [apidock.com/rails/v4.0.2/ActionView/Helpers/FormOptionsHelper/collection_check_boxes](https://apidock.com/rails/v4.0.2/ActionView/Helpers/FormOptionsHelper/collection_check_boxes)
<br>Diakses tanggal: 2019/12/10
