import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // url에서 id값 가져옴 ex) /expenses/aaa
  const navigate = useNavigate();

  // form 상태 초기값 설정 - 인풋값 관리용
  const [form, setForm] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  // 컴포넡트 첫 렌더링때 실행
  useEffect(() => {
    const fetchExpense = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("데이터 불러오기 실패");
        navigator("/");
      } else {
        setForm(data);
      }
    };
    fetchExpense();
  }, [id]);

  // input 값이 바뀔 때 상태 업뎃
  const handleChange = (e) => {
    const { name, value } = e.target; // 입력된 필드 이름, 값 추출
    setForm((prev) => ({ ...prev, [name]: value })); // 해당 필드만 업뎃
  };

  // update(수정btn) // Create때와 조금 다르게 form. 숙지할것
  const handleUpdate = async () => {
    const dateFill = /^\d{4}-\d{2}-\d{2}$/; // ^와 $ 문자열 시작, 끝 의미 // 숫자4자리 // 하이픈 // 숫자 2자리
    if (!dateFill.test(form.date)) return alert("날짜 형식 오류"); // YYYY-MM-DD 형식이여야함
    if (!form.item || !form.description) return alert("내용 입력해주세요!");
    if (isNaN(form.amount)) return alert("숫자만 입력해수제요!"); // isNaN 문자열, 공백, 특수문자 등등 넣었을때 true

    const { error } = await supabase
      .from("expenses")
      .update(form) // 현재 form 값으로 데이터 업뎃
      .eq("id", id); // 해당 id만 수정
    if (!error) {
      alert("수정완료");
      navigate("/");
    }
  };

  // delete
  // 참고링크 : https://velog.io/@gazero_/자바스크립트-alert-그리고-confirm-뭔데-window를-안써
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const { error } = await supabase.from("expenses").delete().eq("id", id);

    if (!error) {
      alert("삭제 완료");
      navigate("/");
    }
  };

  // toUpperCase 대문자로 변경
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow">
      {/* 반복문으로 input 필드 4개 생성 */}
      {["date", "item", "amount", "description"].map((field) => (
        <label key={field} className="block">
          {field.toUpperCase()}
          <input
            type="text"
            name={field} // input의 name은 form 키와 일치해야 함
            value={form[field]} // 상태값 바인딩
            onChange={handleChange} // 입력 변경 시 상태 업데이트
            className="w-full border px-2 py-1 mt-1"
          />
        </label>
      ))}

      <div className="flex gap-2 pt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          삭제
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
};

export default Detail;
