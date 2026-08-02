---
layout: "post"
title: "Berkenalan dengan AsciiDoc"
date: "2026-01-18 12:37"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-01-18-berkenalan-dengan-asciidoc"
author: "BanditHijo"
category: "blog"
tags: ["asciidoc"]
description: "AsciiDoc adalah bahasa markup teks ringan yang digunakan untuk menulis dokumentasi, artikel, buku, dan konten lainnya. Mirip dengan Markdown, AsciiDoc memungkinkan penulis untuk membuat dokumen yang mudah dibaca dan ditulis dalam format teks biasa, yang kemudian dapat dikonversi ke berbagai format output seperti HTML, PDF, dan ePub."
---

## Apa itu AsciiDoc?

{{ page.description }}

> INFO
> 
> "*AsciiDoc is a plain text markup language for writing technical content. It’s packed with semantic elements and equipped with features to modularize and reuse content. AsciiDoc content can be composed using a text editor, managed in a version control system, and published to multiple output formats.*" - AsciiDoc.org


## Awal Mula Bertemu AsciiDoc

Awal mula saya bertemu dengan Markup Language ini adalah ketika saya membeli sebuah ebook berjudul "Pemrogram Rp 100 Juta: Panduan Bagi Pemrogram Untuk Menggapai Harga, Tahta, dan Kemasyhuran" oleh Arjuna Sky Kok pada tahun 2020.

Saat itu kami diberikan akses ke private repositori GitHub tempat buku tersebut disimpan, dan saya menemukan bahwa buku tersebut ditulis menggunakan AsciiDoc. Saat itu saya berfikir, "Wah! Keren sekali bisa membuat sebuah dokumen atau buku menggunakan bahasa markup seperti ini." -- Saat itu saya belum mengenal LaTeX. Karena yang saya tahu, untuk membuat dokumen atau buku perlu menggunakan aplikasi pengolah kata seperti Microsoft Word atau LibreOffice Writer atau dengan aplikasi desktop publishing seperti Adobe InDesign atau Scribus.

Dikemudian hari, ternyata saya cukup sering menemukan proyek-proyek open source yang menggunakan AsciiDoc untuk dokumentasi mereka, seperti proyek-proyek yang menggunakan Asciidoctor sebagai tool untuk mengkonversi dokumen AsciiDoc ke format lain. Beberapa diantaranya seperti:

