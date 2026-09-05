/* jjan.io 스마트 링크 · App Store 배지 설정 (단일 진실 공급원)
 * - LIVE: 심사 승인 후 true로 바꾸면 /tt /ig /x /go /qr 가 App Store로 가고,
 *         index 히어로 배지가 "App Store에서 받기" 버튼으로 바뀐다.
 * - PT:   App Store Connect > 앱 분석 > 캠페인 링크 생성기에서 보이는 provider ID(숫자).
 *         비어 있으면 ct(캠페인) 태깅은 되지 않고 스토어 링크만 동작한다.
 */
window.JJAN = {
  LIVE: false,
  APP_ID: "6806622099",
  PT: "",
  CAMPAIGNS: { tt: "tiktok", ig: "instagram", x: "x", go: "site", qr: "offline" }
};

(function () {
  var C = window.JJAN;

  C.storeURL = function (ct) {
    var u = "https://apps.apple.com/app/apple-store/id" + C.APP_ID + "?mt=8";
    if (C.PT) u += "&pt=" + encodeURIComponent(C.PT) + "&ct=" + encodeURIComponent(ct || "site");
    return u;
  };

  // 스마트 링크 페이지(/tt 등)에서 호출
  C.redirect = function (key) {
    var ct = C.CAMPAIGNS[key] || key;
    var dest = C.LIVE ? C.storeURL(ct) : "/?from=" + encodeURIComponent(ct);
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
