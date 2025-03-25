// dateStr 날짜 문자열, new Date(dateStr), .getMonth()월은 0~11로 반환하여 +1 해준다
export const getMonth = (dateStr) => new Date(dateStr).getMonth() + 1;
