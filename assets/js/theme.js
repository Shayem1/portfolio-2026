/* portfolio-2026 — experimental theme switcher (temporary feature)
   Auto = system default (light mode -> Blue, dark mode -> Night).
   The dynamic pill beside Auto always shows the OPPOSITE of the system default and pins it.
   Pills: Auto · <opposite> · Paper · Amber.
   ?theme=<auto|paper|blue|night|amber> overrides per visit; choices persist in localStorage.
   html[data-theme] is applied before first paint. */
(function () {
  var fixed = ["paper", "blue", "night", "amber"];
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function sysTheme() { return mq && mq.matches ? "night" : "blue"; }
  function opposite() { return sysTheme() === "blue" ? "night" : "blue"; }

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
  var dynBtn = null;
  var state = "auto";

  function activeTokenFor(t) {
    /* a pinned theme identical to the system default behaves (and reads) like Auto */
    if (t === "auto" || t === sysTheme()) return "auto";
    return t;
  }
  function refreshDynamic() {
    if (!dynBtn) return;
    var o = opposite();
    dynBtn.setAttribute("data-theme", o);
    dynBtn.textContent = o.charAt(0).toUpperCase() + o.slice(1);
    dynBtn.title = "Opposite of your system default (" + sysTheme() + ")";
  }
  function apply(t) {
    state = t;
    var real = t === "auto" ? sysTheme() : t;
    document.documentElement.setAttribute("data-theme", real);
    try {
      if (t === "auto") localStorage.removeItem("pf-theme");
      else localStorage.setItem("pf-theme", t);
    } catch (e) {}
    var active = activeTokenFor(t);
    btns.forEach(function (b) {
      var on = b.getAttribute("data-theme") === active;
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
    function mk(theme, text, handler) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tbtn";
      b.setAttribute("data-theme", theme);
      b.textContent = text;
      b.addEventListener("click", handler);
      box.appendChild(b);
      btns.push(b);
      return b;
    }
    mk("auto", "Auto", function () { apply("auto"); });
    dynBtn = mk(opposite(), "", function () { apply(dynBtn.getAttribute("data-theme")); });
    refreshDynamic();
    mk("paper", "Paper", function () { apply("paper"); });
    mk("amber", "Amber", function () { apply("amber"); });
    head.appendChild(box);
    apply(resolve());
    if (mq) {
      var follow = function () {
        refreshDynamic();
        apply(state === "auto" ? "auto" : state);
      };
      if (mq.addEventListener) mq.addEventListener("change", follow);
      else if (mq.addListener) mq.addListener(follow);
    }
  });
})();
