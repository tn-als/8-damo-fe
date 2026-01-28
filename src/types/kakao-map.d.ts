export {};

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  interface KakaoNamespace {
    maps: KakaoMaps;
  }

  interface KakaoMaps {
    load(callback: () => void): void;
    Map: new (
      container: HTMLElement,
      options: {
        center: KakaoLatLng;
        level: number;
      }
    ) => KakaoMap;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
  }

  interface KakaoMap {
    setCenter(latlng: KakaoLatLng): void;
  }

  interface KakaoMarker {
    setMap(map: KakaoMap | null): void;
    setPosition(latlng: KakaoLatLng): void;
  }

  interface KakaoLatLng {
    getLat(): number;
    getLng(): number;
  }
}
