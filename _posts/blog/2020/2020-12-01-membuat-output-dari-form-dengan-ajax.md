---
layout: "post"
title: "Membuat Form's Output dengan AJAX"
date: "2020-12-01 20:43"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-12-01-membuat-output-dari-form-dengan-ajax"
author: "BanditHijo"
category: "blog"
tags: ["rails", "ajax"]
description: "Membuat output hasil akan ditampilkan tanpa perlu merefresh halaman. Tentu saja di Ruby on Rails juga dapat mengimplementasikan ini. Kita dapat menggunakan AJAX."
---

## Latar Belakang

Tujuannya menggunakan AJAX untuk menampilkan hasil tanpa perlu mereload tempate berulang kali. Cukup sekali panggil dan yang berubah adalah pada bagian hasilnya saja.

![Gambar 1]({{ page.assets }}/gambar-01.png)

Gambar 1. Kotak merah adalah satu-satunya bagian yang berubah, sedangkan bagian lain tidak

Cara yang umum, untuk menampilkan output seperti di atas, adalah seperti ini.

```ruby
!filename: app/controllers/stocks_controller.rb
class StocksController < ApplicationController
  def index
    @tracked_stocks = current_user.stocks
  end

  def search
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock].upcase)
      if @stock
        render 'users/my_portfolio'
      else
        flash[:alert] = 'Please enter a VALID symbol to search'
        redirect_to my_portfolio_path
      end
    else
      flash[:alert] = 'Please enter a symbol to search'
      redirect_to my_portfolio_path
    end
  end
end
```

```ruby
!filename: config/routes.rb
Rails.application.routes.draw do
  root 'welcome#index'
  devise_for :users

  get 'my_portfolio', to: 'stocks#index'
  get 'search_stock', to: 'stocks#search'
end
```

```eruby
!filename: app/views/stocks/index.html.erb
<h3>Search Stocks</h3>
<%= form_tag search_stock_path, method: :get do %>
  <div class="input-group">
    <%= text_field_tag :stock, params[:stock],
                       class: "form-control form-control-lg",
                       placeholder: "Stock ticker symbol",
                       onkeyup: "this.value = this.value.toUpperCase();",
                       autofocus: true %>
    <div class="input-group-append">
      <%= button_tag type: :submit, class: "btn btn-success" do %>
        <%= fa_icon "search 2x" %>
      <% end %>
    </div>
  </div>
<% end %>

<% if @stock %>
  <div class="alert alert-success">
    <div class="row d-flex justify-content-between">
      <div class="col-sm-9 align-self-center">
        <strong>Symbol: </strong><%= @stock.ticker %>
        <strong>Name: </strong><%= @stock.name %>
        <strong>Price: </strong><%= @stock.last_price %>
      </div>
      <div class="col-sm-3">
        <%= link_to "Add to Portfolio", stocks_path(user: current_user, ticker: @stock.ticker),
                    method: :post,
                    class: "btn btn-success btn-block mx-2" %>
      </div>
    </div>
  </div>
<% end %>

<% unless @tracked_stocks.empty? %>
  <table class="table table-borderless table-hover my-3">
    <thead>
      <tr>
        <th>Ticker</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <% @tracked_stocks.each do |stock| %>
        <tr>
          <td><%= stock.ticker %></td>
          <td><%= stock.name %></td>
          <td><%= stock.last_price %></td>
          <td>'Action Placeholder'</td>
        </tr>
      <% end %>
    </tbody>
  </table>
<% end %>
```

Setelah form diinputkan, dan hasil ditampilkan, akan mendapatkan URL seperti ini.

```
http://localhost:3000/search_stock?stock=AMZN&button=
```

Apabila kita menginputkan nilai yang lain, maka template akan ikut dirender untuk menampilkan hasil pencarian yang baru.

```
http://localhost:3000/search_stock?stock=GOOG&button=
```

Nah, pada catatan kali ini, saya akan membuat template dirender sekali saja dan hanya pada bagian yang menampilkan hasil pencarian yang dirender berkali-kali.


## Pemecahan Masalah

Pertama-tama, saya akan merubah output di stocks_controller pada action search menjadi format Javascript.

```ruby
!filename: app/controllers/stocks_controller.rb
class StocksController < ApplicationController
  def index
    @tracked_stocks = current_user.stocks
  end

  def search
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock].upcase)
      if @stock
        respond_to do |format|
          format.js { render partial: 'users/result' }
        end
      else
        respond_to do |format|
          flash.now[:alert] = 'Please enter a VALID symbol to search'
          format.js { render partial: 'users/result' }
        end
      end
    else
      respond_to do |format|
        flash.now[:alert] = 'Please enter a symbol to search'
        format.js { render partial: 'users/result' }
      end
    end
  end
end
```

Kemudian, pada bagian view, pisahkan bagian result, menjadi render partial, saya beri nama `_result.html.erb`.

```eruby
!filename: app/views/stocks/_result.html.erb
<% if stock %>
  <div class="alert alert-success">
    <div class="row d-flex justify-content-between">
      <div class="col-sm-9 align-self-center">
        <strong>Symbol: </strong><%= stock.ticker %>
        <strong>Name: </strong><%= stock.name %>
        <strong>Price: </strong><%= stock.last_price %>
      </div>
      <div class="col-sm-3">
        <%= link_to "Add to Portfolio", stocks_path(user: current_user, ticker: stock.ticker),
                    method: :post,
                    class: "btn btn-success btn-block mx-2" %>
      </div>
    </div>
  </div>
<% end %>
```

Pada bagian yang kita pindahkan (kode di atas) di view **stocks/index.html.erb**, kita ganti dengan `<div id=results>`.

```html
!filename: app/views/stocks/index.html.erb
...
...

<div id="results"></div>
```

Kita akan meletakkan hasil yang diberikan oleh controller pada div denga id=result tersebut.

Kita akan atur di dalam file javascript, buat file **_result.js.erb**.

```javascript
!filename: app/views/stocks/_result.js.erb
document.querySelector('#results').innerHTML = "<%= escape_javascript(render 'users/result.html', stock: @stock) %>"
```

Terakhir, tinggal menambahkan asynchronous form pada form pencarian dengan `remote: true`.

```eruby
!filename: app/views/stocks/index.html.erb
<h3>Search Stocks</h3>
<%= form_tag search_stock_path, remote:true, method: :get do %>
  <div class="input-group">
    <%= text_field_tag :stock, params[:stock],
                       class: "form-control form-control-lg",
                       placeholder: "Stock ticker symbol",
                       onkeyup: "this.value = this.value.toUpperCase();",
                       autofocus: true %>
    <div class="input-group-append">
      <%= button_tag type: :submit, class: "btn btn-success" do %>
        <%= fa_icon "search 2x" %>
      <% end %>
    </div>
  </div>
<% end %>

...
...
```

Hasilnya,

![Gambar 2]({{ page.assets }}/gambar-02.gif)

Gambar 2. Hasil jadinya

Kalau diperhatikan pada bagian address bar, alamat tidak berubah. Karena kita tidak merender template lagi untuk menampilkan hasil, namun hanya merubah bagian yang memiliki `<div id=results></div>`.


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)
