---
layout: 'post'
title: "Catatan Daftar Terminal Tools"
date: '2021-05-04 04:17'
permalink: '/note/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'note'
tags: ['TUI']
wip: true
pin:
contributors: []
description: "Catatan ini merupakan kumpulan dari daftar nama-nama CLI dan TUI tools yang dapat memudahkan pekerjaan kita sehari-hari."
---

# Prakata

Seperti yang teman-teman ketahui, sebenarnya ada banyak sekali nama-nama CLI dan TUI tools yang dapat kita gunakan untuk mempermudah pekerjaan kita sehari-hari, tidak hanya dalam hal monitoring.

Yang sangat terkenal dan sangat serig kita lihat dipajang di setiap desktop-desktop yang melakukan "show-off" adalah **htop**, **neofetch**, **ranger**, **pipes**, **cmatrix**, dan masih banyak lagi. Nama-nama tersebut, baru sebagian kecil saja.

Catatan ini hadir, dari penulis untuk teman-teman, sebagai catatan untuk mengingatkan penulis akan nama-nama tools-tools tersebut. Karena, apabila tidak sering digunakan, mesti akan terlupakan, dan ketika diperlukan, perlu waktu untuk mengingatnya kembali.


# System Monitor


## htop

![gambar-htop](https://i.postimg.cc/bwj3RHrR/gambar-htop.png)

An interactive process viewer

htop is a cross-platform interactive process viewer.

htop allows scrolling the list of processes vertically and horizontally to see their full command lines and related information like memory and CPU consumption.

The information displayed is configurable through a graphical setup and can be sorted and filtered interactively.

Tasks related to processes (e.g. killing and renicing) can be done without entering their PIDs.

[https://github.com/htop-dev/htop](https://github.com/htop-dev/htop)


## gotop

![gambar-gotop](https://i.postimg.cc/15gDNgKr/gambar-gotop.png)

Another terminal based graphical activity monitor, inspired by gtop and vtop, this time written in Go!

[https://github.com/xxxserxxx/gotop](https://github.com/xxxserxxx/gotop)


## gtop

![gambar-gtop](https://i.postimg.cc/Wbr6HFJb/gambar-gtop.png)

System monitoring dashboard for terminal.

[https://github.com/aksakalli/gtop](https://github.com/aksakalli/gtop)


## vtop

![gambar-vtop](https://i.postimg.cc/yYzSWfks/gambar-vtop.png)

Wow such top. So stats. More better than regular top.

A graphical activity monitor for the command line.

[https://github.com/MrRio/vtop](https://github.com/MrRio/vtop)


## ytop

![gambar-ytop](https://i.postimg.cc/W4J2GvHK/gambar-ytop.png)

A TUI system monitor written in Rust.

[https://github.com/cjbassi/ytop](https://github.com/cjbassi/ytop)

NO LONGER MAINTAINED. For a similar program, check out.<br>
[https://github.com/ClementTsang/bottom](https://github.com/ClementTsang/bottom)


## bottom (btm)

![gambar-bottom](https://i.postimg.cc/59mfqpsx/gambar-bottom.png)

Yet another cross-platform graphical process/system monitor.

A cross-platform graphical process/system monitor with a customizable interface and a multitude of features. Supports Linux, macOS, and Windows. Inspired by both gtop and gotop.

[https://github.com/ClementTsang/bottom](https://github.com/ClementTsang/bottom)


## bashtop

![gambar-bashtop](https://i.postimg.cc/pL3vXSLB/gambar-bashtop.png)

Linux/OSX/FreeBSD resource monitor.

Notice, python version released! ([bpytop](https://github.com/aristocratos/bpytop)) Please get this instead.

[https://github.com/aristocratos/bashtop](https://github.com/aristocratos/bashtop)


## bpytop

![gambar-bpytop](https://i.postimg.cc/nzZ6Xfbq/gambar-bpytop.png)

Linux/OSX/FreeBSD resource monitor.

Resource monitor that shows usage and stats for processor, memory, disks, network and processes.

Python port and continuation of bashtop.

[https://github.com/aristocratos/bpytop](https://github.com/aristocratos/bpytop)


## glances

{% image https://i.postimg.cc/yxp5pJJT/gambar-glances.png | gambar-galnces %}

Glances an Eye on your system. A top/htop alternative for GNU/Linux, BSD, Mac OS and Windows operating systems.

Glances is a cross-platform monitoring tool which aims to present a large amount of monitoring information through a curses or Web based interface. The information dynamically adapts depending on the size of the user interface.

[https://github.com/nicolargo/glances](https://github.com/nicolargo/glances)


## nmon

![gambar-nmon-01](https://i.postimg.cc/cJWDm79S/gambar-nmon-01.png)

![gambar-nmon-02](https://i.postimg.cc/FKxTnf8J/gambar-nmon-02.png)

nmon is short for Nigel's performance Monitor for Linux on POWER, x86, x86_64, Mainframe & now ARM (Raspberry Pi).

This systems administrator, tuner, benchmark tool gives you a huge amount of important performance information in one go. It can output the data in two ways:

1. **On screen** (console, telnet, VNC, putty or X Windows) using curses for low CPU impact which is updated once every two seconds.

2. **Save the data to a comma separated file** for analysis and longer term data capture.

[http://nmon.sourceforge.net/pmwiki.php](http://nmon.sourceforge.net/pmwiki.php)


# Disk Monitor


## vizex

![gambar-vizex](https://i.postimg.cc/1zDSjKr5/gambar-vizex.png)

Visualize disk space and disk usage in your UNIX\Linux terminal

vizex is the terminal program for the UNIX/Linux systems which helps the user to visualize the disk space usage for every partition and media on the user's machine. vizex is highly customizable and can fit any user's taste and preferences.

[https://github.com/bexxmodd/vizex](https://github.com/bexxmodd/vizex)


# Network Monitor


## iftop

![gambar-iftop](https://i.postimg.cc/rmPrFhT1/gambar-iftop.png)

Display bandwidth usage on an interface.

iftop does for network usage what top(1) does for CPU usage. It listens to network traffic on a named interface and displays a table of current bandwidth usage by pairs of hosts. Handy for answering the question "why is our ADSL link so slow?".

[http://www.ex-parrot.com/pdw/iftop/](http://www.ex-parrot.com/pdw/iftop/)

[https://code.blinkace.com/pdw/iftop](https://code.blinkace.com/pdw/iftop)


## nethogs

![gambar-htop](https://i.postimg.cc/L6Pxf09X/gambar-nethogs.png)

Net top tool grouping bandwidth per process.

NetHogs is a small 'net top' tool. Instead of breaking the traffic down per protocol or per subnet, like most tools do, it groups bandwidth by process.

[https://github.com/raboof/nethogs](https://github.com/raboof/nethogs)

> INFO
> 
> Untuk "unknown TCP" dapat dibaca di sini.
> 
> The "Nethogs" package will always show a fake process called "unknown TCP", that corresponds to everything it can't identify. Notice that it doesn't have a process ID, and the amount of data is shown as 0, indicating that there isn't any unknown traffic.
> 
> Here's the line from the nethogs source code where that line gets initialised:
> 
> ```
> unknowntcp = new Process (0, "", "unknown TCP");
> ```
> 
> ([Source code download ](http://archive.ubuntu.com/ubuntu/pool/universe/n/nethogs/nethogs_0.8.0-1.debian.tar.gz), look in process.cpp)


## gping

![gambar-gping](https://i.postimg.cc/85sHCZXT/gambar-gping.png)

Ping, but with a graph.

[https://github.com/orf/gping](https://github.com/orf/gping)


## prettyping

![gambar-prettyping](https://i.postimg.cc/rwqVqFR3/gambar-prettyping.png)

prettyping is a wrapper around the standard ping tool with the objective of making the output prettier, more colorful, more compact, and easier to read.

[https://github.com/denilsonsa/prettyping](https://github.com/denilsonsa/prettyping)


## wavemon

![gambar-wavemon-01](https://i.postimg.cc/N08h4jQK/gambar-wavemon-01.png)

![gambar-wavemon-02](https://i.postimg.cc/k5P3KbPr/gambar-wavemon-02.png)

![gambar-wavemon-03](https://i.postimg.cc/9Mc6NHfJ/gambar-wavemon-03.png)

wavemon is an ncurses-based monitoring application for wireless network devices on Linux.

wavemon is a wireless device monitoring application that allows you to watch signal and noise levels, packet statistics, device configuration and network parameters of your wireless network hardware. It should work (though with varying features) with all devices supported by the Linux kernel.

[https://github.com/uoaerg/wavemon](https://github.com/uoaerg/wavemon)


# Torrent Client


## tremc

![gambar-tremc-01](https://i.postimg.cc/13xYj1Cw/gambar-tremc-01.png)

![gambar-tremc-02](https://i.postimg.cc/K8nsXpwV/gambar-tremc-02.png)

![gambar-tremc-03](https://i.postimg.cc/rpjns08N/gambar-tremc-03.png)

![gambar-tremc-04](https://i.postimg.cc/Dznp7dKz/gambar-tremc-04.png)

Curses interface for transmission

A console client for the BitTorrent client Transmission.

tremc is the python3 fork of transmission-remote-cli.

[https://github.com/tremc/tremc](https://github.com/tremc/tremc)


# Git Client


## lazygit

![gambar-lazygit](https://i.postimg.cc/prwk4KZR/gambar-lazygit.png)

A simple terminal UI for git commands, written in Go with the gocui library.

[https://github.com/jesseduffield/lazygit](https://github.com/jesseduffield/lazygit)


## tig

![gambar-tig-01](https://i.postimg.cc/ZRg1YBcD/gambar-tig-01.png)

![gambar-tig-02](https://i.postimg.cc/qRgPdX83/gambar-tig-02.png)

Text-mode interface for git

Tig is an ncurses-based text-mode interface for git. It functions mainly as a Git repository browser, but can also assist in staging changes for commit at chunk level and act as a pager for output from various Git commands.

[https://github.com/jonas/tig](https://github.com/jonas/tig)


# Docker Client


## lazydocker


# Font


## fontpreview-ueberzug


# Science


## periodic-table-tui

![gambar-periodic-table](https://i.postimg.cc/5NqptQ9K/gambar-periodic-table-tui.png)

A periodic table for the command line.

[https://github.com/pryme-svg/periodic-table-tui](https://github.com/pryme-svg/periodic-table-tui)


# Messaging


## Weechat (IRC Client)

![gambar-weechat-01](https://i.postimg.cc/J0bw07t3/gambar-weechat-01.png)

![gambar-weechat-02](https://i.postimg.cc/RCfxXdG3/gambar-weechat-02.png)

WeeChat (Wee Enhanced Environment for Chat) is a free chat client, fast and light, designed for many operating systems. It is highly customizable and extensible with scripts.

[https://weechat.org](https://weechat.org)

[https://github.com/weechat/weechat](https://github.com/weechat/weechat)


# Audio Mixer


## ncpamixer

An ncurses mixer for PulseAudio inspired by pavucontrol.

[https://github.com/fulhax/ncpamixer](https://github.com/fulhax/ncpamixer)


## pulsemixer

[https://github.com/GeorgeFilipkin/pulsemixer](https://github.com/GeorgeFilipkin/pulsemixer)


# Audio Player


## cmus


## ncmpcpp


## mpd


# Video Player


## youtube-dl


## youtube-viewer


## ytfzf


# Battery Monitor


## battop


# RSS Reader


## newsboat

![gambar-newsboat](https://i.postimg.cc/ryKZJNGB/gambar-newsboat.png)

Newsboat is an RSS/Atom feed reader for the text console. It's an actively maintained fork of Newsbeuter.

A feed reader pulls updates directly from sites like blogs and news agencies, and lets you review them in a single interface. Many times, the feed includes the full text of the update, so you don't even need to start a web browser! You can learn more about feed readers [on Wikipedia](https://en.wikipedia.org/wiki/News_aggregator).

[https://github.com/newsboat/newsboat](https://github.com/newsboat/newsboat)


# Email Client


## neomutt

![gambar-neomutt](https://i.postimg.cc/vHSQKzC5/gambar-neomutt.png)

Teaching an Old Dog New Tricks

**What is NeoMutt?**

1. NeoMutt is a project of projects.
2. A place to gather all the patches against Mutt.
3. A place for all the developers to gather.

Hopefully this will build the community and reduce duplicated effort.

NeoMutt was created when Richard Russon (@FlatCap) took all the old Mutt patches, sorted through them, fixed them up and documented them.

[https://neomutt.org/](https://neomutt.org/)

[https://github.com/neomutt/neomutt](https://github.com/neomutt/neomutt)


# File Manager


## ranger

![gambar-ranger](https://i.postimg.cc/ryfcdjV7/gambar-ranger.png)

ranger is a console file manager with VI key bindings. It provides a minimalistic and nice curses interface with a view on the directory hierarchy. It ships with rifle, a file launcher that is good at automatically finding out which program to use for what file type.

[https://ranger.github.io/](https://ranger.github.io/)

[https://github.com/ranger/ranger](https://github.com/ranger/ranger)


## lf


## nnn
