'use client';

import NaverMap from '@/components/NaverMap';
import KakaoMap from '@/components/KakaoMap';
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">지도 샘플</h1>
          <button
            onClick={() => router.push('/list')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
          >
            ← 목록으로
          </button>
        </div>

        {/* 네이버 지도 */}
        <section className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-700">네이버 지도</h2>
            {!process.env.NEXT_PUBLIC_NAVER_CLIENT_ID && (
              <p className="mt-1 text-sm text-red-400">
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">NEXT_PUBLIC_NAVER_CLIENT_ID</code> 환경변수를 설정하세요.
              </p>
            )}
          </div>
          <div className="p-6">
            <NaverMap lat={37.5665} lng={126.978} zoom={13} height="380px" />
          </div>
        </section>

        {/* 카카오 지도 */}
        <section className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-700">카카오 지도</h2>
            {!process.env.NEXT_PUBLIC_KAKAO_APP_KEY && (
              <p className="mt-1 text-sm text-red-400">
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">NEXT_PUBLIC_KAKAO_APP_KEY</code> 환경변수를 설정하세요.
              </p>
            )}
          </div>
          <div className="p-6">
            <KakaoMap lat={37.5665} lng={126.978} level={3} height="380px" />
          </div>
        </section>
      </div>
    </div>
  );
}
