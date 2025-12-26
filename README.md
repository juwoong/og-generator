# OG Service

OG 이미지 생성 서비스. Cloudflare Workers + Pages로 구성된 모노레포.

## 프로젝트 구조

```
packages/
├── shared/   # 공유 타입 및 유틸리티
├── web/      # React 프론트엔드 (Cloudflare Pages)
└── worker/   # OG 이미지 생성 API (Cloudflare Workers)
```

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 배포

### 사전 준비

1. Cloudflare 계정 로그인
   ```bash
   npx wrangler login
   ```

2. R2 버킷 생성 (최초 1회)
   ```bash
   # 개발용
   npx wrangler r2 bucket create og-image-cache

   # 프로덕션용
   npx wrangler r2 bucket create og-image-cache-prod
   ```

### 전체 배포

```bash
pnpm deploy
```

### 패키지별 개별 배포

```bash
# Worker 배포 (개발 환경)
pnpm --filter @og-service/worker deploy

# Worker 배포 (프로덕션 환경)
cd packages/worker && npx wrangler deploy --env production

# Web 배포 (Cloudflare Pages)
pnpm --filter @og-service/web deploy
```

### 환경별 설정

| 환경 | Worker | R2 버킷 |
|------|--------|---------|
| development | `og-service-worker` | `og-image-cache` |
| production | `og-service-worker` (env.production) | `og-image-cache-prod` |
