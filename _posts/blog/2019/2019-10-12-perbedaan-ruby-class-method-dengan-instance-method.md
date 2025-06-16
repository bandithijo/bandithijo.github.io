---
layout: 'post'
title: "Perbedaan Ruby Class Method dengan Instance Method"
date: '2019-10-12 23:02'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Ruby', 'Rails']
pin:
hot:
contributors: []
description: "Catatan kali ini mengenai perbedaan antara Method class dengan Instance class pada bahasa pemrograman Ruby."
---

# Prakata

Pada bahasa Ruby, setiap *Method* menyediakan fungsi ke dalam sebuah *Object*.

*Class Method* menyediakan fungsi ke dalam *Class* itu sendiri.

Sedangkan,

*Instance Method* menyediakan fungsi ke satu *Instance Class* atau *Object*.


# Contohnya

Misalkan kita punya sebuah *Class* seperti di bawah ini.

Coba tuliskan per barisnya di dalam **irb** saja biar praktis.

```
!filename: jurus_sakti.rb
class JurusSakti
  def self.kame_hameha
    "Jurus dari Class Method"
  end

  def kaio_ken
    "Jurus dari Instance Method"
  end
end
```

Dari kode di atas, kita dapat melihat bahwa *class JurusSakti* memiliki dua buah *mehtod*.

Yaitu, *method kame_hameha* dan *method kaio_ken*.

Untuk membedakan keduanya, coba panggil seperti contoh-contoh di bawah ini.

```
>> JurusSakti.kame_hameha
=> "Jurus dari Class Method"

>> JurusSakti.kaio_ken
=> NoMethodError: undefined method `kaio_ken' for JurusSakti:Class
```

Terlihat bahwa *method kame_hameha* berhasil dipanggil, sedangkan *method kaio_ken* mengalami *error* berupa *undefined method* yang artinya method *kaio_ken* tidak dikenali.

**Loh kok bisa?**

Ya, tentu saja.

Karena *method kame_hameha* merupakan *Class Method*, sehingga dapat langsung dipanggil bersama nama *class*-nya.

**Lalu, Bagaimana cara memanggil method kaio_ken?**

Nah, caranya dengan membuat *object* baru terlebih dahulu, lalu memasukannya ke dalam sebuah *variable*.

Simak contoh di bawah ini.

```
>> jurus_pamungkas = JurusSakti.new

>> jurus_pamungkas.kame_hameha
=> NoMethodError: undefined method `kame_hameha' for #<JurusSakti:0x000055cd5364e030>

>> jurus_pamungkas.kaio_ken
=> "Jurus dari Instance Method"
```

Terlihat bahwa *method kame_hameha* sekarang gagal dipanggil dan megalami *error* yang sebelumnya dimiliki oleh *method kaio_ken*.

Hal ini terjadi, karena saat ini, kita telah membuat sebuah *object* baru dari *class JurusSakti* (`JurusSakti.new`) yang kita masukkan ke dalam sebuah *variable* dengan nama `jurus_pamungkas`. Yang juga dapat disebut sebagai *object jurus_pamungkas*.

Dengan begini, maka akan sesuai dengan definisi dari sebuah *instance method* yang menyediakan fungsi untuk *object*.

Karena saat ini *jurus_pamungkas* adalah sebuah *object* dari *class JurusSakti*, maka *jurus_pamungkas* dapat menggunakan *method* yang dapat digunakan oleh *object* yaitu *instance method*, yang dalam kasus kita bernama *method kaio_ken*.

Maka dari itu, *method kaio_ken* kali ini, berhasil dipanggil.


# Ringkasan

Contoh dari *Class Method*.

```ruby
!filename: jurus_sakti.rb
class JurusSakti
  def self.kame_hameha
    "Jurus dari Instance Method"
  end
end
```

Contoh dari *Instance Method*.

```ruby
!filename: jurus_sakti.rb
class JurusSakti
  def kaio_ken
    "Jurus dari Instance Method"
  end
end
```

Bahan bacaan lebih lengkap, dapat merujuk pada sumber yang saya sertakan pada referensi di bawah.

Kira-kira segini saja pembahasa kita mengenai perbedaan *Class Method* dengan *Instance Method*.

Mudah-mudahan bermanfaat buat teman-teman.

Terima kasih (^_^)v


# Referensi

1. [RailsTips - Class and Instance Methods in Ruby](http://www.railstips.org/blog/archives/2009/05/11/class-and-instance-methods-in-ruby/)
<br>Diakses tanggal: 2019/10/12
