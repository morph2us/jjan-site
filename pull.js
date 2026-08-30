// pull-to-refresh — 최상단에서 아래로 당기면 앰버 링이 차오르고, 임계(80px) 넘겨 놓으면 새로고침
(function () {
  var el = document.createElement("div");
  el.id = "ptr";
  el.innerHTML = '<div class="ptr-ring"></div>';
  document.body.appendChild(el);

  var TH = 80, startY = null, pull = 0, active = false;

  window.addEventListener("touchstart", function (e) {
    if (window.scrollY <= 0) {
      startY = e.touches[0].clientY;
      pull = 0;
      active = true;
    } else {
      active = false;
    }
  }, { passive: true });

  window.addEventListener("touchmove", function (e) {
    if (!active || startY === null) return;
    pull = e.touches[0].clientY - startY;
    if (pull > 0 && window.scrollY <= 0) {
      var p = Math.min(1, pull / TH);
      el.style.opacity = p;
      el.style.transform = "translate(-50%, " + Math.min(pull * 0.45, 64) + "px) rotate(" + p * 270 + "deg)";
    } else {
      el.style.opacity = 0;
    }
  }, { passive: true });

  function end() {
    if (active && pull >= TH) {
      el.classList.add("loading");
      el.style.transform = "translate(-50%, 64px)";
      setTimeout(function () { location.reload(); }, 150);
    } else {
      el.style.opacity = 0;
      el.style.transform = "translate(-50%, 0)";
    }
    startY = null; active = false; pull = 0;
  }
  window.addEventListener("touchend", end);
  window.addEventListener("touchcancel", end);
})();
