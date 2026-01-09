---
layout: "post"
title: "Setup Ruby LSP di Neovim"
date: "2026-01-10 00:24"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-01-10-setup-ruby-lsp-di-neovim"
author: "BanditHijo"
category: "blog"
tags: ["neovim", "ruby"]
description: "Language Server Protocol sangat membantu developer saat proses developement. Ruby LSP adalah LSP untuk Ruby yang terbilang masih cukup baru, yang mulai populer digunakan dikalangan Ruby programmer dan Rails developer. Catatan ini akan mendokumentasikan cara saya melakukan setup terhadap Ruby LSP di Neovim."
---

## Prerequisites

`neovim 0.10.x`


## Pendahuluan

{{ page.description }}

![Gambar 1]({{ page.assets}}/gambar_01.png)

Gambar 1. Ruby LSP icon

> *The Ruby LSP is an implementation of the language server protocol for Ruby, used to improve rich features in editors. It is a part of a wider goal to provide a state-of-the-art experience to Ruby developers using modern standards for cross-editor features, documentation and debugging.*


## Instalasi Ruby LSP


### Install ruby-lsp gem

Install `ruby-lsp` gem menggunakan perintah berikut:

```
$ gem install ruby-lsp
```


## Setup Ruby LSP di Neovim

Saya menggunakan plugin `nvim-lspconfig` untuk mengatur LSP di Neovim.

Berikut adalah konfigurasi yang saya gunakan untuk mengaktifkan Ruby LSP di Neovim.

```lua
!filename: lua/lsp/init.lua
local lspconfig = require('lspconfig')
lspconfig.ruby_lsp.setup({
  init_options = {
    formatter = 'standard',
    linters = { 'standard' },
    addonSettings = {
      rails = true,
      rspec = true,
    },
  },
})
```

Just it! Ruby LSP sudah aktif di Neovim.

Hanya sesederhana itu saja instalasi dan konfigurasi Ruby LSP di Neovim. Selamat mencoba!

Dan untuk Rails, sudah otomatis terdeteksi jika berada di dalam project Rails.

> *Ruby LSP detects Rails projects and installs the Rails add-on for you.*


## Pesan Penulis

Saya sangat merekomendasikan Ruby LSP ini untuk dicoba, terutama bagi Anda yang sering menggunakan Neovim sebagai editor utama. Fitur-fitur yang ditawarkan sangat membantu dalam meningkatkan produktivitas saat coding Ruby atau Rails.

Sejak Maret 2025, saya sudah mulai menggunakan Ruby LSP ini di Neovim, setelah sebelumnya sejak 2019 menggunakan Solargraph.

![Gambar 2]({{ page.assets}}/gambar_02.png)

Gambar 2. Post terkait Ruby LSP di Threads saya.

Pengalaman saya sejauh ini sangat positif. Saya bahkan lupa kalau saya menggunakan Ruby LSP dan bukan lagi Solargraph.




## Referensi

1. [https://shopify.github.io/ruby-lsp/](https://shopify.github.io/ruby-lsp/) \
  Tanggal diakses: 2026-01-10

1. [https://shopify.github.io/ruby-lsp/editors#neovim](https://shopify.github.io/ruby-lsp/editors#neovim) \
  Tanggal diakses: 2026-01-10

1. [https://shopify.github.io/ruby-lsp/rails-add-on.html](https://shopify.github.io/ruby-lsp/rails-add-on.html) \
  Tanggal diakses: 2026-01-10

1. [GitHub: Shopify/ruby-lsp](https://github.com/Shopify/ruby-lsp) \
  Tanggal diakses: 2026-01-10
