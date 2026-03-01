document.addEventListener("DOMContentLoaded", function () {
  var headlineMeta = document.querySelector('meta[name="page-headline"]');
  var pageTitle = document.getElementById("page-title");

  if (!headlineMeta || !pageTitle) {
    return;
  }

  pageTitle.textContent = headlineMeta.getAttribute("content");
});
