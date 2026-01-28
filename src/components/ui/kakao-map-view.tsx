"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

type KakaoMapInstance = {
  setCenter: (center: unknown) => void;
};

type KakaoMarkerInstance = {
  setMap: (map: unknown) => void;
  setPosition: (position: unknown) => void;
};

type KakaoMapsSdk = {
  maps: {
    LatLng: new (lat: number, lng: number) => unknown;
    Map: new (
      container: HTMLElement,
      options: { center: unknown; level: number }
    ) => KakaoMapInstance;
    Marker: new (options: { position: unknown }) => KakaoMarkerInstance;
    load: (callback: () => void) => void;
  };
};

declare global {
  interface Window {
    kakao?: KakaoMapsSdk;
  }
}

interface KakaoMapViewProps {
  location: {
    lat: number;
    lng: number;
  };
  level?: number;
  className?: string;
  appKey?: string;
}

const KAKAO_MAP_SCRIPT_ID = "kakao-map-sdk";

const loadKakaoMap = (appKey: string) => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.kakao?.maps) {
      window.kakao.maps.load(resolve);
      return;
    }

    const existingScript = document.getElementById(
      KAKAO_MAP_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao?.maps.load(resolve);
      });
      existingScript.addEventListener("error", () => {
        reject(new Error("Kakao map script failed to load"));
      });
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;

    script.onload = () => {
      window.kakao?.maps.load(resolve);
    };

    script.onerror = () => {
      reject(new Error("Kakao map script failed to load"));
    };

    document.head.appendChild(script);
  });
};

export function KakaoMapView({
  location,
  level = 3,
  className,
  appKey,
}: KakaoMapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const markerRef = useRef<KakaoMarkerInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    const resolvedKey = appKey ?? process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

    if (!resolvedKey) {
      return undefined;
    }

    loadKakaoMap(resolvedKey)
      .then(() => {
        if (cancelled || !containerRef.current || !window.kakao?.maps) {
          return;
        }

        const center = new window.kakao.maps.LatLng(
          location.lat,
          location.lng
        );

        if (!mapRef.current) {
          mapRef.current = new window.kakao.maps.Map(containerRef.current, {
            center,
            level,
          });
          markerRef.current = new window.kakao.maps.Marker({ position: center });
          markerRef.current.setMap(mapRef.current);
          return;
        }

        mapRef.current.setCenter(center);
        markerRef.current?.setPosition(center);
      })
      .catch(() => {
        // Swallow script load errors to avoid breaking the page.
      });

    return () => {
      cancelled = true;
    };
  }, [appKey, level, location.lat, location.lng]);

  return <div ref={containerRef} className={cn("h-40 w-full", className)} />;
}
