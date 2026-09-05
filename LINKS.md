# jjan.io 스마트 링크·배지 운영

설정은 `links.js` 한 파일만 만진다.

| 경로 | 캠페인(ct) | 용도 |
|---|---|---|
| jjan.io/tt | tiktok | TikTok 프로필·영상 |
| jjan.io/ig | instagram | Instagram 바이오·릴스 |
| jjan.io/x | x | X 프로필·게시물 |
| jjan.io/go | site | 사이트 배지·이메일 |
| jjan.io/qr | offline | QR·명함·포스터 |

- **승인 전(지금)**: `LIVE:false` → 모두 `jjan.io/?from=<ct>`로 이동.
- **승인 직후**: `LIVE:true` + `PT:"<provider id>"` 입력 후 커밋. 히어로 배지가 자동으로 "App Store에서 받기" 버튼이 되고, 5개 링크가 App Store 캠페인 링크로 바뀐다.
- provider ID(pt): App Store Connect → 앱 분석 → 획득 → **캠페인 링크 생성기**에서 생성한 URL의 `pt=` 값. 앱 하나에 하나이며 바뀌지 않는다.
- 유입 확인: 앱 분석 → 획득 → 캠페인 탭에서 ct별로 노출·다운로드가 잡힌다(승인 후 링크가 실제 클릭된 뒤부터).
- `app-ads.txt`: AdMob 게시자 ID `pub-9616097208501380`. AdMob 콘솔 → 앱 → app-ads.txt 탭에서 "확인" 필요(App Store 리스팅에 jjan.io가 마케팅 URL로 등록돼 있어야 크롤됨, 최대 24시간).
