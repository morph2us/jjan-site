/* jjan.io 스마트 링크 · App Store 배지 설정 (단일 진실 공급원)
 * - LIVE: 심사 승인 후 true로 바꾸면 /tt /ig /x /go /qr 가 App Store로 가고,
 *         index 히어로 배지가 "App Store에서 받기" 버튼으로 바뀐다.
 * - PT:   App Store Connect > 앱 분석 > 캠페인 링크 생성기에서 보이는 provider ID(숫자).
 *         비어 있으면 ct(캠페인) 태깅은 되지 않고 스토어 링크만 동작한다.
 */
window.JJAN = {
  LIVE: true,
  PLAY_LIVE: true,            // 안드로이드 프로덕션 공개 후 true 유지
  APP_ID: "6806622099",
  PLAY_PKG: "io.jjan",
  PT: "",
  CAMPAIGNS: { tt: "tiktok", ig: "instagram", x: "x", go: "site", qr: "offline", get: "direct" }
};

(function () {
  var C = window.JJAN;

  C.storeURL = function (ct) {
    var u = "https://apps.apple.com/app/apple-store/id" + C.APP_ID + "?mt=8";
    if (C.PT) u += "&pt=" + encodeURIComponent(C.PT) + "&ct=" + encodeURIComponent(ct || "site");
    return u;
  };

  C.playURL = function (ct) {
    return "https://play.google.com/store/apps/details?id=" + C.PLAY_PKG +
      "&referrer=" + encodeURIComponent("utm_source=jjan.io&utm_campaign=" + (ct || "site"));
  };

  C.isAndroid = function () {
    return /android/i.test(navigator.userAgent || "");
  };

  // ?src= 채널 태그(예: /get?src=ig_en) — 소문자·숫자·_·- 32자까지만 캠페인으로 쓴다
  C.srcParam = function () {
    var m = /[?&]src=([^&#]*)/.exec(location.search || "");
    if (!m) return null;
    var v = decodeURIComponent(m[1].replace(/\+/g, " ")).toLowerCase();
    return /^[a-z0-9_-]{1,32}$/.test(v) ? v : null;
  };

  // 스마트 링크 페이지(/tt 등)에서 호출 — 기기별 스토어 분기
  C.redirect = function (key) {
    var ct = C.srcParam() || C.CAMPAIGNS[key] || key;
    var dest;
    if (C.isAndroid()) {
      dest = C.PLAY_LIVE ? C.playURL(ct) : "/?from=" + encodeURIComponent(ct);
    } else {
      dest = C.LIVE ? C.storeURL(ct) : "/?from=" + encodeURIComponent(ct);
    }
    location.replace(dest);
  };

  // index 히어로 배지 전환
  C.applyBadge = function () {
    var el = document.getElementById("store-badge");
    if (!el || !C.LIVE) return;
    var a = document.createElement("a");
    a.className = "badge live";
    a.href = C.storeURL("site");
    a.textContent = "App Store에서 받기";
    el.replaceWith(a);
    var n = document.querySelector(".notify");
    if (n) n.remove();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", C.applyBadge);
  else C.applyBadge();
})();

// 언어 드롭다운 — 바깥 탭/클릭 시 닫기
document.addEventListener("click", function (e) {
  document.querySelectorAll("details.langmenu[open]").forEach(function (d) {
    if (!d.contains(e.target)) d.removeAttribute("open");
  });
});
