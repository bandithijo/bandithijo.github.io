---
layout: "post"
title: "Pasang Snippet di Emacs dengan Yasnippet"
date: "2026-08-08 21:22"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["emacs", "snippets"]
description: "Snippet mempermudah membuat cetakan potongan kode yang sering digunakan agar dengan mudah dapat dipanggil saat membutuhkannya tanpa harus menulis ulang. Berikut ini pengalaman saya memasang snippets system di Emacs dengan Yasnippet."
---

## Latar Belakang

Snippet mempermudah membuat cetakan potongan kode yang sering digunakan agar dengan mudah dapat dipanggil saat membutuhkannya tanpa harus menulis ulang.

Saya sering memanfaatkan snippet terkhusus untk menulis blog ini. Beberapa aturan penulisan seperti yang ada di halaman [**'Writing Rules'**]({% link _pages/writing_rules.md %}), saya buat agar penulisan sintaks markdown di blog ini dapat tetap konsisten. Untuk itu saya memerlukan snippet agar setiap format penulisan yang sudah saya susun dapat konsisten di setiap artikel yang ditulis.

Berikut ini pengalaman saya memasang snippets system di Emacs dengan Yasnippet.


## Instalasi Package

### Package yasnippet

Package yasnippet adalah package utamanya untuk memasang *snippet engine* di Emacs.

```elisp
(use-package yasnippet
  :ensure t
  :diminish yas-minor-mode
  :config
  (yas-global-mode 1))
```

### Package yasnippet-snippets

Package yasnippet-snippets ini merupakan package tambahan yang berisi *collection of snippets* yang sudah siap untuk digunakan untuk berbagai macam bahasa pemrograman.

```elisp
(use-package yasnippet-snippets
  :ensure t
  :after yasnippet)
```

### Package yasnippet-capf

Package yasnippet-capf untuk auto completion yang digunakan oleh capf (Completion-At-Point Function).

Requirement-nya mengharuskan sudah memasang package `yasnippet` dan `cape` terlebih dahulu.

```elisp
(unless (package-installed-p 'yasnippet-capf)
  (package-vc-install "https://github.com/elken/yasnippet-capf"))

(use-package yasnippet-capf
  :after (yasnippet cape)
  :init
  (add-hook 'yas-minor-mode-hook
		(lambda ()
	  (add-to-list 'completion-at-point-functions #'yasnippet-capf))))
```


## Definisikan Snippets

Cara mendefinisikan snippet di yasnippet sangat mudah.

Buat direktori untuk menampung snippet files di dalam direktori Emacs config bernama `snippets/`.

```
~/.emacs.d/
│ snippets/
│ └ markdown-mode/
│   │ bandithijo-front-matter
│   │ bandithijo-link-referensi
│   └ bandithijo-blockcode
└ init.el
```

Kemudian buat subdirektori sesuai mode nya. Dan snippet files diorganisir di dalam direktori tersebut sesuai dengan modenya. Dalam hal ini `mardown-mode`.

Berikut ini beberapa contoh snippet yang saya gunakan untuk markdown-mode di blog saya.

```snippet
!filename: ~/.emacs.d/snippets/markdown-mode/bandithijo-blockcode
# -*- mode: snippet -*-
# expand-env: ((yas-indent-line 'fixed))
# name: bandithijo:blockcode
# key: bandithijo:blockcode
# --
\`\`\`${1:ruby}
${2:put your code here...}
\`\`\`
$0
```

```snippet
!filename: ~/.emacs.d/snippets/markdown-mode/bandithijo-link-referensi
# -*- mode: snippet -*-
# expand-env: ((yas-indent-line 'fixed))
# name: bandithijo:link-referensi
# key: bandithijo:link-referensi
# --
${1:1}. [${2:label}](${3:url}) \
   Diakses tanggal: ${4:2026-01-01}
$0
```

```snippet
!filename: ~/.emacs.d/snippets/markdown-mode/bandithijo-front-matter
# -*- mode: snippet -*-
# expand-env: ((yas-indent-line 'fixed))
# name: bandithijo:front-matter
# key: bandithijo:front-matter
# --
---
layout: "post"
title: "${1:Put Your Title Here}"
date: "${2:YYYY-MM-DD HH:MM}"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: [$3]
description: "${4:Put your description here.}"
---
$0
```


## Melihat Daftar Snippets

Untuk melihat daftar snippets, sebelumnya harus aktif pada suatu mode tertentu. Atau pada buffer yang sedang menggunakan mode snippet yang ingin dilihat tersebut.

Misal dalam hal ini adalah **markdown-mode**. Maka dari buffer dengan **markdown-mode** tersebut saya menjalankan command, <kbd>M-x</kbd>. Kemudian cari `yas-describe-tables`.

```
M-x yas-describe-tables
```

Nanti akan keluar buffer baru dalam mode **Help** yang menampilkan daftar snippets pada mode yang kita gunakan (dalam hal ini **markdown-mode**).

```
YASnippet tables:

Snippet table `markdown-mode'
----------------------------------------------------------------------------------------------------
group                   state name                                    key             binding
----------------------------------------------------------------------------------------------------
(top level)               (a) bandithijo:blockcode                    bandithijo:b...
                          (a) bandithijo:blockcode-filename           bandithijo:b...
                          (a) bandithijo:front-matter                 bandithijo:f...
                          (a) bandithijo:image                        bandithijo:i...
                          (a) bandithijo:link-referensi               bandithijo:l...
```


## Pesan Penulis

Dengan menggunakan snippet dalam menulis kode atau menulis apapun, kita tidak lagi direpotkan dengan menulis format yang berulang yang merupakan hal yang trivial. Kita tinggal fokus ke apa yang kita tulis, bukan ke format yang mau kita gunakan.

Yeah, that's it! I think that's all that I want to write.

Thank you!


## Referensi

1. [GitHub: joaotavora/yasnippet](https://github.com/joaotavora/yasnippet) \
   Diakses tanggal: 2026-08-09

