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
