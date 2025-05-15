---
layout: 'post'
title: 'Memasang Powerline pada Terminal Arch Linux'
date: 2016-06-15
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Terminal', 'Arch Linux', 'Ulasan']
pin:
hot:
contributors: []
description:
---

<img class="post-body-img" src="{{ site.lazyload.logo_blank_banner }}" data-echo="https://1.bp.blogspot.com/-KF2Kx7Lid-A/V2F0WfmSFnI/AAAAAAAADTs/xQ1Xu0qqI74ckHyXueXOgPD_4VL9lECNACPcB/s1600/Default%2BHeader%2BTemplate%2BPost%2B21.1.png" onerror="imgError(this);" alt="banner">

>Powerline adalah plugin vim yang menyediakan statusline dan prompts dan juga untuk beberapa aplikasi lainnya, termasuk zsh, bash, tmux, IPython, Awesome, i3, dan Qtile.
>
><p style="text-align:left;">– diterjemahkan secara bebas oleh penulis dari <a href="https://github.com/powerline/powerline" target="_blank">https://github.com/powerline/powerline</a></p>

# Pendahuluan
Dalam keseharian saya menggunakan Linux tentunya saya tidak akan pernah bisa lepas menggunakan Terminal. Oleh karena itu saya berusaha untuk membuat aktifitas pada Terminal saya menjadi menarik (bagi saya) dan terlihat menarik (bagi orang lain yang melihat).

