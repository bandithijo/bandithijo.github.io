---
layout: "post"
title: "Menggabungkan Beberapa Sub-Region Geofabrik"
date: "2026-02-23 01:46"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-02-23-menggabungkan-beberapa-sub-region-geofabrik"
author: "BanditHijo"
category: "blog"
tags: ["openstreetmap", "geofabrik"]
description: "Jika data geofabrik untuk Indonesia terlalu besar dan hanya memerlukan data sub-region tertentu, misal: pulau Sumatra, Java, dan Kalimantan. Maka tiga data sub-region tersebut dapat di-merger menjadi satu file .osm.pbf."
---

## Pendahuluan

Saya tidak ingin mengunduh data geofabrik untuk region Indonesia yang berukuran besar (per-tulisan ini dibuat, 1.6 GB), karena saya hanya memerlukan data untuk tiga sub-region: pulau Sumatra (258 MB), Java (847 MB), dan Kalimantan (138 MB). Oleh karena itu, saya hanya akan mengunduh data untuk ketiga sub-region tersebut dan menggabungkannya menjadi satu file .osm.pbf.


## Mengunduh Data Sub-Region Geofabrik

Unduh data untuk ketiga sub-region yang diperlukan dari situs Geofabrik:
1. [https://download.geofabrik.de/asia/indonesia/sumatra-latest.osm.pbf](https://download.geofabrik.de/asia/indonesia/sumatra-latest.osm.pbf)
1. [https://download.geofabrik.de/asia/indonesia/java-latest.osm.pbf](https://download.geofabrik.de/asia/indonesia/java-latest.osm.pbf)
1. [https://download.geofabrik.de/asia/indonesia/kalimantan-latest.osm.pbf](https://download.geofabrik.de/asia/indonesia/kalimantan-latest.osm.pbf)

Letakkan ketiga file .osm.pbf yang telah diunduh ke dalam satu folder, misal: `geofabrik/`.

```
$ cd geofabrik/
$ wget -c https://download.geofabrik.de/asia/indonesia/sumatra-latest.osm.pbf
$ wget -c https://download.geofabrik.de/asia/indonesia/java-latest.osm.pbf
$ wget -c https://download.geofabrik.de/asia/indonesia/kalimantan-latest.osm.pbf
```

```
geofabrik/
│ java-latest.osm.pbf
│ kalimantan-latest.osm.pbf
└ sumatra-latest.osm.pbf
```


## Menggabungkan Data Sub-Region dengan Osmium Tool

Setelah ketiga file .osm.pbf untuk sub-region yang diperlukan telah diunduh, langkah selanjutnya adalah menggabungkannya menjadi satu file .osm.pbf menggunakan Osmium Tool.

Instalasi Osmium Tool dapat dilakukan dengan mengikuti petunjuk di situs resminya: [https://osmcode.org/osmium-tool/](https://osmcode.org/osmium-tool/).

Setelah Osmium Tool terinstal, jalankan perintah berikut untuk menggabungkan ketiga file .osm.pbf menjadi satu file .osm.pbf baru, misal: `indonesia-3pulau-latest.osm.pbf`.

```
$ osmium merge sumatra-latest.osm.pbf java-latest.osm.pbf kalimantan-latest.osm.pbf -o indonesia-3pulau-latest.osm.pbf
```

Tunggu hingga proses penggabungan selesai.


## Kesimpulan

Dalam catatan ini, saya telah mendemonstrasikan proses penggabungan data untuk pulau Sumatra, Java, dan Kalimantan menjadi satu file .osm.pbf baru yang berukuran lebih kecil dibandingkan dengan data untuk seluruh region Indonesia.


## Referensi

1. [https://download.geofabrik.de/asia/indonesia.html](https://download.geofabrik.de/asia/indonesia.html) \
  Diakses tanggal: 2026-02-22

1. [https://osmcode.org/osmium-tool/](https://osmcode.org/osmium-tool/) \
  Diakses tanggal: 2026-02-22
