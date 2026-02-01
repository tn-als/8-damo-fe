export {};

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }

  interface KakaoSDK {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Share: KakaoShare;
  }

  interface KakaoShare {
    sendDefault: (options: KakaoShareFeedOptions) => void;
    createDefaultButton: (options: KakaoShareDefaultButtonOptions) => void;
  }

  interface KakaoShareDefaultButtonOptions {
    container: string | HTMLElement;
    objectType: "feed";
    content: {
      title: string;
      description?: string;
      imageUrl: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
    buttons?: Array<{
      title: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }>;
  }

  interface KakaoShareFeedOptions {
    objectType: "feed";
    content: {
      title: string;
      description?: string;
      imageUrl: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
    buttons?: Array<{
      title: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }>;
  }
}
