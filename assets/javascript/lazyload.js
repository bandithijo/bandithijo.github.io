// Echo.js - Lazy loading library
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.echo = factory(root);
  }
})(this, function (root) {

  'use strict';

  var echo = {};

  var callback = function () { };

  var offset, poll, delay, useDebounce, unload;

  var isHidden = function (element) {
    return (element.offsetParent === null);
  };

  var inView = function (element, view) {
    if (isHidden(element)) {
      return false;
    }

    var box = element.getBoundingClientRect();
    return (
      box.right >= view.l &&
      box.bottom >= view.t &&
      box.left <= view.r &&
      box.top <= view.b
    );
  };

  var debounceOrThrottle = function () {
    if (!useDebounce && !!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function () {
      echo.render();
      poll = null;
    }, delay);
  };

  echo.init = function (opts) {
    opts = opts || {};
    var offsetAll = opts.offset || 0;
    var offsetVertical = opts.offsetVertical || offsetAll;
    var offsetHorizontal = opts.offsetHorizontal || offsetAll;
    var optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10);
    };
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    };
    delay = optionToInt(opts.throttle, 250);
    useDebounce = opts.debounce !== false;
    unload = !!opts.unload;
    callback = opts.callback || callback;
    echo.render();
    if (document.addEventListener) {
      root.addEventListener('scroll', debounceOrThrottle, false);
      root.addEventListener('load', debounceOrThrottle, false);
      root.addEventListener('resize', debounceOrThrottle, false);
    } else {
      root.attachEvent('onscroll', debounceOrThrottle);
      root.attachEvent('onload', debounceOrThrottle);
      root.attachEvent('onresize', debounceOrThrottle);
    }
  };

  echo.render = function (context) {
    var nodes = (context || document).querySelectorAll('[data-echo], [data-echo-background]');
    var length = nodes.length;
    var src, elem;
    var view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
    };
    for (var i = 0; i < length; i++) {
      elem = nodes[i];

      // If element is in view, start loading it (only once)
      if (inView(elem, view)) {

        // If element is a background placeholder
        if (elem.getAttribute('data-echo-background') !== null) {
          var bgSrc = elem.getAttribute('data-echo-background');

          // Do not restart loading if already loading or already applied
          if (!elem.dataset.echoBgLoading && elem.style.backgroundImage.indexOf(bgSrc) === -1) {
            elem.dataset.echoBgLoading = 'true';
            // Use an Image to preload background so placeholder remains until loaded
            var bgImg = new Image();
            bgImg.onload = (function(el, src) {
              return function () {
                el.style.backgroundImage = 'url(' + src + ')';
                el.classList.remove('lazy-loading');
                el.classList.add('lazy-loaded');
                delete el.dataset.echoBgLoading;
                // remove attribute if not using unload
                if (!unload) {
                  el.removeAttribute('data-echo-background');
                }
                callback(el, 'load');
              };
            })(elem, bgSrc);
            bgImg.onerror = (function(el) {
              return function () {
                delete el.dataset.echoBgLoading;
                // fallback to theme-aware placeholder for backgrounds
                var placeholder = getPlaceholderPath();
                el.style.backgroundImage = 'url(' + placeholder + ')';
                el.classList.add('img-error');
                callback(el, 'unload');
              };
            })(elem);
            bgImg.src = bgSrc;
            // Keep placeholder styling while loading
            elem.classList.add('lazy-loading');
          }
        }
        // If element is an <img>
        else if (elem.getAttribute('data-echo') !== null) {
          // Avoid changing src if already loading to prevent restart
          if (elem.dataset.echoLoading) {
            continue;
          }

          src = elem.getAttribute('data-echo');

          // Nothing to do if src is empty
          if (!src) {
            continue;
          }

          // If current displayed src already equals final src, treat as loaded
          if (elem.src === src) {
            // Clean up attributes if necessary
            if (!unload) {
              elem.removeAttribute('data-echo');
            }
            callback(elem, 'load');
            continue;
          }

          // Begin loading: mark as loading and keep placeholder visible until onload
          elem.dataset.echoLoading = 'true';
          elem.classList.add('lazy-loading');

          // Preserve existing handlers
          var prevOnload = elem.onload;
          var prevOnerror = elem.onerror;

          // Attach new onload to swap UI when done
          elem.onload = (function(el, prev) {
            return function () {
              try {
                this.style.opacity = '1';
              } catch (e) {}
              el.classList.remove('lazy-loading');
              el.classList.add('lazy-loaded');
              delete el.dataset.echoLoading;
              // Remove data attribute so we don't reload
              if (!unload) {
                el.removeAttribute('data-echo');
              }
              // call original onload if existed
              if (typeof prev === 'function') {
                try { prev.call(el); } catch (e) {}
              }
              // cleanup assigned handlers to avoid leaks
              el.onload = null;
              callback(el, 'load');
            };
          })(elem, prevOnload);

          // Attach onerror to show placeholder and avoid loops
          elem.onerror = (function(el, prevErr) {
            return function () {
              delete el.dataset.echoLoading;
              // Set theme-aware placeholder
              imgError(el);
              // call original onerror if existed
              if (typeof prevErr === 'function') {
                try { prevErr.call(el); } catch (e) {}
              }
              // cleanup event
              el.onerror = null;
              callback(el, 'unload');
            };
          })(elem, prevOnerror);

          // Trigger network load by assigning src (browser keeps showing previous src until new image paints)
          elem.src = src;
        }

        // If unload is false, remove data-echo attributes for elements already processed above is handled.
      }
      // If element is out of view and unload is enabled, revert to placeholder
      else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = 'url(' + src + ')';
        }
        else {
          // Only revert if not currently loading
          if (!elem.dataset.echoLoading) {
            elem.src = src;
          }
        }

        elem.removeAttribute('data-echo-placeholder');
        callback(elem, 'unload');
      }
    }
    if (!length) {
      echo.detach();
    }
  };

  echo.detach = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', debounceOrThrottle);
    } else {
      root.detachEvent('onscroll', debounceOrThrottle);
    }
    clearTimeout(poll);
  };

  return echo;
});

