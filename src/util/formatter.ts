export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 3,
  }).format(value);
};
//formatMoneyToNumber
export const formatMoneyToNumber = (value: string) => {
  // Remove commas and parse the string to a floating-point number
  return parseFloat(value.replace(/,/g, ''));
};

export const formatMoneyVant = (value: string) => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

//"2024-10-17T15:23:41.127+00:00" to "17-10-2024 15:23:41"
export const formatTime = (value: string) => {
  const date = new Date(value);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
