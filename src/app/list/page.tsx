"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DetailPopup from "@/components/DetailPopup";

export interface Item {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  joinDate: string;
  status: string;
  phone: string;
  address: string;
  memo: string;
}

const SAMPLE_DATA: Item[] = [
  { id: 1, name: "김민준", email: "minjun@example.com", department: "개발팀", role: "프론트엔드 개발자", joinDate: "2021-03-15", status: "재직", phone: "010-1234-5678", address: "서울시 강남구", memo: "React, TypeScript 담당" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", department: "디자인팀", role: "UI/UX 디자이너", joinDate: "2020-07-01", status: "재직", phone: "010-2345-6789", address: "서울시 마포구", memo: "Figma 전문" },
  { id: 3, name: "박도윤", email: "doyun@example.com", department: "개발팀", role: "백엔드 개발자", joinDate: "2019-11-20", status: "재직", phone: "010-3456-7890", address: "경기도 성남시", memo: "Spring Boot 담당" },
  { id: 4, name: "최수아", email: "sua@example.com", department: "기획팀", role: "서비스 기획자", joinDate: "2022-01-10", status: "재직", phone: "010-4567-8901", address: "서울시 송파구", memo: "신규 서비스 기획 담당" },
  { id: 5, name: "정예준", email: "yejun@example.com", department: "개발팀", role: "풀스택 개발자", joinDate: "2018-05-30", status: "재직", phone: "010-5678-9012", address: "서울시 영등포구", memo: "Next.js, Node.js 담당" },
  { id: 6, name: "한지아", email: "jia@example.com", department: "마케팅팀", role: "마케터", joinDate: "2023-02-14", status: "재직", phone: "010-6789-0123", address: "서울시 중구", memo: "SNS 마케팅 담당" },
  { id: 7, name: "오준서", email: "junsu@example.com", department: "개발팀", role: "DevOps 엔지니어", joinDate: "2020-09-01", status: "휴직", phone: "010-7890-1234", address: "인천시 남동구", memo: "AWS, Docker 담당" },
  { id: 8, name: "윤채원", email: "chaewon@example.com", department: "인사팀", role: "HR 매니저", joinDate: "2017-04-03", status: "재직", phone: "010-8901-2345", address: "서울시 강서구", memo: "채용 및 복지 담당" },
];

export default function ListPage() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">직원 목록</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>

        {/* 안내 문구 */}
        <p className="mb-4 text-sm text-gray-500">
          행을 더블 클릭하면 상세 정보를 확인할 수 있습니다.
        </p>

        {/* 테이블 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">이름</th>
                <th className="px-6 py-4">이메일</th>
                <th className="px-6 py-4">부서</th>
                <th className="px-6 py-4">직책</th>
                <th className="px-6 py-4">입사일</th>
                <th className="px-6 py-4">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SAMPLE_DATA.map((item) => (
                <tr
                  key={item.id}
                  onDoubleClick={() => setSelectedItem(item)}
                  className="cursor-pointer transition hover:bg-blue-50"
                >
                  <td className="px-6 py-4 text-gray-400">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.email}</td>
                  <td className="px-6 py-4 text-gray-600">{item.department}</td>
                  <td className="px-6 py-4 text-gray-600">{item.role}</td>
                  <td className="px-6 py-4 text-gray-600">{item.joinDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        item.status === "재직"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 팝업 */}
      {selectedItem && (
        <DetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
