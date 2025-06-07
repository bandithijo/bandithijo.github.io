document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.location.origin;

  document.querySelectorAll("a[href^='http']").forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href.startsWith(baseUrl)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "nofollow noreferrer");
    }
  });
});
