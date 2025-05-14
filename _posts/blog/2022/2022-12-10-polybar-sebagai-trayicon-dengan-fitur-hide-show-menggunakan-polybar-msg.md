---
layout: 'post'
title: "Polybar sebagai Trayicon dengan Fitur Hide/Show Menggunakan polybar-msg"
date: 2022-12-10 19:52
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Tips', 'Ulasan']
pin:
hot:
contributors: []
description: "Tidak dipungkiri, beberapa aplikasi masih memerlukan trayicon. Bahkan ada beberapa aplikasi yang tidak dapat berjalan apabila tidak terdapat tempat untuk meletakkan trayicon. Untuk beberapa Window Manager yang tidak memiliki Bar yang menyediakan trayicon, kita dapat memanfaatkan Polybar sebagai tempat menyimpan trayicon."
---

# Pendahuluan

{{ page.description }}

# Latar Belakang Masalah

Saya sudah pernah menggunakan metode konvensional untuk melakukan hide/show pada Polybar sebagai trayicon di artikel ini, [**Polybar, Bar yang Mudah Dikonfig, Praktis, dan Mudah Dikustomisasi**](/blog/polybar-mudah-dikonfig-dan-praktis#showhide-bar-untuk-trayicon-konvensional){:target="_blank"}

Terdapat banyak sekali kelemahan dari menggunakan pendekatan tersebut.

Namun, yang paling mengganggu saya adalah: Fungsi aplikasi yang sangat tergantung dengan trayicon, tidak berjalan dengan semestinya.

Contohnya seperti **nm-applet** yang apabila tidak disimpan di trayicon dan hanya berjalan sebagai background process, tidak akan memberikan notifikasi status network.

# Pemecahan Masalah

Maka dari itu, saya lebih merekomendasikan untuk menggunakan pendekatan menggunakan IPC.

Cara ini memanfaatkan IPC (*Interprocess Communication*) agar kita dapat mengirimkan message process ke Polybar dengan menggunakan perintah `polybar-msg` pada segment bar yang menggunakan attribute `enable-ipc = true`.

# Langkah-langkah

## 1. Tambahkan attribute enable-ipc = true

Pada segment atau section bar yang dijadikan sebagai trayicon, tambahkan attribute `enable-ipc = true`.

Contoh seperti yang saya pergunakan,

{% highlight_caption ~/.config/polybar/config %}
{% highlight dosini linenos %}
[colors]
foreground = ${xrdb:foreground:}
background = #001E1E1E

[bar/traydwm]
monitor = ${env:MONITOR:eDP1}
fixed-center = false
width = 1%
height = 24
offset-x = 1
offset-y = 1
bottom = yes

foreground = ${colors.foreground}
background = ${colors.background}

line-size = 1
line-color = #dfdfdf

border-size = 1

padding-left = 0
padding-right = 0

module-margin-left = 0
module-margin-right = 0

font-0 = JetBrainsMono Nerd Font Bandit:size=9;2

tray-padding = 0
tray-position = left
tray-maxsize = 16
tray-scale = 1.0
tray-foreground = ${colors.foreground}
tray-background = ${colors.background}
tray-detached = true
tray-offset-x = 9
tray-offset-y = -9

override-redirect = true

enable-ipc = true

cursor-click = pointer
cursor-scroll = ns-resize

modules-left = sp1
modules-center =
modules-right =

[module/sp1]
type = custom/text
content = " "
content-foreground = ${colors.foreground}
content-background = ${colors.background}

[settings]
throttle-output = 5
throttle-output-for = 10
screenchange-reload = true
compositing-background = source
compositing-foreground = over
compositing-overline = over
compositing-underline = over
compositing-border = over
pseudo-transparent = true

[global/wm]
margin-top = 0
margin-bottom = 0

; vim:ft=dosini
{% endhighlight %}

Perhatikan pada baris ke-42, saya menggunakan attribute `enable-ipc = true` pada section bar yang saya gunakan sebagai trayicon dengan nama section `[bar/traydwm]`.

Sip, untuk langkah di Polybar config hanya seperti ini saja.

## 2. Mengirimkan signal hide & show dengan polybar-msg

Setelah memasang attribute `enable-ipc = true` pada bar yang kita ingin dapat melakukan hide & show, selanjutnya cara memanggil dan menyembunyikannya dengan menggunakan command `polybar-msg`.

Coba dulu jalankan di Terminal emulator,

**Untuk menampilkan bar**
{% shell_user %}
polybar-msg cmd show
{% endshell_user %}

```
Successfully wrote command 'show' to PID 229212
```

**Untuk menyembunyikan bar**
{% shell_user %}
polybar-msg cmd hide
{% endshell_user %}

```
Successfully wrote command 'hide' to PID 229212
```

Perhatikan output yang ditampilkan, terdapat keterangan `PID 229212` yang menunjukkan bahwa PID tersebut milik Polybar.

Cara mengeceknya tinggal gunakan command `pidof`.

{% shell_user %}
pidof polybar
{% endshell_user %}

```
229212
```

Nah, kalau sudah berhasil menggunakan command `polybar-msg` untuk hide & show di Terminal, tinggal mengaplikasikannya pada applikasi hotkey yang kalian gunakan. Saya menggunakan **sxhkd**.

{% highlight_caption ~/.config/sxhkd/sxhkdrc %}
{% highlight conf linenos %}
# polybar tray
super + shift + ~b
    polybar-msg cmd {show, hide}
{% endhighlight %}

# Demonstrasi

![gambar_1]({{ site.lazyload.logo_blank }}){:data-echo="https://i.postimg.cc/prp0W01t/gambar-01.gif" onerror="imgError(this);"}{:class="myImg"}
<p class="img-caption">Gambar 1 - Notifikasi dari nm-applet masih dapat keluar meskipun Polybar dalam keadaan hidden</p>

![gambar_2]({{ site.lazyload.logo_blank }}){:data-echo="https://i.postimg.cc/cLQFLtT6/gambar-02.gif" onerror="imgError(this);"}{:class="myImg"}
<p class="img-caption" markdown=1>Gambar 2 - Hide & Show Polybar dengan hotkey yang telah dideklarasikan dengan `polybar-msg`</p>


# Pesan Penulis

Penggunaan lebih lanjut saya serahkan pada imajinasi dan kreatifitas teman-teman.

Mungkin teman-teman bisa membaca-baca manual dari `man polybar-msg` dan membantu dalam solusi kreatifitas teman-teman.

Terima kasih sudah mampir yaa.


# Referensi

1. [https://www.reddit.com/r/Polybar/comments/ak246w/polybar_hide_show_on_key_press_release_bspwmsxhkd/](https://www.reddit.com/r/Polybar/comments/ak246w/polybar_hide_show_on_key_press_release_bspwmsxhkd/){:target="_blank"}
<br>Diakses tanggal: 2022/12/10

1. [https://github.com/polybar/polybar/wiki#launching-the-bar-in-your-wms-bootstrap-routine](https://github.com/polybar/polybar/wiki#launching-the-bar-in-your-wms-bootstrap-routine){:target="_blank"}
<br>Diakses tanggal: 2022/12/10
