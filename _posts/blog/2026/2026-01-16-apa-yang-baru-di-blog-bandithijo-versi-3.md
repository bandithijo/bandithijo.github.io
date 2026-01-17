---
layout: "post"
title: "Apa yang Baru di Blog BanditHijo versi 3?"
date: "2026-01-16 10:06"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-01-16-apa-yang-baru-di-blog-bandithijo-versi-3"
author: "BanditHijo"
category: "blog"
tags: ["blog"]
description: "Di pertengahan tahun 2025, saya memutuskan untuk membuat perubahan besar pada cara saya menulis artikel di blog ini. Setelah beberapa tahun menggunakan berbagai notasi syntax, saya merasa perlu untuk menyederhanakan proses penulisan agar tetap mempertahankan mood dalam menulis. Oleh karena itu, pada BanditHijo Versi 3, saya berfokus pada penggunaan CommonMark specification sebagai standar penulisan artikel."
---

## Pendahuluan

{{ page.description }}


## Format Penulisan dari Versi ke Versi

Sedikit kilas balik, pada versi pertama blog ini [1], saya menggunakan modifikasi tag/notasi markdown yang cukup kompleks untuk menulis artikel. Hal ini membuat proses penulisan menjadi lebih rumit dan terkadang mengganggu alur kreatif saya.


### Versi Pertama (Markdown + Jekyll Custom Tags)

![Gambar 1]({{ page.assets }}/gambar_01.png)

Gambar 1. BanditHijo's Blog versi pertama

Sebagai gambaran, seperti ini Jekyll custom tag yang saya gunakan pada versi pertama:

1. Jika ingin menuliskan shell dengan user prompt:
   ```
   {% raw %}{% shell_user %}{% endraw %}
   sudo pacman -Syu
   {% raw %}{% endshell_user %}{% endraw %}
   ```
   ```
   $ sudo pacman -Syu
   ```

2. Jika ingin menuliskan shell dengan custom prompt:
   ```
   {% raw %}{% shell_term postgres> %}{% endraw %}
   CONNECT my_database;
   {% raw %}{% endshell_term %}{% endraw %}
   ```
   ```
   postgres> CONNECT my_database;
   ```

3. Jika ingin memasukkan gambar:
   ```
   {% raw %}{% image https://image.url/123/image_01.png | 1 %}{% endraw %}
   ```

4. Jika ingin memasukkan gambar dengan caption:
   ```
   {% raw %}{% image https://image.url/123/image_01.png | 1 | Caption di sini %}{% endraw %}
   ```

Dan masih banyak lagi notasi khusus yang saya pergunakan pada versi pertama. Artikel lengkapnya bisa di baca di sini: [Membuat Jekyll Custom Tags dengan Liquid Tags]({{ '/blog/membuat-jekyll-custom-tags-dengan-liquid-tags' | absoulute_url }}).

Pada mulanya, saya merasa bahwa dengan menggunakan custom tag/notasi markdown tersebut, saya dapat menulis artikel dengan lebih ekspresif. Namun, seiring berjalannya waktu, saya menyadari bahwa kompleksitas tersebut justru menghambat proses penulisan saya.


### Versi Kedua (AsciiDoc)

Saya juga sempat mencoba merubah format artikel di versi kedua [2], yang tadinya menggunakan Markdown pada versi pertama, saya ubah menjadi AsciiDoc. Pertimbangan saya menggunakan AsciiDoc, karena blog saya sebagian besar berisi hal-hal teknis. Sehingga cocok menggunakan notasi AsciiDoc yang luwes untuk dokumen teknis.

![Gambar 2]({{ page.assets }}/gambar_02.png)

Gambar 2. BanditHijo's Blog versi kedua

Namun, setelah mencoba beberapa waktu, dan memigrasikan beberapa artikel saya, proses build menjadi lebih lambat dan proses menulis menggunakan AsciiDoc ternyata tidak semudah yang saya bayangkan. Akhirnya, saya memutuskan untuk kembali lagi menggunakan versi pertama.

AsciiDoc memang memiliki kelebihan dalam hal penulisan dokumen teknis, namun untuk blog pribadi yang lebih banyak berisi artikel ringan dan tutorial, saya merasa bahwa Markdown lebih sesuai dengan kebutuhan saya. Tapi, saya masih tetap menggunakan AsciiDoc untuk membuat dokumentasi teknis yang saya berikan untuk pihak lain. Karena membuat dokumentasi teknis dengan AsciiDoc sangat efisien. Karena hanya cukup menyediakan template dokumen, kemudian tinggal menulis kontennya saya, lalu build menjadi dokumen.

