---
layout: "post"
title: "Menonaktifkan URL Escaping di ZSH (Oh-My-ZSH)"
date: "2020-10-25 00:20"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2020/2020-10-25-menonaktifkan-url-escaping-zsh"
author: "BanditHijo"
category: "blog"
tags: ["zsh", "shell"]
description: "Backslash yang tersisipi apabila kita mempaste URL di Terminal dengan Z Shell, cukup mengganggu. Catatan kali ini mungkin dapat dijadikan solusi untuk mengatasi hal tersebut."
---

## Latar Belakang Masalah

Apa sih maksudnya "URL escaping"?

Ketika saya mengcopy sebuah URL dari YouTube dan mempaste di Terminal saya.

Bentuk dari URL berubah seperti ini:

```
https://www.youtube.com/watch\?v\=Q5eDxR7bU2k
```

Perhatikan, terdapat tanda `\` (backslash) pada sebelum karakter `?` dan `=`.

Sebenarnya ini adalah fitur dari oh-my-zsh, apabila kita melakukan copy paste terhadap nama atau path dari sebuah file ke Terminal yang menggunakan oh-my-zsh agar path dapat dikenali sebagai path dan tidak terjadi error.

Namun sebaliknya, pada kondisi seperti kasus saya di atas, saya tidak menginginkan URL path yang saya miliki diberikan "escape character".


## Pemecahan Masalah

Kalau di Oh-My-ZSH function ini dikenal dengan nama **url-quote-magic**.

Menurut beberapa GitHub issue yang sudah di closed, saya mendapati beberapa solusi seperti ini.


### 1. Enable DISABLE_MAGIC_FUNCTIONS

Tambahkan pada file `~/.zshrc`.

```bash
!filename: $HOME/.zshrc
# ~/.zshrc

...
...

DISABLE_MAGIC_FUNCTIONS = true
```

Simpan, dan source kembali.

```
$ source $ZSH/oh-my-zsh.sh
$ exec $SHELL
```

Namun, saya tidak berhasil dengan cara ini.


### 2. Commenting url-quote-magic function on lib

Biar cepat, saya melakukan cara yang tidak elegant.

Saya mencari library yang berisi url-quote-magic function.

Ternyata berlokasi di:

```
$HOME/.oh-my-zsh/lib/misc.zsh
```

Namun, untuk teman-teman yang menggunakan plugin seperti saya (ZGEN), maka lokasinya akan tergantung dari plugin tersebut.

```
$HOME/.zgen/robbyrussell/oh-my-zsh-master/lib/misc.zsh
```

Kemudian, buka dan commenting blok kode yang berkaitan dengan url-quote-magic.

```bash
!filename: ~/.zgen/robbyrussell/oh-my-zsh-master/lib/misc.zsh
autoload -Uz is-at-least

# *-magic is known buggy in some versions; disable if so
# if [[ $DISABLE_MAGIC_FUNCTIONS != true ]]; then
#   for d in $fpath; do
#     if [[ -e "$d/url-quote-magic" ]]; then
#       if is-at-least 5.1; then
#         autoload -Uz bracketed-paste-magic
#         zle -N bracketed-paste bracketed-paste-magic
#       fi
#       autoload -Uz url-quote-magic
#       zle -N self-insert url-quote-magic
#     break
#     fi
#   done
# fi

## jobs
setopt long_list_jobs

env_default 'PAGER' 'less'
env_default 'LESS' '-R'

## super user alias
alias _='sudo '

## more intelligent acking for ubuntu users
if (( $+commands[ack-grep] )); then
  alias afind='ack-grep -il'
else
  alias afind='ack -il'
fi

# recognize comments
setopt interactivecomments
```

Perhatikan pada baris ke 4-16, adalah baris yang saya commenting.

Sip, kalau sudah bisa reload lagi $SHELL.

```
$ source $ZSH/oh-my-zsh.sh
$ exec $SHELL
```

Kalau berhasil, seharusnya saat kita mempaste URL di Terminal, sudah tidak lagi diberikan escape character.

```
https://www.youtube.com/watch?v=Q5eDxR7bU2k
```


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


## Referensi

1. [github.com/ohmyzsh/ohmyzsh/issues/7632 - Disable url escaping in quotes strings](https://github.com/ohmyzsh/ohmyzsh/issues/7632) \
   Diakses tanggal: 2020-10-25
