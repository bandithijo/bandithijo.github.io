---
layout: "post"
title: "Menggunakan Nominatim Self-Hosted pada Geocoder Gem"
date: "2026-02-08 23:22"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-02-08-menggunakan-nominatim-self-hosted-pada-geocoder-gem"
author: "BanditHijo"
category: "blog"
tags: ["openstreetmap", "nominatim", "geocoder", "geocoding", "rails"]
description: "Pada artikel ini, saya akan mencatat langkah-langkah untuk mengonfigurasi Geocoder gem di aplikasi Ruby on Rails agar menggunakan instance Nominatim self-hosted sebagai geocoding service lookup."
---

## Pendahuluan

Pada catatan sebelumnya "[OpenStreetMap Nominatim (Geocoding Machine) dengan Docker]({{ site.url }}/blog/openstreetmap-nominatim-dengan-docker)" saya telah membahas cara menjalankan instance Nominatim menggunakan Docker. Pada artikel ini, saya akan mencatat langkah-langkah untuk mengonfigurasi Geocoder gem di aplikasi Ruby on Rails agar menggunakan instance Nominatim self-hosted sebagai geocoding service lookup.


## Konfigurasi Geocoder Gem

Jika sebelumnya sudah memiliki config file untuk Geocoder di `config/initializers/geocoder.rb`, buka file tersebut.

Dan tambahkan atau modifikasi konfigurasi seperti ini,

```ruby
!filename: config/initializers/geocoder.rb
Geocoder.configure(
  # Geocoding options
  # timeout: 3,                 # geocoding service timeout (secs)
  # lookup: :nominatim,         # name of geocoding service (symbol)
  # ip_lookup: :ipinfo_io,      # name of IP address geocoding service (symbol)
  # language: :en,              # ISO-639 language code
  # use_https: false,           # use HTTPS for lookup requests? (if supported)
  # http_proxy: nil,            # HTTP proxy server (user:pass@host:port)
  # https_proxy: nil,           # HTTPS proxy server (user:pass@host:port)
  # api_key: nil,               # API key for geocoding service
  # cache: nil,                 # cache object (must respond to #[], #[]=, and #del)

  # Exceptions that should not be rescued by default
  # (if you want to implement custom error handling);
  # supports SocketError and Timeout::Error
  # always_raise: [],

  # Calculation options
  # units: :km,                 # :km for kilometers or :mi for miles
  # distances: :linear          # :spherical or :linear

  # Cache configuration
  # cache_options: {
  #   expiration: 2.days,
  #   prefix: 'geocoder:'
  # }

  use_https: false,
  lookup: :nominatim,
  nominatim: {
    host: localhost:8080
  },
)
```

Saya menggunakan `localhost:8080` karena pada catatan sebelumnya saya menjalankan Nominatim di Docker dengan port mapping `8080:8080` dan karena di localhost sehingga tidak menggunakan https.

Bisa juga disesuaikan dengan host dan port tempat Nominatim dijalankan. Misal, saya sudah punya service yang saya jalankan di `https://nominatim.bandithijo.dev`, maka konfigurasi `nominatim` akan seperti ini,

```ruby
!filename: config/initializers/geocoder.rb
Geocoder.configure(
  use_https: true,
  lookup: :nominatim,
  nominatim: {
    host: 'nominatim.bandithijo.dev',
  },
```

Dengan begini saya sudah berhasil mengonfigurasi Geocoder gem untuk menggunakan Nominatim self-hosted sebagai geocoding service lookup. Selanjutnya, saya bisa menggunakan Geocoder gem untuk melakukan geocoding dan reverse geocoding pada aplikasi Ruby on Rails saya dengan menggunakan instance Nominatim yang saya jalankan sendiri.

## Pengujian

Untuk menguji apakah konfigurasi sudah benar, bisa dilakukan di Rails console.

```
$ rails console
```

Setup logger agar menampilkan request dan response dari Geocoder gem untuk mempermudah proses debugging,

```ruby
irb(main):001> Geocoder.configure(logger: Logger.new(STDOUT))
```

Outputnya,

