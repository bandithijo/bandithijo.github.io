// darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function() {
  if (darkToggle.checked) {
    html.classList.add('dark');
    localStorage.theme = 'dark'
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light'
  }
})

// dark-toggle based on localStorage value
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}
