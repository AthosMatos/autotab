export function getMarginLeft(orders: number[], order: number) {
  if (orders.length === 0) {
    return 0;
  }

  let marginLeft = 0;
  for (let i = 0; i < order; i++) {
    if (orders[i]) {
      marginLeft += orders[i];
      //console.log(marginLeft)
    }
  }
  return marginLeft;
}
