import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { getMonth } from "../utils/getMonth";
import CreateExpense from "../components/CreateExpense";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";

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

  const expenseAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <MonthNavigation
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <CreateExpense expenseAdd={expenseAdd} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
};

export default Home;
