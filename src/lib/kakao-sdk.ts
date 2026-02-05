const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

let loadPromise: Promise<void> | null = null;

export function loadKakaoSDK(): Promise<void> {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("카카오 SDK는 브라우저 환경에서만 로드할 수 있습니다."));
      return;
    }

    if (window.Kakao?.isInitialized?.()) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${KAKAO_SDK_URL}"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        initializeKakao();
        resolve();
      });
      existingScript.addEventListener("error", () => {
        reject(new Error("카카오 SDK 로드에 실패했습니다."));
      });
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;

    script.onload = () => {
      initializeKakao();
      resolve();
    };

    script.onerror = () => {
      loadPromise = null;
      reject(new Error("카카오 SDK 로드에 실패했습니다."));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

function initializeKakao(): void {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_SDK_KEY;

  if (!appKey) {
    console.error("카카오 SDK 환경변수가 설정되지 않았습니다.");
    return;
  }

  if (!window.Kakao?.isInitialized?.()) {
    window.Kakao.init(appKey);
  }
}
