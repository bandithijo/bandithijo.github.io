---
layout: 'post'
title: 'Memperbaiki Authentication is Required for Suspending the System XFCE'
date: '2018-05-04 21:56'
permalink: '/blog/:title'
author: 'BanditHijo'
license: true
comments: true
toc: true
category: 'blog'
tags: ['XFCE']
pin:
hot:
contributors: []
description:
---

![Banner](https://s20.postimg.cc/j770ed1tp/banner_post_11.png)


# Permasalahan

Saya baru saja berpindah *desktop environment* kembali menggunakan **XFCE4**. Permasalahan yang dulu pernah muncul salah satunya setiap kali sistem baru bangkit dari kondisi *sleep* terdapat sebuah *popup window* yang bertuliskan "*Authentication is required for suspending the system*".


# Solusi

Untuk hal-hal berbau *authentication* biasanya diatur oleh *polkit*.


## Cari lokasi target

Buka Terminal dan *copy paste command* di bawah untuk mencari lokasi dari file `org.freedesktop.login1.policy`.

```
$ locate -b org.freedesktop.login1.policy
```

```
/usr/share/polkit-1/actions/org.freedesktop.login1.policy
```
Pada sistem saya, file tersebut berada pada lokasi seperti yang ditampilkan *output* di atas.


## Edit isi file target

Kemudian, kita akan membuka file tersebut menggunakan *text editor* favorit masing-masing.

```
$ sudo vim /usr/share/polkit-1/actions/org.freedesktop.login1.policy
```

Kemudian cari baris dengan isi persis sama seperti di bawah.

```
<action id="org.freedesktop.login1.suspend">
```

Yang memiliki isi seperti di bawah ini.

```xml
!filename: /usr/share/polkit-1/actions/org.freedesktop.login1.policy
...
...
<action id="org.freedesktop.login1.suspend">
  <description gettext-domain="systemd">Suspend the system</description>
  <message gettext-domain="systemd">Authentication is required for suspending the system.</message>
  <defaults>
    <allow_any>auth_admin_keep</allow_any>
    <allow_inactive>auth_admin_keep</allow_inactive>
    <allow_active>yes</allow_active>
  </defaults>
</action>
...
...
```

Pada bagian tag **defaults**, kita akan merubah nilai dari **allow_any** dan **allow_inactive** menjadi bernilai **yes**.

**Sebelum**

```xml
<defaults>
  <allow_any>auth_admin_keep</allow_any> 👈️
  <allow_inactive>auth_admin_keep</allow_inactive> 👈️
  <allow_active>yes</allow_active>
</defaults>
```

**Sesudah**

```xml
<defaults>
  <allow_any>yes</allow_any> 👈️
  <allow_inactive>yes</allow_inactive> 👈️
  <allow_active>yes</allow_active>
</defaults>
```


## Hasil setelah diedit

Maka setelah kita rubah, keseluruhan kodenya kan tampak seperti ini.

```xml
!filename: /usr/share/polkit-1/actions/org.freedesktop.login1.policy
...
...
<action id="org.freedesktop.login1.suspend">
  <description gettext-domain="systemd">Suspend the system</description>
  <message gettext-domain="systemd">Authentication is required for suspending the system.</message>
  <defaults>
    <allow_any>yes</allow_any>
    <allow_inactive>yes</allow_inactive>
    <allow_active>yes</allow_active>
  </defaults>
</action>
...
...
```


# Referensi
1. [askubuntu.com/questions/543921/authentication-required-before-suspend](https://askubuntu.com/questions/543921/authentication-required-before-suspend)
<br>Diakses tanggal: 2018/04/28

2. [ubuntuforums.org/showthread.php?t=2276864](https://ubuntuforums.org/showthread.php?t=2276864<Paste>)
<br>Diakses tanggal: 2018/04/28