Saya menggunakan AsciiDoctor sebagai tool untuk formatingnya, dan AsciiDoctor PDF untuk merubah menjadi format PDF. Keduanya adalah tool yang sangat powerful untuk membuat dokumentasi teknis.

AsciiDoc menurut saya levelnya berada di antara Markdown dan LaTeX. Jika Markdown terlalu sederhana, dan LaTeX terlalu kompleks, maka AsciiDoc adalah solusi di tengah-tengahnya.


### Versi Ketiga (CommonMark Specification)

Seiring berjalannya waktu, saya menyadari bahwa semakin sederhana proses penulisan, semakin bersemangat saya untuk menulis. Karena custom tag/notasi markdown yang saya gunakan pada versi pertama justru membuat proses menulis menjadi lebih rumit dan mengganggu alur kreatif saya. Meskipun saya sudah menggunakan snippet code di Neovim untuk mempercepat penulisan, tetap saja prosesnya terasa kurang praktis buat saya.

Maka dari itu, di pertengahan tahun 2025, saya memutuskan untuk membuat perubahan besar pada cara saya menulis artikel di blog ini. Setelah beberapa tahun menggunakan berbagai notasi syntax, saya merasa perlu untuk menyederhanakan proses penulisan agar tetap mempertahankan mood dalam menulis. Oleh karena itu, pada BanditHijo Versi 3, saya berfokus pada penggunaan CommonMark specification sebagai standar penulisan artikel.

Ada beberapa keuntungan yang saya dapatkan dengan mengikuti CommonMark specification:

1. **Sederhana dan Efisien**: Proses penulisan menjadi lebih cepat dan efisien karena saya tidak perlu mengingat berbagai custom tag/notasi markdown yang rumit.
2. **Konsistensi**: Artikel-artikel di blog ini menjadi lebih konsisten dalam formatnya, sehingga pembaca dapat dengan mudah memahami konten tanpa terganggu oleh variasi notasi.
3. **Fokus pada Konten**: Saya dapat lebih fokus pada isi artikel tanpa harus terganggu oleh aspek teknis penulisan.
4. **Kompatibilitas**: Dengan mengikuti standar yang umum digunakan, artikel-artikel di blog ini lebih mudah diakses dan dibaca di berbagai platform dan perangkat. Misalnya, jika saya ingin memigrasikan blog ini ke platform lain di masa depan, prosesnya akan lebih mudah karena artikel-artikel sudah mengikuti standar yang umum. Selain itu juga jadi lebih kompatibel dengan berbagai tool yang mendukung Markdown seperti saat dibaca oleh RSS reader, atau saat diimport ke aplikasi note-taking seperti Obsidian, Notion, dsb.

Untuk menjaga konsistensi format penulisan, saya mendokumentasikan rules dalam menulis di sini "[Writing Rules]({{ '/writing-rules' | absoulute_url }})" yang berisi panduan menulis artikel di blog ini.

Saya berusaha semaksimal mungkin mengikuti CommonMark specification dan seminimal mungkin menggunakan modifikasi tag/notasi markdown dalam menulis artikel.


## Thema Baru di Blog BanditHijo versi 3

Saya menggunakan thema baru yang lebih minimalis dan fokus pada konten artikel.

