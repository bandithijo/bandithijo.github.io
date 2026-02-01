---
layout: "post"
title: "Qna: Fitur Apa yang Dimiliki Rails Sehingga Sulit untuk Pindah ke Framework Lain?"
date: "2026-02-01 18:13"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-02-01-qna-fitur-yang-dimilikirails-sehingga-sulit-pindah-ke-framework-lain"
author: "BanditHijo"
category: "blog"
tags: ["ruby", "rails", ]
description: "QnA ini di-request oleh mas Rizqi Ramadhan via email. Pertanyaan ini diajukan sekitar tahun 2023. Ia bertanya sebagian besar terkait dengan Ruby on Rails. Saya merasa pertanyaan dan jawaban ini akan memberikan lebih banyak manfaat jika dipublikasikan. Semoga bermanfaat yaa."
---

## Pendahuluan

{{ page.description }}

> PERHATIAN
> 
> Saya kesulitan mencari alamat email dari mas Rizky Ramadhan, jika mas Rizky membaca ini dan tidak berkenan untuk mempublikasikan tulisan ini, boleh hubungi saya via email yaa.

## Question: from Rizky Ramadhan

Halo, mas. Perkenalkan, saya Rizky, baru lulus tahun ini, sekarang sudah bekerja, sekitar 1 bulan lebih dikit. Kalau di kantor biasa pakai Yii, untuk hobi saya suka Laravel. Mau tanya soal Ruby on Rails.

Kemarin saya sudah menonton tutorial Ruby on Rails dari Padang Tekno di YouTube, lumayan sulit juga nyari tutorial yang up to date, kebanyakan 3 tahun / 5 tahun yang lalu.

Kalau dari yang saya pahami, konsep Rails dan Laravel lumayan mirip. Apa yang bisa dilakukan Rails, bisa juga dilakukan Laravel. Meskipun, kalau soal syntax, Ruby lebih elegan.

Jadi, pertanyaannya:

