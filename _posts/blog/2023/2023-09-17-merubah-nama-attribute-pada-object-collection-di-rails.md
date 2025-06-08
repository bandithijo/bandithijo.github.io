---
layout: 'post'
title: "Merubah Nama Attribute yang Panjang pada Collection of Object di Rails"
date: '2023-09-17 20:24'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Rails']
pin:
hot:
contributors: []
description: "Pada catatan kali ini saya ingin memodifikasi output dari nama attribute yang terlalu panjang menjadi lebih pendek di Ruby on Rails."
---

# Pendahuluan

{{ page.description }}

# Masalah

Saya memiliki method **geofences** yang mengembalikan *colllection of* `hash` data dari model **geofeonce**.

Model **geofence** memiliki attributes,

```
:id, :created_at, :updated_at, :name, :description, :coordinates, :incoming_notification, :outgoing_notification
```

Saya hanya ingin mengambil attributes: `:id`, `:incoming_notification`, `:outgoing_notification`.

```ruby
!filename: app/geofences_controller.rb
def geofences
  {
    geofences: Geofence.all.order(id: :asc).as_json(only: [:id, :incoming_notification, :outgoing_notification])
  }
end
```

Outputnya,

```json
{
  "geofences": [
    {
      "id": 1,
      "incoming_notification": true,
      "outgoing_notification": false
    },
    {
      "id": 2,
      "incoming_notification": false,
      "outgoing_notification": true
    },
    {
      "id": 3,
      "incoming_notification": true,
      "outgoing_notification": false
    },
    {
      "id": 4,
      "incoming_notification": false,
      "outgoing_notification": true
    }
  ]
}
```

Karena nama attribute `:incoming_notification` dan `:outgoing_notification` terlalu panjang, saya akan ganti menjadi `:in` dan `:out`.

# Pemecahan Masalah

**Algoritma Pertama**

```ruby
!filename: app/geofences_controller.rb
def geofences
  {
    geofences: Geofence.all.order(id: :asc)
      .as_json(only: [:id, :incoming_notification, :outgoing_notification])
      .each { |attribute|
        attribute.tap { |key|
          key[:in] = key.delete('incoming_notification')
          key[:out] = key.delete('outgoing_notification')
        }
      }
  }
end
```

**Algoritma Kedua**

```ruby
!filename: app/geofences_controller.rb
def geofences
  geofences = Geofence.all.order(id: :asc)

  transformed_geofences = geofences.map do |geofence|
    {
      id: geofence.id,
      in: geofence.incoming_notification,
      out: geofence.outgoing_notification
    }
  end

  { geofences: transformed_geofences }
end
```

Saya menulis 2 pendekatan. Namun, saya cenderung memilih algoritma kedua.

Alasannya adalah,

**Database Query Optimization**:

1. algoritma pertama, diambil semua data, lalu dilakukan filtering dan tranformation dengan `.as_json`
1. algoritman kedua, hanya mengambil attribute yang diperlukan `:id`, `:incoming_notification`, `:outgoing_notification` dengan `.map()`, hal ini berpotensi untuk meminimalisir query time ke database

**Reduced Object Mutation**:

1. algoritman pertama, menggunakan `.each` dengan `.tap` untuk memodifikasi Hash Object, hal ini terkadang dapat menyebabkan *behaviour* yang tidak dapat diprediksi sehingga menimbulkan bug.
1. algoritma kedua, langsung membuat Hash Object dengan attribute yang diperlukan tanpa meodifikasi data aslinya, tentu saja ini menjadi pendekatan yang cukup aman

Hasilnya,

```json
{
  "geofences": [
    {
      "id": 1,
      "in": true,
      "out": false
    },
    {
      "id": 2,
      "in": false,
      "out": true
    },
    {
      "id": 3,
      "in": true,
      "out": false
    },
    {
      "id": 4,
      "in": false,
      "out": true
    }
  ]
}
```

# Pesan Penulis

Terima kasih sudah mampir yaa.


# Referensi

1. [stackoverflow.com: _Change property name of as_json call_](https://stackoverflow.com/a/33528446/4862516)
