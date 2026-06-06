import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // 일반 로그인
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "아이디" },
        password: { label: "비밀번호" },
      },
      async authorize(credentials) {
        // 실제 서비스에서는 여기서 백엔드 API로 인증 처리
        // ex) const res = await fetch("http://백엔드주소/api/login", { ... })
        if (credentials?.id === "admin" && credentials?.password === "1234") {
          return { id: "1", name: credentials.id };
        }
        return null;
      },
    }),

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
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
