import React from "react";
import { useNavigate } from "react-router-dom";

// 지출 리스트
// supabase에서 데이터 목록 가져오자!
function ExpenseList({ expenses }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-400">지출 내역이 없습니다.</p>
      ) : (
        expenses.map((exp) => (
          <div
            key={exp.id}
            onClick={() => navigate(`/expenses/${exp.id}`)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">{exp.date}</p>
              <p className="font-semibold text-blue-600">
                {exp.item} - {exp.description}
              </p>
            </div>
            <p className="text-right">
              {parseInt(exp.amount).toLocaleString()} 원
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
