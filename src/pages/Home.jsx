import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { getMonth } from "../utils/getMonth";
import CreateExpense from "../components/CreateExpense";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";

// db에서 expenses 데이터 불러와야함
// 1. `Home` 컴포넌트에서 지출 목록을 supabase로부터 불러옵니다.
//     → supabase API를 조회합니다. o
//     → 받아온 데이터를 state에 담아줍니다. o
// 2. `Home` 컴포넌트에서 사용자가 선택한 달을 저장할 state를 만들어줍니다.
//     → 초기값은 `1`부터 `12` 중 자유롭게 선택하세요. o
// 3. 현재 선택한 달에 맞게 필터링합니다.
//     → `"2024-01-01"`과 같은 날짜에서 `월`을 추출하는 로직을 추가로 작성해보세요.
//     → 위 로직은 `utils` 폴더의 `getMonth` 함수를 만들어서 사용해보세요. o

//
const Home = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("date", { ascending: true });
        if (error) {
          throw error;
        }
        setExpenses(data);
      } catch (err) {
        console.error("Home fetching expenses Error", err);
      }
    };
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(
    (expense) => getMonth(expense.date) === selectedMonth
  );

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  console.log("filteredExpenses 로그 !!:", filteredExpenses);
  console.log("currentMonth 로그!!:", currentMonth);
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <MonthNavigation
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <CreateExpense expenseAdd={handleAdd} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
};

export default Home;
