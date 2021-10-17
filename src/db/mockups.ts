import {
  createAccessStatus,
  createCategories,
  createTransactions,
  getAccessStatus,
  getTransactions,
} from 'db/db-service';
import moment from 'moment';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

export async function mockups(db: SQLiteDatabase) {
  await createCategories(db, {name: 'relax', color: '#000000'});
  await createCategories(db, {name: 'relax', color: '#000000'});
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
    date: moment(new Date()).endOf('day').subtract(5, 'hour').toDate(),
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
  const trans = await getTransactions(
    db,
    moment(new Date()).startOf('day').toDate(),
    moment(new Date()).endOf('day').toDate(),
  );
  console.log('==== ', trans);
  const trans1 = await getTransactions(
    db,
    moment(new Date()).startOf('day').toDate(),
    moment(new Date()).endOf('day').toDate(),
    {factor: 1},
  );
  console.log('==== ', trans1);
  await createAccessStatus(db);
  console.log('=====', await getAccessStatus(db));
}
