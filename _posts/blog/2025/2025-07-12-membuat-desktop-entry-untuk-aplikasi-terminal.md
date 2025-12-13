---
layout: "post"
title: "Membuat Desktop Entry untuk Aplikasi Terminal (TUI)"
date: "2025-07-12 11:48"
permalink: "/blog/:title"
assets: "/assets/images/posts/2025/2025-07-12-membuat-desktop-entry-untuk-aplikasi-terminal"
author: "BanditHijo"
category: "blog"
tags: ["tui", "desktop entry"]
description: "Hampir semua app TUI (Terminal User Interface) ketika dipasang, belum memiliki desktop entry atau application shortcut agar dapat dipanggil dari application launcher. Berikut ini cara saya membuatnya."
---

## Pendahuluan

{{ page.description }}


## Problem

Karena tidak terbaca atau terdaftar di Application Launcher, saya harus membuka terminal emulator terlebih dahulu untuk memanggil applikasi TUI tersebut. Tidak praktis.


## Solusi

Saya perlu mendaftarkan aplikasi TUI tersebut dengan cara membuat desktop entry file agar dikenali oleh application launcher.


### Lokasi Desktop Entry

Lokasi dari Desktop Entry disimpan secara umum terdapat di dua tempat.

1. Global (all user) \
   Berada di `/usr/share/applications/` direktori.
1. Local (per user) \
   Berada di `$HOME/.local/share/applications/` direktori. Kalau belum ada, bisa dibuat dulu.

Di dalam direktori ini, kita dapat melihat file desktop entry yang tersedia. Biasanya desktop entry file sudah tersedia ketika aplikasi di pasang. Namun, umumnya untuk aplikasi berbasis GUI. Aplikasi TUI hampir sangat jarang menyertakan file desktop entry. Maka dari itu, saya sering membuat sendiri file desktop entry untuk aplikasi TUI yang saya gunakan, dan saya simpan di local.


### File Desktop Entry

Ciri dari desktop entry file adalah memiliki ekstension `.desktop`.

Contoh isi dari desktop entry file dari `htop.desktop`.

```bash
!filename: /usr/share/applications/htop.desktop
[Desktop Entry]
Type=Application
Version=1.0
Name=Htop
GenericName=Process Viewer
Comment=Show System Processes
Icon=htop
Exec=htop
Terminal=true
Categories=System;Monitor;ConsoleOnly;
Keywords=system;process;task
```

Berdasarkan referensi dari website freedesktop.org > desktop-entry-spec > recognized-keys, terdapat key wajib yang minimal harus ada. Seperti `Type` dan `Name`. Namun, untuk dapat memanggil aplikasi harus juga memiliki key `Exec` (executable). Value dari key `Exec` inilah yang akan digunakan untuk memanggil aplikasi.


### Modifikasi File Desktop Entry

Terkadang saya ingin memodifikasi isinya sesuai dengan preferensi saya. Jangan langsung memodifikasi dekstop entry file yang ada di global. Lebih baik di copy ke local.

Tujuannya agar modifikasi yang dilakukan tidak kembali seperti semula apabila aplikasi tersebut mendapat pembaharuan ketika update.

Buat dulu direktori `$HOME/.local/share/applications/` kalau belum ada.

```
$ mkdir -p ~/.local/share/applications/
```

Kemudian copy file `htop.desktop` yang ada di global ke local.

```
$ cp /usr/share/applications/htop.desktop ~/.local/share/applications/
```


### Contoh Exec untuk Aplikasi TUI

Sejauh pengalaman saya menggunakan Linux, saya menggunakan 2 jenis pendekatan untuk memanggil aplikasi TUI menggunakan desktop entry.

1. Direct executable
1. Indirect executable

Perbedaan dari keduanya terletak pada key `Terminal`.


### Direct Executable

Pada pendekatan diret executable, artinya kita menggunakan terminal emulator default yang kita define pada Desktop Environment atau Window Manager dengan configurasi default. Seperti window geometri dari terminal emulatornya.

```bash
Exec=htop
Terminal=true
```

Dengan begini, `htop` akan dipanggil menggunakan default terminal emulator dengan geometri default dari terminal emulatornya.


### Indirect Executable

Pada pendekatan indirect executable, artinya kita dapat menggunakan terminal emulator sesuai yang kita inginkan yang kita panggil dari `Exec` key dan tidak menggunakan terminal emulator default. Dengan begini, kita dapat menggunakan parameter yang disediakan oleh terminal emulator tersebut termasuk window geometri dari aplikasi terminal yang kita panggil.

```bash
Exec=st -t "htop" -g 100x10 -e sh -c 'htop'
Terminal=false
```

Dengan begini, `htop` akan dipanggil menggunakan **st** (Simple Terminal) termial emulator dengan ukuran window 100x10 dengan nama window "htop".

Penjelasan parameter pada **st** terminal yang saya gunakan.

