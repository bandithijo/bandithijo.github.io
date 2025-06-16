/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./_drafts/**/*.md",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_plugins/**/*.rb",
    "./_pages/*.{html,md}",
    "./_posts/*.md",
    "./*.{html,md}",
    "./**/*.{html,md}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#002B36",
        secondary: "#073642",
        dark: "#000000",
        solarized_base04:  "#04242C",
        solarized_base03:  "#002B36",
        solarized_base02:  "#073642",
        solarized_base02a: "#264B54",
        solarized_base01:  "#586E75",
        solarized_base00:  "#657B83",
        solarized_base0:   "#839496",
        solarized_base1:   "#93A1A1",
        solarized_base2:   "#EEE8D5",
        solarized_base3:   "#FDF6E3",
        solarized_yellow:  "#B58900",
        solarized_orange:  "#CB4B16",
        solarized_red:     "#DC322F",
        solarized_magenta: "#D33682",
        solarized_violet:  "#6C71C4",
        solarized_blue:    "#268BD2",
        solarized_cyan:    "#2AA198",
        solarized_cyana:   "#0C6A69",
        solarized_green:   "#859900",
      },
      fontFamily: {
        sans: ["Open Sans"],
        mono: ["Roboto Mono"]
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
