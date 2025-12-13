---
layout: "post"
title: "Membuat Footer Stay on Bottom but Not Fixed pada Bootstrap"
date: "2020-12-05 14:41"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-12-05-footer-stay-on-bottom-but-not-fixed-bootstrap"
author: "BanditHijo"
category: "blog"
tags: ["bootstrap", "css", "html"]
description: "Footer yang menempel pada body content memang mengesalkan. Terutama bila content masih sedikit. Maka footer akan menempel pada body dengan sangat manja. Catatan ini adalah solusi bagaimana agar footer tetap berada di bagian paling bawah dari halaman meskipun content yang tersedia masih sedikit."
---

## Latar Belakang

Kalian pasti pernah melihat Footer yang manja di sebuah website.

Kira-kira seperti ini contohnya.

![Gambar 1](https://i.postimg.cc/RFGxYSgJ/gambar-01.png)

Gambar 1. Footer yang menempel pada bagian bawah body

Perhatikan kotak berwarna merah.

Footer ini sangat manja karena menempel pada post body.

Saya ingin membuat Footer yang mandiri. Yang akan selalu berada di bagian bawah layar, meskipun body post tidak sebanyak tinggi layar.

Namun, saya juga tidak ingin membuat Footer ini terlalu keras kepala (Fixed), sehingga tetap berada di bawah layar meskipun post content sudah banyak.

Idealnya, Footer yang saya inginkan seperti ini.

![Gambar 2](https://i.postimg.cc/pdHNXh7n/gambar-02.png)

Gambar 2. Footer yang menempel manja pada bagian bawah halaman

Meskipun post content hanya sedikit, Footer tetap berada di bagian bawah layar. Dan apabila post content sudah banyak, Footer akan terdorong menghilang bersama post content yang paling bawah.


## Implementasi

Markup HTML nya seperti ini polanya.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Footer Anti Manja</title>
  </head>

  <body class="d-flex flex-column">

    <div id="content">
      ...
      ...
    </div>

    <footer id="footer">
      ...
      ...
    </footer>

  </body>
</html>
```

Style nya seperti ini.

```css
html,
body {
  height: 100%;
}

#content {
  flex: 1 0 auto;
}

#footer {
  flex-shrink: none;
}
```


## Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)
