"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

/**
 * 백엔드 소셜 로그인 성공 후 리다이렉트되는 콜백 페이지
 * URL 형식: /auth/callback?accessToken=xxx&deviceId=yyy
 *
 * 1. URL에서 accessToken, deviceId 추출
 * 2. NextAuth 세션에 저장
 * 3. /list로 이동
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const deviceId    = searchParams.get("deviceId");

    if (!accessToken || !deviceId) {
      router.replace("/login");
      return;
    }

    // NextAuth credentials로 토큰을 세션에 저장
    signIn("credentials", {
      accessToken,
      deviceId,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        router.replace("/login");
      } else {
        // URL에서 토큰 제거 후 이동 (보안)
        router.replace("/list");
      }
    });
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center text-gray-500">
        <div className="mb-3 text-2xl">⏳</div>
        <p className="text-sm">로그인 처리 중...</p>
      </div>
    </div>
  );
}
