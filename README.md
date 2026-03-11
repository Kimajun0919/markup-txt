# Markup TXT Studio

`ai.txt` 생성기, `llms.txt` 생성기, 구조화 데이터 마크업 타입 검색기를 하나의 Vite + React 프로젝트로 통합한 작업 도구입니다.

상단 메뉴에서 각 기능을 전환해 사용할 수 있습니다.

## 주요 기능

- `ai.txt` 생성
  AI 크롤러 허용 범위, 차단 경로, 사용 정책을 조합해 `ai.txt` 초안을 만듭니다.
- `llms.txt` 생성
  사이트 소개, 서비스, 주요 페이지, FAQ, 부가 정보를 입력해 `llms.txt` 초안을 만듭니다.
- 구조화 데이터 마크업 검색
  Google Search 기준 구조화 데이터 타입, 속성, 예시 JSON-LD를 탐색합니다.

## 기술 스택

- React 18
- Vite 5

## 실행 방법

```bash
npm install
npm run dev
```

Windows PowerShell 환경에서 실행 정책 때문에 `npm`이 막히면 아래처럼 실행하면 됩니다.

```bash
npm.cmd install
npm.cmd run dev
```

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기

## 프로젝트 구조

```text
src/
  App.jsx
  main.jsx
  styles.css
  features/
    ai/
      AiTxtGenerator.jsx
      LlmsTxtGenerator.jsx
      config.js
      generator.js
    markup-search/
      MarkupSearch.jsx
      components/
      constants/
      hooks/
public/
  data/
    structured_data.json
```

## 데이터 위치

- 구조화 데이터 검색기는 `public/data/structured_data.json`을 읽어 동작합니다.

## 비고

- 현재 프로젝트는 루트에서 실행하는 단일 앱입니다.
- 이전 분리 프로젝트는 작업 이력 보존용으로 `legacy/` 아래에 이동해 두었고, Git 추적에서는 제외되어 있습니다.
