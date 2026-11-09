/* portfolio-2026 — experimental theme switcher (temporary feature)
   Resolution order: ?theme=<auto|paper|blue|night|amber> > explicit saved choice > system.
   System default: light mode -> Blue, dark mode -> Night. Auto tracks the OS live.
   Applies html[data-theme] before first paint; pills live in .site-head; persists in localStorage. */
(function () {
  var THEMES = [["auto", "Auto"], ["paper", "Paper"], ["blue", "Blue"], ["night", "Night"], ["amber", "Amber"]];
  var fixed = ["paper", "blue", "night", "amber"];
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function sysTheme() { return mq && mq.matches ? "night" : "blue"; }

  function saved() {
    try {
      var s = localStorage.getItem("pf-theme");
      return s && (s === "auto" || fixed.indexOf(s) !== -1) ? s : null;
    } catch (e) { return null; }
  }
  function resolve() {
    try {
      var q = new URLSearchParams(window.location.search).get("theme");
      if (q === "auto") return "auto";
      if (q && fixed.indexOf(q) !== -1) return q;
    } catch (e) {}
    return saved() || "auto";
  }

  var btns = [];
  function apply(t) {
    var real = t === "auto" ? sysTheme() : t;
    document.documentElement.setAttribute("data-theme", real);
    try {
      if (t === "auto") localStorage.removeItem("pf-theme");
      else localStorage.setItem("pf-theme", t);
    } catch (e) {}
    btns.forEach(function (b) {
      var on = b.getAttribute("data-theme") === t;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  var current = resolve();
  apply(current); /* before first paint: no flash of the wrong theme */

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
    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tbtn";
      b.setAttribute("data-theme", t[0]);
      b.textContent = t[1];
      b.addEventListener("click", function () { apply(t[0]); });
      box.appendChild(b);
      btns.push(b);
    });
    head.appendChild(box);
    apply(resolve());
    if (mq) {
      var follow = function () { if (resolve() === "auto") apply("auto"); };
      if (mq.addEventListener) mq.addEventListener("change", follow);
      else if (mq.addListener) mq.addListener(follow);
    }
  });
})();
