---
layout: "post"
title: "Membuat Daftar Isi Otomatis di Jekyll"
date: "2025-12-30 02:40"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2025/2025-12-30-membuat-daftar-isi-otomatis-di-jekyll"
author: "BanditHijo"
category: "blog"
tags: ["jekyll"]
description: "Navigasi di dalam artikel menjadi lebih mudah dengan adanya daftar isi (table of contents). Akan lebih praktis jika daftar isi dibuat otomatis di Jekyll."
---

{{ page.description }}

Navigasi di dalam artikel yang panjang kadang menjadi kurang nyaman jika tidak ada daftar isi (table of contents). Dengan adanya daftar isi, pembaca dapat dengan mudah melompat ke bagian tertentu di dalam artikel.


## Strategi

Saya menggunakan liquid template yang dibuat oleh [GitHub: allejo/jekyll-toc](https://github.com/allejo/jekyll-toc) agar Jekyll dapat men-generate daftar isi secara otomatis.

Saya menggunakan cara ini karena proses instalasi dan setupnya sangat mudah, hanya dengan meng-include-kan liquid template ke dalam layout post, maka setiap artikel yang menggunakan layout post akan memiliki daftar isi otomatis berdasarkan heading yang ada di dalam artikel tersebut.


## Implementasi

1. Unduh file `toc.html` dari [latest release](https://github.com/allejo/jekyll-toc/releases/tag/v1.2.1) atau [master branch](https://github.com/allejo/jekyll-toc/blob/master/_includes/toc.html)

2. Letakkan file `toc.html` di dalam folder `_includes` di project Jekyll
    ```
    📂 _includes/
    │ 📄 analytics.html
    │ 📄 footer.html
    │ 📄 head.html
    │ 📄 nav.html
    │ 📄 scripts.html
    └ 📄 toc.html 👈
    📁 _layouts/
    📁 _posts/
    📁 assets/
    📁 pages/
    📄 404.html
     _config.yml
    ```

3. Buat file `toc_template.html` di dalam folder `_includes`. File ini berfungsi sebagai template pembungkus untuk daftar isi.
    ```
    📂 _includes/
    │ 📄 analytics.html
    │ 📄 footer.html
    │ 📄 head.html
    │ 📄 nav.html
    │ 📄 scripts.html
    │ 📄 toc.html
    └ 📄 toc_template.html 👈
    📁 _layouts/
    📁 _posts/
    📁 assets/
    📁 pages/
    📄 404.html
     _config.yml
    ```
   dengan isi sebagai berikut,
    ```html
    !filename: /includes/toc_template.html
    <details class="mb-6">
      <summary class="font-semibold text-3xl tracking-tight select-none">
        <span class="ml-1">Table of Contents</span>
      </summary>

      <div class="toc mt-3">
        {% raw %}{% include toc.html html=content %}{% endraw %}
      </div>
    </details>
    ```
    include kan `toc.html` di dalam nya.

4. Edit file layout post `_layouts/post.html` untuk meng-include-kan `toc_template.html` di posisi yang diinginkan, misalnya setelah judul artikel.
    ```html
    !filename: _layouts/post.html
    <section id="content" class="pt-36 pb-10">
      <div class="container px-0 md:max-w-6xl">
        <div class="px-4">
          <h1 class="text-5xl tracking-tight font-bold mb-8">
            {% raw %}{{ page.title }}{% endraw %}
          </h1>

          {% raw %}{% include toc_template.html %}{% endraw %}

          <div class="markdown dark:text-white">
            {% raw %}{{ content }}{% endraw %}
          </div>
        </div>
      </div>
    </section>
    ```

5. Sekarang CSS nya. Tambahkan style berikut ke dalam file CSS, misalnya di `assets/css/style.css`.
    ```css
    !filename: assets/css/style.css
    /* TOC */
    .toc > ul {
      @apply text-lg pl-6 md:pl-12 list-disc;
    }

    .toc ul ul {
      @apply text-lg pl-7 list-disc;
    }
    ```
    Saya menggunakan Tailwind CSS, jadi saya menggunakan `@apply` untuk menambahkan utility class Tailwind.

6. Selesai. Sekarang setiap artikel yang menggunakan layout post akan memiliki daftar isi otomatis berdasarkan heading yang ada di dalam artikel tersebut.
    ```markdown
    ---
    layout: "post"
    title: "Membuat Daftar Isi Otomatis di Jekyll"
    date: "2025-12-30 02:40"
    ---

    ## Chapter 2
    lorem ipsum...

    ### Chapter 2.1
    lorem ipsum...

    #### Chapter 2.1.1
    lorem ipsum...

    ## Chapter 3
    lorem ipsum...

    ### Chapter 3.1
    lorem ipsum...

    #### Chapter 3.1.1
    lorem ipsum...
    ```

    Jadinya akan seperti ini,
    ```
    Table of Contents
    - Chapter 2
      - Chapter 2.1
        - Chapter 2.1.1
    - Chapter 3
      - Chapter 3.1
        - Chapter 3.1.1
    ```


## Pesan Penulis

Dengan adanya daftar isi otomatis di dalam artikel, navigasi menjadi lebih mudah dan praktis. Pembaca dapat dengan cepat melompat ke bagian yang mereka inginkan tanpa harus menggulung halaman secara manual.

Terima kasih sudah membaca!


## Referensi

1. [GitHub: allejo/jekyll-toc](https://github.com/allejo/jekyll-toc) \
   Diakses tanggal: 2025-12-30
