import {enablePromise, openDatabase, ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import moment from 'moment';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'finha.db', location: 'default'});
};

export interface Column {
  name: string;
  dataType: string;
  defaultValue?: any;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
}

// ------------------------------- Post Handler: Parse to Objects ---------------------------------------
const postHandler = <T>(results: [ResultSet]) => {
  const transactions: T[] = [];
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      transactions.push(result.rows.item(index));
    }
  });
  return transactions;
};

// ------------------------------- Create Table ---------------------------------------
export const createTable = async (db: SQLiteDatabase, tableName: string, columns: Column[]) => {
  let colInfos = '';
  columns.forEach((col, index) => {
    colInfos += `${col.name} ${col.dataType}`;
    // default value
    if (typeof col.defaultValue !== 'undefined') {
      colInfos += ` DEFAULT ${col.defaultValue}`;
    }
    // not null
    if (col.notNull) {
      colInfos += ` NOT NULL`;
    }
    // Primary key
    if (col.primaryKey) {
      colInfos += ' PRIMARY KEY AUTOINCREMENT';
    }
    // Unique
    if (col.unique) {
      colInfos += ' UNIQUE';
    }
    // add , if not last col
    if (index < columns.length - 1) {
      colInfos += ',';
    }
  });
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${colInfos});`;
  console.log(query);
  await db.executeSql(query);
};
// ------------------------------- Delete Table ---------------------------------------

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `drop table ${tableName}`;
  console.log(query);
  await db.executeSql(query);
};

// ------------------------------- Wallet Query ---------------------------------------
export const createWallets = async (db: SQLiteDatabase) => {
  const wallets = ['Digital Wallet', 'Cash', 'Internet Banking'];
  await Promise.all(
    wallets.map(wallet => {
      const query = `INSERT INTO wallets (name) VALUES('${wallet}');`;
      return db.executeSql(query);
    }),
  );
};

export const getWallets = async (db: SQLiteDatabase) => {
  const query = `
    SELECT *
    FROM wallets`;
  console.log("=====", query);
  const wallets: {id: number; name: string}[] = [];
  const results = await db.executeSql(query);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      wallets.push(result.rows.item(index));
    }
  });
  return wallets;
};

// ------------------------------- Transactions Query ---------------------------------------

export interface Transaction {
  id?: number;
  categoryId: number;
  walletId: number;
  factor: number; // thu: +1, chi: -1
  date: Date | string;
  amount: number;
  note: string;
}

export const createTransactions = async (db: SQLiteDatabase, transaction: Transaction) => {
  const {categoryId, walletId, factor, date, amount, note} = transaction;
  const query = `
      INSERT INTO transactions (categoryId, walletId, factor, date, amount, note) 
      VALUES(${categoryId}, ${walletId}, ${factor}, '${moment(date).format(
    'YYYY-MM-DD HH:mm:SS.SSS',
  )}', ${amount}, '${note}');`;
  const results = await db.executeSql(query);
  return postHandler(results);
};

export const getTransactions = async (db: SQLiteDatabase, start: Date, end: Date) => {
  const startStr = moment(start).format('YYYY-MM-DD HH:mm:SS.SSS');
  const endStr = moment(end).format('YYYY-MM-DD HH:mm:SS.SSS');

  const query = `
    SELECT * FROM
        (SELECT * FROM
            (SELECT * FROM transactions WHERE date BETWEEN '${startStr}' AND '${endStr}') AS trans
              LEFT JOIN 
              (SELECT name as category, id FROM categories) as categories 
              ON trans.categoryId = categories.id) as trans_with_cate
        LEFT JOIN (SELECT name as wallet, id FROM wallets) as wallets 
        ON trans_with_cate.walletId = wallets.id;
  `;

  const results = await db.executeSql(query);
  return postHandler(results);
};

// ------------------------------- Categories Query ---------------------------------------

export interface ICategory {
  id?: number;
  name: string;
  color: string;
}
export const createCategories = async (db: SQLiteDatabase, categoryInfo: ICategory) => {
  const {name, color} = categoryInfo;
  const query = `
    INSERT INTO categories (name, color)
    VALUES('${name}', '${color}');
  `;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};

export const getAllCategories = async (db: SQLiteDatabase) => {
  const query = `
    SELECT * FROM categories
  `;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};