1. [**Apa yang bikin bertahan dengan Rails sampai hari ini mas?**]({{ site.url }}{{ page.url }}#q-apa-yang-bikin-bertahan-dengan-rails-sampai-hari-ini)
2. [**Kelebihan apa yang dimiliki Rails sehingga memudahkan pada saat bekerja?**]({{ site.url }}{{ page.url }}#q-kelebihan-apa-yang-dimiliki-rails-sehingga-memudahkan-pada-saat-bekerja)
3. [**Fitur apa yang dimiliki Rails sehingga sulit untuk pindah ke framework lain?**]({{ site.url }}{{ page.url }}#q-fitur-apa-yang-dimiliki-rails-sehingga-sulit-untuk-pindah-ke-framework-lain)

Saya tertarik buat nyoba Rails, mas. Cuman, belum click di mana "magic" nya, selain syntax yang elegan tadi.

Udah liat-liat comparison nya di internet, tapi sepertinya kebih baik bertanya langsung kepada sepuh. Makasih mas 🙏


## Answer: from BanditHijo

Halo halo Rizky.

Selamat atas kelulusan dan sudah keterima bekerja. Mudah-mudahan berkah ilmunya yaa.

Sebelumnya, terima kasih yaa sudah mengajukan pertanyaan terkait Rails. Sebenernya saya belum bisa disebut sepuh Rails, karena baru pakai Rails dari tahun 2019-2021 (FullStack), 2022-2023 (Backend). Wkwkwk.


### Q: Apa yang bikin bertahan dengan Rails sampai hari ini?

Mungkin karena masih bekerja pakai Rails dan belum ketemu kesulitan dan jalan buntu ketika digunakan saat bekerja. Masih happy pakai Rails.


### Q: Kelebihan apa yang dimiliki Rails sehingga memudahkan pada saat bekerja?

Kelebihan-kelebihan yang saya rasakan ketika pakai Rails saat bekerja:

1. Rails ini framework yang bersifat Opinionated. Artinya sudah ada aturan yang disepakati (secara umum) untuk melakukan suatu pekerjaan yang umum (biasa disebut Best Practice). Kalau bekerja dalam tim, sifat opinionated ini yang mempermudah dan mempercepat menyelesaikan suatu task. Karena kita tidak perlu lagi memperdebatkan mana cara penyelesaian masalah yang baik. Kecuali ada kondisi-kondisi tertentu yang disepakai oleh tim untuk tidak menggunakan "best practice" karena kebutuhan tertentu.

2. Proses menyelesaikan task menjadi lebih cepat karena beberapa flow bisnis, sudah ada dan sudah dibuatkan best practicenya, jadi tidak perlu lagi memperdebatkan flow bisnis yang sudah umum. Tinggal pakai saja kalau memang tidak ada kebutuhan khusus.

   Dengan begini, perdebatan terkait hal-hal teknis, yang umumnya terjadi di tempat kami:

   * **Nama tabel** di Rails, sudah dikonvensikan kalau nama tabel harus kata benda yang plurarl
   * **Penggunaan HTTP method** harus mengikuti aturan RESTful API. Dimana ketika membuat endpoint harus menggunakan HTTP method yang sesuai untuk fungsi yang sesuai (GET/POST/PATCH/PUT/DELETE).

3. Metaprogramming. Ruby memiliki kemampuan metaprogramming yang diadopsi oleh Rails untuk mempermudah proses pembuatan aplikasi.

   Terkait metraprogramming di Rails, ada banyak sekali, tapi yang baru-baru aja (inget) saya pakai yang seperti ini:

   * **Active Model Dirty** <https://api.rubyonrails.org/classes/ActiveModel/Dirty.html> \
     Saya pakai untuk membuat callback, ketika suatu atribute (misal: name) berubah nilainya.

   * **Active Record Nested Attributes** <https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html> \
     Saya pakai untuk membuat data child yang berasosiasi dengan parent. Jadi ketika parentnya dibuat, child nya juga ikut terbut. Misal: membuat admin (parent) baru dengan beberapa admin_permission (child).

   2 method di atas, terdengar biasa aja. Tapi kalau dilihat kodenya, hal-hal tersebut dapat dilakukan hanya dengan kode yang simple tanpa perlu banyak effort.

   Hal lain seperti migrasi dan relasi tabel juga pakai metaprogramming, sehingga ada method-method yang secara ajaib sudah ada dan tinggal dipakai.

   Kebetulan kemarin sempet lihat topik terkait "Powerful Rails Feature You Might Not Know" dari Chris Oliver di Rails World 2023, bisa coba tonton di sini yaa <https://www.youtube.com/watch?v=iPCqwZ9Ouc4>

4. Dokumentasi yang dimiliki Rails juga terbilang rapi dan deskriptif. Mulai dari dokumentasi Rails yang ada di <https://guides.rubyonrails.org/>, sampai dokumentasi Rails API yang ada di <https://api.rubyonrails.org/>

5. Rails sebenarnya kumpulan dari beberapa module (library) yang modular yang didesain untuk memiliki intarface yang agnostic. Jadi bisa pakai engine (backend) apa saja. Misal, untuk Active Job kita bisa pakai Sidekiq, Resque, Sneakers, Delayed Job, Good Job, dll. <https://edgeguides.rubyonrails.org/active_job_basics.html#starting-the-backend> Tapi dengan interface yang sama. Jadi meskipun backend job nya bisa berbeda, tapi interface nya tetep sama (nama pemanggilan method nya sama). Terkait Rails dan modularitynya, bisa tonton dari salah satu Rails Core, Eileen Uchitelle di Keynote RailsConf 2023 <https://www.youtube.com/watch?v=TKulocPqV38>.


### Q: Fitur apa yang dimiliki Rails sehingga sulit untuk pindah ke framework lain?

Jujurly saya belum pernah coba framework lain selama Rails, jadi belum bisa kasih jawaban.

Rails ini framework yang sudah lama, sudah mature dalam artian sudah banyak digunakan untuk menyelesaikan beberapa bisnis flow. Yang kemudian flow tersebut dibakukan dalam bentuk method, sehingga tinggal kita pakai dan panggil saja. Tentunya ketersediaan built-in class dan method ini dan hal-hal yang berkaitan dengan jawaban sebelumnya juga yang membuat proses penyelesaian suatu problem menjadi lebih cepat.

Kira-kira ini sedikit yang bisa saya sharing terkait Rails dari pengalaman selama menggunakan Rails untuk kerjaan.

Untuk sekarang, dikerjaan, saya lebih banyak pakai Rails sebagai Backend saja. Jadi tidak menjadikan Rails sebagai FullStack. Maka dari itu, jawaban dan ilustrasi yang kuberikan, terbatas di Rails sebagai Backend (sudut pandang fitur-fitur yang memudahkan pekerjaan di Backend). Tentunya tidak sebanding dengan orang yang menjadikan Rails sebagai Fullstack. Karena di bagian Frontend juga terdapat method-method helper yang banyak memudahkan untuk mempercepat proses pembuatan tampilan web.

Untuk kedepannya, saya juga masih sambil belajar JavaScript. Pengetahuan JavaScript sebagai Rails Developer tentu akan sangat membantu, dibandingkan dengan Rails Developer yang tidak memiliki pengetahuan tentang JavaScript sama sekali.

Mudah-mudahan jawaban saya sudah menjawab 3 pertanyaan yang diajukan yaa.
