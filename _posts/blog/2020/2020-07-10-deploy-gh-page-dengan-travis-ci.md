---
layout: 'post'
title: "Mendeploy Jekyll ke GitHub Pages dengan Travis CI"
date: '2020-07-10 11:00'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['Jekyll', 'GitHub Pages', 'Travis CI']
pin:
hot:
contributors: []
description: "Terdapat whitelist plugin yang dapat digunakan apabila kita hanya menggunakan GitHub Pages untuk membuild Jekyll blog. Maka, saya memanfaatkan Travis-CI agar dapat bebas menggunakan Jekyll plugin sesuka hati. Termasuk plugin yang saya buat sendiri untuk membantu proses penulisan artikel."
---

<!-- BANNER OF THE POST -->
![Gambar 1](https://i.postimg.cc/9MKp2vsR/banner-2020-07-10-deploy-gh-page-dengan-travis-ci.png)

> PERHATIAN!
> 
> Saya yakin, terdapat banyak sekali cara untuk mencapai kota Roma (kiasan), namun tidak mungkin hanya dalam sekali waktu, kita dapat secara bersamaan menjalani semuanya. Pasti kita akan mulai dengan mencoba satu-persatu. Dan cara yang saya lakukan ini adalah hanya salah satu jalan untuk menuju kota Roma.
> 
> Bisa jadi ini jalan yang panjang dan berliku, bisa jadi ini jalan tercepat dan tanpa rintangan.
> 
> Ini adalah jalan yang saya pilih untuk memulai. Silahkan teman-teman untuk menentukan pilihan.


# Sekenario Masalah

Kenapa kok sudah pakai Jekyll tapi malah pakai Travis CI untuk mendeploy ke GitHub Pages. Bukankan GitHub Pages sangat support dengan Jekll?

Benar. Namun, kita tidak fleksibel karena akan terbatasi oleh environment yang sudah dibentuk oleh GitHub Pages.

Batasan-batasan tersebut diantaranya:

1. **Belum menggunakan versi Jekyll paling Baru**. \
  Saat tulisan ini dibuat, GitHub Pages masih di versi 3.8.7. Sedangkan Saat ini Jekyll sudah mencapai versi 4.1.1. Tentunya, GitHub Pages memiliki pertimbangan tersendiri mengapa masih menetap pada Jekyll versi 3.8.x. Meskipun demikian, kita jadi tidak dapat menikmati fitur-fitur dan perbaikan yang dibawa oleh Jekyll versi terbaru.

2. **Terdapat Whitelist Plugins**. \
  Hanya plugin-plugin yang sudah masuk ke dalam GitHub Organization Repository yang dapat digunakan pada GitHub Pages. Hal ini menyebabkan kita tidak dapat menggunakan plugin selain yang ada pada daftar putih dari GitHub Pages.

Secara default, Jekyll sudah mengaktifkan --tidak dapat di-non-aktifkan-- plugin-plugin berikut ini:

```
- jekyll-coffeescript
- jekyll-gist
- jekyll-github-metadata
- jekyll-paginate
- jekyll-relative-links
- jekyll-optional-front-matter
- jekyll-readme-index
- jekyll-default-layout
- jekyll-titles-from-headings
```

Dan, plugin-plugin yang termasuk dalam daftar putih, namun belum terpasang secara default (optional), adalah:

```
 - jekyll-feed *
 - jekyll-redirect-from *
 - jekyll-seo-tag *
 - jekyll-sitemap *
 - jekyll-avatar
 - jemoji
 - jekyll-mentions
 - jekyll-include-cache
```

Di blog ini saja (sejak tulisan ini dibuat), saya baru mencoba 4 plugin teratas (*).

Sumber: [Configuring Jekyll plugins](https://docs.github.com/en/enterprise/2.14/user/articles/configuring-jekyll-plugins)


# Pemecahan Masalah

Sesuai judul catatan kali ini, permasalahan di atas akan kita selesaikan dengan menggunakan Travis CI.

**Apa itu Travis CI?**

> **Travis CI** *is a hosted continuous integration service used to build and test software projects hosted at GitHub and Bitbucket*.

Dengan begitu, kita mengintegrasikan GitHub repository kita dengan Travis CI, agar proses Jekyll build untuk merender static file (public file) akan ditangani oleh Travis CI, bukan oleh GitHub Pages.


## Gambaran Umum Proses Travis CI

Kita akan mengkonfigurasi Travis CI untuk aktif melakukan proses `jekyll build` pada saat terdapat commit terbaru yang masuk ke GitHub repositori.

Setelah proses build selesai dan berhasil, hasilnya berupa static site (public file/direktori) `_site/`. Nah, isi dari file-file yang ada di public direktori `_site/` ini lah yang akan di push ke GitHub.

Ini adalah proses yang mudah, namun akan menjadi sangat membosankan apabila kita melakukannya berulang-ulang setiap kali kita membuat post baru. Maka dari itu, kita buat proses ini berjalan otomatis dengan memanfaatkan Travis CI.


## Membagi Branch

Seperti yang saya jelaskan pada ilustrasi di atas, saya akan membagi project repository menjadi 2.

1. Branch `source`, berisi *source code*, aset-aset dan template dari Jekyll blog.
2. Branch `master`, berisi *static files* hasil proses build yang siap untuk dipublish oleh GitHub Pages.

Jadi, mulai sekarang, kita tidak lagi menulis (bekerja) di dalam branch **master**, melainkan kita akan menulis post dan melakukan modifikasi-modifikasi di dalam branch **source**.

Untuk membuat branch **source**, jalankan perintah di bawah.

```
(master)
$ git checkout -b source
```

```
(source)
$ _
```


## Konfigurasi Branch: Source

Setelah kita berada pada branch source, kita akan melakukan beberapa pemasangan gem dan konfigurasi untuk terhubung dengan Travis CI.


### Memasang Gem yang Dibutuhkan

Buka `Gemfile` dan pasang gem-gem yang teman-teman perlukan.

**Penting!** Untuk Travis CI, gem yang diperlukan untuk proses build adalah `rake` gem.

```ruby
!filename: Gemfile
source 'https://rubygems.org'

gem 'jekyll',                                  '~> 4.1.1'
gem 'rake',                                    '~> 13.0', '>= 13.0.1'

# Optional: Tambahkan jekyll plugin yang teman-teman inginkan
group :jekyll_plugins do
  gem 'rouge',                                 '~> 3.13.0'
  gem 'jekyll-feed',                           '~> 0.13.0'
  gem 'jekyll-sitemap',                        '~> 1.4.0'
  gem 'jekyll-seo-tag',                        '~> 2.6.1'
  gem 'jekyll-redirect-from',                  '~> 0.16.0'
end
```

Sesuaikan versi gem dengan yang teman-teman perlukan.


### Pendefinisian Plugin & Exclude File/Direktori

Untuk plugin gem yang didaftakan pada `:jekyll_plugins`, kita juga perlu mendifinisikan pada file `_config.yml`.

Di file `_config.yml`, kita juga akan mendefinisikan beberapa file yang akan kita masukkan ke dalam daftar **exclude**, agar saat proses build telah selesai, tidak terikut ke dalam branch **master**.

Buka file `_config.yml`.

```yaml
!filename: _config.yml

# ...
# ...

# Daftarkan plugin yang ada di :jekyll_plugins group di dalam Gemfile
plugins:
  - rouge
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-redirect-from


# Membuat pengecualian file-file di bawah ini terhadap proses jekyll build
# Agar tidak ditampilkan di master branch
exclude:
  - vendor
  - lazyhandling.rb
  - Gemfile
  - Gemfile.lock
  - LICENSE
  - README.md
  - Rakefile
```


### Gitignore _site/ Direktori

Karena kita menggunakan branch **master** untuk menampung file-file static site yang sudah di-generate, kita akan membuat pengecualian terhadap direktori `_site/` --yang ada di branch **source**-- ke dalam file `.gitignore` agar tidak masuk ke dalam git tracking.

```bash
!filename: .gitignore
.jekyll-metadata
.jekyll-cache
.sass-cache
_site
```


### Konfigurasi travis.yml

Kita perlu membuat file bernama `.tavis.yml` di root project direktori kita.

Travis CI akan menjalankan proses build berdasarkan konfigurasi yang kita tulis pada file ini.

```yaml
!filename: .travis.yml
language: ruby
os: linux
dist: xenial

install:
  - bundle install

deploy:
  provider: pages
  strategy: git
  token: $GITHUB_TOKEN  # Set in the settings page of your repository, as a secure variable
  skip_cleanup: true
  keep_history: true
  verbose: true
  local_dir: _site
  target_branch: master
  on:
    branch: source
```

**Penjelasannya**,

`language: ruby`, Jekyll adalah Static Site Generator yang dibagun dengan bahasa Ruby, kita akan memberitahukan kepada Travis CI bahwa kita akan membuat Ruby environment.

`rvm: `, **saya tidak mendifinisikan**, karena pada root project direktori saya, sudah terdapat file `.ruby-version` yang berisi versi dari Ruby yang digunakan. Travis CI secara pintar akan menjalankan `rvm use $(< .ruby-version)` saat proses deploy berlangsung.

`install: - bundle install`, Kita memerintahkan Travis CI untuk menjalankan perintah `$ bundle install` agar gem yang kita pasang pada Gemfile dapat diinstal di lingkungan deploy.

`provider: pages`, Travis CI sudah menyediakan GitHub Pages provider.

`github_token: $GITHUB_TOKEN`, _personal access token_ yang akan kita dapatkan pada pengaturan GitHub. Kita juga akan mendifinisikan `GITHUB_TOKEN` ini pada environment variable di pengaturan Travis CI untuk repo kita.

`skip_cleanup: true`, pastikan kalau nilainya **true**, karena kita ingin menyimpan file-file yang telah di-generate selama proses build. Karena pada akhir proses build, kita akan mendeploy file-file static site tersebut ke branch **master**.

`local_dir: _site`, Travis CI akan mendeploy semua file yang ada di dalam direktori ini ke brnach **master**.

`target_branch: master`, setelah proses build selesai, Travis CI akan mendeploy dengan tujuan branch **master**.

`on: branch: source`, Travis CI hanya akan dijalankan pada branch **source**.

Sumber: [GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/)


### Membuat Build Task di Rakefile

Proses build yang berlangsung di Travis CI akan memerlukan **rake**.

Agar perintah `$ bundle exec rake` dapat digunakan, kita perlu mendefinisikan tasks yang akan digunakan rake untuk menjalankan proses Jekyll build.

Untuk itu, kita perlu membuat file `Rakefile` di root project direktori.

```ruby
!filename: Rakefile
task :default do
  puts "Running CI tasks..."

  # Dengan menjalankan perintah jekyll build di production environment
  # Travis CI akan membuat _site/ direktori yang berisi
  # file static site yang siap untuk di publish
  sh("JEKYLL_ENV=production bundle exec jekyll build")
  puts "Jekyll successfully built!"
end
```

File `Rakefile` tersebut akan dijalankan setiap build.

Proses konfigurasi di branch **source** telah selesai.


## Konfigurasi GitHub PAT (Personal Access Token)

Kita memerlukan GitHub PAT (*Personal Access Token*) yang akan kita letakkan pada Travis CI environment.

Untuk mendapatkanya, teman-teman perlu membuka **GitHub Settings > Developer Settings > Personal Access Tokens** (sidebar kiri, di bawah).

Atau klik link ini [Settings/Developer settings](https://github.com/settings/tokens).

Setelah itu, klik tombol <kbd>Generate new tokens</kbd>.

![Gambar 2](https://i.postimg.cc/4y4yz80x/gambar-02.png)

Berikan nama yang mudah untuk dikenali.

![Gambar 3](https://i.postimg.cc/66zy9X72/gambar-03.png)

Checklist semua *permission* yang ada pada scope **repo**.

Sip mantap!

Jangan lupa disimpan dengan menekan tombol <kbd>Generate token</kbd>.

![Gambar 4](https://i.postimg.cc/qMRgq5nm/gambar-04.png)

Kita akan mendapatkan token. Copy dan simpan dulu di tempat yang aman.

Token tersebut akan kita daftarkan ke environment variable GITHUB_TOKEN di Travis CI.

![Gambar 5](https://i.postimg.cc/rFKFMtX3/gambar-05.png)

Dengan begini, konfigurasi pada GitHub sudah selesai.


## Konfigurasi Travis CI

Buka situs [Travis-CI.Org](https://travis-ci.org/) dan login dan nanti akan muncul repositori yang akan kita gunakan. Pilih repository dari Jekyll blog yang teman-teman miliki.

Atau, bisa ke halaman [travis-ci.org/account/repositories](https://travis-ci.org/account/repositories).

![Gambar 6](https://i.postimg.cc/brMsRYP6/gambar-01.png)

Setelah di **enable**, klik tombol <kbd>Settings</kbd>, untuk pergi ke pengaturan.

![Gambar 7](https://i.postimg.cc/KzpSHJzz/gambar-06.png)

Isikan environment variable seperti contoh di atas.

**Name**: `GITHUB_TOKEN`

**Value**: `1d172d8243bab24c197305604887b4a428a1914`

**Display value in build log**: `OFF`

> PERHATIAN!
> 
> Jangan meng-**ON**-kan "**Display value in build log**", karena akan ditampilkan pada verbose proses build.
> 
> Apabila kita set **OFF**, maka akan ditampilkan seperti ini
> 
> ```
> $ export GITHUB_TOKEN=[secure]
> ```
> 
> Tentunya hal ini lebih *secure*.

Setelah itu, tekan tombol <kbd>Add</kbd>.

![Gambar 8](https://i.postimg.cc/QNBdrTrP/gambar-07.png)

Nah, kalau tampilannya seperti di atas, artinya kita sudah berhasil mengeset environment variable GITHUB_TOKEN.

Sekedar info, saya tidak mengutak atik pengaturan **General** & **Auto Cancellation**.

![Gambar 9](https://i.postimg.cc/nrf55gxn/gambar-08.png)

Mantap! Konfigurasi pada Travis CI sudah selesai.

Sekarang, kalau teman-teman membuat commit baru dan melakukan push ke branch **source**,

```
$ git push -u origin source
```

Kita akan melihat Travis CI akan menjalankan proses build.

Kalau berhasil akan sepeti ini tampilannya.

![Gambar 10](https://i.postimg.cc/sxfPv49p/gambar-09.png)

![Gambar 11](https://i.postimg.cc/9f3GGhYX/gambar-10.png)

Perhatikan pada baris ke-320, kita dapat melihat pada akhir proses build, akan mendeploy hasil generate static site `_site/` di branch **master** ke GitHub Pages.

Selesai!

Selamat nge-Jekyll!!!


# Pesan Penulis

Catatan ini bukan merupakan tutorial, saya hanya ingin sharing tentang informasi yang saya dapat dan saya pergunakan selama membangun dan menulis Blog menggunakan Jekyll.

Maka dari itu, apabila teman-teman ingin mendapatkan penjelasan yang lebih baik, silahkan mengunjungin dokumentasi dari Jekyll, GitHub Pages dan Travis CI. Tentunya akan lebih *up to date* dari yang saya tulis di sini.

Saya rasa hanya ini yang dapat saya tuliskan saat ini.

Mudah-mudahan dapat bermanfaat untuk teman-teman.

Terima kasih.

(^_^)


# Referensi

1. [joshfrankel.me/blog/deploying-a-jekyll-blog-to-github-pages-with-custom-plugins-and-travisci](http://joshfrankel.me/blog/deploying-a-jekyll-blog-to-github-pages-with-custom-plugins-and-travisci/)
<br>Diakses tanggal: 2020/07/10

2. [docs.github.com/en/enterprise/2.14/user/articles/configuring-jekyll-plugins](https://docs.github.com/en/enterprise/2.14/user/articles/configuring-jekyll-plugins)
<br>Diakses tanggal: 2020/07/10

3. [Travis CI - GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/)
<br>Diakses tanggal: 2020/07/10

4. [Travis CI - Building a Ruby Project](https://docs.travis-ci.com/user/languages/ruby/)
<br>Diakses tanggal: 2020/07/10

5. [pages.github.com](https://pages.github.com/)
<br>Diakses tanggal: 2020/07/10

6. [jekyllrb.com](https://jekyllrb.com/)
<br>Diakses tanggal: 2020/07/10
