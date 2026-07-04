"use client";

import React from "react";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="site-container py-12">
      <p className="text-[16px] text-[#777777]">
        Не удалось загрузить страницу программы.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex rounded-full bg-[#F66297] px-5 py-2 text-white"
      >
        Попробовать снова
      </button>
    </main>
  );
}
