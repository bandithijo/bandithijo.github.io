---
layout: "post"
title: "Lightline, Alternatif Vim Statusline Bagian 2 (feat. Defx, Tagbar)"
date: "2020-10-30 09:26"
permalink: "/blog/:title"
assets: "/assets/images/posts/2020/2020-10-30-lightline-alternatif-vim-statusline-part-2"
author: "BanditHijo"
category: "blog"
tags: ["vim", "lightline", "statusline"]
description: "Pembaharuan konfig dari catatan sebelumnya. Kali ini dengan perubahan beberapa komponen untuk Defx dan juga Tagbar."
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wernight/powerline-web-fonts@ba4426cb0c0b05eb6cb342c7719776a41e1f2114/PowerlineFonts.css">

# Latar Belakang

Post ini saya tulis sebagai update catatan bagian pertama yang berjudul: <br>
[**Lightline, Alternatif Vim Statusline**](/blog/lightline-alternatif-vim-statusline).

Saya memutuskan untuk membuat bagian kedua, karena sudah cukup banyak perubahan yang saya tambahkan dari bagian pertama. Terutama pada bagian pengecualian statusline pada Defx buffer.

**Kenapa ada pengecualian pada Defx?**

Menurut saya, saya tidak memerlukan statusline yang sangat informatif pada Defx.

Agak lucu rasanya, kalau pada Defx, statusline ditampilkan Git branch, line & column poisiton, dll.

Maka, pada buffer Defx, Lightline statusline **tidak diperlukan untuk menampilkan status secara lengkap**.


# Instalasi

Saya menggunakan **vim-plug**.

```viml
!filename: $HOME/.config/nvim/init.vim
Plug 'itchyny/lightline.vim'
```


# Konfigurasi

Contoh-contoh konfigurasi dapat teman-teman lihat pada halaman GitHub dari Lightline.

Saya akan langsung menunjukkan konfigurasi yang saya lakukan pada bagian kedua ini.

