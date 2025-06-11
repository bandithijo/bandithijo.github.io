---
layout: 'post'
title: "Reclaim Old Username di SUSE Community Account (openSUSE)"
date: '2023-09-19 23:40'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['openSUSE']
pin:
hot:
contributors: []
description: "Pada catatan ini saya ingin mendokumentasikan proses reclaim username SUSE Community Account saya yang tidak ikut migrasi pada Juli 2020 dan telah dibekukan."
---

# Pendahuluan

{{ page.description }}


# Disclaimer

> Keberhasilan dari proses re-claim old username ini karena, **email yang saya daftarkan pada username yang telah dibekukan, masih aktif saya pergunakan.**
>
> Seperti yang tertulis di FAQ,
> ***The account reactivation needs access to the registered e-mail address***


# Masalah

Pada 1 Januari 2022, saya berencana ingin memasang distro openSUSE sebagai distro utama. Sambil menelusuri openSUSE Wiki [^1], saya mencoba untuk login ke akun SUSE Community Account yang sudah pernah saya buat.

Ternyata, terdapat berita "Community Account Migration" pada portal [^2] yang mana mereka sudah memigrasikan portal mereka menggunakan **Univention**.

Saya coba daftarkan username saya `bandithijo`, ternyata sudah terdaftar. Namun, saya **tidak bisa melakukan password reset**, dan mendapatkan pesan error,

![Gambar 1](/assets/images/posts/2023/2023-09-19-01-gambar-01.png)

Gambar 1. Error saat Password Reset

Saya coba baca-baca FAQ yang terdapat di portal [^2], dan mendapatkan bagian FAQ yang ini,

> **FAQ: I don't have access to the registered e-mail address.** \
> Sorry. The account reactivation needs access to the registered e-mail address or (within the migration phase) the old password. \
> However the migration phase has ended in July 2020. \
> If you no longer have access to the registered e-mail address or it is invalid or longer existing there is no way to prove your ownership of the account and thus can not be regained.

