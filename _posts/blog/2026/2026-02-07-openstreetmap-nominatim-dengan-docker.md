---
layout: "post"
title: "OpenStreetMap Nominatim (Geocoding Machine) dengan Docker"
date: "2026-02-07 11:21"
permalink: "/blog/:title"
assets: "/assets/posts/blog/2026/2026-02-07-openstreetmap-nominatim-dengan-docker"
author: "BanditHijo"
category: "blog"
tags: ["openstreetmap", "nominatim"]
description: "OpenStreetMap Nominatim adalah sebuah layanan geocoding yang memungkinkan pengguna untuk mencari lokasi berdasarkan nama tempat  atau alamat (forward search) atau geographic coordinate (reverse search). Dalam artikel ini, saya akan mendokumentasikan cara menjalankan OpenStreetMap Nominatim menggunakan Docker agar proses setup Nominatim menjadi lebih mudah dan cepat, tanpa perlu repot mengatur lingkungan dan dependensi secara manual."
---

## Pendahuluan

{{ page.description }}


## Apa itu OpenStreetMap Nominatim?

OpenStreetMap Nominatim adalah sebuah layanan geocoding yang memungkinkan pengguna untuk mencari lokasi berdasarkan nama tempat atau alamat (*forward search*) atau koordinat geografis (*reverse search*). Nominatim menggunakan data dari OpenStreetMap untuk menyediakan informasi lokasi yang akurat. Tanpa OpenStreetMap, Nominatim tidak memiliki data apapun untuk digunakan dalam proses geocoding.

***Forward Geocodig*** adalah proses mengubah nama tempat atau alamat menjadi koordinat geografis (latitude dan longitude). Misalnya, jika mencari "Balikpapan", Nominatim akan memberikan koordinat geografis dari Balikpapan.

***Reverse Geocoding*** adalah proses mengubah koordinat geografis (latitude & longitude) menjadi nama tempat atau alamat. Misalnya, jika memiliki koordinat geografis dari Balikpapan (`-1.2398711,116.8593379`), Nominatim akan memberikan nama tempat atau alamat yang sesuai.


### Nominatim API

Nominatim menyediakan API yang dapat digunakan untuk melakukan forward, reverse geocoding dan beberapa hal lainnya.

Berikut adalah contoh penggunaan Nominatim API:

1. `/search` \
  Digunakan untuk melakukan forward geocoding. Untuk mencari lokasi berdasarkan nama tempat atau alamat.
2. `/reverse` \
  Digunakan untuk melakukan reverse geocoding. Untuk mencari nama tempat atau alamat berdasarkan koordinat geografis (latitude & longitude).
3. `/lookup` \
  Digunakan untuk mencari informasi lokasi berdasarkan OSM ID.
4. `/details` \
  Digunakan untuk mencari informasi lokasi berdasarkan OSM ID, dengan informasi yang lebih detail dibandingkan dengan `/lookup`.
5. `/status` \
  Digunakan untuk memeriksa status dari Nominatim service.
6. dll.


## OpenStreetMap Nominatim dengan Docker

Untuk menjalankan OpenStreetMap Nominatim dengan Docker, bisa menggunakan image yang sudah tersedia di Docker Hub. Agar prosesnya lebih mudah, saya lebih prefer untuk membuat docker compose saja. Berikut adalah langkah-langkahnya:


### 1. Buat Docker Compose untuk Nominatim Service

Buat file `docker-compose.yml` dengan isi sebagai berikut:

```yaml
!filename: docker-compose.yml
services:
 nominatim:
   image: mediagis/nominatim:5.2
   container_name: osm-nominatim
   restart: unless-stopped
   environment:
     PBF_PATH: /nominatim/data/kalimantan-latest.osm.pbf
   volumes:
     - ./geofabrik/kalimantan-latest.osm.pbf:/nominatim/data/kalimantan-latest.osm.pbf
     - nominatim-data:/var/lib/postgresql
   expose:
     - "8080"
   ports:
     - "8080:8080"

volumes:
 nominatim-data:

networks:
 default:
   name: osm-net
```

