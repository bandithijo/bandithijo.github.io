// darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

function updatePlaceholdersForTheme() {
  // If lazyload script exposes this function, call it to swap placeholders
  if (window.updateLazyPlaceholders && typeof window.updateLazyPlaceholders === 'function') {
    window.updateLazyPlaceholders();
  }
}

if (darkToggle) {
  darkToggle.addEventListener('click', function() {
    if (darkToggle.checked) {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    }

    // Update placeholder images after theme change
    updatePlaceholdersForTheme();
  });
}

// dark-toggle based on localStorage value
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  if (darkToggle) darkToggle.checked = true;
  html.classList.add('dark');
} else {
  if (darkToggle) darkToggle.checked = false;
  html.classList.remove('dark');
}

// Ensure placeholders match initial theme
updatePlaceholdersForTheme();
