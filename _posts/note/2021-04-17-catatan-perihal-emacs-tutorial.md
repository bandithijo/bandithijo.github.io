---
layout: 'post'
title: "Catatan dalam Berinteraksi dengan Emacs Tutorial"
date: '2021-04-17 10:24'
permalink: '/note/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'note'
tags: ['Emacs']
wip: true
pin:
contributors: []
description: "Catatan ini merupakan snippets atau cheatsheet atau dapat pula disebut sebagai rangkuman untuk keyboard shortcut yang dijelaskan di dalam Emacs Tutorial."
---

# Prakata

Buat teman-teman yang baru pertama kali mencoba Emacs dan sedang belajar Emacs Tutorial, mudah-mudahan catatan ini dapat membantu untuk mengingat kembali mapping keyboard apa saja / keyboard shortcut apa saja yang telah dijelaskan.

Karena Emacs Tutorial berbentuk narasi, sehingga tidak mudah bagi saya untuk mencari kembali apabila terdapat keyboard shortcut yang sedang saya perlukan. Saya yakin, hal ini karena saya belum terbiasa dengan workflow yang ada di Emacs.

Namun, demikian, saya teteap ingin menuliskan catatan perihal Emacs Tutorial di sini. Mudah-mudahan dapat mempermudah teman-teman apabila mengalami kesulitan yang sama.


# Keyboard Shortcut


## Penyamaan Persepsi

CONTROL atau CTRL atau CTL, diwakilkan sebagai <kbd>C</kbd>.

ALT atau EDIT atau META, diwakilkan sebagai <kbd>M</kbd>.

Bila keduanya berkombinasi dengan key yang lain, maka akan ditampilkan seperti ini:

<kbd>C-x</kbd>, artinya tekan dan tahan CONTROL, lalu tekan x.

<kbd>M-x</kbd>, artinya tekan dan tahan ALT, lalu tekan x.

<kbd>C-x</kbd> <kbd>C-c</kbd>, artinya tekan dan tahan CONTROL, lalu tekan x, masih tekan CONTROL, lalu tekan c.

<kbd>C-x</kbd> <kbd>k</kbd>, artinya tekan dan tahan CONTROL, lalu tekan x, lepas semua tombol sebelumnya, lalu tekan k.

SPACE, akan diwakilkan sebagai <kbd>&lt;SPC&gt;</kbd>.

DELETE, akan diwakilkan sebagai <kbd>&lt;DEL&gt;</kbd>.

RETURN atau ENTER, akan diwakilkan sebagai <kbd>&lt;RET&gt;</kbd>.


## Keluar dari Emacs Tutorial

Dapat pula digunakan sebagai "kill buffer", karena buffer yang sedang terbuka adalah Emacs Tutorial.

<kbd>C-x</kbd> <kbd>k</kbd>

Command ini akan memberikan kita pertanyaan,

Apakah ingin menyimpan posisi cursor di Tutorial? Jawab saja **y**.


## Mengakhiri Emacs Session

<kbd>C-x</kbd> <kbd>C-c</kbd>


## View Next/Previous Screen

**Next screen / Page down**

<kbd>C-v</kbd>

**Previous screen / Page up**

<kbd>M-v</kbd>


## Positioning Cursor on Center/Top/Bottom

Kita dapat melakukan scrolling pada screen tanpa memindahkan cursor berfokus pada baris tertentu.

<kbd>C-l</kbd>

Akan dimulai dari tengah screen, kemudian atas, lalu bawah.


## Basic Cursor Control (Basic Movement)


### Memindahkan cursor per character

```
                      Previous line, C-p
                             :
                             :
Backward, C-b .... Current cursor position .... Forward, C-f
                             :
                             :
                        Next line, C-n
```

**Forward 1 character**

<kbd>C-f</kbd>

**Backward 1 character**

<kbd>C-b</kbd>

**Next 1 line**

<kbd>C-n</kbd>

**Previous 1 line**

<kbd>C-p</kbd>


### Memindahkan cursor perkata

**Forward 1 word**

<kbd>M-f</kbd>

**Backward 1 word**

<kbd>M-b</kbd>


### Memindahkan cursor ke awal baris

<kbd>C-a</kbd>


### Memindahkan cursor ke akhir baris

<kbd>C-e</kbd>


### Memindahkan cursor ke awal kalimat

<kbd>M-a</kbd>

Dapat diteruskan untuk berpindah ke kalimat selanjutnya.


### Memindahkan cursor ke akhir kalimat

<kbd>M-e</kbd>

Dapat diteruskan untuk berpindah ke kalimat sebelumnya.


### Memindahkan cursor ke baris pertama

<kbd>M-&lt;</kbd>


### Memindahkan cursor ke baris terakhir

<kbd>M-&gt;</kbd>


### Jump to

Perintah-perintah movement di atas, juga dapat kita berikan argument berupa angka.

Kita dapat menggunakan prefix <kbd>C-u</kbd>, diikuti dengan **n** (jumlah) lompatan dalam angka, kemudian **arahnya**.

**n jumlah lompatan**, disebut dengan **repeat count**

**arah**, disebut dengan **direction**.

Misal, kita ingin bergerak 10 baris ke bawah.

<kbd>C-u</kbd> <kbd>10</kbd> <kbd>C-n</kbd>

Cara lain, selain menggunakan prefix <kbd>C-u</kbd>, dapat pula menggunakan <kbd>ALT-&lt;repeat count&gt;</kbd>

Misal, kita ingin bergerak 20 character ke depan.

<kbd>M-20</kbd> <kbd>C-f</kbd>


## Jika Emacs Berhenti Merespon

Beberapa hal yang dapat menyebabkan Emacs berhenti merespon:

1. Tidak merespon saat kita memasukkan inputan
2. Menghentikan command yang berjalan terlalu dieksekusi
3. Membatalkan command dengan *numeric argument* yang tidak ingin kita eksekusi

Dapat kita atasi dengan,

<kbd>C-g</kbd>


## Disabled Commands

<kbd>C-g</kbd>

Pda command display mode, Emacs akan menampilkan **Quit**.


## Manipulation Windows


### Delete other windows

Saya asumsikan sebagai *maximize current focused selected window*.

<kbd>C-x</kbd> <kbd>1</kbd>

Command ini akan membuat current focuses selected window akan menjadi maximize.


## Inserting


### Insert repeating character with repeat count

Sama sepertin repeat count pada movement, kita dapat menggunakannya untuk memasukkan karakter sejumlah **n**.

Misal, kita ingin memasukkan karakter "+" (tambah) sebanyak 20.

<kbd>C-u</kbd> <kbd>20</kbd> <kbd>+</kbd>

Maka, hasilnya akan menjadi,

```
++++++++++++++++++++
```


## Deleting


### Delete 1 karakter di depan cursor

<kbd>C-d</kbd>


### Delete 1 kata sebelum cursor

<kbd>M-&lt;DEL&gt;</kbd>


### Delete 1 kata setelah cursor

<kbd>M-d</kbd>


### Hapus seluruh karakter mulai dari posisi cursor sampai akhir baris

<kbd>C-k</kbd>


### Hapus 1 paragraf mulai dari posisi cursor sampai akhir paragraph

<kbd>M-k</kbd>


## Text Selection

Akan melakukan selection dimulai dari posisi cursor berada.

<kbd>C-&lt;SPC&gt;</kbd>

Pada command display mode, Emacs akan menampilkan tulisan **Mark set**.
