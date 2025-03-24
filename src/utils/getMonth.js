// dateStr 날짜 문자열, new Date(dateStr), .getMonth()월은 0~11로 반환하여 +1 해준다
// 참고자료 https://www.inflearn.com/community/questions/889134/%EB%A7%88%EC%A7%80%EB%A7%89%EB%82%A0%EC%9D%84-%EA%B0%80%EC%A0%B8%EC%98%AC-%EB%95%8C-getmonth%EC%97%90-1%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0?srsltid=AfmBOoo9RUCukANXhwxIbxzHTeUC9BplZmLB3PBMWQ9YinA8qlkgBLOY
// 참고자료 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
export const getMonth = (dateStr) => new Date(dateStr).getMonth() + 1;
