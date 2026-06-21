# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bin/dev                                    # Start dev server (Jekyll + livereload via foreman)
bundle exec jekyll s --watch --livereload  # Alternative: start dev server directly
bundle exec jekyll build                   # Production build → _site/
bundle install                             # Install Ruby gems
```

## Architecture

Jekyll 4.4.1 static blog with Tailwind CSS (via `jekyll-tailwindcss` gem). Deployed on Netlify.

**Layout chain**: `baseof.html` (HTML shell + nav + footer) → content layouts (`post`, `page`, `home`, etc.)

**Content categories**: Posts in `_posts/` use front matter `categories: [blog]` or `categories: [note]` to appear on `/blog/` or `/note/` respectively. The `pages/blog.html` and `pages/note.html` filter by these categories.

**Data files** (`_data/`):
- `blogroll.yml` — friend/contributor profiles rendered on blogroll page and in post author bio (matched by `github_username`)
- `profile.yml` — site owner profile
- `products.yml` — products page data

**Tailwind**: Custom Solarized color palette defined in `tailwind.config.js`. Dark mode uses `darkMode: "class"`. CSS source is `_tailwind.css`.

**JS** (`assets/javascript/`): Vanilla JS files loaded globally — `darkmode.js`, `nav.js`, `lazyload.js`, `headings-permalink.js`, `external-link-open-new-tab.js`.

**Post layout extras** (`_layouts/post.html`):
- Lightbox on `.markdown img` (click to zoom)
- Code blocks support `!filename:foo.rb` as first line to render a filename label above the block
- Paragraphs matching `^Gambar \d+\.` (Indonesian "Figure N.") are auto-centered as captions
- Prev/next navigation within `site.categories.blog`
- Author bio from `_data/blogroll.yml` rendered below post if `page.author` matches a `github_username`

**Custom plugin**: `_plugins/youtube.rb` — Liquid tag for embedding YouTube videos.

## Writing posts

Follow CommonMark spec as closely as possible. Avoid custom markdown modifications. Front matter fields: `layout`, `title`, `date`, `author`, `categories`, `tags`.