Kali ini saya tidak lagi menggunakan plain CSS yang dibuat sendiri seperti pada versi sebelumnya, melainkan menggunakan framework CSS bernama [Tailwind CSS](https://tailwindcss.com/). Framework ini memungkinkan saya untuk membuat desain yang responsif dan modern dengan lebih mudah.

![Gambar 3]({{ page.assets }}/gambar_03.png)

Gambar 3. BanditHijo's Blog versi ketiga


## Assets Management

Sebelumnya, pada versi pertama, saya menyimpan semua gambar di layanan pihak ketiga, seperti postimages.org. Pada mulanya, saya pikir gambar akan membuat repo blog ini menjadi gemuk dan sulit di-manage. Namun, setelah mempertimbangkan berbagai aspek, saya memutuskan untuk menyimpan semua gambar langsung di dalam repository blog ini. Ceritanya bisa dibaca di sini, [Preferensi Saya dalam Menyimpan Assets Gambar di Jekyll]({{ '/blog/preferensi-saya-dalam-menyimpan-assets-gambar-di-jekyll' | absoulute_url }}).

Untuk manajemen assets seperti gambar, saya membuat struktur direktori yang lebih terorganisir di dalam repository blog ini. Setiap artikel memiliki direktori khusus untuk menyimpan gambar dan file terkait lainnya. Hal ini memudahkan saya dalam mengelola assets baik berupa gambar maupun file lainnya.

```
📂 _posts/
└ 📂 blog/
  └ 📂 2025/
    └ 📄 2025-12-29-ruby-programmers-best-friend.md 👈 artikel
📂 assets/
│ 📁 css/
│ 📂 images/
└ 📂 posts/
  └ 📂 blog/
    └ 📂 2025/
      └ 📂 2025-12-29-ruby-programmers-best-friend/ 👈 direktori assets
        │ 📄 file-01.pdf
        │ 📄 gambar-01.png
        └ 📄 gambar-02.png
⚙️ _config.yml
📄 index.markdown
📄 README.md
```

Kemudian pada front matter artikel, saya menambahkan variabel `assets` yang berisi path ke direktori assets artikel tersebut. Sehingga saat menulis artikel, saya hanya perlu merujuk ke variabel `assets` untuk menyisipkan gambar atau file lainnya.

```yaml
---
layout: "post"
title: "Ruby, Programmer's Best Friend"
date: "2025-12-29 08:00"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2025/2025-12-29-ruby-programmers-best-friend" # 👈 direktori assets
author: "BanditHijo"
category: "blog"
tags: ["ruby"]
description: "Ruby adalah bahasa pemrograman yang dirancang untuk kemudahan dan produktivitas."
---
```

Kemudian pada artikel, saya dapat mengakses variabel `assets` dengan `{% raw %}{{ page.assets }}{% endraw %}`.

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

![Gambar 1]({% raw %}{{ page.assets }}{% endraw %}/gambar-01.png)

![Gambar 2]({% raw %}{{ page.assets }}{% endraw %}/gambar-02.png)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, [Download File 1]({% raw %}{{ page.assets }}{% endraw %}/file-01.pdf).
```

Dengan pendekatan ini, saya mendapatkan beberapa keuntungan, di antaranya:
1. **Terstruktur dengan baik** \
  Setiap artikel memiliki direktori gambar sendiri yang terorganisir berdasarkan kategori dan tanggal postingan.
2. **Mudah untuk dikelola** \
  Jika saya perlu mengubah nama file gambar atau menghapus gambar tertentu, saya hanya perlu mengakses direktori gambar yang sesuai dengan artikel tersebut tanpa harus mencari di seluruh project.
3. **Fleksibel untuk berbagai jenis file** \
  Saya dapat menyimpan berbagai jenis file (gambar, PDF, dokumen, dll) di dalam direktori yang sama tanpa harus bergantung pada layanan pihak ketiga.


## Penutup

Tak terasa sudah sejak 2018 saya menulis di blog ini dengan berbagai format penulisan. Dari mulai menggunakan custom tag/notasi markdown di versi pertama, mencoba AsciiDoc di versi kedua, hingga akhirnya kembali ke Markdown dengan mengikuti CommonMark specification di versi ketiga ini.

Dengan perubahan ini, saya berharap dapat lebih fokus pada konten artikel tanpa terganggu oleh aspek teknis penulisan.

Terima kasih saya ucapkan untuk teman-teman yang telah mengikuti perjalanan blog ini hingga versi ketiga. Terima kasih karena telah memberikan testimonial dan feedback dalam beberapa kesempatan ketika berinteraksi dengan saya, baik secara langsung maupun tidak langsung melalui media sosial dan juga email. Saya senang jika blog ini dapat memberikan manfaat dan inspirasi buat teman-teman yang membacanya. 

Mumpung masih awal tahun, saya mengajak teman-teman, "Ayo nulis blog juga yaa!"


## Referensi

1. [https://github.com/bandithijo/bandithijo.github.io_v1](https://github.com/bandithijo/bandithijo.github.io_v1) \
  Tanggal diakses: 2026-01-16

1. [https://github.com/bandithijo/bandithijo.github.io_v2](https://github.com/bandithijo/bandithijo.github.io_v2) \
  Tanggal diakses: 2026-01-16

1. [https://github.com/bandithijo/bandithijo.github.io_v3](https://github.com/bandithijo/bandithijo.github.io_v3) \
  Tanggal diakses: 2026-01-16
