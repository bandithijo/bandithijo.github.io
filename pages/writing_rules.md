---
layout: 'page'
title: 'Writing Rules'
author: 'BanditHijo'
permalink: '/writing-rules/'
assets: "/assets/images/banner"
---

This page provides guidelines for writing blog posts on our website.

All blog posts should adhere to the following formatting and style guidelines. Please follow these rules to ensure consistency and quality across all articles.

Following CommonMark Markdown specifications: [https://commonmark.org/help/](https://commonmark.org/help/)

<br>
# Front Matter

Use the following front matter template for all blog posts.

```yaml
---
layout: "post"
title: "Your Post Title Here"
date: "YYYY-MM-DD HH:MM"
permalink: "/blog/:title"
assets: "/assets/posts/blog/YYYY/YYYY-MM-DD-your-post-title-here"
author: "Your GitHub Username"
category: "blog"
tags: ["tag1", "tag2"]
description: "A brief description of your post for SEO purposes."
---
```

<br>
# Headings

Always start with H2 headings for main sections. Use H3 and H4 for subsections as needed. Avoid using H1 headings within the content. Because the page title is already an H1. The good SEO practice is to have only one H1 per page.

Headings will automatically creates a table of contents for the post.

```
## This is an H2 Heading

### This is an H3 Heading

#### This is an H4 Heading
```

## This is an H2 Heading

### This is an H3 Heading

#### This is an H4 Heading

<br>
# Paragraphs

Use a single blank line to separate paragraphs.

```markdown
Ini adalah contoh menulis sebuah paragraf.
Dengan dua buah kalimat di dalamnya.

Ini adalah contoh menulis sebuah paragraf lain. Dengan tiga buah kalimat di dalamnya. Keren bukan.
```

Ini adalah contoh menulis sebuah paragraf.
Dengan dua buah kalimat di dalamnya.

Ini adalah contoh menulis sebuah paragraf lain. Dengan tiga buah kalimat di dalamnya. Keren bukan.

<br>
# Text Formatting

Use the following syntax for text formatting.

```markdown
**Bold Text**

*Italic Text*

_Another Italic Text_

***Bold and Italic Text***

**_Another Bold and Italic Text_**

~~Strikethrough Text~~
```

**Bold Text**

*Italic Text*

_Another Italic Text_

***Bold and Italic Text***

**_Another Bold and Italic Text_**

~~Strikethrough Text~~

<br>
# Bulleted & Numbered Lists

Use the following syntax for creating lists.

## Numbered List

```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

<br>
Another way to create numbered lists is by using `1.` for all items.

```markdown
1. First item
1. Second item
1. Third item
```

1. First item
1. Second item
1. Third item

## Bulleted List

```markdown
- First items
- Second items
- Third items
```

- First items
- Second items
- Third items

## Nested Lists

```markdown
1. First items
  - Subitem A
  - Subitem B
2. Second items
  - Subitem C
  - Subitem D
```

1. First items
  - Subitem A
  - Subitem B
2. Second items
  - Subitem C
  - Subitem D

<br>
# Codes

## Block Code

Use triple backticks (```) to create code blocks. Specify the language for syntax highlighting.

<pre><code>```ruby
def hello_world
  puts "Hello, world!"
end

hello_world
```
</code></pre>

```ruby
def hello_world
  puts "Hello, world!"
end

hello_world
```

To include a filename above the code block, use the following format.

Put the `!filename: your_filename` line after the opening triple backticks.

<pre><code>```ruby
!filename: hello_world.rb
def hello_world
  puts "Hello, world!"
end

hello_world
```
</code></pre>

<span class="relative top-3 font-bold">hello_world.rb</span>
```ruby
def hello_world
  puts "Hello, world!"
end

hello_world
```

## Inline Code

Use single backtick (`) to highlight inline code within a sentence.

```markdown
Untuk mencetak "Hello, world!" di Ruby, gunakan method `puts`.
```

Untuk mencetak "Hello, world!" di Ruby, gunakan method `puts`.

<br>
# Links

Use the following format to create links.

```markdown
Ini adalah contoh [Link Text](https://example.com).
```

Ini adalah contoh [Link Text](https://example.com).

<br>
# Images & Files

Use the following format to include images or files.

```markdown
![Gambar 1]({% raw %}{{ page.assets }}{% endraw %}/about_bandithijo.png)
```

![Gambar 1]({{ page.assets }}/about_bandithijo.png)

<br>
To add a caption or description below the image, use the following format.

```markdown
![Gambar 1]({% raw %}{{ page.assets }}{% endraw %}/about_bandithijo.png)

Gambar 1. Deskripsi gambar di sini.
```

![Gambar 1]({{ page.assets }}/about_bandithijo.png)

Gambar 1. Deskripsi gambar di sini.


<br>
# Blockquotes

## Standard

```markdown
> Ini adalah contoh Blockquote standard.
```

> Ini adalah contoh Blockquote standard.

## Info

```markdown
> INFO
> 
> Ini adalah contoh Blockquote dengan label INFO.
```

> INFO
> 
> Ini adalah contoh Blockquote dengan label INFO.

## Perhatian

```markdown
> PERHATIAN
> 
> Ini adalah contoh Blockquote dengan label PERHATIAN.
```

> PERHATIAN
> 
> Ini adalah contoh Blockquote dengan label PERHATIAN.

## Tips

```markdown
> TIPS
> 
> Ini adalah contoh Blockquote dengan label TIPS.
```

> TIPS
> 
> Ini adalah contoh Blockquote dengan label TIPS.

## Note

```markdown
> NOTE
> 
> Ini adalah contoh Blockquote dengan label NOTE.
```

> NOTE
> 
> Ini adalah contoh Blockquote dengan label NOTE.

## Pertanyaan

```markdown
> PERTANYAAN
> 
> Ini adalah contoh Blockquote dengan label PERTANYAAN.
```

> PERTANYAAN
> 
> Ini adalah contoh Blockquote dengan label PERTANYAAN.
