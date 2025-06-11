---
layout: 'post'
title: "Setup LSP Solargraph untuk Rails di Neovim"
date: '2023-07-08 20:34'
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
description: "Language Server Protocol sangat membantu developer saat proses membangun aplikasi. Solargraph adalah salah satu LSP yang populer digunakan dikalangan Ruby programmer dan Rails developer. Catatan ini akan mendokumentasikan cara saya melakukan setup terhadap Solargraph pada Rails project di Neovim."
---

# Pendahuluan

{{ page.description }}


# Sekilas tentang Solargraph

Dikutip dari halaman *official site* dari solargraph,

> *Solargraph is a Ruby language server and suite of static analysis tools. The language server provides intellisense, autocompletion, diagnostics, and other language features for editors and IDEs with language client capabilities. The static analysis tools check code for type safety.*

Fitur yang ditawarkan, antara lain:

1. Context-aware autocompletion
1. Documentation for the Ruby core
1. Gem support
1. Linting and diagnostics
1. Type checking

Ruby programmer atau Rails developer pasti sudah familiar dengan gem ini.


# Setup


## Setup Solargraph di Neovim (Lua)

Saya menggunakan Neovim dengan konfiguasi lua.

```lua
local on_attach = function(client, bufnr)
  if client.server_capabilities.documentSymbolProvider then
    navic.attach(client, bufnr)
  end
end

require("lspconfig").solargraph.setup({
  on_attach = on_attach
})
```

Solargraph belum akan berjalan karena kita perlu memasang Solargraph gem terlebih dahulu.


## Setup Solargraph di Rails project


### Install solargraph & solargraph-rails

Gem yang diperlukan tentu saja `solargraph` dan juga `solargraph-rails`. Namun, kita **tidak perlu memasukkannya** ke dalam `Gemfile` project kita.

Cukup install sendiri di dalam lokal project kita. Karena bisa jadi anggota tim kita tidak menggunakan Solargraph.

```
$ gem install solargraph solargraph-rails
```

Initialize file konfigurasi dengan menjalankan perintah di bawah pada direktori root dari Rails project.

```
$ solargraph config
```

Perintah di atas, akan otomatis membuatkan kita file `.solargraph.yml` di Root Rails project dan sudah memiliki *default template* di dalamnya.

Modifikasi isinya seperti di bawah ini

```yaml
!filename: .solargraph.yml
---
include:
- "**/*.rb"
exclude:
- spec/**/*
- test/**/*
- vendor/**/*
- ".bundle/**/*"
require:
- rails
domains: []
reporters:
- rubocop
- require_not_found
formatter:
  rubocop:
    cops: safe
    except: []
    only: []
    extra_args: []
require_paths: []
plugins:
- solargraph-rails
max_files: 5000
```

Yang saya tambahkan adalah bagian,

```yaml
!filename: .solargraph.yml
require:
- rails
```

dan

```yaml
!filename: .solargraph.yml
plugins:
- solargraph-rails
```


### Rubocop sebagai Linter

Secara default Solargraph menggunakan Rubocop sebagai linter. Pasang juga.

```
$ gem install rubocop
```

Kalau mau menginisialisasi file confignya gunakan perintah di bawah ini

```
$ rubocop --auto-gen-config
```

Perintah di atas akan mengenerate konfigurasi default untuk Rubocop yaitu file `.rubocop.yml` dan `.rubocop_todo.yml` di Root Rails prject kita.

Sip!

Konfigurasi sudah selesai, dengan begini kita sudah dapat memanfaatkan kemampuan LSP Solargraph di Neovim kita.

| Keymap | Action |
| --- | --- |
| <kbd>g</kbd>+<kbd>d</kbd>	| Jump to definition |
| <kbd>shift</kbd>+<kbd>k</kbd>	| Show hover documentation |
| <kbd>g</kbd>+<kbd>r</kbd>	| Open quickfix with all references to method |
| <kbd>r</kbd>+<kbd>n</kbd>	| Rename method and update references |


### Daftarkan .solargraph.yml, .rubocop.yml, dan .rubocop_todo.yml ke .gitignore

Agar tidak mengganggu isi dari direktori Root Rails project, kita perlu mendaftarkan file-file konfigurasi yaml yang telah dibuat ke dalam file `.gitignore`.

```conf
!filename: .gitignore
/.rubocop*.yml
/.solargraph.yml
```


# Pesan Penulis

Terima kasih sudah mampir yaa.


# Referensi

1. [https://solargraph.org/](https://solargraph.org/)
<br>Diakses tanggal: 2023/07/08

1. [https://github.com/castwide/solargraph](https://github.com/castwide/solargraph)
<br>Diakses tanggal: 2023/07/08

1. [https://github.com/iftheshoefritz/solargraph-rails](https://github.com/iftheshoefritz/solargraph-rails)
<br>Diakses tanggal: 2023/07/08