```ruby
=>
{:timeout=>3,
 :lookup=>:nominatim,
 :ip_lookup=>:ipinfo_io,
 :language=>:en,
 :http_headers=>{},
 :use_https=>true,
 :http_proxy=>nil,
 :https_proxy=>nil,
 :api_key=>nil,
 :basic_auth=>{},
 :logger=>
  #<Logger:0x000000012837e6b8
   @default_formatter=#<Logger::Formatter:0x0000000124a709e8 @datetime_format=nil>,
   @formatter=nil,
   @level=0,
   @level_override={},
   @logdev=
    #<Logger::LogDevice:0x0000000128273980
     @binmode=false,
     @dev=#<IO:<STDOUT>>,
     @filename=nil,
     @mon_data=#<Monitor:0x0000000124a70970>,
     @mon_data_owner_object_id=71700,
     @reraise_write_errors=[],
     @shift_age=nil,
     @shift_period_suffix=nil,
     @shift_size=nil,
     @skip_header=false>,
   @progname=nil>,
 :kernel_logger_level=>2,
 :always_raise=>[],
 :units=>:km,
 :distances=>:linear,
 :cache=>nil,
 :cache_prefix=>nil,
 :cache_options=>{:prefix=>"geocoder:", :expiration=>nil},
 :nominatim=>{:host=>"osm.bintangdigitalasia.com/nominatim"}}
```

Dapat dilihat, bahwa konfigurasi `nominatim` untuk `host` sudah sesuai dengan yang diinginkan.

Lalu lakukan geocoding pada alamat tertentu,

### Forward Search

```ruby
irb(main):002> Geocoder.search("Jakarta")
```

Outputnya,

```ruby
D, [2026-02-09T00:02:12.686252 #30316] DEBUG -- : Geocoder: HTTP request being made for http://localhost:8080/search?accept-language=en&addressdetails=1&format=json&q=Jakarta
=>
[#<Geocoder::Result::Nominatim:0x0000000127219df0
  @cache_hit=nil,
  @data=
   {"place_id"=>3204450,
    "licence"=>"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type"=>"relation",
    "osm_id"=>6362934,
    "lat"=>"-6.1754049",
    "lon"=>"106.8271680",
    "class"=>"boundary",
    "type"=>"administrative",
    "place_rank"=>8,
    "importance"=>0.2933433333333333,
    "addresstype"=>"city",
    "name"=>"Special Capital Region of Jakarta",
    "display_name"=>"Special Capital Region of Jakarta, Java, Indonesia",
    "address"=>
     {"city"=>"Special Capital Region of Jakarta",
      "ISO3166-2-lvl4"=>"ID-JK",
      "region"=>"Java",
      "ISO3166-2-lvl3"=>"ID-JW",
      "country"=>"Indonesia",
      "country_code"=>"id"},
    "boundingbox"=>["-6.3744575", "-4.9993635", "106.3146732", "106.9739750"]}>]
```

### Reverse Search

```ruby
irb(main):003> Geocoder.search([-1.2379, 116.8529])
```

Outputnya,

```ruby
D, [2026-02-09T00:04:49.941967 #30316] DEBUG -- : Geocoder: HTTP request being made for http://locahost:8080/reverse?accept-language=en&addressdetails=1&format=json&lat=-1.2379&lon=116.8529
=>
[#<Geocoder::Result::Nominatim:0x0000000125da17b0
  @cache_hit=nil,
  @data=
   {"place_id"=>119266,
    "licence"=>"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type"=>"way",
    "osm_id"=>109864339,
    "lat"=>"-1.2378944",
    "lon"=>"116.8529396",
    "class"=>"highway",
    "type"=>"residential",
    "place_rank"=>26,
    "importance"=>0.0533433333333333,
    "addresstype"=>"road",
    "name"=>"Jalan Bubutan",
    "display_name"=>"Jalan Bubutan, Gunung Samarinda, Balikpapan Utara, Balikpapan, East Kalimantan, 76125, Indonesia",
    "address"=>
     {"road"=>"Jalan Bubutan",
      "village"=>"Gunung Samarinda",
      "city_district"=>"Balikpapan Utara",
      "city"=>"Balikpapan",
      "state"=>"East Kalimantan",
      "ISO3166-2-lvl4"=>"ID-KI",
      "postcode"=>"76125",
      "country"=>"Indonesia",
      "country_code"=>"id"},
    "boundingbox"=>["-1.2383814", "-1.2355025", "116.8482510", "116.8530576"]}>]
irb(main):003>
```


## Kesimpulan

Dengan mengikuti langkah-langkah di atas, saya berhasil mengonfigurasi Geocoder gem untuk menggunakan Nominatim self-hosted sebagai geocoding service lookup. Saya juga berhasil melakukan geocoding dan reverse geocoding menggunakan instance Nominatim yang saya jalankan sendiri. Dengan menggunakan Nominatim self-hosted, saya memiliki kontrol penuh atas data geocoding dan dapat menghindari batasan penggunaan yang mungkin diterapkan oleh layanan geocoding pihak ketiga.


## Referensi

1. [https://github.com/alexreisner/geocoder](https://github.com/alexreisner/geocoder) \
  Diakses tanggal: 2026-02-08
