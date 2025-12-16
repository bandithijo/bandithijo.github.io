---
layout: "post"
title: "Memanfaatkan Dunst Sebagai PopUp Notifikasi Bantuan Keyboard Shortcut"
date: "2019-02-20 10:45"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2019/2019-02-20-dunst-sebagai-notifikasi-bantuan-pengingat-shortcut"
author: "BanditHijo"
category: "blog"
tags: ["dunst"]
description: "Dunst adalah replacement untuk standalone notification daemon yang ringan. Biasanya digunakan oleh pengguna Window Manager. Catatan kali ini, saya akan memanfaatkan dunst untuk menampilkan daftar keybind keymap."
---

> INFO
> 
> Sudah ada versi yang lebih baru dari topik ini.
> 
> Silahkan mengunjungi alamat di bawah.
> 
> [Memanfaatkan Dunst Sebagai PopUp Notifikasi Bantuan Keyboard Shortcut (ver. 2)](/blog/dunst-sebagai-notifikasi-bantuan-pengingat-shortcut-2)


## Prakata

Sebenarnya agak malu menuliskan dokumentasi kali ini. Karena merasa algoritma pemecahan solusinya terlalu bertele-tele. Hihihi. Tapi ah sudahlah! Namanya juga belajar.

Mungkin sebagian dari teman-teman yang menggunakan *environment* sistem yang mirip seperti saya, pernah mengalami "lupa" terhadap beberapa *keyboard shortcut* yang jarang digunakan.

Hal ini sangat wajar -- setidaknya menurut saya. Karena *environment* kami dalam menggunakan aplikasi mengharuskan untuk menggunakan *keyboard shortcut*.

Sebentar...

Mungkin ada beberapa dari teman-teman yang belum mengerti. *Environment* seperti apa sih itu?

1. **i3 Window Manager**
1. **Tmux**
1. **Vim**
1. **Ranger**
1. **Neomutt**
1. **Newsboat**
1. **MPV**
1. **st Terminal**
1. dst...

Di atas adalah contoh dari beberapa aplikasi yang memiliki konfigurasi *keyboard shortcut* agar dapat digunakan.

Memang tidak semua kita gunakan dan kita perlukan.

Maka dari itu, tujuan tulisan kali ini adalah untuk memecahkan permasalahan **apabila kita mengalami kelupaan dan tidak ingin repot membuka `man` (manual) dari aplikasi tersebut**. Cukup dengan membuat *script* sederhana untuk memanggil "catatan" berisi *keyboard shortcut* yang sudah kita rangkum sebelumnya.

Sangat memudahkan sekali (menurut saya). Hehe.


## Sekenario

Ada banyak sekali *blueprint* yang terpikirkan, namun untuk saat ini, saya menggunakan cara yang akan saya tuliskan ini terlebih dahulu.

Karena daripada menunggu sampai berhasil menerapkan rancangan yang ideal namun tidak sempat menuliskan proses awalnya. Saya memutuskan untuk langsung menuliskan catatan di blog ini.

Sekenarionya secara sederhana akan seperti ini:

1. Membuat Shell *script* yang digunakan untuk menampilkan isi dari sebuah direktori, sekaligus dapat mengeksekusi isi file yang ada di dalamnya apabila dipilih.
1. Membuat Shell *script* yang digunakankan untuk memanggil `dunstify` yang akan menampilkan file text yang berisi daftar *keyboard shortcut*.
1. Membuat file text berisi daftar *keyboard shortcut*.


## Eksekusi


### Membuat Script File Browser

Pada tahap ke-1 ini, saya menyebut ini sebagai **file browser** karena secara global memang menggunakan perintah `ls` yang berarti *list* atau daftar. Namun dengan menambahkan kemampuan untuk eksekusi file yang dipilih.

