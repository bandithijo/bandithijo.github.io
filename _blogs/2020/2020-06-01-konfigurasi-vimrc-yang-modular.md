---
layout: "post"
title: "Konfigurasi Vimrc yang Modular"
date: "2020-06-01 21:15"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["vim"]
description: "Mengelola dan mengkonfigurasi vimrc yang sudah sangat panjang (ribuan baris) mungkin akan membingungkan. Kita bisa membuat vimrc yang modular untuk memisahkan beberapa komponen-komponen sesuai dengan fungsinya. Dengan begini, diharapkan akan lebih mudah untuk dikelola."
---

## Pendahuluan

Kira-kira 27 Maret 2020 yang lalu, saya berdiskusi dengan **M. Nabil Adani** ([@mnabila](https://t.me/mnabila)) perihal akan ikut memigrasikan konfigurasi vim --lebih tepatnya Neovim-- saya menjadi modular. Kali ini saya tidak bisa menunda, karena saya menemukan masalah terhadap lightline saya yang mengalami error saat berpindah-pindah buffer.

Jadi, untuk mencari penyebab dari permasalahan tersebut, saya memilih menggunakan cara modular, yang mana --asumsi saya-- nantinya, saya dapat menelusuri modul-modul mana yang ternyata menyebabkan masalah tersebut.


## Dasar Teori

Untuk teori vimrc modular ini saya belum menelusuri lebih jauh. Tulisan ini saya buat hanya sebagai catatan dan bukan sebagai referensi.

Dasar atau panduan saya membuat vimrc menjadi modular ini adalah catatan yang diberikan oleh **@mnabila**.


## Struktur Direktori

Memodularkan konfigurasi vim (vimrc), bisa dikatakan mengelompokkan konfigurasi berdasarkan fungsi-fungsi yang bersesuaian satu dengan yang lainnya baik dalam bentuk file maupun direktori.

Berikut ini adalah struktur direktori yang saya pergunakan, saya sedikit melakukan penyesuaian dari yang direkomendasi oleh **@mnabila**.

1. 📁 **autoload/** \
  Direktori ini saya pergunakan, apabila terdapat plugin yang mengharuskan untuk menambahkan konfigurasi pada autoload. Atau kadang juga saya pergunakan untuk mengoverride konfig yang dibawa oleh plugin.

2. 📁 **colors/** \
  Direktori ini biasa saya gunakan untuk menyimpan colorscheme hasil modifikasi saya.

3. 📁 **doc/** \
  Biasanya plugin menyertakan dokumentasi. Kita dapat pula mnyimpan secara terpisah, pada direktori ini. Namun saya jarang melakukannya.

4. 📁 **init.d/** \
  Direktori ini berisi pecahan konfigurasi yang sebagian besar ada di vimrc.

5. 📁 **plugin/** \
  Direktori ini berisi plugin. Biasanya plugin yang ingin saya modifikasi sendiri karena kebutuhan.

6. 📁 **plugin-config/** \
  Direktori yang berisi konfigurasi dari masing-masing plugin.

6. 📁 **syntax/** \
  Direktori ini saya gunakan untuk menambahkan file sintaks tanpa perlu menggunakan plugin.

7. 📁 **vendor/** \
  Direktori ini saya gunakan untuk menyimpan file-file dari plugin yang tidak terkait langsung dengan plugin, seperti file stylesheet, dll.


## Penerapan

Nah, dari struktur direktori di atas, saya tinggal memecah-mecah isi dari konfigurasi-konfigurasi yang ada di dalam vimrc saya, yang kira-kira berisi 1500an baris. Hehehe =P

Kemudian saya akan mapping dan distribusikan seperti ini.

```
📂 ~/.config/nvim/
├── 📂 autoload/
│   ├── 📂 lightline/
│   │   └── 📂 colorscheme/
│   │       ├── 📄 codedark.vim
│   │       └── 📄 dwm.vim
│   ├── 📄 buffer.vim
│   ├── 📄 nrrwrgn.vim
│   └── 📄 lightline.vim
├── 📂 colors/
│   ├── 📄 codedark.vim
│   └── 📄 Tomorrow-Night-Bandit.vim
├── 📁 doc/
├── 📂 init.d/
│   ├── 📄 filetype.vim
│   ├── 📄 formating.vim
│   ├── 📄 keybinding.vim
│   ├── 📄 plugin.vim
│   └── 📄 settings.vim
├── 📂 plugin-config/
│   ├── 📄 config-coc-snippets.vim
│   ├── 📄 config-coc.vim
│   ├── 📄 config-emmet-vim.vim
│   ├── 📄 config-fzf.vim
│   ├── 📄 config-indentline.vim
│   ├── 📄 config-lightline-bufferline.vim
│   ├── 📄 config-lightline.vim
│   ├── 📄 config-nerdtree.vim
│   ├── 📄 config-pylint.vim
│   ├── 📄 config-python-mode.vim
│   ├── 📄 config-vim-commentary.vim
│   └── 📄 config-vim-devicons.vim
├── 📂 plugin/
│   ├── 📄 autoscroll.vim
│   ├── 📄 checkbox.vim
│   ├── 📄 ranger.vim
│   └── 📄 taglist.vim
├── 📂 syntax/
│   ├── 📄 coffee.vim
│   ├── 📄 eruby.vim
│   ├── 📄 litcoffee.vim
│   ├── 📄 pgsql.vim
│   └── 📄 sh.vim
├── 📂 vendor/
│   └── 📄 markdown.css
├── 📄 coc-settings.json
├── 📄 init.vim
└── 📄 README.md
```

Isi yang ada di dalam file-file di dalam struktur direktori di atas bebas saja.

Yang paling penting adalah proses sourcing di dalam file **init.vim**.

```viml
!filename: $HOME/.config/nvim/init.vim
runtime  init.d/settings.vim
runtime  init.d/formating.vim
runtime  init.d/filetype.vim
runtime  init.d/keybinding.vim
runtime  init.d/plugin.vim
runtime! plugin-config/*.vim
```

Hanya perlu melakukan sourcing pada file **.vim** yang ada pada direktori **init.d/** dan file-file configurasi plugin yang ada di dalam direktori **plugin-config/**.

> PERHATIAN!
> 
> Saya **tidak** lagi menempatkan file konfigurasi plugin di dalam direktori **plugin/config/**, karena akan **menyebabkan kegagalan** apabila dilakukan pengujian dengan menggunakan script profiler `vim-plugins-profile` (untuk mengetahui berapa lama plugin di load saat startup).
> 
> Maka dari itu, saat ini, konfigurasi dari plugin saya letakkan di root direktori **plugin-config/**.

Selesai!

Untuk contoh lebih detail dan lebih lengkap, mungkin dapat melihat langsung pada konfigurasi yang saya simpan di GitHub, [di sini](https://github.com/bandithijo/nvimrc).

> INFO
> 
> Saya tidak lagi menggunakan file `~/.vimrc`. Karena konfigurasi modular di atas, tidak memerlukan vimrc.


## Pesan Penulis

Sepertinya segini saja yang dapat saya catat.

Mungkin lain waktu akan ada perbaikan dan pembaharuan.

Silahkan merujuk dan membaca-baca sumber referensi yang saya sertakan di bawah.

Mudah-mudahan dapat bermanfaat buat teman-teman.

Terima kasih.

(^_^)


## Referensi

1. [gist.github.com/mnabila/112d8770475bb3cb6ce59b076fb1d123](https://gist.github.com/mnabila/112d8770475bb3cb6ce59b076fb1d123) \
   Diakses tanggal: 2020-06-01

1. [www.sthu.org/code/codesnippets/vimconf.html](https://www.sthu.org/code/codesnippets/vimconf.html) \
   Diakses tanggal: 2020-06-01
