---
layout: "post"
title: "Memasang GitHub Copilot dan CopilotChat di Neovim macOS"
date: "2025-12-18 00:52"
permalink: "/blog/:title"
assets: "/assets/images/posts/blog/2025/2025-12-18-memasang-github-copilot-dan-copilotchat-di-neovim-macos"
author: "BanditHijo"
category: "blog"
tags: ["neovim", "github", "copilot"]
description: "Saya terbilang cukup terlambat untuk mencoba GitHub Copilot di Neovim. Karena teman-teman yang lain di group Telegram Vim Indonesia sudah lebih dulu mencobanya dan membagikan pengalaman mereka dalam menggunakan GitHub Copilot ataupun code assistant lainnya di Neovim."
---

{{ page.description }}


## Requirements

`neovim 0.10.0+`, `curl 8.0.0+`, `nodejs`, `gh`, `plenary.nvim`, `telescope.nvim`


## Optional Dependencies

1. `tiktoken` - for accurate token counting
1. `git` - for git diff context features
1. `ripgrep` - for improved search performance
1. `lynx` - for improved URL context features


## Instalasi


### Authentikasi GitHub via GitHub CLI

Saya menggunakan Homebrew untuk memasang GitHub CLI di macOS.

```
$ brew install gh
```

Setelah terpasang, saya melakukan autentikasi dengan perintah berikut,

```
$ gh auth login
```

Nanti akan muncul pilihan untuk memilih metode autentikasi. Saya memilih `Web browser` lalu mengikuti langkah-langkah yang diberikan.


### Pasang di Neovim

Saya menggunakan `packer.nvim` sebagai plugin manager di Neovim.

```lua
require("packer").startup(function(use)
  -- github copilot
  use {
    'CopilotC-Nvim/CopilotChat.nvim',
    requires = {
      { "github/copilot.vim" },
      { "nvim-lua/plenary.nvim" },
      { "nvim-telescope/telescope.nvim" },
    }
  }
end)
```

Lalu saya jalankan perintah `:PackerInstall` di Neovim untuk menginstal plugin tersebut.


### Build tiktoken

Untuk memasang `tiktoken` di macOS, saya menggunakan make di direktori repositori `CopilotChat.nvim`.

Saya masuk ke direktori berikut,

```
$ cd ~/.local/share/nvim/site/pack/packer/start/CopilotChat.nvim/
```

Lalu saya jalankan perintah berikut,

```
$ make tiktoken
```

Outputnya seperti berikut, berarti pemasangan `tiktoken` berhasil.

```
mkdir -p build
curl -LSsf https://github.com/gptlang/lua-tiktoken/releases/latest/download/tiktoken_core-macOS-arm64-luajit.dylib -o build/tiktoken_core.dylib
curl -LSsf https://github.com/gptlang/lua-tiktoken/releases/latest/download/tiktoken_core-macOS-arm64-lua51.dylib -o build/tiktoken_core-lua51.dylib
```

Karena saya menggunakan macOS M4 dengan arsitektur ARM64, `make titktoken` tidak melakukan kompilasi, tetapi mengunduh file prebuit binary `.dylib` dari repositori `lua-tiktoken` di GitHub.

Untuk mengetahui apakah sudah berhasil atau belum, saya melakukan pengecekan dengan menjalankan perintah berikut di Neovim,

```
:lua print(require("CopilotChat.tiktoken"))
```

Outputnya seperti berikut, berarti `tiktoken` sudah berhasil dipasang.

```
table: 0x010180e018
```

Setelah berhasil, saya menambahkan `run = "make tiktoken"` di konfigurasi `packer.nvim` seperti berikut,

```lua
require("packer").startup(function(use)
  -- github copilot
  use {
    'CopilotC-Nvim/CopilotChat.nvim',
    requires = {
      { "github/copilot.vim" },
      { "nvim-lua/plenary.nvim" },
      { "nvim-telescope/telescope.nvim" },
    },
    run = "make tiktoken", -- 👈
  }
end)
```