Cerita di atas juga sudah pernah saya share di group telegram openSUSE Indonesia [di sini](https://t.me/openSUSE_ID/59679).

Saat itu saya berfikir, akun `bandithijo` sudah tidak lagi dapat dipulihkan karena tertinggal jadwal migrasi.

Saya pun mengurungkan niat untuk memasang openSUSE ke harddrive. Karena saat itu saya baru pasang di Virtual Machine via VirtualBox saja.

Alasan tidak melanjutkan ini bersifat personal saja. Saya tidak ingin berinteraksi di forum dan wiki dengan akun selain `bandithijo`. Saya akhirnya membuat akun lain bernama `bndthj`. Namun, rasanya kurang kalau bukan `bandithijo`. Hahaha dasar idealis. 😁

Alasan kenapa saya ingin memasang openSUSE karena sekitar 2004 atau 2005 saya pernah pasang SUSE di laptop lama saya. Saat itu saya masih pengguna Windows, jadi tidak mengerti cara menggunakan Linux untuk dipakai sehari-hari. Karena sekarang saya cukup lama migrasi menggunakan Linux sejak Desember 2014, dan sudah menggunakan beberapa distro. Beberapa diantara yang saya pergunakan cukup lama (lebih dari 6 bulan):

1. Manjaro (kuliah)
1. Fedora (kuliah)
1. Slackware (skripsi)
1. Arch (kuliah + kerja)
1. Artix (kuliah)

Urutan tidak berdasarkan waktu pemakaian, karena yang paling lama saya pergunakan adalah Arch. Arch seperti *fallback* dari semua distro. Kalau saya mulai bosan, maka saya akan balik lagi ke Arch. Sekarang pun saya menulis catatan ini, yaa dengan Arch.

Dari daftar tersebut, saya belum menggunakan SUSE yang sekarang menjadi openSUSE.


# Pemecahan Masalah

September 2023, tepatnya tanggal 17, saya tiba-tiba tertarik lagi dengan openSUSE.

Namun, tentu saja, langkah pertama adalah mencoba meng-claim username `bandithijo` saya.

Karena berdasarkan FAQ di atas, asalakan email yang terdaftar masih aktif, masih bisa dilakukan proses reactivasi akun.

Sayangnya, tidak disebutkan alamat email yang akan digunakan untuk mengajukan issue.


## Email #1

Saya pun mencoba mengirimkan email ke alamat `admin@opensuse.org`, dengan isi sebagai berikut,

```email
Date: Mon, 18 Sep 2023 06:43:01 +0800
From: Rizqi Nur Assyaufi <bandithijo@gmail.com>
To: admin@opensuse.org
Subject: [HELP] Reclaim my old username

[-- Begin signature information --]
Good signature from: Rizqi Nur Assyaufi <bandithijo@gmail.com>
                aka: Rizqi Nur Assyaufi <rizqiassyaufi@gmail.com>
                aka: Rizqi Nur Assyaufi <rizqinurassyaufi@gmail.com>
            created: Mon 18 Sep 2023 06:43:01 AM WITA
[-- End signature information --]

[-- The following data is signed --]

Hello, admin of opensuse.org

My name is Rizqi Nur Assyaufi from Indonesia.

I ever create SUSE Community Account (SUSE ID) named "bandithijo",
but I did not participate in the migration process in July 2020.

May I reclaim my username "bandithijo" again?

Currently I have second account named "bndthj".
But I do not want to handle different username for all my online account.

Could you help me, please.

Best,
Rizqi Nur Assyaufi (bandithijo)

--
Rizqi Nur Assyaufi (bandithijo)
https://bandithijo.dev
560691E942A02F91
He/Him/His
TZ=Asia/Makassar (GMT +0800)

[-- End of signed data --]
```

Saya tidak terlalu berharap banyak karena alamat dari email tersebut juga saya dapatkan dari hasil menebak-nebak saja. Saya berasumsi bahwa, mungkin ada orang yang menghandle email `admin@opensuse.org`. Kalau nanti salah topik, mudah-mudahan diarahkan ke alamat yang benar.


## Email Re: #1 (P1)

Ternyata ada balasan.

```email
Date: Sun, 17 Sep 2023 22:54:40 +0000
From: malcolmlewis <redmine@opensuse.org>
To: bandithijo@gmail.com
Subject: [openSUSE admin - tickets #135857] [HELP] Reclaim my old username
X-Mailer: Redmine

[openSUSE Tracker]
Issue #135857 has been updated by malcolmlewis.

Category set to Accounts
Assignee set to crameleon

@crameleon User name "bandithijo" has no presence in the Forum, bndthj does and created 2021-12-31.

----------------------------------------
tickets #135857: [HELP] Reclaim my old username
https://progress.opensuse.org/issues/135857#change-673775
```

Surprise! Ternyata alamat balasannya dari `redmine@opensuse.org`.

Kalau tidak salah **redmine** ini adalah free dan opensour web-based project management dan issue tracking yang dibuat dengan Ruby on Rails. Keren! Ternyata masih ada yang pakai.

Email saya mendapat nomor issue tiket **#135857**.

Dari pesan di atas, terlihat kalau **@malcolmlewis** memberikan assignment issue ticket ini kepada **@crameleon** dan memberikan informasi singkat untuk mempercepat proses identifikasi problem.

Kalau sudah mendapat nomor tiket, artinya tinggal menunggu antrian kalau tiket kita akan dikerjakan.


## Email Re: #1 (P2)

Kali ini, email dibalas oleh **@crameleon**.

```email
Date: Tue, 19 Sep 2023 13:22:17 +0000
From: crameleon <redmine@opensuse.org>
To: bandithijo@gmail.com
Subject: [openSUSE admin - tickets #135857] (In Progress) [HELP] Reclaim my old username
X-Mailer: Redmine

[openSUSE Tracker]
Issue #135857 has been updated by crameleon.

Status changed from New to In Progress

----------------------------------------
tickets #135857: [HELP] Reclaim my old username
https://progress.opensuse.org/issues/135857#change-674906
```

Tentang perubahan satus tiket ke **(In Progress)**.


## Email Re: #1 (P3)

Kemudian, **@crameleon**, membalas email dan memberikan arahan.

```email
Date: Tue, 19 Sep 2023 13:25:43 +0000
From: crameleon <redmine@opensuse.org>
To: bandithijo@gmail.com
Subject: [openSUSE admin - tickets #135857] (Feedback) [HELP] Reclaim my old username
X-Mailer: Redmine

[openSUSE Tracker]
Issue #135857 has been updated by crameleon.

Status changed from In Progress to Feedback

Hi,

I reinstated your old `bandithijo` account. Please visit https://idp-portal.suse.com/univention/self-service/#page=passwordreset to reset the passphrase for it. 
Afterwards, visit https://idp-portal.suse.com/univention/self-service/#page=verifyaccount to validate the email address.

Let me know if it worked.

Best,
Georg

----------------------------------------
tickets #135857: [HELP] Reclaim my old username
https://progress.opensuse.org/issues/135857#change-674912
```

Dari arahan tersebut, saya diarahkan untuk melakukan 2 hal:

1. **reset password** di alamat [ini](https://idp-portal.suse.com/univention/self-service/#page=passwordreset)
1. setelah password berhasil direset, lakukan **email validation** di alamat [ini](https://idp-portal.suse.com/univention/self-service/#page=verifyaccount)


## Email #2

Setelah mencoba, langkah 1, ternyata masih gagal. Saya pun membalas email sebelumnya dengan menyertakan screenshot.

```email
Date: Tue, 19 Sep 2023 21:41:03 +0800
From: Rizqi Nur Assyaufi <bandithijo@gmail.com>
To: crameleon <redmine@opensuse.org>
Subject: Re: [openSUSE admin - tickets #135857] (Feedback) [HELP] Reclaim my old username

[-- Attachment #1 --]
[-- Type: multipart/alternative, Encoding: 7bit, Size: 6.5K --]

[image: Screenshot_2023-09-19_21-35-07.png]

First of all, thank you for helping me. I have plan to use openSUSE after
my old username is back.

When visiting
https://idp-portal.suse.com/univention/self-service/#page=passwordreset I
put `bandithijo` on username input form and got those pop up (on image).

"You are not authorized to perform this action.
Server error message:
No contact information is stored for this user. Resetting the password is
not possible."

--
Rizqi Nur Assyaufi (bandithijo)
https://bandithijo.dev
560691E942A02F91
He/Him/His
TZ=Asia/Makassar (GMT +0800)
```

`[image: Screenshot_2023-09-19_21-35-07.png]` adalah attachment dari Gambar 1 seperti yang saya berikan di awal catatan, saat melakukan password reset. Masih gagal dan dapat informasi yang sama seperti sebelumnya.

**"No contact information is stored for this user."**


## Email Re: #2

```email
Date: Tue, 19 Sep 2023 13:56:19 +0000
From: crameleon <redmine@opensuse.org>
To: bandithijo@gmail.com
Subject: [openSUSE admin - tickets #135857] [HELP] Reclaim my old username
X-Mailer: Redmine

[openSUSE Tracker]
Issue #135857 has been updated by crameleon.


Thanks for the screenshot, that was an oversight on my end. Please try it again now.

----------------------------------------
tickets #135857: [HELP] Reclaim my old username
https://progress.opensuse.org/issues/135857#change-674981
```

Screenshot yang saya berikan, diapresiasi oleh. Dan dari email balasan ini, saya disuruh mencoba kembali.

Setelah saya coba lagi langkah 1 (password reset), ternyata berhasil! 🎉


### 1. Reset Password

![Gambar 2](/assets/images/posts/2023/2023-09-19-01-gambar-02.png)

Gambar 2. Memilih media untuk menerima token reset password

Setelah memasukkan username, dan username kita divalidasi, kita diarahkan untuk memilih media untuk menerima data token. Karena username `bandithijo` ini memang sudah memiliki email, dan email nya masih aktif saya pergunakan, saya memilih pilihan email. Dan memang hanya ada 1 pilihan saja.

Kemudian, kita akan mendapatkan email dari `noreply@suse.de`, berisi,

```email
Date: Tue, 19 Sep 2023 13:59:33 +0000
From: Password Reset Service <noreply@suse.de>
To: bandithijo@gmail.com
Subject: Password reset

Dear user bandithijo,

we have received a password reset request for your account. If you did not
wish to change your password, you can safely ignore this message.

To change your password please follow this link:

https://idp-portal.suse.com/univention/self-service/#page=newpassword&token=NeEe84uDfxS<REDACTED>tseY9obBAv9tQH9vC8kDebkRf&username=bandithijo

If the link does not work, you can go to

https://idp-portal.suse.com/univention/self-service/#page=newpassword

and enter the following token manually:

NeEe84uDfxS<REDACTED>tseY9obBAv9tQH9vC8kDebkRf

Greetings from your password self service system.
```

Dapat dilihat token untuk mereset password sudah didapatkan.

Copy token atau klik link yang diberikan.

![Gambar 3](/assets/images/posts/2023/2023-09-19-01-gambar-03.png)

Gambar 3. Memperbaharui password dengan token

Kemudian tekan **CHANGE PASSWORD**.

![Gambar 4](/assets/images/posts/2023/2023-09-19-01-gambar-04.png)

Gambar 4. Popup ketika berhasil memperbahrui password


### 2. Email Validation

Selanjutnya, lakukan email validation melalui link yang diberikan [di sini](https://idp-portal.suse.com/univention/self-service/#page=verifyaccount).

Isi form yang meminta kita memasukkan username. Nanti akan mendapatkan email seperti ini,

```email
Date: Tue, 19 Sep 2023 14:00:40 +0000
From: noreply@suse.de
To: bandithijo@gmail.com
Subject: Account verification

Dear user bandithijo,

we have received your email verification request. To verify
your email address, please follow this link:

https://idp-portal.suse.com/univention/self-service/#page=verifyaccount&token=ka5D7MNFgb6gNNT<REDACTED>JiFSPm7PrAKSOdMo7TdW63uss&username=<REDACTED>&method=verify_email

If the link does not work, you can go to

https://idp-portal.suse.com/univention/self-service/#page=verifyaccount

and enter the following token manually:

ka5D7MNFgb6gNNT<REDACTED>JiFSPm7PrAKSOdMo7TdW63uss
```

Copy token atau click link yang diberikan.

Jika berhasil, akan mendapatkan popup seperti ini.

![Gambar 5](/assets/images/posts/2023/2023-09-19-01-gambar-05.png)

Gambar 5. Berhasil Memvalidasi Email

Alhamdulillah, dengan ini username `bandithijo` berhasil saya dapatkan kembali di SUSE Community Account.


## Email #3

Setelah berhasil, tak lupa saya mengabarkan (mengkonfirmasi).

Karena konfirmasi dan terima kasih, adalah hal yang sangat penting.

```email
Date: Tue, 19 Sep 2023 22:06:00 +0800
From: Rizqi Nur Assyaufi <bandithijo@gmail.com>
To: crameleon <redmine@opensuse.org>
Subject: Re: [openSUSE admin - tickets #135857] [HELP] Reclaim my old username

[-- Attachment #1 --]
[-- Type: multipart/alternative, Encoding: 7bit, Size: 5.2K --]

Thank you very much!

1. request forget password with token ✅
2. verify email address ✅

I have finished all the steps. 🎉

[image: Screenshot_2023-09-19_22-01-20.png]

Thank you very much Georg 🙏

Best,
Rizqi Nur Assyaufi

--
Rizqi Nur Assyaufi (bandithijo)
https://bandithijo.dev
560691E942A02F91
He/Him/His
TZ=Asia/Makassar (GMT +0800)
```

`[image: Screenshot_2023-09-19_22-01-20.png]` adalah attachment dari Gambar 5.


## Email Re: #3

**@crameleon** pun menutup tiket dan membalas.

```email
Date: Tue, 19 Sep 2023 14:09:35 +0000
From: crameleon <redmine@opensuse.org>
To: bandithijo@gmail.com
Subject: [openSUSE admin - tickets #135857] (Resolved) [HELP] Reclaim my old username
X-Mailer: Redmine

[openSUSE Tracker]
Issue #135857 has been updated by crameleon.

Status changed from Feedback to Resolved

Sweet! Thanks for confirming, glad it worked!

Cheers,
Georg

----------------------------------------
tickets #135857: [HELP] Reclaim my old username
https://progress.opensuse.org/issues/135857#change-675014
```

That's it!


# Pesan Penulis

Itu tadi pengalaman saya melakukan klaim terhadap old username saya di SUSE Community Account yang dibekukan karena tertinggal tidak ikut migrasi pada July 2020.

Proses re-claim username ini berhasil, karena alamat email yang saya gunakan masih aktif saya pergunakan. Kalau email nya tidak aktif, atau ingin berganti email pada username yang dibekukan, proses tersebut akan sulit (mungkin mustahil), karena mereka tidak punya data untuk memvalidasi bahwa username tersebut benar milik kita atau bukan.

Mudah-mudahan catatan ini bermanfaat untuk teman-teman.

Terima kasih sudah mampir yaa.

Minggu ini (September 2023), saya akan mulai migrasi ke openSUSE.

Terima kasih untuk **@malcolmlewis** dan **@crameleon** karena telah membantu saya memulihkan username `bandithijo`.



[^1]: [en.opensuse.org: _openSUSE Wiki_](https://en.opensuse.org/Main_Page)
[^2]: [idp-portal-info.suse.com: _Community Account Migration_](https://idp-portal-info.suse.com/)
