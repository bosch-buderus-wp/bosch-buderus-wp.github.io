/* Presentation enhancements; article content and chapter order stay untouched. */
document.addEventListener("DOMContentLoaded", function () {
  var normalizePath = function (path) { return path.replace(/\/$/, ""); };
  var updateNavigation = function () {
    document.querySelectorAll(".nav__items a").forEach(function (link) {
      var url = new URL(link.href, location.href);
      var current = url.origin === location.origin &&
        normalizePath(url.pathname) === normalizePath(location.pathname) &&
        (url.hash ? url.hash === location.hash : !location.hash.startsWith("#/"));
      if (current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };
  updateNavigation();
  window.addEventListener("hashchange", updateNavigation);

  // Keep access requirements next to the title, ahead of the mobile contents.
  var access = document.querySelector(".smarthome-access");
  var pageTitle = document.getElementById("page-title");
  if (access && pageTitle) pageTitle.insertAdjacentElement("afterend", access);

  // Make the theme's existing mobile navigation toggle keyboard accessible.
  var checkbox = document.getElementById("ac-toc");
  var label = document.querySelector('label[for="ac-toc"]');
  var navigation = document.querySelector(".nav__items");
  if (checkbox && label && navigation) {
    navigation.id = navigation.id || "chapter-navigation";
    label.setAttribute("role", "button");
    label.setAttribute("tabindex", "0");
    label.setAttribute("aria-controls", navigation.id);
    var reflectExpanded = function () {
      label.setAttribute("aria-expanded", String(checkbox.checked));
    };
    reflectExpanded();
    checkbox.addEventListener("change", reflectExpanded);
    label.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        checkbox.checked = !checkbox.checked;
        reflectExpanded();
      }
    });
  }

  // Reuse the original contents heading as the disclosure label.
  var toc = document.querySelector(".toc");
  var title = toc && toc.querySelector(".nav__title");
  var menu = toc && toc.querySelector(".toc__menu");
  if (title && menu) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "toc-toggle";
    while (title.firstChild) button.appendChild(title.firstChild);
    title.appendChild(button);
    menu.id = menu.id || "article-contents";
    button.setAttribute("aria-controls", menu.id);
    var desktop = window.matchMedia("(min-width: 64em)");
    var sidebar = toc.closest(".sidebar__right");
    var content = sidebar && sidebar.parentElement;
    var article = content && content.parentElement;
    var alignWithTitle = sidebar && document.body.matches(".layout--single:not(.wide)") &&
      article.classList.contains("page__inner-wrap");
    var setExpanded = function (expanded) {
      button.setAttribute("aria-expanded", String(expanded));
      toc.classList.toggle("is-expanded", expanded);
    };
    var syncViewport = function () {
      if (alignWithTitle) {
        // Share the title's container on desktop; keep the mobile reading order.
        var parent = desktop.matches ? article : content;
        if (sidebar.parentElement !== parent) parent.insertBefore(sidebar, parent.firstChild);
      }
      button.disabled = desktop.matches;
      setExpanded(desktop.matches);
    };
    toc.classList.add("has-toggle");
    syncViewport();
    desktop.addEventListener("change", syncViewport);
    button.addEventListener("click", function () {
      setExpanded(button.getAttribute("aria-expanded") !== "true");
    });
  }
});
