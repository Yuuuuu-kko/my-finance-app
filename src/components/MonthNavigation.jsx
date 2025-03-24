import React from "react";

// 해야할것들을 적으며 해보자
// 1~12월 버튼 생성, 선택된 달 보여주기(해당 월 데이터로 필터링)

// 부모한테서 props 받아오기
const MonthNavigation = ({ selectedMonth, setSelectedMonth }) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {months.map((month) => (
        <button
          key={month}
          onClick={() => setSelectedMonth(month)}
          className={`px-4 py-2 rounded ${
            selectedMonth === month
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {month}월
        </button>
      ))}
    </div>
  );
};

export default MonthNavigation;
