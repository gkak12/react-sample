'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat?: number;
  lng?: number;
  level?: number;
  width?: string;
  height?: string;
}

export default function KakaoMap({
  lat = 37.5665,
  lng = 126.978,
  level = 3,
  width = '100%',
  height = '400px',
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const init = () => {
      window.kakao.maps.load(() => {
        new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level,
        });
      });
    };

    if (window.kakao?.maps) {
      init();
    } else {
      // SDK가 아직 로드 중이면 로드 완료 후 초기화
      const interval = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [lat, lng, level]);

  return <div ref={mapRef} style={{ width, height }} />;
}
