"use client";

import { useEffect } from "react";
import { Item } from "@/app/list/page";

interface DetailPopupProps {
  item: Item;
  onClose: () => void;
}

export default function DetailPopup({ item, onClose }: DetailPopupProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 팝업 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">직원 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* 이름 + 상태 */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
            {item.name[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.role}</p>
          </div>
          <span
            className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
              item.status === "재직"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 text-sm">
          <Row label="부서" value={item.department} />
          <Row label="이메일" value={item.email} />
          <Row label="연락처" value={item.phone} />
          <Row label="입사일" value={item.joinDate} />
          <Row label="주소" value={item.address} />
          <Row label="메모" value={item.memo} />
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="w-16 shrink-0 font-medium text-gray-500">{label}</span>
      <span className="text-right text-gray-700">{value}</span>
    </div>
  );
}
