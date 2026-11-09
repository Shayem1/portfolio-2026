/* portfolio-2026 — experimental theme switcher (temporary feature)
   Applies html[data-theme] before first paint, adds pills to .site-head,
   persists in localStorage, and honours ?theme=<paper|blue|night|amber> in the URL. */
(function () {
  var THEMES = [["paper", "Paper"], ["blue", "Blue"], ["night", "Night"], ["amber", "Amber"]];
  var keys = THEMES.map(function (t) { return t[0]; });

  function load() {
    try {
      var q = new URLSearchParams(window.location.search).get("theme");
      if (q && keys.indexOf(q) !== -1) return q;
      var s = localStorage.getItem("pf-theme");
      return s && keys.indexOf(s) !== -1 ? s : "paper";
    } catch (e) { return "paper"; }
  }
  function setTheme(t, btns) {
    if (t === "paper") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("pf-theme", t); } catch (e) {}
    if (btns) btns.forEach(function (b) {
      var on = b.getAttribute("data-theme") === t;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  var current = load();
  setTheme(current, null); /* applied during head parse: no flash of the wrong theme */

  document.addEventListener("DOMContentLoaded", function () {
    var head = document.querySelector(".site-head");
    if (!head) return;
    var box = document.createElement("div");
    box.className = "theme-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Theme (experimental)");
    var label = document.createElement("span");
    label.className = "tlabel";
    label.textContent = "theme";
    box.appendChild(label);
    var btns = [];
    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tbtn";
      b.setAttribute("data-theme", t[0]);
      b.textContent = t[1];
      b.addEventListener("click", function () { setTheme(t[0], btns); });
      box.appendChild(b);
      btns.push(b);
    });
    head.appendChild(box);
    setTheme(load(), btns);
  });
})();
