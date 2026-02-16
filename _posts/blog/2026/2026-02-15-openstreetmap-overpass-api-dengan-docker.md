---
layout: "post"
title: "OpenStreetMap Overpass API dengan Docker"
date: "2026-02-15 10:05"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-02-09-openstreetmap-overpass-api-dengan-docker"
author: "BanditHijo"
category: "blog"
tags: ["openstreetmap", "overpass", "overpassapi"]
description: "Overpass API adalah sebuah API yang memungkinkan untuk melakukan query terhadap data OpenStreetMap yang dapat digunakan untuk mencari POI (Point of Interest) pada radius tertentu dari lokasi yang didefinisikan. Pada artikel ini, saya akan mencatat langkah-langkah untuk menjalankan instance Overpass API menggunakan Docker."
---

## Apa itu Overpass API?

Overpass API adalah sebuah API yang memungkinkan untuk melakukan query terhadap data OpenStreetMap (OSM) yang dapat digunakan untuk mencari POI (Point of Interest) pada radius tertentu dari lokasi yang didefinisikan. Overpass API menggunakan bahasa query yang disebut Overpass QL. Dengan Overpass API, kita dapat melakukan query untuk mencari data OSM berdasarkan kriteria tertentu, seperti jenis POI, lokasi, dan lain-lain.


## Overpass API dengan Docker


### 1. Buat Docker Compose untuk Overpass API

Buat file `docker-compose.yml` dengan isi seperti ini,

```yaml
services:
  overpass:
    image: openzonedev/overpass-api:0.7.57.2
    container_name: osm-overpass
    restart: unless-stopped
    environment:
      OVERPASS_META: "yes"
      OVERPASS_MODE: "init"
      OVERPASS_PLANET_URL: file:///overpass/data/kalimantan-latest.osm.bz2
    volumes:
      - ./geofabrik/kalimantan-new.latest.bz2:/overpass/data/kalimantan-latest.osm.bz2:ro
      - overpass-data:/db
    expose:
      - "80"
    ports:
      - "8081:80"

volumes:
  overpass-data:
```


### 2. Persiapkan data OSM untuk Overpass API

Pada contoh di atas, saya menggunakan data OSM untuk wilayah Kalimantan yang saya unduh dari Geofabrik.

> INFO
>
> Overpass API membutuhkan file data OSM dalam format `.osm.bz2` untuk proses import data. \
> Saya akan merubah file `.osm.pbf` yang kita unduh dari Geofabrik menjadi format `.osm.bz2` menggunakan tool `osmium-tool`.

