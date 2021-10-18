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
    default:
      return 'Thu nhập';
  }
};
