---
layout: "post"
title: "Catatan dalam Berinteraksi dengan VBoxManage"
date: "2021-04-02 18:38"
permalink: "/note/:title"
assets: "/assets/posts/note/2021-04-02-catatan-perihal-vboxmanage"
author: "BanditHijo"
category: "note"
tags: ["vboxmanage"]
description: "Hal-hal terkait command line memang sering terlupakan apabila tidak selalu digunakan. Catatan ini hadir untuk mempermudah teman-teman apabila sedang berkepentigan dengan vboxmanage."
sitemap: false
---

## Prakata

VBoxManage adalah command line interface dari VirtualBox. Lengkapnya adalah "*Oracle VM VirtualBox Command Line Management Interface*".


## Melihat daftar VM

Untuk melihat daftar vm yang ada,

```
$ VBoxManage list vms
```

Outputnya akan seperti ini,

```
"RDPWindows" {34a99d7f-e482-4f6b-86ba-e827998213f2}
```

**RDPWindows** adalah nama dari vm yang saya berikan ketika membuat vm.

**34a99d7f-e482-4f6b-86ba-e827998213f2** adalah UUID dari vm.


## Power On/Off VM


### Menjalankan vm secara headless mode

Untuk menjalankan vm tanpa membuka window display yang menampilkan tampilan layar dari vm biasanya diperlukan apabila hanya ingin menggunakan vm sebagai server. Biasanya diakses menggunakan SSH. Atau kalau ingin mengakses tampilan layar, dapat menggunakan protokol RDP.

Cara menjalankan vm dengan headless mode,

```
$ VBoxManage startvm <nama_vm> --type headless
```

```
$ VBoxManage startvm RDPWindows --type headless
```

Outputnya akan seperti ini,

```
Waiting for VM "RDPWindows" to power on...
VM "RDPWindows" has been successfully started.
```


### Mematikan vm

Saya tidak merekomendasikan mematikan vm dengan cara ini, karena sering sekali Windows vm saya masuk ke "Recovery Mode".

```
$ VBoxManage controlvm <nama_vm> poweroff
```

```
$ VBoxManage controlvm RDPWindows poweroff
```


## Konektifitas USB Host -> Guest VM


### Mengecek daftar device yang terhubung dengan USB port

```
$ VBoxManage list usbhost
```

Outputnya akan seperti ini,

```
Host USB Devices:

UUID:               dcab5dcf-37c1-4718-962f-0e54ff7cc80c 👈
VendorId:           0x0483 (0483)
ProductId:          0x2016 (2016)
Revision:           0.1 (0001)
Port:               1
USB version/speed:  1/Full
Manufacturer:       STMicroelectronics
Product:            Biometric Coprocessor
Address:            sysfs:/sys/devices/pci0000:00/0000:00:1a.0/usb3/3-2//device:/dev/vboxusb/003/002
Current State:      Available
```

**UUID** dari perangkat tersebut yang akan kita gunakan.

**UUID** dari sebuah perangkat, akan berubah-ubah meskipun perangkatnya sama.

Untuk membuat UUID yang permanen, dapat menggunakan USB filter.

\* Lain waktu saya akan catatat cara membuat USB filter yaa.


### Memindahkan attached USB dari Host ke Guest vm

Untuk memindahkan perangkat USB yang terhubung dengan Host ke Guest vm.

```
$ VBoxManage controlvm <nama_vm> usbattach <UUID>
```

```
$ VBoxManage controlvm RDPWindows usbattach dcab5dcf-37c1-4718-962f-0e54ff7cc80c
```

Untuk melepasnya, tinggal "Safely Remove" saja. Meskipun, ada command untuk *detach* juga.