### Setup file konfigurasi di Neovim

Agar bisa merubah-rubah konfigurasi di GitHub CopilotChat, saya menambahkan konfigurasi berikut Neovim saya.

```lua
require("packer").startup(function(use)
  -- github copilot
  use {
    'CopilotC-Nvim/CopilotChat.nvim',
    requires = {
      { "github/copilot.vim" },
      { "nvim-lua/plenary.nvim" },
      { "nvim-telescope/telescope.nvim" },
    },
    config = require("config.CopilotChat"), -- 👈
    run = "make tiktoken",
  }
end)
```

Lalu saya membuat file `~/.config/nvim/lua/config/CopilotChat.lua` dengan isi sebagai berikut,

Dan ini adalah konfigurasi yang saya gunakan.

```lua
local status_ok, _ = pcall(require, "CopilotChat")
if not status_ok then
  return
end

require("CopilotChat").setup({
  model = 'gpt-5-mini', -- Default model to use, see ':CopilotChatModels' for available models (can be specified manually in prompt via $).
  language = 'Indonesian', -- Default language to use for answers
  show_help = true, -- Shows help message as virtual lines when waiting for user input
  show_folds = true, -- Shows folds for sections in chat
  auto_fold = false, -- Automatically non-assistant messages in chat (requires 'show_folds' to be true)
  highlight_selection = true, -- Highlight selection
  highlight_headers = true, -- Highlight headers in chat
  auto_follow_cursor = true, -- Auto-follow cursor in chat
  insert_at_end = true, -- Move cursor to end of buffer when inserting text
  window = {
    layout = 'vertical', -- 'vertical', 'horizontal', 'float', 'replace', or a function that returns the layout
    relative = 'editor',
    border = 'single',
    -- width = 0.3, -- fractional width of parent, or absolute width in columns when > 1
    width = 70, -- fractional width of parent, or absolute width in columns when > 1
    height = 0.5, -- fractional height of parent, or absolute height in rows when > 1
  }, --- 
  headers = {
    user = ' User', -- Header to use for user questions
    assistant = ' Copilot', -- Header to use for AI answers
    tool = ' Tool', -- Header to use for tool calls
  },
  mappings = {
    accept_diff = {
      insert = "<C-S-y>",
      normal = "<C-S-y>"
    },
    close = {
      insert = "<C-c>",
      normal = "q"
    },
    complete = {
      insert = "<Tab>"
    },
    jump_to_diff = {
      normal = "gj"
    },
    quickfix_answers = {
      normal = "gqa"
    },
    quickfix_diffs = {
      normal = "gqd"
    },
    reset = {
      insert = "<C-l>",
      normal = "<C-l>"
    },
    show_diff = {
      normal = "gd"
    },
    show_help = {
      normal = "gh"
    },
    show_info = {
      normal = "gc"
    },
    submit_prompt = {
      insert = "<C-s>",
      normal = "<CR>"
    },
    yank_diff = {
      normal = "gy",
      register = '"'
    },
    disable_default_keymaps = false,
  },

  -- default providers
  providers = require('CopilotChat.config.providers'),

  -- default functions
  functions = require('CopilotChat.config.functions'),

  -- default prompts
  prompts = require('CopilotChat.config.prompts'),

  -- default mappings
  -- mappings = require('CopilotChat.config.mappings'),
})

-- Auto-command to customize chat buffer behavior
vim.api.nvim_create_autocmd('BufEnter', {
  pattern = 'copilot-*',
  callback = function()
    vim.opt_local.relativenumber = false
    vim.opt_local.number = false
    vim.opt_local.conceallevel = 0
    -- vim.bo.filetype = 'markdown'
  end,
})

-- In your colorscheme or init.lua
vim.api.nvim_set_hl(0, 'CopilotChatHeader', { fg = '#D16969', bold = true })
vim.api.nvim_set_hl(0, 'CopilotChatSeparator', { fg = '#D16969' })

-- Some plugins (e.g. copilot.vim) may also map common keys like <Tab> in insert mode.
-- To avoid conflicts, disable Copilot's default <Tab> mapping with:
vim.g.copilot_no_tab_map = true
vim.keymap.set('i', '<S-Tab>', 'copilot#Accept("\\<S-Tab>")', { expr = true, replace_keycodes = false })
```