Beberapa tahun yang lalu, saya mempelajari _Web Developing_ dan menemukan hal yang menarik dari Terminal yang digunakan oleh Mentor tempat saya belajar. Akhirnya saya tahu kalau beliau menggunakan semacam _plugin_ yang disebut [**Powerline**](https://wiki.archlinux.org/index.php/Powerline){:target="_blank"}.

Yang saya suka dari tampilan Powerline ini adalah model seperti “_Breadcums_” nya itu, hehe yang membuat tampilan Terminal menjadi lebih _simple_ dan mudah dipahami.

Selain dengan Powerline, saya juga memadukannya dengan [**zsh**](https://wiki.archlinux.org/index.php/Zsh){:target="_blank"} shell. Zsh adalah salah satu jenis Shell di Linux selain bash shell. Menurut saya zsh lebih mudah dalam hal pemakaian karena mempunyai fitur _auto completion_ yang lebih baik.

# Info
Terdapat banyak cara untuk dapat memasang Poerline pada Terminal kita. Mulai dari memasang menggunakan _package manager_ dari masing-masing distribusi sistem operasi GNU/Linux, sampai dengan cara yang lebih universal. Namun pada dokumentasi saya hanya akan menuliskan cara yang lebih universal dan bisa diterapkan pada distribusi apa saja.

# Step by Step

## Instalasi Pip dan Git
Pasang paket bernama `python-pip` dan `git`. Pip adalah salah satu _package manager Python_ untuk memasang paket-pake Python secara online. Penggunaannya sangat mudah dan memudahkan.

Buka Terminal dan `copy paste` kode di bawah ini.

{% shell_user %}
sudo pacman -S python-pip git
{% endshell_user %}

Untuk teman-teman yang menggunakan distribusi lain, bisa menyesuaikan dengan _package manager_ sesuai distribusi yang digunakan. Saya rasa nama paketnya tidak terlalu jauh berbeda.

## Unduh Powerline Font dan Powerline Symbols
Setelah itu kita perlu mengunduh **Powerline** dari repositori GitHub sekaligus melakukan instalasi.

{% shell_user %}
su -c 'pip install git+git://github.com/Lokaltog/powerline'
{% endshell_user %}

Unduh juga **Powerline symbols** untuk mendukung Powerline.

{% shell_user %}
wget https://github.com/Lokaltog/powerline/raw/develop/font/PowerlineSymbols.otf https://github.com/Lokaltog/powerline/raw/develop/font/10-powerline-symbols.conf
{% endshell_user %}

Setelah diunduh, kemudian kita pindahkan **Powerline symbols font** ke direktori `/etc/share/fonts` tempat dimana _system fonts_ tersimpan. Dan konfigurasi file konfigurasinya ke dalam direktori `/etc/fonts/conf.d`.

{% shell_user %}
sudo mv PowerlineSymbols.otf /usr/share/fonts/
{% endshell_user %}

{% shell_user %}
sudo mv 10-powerline-symbols.conf /etc/fonts/conf.d/
{% endshell_user %}

Setelah kita pindahkan _file font_ dan _file config_ tersebut, selanjutnya kita melakukan _update font cahce_. Lamanya proses ini tergantung dari banyaknya _font_ yang kalian miliki.

{% shell_user %}
sudo fc-cache -vf
{% endshell_user %}

Langkah selanjutnya adalah menghubungkan Powerline dengan Terminal, bash shell, zsh shell, vim, dan tmux. Kalian tidak harus menggunakan semuanya, cukup gunakan sesuai dengan yang kalian pakai saja.

Tapi sebelum itu...

<br>
**Hal pertama**, terlebih dahulu kalian harus mengetahui Python versi berapa yang terpsang pada distribusi kalian. Apakah Python versi **2.7** atau Python versi **3.6**, atau biasa disebut Python 2 dan Python 3.

Distribusi sistem operasi saya sudah secara _default_ beralih menggunakan Python 3 yang pengembangannya masih aktif dan meninggalkan Python 2 yang sudah _deprecated_.

<br>
**Hal kedua**, yang harus diperhatikan adalah lokasi dimana Python terpasang di dalam sistem. Setiap distribusi mungkin berbeda atau bahkan sama tergantung dari turunan dan filosofi desain dari sistem mereka. Sebagai contoh untuk Arch Linux, Python terdapat pada `/usr/lib/python2.7` (Python 2) dan `/usr/lib/python3.6` (Python 3). Untuk distribusi turunan Debian, seperti Ubuntu, Linux Mint, kalau saya tidak salah ingat berada pada direktori `/usr/local/lib/python2.7` atau `/usr/local/lib/python3.6`.

Lakukan pengecekan dengan,

{% shell_user %}
python -c "import sys; print(sys.path[2])"
{% endshell_user %}

*thx to: [Nanda Vera](https://github.com/yuune){:target="_blank"}

<br>
**Hal ketiga**, adalah setelah di dalam direktori Pyhton tersebut terdapat direktori tempat menyimpan _modul_ atau _library_. Penamaan direktori ini pada masing-masing distribusi bisa jadi berbeda, ada yang menamakan `site-packages`, ada yang menamakan `dist-packages`.

Lakukan pengecekan dengan,

{% shell_user %}
python -c "import sys; print(sys.path[4])"
{% endshell_user %}

*thx to: [Nanda Vera](https://github.com/yuune){:target="_blank"}

<br>
Informasi yang kita dapatkan, akan kita pakai untuk tahap selanjutnya. Sesuaikan _command line_ yang saya contohkan di bawah dengan informasi yang kalian dapatkan dari _script_ di atas.

## BASH Prompt Shell
Tambahkan _script_ di bawah pada file `~/.bashrc`.

{% highlight_caption $HOME/.bashrc %}
{% pre_caption %}

# Powerline on BASH
if [ -f /usr/lib/python3.6/site-packages/powerline/bindings/bash/powerline.sh ]; then
       source /usr/lib/python3.6/site-packages/powerline/bindings/bash/powerline.sh
fi

{% endpre_caption %}

## ZSH Prompt Shell
Tambahkan _script_ di bawah pada `~/.zshrc`.

{% highlight_caption $HOME/.zshrc %}
{% pre_caption %}

# Powerline on ZSH
if [[ -r /usr/lib/python3.6/site-packages/powerline/bindings/zsh/powerline.zsh ]]; then
     source /usr/lib/python3.6/site-packages/powerline/bindings/zsh/powerline.zsh
fi

{% endpre_caption %}

## Vim Statusline
Tambahkan _script_ di bawah pada `~/.vimrc`.

{% highlight_caption $HOME/.vimrc %}
{% pre_caption %}

" Powerline for Vim Statusline
set rtp+=/usr/lib/python3.6/site-packages/powerline/bindings/vim/

" Always show statusline
set laststatus=2

" Use 256 colours (Use this setting only if your terminal supports 256 colours)
set t_Co=256

{% endpre_caption %}

## Tmux Statusline
Tambahkan _script_ di bawah pada `~/.tmux.conf`.

{% highlight_caption $HOME/.tmux.conf %}
{% pre_caption %}

# Powerline for Tmux Statusline
source /usr/lib/python3.6/site-packages/powerline/bindings/tmux/powerline.conf

{% endpre_caption %}


# Kesimpulan
Cara yang saya tuliskan di atas, telah saya gunakan saat saya masih pada masa-masa dimana saya mencari distribusi yang cocok dengan prinsip saya. Fedora, Debian, Manjaro, dan terakhir Arch Linux.

# Referensi

1. [askubuntu.com/questions/283908/how-can-i-install-and-use-powerline-plugin](http://askubuntu.com/questions/283908/how-can-i-install-and-use-powerline-plugin){:target="_blank"}
<br>Diakses tanggal: 12/07/2016