// Improved fallback image handler and theme-aware placeholders
function getPlaceholderPath() {
  // Prefer explicit localStorage.theme, otherwise look at html class or prefers-color-scheme
  try {
    var theme = localStorage.theme;
    if (theme === 'dark') return "/assets/images/bandithijo_logo_dark.svg";
    if (theme === 'light') return "/assets/images/bandithijo_logo.svg";
  } catch (e) {
    // ignore localStorage errors (e.g., private mode)
  }

  var htmlIsDark = document && document.documentElement && document.documentElement.classList.contains('dark');
  if (htmlIsDark) return "/assets/images/bandithijo_logo_dark.svg";

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return "/assets/images/bandithijo_logo_dark.svg";
  }
  return "/assets/images/bandithijo_logo.svg";
}

function imgError(image) {
  // Prevent infinite error loops
  if (image.dataset.errorHandled) {
    return true;
  }

  image.dataset.errorHandled = 'true';
  image.onerror = null; // Remove error handler to prevent loops

  // For <img>, set src to placeholder; for other elements, set backgroundImage
  var placeholder = getPlaceholderPath();
  try {
    if (image.tagName && image.tagName.toLowerCase() === 'img') {
      image.src = placeholder;
    } else {
      image.style.backgroundImage = 'url(' + placeholder + ')';
    }
  } catch (e) {
    // ignore assignment errors
  }

  // Optional: Add a class for styling broken images
  image.classList.add('img-error');

  return true;
}

// Enhanced lazy loading initialization
function initLazyLoading() {
  // First, transform images to be lazy-loadable
  transformImagesToLazy();

  // Then initialize Echo.js
  echo.init({
    offset: 2500,
    throttle: 250,
    unload: false,
    callback: function (element, op) {
      // Add loaded class for styling
      if (op === 'load') {
        element.classList.add('lazy-loaded');
      }
    }
  });
}