File `.osm.pbf` ini bisa didapatkan dari situs [Geofabrik](https://download.geofabrik.de/).

Setelah mengunduh file `.osm.pbf`, letakkan file tersebut di dalam direktori `geofabrik/` yang berada di root project. Buat direktori `geofabrik/` jika belum ada.

```
$ mkdir geofabrik
$ cd geofabrik
$ wget -c https://download.geofabrik.de/asia/indonesia/kalimantan-latest.osm.pbf
```

Tunggu proses download selesai, setelah itu pastikan file `.osm.pbf` sudah berada di dalam direktori `geofabrik/`.

Berikut adalah struktur direktori yang diharapkan setelah menambahkan file `.osm.pbf`:

```
geofabrik/
└── kalimantan-latest.osm.pbf
docker-compose.yml
```


#### 2.1 Konversi file `.osm.pbf` ke format `.osm.bz2`

Untuk mengkonversi file `.osm.pbf` ke format `.osm.bz2`, bisa menggunakan tool `osmium-tool`. Pastikan `osmium-tool` sudah terinstall di sistem. 

Jika belum, bisa menginstalnya dengan mengikuti petunjuk di [situs resmi osmium-tool](https://osmcode.org/osmium-tool/).

```
$ brew install osmium-tool
```

Setelah `osmium-tool` terinstall, jalankan perintah berikut untuk mengkonversi file `.osm.pbf` ke format `.osm.bz2`:

```
$ osmium cat geofabrik/kalimantan-latest.osm.pbf -o geofabrik/kalimantan-latest.osm.bz2
```

Tunggu proses konversi selesai, setelah itu pastikan file `.osm.bz2` sudah berada di dalam direktori `geofabrik/`.

Sip, sekarang file `.osm.bz2` sudah siap untuk digunakan dalam proses import data oleh Overpass API.


### 3. Jalankan Docker Compose

Setelah file `docker-compose.yml` sudah siap dan file data OSM dalam format `.osm.bz2` sudah berada di dalam direktori `geofabrik/`, jalankan perintah berikut untuk memulai Docker Compose:

```
$ docker-compose up -d
```

> PERHATIAN
>
> Untuk pertama kali menjalankan docker compose, Overpass API service akan melakukan proses import data dari file `.osm.bz2` ke dalam Overpass Data, proses ini membutuhkan waktu yang cukup lama, tergantung pada ukuran file `.osm.bz2` yang digunakan. Untuk file `kalimantan-latest.osm.bz2` yang berukuran 318 MB, proses import data bisa memakan waktu sekitar 30 menit hingga 1 jam.

Untuk melihat log dari container, bisa menggunakan perintah berikut:

```
$ docker compose logs overpass -f
```

Tunggu proses import data selesai. Biasanya akan muncul log seperti berikut ketika proses import data sudah selesai:

```
Overpass container initialization complete. Exiting.
```

Setelah proses import data selesai, Overpass API service sudah siap untuk digunakan. Overpass API bisa diakses melalui `http://localhost:8081/`.


### 4. Akses Overpass API


#### 4.1 /api/status

Untuk memastikan bahwa Overpass API service sudah berjalan dengan baik, coba akses endpoint `/api/status` untuk melihat status dari Overpass API service.

```
$ curl http://localhost:8081/api/status
```

Outputnya akan seperti ini,

```
Connected as: 3232252161
Current time: 2026-02-16T10:25:16Z
Rate limit: 0
```



#### 4.2 /api/interpreter

Setelah Overpass API service sudah siap, coba lakukan query untuk mencari data OSM berdasarkan kriteria tertentu.

Base URL nya seperti ini,

```
$ curl -X POST http://localhost:8081/api/interpreter
```

Outputnya akan seperti ini,

```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" lang="en"/>
  <title>OSM3S Response</title>
</head>
<body>

<p>The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.</p>
<p><strong style="color:#FF0000">Error</strong>: encoding error: Your input contains only whitespace. </p>

</body>
</html>
```

Nah, tinggal tambahkan query untuk mencari data OSM berdasarkan kriteria tertentu.

Gunakan juga header `Content-Type: application/x-www-form-urlencoded` untuk mengirim data query dalam format URL encoded.

Misalnya, untuk mencari semua POI dengan tag `amenity=restaurant` di wilayah Kalimantan, kita bisa menggunakan query berikut:

```
$ curl -X POST http://localhost:8081/api/interpreter -H "Content-Type: application/x-www-form-urlencoded" --data "data=[out:json];node[amenity=cafe](around:5000, -1.2286365, 116.8941987);out;"
```

Outputnya dalam bentuk JSON akan seperti ini,

```json
{
  "version": 0.6,
  "generator": "Overpass API 0.7.57.2 48842a1b",
  "osm3s": {
    "timestamp_osm_base": "2026-01-18T20:51:44Z",
    "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
  },
  "elements": [
    {
      "type": "node",
      "id": 9898980886,
      "lat": -1.2420011,
      "lon": 116.8730133,
      "tags": {
        "amenity": "cafe",
        "name": "Excelso - Living Plaza"
      }
    },
    {
      "type": "node",
      "id": 9899039726,
      "lat": -1.2437437,
      "lon": 116.8607824,
      "tags": {
        "amenity": "cafe",
        "name": "Excelso Cafe Mall Fantasy"
      }
    },
    {
      "type": "node",
      "id": 9899398634,
      "lat": -1.2449160,
      "lon": 116.8603869,
      "tags": {
        "amenity": "cafe",
        "name": "CPM Coffee Shop Balikpapan Baru - Damai"
      }
    },
    {
      "type": "node",
      "id": 9899400587,
      "lat": -1.2452571,
      "lon": 116.8597143,
      "tags": {
        "amenity": "cafe",
        "name": "Balgas Cafe - Damai"
      }
    },
    {
      "type": "node",
      "id": 9899406395,
      "lat": -1.2452690,
      "lon": 116.8606450,
      "tags": {
        "amenity": "cafe",
        "name": "Kopi Lawe - Damai Baru"
      }
    },
    {
      "type": "node",
      "id": 9900996432,
      "lat": -1.2511856,
      "lon": 116.8696109,
      "tags": {
        "amenity": "cafe",
        "branch": "Ruko Jalan MT Haryono",
        "brand": "Kopi Kenangan",
        "brand:wikidata": "Q97221992",
        "cuisine": "coffee_shop",
        "diet:halal": "only",
        "name": "Kopi Kenangan",
        "takeaway": "yes"
      }
    },
    {
      "type": "node",
      "id": 10036595776,
      "lat": -1.2460153,
      "lon": 116.8594667,
      "tags": {
        "amenity": "cafe",
        "name": "Dialog Cafe - Balikpapan Baru"
      }
    }
  ]
}
```


### 5. Stop Docker Compose

Jika sudah selesai menggunakan Overpass API service, jangan lupa untuk menghentikan Docker Compose dengan perintah berikut:

```
$ docker-compose download
```


## Kesimpulan

Saya telah mencatat langkah-langkah untuk menjalankan instance Overpass API menggunakan Docker. Dengan mengikuti langkah-langkah di atas, kita dapat dengan mudah menjalankan Overpass API service di lingkungan lokal kita dan melakukan query terhadap data OpenStreetMap untuk mencari POI berdasarkan kriteria tertentu.


## Referensi

1. [https://overpass-api.de/](https://overpass-api.de/) \
  Diakses tanggal: 2026-02-15
1. [https://osmcode.org/osmium-tool/](https://osmcode.org/osmium-tool/) \
  Diakses tanggal: 2026-02-15
