'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  width?: string;
  height?: string;
}

export default function NaverMap({
  lat = 37.5665,
  lng = 126.978,
  zoom = 13,
  width = '100%',
  height = '400px',
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const init = () => {
      if (!window.naver?.maps) return;
      new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom,
      });
    };

    if (window.naver?.maps) {
      init();
    } else {
      // SDK가 아직 로드 중이면 로드 완료 후 초기화
      const interval = setInterval(() => {
        if (window.naver?.maps) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [lat, lng, zoom]);

  return <div ref={mapRef} style={{ width, height }} />;
}