1. Buat file bernama `help-script-browser.sh`.

   Saya memilih untuk meletakannya pada direktori `~/.config/rofi/`.

   ```
   $ cd ~/.config/rofi
   $ touch help-script-browser.sh
   $ chmod +x help-script-browser.sh
   $ vim help-script-browser.sh
   ```

   Isikan di dalamnya seperti ini.

   ```bash
   #!/bin/env sh

   # direktori target tempat script dunstify berada
   helpDir=~/.config/rofi-help

   # untuk menghandle argument
   if [ -n "$@" ]; then
   helpDir="${helpDir}/$@"
   fi

   # untuk menghandle apabila argument bukan merupakan direktori
   if [ ! -d "${helpDir}" ]; then
       coproc ( "${helpDir}" & > /dev/null  2>&1 )
       exit;
   fi

   # proses direktori target
   helpDir=$(readlink -e "${helpDir}")
   pushd "${helpDir}" >/dev/null

   # tampilkan hanya shell script kecuali file text
   ls --group-directories-first --hide="keybinds-*"
   ```

2. Apabila teman-teman menggunakan **i3wm** dan **Rofi**, tinggal kita buatkan konfigurasi `bindkey` nya saja. Pada konfigurasi i3wm.

   ```
   $ vim ~/.config/i3/config
   ```

   Tambahkan seperti ini, kira-kira.

   ```bash
   # ...
   # ...

   # Keybind Bantuan
   bindsym $mod+F10 exec --no-startup-id rofi -modi "KEYBINDS:~/.config/rofi/help-script-browser.sh" -show KEYBINDS -lines 6 -width 300
   ```

   Dapat dilihat bahwa saya meletakkannya pada <kbd>SUPER</kbd>+<kbd>F10</kbd>.

   Silahkan menyesuaikan dengan preferensi masing-masing.

   Tahap ke-1, telah selesai.


### Membuat Script Dunstify

Pada tahap ke-2, saya akan membuat Shell *script* yang akan berpasangan dengan file text berisi daftar *keyboard shortcut*.

Jadi, pada tahap ini, satu Shell *script* mewakili satu file text.

Misalnya,

| <center>Shell Script</center> | <center>File Text</center> |
| :-- | :-- |
| `i3 Window Manager.sh` | `keybinds-i3.txt` |
| `MPV Video Player.sh` | `keybinds-mpv.txt` |
| `VIM Text Editor.sh` | `keybinds-vim.txt` |
| dst... | dst... |

1. Buat direktori khusus untuk menyimpan Shell *script* ini. Saya akan memilih membuat direktori baru dengan nama `~/.config/rofi-help/`.

   ```
   $ mkdir -p ~/.config/rofi-help
   ```

2. Buat file Shell *script* dari *keyboard shortcut* yang akan kita gunakan.

   Misalkan i3wm. Namun, jangan berikan ekstensi `.sh` agar tampilannya lebih rapi.

   ```
   $ cd ~/.config/rofi-help
   $ touch "I3WM Window Manager"
   $ chmod +x "I3WM Window Manager"
   $ vim "I3 Window Manager"
   ```

   Kemudian isikan seperti ini.

   ```bash
   #!/bin/env sh
   dunstify "i3WM KEYBINDS:" "`tail -n 50 $HOME/.config/rofi-help/keybinds-i3`"
   ```

   Shell *script* di atas, memanggil file text dengan nama `keybinds-i3` yang akan kita buat setelah ini.


### Membuat Daftar Keyboard Shortcut

Pada tahap ke-3, kita perlu membuat file text yang berisi daftar dari *keyboard shortcut*.

Saya akan melanjutkan proses di atas. Yaitu membuat file text untuk daftar *keyboard shortcut* dari i3wm.

