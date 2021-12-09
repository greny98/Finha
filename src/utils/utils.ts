export function convertCurrencyVN(number: number) {
  return (
    number
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      .slice(0, -3) + ' VND'
  );
}

export const getCategoryColor = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return '#00C689';
    case 2:
      return '#FE645A';
    case 3:
      return '#2A327D';
    case 4:
      return '#FFB039';
    case 5:
      return '#2980B9';
    case 6:
      return '#c471ed';
    default:
      return '#cecece';
  }
};

export const getCategoryName = (category: string) => {
  switch (category) {
    case 'market':
      return 'Đi chợ/Siêu thị';
    case 'living':
      return 'Nhà ở';
    case 'rent':
      return 'Vay mượn';
    case 'payment':
      return 'Thanh toán';
    case 'eating':
      return 'Ăn uống';
    case 'debt':
      return 'Vay nợ';
    default:
      return 'Thu nhập';
  }
};

export const calcTotalTrans = (transList: any, factor: number) => {
  return transList.length > 0
    ? transList
        .filter((trans: any) => trans.factor === factor)
        .reduce((total: number, item: any) => (total += item.amount), 0)
    : 0;
};