1. Secara default saya menggunakan model `gpt-5-mini`.
1. Saya juga membuat `language` menjadi `Indonesian` agar jawaban yang diberikan dalam bahasa Indonesia.
1. Saya juga mengganti mapping `accept_diff` menjadi `<C-S-y>` agar tidak bentrok dengan mapping navigasi `<C-y` di Neovim yang digunakan untuk scroll ke atas.
1. Untuk accept suggestion dari Copilot, saya mengganti mapping dari `<Tab>` menjadi `<S-Tab>` agar tidak bentrok dengan mapping complete di CopilotChat yang menggunakan `<Tab>`.
1. Saya juga membuat `conceallevel` menjadi `0` agar tidak ada karakter yang disembunyikan di buffer chat CopilotChat.


### Authentikasi GitHub Copilot

Setelah semua terpasang, saya melakukan autentikasi GitHub Copilot dengan perintah berikut di Neovim,

```
:Copilot setup
```

Tinggal mengikuti langkah-langkah yang diberikan untuk menyelesaikan proses autentikasi.


Jika berhasil, bisa cek dengan perintah berikut di Neovim,

```
:Copilot status
```

```
Copilot: Ready
```

Sip! GitHub Copilot dan CopilotChat sudah siap digunakan.


## Penggunaan

Setelah semua terpasang, saya bisa memulai chat dengan GitHub CopilotChat dengan perintah berikut di Neovim,

```
:CopilotChat
```

Lalu akan muncul buffer baru untuk melakukan chat dengan GitHub CopilotChat.

```
 User ──────────────────────────────────────────────────────────
gh to show help
_
```

Setelah menulis pertanyaan, saya bisa mengirimkannya dengan menekan `<C-s>` di mode insert.

```
 User ──────────────────────────────────────────────────────────

hello

 Copilot ────────────────────────────────────────────────────────

Halo — ada yang bisa saya bantu hari ini?

 User ──────────────────────────────────────────────────────────
gh to show help
1079/128000 tokens used
_
```

Untuk melihat `help`, saya bisa menekan `gh` di mode normal.

```
**`Special tokens`**
`@<function>` to share function
`#<function>` to add resource
`#<function>:<input>` to add resource with input
`/<prompt>` to select a prompt
`$<model>` to select a model
`> <text>` to make a sticky prompt (copied to next prompt)

**`Mappings`**
`<C-S-y>` to accept diff
`<C-l>` to reset
`<CR>` or `<C-s>` in insert mode to submit prompt
`<Tab>` in insert mode to complete
`gc` to show info
`gd` to show diff
`gh` to show help
`gj` to jump to diff
`gqa` to quickfix answers
`gqd` to quickfix diffs
`gy` to yank diff
`q` or `<C-c>` in insert mode to close

q to close
```

Selesai! Sekarang saya sudah bisa menggunakan GitHub Copilot dan CopilotChat di Neovim di macOS.

Untuk command lengkap dan dokumentasi lainnya, bisa dilihat di repositori GitHub dari CopilotChat.nvim.


## Referensi

1. [https://github.com/github/copilot.vim](https://github.com/github/copilot.vim) \
   Tanggal diakses: 2025-12-18

1. [https://github.com/CopilotC-Nvim/CopilotChat.nvim](https://github.com/CopilotC-Nvim/CopilotChat.nvim) \
   Tanggal diakses: 2025-12-18