```viml
!filename: $HOME/.config/nvim/init.vim
" LightLine

let g:lightline = {
\   'colorscheme': 'codedark_bandit',
\   'active': {
\    'left' : [[ 'mode', 'paste' ],
\              [ 'gitbranch' ],
\              [ 'filename' ]],
\    'right': [[ 'trailing' ],
\              [ 'lineinfo' ],
\              [ 'percent' ],
\              [ 'filetype', 'fileencoding', 'fileformat' ] ]
\   },
\   'tab': {
\     'active'   : ['tabnum'],
\     'inactive' : ['tabnum']
\   },
\   'tabline': {
\   'left'  : [['buffers']],
\   'right' : [['string1'], ['string2', 'smarttabs']]
\   },
\   'separator': {
\     'left': '', 'right': ''
\   },
\   'subseparator': {
\   'left': '\u2502', 'right': '\u2502'
\   },
\   'component': {
\     'filename': '%<%{LightlineFileName()}'
\   },
\   'component_function': {
\     'gitbranch'    : 'LightlineFugitive',
\     'readonly'     : 'LightlineReadonly',
\     'fileformat'   : 'LightlineFileformat',
\     'filetype'     : 'LightlineFiletype',
\     'fileencoding' : 'LightlineFileEncoding',
\     'lineinfo'     : 'LightlineLineInfo',
\     'percent'      : 'LightlinePercent',
\     'mode'         : 'LightlineMode',
\   },
\   'component_expand': {
\     'buffers'   : 'lightline#bufferline#buffers',
\     'string1'   : 'String1',
\     'string2'   : 'String2',
\     'smarttabs' : 'SmartTabsIndicator',
\     'trailing'  : 'LightlineTrailingWhitespace',
\   },
\   'component_type': {
\   'buffers'  : 'tabsel',
\   'trailing' : 'warning'
\   },
\   'mode_map': {
\     'n'      : ' N0RMAL',
\     'i'      : ' INSERT',
\     'R'      : ' REPLACE',
\     'v'      : ' VISUAL',
\     'V'      : ' V-LINE',
\     "\<C-v>" : ' V-BL0CK',
\     'c'      : ' COMMAND',
\     's'      : ' SELECT',
\     'S'      : ' S-LINE',
\     "\<C-s>" : ' S-BL0CK',
\     't'      : ' TERMINAL',
\   }
\}

function! LightlineReadonly()
  return &readonly ? '' : ''
endfunction

function! LightlineFugitive()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    if exists('*fugitive#head')
      let branch = fugitive#head()
      return branch !=# '' ? ' ' . branch : ''
    endif
    return fugitive#head()
  else
    return ''
  endif
endfunction

function! LightlineFileformat()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    return winwidth(0) > 70 ? (&fileformat . ' ' . WebDevIconsGetFileFormatSymbol()) . ' ' : ''
  else
    return ''
  endif
endfunction

function! LightlineFiletype()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    return winwidth(0) > 70 ? (strlen(&filetype) ? &filetype . ' ' . WebDevIconsGetFileTypeSymbol() : 'no ft') : ''
  else
    return ''
  endif
endfunction

function! LightlineFileEncoding()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    return &fileencoding
  else
    return ''
  endif
endfunction

function! LightlineLineInfo()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    let current_line = printf('%3s', line('.'))
    let current_col  = printf('%-3s', col('.'))
    let lineinfo     = ' ' . current_line . ':' . current_col
    return lineinfo
  else
    return ''
  endif
endfunction

function! LightlinePercent()
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    return printf(' %3s', (line('.') * 100 / line('$'))) . '%'
  else
    return ''
  endif
endfunction

function! LightlineFileName()
  let filename = expand('%')
  let modified = &modified ? '' : ''
  let readonly = &readonly
  if &filetype !=? 'defx' && &filetype !=? 'tagbar' && &filetype !=? 'taglist'
    if filename ==# ''
      return '[No Name]'
    endif

    let terms = split(filename, ':')
    if terms[0] ==# 'term'
      return '[' . terms[-1] . ']'
    endif

    return filename . ' ' . (readonly ? '' : modified)
  else
    return expand('%:t') ==# '__Tagbar__.1' ? '[tagbar]' :
         \ expand('%:t') ==# '__Tag_List__' ? '[taglist]' :
         \ &filetype ==# 'defx' ?  '[defx]' :
         \ ''
  endif
endfunction

function! LightlineMode()
  return expand('%:t') ==# '__Tagbar__.1' ? ' TAGBAR' :
       \ expand('%:t') ==# '__Tag_List__' ? ' TAGLIST' :
       \ &filetype ==# 'defx' ?  ' DEFX' :
       \ lightline#mode()
endfunction

function! String1()
  return ' BANDITHIJO.GITHUB.IO'
endfunction

function! String2()
  return 'BUFFERS'
endfunction

function! SmartTabsIndicator()
  let tabs = lightline#tab#tabnum(tabpagenr())
  let tab_total = tabpagenr('$')
  return tabpagenr('$') > 1 ? ('TABS ' . tabs . '/' . tab_total) : ''
endfunction

function! LightlineTrailingWhitespace()
  if &filetype !=? 'defx'
    let status = lightline#trailing_whitespace#component()
    return status == 'trailing' ? '!' : ''
  else
    return ''
  endif
endfunction

" autoreload
command! LightlineReload call LightlineReload()

function! LightlineReload()
  call lightline#init()
  call lightline#colorscheme()
  call lightline#update()
endfunction

set showtabline=2  " Show tabline, 2 show, 1 hide
set guioptions-=e  " Don't use GUI tabline
```


# Penjelasan

Seperti yang dapat dilihat di atas, cukup banyak function yang saya definisikan.

Saya membuat function agar lebih leluasa untuk memodifikasi isi dari statusline apabila dirasa tampilan default yang dsediakan kurang mencukupi.

Function-function modifikasi ini nantinya ditempatkan pada `'component_function': {..}`.


# Credit

Terima kasih kepada mas [Yeri](https://yeripratama.com/blog/customizing-vim-lightline/), untuk catatan di blognya.


# Pesan Penulis

Sepertinya, segini dulu yang dapat saya tuliskan.

Untuk konfigurasi Lightline milik saya yang lebih terbaru, dapat teman-teman kunjungi [di sini](https://github.com/bandithijo/nvimrc/blob/master/plugin-config/lightline.vim).

Mudah-mudahan dapat bermanfaat.

Terima kasih.

(^_^)

# Referensi

1. [github.com/itchyny/lightline.vim](https://github.com/itchyny/lightline.vim) \
   Diakses tanggal: 2020-10-30

1. [hagen.dev/kristoffer/dotfiles - [nvim] Lightline config](https://hagen.dev/kristoffer/dotfiles/commit/c833b54013c7a3522315da362b548595be098a6b) \
   Diakses tanggal: 2020-10-30
