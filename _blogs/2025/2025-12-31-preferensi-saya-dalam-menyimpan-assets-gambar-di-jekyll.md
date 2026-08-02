---
layout: "post"
title: "Preferensi Saya dalam Menyimpan Assets Gambar di Jekyll"
date: "2025-12-31 04:40"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2025/2025-12-31-preferensi-saya-dalam-menyimpan-assets-gambar-di-jekyll"
author: "BanditHijo"
category: "blog"
tags: ["jekyll"]
description: "Gambar merupakan bagian pendukung yang cukup penting dalam sebuah artikel di blog. Bagaimana preferensi saya dalam menyimpan assets gambar di Jekyll?"
---

## Latar Belakang

Sebelumnya (sejak blog ini dibuat tahun 2018-sekarang), saya menyimpan assets gambar di pihak ketiga penyedia layanan hosting gambar gratis, salah satunya seperti [https://postimages.org/](https://postimages.org/id/). Alasan saya karena tidak ingin membuat project Jekyll saya menjadi gemuk dengan banyaknya file gambar yang disimpan di dalam project. Karena saya sudah mempertimbangkan bahwa akan banyak menulis artikel yang membutuhkan banyak gambar pendukung.

Namun, setelah banyak menulis hingga ~~ribuan~~ 200an artikel, saya merasa kurang nyaman dengan pendekatan tersebut. Beberapa alasan di antaranya:

1. **Tergantung pada layanan pihak ketiga** \
  - Jika layanan tersebut mengalami gangguan atau tutup, maka gambar-gambar di artikel saya akan hilang.
  - Jika layanan tersebut mengalami kendala, maka gambar di blog juga akan terpengaruh.

2. **Sulit untuk dikelola** \
  Yang paling sederhana jika saya ingin merubah nama file gambar yang sudah diupload, maka saya harus mengubah lagi URL di dalam artikel satu per satu.

3. **Bingun menyimpan assets selain gambar** \
  Selain gambar, terkadang saya juga perlu menyisipkan file PDF, dokumen, atau file lain di dalam artikel. Jika assets disimpan di layanan pihak ketiga, maka saya harus mencari layanan lain yang mendukung penyimpanan berbagai jenis file.


## Seperti apa rekomendasi dari Jekyll?

Kalau berdasarkan dokumentasi Jekyll, [Posts > Including images and resources](https://jekyllrb.com/docs/posts/#including-images-and-resources), disarankan untuk menyimpan assets gambar di dalam direktori bernama `assets/` di root project Jekyll.

```markdown
... which is shown in the screenshot below:

![My helpful screenshot](/assets/gambar-01.jpg)
```

Namun, saya memiliki pendekatan yang sedikit berbeda untuk mengelola assets gambar atau file agar lebih terstruktur dan mudah untuk dikelola.


## Bagaimana preferensi Saya?

Pendekatan ini saya berinama, "1 artikel, 1 direktori assets".

Saya lebih suka menyimpan assets gambar atau file di dalam direktori `assets/posts/` diikuti dengan category lalu tahun postingan.

Misalnya, saya punya 2 artikel dengan judul:

1. "**Ruby, Programmer's Best Friend**", untuk tanggal 29 Desember 2025
2. "**Ruby on Rails, Compress the Complexity of Modern Web Apps**", untuk tanggal 31 Desember 2025

Filename dari postnya:

```
2025-12-29-ruby-programmers-best-friend.md
2025-12-31-ruby-on-rails-compress-the-complexity-of-modern-web-apps.md
```

Path dari postnya:

```
_posts/blog/2025/2025-12-29-ruby-programmers-best-friend.md
_posts/blog/2025/2025-12-31-ruby-on-rails-compress-the-complexity-of-modern-web-apps.md
```


### Implementasi struktur direktori assets

Untuk setiap artikel di atas, saya akan membuat direktori seperti ini `assets/posts/blog/2025/`. Kemudian membuat direktori dengan nama sesuai dengan filename dari postnya.

Path dari direktori assets,

```
assets/posts/blog/2025/2025-12-29-ruby-programmers-best-friend/
assets/posts/blog/2025/2025-12-31-ruby-on-rails-compress-the-complexity-of-modern-web-apps/
```

Jika diproyeksikan ke dalam struktur project Jekyll, maka akan terlihat seperti berikut,

```
📁 _includes/
📁 _layouts/
📂 _posts/
│ 📂 blog/
│ │ 📁 2024/
│ └ 📂 2025/
│   └ 📄 2025-12-29-ruby-programmers-best-friend.md 👈 artikel
│   └ 📄 2025-12-31-ruby-on-rails-compress-the-complexity-of-modern-web-apps.md 👈 artikel
└ 📁 note/
📂 assets/
│ 📁 css/
│ 📂 images/
│ │ 📁 banner/
│ └ 📁 favicon/
│ 📁 pages/
│ 📂 posts/
│ │ 📂 blog/
│ │ │ 📁 2024/
│ │ └ 📂 2025/
│ │   │ 📂 2025-12-29-ruby-programmers-best-friend/ 👈 direktori assets
│ │   │ │ 📄 file-01.pdf
│ │   │ │ 📄 gambar-01.png
│ │   │ └ 📄 gambar-02.png
│ │   └ 📂 2025-12-31-ruby-on-rails-compress-the-complexity-of-modern-web-apps/ 👈 direktori assets
│ │     │ 📄 file-01.pdf
│ │     │ 📄 file-02.pdf
│ │     │ 📄 gambar-01.png
│ │     │ 📄 gambar-02.png
│ │     └ 📄 gambar-03.png
│ └ 📁 note/
│ 📁 javascript/
└ 📁 json/
📁 pages/
⚙️ _config.yml
📄 index.markdown
📄 README.md
```

Dengan pendekatan ini, saya mendapatkan beberapa keuntungan, di antaranya:

1. **Terstruktur dengan baik** \
  Setiap artikel memiliki direktori gambar sendiri yang terorganisir berdasarkan kategori dan tanggal postingan.

2. **Mudah untuk dikelola** \
  Jika saya perlu mengubah nama file gambar atau menghapus gambar tertentu, saya hanya perlu mengakses direktori gambar yang sesuai dengan artikel tersebut tanpa harus mencari di seluruh project.

3. **Fleksibel untuk berbagai jenis file** \
  Saya dapat menyimpan berbagai jenis file (gambar, PDF, dokumen, dll) di dalam direktori yang sama tanpa harus bergantung pada layanan pihak ketiga.


### Implementasi dalam artikel

Dalam artikel, saya tinggal mendefinisikan attribute `assets` di Front Matter dengan path ke direktori assets dari artikel tersebut.

```yaml
!filename: _posts/blog/2025/2025-12-29-ruby-programmers-best-friend.md
---
layout: "post"
title: "Ruby, Programmer's Best Friend"
date: "2025-12-29 08:40"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2025/2025-12-29-ruby-programmers-best-friend" 👈
author: "BanditHijo"
category: "blog"
tags: ["jekyll"]
description: "Ruby adalah bahasa pemrograman yang dirancang untuk produktivitas dan kemudahan penggunaan."
---
```

Dengan mendefinisikan attribute `assets`, saya dapat mengaksesnya dengan `{% raw %}{{ page.assets }}{% endraw %}`.

```markdown
... lorem ipsum dolor sit amet, consectetur adipiscing elit.

![Gambar 1]({% raw %}{{ page.assets }}{% endraw %}/gambar-01.png)

... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![Gambar 2]({% raw %}{{ page.assets }}{% endraw %}/gambar-02.png)

... ut enim ad minim veniam.

![File 1]({% raw %}{{ page.assets }}{% endraw %}/file-01.pdf)
```

Dengan begini, jadi lebih praktis untuk menyisipkan gambar dan file di dalam artikel tanpa harus menulis path secara lengkap.

Jika di kemudian hari saya memutuskan untuk merubah struktur direktori assets, saya hanya perlu mengubah value dari attribute `assets` di Front Matter tanpa harus mengubah path assets di dalam artikel satu per satu.


## Optional: Tambahkan filter `absolute_url`

Untuk memastikan bahwa path assets selalu benar, terutama jika blog diakses melalui domain yang berbeda (misalnya: GitHub Pages dan custom domain), saya menambahkan filter `absolute_url` pada path assets.

> INFO
> 
> **Absolute URL** \
> Prepend `url` and `baseurl` values to the input to convert a URL path to an absolute URL.
> 
> Source: [Jekyll: Liquid > Filters](https://jekyllrb.com/docs/liquid/filters/)

Sebelum ditambahkan filter `absolute_url`, penulisan seperti ini,

```markdown
![Gambar 1]({% raw %}{{ page.assets }}{% endraw %}/gambar-01.png)
```

Hasil rendernya akan seperti ini,

```html
<img src="/assets/posts/blog/2025/2025-12-29-ruby-programmers-best-friend/gambar-01.png" alt="Gambar 1">
```

Namun, setelah ditambahkan filter `absolute_url`, penulisannya menjadi seperti ini,

```markdown
![Gambar 1]({% raw %}{{ page.assets | absolute_url }}{% endraw %}/gambar-01.png)
```

Hasil rendernya akan seperti ini,

```html
<img src="https://bandithijo.dev/assets/posts/blog/2025/2025-12-29-ruby-programmers-best-friend/gambar-01.png" alt="Gambar 1">
```

Dengan menambahkan filter `absolute_url`, Jekyll akan secara otomatis menyesuaikan URL assets berdasarkan konfigurasi `url` atau `baseurl` yang didefinisikan di file `_config.yml`.

Saya menggunakan ini karena saya memiliki dua domain untuk blog ini, yaitu:
1. Domain GitHub Pages: [https://bandithijo.github.io/](https://bandithijo.github.io/), dan
2. Custom Domain: [https://bandithijo.dev/](https://bandithijo.dev/)

Coba kunjungi masing-masing domain di atas, kemudian periksa elemen assets di dalam artikel, maka URL assets akan menyesuaikan dengan domain yang diakses.


## Pesan Penulis

Dengan pendekatan ini, saya merasa lebih nyaman dalam mengelola assets di blog Jekyll saya. Struktur yang terorganisir dengan baik memudahkan saya untuk menemukan, mengubah, atau menghapus gambar sesuai kebutuhan tanpa harus bergantung pada layanan pihak ketiga. Selain itu, pendekatan ini juga memberikan fleksibilitas jika saya ingin merubah struktur penyimpanan di kemudian hari.

Semoga informasi ini bermanfaat bagi Kamu yang juga menggunakan Jekyll untuk blogging dan sedang mencari cara terbaik untuk mengelola assets.

Terima kasih sudah membaca!


## Referensi

1. [Jekyll Documentation - Posts > Including images and resources](https://jekyllrb.com/docs/posts/#including-images-and-resources) \
   Diakses tanggal: 2025-12-31
