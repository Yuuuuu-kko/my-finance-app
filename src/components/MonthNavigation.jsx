import React from "react";

// 1~12월 버튼 생성. 선택된 달 보여주기(해당 월 데이터로 필터링)
const MonthNavigation = ({ selectedMonth, setSelectedMonth }) => {
  // Array.from(element, index)맵핑하여, 안 쓸 변수는 _ 표현하고 인덱스만 사용
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 gap-2 justify-center">
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