Saya menggunakan docker image `mediagis/nominatim:5.2` yang sudah tersedia di Docker Hub.

Pada `PBF_PATH` diisi dengan file `.pbf`. PBF adalah format file yang digunakan untuk menyimpan data OpenStreetMap. File ini berisi informasi tentang jalan, bangunan, dan fitur geografis lainnya yang ada di wilayah tertentu. Dalam contoh ini, saya menggunakan file `kalimantan-latest.osm.pbf` yang berisi data OpenStreetMap untuk wilayah Kalimantan. Untuk mendapatkan file `.pbf` untuk wilayah lain, bisa mengunduhnya dari situs [Geofabrik](https://download.geofabrik.de/).

Kisaran size file `.pbf` untuk wilayah Indonesia dan beberapa wilayah lainnya adalah sebagai berikut:

| Region | Size |
| :--- | ---: |
| Indonesia (with East Timor) | 1.6 GB |
| Java | 845 MB |
| Kalimantan | 138 MB |
| Maluku | 25.1 MB |
| Nusa Tenggara | 162 MB |
| Papua | 31.0 MB |
| Sulawesi | 149 MB |
| Sumatra | 255 MB |

Saya menggunakan 2 values untuk `volumes`,
1. `.geofabrik/kalimantan-latest.osm.pbf:/nominatim/data/kalimantan-latest.osm.pbf` \
  Volume ini digunakan untuk menghubungkan file `.pbf` yang ada di host dengan file `.pbf` yang ada di dalam container. Dengan begitu, saya dapat menggunakannya di `PBF_PATH` untuk proses import data. Proses persiapan file `.pbf` ini akan saya jelaskan di bagian selanjutnya.
2. `nominatim-data:/var/lib/postgresql` \
  Volume ini digunakan untuk menyimpan data yang dihasilkan oleh Nominatim. Data ini akan disimpan di dalam container, sehingga jika container dihapus, data ini tidak akan hilang. `nominatim-data` ini adalah nama volume yang dibuat dibagian `volumes` di bawah `nominatim-data:`. Volume ini akan dihubungkan dengan direktori `/var/lib/postgresql` di dalam container, yang merupakan direktori tempat Nominatim menyimpan data yang dihasilkan.

Secara default nonimatin mengekspose port `8080` di dalam container, sehingga saya juga expose port `8080` di bagian `expose`. Agar bisa diakses dari luar container, saya juga memetakan port `8080` di host ke port `8080` di dalam container dengan menggunakan `ports`.


### 2. Persiapkan File `.pbf`

Sebelum menjalankan Docker Compose, pastikan sudah memiliki file `.pbf` yang akan digunakan untuk proses import data. File `.pbf` ini bisa didapatkan dari situs [Geofabrik](https://download.geofabrik.de/). 

Setelah mengunduh file `.pbf`, letakkan file tersebut di dalam direktori `geofabrik/` yang berada di root project. Buat direktori `geofabrik/` jika belum ada.

```
$ mkdir geofabrik
$ cd geofabrik
$ wget -c https://download.geofabrik.de/asia/indonesia/kalimantan-latest.osm.pbf
```

Tunggu proses download selesai, setelah itu pastikan file `.pbf` sudah berada di dalam direktori `geofabrik/`.

Berikut adalah struktur direktori yang diharapkan setelah menambahkan file `.pbf`:

```
geofabrik/
└── kalimantan-latest.osm.pbf
docker-compose.yml
```

Sip, sekarang file `.pbf` sudah siap untuk digunakan dalam proses import data oleh Nominatim.


### 3. Jalankan Docker Compose

Setelah membuat file `docker-compose.yml`, jalankan perintah berikut untuk menjalankan Nominatim service:

```
$ docker-compose up -d
```

> PERHATIAN
>
> Untuk pertama kali menjalankan docker compose, Nominatim service akan melakukan proses import data dari file `.pbf` ke dalam Nominatim, proses ini membutuhkan waktu yang cukup lama, tergantung pada ukuran file `.pbf` yang digunakan. Untuk file `kalimantan-latest.osm.pbf` yang berukuran 138 MB, proses import data bisa memakan waktu sekitar 30 menit hingga 1 jam.

Untuk melihat log dari container, bisa menggunakan perintah berikut:

```
$ docker compose logs nominatim -f
```

Tunggu proses import data selesai. Biasanya akan muncul log seperti berikut ketika proses import data sudah selesai:

```
--> Nominatim is ready to accept requests
```

Setelah proses import data selesai, Nominatim service sudah siap untuk digunakan. Nominatim API bisa diakses melalui `http://localhost:8080/`.


### 4. Coba Nominatim API

Setelah Nominatim service sudah siap, coba akses Nominatim API untuk melakukan forward geocoding dan reverse geocoding.


#### /status

Pertama-tama coba cek statusnya dulu.

```
$ curl http://localhost:8080/status
```

Outputnya,

```
OK
```

Atau kalau mau outputnya dalam JSON,

```
$ curl http://localhost:8080/status?format=json
```

Outputnya,

```json
{
  "status": 0,
  "message": "OK",
  "data_updated": "2026-01-21T12:30:08+00:00",
  "software_version": "5.2.0",
  "database_version": "5.2.0-0"
}
```


#### /search (Forward Geocoding)

Coba lakukan forward geocoding untuk mencari lokasi berdasarkan nama tempat atau alamat. Misalnya, mencari lokasi "jakarta".

```
$ curl "http://localhost:8080/search?q=jakarta&format=json"
```

Outputnya,

```json
[
  {
    "place_id": 144282,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 795600162,
    "lat": "-0.5354329",
    "lon": "117.0914415",
    "category": "highway",
    "type": "residential",
    "place_rank": 26,
    "importance": 0.0533433333333333,
    "addresstype": "road",
    "name": "Jakarta",
    "display_name": "Jakarta, Loa Bakung, Sungai Kunjang, Samarinda, Kalimantan Timur, 75391, Indonesia",
    "boundingbox": [
      "-0.5355636",
      "-0.5353021",
      "117.0914346",
      "117.0914483"
    ]
  }
]
```

Wah! Ternyata ada daerah beranama "Jakarta" di Kalimantan Timur.


#### /revers (Reverse Geocoding)

Coba lakukan reverse geocoding untuk mencari nama tempat atau alamat berdasarkan koordinat geografis (latitude & longitude). Misalnya, mencari lokasi berdasarkan koordinat `-0.5354329,117.0914415` (koordinat Balikpapan).

```
$ curl "http://localhost:8080/reverse?lat=-1.2398711&lon=116.8593379&format=json"
```

Outputnya,

```json
{
  "place_id": 144282,
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  "osm_type": "way",
  "osm_id": 795600162,
  "lat": "-0.5354329",
  "lon": "117.0914415",
  "class": "highway",
  "type": "residential",
  "place_rank": 26,
  "importance": 0.0533433333333333,
  "addresstype": "road",
  "name": "Jakarta",
  "display_name": "Jakarta, Loa Bakung, Sungai Kunjang, Samarinda, Kalimantan Timur, 75391, Indonesia",
  "address": {
    "road": "Jakarta",
    "village": "Loa Bakung",
    "city_district": "Sungai Kunjang",
    "city": "Samarinda",
    "state": "Kalimantan Timur",
    "ISO3166-2-lvl4": "ID-KI",
    "postcode": "75391",
    "country": "Indonesia",
    "country_code": "id"
  },
  "boundingbox": [
    "-0.5355636",
    "-0.5353021",
    "117.0914346",
    "117.0914483"
  ]
}
```


#### /lookup

Coba lakukan lookup untuk mencari informasi lokasi berdasarkan OSM ID. Misalnya, mencari informasi lokasi berdasarkan OSM ID `795600162`. Ini adalah OSM ID dari hasil pencarian sebelumnya untuk lokasi "jakarta" di Kalimantan Timur.

```
$ curl "http://localhost:8080/lookup?osm_ids=W795600162&format=json"
```

Outputnya,

```json
[
  {
    "place_id": 144282,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 795600162,
    "lat": "-0.5354329",
    "lon": "117.0914415",
    "class": "highway",
    "type": "residential",
    "place_rank": 26,
    "importance": 0.0533433333333333,
    "addresstype": "road",
    "name": "Jakarta",
    "display_name": "Jakarta, Loa Bakung, Sungai Kunjang, Samarinda, Kalimantan Timur, 75391, Indonesia",
    "address": {
      "road": "Jakarta",
      "village": "Loa Bakung",
      "city_district": "Sungai Kunjang",
      "city": "Samarinda",
      "state": "Kalimantan Timur",
      "ISO3166-2-lvl4": "ID-KI",
      "postcode": "75391",
      "country": "Indonesia",
      "country_code": "id"
    },
    "boundingbox": [
      "-0.5355636",
      "-0.5353021",
      "117.0914346",
      "117.0914483"
    ]
  }
]
```


#### /details

Coba lakukan details untuk mencari informasi lokasi berdasarkan OSM ID, dengan informasi yang lebih detail dibandingkan dengan `/lookup`. Misalnya, mencari informasi lokasi berdasarkan OSM ID `795600162`.

```
$ curl "http://localhost:8080/details?osmtype=W&osmid=795600162&format=json"
```

Outputnya,

```json
{
  "place_id": 144282,
  "parent_place_id": 142133,
  "osm_type": "W",
  "osm_id": 795600162,
  "category": "highway",
  "type": "residential",
  "admin_level": 15,
  "localname": "Jakarta",
  "names": {
    "name": "Jakarta"
  },
  "addresstags": {},
  "calculated_postcode": "75391",
  "country_code": "id",
  "indexed_date": "2026-02-08T13:11:46.748639+00:00",
  "importance": 0.0533433333333333,
  "calculated_importance": 0.0533433333333333,
  "extratags": {},
  "rank_address": 26,
  "rank_search": 26,
  "isarea": false,
  "centroid": {
    "type": "Point",
    "coordinates": [
      117.0914415,
      -0.5354329
    ]
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      117.0914415,
      -0.5354329
    ]
  }
}
```


### 5. Stop Docker Compose

Jika sudah selesai menggunakan Nominatim service, bisa stop Docker Compose dengan perintah berikut:

```
$ docker-compose down
```


## Kesimpulan

Dalam artikel ini, saya telah mendokumentasikan cara menjalankan OpenStreetMap Nominatim menggunakan Docker, mulai dari membuat Docker Compose, mempersiapkan file `.pbf`, menjalankan Docker Compose, mencoba Nominatim API, hingga menghentikan Docker Compose. Dengan menggunakan Docker, proses setup Nominatim menjadi lebih mudah dan cepat, tanpa perlu repot mengatur lingkungan dan dependensi secara manual.

Pada artikel selanjutnya, saya akan mendokumentasikan cara menggunakan Nominatim self-hosted pada Geocoder gem untuk melakukan geocoding dan reverse geocoding di aplikasi Ruby on Rails, "[Menggunakan Nominatim Self-Hosted pada Geocoder Gem]({{ site.url }}/blog/menggunakan-nominatim-self-hosted-pada-geocoder-gem)"


## Referensi

1. [https://nominatim.openstreetmap.org/ui/about.html](https://nominatim.openstreetmap.org/ui/about.html) \
  Diakses tanggal: 2026-02-07

2. [https://nominatim.org/release-docs/develop/api/Overview/](https://nominatim.org/release-docs/develop/api/Overview/) \
  Diakses tanggal: 2026-02-07
