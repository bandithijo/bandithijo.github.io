---
layout: "post"
title: "Devise Registration Tanpa Password, Set Password Setelah Confirmation"
date: "2021-03-13 14:00"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2021/2021-03-13-devise-registration-tanpa-password-set-password-after-confirmation"
author: "BanditHijo"
category: "blog"
tags: ["rails"]
description: "Catatan kali ini tentang pemanfaatan Devise gem untuk registration tanpa menginputkan password, password akan diminta setelah user membuka link konfirmasi yang dikirimkan via email."
---

## Prerequisite

`ruby 3.0.0` `rails 6.1.3` `postgresql 12.5` `rspec 4.0.0`


## Latar Belakang Masalah

Catatan kali ini tentang pemanfaatan Devise gem untuk registration tanpa menginputkan password, password akan diminta setelah user membuka link konfirmasi yang dikirimkan via email.


## Pemecahan Masalah


### Gemfile

1. [**Devise**](https://github.com/heartcombo/devise), untuk authentication
2. [**Simple Form**](https://github.com/heartcombo/simple_form), untuk menghandle form agar lebih praktis*

\* Optional

```ruby
!filename: Gemfile
gem 'devise',      '~> 4.7', '>= 4.7.3'
gem 'simple_form', '~> 5.1'
```

Jalankan bundle install,

```
$ bundle install
```

Kemudian install kedua gem tersebut ke dalam web aplikasi.

Dahulukan **simple_form**, dengan begitu form-form yang akan digenerate oleh **Devise** akan otomatis menggunakan form dari simple_form.

```
$ rails g simple_form:install
```

Setelah itu, **devise**.

```
$ rails g devise:install
```

### ActionMailer

Selanjutnya konfigurasi ActionMailer untuk environment development.

```ruby
!filename: config/environments/development.rb
Rails.application.configure do
  # ...

  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = { address: '127.0.0.1', port: 1025 }

  # ...
end
```

Baris 7 dan 8, adalah configurasi untuk MailCatcher.

Untuk yang belum tahu MailCatcher, dapat dibaca di sini, [**Konfigurasi Ruby on Rails ActionMailer pada Local Environment dengan MailCatcher**](/blog/ruby-on-rails-actionmailer-local-mailcatcher).


### Devise Initializer

Kita perlu merubah beberapa konfigurasi pada Devise initializer.

```ruby
!filename: config/initializer/devise.rb
Devise.setup do |config|
  # ...

  # ==> Mailer Configuration
  # Configure the e-mail address which will be shown in Devise::Mailer,
  # note that it will be overwritten if you use your own mailer class
  # with default "from" parameter.
  config.mailer_sender = 'no-reply@example.com'

  # If true, requires any email changes to be confirmed (exactly the same way as
  # initial account confirmation) to be applied. Requires additional unconfirmed_email
  # db field (see migrations). Until confirmed, new email is stored in
  # unconfirmed_email column, and copied to email column on successful confirmation.
  config.reconfirmable = false

  # ...
end
```

Ganti `config.mailer_sender =` sesuai alamat yang teman-teman inginkan.

Ganti `config.reconfirmable =` menjadi **false**.


### Devise User Model

Kita akan membuat User model dengan devise.

```
$ rails g devise User
```

Buka migrationsnya, dan enablekan `:confirmation_token`, `:confirmed_at`, `:confirmation_sent_at` pada bagian **Confirmable**.

```ruby
!filename: db/migrate/20210312144943_devise_create_users.rb
# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      # ...

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      # ...
    end

    # ...
  end
end
```

Saya akan menambahkan filed **name**.

```
$ rails g migration add_name_to_users name:string
```

```ruby
!filename: db/migration/20210312145059_add_name_to_users.rb
class AddNameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :name, :string
  end
end
```

Sip, jalankan migration.

```
$ rails db:migrate
```

Aktifkan module `:confirmable` pada **user.rb** model.

```ruby
!filename: app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable
end
```

Sekalian, tambahkan logic untuk menghandle registration tanpa password di bawah module-module Devise tersebut.

```ruby
!filename: app/modles/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable

  # new function to set the password without knowing the current
  # password used in our confirmation controller.
  def attempt_set_password(params)
    p = {}
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    update_attributes(p)
  end

  def password_match?
     self.errors[:password] << "can't be blank" if password.blank?
     self.errors[:password_confirmation] << "can't be blank" if password_confirmation.blank?
     self.errors[:password_confirmation] << "does not match password" if password != password_confirmation
     password == password_confirmation && !password.blank?
  end

  # new function to return whether a password has been set
  def has_no_password?
    self.encrypted_password.blank?
  end

  # Devise::Models:unless_confirmed` method doesn't exist in Devise 2.0.0 anymore.
  # Instead you should use `pending_any_confirmation`.
  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  def password_required?
    # Password is required if it is being set, but not for new records
    if !persisted?
      false
    else
      !password.nil? || !password_confirmation.nil?
    end
  end
end
```


### Controller

Kita akan membuat 2 custom controller yang merupakan turunan dari Devise controller.

1. RegistrationsController < Devise::RegistrationsController
2. ConfirmationsController < Devise::ConfirmationsController

```ruby
!filename: app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end
```

```ruby
!filename: app/controllers/confirmations_controller.rb
class ConfirmationsController < Devise::ConfirmationsController
  # Remove the first skip_before_filter (:require_no_authentication) if you
  # don't want to enable logged users to access the confirmation page.
  # If you are using rails 5.1+ use: skip_before_action
  # skip_before_filter :require_no_authentication
  # skip_before_filter :authenticate_user!

  # PUT /resource/confirmation
  def update
    with_unconfirmed_confirmable do
      if @confirmable.has_no_password?
        @confirmable.attempt_set_password(params[:user])
        if @confirmable.valid? and @confirmable.password_match?
          do_confirm
        else
          do_show
          @confirmable.errors.clear # so that we wont render :new
        end
      else
        @confirmable.errors.add(:email, :password_already_set)
      end
    end

    if !@confirmable.errors.empty?
      self.resource = @confirmable
      render 'devise/confirmations/new' # Change this if you don't have the views on default path
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    with_unconfirmed_confirmable do
      if @confirmable.has_no_password?
        do_show
      else
        do_confirm
      end
    end
    unless @confirmable.errors.empty?
      self.resource = @confirmable
      render 'devise/confirmations/new' # Change this if you don't have the views on default path
    end
  end

  protected

  def with_unconfirmed_confirmable
    @confirmable = User.find_or_initialize_with_error_by(:confirmation_token, params[:confirmation_token])
    if !@confirmable.new_record?
      @confirmable.only_if_unconfirmed {yield}
    end
  end

  def do_show
    @confirmation_token = params[:confirmation_token]
    @requires_password = true
    self.resource = @confirmable
    render 'devise/confirmations/show' # Change this if you don't have the views on default path
  end

  def do_confirm
    @confirmable.confirm
    set_flash_message :notice, :confirmed
    sign_in_and_redirect(resource_name, @confirmable)
  end
end
```

Baris baris ke 58, kita akan membuat sendiri custom view template tersebut.

Pada catatan ini, saya membuat homepage, untuk tempat bernaung setelah melakukan registrasi dan juga sebagai **root_path**.

```
$ rails g controller Home index
```


### Routes

```ruby
!filename: config/routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  devise_for :users, controllers: {
    registrations: 'registrations',
    confirmations: 'confirmations'
  }

  as :user do
    put '/users/confirmation' => 'confirmations#update', via: :patch, as: :update_user_confirmation
  end
end
```


## Devise Views

Kita akan mengenerate Devise views.

```
$ rails g devise:views
```

Yang perlu dimodifikasi adalah:

1. mengedit registrations/new
1. menambahkan field name
1. menghilangkan field password & password_confirmation
1. membuat confirmations/show
1. meletakkan field password & password_confirmation

Modifikasi view template **registrations/new**.

```eruby
!filename: app/views/devise/registrations/new.html.erb
<h2>Sign up</h2>

<%= simple_form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= f.error_notification %>

  <div class="form-inputs">
    <%= f.input :name,
                required: true,
                autofocus: true,
                input_html: { autocomplete: "name" }%>
    <%= f.input :email,
                required: true,
                input_html: { autocomplete: "email" }%>

    <%# :password & :password_confirmation, dipindahkan ke views/devise/confirmations/show.html.erb %>
  </div>

  <div class="form-actions">
    <%= f.button :submit, "Sign up" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>
```

![Gambar 1]({{ page.assets | absolute_url }}/gambar-02.png)

Gambar 1. Sign up form or Registration form

Dapat dilihat, pada form registrasi ini, hanya menampilkan input field berupa **name** dan **email**.

Saya memindahkan field `password` dan `password_confirmation` ke halaman yang lain, yaitu halaman **views/devise/confirmations/show.html.erb**.

```eruby
!filename: app/views/devise/confirmations/show.html.erb
<h2>Account Activation<% if resource.try(:user_name) %> for <%= resource.user_name %><% end %></h2>

<%= simple_form_for(resource, as: resource_name, url: update_user_confirmation_path, html: { method: :put }) do |f| %>
  <%= devise_error_messages! %>

  <div class="form-inputs">
    <% if @requires_password %>
      <%= f.input :password,
                  required: true,
                  autofocus: true,
                  hint: ("#{@minimum_password_length} characters minimum" if @minimum_password_length),
                  input_html: { autocomplete: "new-password" } %>
      <%= f.input :password_confirmation,
                  required: true,
                  input_html: { autocomplete: "new-password" } %>
    <% end %>

    <%= hidden_field_tag :confirmation_token,@confirmation_token %>
  </div>

  <div class="form-actions">
    <%= f.button :submit, "Activate" %>
  </div>
<% end %>
```

![Gambar 2]({{ page.assets | absolute_url }}/gambar-03.png)

Gambar 2. Account Activation form

```eruby
!filename: app/views/devise/confirmations/new.html.erb
<h2>Resend confirmation instructions</h2>

<%= simple_form_for(resource, as: resource_name, url: confirmation_path(resource_name), html: { method: :post }) do |f| %>
  <%= f.error_notification %>
  <%= f.full_error :confirmation_token %>

  <div class="form-inputs">
    <%= f.input :email,
                required: true,
                autofocus: true,
                value: (resource.pending_reconfirmation? ? resource.unconfirmed_email : resource.email),
                input_html: { autocomplete: "email" } %>
  </div>

  <div class="form-actions">
    <% if resource.pending_reconfirmation? %>
      <%= f.button :submit, "Resend confirmation instructions" %>
    <% end %>
  </div>
<% end %>

<% unless user_signed_in? %>
  <%= render "devise/shared/links" %>
<% end %>
```

Pasang nav untuk menempatkan link indikator apabila user telah login atau belum.

```eruby
!filename: app/layouts/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>

  <body>
    <nav style="margin-bottom: 20px;">
      <% if user_signed_in? %>
        <%= link_to current_user.name, edit_user_registration_path, class:"navbar-item" %>
        <%= link_to "Log Out", destroy_user_session_path, method: :delete, class:"navbar-item" %>
      <% else %>
        <% unless [
            new_user_session_path,
            new_user_registration_path,
            new_user_confirmation_path,
            user_confirmation_path,
            new_user_password_path
        ].include? request.path %>
          <%= link_to "Sign In", new_user_session_path, class:"navbar-item" %>
          <%= link_to "Sign up", new_user_registration_path, class:"navbar-item"%>
        <% end %>
      <% end %>
    </nav>

    <%= yield %>
  </body>
</html>
```


## Demonstrasi

![Gambar 3]({{ page.assets | absolute_url }}/gambar-01.gif)

Gambar 3. Demonstrasi register and activation


## Repositori

[**github.com/bandithijo/demo_devise_confirmable**](https://github.com/bandithijo/demo_devise_confirmable)


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Selanjutnya, saya serahkan kepada imajinasi dan kreatifitas teman-teman. Hehe.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [mailcatcher.me](https://mailcatcher.me/) \
   Diakses tanggal: 2021-03-13

1. [Let's Build: With Ruby on Rails - Project Management App - Part 2](https://youtu.be/RpyzUdxZolY) \
   Diakses tanggal: 2021-03-13
