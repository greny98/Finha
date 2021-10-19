import {
  createAccessStatus,
  createCategories,
  createSaveMoney,
  createTransactions,
  getAccessStatus,
  getTransactions,
  updateTransaction,
} from 'db/db-service';
import moment from 'moment';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

export async function mockups(db: SQLiteDatabase) {
  await createTransactions(db, {
    categoryId: 1,
    factor: -1,
    note: 'game',
    amount: 100000,
    date: moment(new Date()).startOf('day').add(5, 'hour').toDate(),
    walletId: 1,
  });
  await createTransactions(db, {
    categoryId: 1,
    factor: -1,
    note: 'bay',
    amount: 100000,
    date: moment(new Date()).startOf('day').add(5, 'hour').toDate(),
    walletId: 1,
  });
  await createTransactions(db, {
    categoryId: 1,
    factor: 1,
    note: 'salary',
    amount: 1000000,
    date: moment(new Date()).endOf('day').subtract(5, 'hour').toDate(),
    walletId: 1,
  });
  await createTransactions(db, {
    categoryId: 1,
    factor: 1,
    note: 'salary 2',
    amount: 500000,
    date: moment(new Date()).endOf('day').subtract(5, 'hour').toDate(),
    walletId: 1,
  });
  await createTransactions(db, {
    categoryId: 5,
    factor: 1,
    note: 'income annual month',
    amount: 5000000,
    date: moment(new Date()).endOf('day').subtract(5, 'hour').toDate(),
    walletId: 1,
  });
  await createTransactions(db, {
    categoryId: 2,
    factor: -1,
    note: 'rent house',
    amount: 3000000,
    date: moment().startOf('week').add(6, 'd').toDate(),
    walletId: 1,
  });
  let trans = await getTransactions(
    db,
    moment(new Date()).startOf('day').toDate(),
    moment(new Date()).endOf('day').toDate(),
  );
  console.log('==== ', trans);
  // const trans1 = await getTransactions(
  //   db,
  //   moment(new Date()).startOf('day').toDate(),
  //   moment(new Date()).endOf('day').toDate(),
  //   {factor: 1},
  // );
  // console.log('==== ', trans1);
  // await createAccessStatus(db);
  // console.log('=====', await getAccessStatus(db));
  await updateTransaction(db, {
    id: 1,
    categoryId: 2,
    factor: -1,
    note: 'rent house',
    amount: 3000000,
    date: new Date(),
    walletId: 2,
  });
  trans = await getTransactions(
    db,
    moment(new Date()).startOf('day').toDate(),
    moment(new Date()).endOf('day').toDate(),
  );
  console.log('==== ', trans);
  await createSaveMoney(db, {amount: 1000000, fromDate: new Date(), target: 'For fun'});
}
