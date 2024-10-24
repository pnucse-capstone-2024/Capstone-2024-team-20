export function numberToMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