1. Masih pada direktori sebelumnya, yaitu di `~/.config/rofi-help/`.

   Buat file text dengan nama yang relevan dengan Shell *script* yang kita buat di atas.

   Dalam konteks ini, kita sedang membuat untuk daftar *keyboard shortcut* dari i3wm.

   ```
   $ touch keybinds-i3
   ```

   **Perhatian!** Saya menggunakan aturan penamaan yang sama pada setiap file text. Yaitu, dengan memberikan awalan `keybinds-`.

   Tujuannya agar saat dipanggil dengan program `help-script-browser.sh`, semua file yang tidak berawalan `keybinds-`, tidak ikut ditampilkan di dalam rofi.

2. Selanjutnya tinggal mengisi daftar dari *keyboard shortcut* dari i3wm yang kita perlukan.

   Sebagai contoh, ini adalah beberapa daftar *keyboard shortcut* i3wm yang saya perlukan.

   ```
   <b>LAUNCHER--------------------------------</b>
   mod+Enter          Terminal
   mod+Shift+End      Sessions Dialog
   mod+Shift+x        Lock Screen
   mod+Shift+q        Kill Window Focus
   mod+Shift+r        Restart i3 Config
   mod+d              Rofi: App Launcher
   mod+Tab            Rofi: Window Switcher
   mod+/              Rofi: Help
   mod+p              Rofi: Clipboard
   mod+Shift+p        Clipboard Cleared
   mod+Print          Screenshot Silently
   mod+Shift+Print    Screenshot GUI
   mod+F7             Arandr
   mod+F8             Wifi ON/OFF [T]
   <b>LAYOUT----------------------------------</b>
   mod+s              Layout: Stacking
   mod+w              Layout: Tabbed
   mod+e              layout: Split [T]
   mod+b              Split Horizontal
   mod+v              Split Vertical
   mod+o              Blank Space
   <b>WINDOW----------------------------------</b>
   mod+f              Fullscreen Window [T]
   mod+r              Resize Window
   mod+Shift+Plus     Sticky Window [T]
   mod+Shift+Minus    Scratchpad Mode [T]
   mod+Minus          Scratchpad Show [T]
   mod+Shift+Space    Floating Window [T]
   mod+Space          Change Focus [T]
   mod+a              Focus Parent
   mod+Shidt+a        Focus Child
   <b>BORDER----------------------------------</b>
   mod+t              Border Normal 1
   mpd+shift+t        Border Normal 0
   mod+y              Border None
   mod+shift+y        Border Pixer 1
   <b>WALLPAPER-------------------------------</b>
   mod+F5             Blogging Mode
   mod+F6             Unixporn Mode
   ```

   Tinggi dari notifikasi ini tidak kurang dari 50 baris dan lebarnya tidak lebih dari 40 karakter.

   Pengaturan lebar dari notifikasi **Dunst** ini akan berbeda setiap dari teman-teman. Bergantung pada konfigurasi lebar notifikasi dunst yang teman-teman pergunakan (pada `dunstrc` bagian `geometry = `).

   Contoh-contoh daftar *keboard shortcut* yang saya pergunakan dapat di lihat pada dotfiles milik saya, [di sini](https://github.com/bandithijo/dotfiles/tree/master/.config/rofi-help).


Silahkan menambahkan menambahkan sendiri untuk membuat daftar *keyboard shortcut* aplikasi yang lain. Dengan mengulang tahap ke-2 dan ke-3.


## Hasilnya

![Gambar 1]({{ page.assets }}/gambar-01.gif)

Gambar 1. Demonstrasi hasil akhir dari semua proses di atas


## Pesan Penulis

Saya menyadari bahwa masih terdapat banyak kekurangan dari metode yang saya gunakan untuk membuat "bantuan pengingat *keyboard shortcut*" ini. Sehingga tidak menutup kemungkinan pada kesempatan berikutnya akan ada metode lain yang saya tulisakan kembali.

Mudah-mudahan catatan saya yang sederhana ini dapat memberikan inspirasi kepada teman-teman untuk membuat metode yang lebih baik.

Saya rasa, seperti ini saja.
