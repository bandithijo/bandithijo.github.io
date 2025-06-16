---
layout: 'post'
title: 'Menjalankan Python Virtualenv Versi Python yang Spesifik pada Arch Linux'
date: '2019-01-05 12:07'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Python']
pin:
hot:
contributors: []
description: "Catatan ini mengenai trik membuat dan menjalankan Python Virtualenv dengan versi yang spesifik pada Arch Linux."
---

# Latar Belakang Masalah

Saya kesulitan saat akan menjalankan Python versi tertentu pada Python Virtual Environment.

Saat tulisan ini dibuat, Arch Linux secara *default* sudah membawa Python versi 3.7. Sedangkan saya memerlukan Python versi 3.6 dalam project yang ingin saya kerjakan. Lantas saya membutuhkan Python Virtual Environment yang menggunakan Python 3.6.

Apabila saya menjalankan,

```
$ virtualenv venv
```

Maka saat saya aktifkan dan saya lihat versi Pythonnya, masih menggunakan Python 3.7.

```
$ python -V
```

```
Python 3.7.2
```

Bagaimana caranya agar di dalam Python Environment yang saya buat dapat menggunakan Python 3.6?


# Solusi

1. Install Python 3.6 dari AUR

   ```
   $ yay python36
   ```

2. Buat virtualenv dari versi python 3.6

   ```
   $ virtualenv -p python3.6 <mark>venv</mark>
   ```

   `venv` adalah nama dari virtual environment.

   ```
   Running virtualenv with interpreter /usr/bin/python3.6
   Using base prefix '/usr'
   New python executable in /home/bandithijo/git/test/venv/bin/python3.6
   Also creating executable in /home/bandithijo/git/test/venv/bin/python
   Installing setuptools, pip, wheel...done.
   ```

   Apabila menampilkan `done` artinya proses pembuatan virtual environment telah berhasil.

   Proses pembuatan virtual environment ini membutuh kan akses internet.

3. Aktivasi virtual environment.

   ```
   $ cd venv
   ```

   ```
   $ source bin/activate
   ```

   Nanti akan ada tanda-tanda pada Terminal kalian apabila kalian mengunakan Theme tertentu yang menampilkan bahwa kita saat ini telah berada pada virtual environment.

   Seperti ini.

   ```
   (venv)
   ~/venv
   $_
   ```

   Lakukan pengecekan versi Python.

   ```
   $ python -V
   ```

   ```
   Python 3.6.7
   ```

   Yak, kita sudah berada pada versi Python yang saya inginkan, yaitu versi 3.6.

   Kalau sudah begini tinggal kita sikat miring.


# Pesan Penulis

Seperti judul tulisan ini, saya membuatnya spesifik untuk distribusi Arch Linux, karena bisa saja proses instalasi yang berbeda, nama paket binary yang berbeda dan lokasi PATH yang berbeda.

Silahkan bereksplorasi sendiri untuk yang menggunakan distribusi sistem opeasi GNU/Linux yang lain.

Terima kasih.



# Referensi

1. [reddit.com/r/archlinux/comments/7ozxtx/how_to_manage_python_versions/](https://www.reddit.com/r/archlinux/comments/7ozxtx/how_to_manage_python_versions/)
<br>Diakses tanggal: 2019/01/05
