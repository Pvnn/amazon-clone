import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export function convertCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}
export function isWeekend(date){
  const day = date.format('dddd');
  if (day=='Sunday' || day=='Saturday'){
    return true;
  }
  return false;
}