---
layout: "post"
title: "Konfigurasi Emacs dengan Org-mode"
date: "2026-08-07 20:01"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["emacs", "orgmode"]
description: "Org-mode adalah salah satu alasan yang sering saya dengar yang membuat vim user pindah menggunakan Emacs. Salah satu kelebihan Org-mode adalah konsep Literate Programming, dimana menulis dokumentasi dan code program dalam satu file yang sama."
---

## Background Story

{{ page.description }}. Seperti yang sudah pernah saya tulis pada artikel sebelumnya, [**10 Tahun Pakai Vim, Akhirnya Migrasi ke Emacs**]({% link _blogs/2026-08-02-10-tahun-pakai-vim-akhirnya-migrasi-ke-emacs.md %}#lagi-lagi-tentang-org-mode).

Saya akan memigrasikan file konfigurasi Emacs yang defaultnya menggunakan format Emacs-lisp `init.el` menjadi format Org-mode.


## Implementation

Org-mode sudah default ada di Emacs sejak versi 22+.

Berikut ini adalah struktur direktori `~/.emacs.d/` saya sebelum dirubah format ke Org-mode.

```
~/.emacs.d/
└── init.el
```

Copy/Cut isi yang ada di dalam file `~/.emacs.d/init.el` dan pindahkan ke `~/.emacs.d/config.org`.

Atau jalankan command di bawah ini.

```
$ cp ~/.emacs.d/init.el ~/.emacs.d/config.org
```

```
~/.emacs.d/
├── init.el
└── config.org
```

Kemudian, buka file `~/.emacs.d/init.el` dan hapus semua konfigurasi sebelumnya, dan isi dengan snippet di bawah ini.

```emacs-lisp
!filename: ~/.emacs.d/init.el
;; -*- lexical-binding: t -*-

(org-babel-load-file
 (expand-file-name
  "config.org"
  user-emacs-directory))
```

Dengan begini, kita sudah mengarahkan file `init.el` ke `config.org`.

Selanjutnya tinggal mengedit file `config.org`. Kita bisa menulisnya seperti menulis dokumentasi kode konfigurasi dengan snippet kode yang berisi konfigurasinya.

```org
!filename: ~/.emacs.d/config.org
#+TITLE: BanditHijo's Emacs Config
#+AUTHOR: Rizqi Nur Assyaufi (@BanditHijo)

* Setup Custom.el File

#+begin_src emacs-lisp :tangle yes
  (setq custom-file (locate-user-emacs-file "custom.el"))
  (load custom-file t)
#+end_src

* Add MELPA Package Channel

#+begin_src emacs-lisp :tangle yes
  (add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
#+end_src

* Theme, Font, Cursor, Custom Color, etc.

** Setup Font Face

#+begin_src emacs-lisp :tangle yes
  (set-face-attribute 'default nil :font "SFMono Nerd Font" :height 140 :weight 'medium :width 'normal :slant 'normal)
#+end_src
```

Dapat dilihat file `config.org` ini saya menulis file config dengan style seperti dokumentasi. Ada header ada blockcode.

Ketika file `config.org` disimpan, Emacs akan melakukan compile dan membuat file `config.el`.

```
~/.emacs.d/
├── init.el
├── config.org
└── config.el
```

Isinya akan seperti ini,

```emacs-lisp
!filename: ~/.emacs.d/config.el
(setq custom-file (locate-user-emacs-file "custom.el"))
(load custom-file t)

(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)

(set-face-attribute 'default nil :font "SFMono Nerd Font" :height 140 :weight 'medium :width 'normal :slant 'normal)
```

File config di atas hanya sample. Untuk melihat full file config ada di sini, [GitHub: bandithijo/emacs.d#config.org](https://github.com/bandithijo/emacs.d/blob/main/config.org).


## Pesan Penulis

Catatan ini hanyalah implementasi sederhana. Tentunya implementasinya tidak terbatas pada contoh yang ada di catatan ini. Tujuan dari catatan ini hanya memberikan *overview* terkait bagaimana menggunakan dan menulis konfigurasi Emacs dengan Org-mode.

I think that's all that I want to write. Thank you!