`-e` adalah parameter untuk executable. Pada terminal emulator lain mungkin bisa `-x`.

`-t` adalah parameter untuk mengatur window title.

`-g` adalah parameter untuk mengatur geometri dari window terminal.

Setiap terminal emulator memiliki parameter yang berbeda-beda.


### Contoh Desktop Entry untuk Beberapa Aplikasi TUI

Berikut ini adalah beberapa desktop entry file yang saya buat untuk memanggil aplikasi TUI yang saya gunakan.


#### Neomutt - email client

```bash
!filename: $HOME/.local/share/applications/neomutt.desktop
[Desktop Entry]
Type=Application
Exec=neomutt
Icon=utilities-terminal
Terminal=true
Categories=System;TerminalEmulator;
Name=Neomutt
GenericName=Email Client
Comment=A version of mutt with added features
```


#### Newsboat - RSS feed reader

```bash
!filename: $HOME/.local/share/applications/newsboat.desktop
[Desktop Entry]
Type=Application
Exec=newsboat
Icon=utilities-terminal
Terminal=true
Categories=System;TerminalEmulator;
Name=Newsboat
GenericName=RSS Reader
Comment=RSS/Atom feed reader for text terminals
```


### Irssi - IRC client

```bash
!filename: $HOME/.local/share/applications/irssi.desktop
[Desktop Entry]
Type=Application
Exec=irssi
Icon=utilities-terminal
Terminal=true
Categories=System;TerminalEmulator;
Name=Irssi
GenericName=IRC client
Comment=Modular text mode IRC client with Perl scripting
```


### St - Simple terminal

```bash
!filename: $HOME/.local/share/applications/st.desktop
[Desktop Entry]
Type=Application
Exec=st
TryExec=st
Icon=utilities-terminal
Terminal=false
Categories=System;TerminalEmulator;
Name=st
GenericName=Terminal
Comment=st is a simple terminal implementation for X
StartupWMClass=st-256color
```


### Nvim - Neovim text editor

```bash
!filename: $HOME/.local/share/applications/nvim.desktop
[Desktop Entry]
Name=Neovim
GenericName=Text Editor
Comment=Edit text files
TryExec=nvim
Exec=nvim %F
Terminal=true
Type=Application
Keywords=Text;editor;
Icon=nvim
Categories=Utility;TextEditor;
StartupNotify=false
MimeType=text/english;text/plain;text/x-makefile;text/x-c++hdr;text/x-c++src;text/x-chdr;text/x-csrc;text/x-java;text/x-moc;text/x-pascal;text/x-tcl;text/x-tex;application/x-shellscript;text/x-c;text/x-c++;
```


### Pulsemixer - PulseAudio mixer

```bash
!filenme: $HOME/.local/share/applications/pulsemixer.desktop
[Desktop Entry]
Type=Application
Name=pulsemixer
GenericName=pulsemixer
Comment=CLI and curses mixer for pulseaudio
Icon=utilities-terminal
Exec=st -t "pulsemixer" -g 100x20 -e sh -c "pulsemixer"
Terminal=false
```


### Ncpamixer - Ncurse PulseAudio mixer

```bash
!filename: $HOME/.local/share/applications/ncpamixer.desktop
[Desktop Entry]
Type=Application
Name=ncpamixer
GenericName=ncurses PulseAudio Mixer
Comment=ncurses PulseAudio Mixer
Icon=utilities-terminal
Exec=st -t "ncpamixer" -g 70x30 -e sh -c 'ncpamixer'
Terminal=false
```


### Ranger - Terminal File Manager

```bash
!filename: $HOME/.local/share/applications/ranger.desktop
[Desktop Entry]
Type=Application
Name=ranger
GenericName=Terminal File Manager
Comment=Launches the ranger file manager
Icon=utilities-terminal
Terminal=true
Exec=ranger
Categories=ConsoleOnly;System;FileTools;FileManager
MimeType=inode/directory;
Keywords=File;Manager;Browser;Explorer;Launcher;Vi;Vim;Python
```


### XProp - Property display for X

```bash
[Desktop Entry]
Type=Application
Exec=st -t "xprop" -e sh -c 'xprop; exec $SHELL'
Icon=utilities-terminal
Terminal=false
Categories=System;TerminalEmulator;
Name=xprop
GenericName=xorg-xprop
Comment=Property displayer for X
```


## Referensi

1. [freedesktop.org - Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/latest/) \
   Diakses tanggal: 2025-07-12

1. [freedesktop.org - Desktop Entry Specification - recognized-keys](https://specifications.freedesktop.org/desktop-entry-spec/latest/recognized-keys.html) \
   Diakses tanggal: 2025-07-12

1. [Arch Linux Wiki - Desktop entries](https://wiki.archlinux.org/title/Desktop_entries) \
   Diakses tanggal: 2025-07-12
