import React, { useState } from "react";
import supabase from "../utils/supabase";

const CreateExpense = ({ expenseAdd }) => {
  const [form, setForm] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { date, item, amount, description } = form;
    const dateFill = /^\d{4}-\d{2}-\d{2}$/; // ^와 $ 문자열 시작, 끝 의미 // 숫자4자리 // 하이픈 // 숫자 2자리
    if (!dateFill.test(date)) return alert("날짜 형식 오류"); // YYYY-MM-DD 형식이여야함
    if (!item || !description) return alert("내용 입력해주세요!");
    if (isNaN(amount)) return alert("숫자만 입력해수제요!"); // isNaN 문자열, 공백, 특수문자 등등 넣었을때 true

    const { data, error } = await supabase
      .from("expenses")
      .insert([form])
      .select();

    if (!error && data) {
      // expenseAdd(data[0]);
      await fetchExpenses();
      setForm({ date: "", item: "", amount: "", description: "" });
    }
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow space-y-2">
      {["date", "item", "amount", "description"].map((field) => (
        <input
          key={field}
          name={field}
          type={
            field === "date" ? "date" : field === "amount" ? "number" : "text"
          }
          value={form[field] || ""}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-2 py-1"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        저장
      </button>
    </div>
  );
};
export default CreateExpense;
