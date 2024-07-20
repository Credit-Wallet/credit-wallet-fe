// formatmoney
// const formatMoney = (value: string) => {
//   return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };
export const formatMoney = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
