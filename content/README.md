# 짠 인사이트 콘텐츠 관리

인사이트 탭의 아티클/팁을 **앱 재배포 없이** 늘리고 고칠 수 있는 원격 콘텐츠 시스템입니다.

- 앱은 실행/포그라운드마다 `https://jjan.io/content/insights.json`을 받아 캐시하고, 인사이트 탭에 그립니다.
- 이 파일을 고쳐 `main`에 push하면 → GitHub Pages 배포(1~2분) → **모든 유저**가 다음 실행/포그라운드에서 새 콘텐츠를 봅니다.
- 네트워크 실패·구버전 앱은 앱에 내장된 폴백 콘텐츠를 씁니다(깨지지 않음).

## 어떻게 관리하나

전부 이 리포의 두 곳으로 관리합니다. 별도 관리자 페이지·서버가 없습니다.

- `content/insights.json` — 콘텐츠 본문(섹션·아티클)
- `content/images/` — 아티클 히어로 이미지(PNG)

편집 → 커밋 → push. 끝.

## insights.json 구조

```jsonc
{
  "version": 3,                 // 콘텐츠를 크게 바꿀 때 올려두면 추적에 좋음(앱 동작엔 영향 없음)
  "sections": [
    {
      "id": "body",            // 섹션 고유 id(영문, 고정)
      "title": "술과 몸",
      "subtitle": "몸을 알면, 페이스가 보여요.",  // null이면 부제 없음
      "articles": [
        {
          "id": "asianFlush",              // 아티클 고유 id(영문, 고정 — 바꾸면 다른 글로 취급)
          "sectionTitle": "술과 몸",        // 섹션 title과 동일하게(추천 로직이 참고)
          "title": "얼굴이 빨개지는 체질",     // 카드/리스트 제목
          "heroTitle": "한 잔에 빨개진다면\n몸이 보내는 신호예요",  // 상세 상단 큰 제목(\n으로 줄바꿈)
          "teaser": "홍조는 술이 세고 약하고의 문제가 아니에요.",   // 카드/리스트 한 줄 소개
          "readMinutes": 3,
          "symbol": "face.smiling",         // SF Symbol 이름(리스트 아이콘). https://developer.apple.com/sf-symbols
          "accentHex": "D87A6B",            // 6자리 hex 색(아래 팔레트)
          "paragraphs": ["문단1", "문단2"],  // 본문 문단들
          "footnote": "출처·주의 문구",       // null 가능
          "imageURL": "https://jjan.io/content/images/asianFlush.png",  // null이면 선화로 자동 폴백
          "isSignalArticle": false          // 항상 false로 두세요(true는 앱 내 개인화 전용 화면)
        }
      ]
    }
  ]
}
```

### 색 팔레트(accentHex)

| 이름 | hex | 쓰임 |
|---|---|---|
| 앰버 | `F1C68B` | 브랜드 기본 |
| 초록 | `82CB9B` | 안전·페이스 |
| 노랑 | `E2BF76` | 주의·음식 |
| 빨강 | `D87A6B` | 숙취·경고 |
| 물색 | `65AFD2` | 수분·단위 |
| 보라 | `B394E0` | 수면·탈출 |

## 새 아티클 추가 순서

1. `content/insights.json`에서 원하는 섹션의 `articles` 배열에 항목 추가(위 구조 참고). `id`는 유일하게.
2. (선택) 히어로 이미지가 있으면 아래 "이미지 만들기"로 PNG를 만들어 `content/images/<id>.png`로 저장하고 `imageURL`에 `https://jjan.io/content/images/<id>.png`를 넣습니다. 없으면 `imageURL: null` → 앱이 브랜드 선화로 자동 표시.
3. `node -e "require('./content/insights.json')"`로 JSON 문법 확인(에러 없으면 OK).
4. 커밋 & push. 1~2분 뒤 앱에서 확인.

새 섹션이 필요하면 `sections` 배열에 새 객체를 추가하면 됩니다(`id`·`title`·`subtitle`·`articles`).

## 이미지 만들기 (Claude Design)

히어로 이미지는 짠 톤(다크 배경 + 액센트 선화)으로 디자인합니다. 벡터(SVG)로 그린 뒤 PNG로 변환해 올립니다.

- 권장 규격: 가로형 illustration, 다크 배경(`#191218` 계열), 아티클 accent 색의 미니멀 선화. 최소 1000px 이상.
- SVG → PNG 변환(맥, 별도 설치 불필요):
  ```bash
  qlmanage -t -s 1200 -o . my.svg   # my.svg.png 생성
  mv my.svg.png content/images/<id>.png
  ```
- 앱은 이미지를 `fill`로 채우고 가장자리를 crop하므로, **중요한 요소는 가운데**에 두세요.
- 이미지가 안 뜨거나 지우면 앱이 자동으로 선화 폴백을 씁니다(안전).

기존 예시: `water.png`, `asianFlush.png`, `hangoverMyths.png`, `standardDrink.png`.

## 원칙

- 인터넷 내용을 그대로 붙여넣지 말 것 — 짠의 친구 같은 톤으로 다시 씁니다(판단하지 않기).
- 건강 관련은 근거를 밝히고, 단정하지 않으며, "의료 조언 아님" 고지를 답니다.
- 과장·"숙취 해소 보장" 금지 — 근거가 약하면 약하다고 말합니다.