// Transform images to be lazy-loaded
function transformImagesToLazy() {
  var placeholder = getPlaceholderPath();

  // Target images in markdown content
  const images = document.querySelectorAll(".markdown p img, .content img, article img");

  images.forEach(function(img) {
    // Skip if already has data-echo (processed)
    if (img.dataset.echo) {
      return;
    }
    var srcAttr = img.getAttribute('src') || '';
    if (srcAttr.indexOf('bandithijo_logo.svg') !== -1 || srcAttr.indexOf('bandithijo_logo_dark.svg') !== -1) {
      // Already a placeholder; ensure it's the correct placeholder
      img.setAttribute("src", placeholder);
      img.onerror = function() { imgError(this); };
      img.classList.add('lazy-loading');
      img.style.transition = img.style.transition || 'opacity 0.3s ease';
      img.style.opacity = img.style.opacity || '0.7';
      return;
    }

    // Store original src in data-echo attribute but only if src is valid
    var originalSrc = img.getAttribute('src') || img.src || '';
    if (originalSrc && originalSrc.trim() !== '') {
      img.setAttribute("data-echo", originalSrc);
      img.setAttribute("src", placeholder);

      // Set up error handling
      img.onerror = function() {
        imgError(this);
      };

      // Add loading class for styling
      img.classList.add('lazy-loading');

      // Optional: Add loading animation or placeholder styling
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '0.7';

      // Note: onload will be attached by echo.render when element enters viewport
      // but preserve existing onload if present by moving it to data attribute
      if (img.onload) {
        try {
          img.dataset._originalOnload = '1'; // placeholder marker; original function can't be serialized
          // We'll try to call existing onload from echo.render via invoking stored handler if possible,
          // but since function references can't be stored as dataset, we preserve behavior by not overwriting here.
        } catch (e) {}
      }
    }
  });
}

// Update placeholders when theme changes
function updateLazyPlaceholders() {
  var placeholder = getPlaceholderPath();
  var otherPlaceholder = placeholder.indexOf('dark') !== -1 ? "/assets/images/bandithijo_logo.svg" : "/assets/images/bandithijo_logo_dark.svg";

  var images = document.querySelectorAll(".markdown p img, .content img, article img, img");
  images.forEach(function(img) {
    // Only swap if the image is currently showing a placeholder (either version)
    var srcAttr = img.getAttribute('src') || '';
    if (srcAttr.indexOf('bandithijo_logo.svg') !== -1 || srcAttr.indexOf('bandithijo_logo_dark.svg') !== -1) {
      img.setAttribute('src', placeholder);
    }

    // If data-echo-placeholder exists (used when unload true), update it too
    var echoPlaceholder = img.getAttribute('data-echo-placeholder');
    if (echoPlaceholder && (echoPlaceholder.indexOf('bandithijo_logo.svg') !== -1 || echoPlaceholder.indexOf('bandithijo_logo_dark.svg') !== -1)) {
      img.setAttribute('data-echo-placeholder', placeholder);
    }
  });

  // Trigger echo.render to ensure viewport images re-evaluate (if echo exists)
  if (window.echo && typeof window.echo.render === 'function') {
    window.echo.render();
  }
}

// Expose update function so darkmode script can call it
window.updateLazyPlaceholders = updateLazyPlaceholders;

// Enhanced DOM ready handler
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Initialize when DOM is ready
domReady(function() {
  initLazyLoading();

  // Also handle dynamically added content
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let shouldRender = false;

      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              const newImages = node.querySelectorAll && node.querySelectorAll('img');
              if (newImages && newImages.length > 0) {
                // Transform new images
                newImages.forEach(function(img) {
                  if (!img.dataset.echo && img.src && img.src.indexOf('bandithijo_logo.svg') === -1 && img.src.indexOf('bandithijo_logo_dark.svg') === -1) {
                    // store and swap to current theme placeholder
                    var placeholder = getPlaceholderPath();
                    img.setAttribute("data-echo", img.src);
                    img.setAttribute("src", placeholder);
                    img.onerror = function() { imgError(this); };
                    img.classList.add('lazy-loading');
                  }
                });
                shouldRender = true;
              }
            }
          });
        }
      });

      if (shouldRender && window.echo) {
        echo.render();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});

// Optional: Manual trigger for lazy loading (useful for SPA navigation)
window.refreshLazyLoading = function() {
  transformImagesToLazy();
  if (window.echo) {
    echo.render();
  }
};