1. [GitHub: Book: Api on Rails 6](https://github.com/madeindjs/api_on_rails) (AsciiDoc + Asciidoctor)
2. [FedoraProject Docs: GitLab: Fedora Linux Documentation Home](https://gitlab.com/fedora/docs/fedora-linux-documentation/release-docs-home) (AsciiDoc + Antora + Asciidoctor)

> PERTANYAAN
> 
> **Apa perbedaan AsciiDoc dan Asciidoctor?**
> 
> AsciiDoc adalah markup language yang digunakan untuk menulis dokumen, sedangkan Asciidoctor adalah tool atau perangkat lunak yang digunakan untuk mengkonversi dokumen AsciiDoc ke berbagai format output seperti HTML, PDF, ePub, dan lainnya.


## Apakah tidak cukup dengan Markdown?

Markdown memang sudah sangat populer dan banyak digunakan untuk menulis dokumentasi, artikel, dan konten lainnya. Namun, AsciiDoc menawarkan beberapa kelebihan dibandingkan Markdown, terutama untuk dokumentasi teknis yang kompleks. Beberapa kelebihan AsciiDoc dibandingkan Markdown antara lain:

1. **Fitur yang Lebih Lengkap** \
  AsciiDoc memiliki fitur yang lebih lengkap dibandingkan Markdown, seperti dukungan untuk tabel, blok kode dengan penyorotan sintaks, catatan kaki, dan lainnya.
2. **Mudah Dibaca dan Ditulis** \
  AsciiDoc dirancang agar mudah dibaca dalam format teks biasa, sehingga penulis dapat fokus pada konten tanpa terganggu oleh format yang rumit.
3. **Fleksibilitas Format Output** \
  AsciiDoc dapat dikonversi ke berbagai format output seperti HTML, PDF, ePub, dan lainnya menggunakan tool seperti Asciidoctor.
4. **Dukungan untuk Modularisasi Konten** \
  AsciiDoc mendukung modularisasi konten, sehingga penulis dapat mengelola dokumen yang besar dengan lebih efisien.
5. **Integrasi dengan Development Tool** \
  AsciiDoc sering digunakan dalam proyek perangkat lunak untuk dokumentasi, dan dapat diintegrasikan dengan development tool seperti Git dan CI/CD.


## Contoh Dokumen AsciiDoc

```markdown
= Title of the document
Rizqi Nur Assyaufi <bandithijo@example.mail>
:source-highlighter: rouge
:icons: font
:toc: macro
:toc-title:

== Table of contents

toc::[]

```

![Gambar 1]({{ page.assets}}/gambar_01.png)

Gambar 1. Table of Contents dan Judul Dokumen

```markdown
== Section

Hi, my name is {author}. I'm a Backend Software Engineer at Small Startup footnote:[Startup is a new company, often technology-focused, designed for rapid growth by validating a scalable business model, seeking external funding (like venture capital), and aiming to disrupt existing markets with innovative products or services — Wikipedia] in Jakarta that are working remotely from Balikpapan. Feel free to ask me anything about Software Develop-thing or Linux-thing on {email}.

*This is bold text*

_This is cursive text_

`This is mono text`

```

![Gambar 2]({{ page.assets}}/gambar_02.png)

Gambar 2. Paragraf dengan format teks

```markdown
== List

Docker allows to package the full stack in a container:

* OS
** Windows
** Ubuntu
* JVM,
* App server
* Application with its configuration
```

![Gambar 3]({{ page.assets}}/gambar_03.png)

Gambar 3. Nested list

```markdown
== Block quotes

[quote, Ben Parker, Spiderman Movie]
____
With great power comes great responsibility.
____

```

![Gambar 4]({{ page.assets}}/gambar_04.png)

Gambar 4. Block quote

```markdown

== Defining cross references

You can assign meta data to a block. Here’s an example of a quote block that includes all types of metadata:

[source, ruby, linenums]
----
class Cat <1>
  def meow <2>
    puts "Meow!" <3>
  end
end

cat = Cat.new <4>
cat.meow <5>
----
<1> class definition
<2> method definition
<3> output statement
<4> creating an instance of the class
<5> calling the method
```

![Gambar 5]({{ page.assets}}/gambar_05.png)

Gambar 5. Cross reference in code block

```markdown
== Admonition paragraphs and blocks for warnings, notes and tips

An admonition paragraph draws the reader’s attention to certain information. It can be defined by a predefined label at the beginning of the paragraph or as a block.

Here are the other built-in admonition types:

NOTE: Some additional info...

TIP: Pro tip...

IMPORTANT: Don't forget...

WARNING: Watch out for...

CAUTION: Ensure that...

```

![Gambar 6]({{ page.assets}}/gambar_06.png)

Gambar 6. Admonition blocks

```markdown
Hi, my name is {author}. I'm a Backend Software Engineer at Small Startup footnote:[Startup is a new company, often technology-focused, designed for rapid growth by validating a scalable business model, seeking external funding (like venture capital), and aiming to disrupt existing markets with innovative products or services — Wikipedia] in Jakarta that are working remotely from Balikpapan. Feel free to ask me anything about Software Develop-thing or Linux-thing on {email}.
```

![Gambar 7]({{ page.assets}}/gambar_07.png)

Gambar 7. Footnote example

Lalu dengan menggunakan tool Asciidoctor, dokumen tersebut dapat dieksport ke dalam format PDF.

```
$ asciidoctor-pdf sample_document.adoc
```

Maka akan menghasilkan file `sample_document.pdf` yang berisi dokumen yang sudah terformat dengan baik.

![Gambar 8]({{ page.assets}}/gambar_08.png)

Gambar 8. Hasil eksport dokumen ke format PDF halaman 1

![Gambar 9]({{ page.assets}}/gambar_09.png)

Gambar 9. Hasil eksport dokumen ke format PDF halaman 2

Dapat dilihat dari contoh-contoh di atas, dokumen yang dihasilkan memiliki format yang rapi dan terlihat profesional.

Sintaks AsciiDoc juga mendukung berbagai elemen seperti judul, paragraf, list, blok kode, quote, cross reference, footnote, table of contents, dan blok peringatan (admonition blocks) untuk menyoroti informasi penting.

Dokumen di atas hanyalah contoh sederhana dari apa yang dapat dilakukan dengan AsciiDoc. Untuk membuat menjadi layout buku juga tinggal menggunakan dokumen type book.


## Komentar Penulis

Bukan saya alergi dengan WYSIWYG editor seperti Ms.Word atau LO Writer, tapi "menurut keyakinan saya", menulis dokumen teknis lebih efisien dengan AsciiDoc. Kita tinggal mengisi konten saja dengan notasi-notasi (sintaks) yang sesuai, processor yang akan merender menjadi format yang sesuai. Tidak perlu formatting text manual.

Kalau membuat dokumen teknis itu 50% nya menulis konten dan 50% nya lagi formatting text. Maka dengan AsciiDoc, kita bisa 90% fokus menulis kontent dan 10% nya konfigurasi template awal.

Bahkan jika konfigurasi templatenya sudah jadi, "menurut keyakinan saya" malah bisa 100% tinggal menulis konten saja.


## Penutup

Dengan fitur-fitur yang lengkap dan fleksibilitasnya, AsciiDoc menjadi pilihan yang menarik untuk menulis dokumentasi teknis.

Untuk informasi lebih lanjut tentang AsciiDoc, Anda dapat mengunjungi situs resminya atau dokumentasi Asciidoctor yang saya sertakan pada bagian referensi di bawah.


## Referensi

1. [https://asciidoc.org/](https://asciidoc.org/) \
  Tanggal diakses: 2026-01-18

1. [https://docs.asciidoctor.org/asciidoc/latest/](https://docs.asciidoctor.org/asciidoc/latest/) \
  Tanggal diakses: 2026-01-18

1. [https://asciidoctor.org/](https://asciidoctor.org/) \
  Tanggal diakses: 2026-01-18
