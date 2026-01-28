"use client";

import { useEffect, useRef } from "react";

interface KakaoMapViewProps {
  location: {
    lat: number;
    lng: number;
  };
  level?: number;
  className?: string;
}

export function KakaoMapView({
  location,
  level = 3,
  className,
}: KakaoMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const markerRef = useRef<KakaoMarker | null>(null);

  /** 1️⃣ SDK 로드 */
  useEffect(() => {
    if (document.getElementById("kakao-map-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  /** 2️⃣ 지도 + 마커 초기화 및 업데이트 */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const initMap = () => {
      if (!window.kakao?.maps || !containerRef.current) {
        timer = setTimeout(initMap, 200);
        return;
      }

      window.kakao.maps.load(() => {
        if (!containerRef.current) return;

        const center = new window.kakao.maps.LatLng(
          location.lat,
          location.lng
        );

        /** 최초 1회 생성 */
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new window.kakao.maps.Map(
            containerRef.current,
            {
              center,
              level,
            }
          );

          markerRef.current = new window.kakao.maps.Marker({
            position: center,
          });

          markerRef.current.setMap(mapInstanceRef.current);
          return;
        }

        /** 이후에는 위치만 갱신 */
        mapInstanceRef.current.setCenter(center);
        markerRef.current?.setPosition(center);
      });
    };

    initMap();

    return () => clearTimeout(timer);
  }, [location.lat, location.lng, level]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "300px" }}
    />
  );
}
