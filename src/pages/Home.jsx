import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { getMonth } from "../utils/getMonth";
import CreateExpense from "../components/CreateExpense";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import { useLocation } from "react-router-dom";

const Home = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const location = useLocation(); // detail.jsx에서 수정,삭제 후 Home으로 갈때 fetchExpenses 실행하여 실시간 반영

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

  useEffect(() => {
    fetchExpenses();
  }, [location.key]); // 페이지 이동할 때마다 다시 fetch

  const filteredExpenses = expenses.filter(
    (expense) => getMonth(expense.date) === selectedMonth
  );

  const expenseAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <MonthNavigation
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <CreateExpense fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
};

export default Home;
