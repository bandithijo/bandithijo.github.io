---
layout: "post"
title: "Kustomisasi IRB Prompt (Pry)"
date: "2020-09-13 09:43"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-09-13-custom-irb-prompt"
author: "BanditHijo"
category: "blog"
tags: ["ruby", "irb", "pry"]
description: "Mengkonstumisasi IRB prompt agar menjadi lebih sederhana (sesuai degan yang kita inginkan)."
---

# Latar Belakang

Sebagai pemrogram yang menggunakan bahasa Ruby, pasti kita cukup sering berinteraksi dengan IRB (*Interactive Ruby Shell*).

Namun, saya tidak begitu menyukai **prompt** default dari IRB, karena cukup panjang.

```
irb(main):001:0> _
```

Sehingga, apabila digunakan, dalam banyak baris, baru akan terlihat "cukup mengganggu" --subjektif saya.

```
irb(main):001:0> 1 + 2
=> 3
irb(main):002:0> class Foo
irb(main):003:1>  def foo
irb(main):004:2>    print 1
irb(main):005:2>  end
irb(main):006:1> end
=> nil
```

Saya lebih menyukai prompt yang minimalis saja.

Seperti ini.

```
>> _
```


# Solusi

Kita dapat meng-*override* bentuk dari IRB prompt dengan menambahkan beberapa konfigurasi yang kita tulis pada file `~/.irbrc`.

Kalau file tersebut belum ada, buat dan tambahkan seperti baris di bawah.


## 1. Simple &gt;&gt;

```config
!filename: $HOME/.irbrc
IRB.conf[:PROMPT][:CUSTOM] = {
  :PROMPT_I => ">> ",
  :PROMPT_S => "%l> ",
  :PROMPT_C => ".. ",
  :PROMPT_N => ".. ",
  :RETURN   => "=> %s\n"
}
IRB.conf[:PROMPT_MODE] = :CUSTOM
IRB.conf[:AUTO_INDENT] = true
```

Hasilnya akan seperti ini.

```
>> 1 + 1
=> 2
.. class Foo
..   def foo
..     print 1
..   end
>> end
=> :foo
>> _
```


## 2. Line Number [01]&gt;&gt;

Kita juga dapat mengkostumisasi dengan menambahkan beberapa spesial string yang disediakan.

```
%N    # command name which is running
%m    # to_s of main object (self)
%l    # type of string(", ', /, ]), `]' is inner %w[...]
%NNi  # indent level. NN is digits and means as same as printf("%NNd").
%NNn  # line number.
```

Misal, Untuk memberikan Line Number.

```config
!filename: $HOME/.irbrc
IRB.conf[:PROMPT][:CUSTOM] = {
  :PROMPT_I => "[%02n]>> ",
  :PROMPT_S => "[%02n]%l> ",
  :PROMPT_C => "[%02n].. ",
  :PROMPT_N => "[%02n].. ",
  :RETURN => "=> %s\n"
}
IRB.conf[:PROMPT_MODE] = :CUSTOM
IRB.conf[:AUTO_INDENT] = true
```

`%02n` adalah jumlah digit dari line number `01`.

Kalau ingin 3 digit, berarti `%03n` => `001`.

Hasilnya,

```
[01]>> 1 + 1
=> 2
[02].. class Foo
[03]..   def foo
[04]..     print 1
[05]..   end
[06]>> end
=> :foo
[07]>> _
```

Nah, silahkan teman-teman berkreasi sendiri apabila ingin prompt yang berbeda.

Saya lebih suka menggunakan yang sederhan seperti ini.


# Tips


## 1. Pry (IRB with Steroid)

Sebelum versi Ruby 2.7. IRB memiliki tampilan yang flat tanpa sintax highlighting. Namun, IRB sudah di-*facelift* pada versi 2.7 sehingga memiliki sintaks color yang sangat mempermudah.

Nah, sebelum IRB mendapatkan *facelift* tersebut, saya sudah lebih dahulu menggunakan alternatif dari IRB, yaitu [**Pry**](https://github.com/pry/pry).

![Gambar 1](https://i.postimg.cc/YqMDyBvP/gambar-01.png)

Pry sudah lebih dahulu menggunakan sintax highlighting dan juga memiliki beberapa fitur-fitur yang dapat mempermudah pekerjaan. Beberapa fitur dari Pry dapat kalian lihat [di sini](https://github.com/pry/pry#key-features).

Instalasinya juga sangat mudah.

```
$ gem install pry
```

Apabila ingin meng-override IRB agar saat kita panggil, langsung menjalankan Pry.

Tambahkan baris berikut pada `~/.irbrc`.

```config
!filename: $HOME/.irbrc
# ...
# ...

# Force IRB to use Pry
begin
  require "pry"
  Pry.start
  exit
rescue LoadError => e
  warn "=> Unable to load pry"
end
```

Sekarang, saat kita jalankan IRB di Terminal.

```
$ irb
```

```
[1] pry(main)> _
```

Kalau ingin sedikit kostumisasi Pry pormpt, dapat melakukannya dengan membuat file `~/.pryrc`.

Bisa, isikan seperti ini, misalnya:

```config
!filename: $HOME/.pryrc
Pry.config.prompt = Pry::Prompt.new(
  "custom",
  "my custom prompt",
  [ proc { ">> " }, proc { ".. " }]
)
```

Hasilnya,

```
>> 1 + 1
=> 2
>> class Foo
..   def foo
..     print 1
..   end
.. end
=> :foo
>> _
```

Jika ingin lebih jauh mengetahui tentang Pry, kalian dapat mengunjuni GitHub repositorinya, [di sini](https://github.com/pry/pry).


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)


# Referensi

1. [stackoverflow.com/a/6041003/4862516](https://stackoverflow.com/a/6041003/4862516) \
   Diakses tanggal: 2020/09/13

1. [ruby-doc.org/stdlib-2.7.1/libdoc/irb/rdoc/IRB.html](https://ruby-doc.org/stdlib-2.7.1/libdoc/irb/rdoc/IRB.html) \
   Diakses tanggal: 2020/09/13

1. [rubyguides.com/2018/12/what-is-a-repl-in-ruby/](https://www.rubyguides.com/2018/12/what-is-a-repl-in-ruby/) \
   Diakses tanggal: 2020/09/13

1. [blog.joshsoftware.com/2020/01/20/making-your-rails-console-interesting/](https://blog.joshsoftware.com/2020/01/20/making-your-rails-console-interesting/) \
   Diakses tanggal: 2020/09/13

1. [github.com/pry/pry](https://github.com/pry/pry) \
   Diakses tanggal: 2020/09/13
