import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // 구글 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 네이버 로그인 (커스텀 프로바이더)
    {
      id: "naver",
      name: "Naver",
      type: "oauth",
      authorization: "https://nid.naver.com/oauth2.0/authorize",
      token: "https://nid.naver.com/oauth2.0/token",
      userinfo: "https://openapi.naver.com/v1/nid/me",
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          image: profile.response.profile_image,
        };
      },
    },
  ],

  pages: {
    signIn: "/login", // 커스텀 로그인 페이지
  },

  callbacks: {
    // 로그인 후 세션에 사용자 정보 추가
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
