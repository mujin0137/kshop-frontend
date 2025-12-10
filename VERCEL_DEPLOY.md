# Vercel 프론트엔드 배포 가이드

## 🚀 Vercel 배포 단계

### 1단계: Vercel 계정 및 GitHub 연결

1. **Vercel 접속**: https://vercel.com
2. **GitHub로 로그인**
3. **"Add New Project"** 클릭
4. **프론트엔드 저장소 선택** (kshop-frontend 또는 해당 저장소)

### 2단계: 프로젝트 설정

**프로젝트 이름:**

- 원하는 이름 입력 (예: `kshop-frontend`)

**Framework Preset:**

- **Vite** 선택 (자동 감지됨)

**Root Directory:**

- `.` (현재 디렉토리)

**Build Command:**

- `npm run build` (자동 설정됨)

**Output Directory:**

- `dist` (Vite 기본값)

### 3단계: 환경 변수 설정 (중요!)

**Environment Variables** 섹션에서 추가:

| 변수 이름           | 값                                                    |
| ------------------- | ----------------------------------------------------- |
| `VITE_API_BASE_URL` | `https://kshop-backend-production.up.railway.app/api` |

**중요:**

- Railway 백엔드 URL: `https://kshop-backend-production.up.railway.app`
- API 경로: `/api` 추가

### 4단계: 배포

**"Deploy"** 버튼 클릭!

Vercel이 자동으로:

1. 코드 빌드
2. 배포
3. URL 생성 (예: `https://kshop-frontend.vercel.app`)

---

## 🔧 Railway 백엔드 CORS 설정

프론트엔드 배포 후 **Railway 백엔드**의 CORS 설정을 업데이트해야 합니다!

### Railway Variables 수정:

1. Railway → kshop-backend → Variables 탭
2. **CORS_ORIGINS** 찾기
3. 값 수정:

**현재:**

```
*
```

**변경:**

```
https://your-frontend.vercel.app,http://localhost:5173
```

**또는 여러 개:**

```
https://kshop-frontend.vercel.app,https://kshop-frontend-git-main-yourname.vercel.app,http://localhost:5173
```

4. **Redeploy** 클릭

---

## ✅ 배포 확인

### 1. 프론트엔드 접속

```
https://your-frontend.vercel.app
```

### 2. 브라우저 개발자 도구 확인

- **Network 탭** 열기
- **API 호출 확인**
- CORS 에러 없는지 확인

### 3. 기능 테스트

- ✅ 상품 목록 로딩
- ✅ 회원가입
- ✅ 로그인
- ✅ 장바구니

---

## 🔍 문제 해결

### CORS 에러 발생 시:

1. Railway 백엔드의 **CORS_ORIGINS**에 Vercel URL 추가
2. Railway **Redeploy**
3. 브라우저 캐시 삭제 후 재시도

### API 연결 실패:

1. Vercel 환경 변수 **VITE_API_BASE_URL** 확인
2. Railway 백엔드 Health Check:
   ```
   https://kshop-backend-production.up.railway.app/actuator/health
   ```
3. 네트워크 탭에서 실제 요청 URL 확인

---

## 📝 요약

1. ✅ Vercel에 GitHub 저장소 연결
2. ✅ 빌드 설정 확인 (Vite 자동 감지)
3. ✅ 환경 변수 `VITE_API_BASE_URL` 설정
4. ✅ 배포
5. ✅ Railway CORS_ORIGINS 업데이트
6. ✅ 테스트!
