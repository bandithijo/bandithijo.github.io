---
layout: "post"
title: "Preferensi Saya dalam Menyimpan Assets di Jekyll Bagian 2"
date: "2026-08-04"
permalink: "/blog/:title"
author: "BanditHijo"
category: "blog"
tags: ["jekyll"]

description: "Pengelolaan assets yang baik pada sebuah blog merupakan kunci untuk mempertahankan mood menulis blog."
---

## Background Story

Pada artikel saya sebelumnya, [**Preferensi Saya dalam Menyimpan Assets di Jekyll**]({% link _blogs/2025-12-31-preferensi-saya-dalam-menyimpan-assets-di-jekyll.md %}), saya menambahkan attribute `assets:` pada front-matter di setiap post. Kekurangan dari pendekatan ini adalah:

1. Ribet. Karena saya harus mengeset assets path secara manual di setiap post.

   ```yaml
   ---
   layout: "post"
   title: "Ruby Promgrammers Best Friend"
   date: "2025-12-29"
   assets: "/assets/posts/2025-12-29-ruby-programmers-best-friend"
   ---
   ```
   Sangat tidak praktis!

2. Sintaks image jadi panjang dan terlihat tidak praktis.
   ```liquid
   ![gambar_01]({% raw %}{{ page.assets | absolute_url }}{% endraw %}/gambar_01.png)
   ```

## Pemecahan Masalah

Untuk saat ini yang terpikirkan oleh saya adalah dengan memanfaatkan Jekyll Custom Tag. Saya sudah pernah menulis tentang membuat Jekyll Custom Tag pada artikel ini, [**Membuat Jekyll Custom Tags dengan Liquid Tags**]({% link _blogs/2021-01-22-membuat-jekyll-custom-tags-dengan-liquid-tags.md %}).

Tapi sebelum membuat Jekyll Custom Tag, kenali dulu struktur direktori antara file post dengan assetsnya. Punya saya seperti di bawah ini.

```
📁 _includes/
📁 _plugins/
📁 _layouts/
📂 _posts/
  📄 2025-12-29-ruby-programmers-best-friend.md 👈 artikel
📂 assets/
│ 📁 css/
│ 📂 images/
│ │ 📁 banner/
│ └ 📁 favicon/
│ 📁 pages/
│ 📂 posts/
│   📂 2025-12-29-ruby-programmers-best-friend/ 👈 direktori assets
│   │ 📄 file-01.pdf
│   │ 📄 gambar-01.png
│   └ 📄 gambar-02.png
│ 📁 javascript/
└ 📁 json/
📁 pages/
⚙️ _config.yml
📄 index.markdown
📄 README.md
```


### 1. Buat Jekyll Custom Tag assets_path

Buat file baru dengan nama `assets_path_tag.rb` di dalam direktori `_plugins/assets_path_tag.rb`.

```ruby
!filename: _plugins/assets_path_tag.rb
module Jekyll
  class AssetsPathTag < Liquid::Tag
	include Jekyll::Filters::URLFilters

	def render(context)
	  @context = context
	  page = context.registers[:page]

	  relative_path =
		if page["collection"] == "posts"
		  date = Date.parse(page["date"].to_s)
		  "/assets/posts/#{date.strftime('%Y-%m-%d')}-#{page["slug"]}"
		else
		  slug = File.basename(page["name"].to_s, ".*")
		  "/assets/pages/#{slug}"
		end

	  absolute_url(relative_path)
	end
  end
end

Liquid::Template.register_tag('assets_path', Jekyll::AssetsPathTag)
```
Baris ke-10 memberikan kondisi untuk collection yang termasuk dalam `posts`.

Baris ke-13 memberikan kondisi untuk collection selain `posts`, bisa berupa `page`.

Baris ke-12 dan ke-15 merupakan path dimana saya menyimpan assets untuk blog.

Untuk assets dari posts saya tempatkan di,

```
/assets/posts/yyyy-mm-dd-slug-of-title/
```

Untuk assets dari page saya tempatkan di,

```
/assets/page/(slug-page)/
```


### 2. Cara pakainya

Untuk menggunakannya tinggal panggil dengan cara seperti ini,

```liquid
![gambar-01]({% raw %}{% assets_path %}{% endraw %}/gambar-01.png)

![gambar-02]({% raw %}{% assets_path %}{% endraw %}/gambar-02.png)

Berikut ini [Document 01]({% raw %}{% assets_path %}{% endraw %}/file-01.pdf) yang harus dikerjakan.
```

Dengan begini, tidak perlu lagi menggunakan attribute `assets:` pada front-matter.

```yaml
---
layout: "post"
title: "Ruby Promgrammers Best Friend"
date: "2025-12-29"
---
```

Selesai!


## Keuntungan

Dengan menggunakan pendekatan ini saya mendapatkan keuntungan,

1. Path yang ditulis pada pemanggilan assets menjadi tidak terlalu panjang. Hanya perlu memanggil `{% raw %}{% assets_path %}{% endraw %}` kemudian diikuti nama file assetnya.
2. Jika ingin mengganti struktur direktori dari assets, tidak perlu melakukan edit ke semua link assets yang ada di masing-masing artikel. Tapi cukup melakukan edit pada file `_plugins/assets_path_tag`. Maka semua assets path akan ikut berubah.

Sangat praktis!


## Pesan Penulis

Pendekatan ini mungkin bukan pendekatan terbaik. Tapi pendekatan ini adalah pendekatan yang cocok untuk saya saat ini.
