# 토스뱅크 위젯 자산 맵 (수집 2026-09-07)

수집 방법: Playwright chromium(390×844, 모바일 UA)으로 https://www.tossbank.com 홈 + 내부 링크 12개를 열고 네트워크 응답(image/json) 전량 저장 → 오브젝트 아이콘만 선별 → 240px PNG로 축소해 저장.
토스 3D 이모지 CDN(`static.toss.im/3d-emojis/uXXXX.png`)은 tossbank.com 홈이 직접 로드하는 경로(u1F3B6·u1F3AE 등)에서 확인한 뒤 같은 패턴으로 필요한 코드포인트를 추가 수집했다.

## 사용 규칙
- 로고·워드마크·"토스뱅크" 명칭 **사용 금지** (logo-bank.svg, icon-toss-logo.svg, tossbank-account-general.png 등은 수집 즉시 폐기)
- 오브젝트 아이콘만 구좌 카드 · 대상 선택 아바타 · 혜택 시트 · 완료 화면 · 인증 팝업에 사용
- 페이지에서는 `assets/tossbank/tb_*.png`만 참조 (외부 CDN 0)

## 채택 자산 (`tb_*.png`)

| 파일 | 출처 URL | 원본 | 저장 | KB | 용도 |
|---|---|---|---|---|---|
| tb_person.png | https://static.toss.im/3d-emojis/u1F9D1.png | [1024, 1024] | [240, 240] | 40 | 구좌 카드 1구좌 · 대상 아바타 본인 |
| tb_couple.png | https://static.toss.im/3d-emojis/u1F491.png | [512, 512] | [240, 240] | 46 | 대상 아바타 배우자 |
| tb_pair.png | https://static.toss.im/3d-emojis/u1F46B.png | [1024, 1024] | [240, 240] | 40 | 구좌 카드 2구좌(부부) |
| tb_senior.png | https://static.toss.im/3d-emojis/u1F9D3.png | [1024, 1024] | [240, 240] | 44 | 대상 아바타 부모님 |
| tb_child.png | https://static.toss.im/3d-emojis/u1F9D2.png | [1024, 1024] | [240, 240] | 36 | 대상 아바타 자녀 |
| tb_house.png | https://static.toss.im/3d-emojis/u1F3E0.png | [1000, 1000] | [240, 240] | 33 | 구좌 카드 3구좌(온가족) |
| tb_gift.png | https://static.toss.im/3d-emojis/u1F381.png | [500, 500] | [240, 240] | 32 | 혜택 시트 "그럼 혜택 616,000원은…" 선물 아이콘 |
| tb_ticket.png | https://static.toss.im/3d-emojis/u1F3AB.png | [1024, 1024] | [240, 240] | 28 | 혜택 시트 카드 "쓰면 616,000원 할인" |
| tb_moneybag.png | https://static.toss.im/3d-emojis/u1F4B0.png | [1000, 1000] | [240, 240] | 37 | 혜택 시트 카드 "안 쓰면 만기축하금 616,000원" |
| tb_coin.png | https://static.toss.im/3d-emojis/u1FA99.png | [1000, 1000] | [240, 240] | 38 | 혜택 시트 표 헤더 아이콘 |
| tb_lock.png | https://static.toss.im/3d-emojis/u1F512.png | [512, 512] | [240, 240] | 39 | 토스인증 바텀시트 아이콘 |
| tb_phone.png | https://static.toss.im/3d-emojis/u1F4F1.png | [512, 512] | [240, 240] | 24 | 토스인증 타이틀 화면 아이콘 · 가입정보 스텝 "계약서는 알림톡으로" 안내 아이콘 |
| tb_party.png | https://static.toss.im/3d-emojis/u1F389.png | [1000, 1000] | [240, 240] | 42 | 완료 화면 축하 배지 |
| tb_hotel.png | https://static.toss.im/3d-emojis/u1F3E8.png | [1000, 1000] | [240, 240] | 34 | 완료 화면 멤버십 배너 |
| tb_doc.png | https://static.toss.im/3d-emojis/u1F4C4.png | [500, 500] | [240, 240] | 13 | 가입정보 스텝 계약서 안내 아이콘 |
| tb_calendar.png | https://static.toss.im/3d-emojis/u1F4C5.png | [500, 500] | [240, 240] | 34 | 결제 스텝 결제일 아이콘 |
| ref_persona-ok.json | https://static.toss.im/lotties/persona/persona-ok.json | - | - | 40 | 참고용(미사용 · 외부 lottie 라이브러리 필요) |
| ref_qr-line-a.json | https://static.toss.im/lotties/qr/qr-line-a.json | - | - | 214 | 참고용(미사용 · 외부 lottie 라이브러리 필요) |

## 수집했지만 미채택 (참고)

- https://core-cdn-fe.toss.im/video/frame/?source=https://static.toss.im/3d/Security_FFFFF.mp4&t=00:00:00.000
- https://static.toss.im/2d-emojis/png/4x/u1F3E7.png
- https://static.toss.im/2d-emojis/png/4x/u1F4B8.png
- https://static.toss.im/2d-emojis/png/4x/u1F645.1.M.png
- https://static.toss.im/3d-emojis/u1F3AE.png
- https://static.toss.im/3d-emojis/u1F3B6.png
- https://static.toss.im/3d/account-blue-stack-apng.png
- https://static.toss.im/3d/moneybag-heart-coin-apng.png
- https://static.toss.im/3d/number-0-apng.png
- https://static.toss.im/3d/tossbank-account-general.png
- https://static.toss.im/3d/tossbank-banner-mobile-Financial-sector.png
- https://static.toss.im/3d/tossbank-banner-web-Financial-sector.png
- https://static.toss.im/illusts/bankfeed-asset-grow-cover.png
- https://static.toss.im/illusts/bankfeed-scholarship-v2-cover.png
- https://static.toss.im/illusts/jelly_assemble.png
- https://static.toss.im/illusts/protected-products.jpg
- https://static.toss.im/lotties/persona/persona-ok.json
- https://static.toss.im/lotties/qr/qr-line-a.json

## 폐기(사용 금지) — 로고·워드마크
- https://static.toss.im/logos/svg/logo-bank.svg
- https://static.toss.im/logos/svg/logo-bank-mono-white.svg
- https://static.toss.im/icons/svg/icon-toss-logo.svg
- https://static.toss.im/3d/tossbank-account-general.png ("Bank" 텍스트 포함)

※ 홈 로드 lottie json 2종(`ref_*.json`)은 참고용으로만 보관. 페이지는 외부 라이브러리 없이 CSS 애니메이션만 사용.