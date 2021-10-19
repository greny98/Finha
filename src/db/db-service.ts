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
export interface Wallet {
  id?: number;
  name: string;
}

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
  console.log('=====', query);
  const results = await db.executeSql(query);
  return postHandler<Wallet>(results);
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

export interface GetTransactionResult extends Transaction {
  category: string;
  wallet: string;
}

export const getTransactions = async (db: SQLiteDatabase, start: Date, end: Date, filters = {}) => {
  const startStr = moment(start).format('YYYY-MM-DD HH:mm:SS.SSS');
  const endStr = moment(end).format('YYYY-MM-DD HH:mm:SS.SSS');
  let where = '';
  if (Object.keys(filters).length > 0) {
    where = 'WHERE ';
    Object.entries(filters).forEach(([field, value]) => {
      console.log('====== field, value', field, value);
      let editedValue = value;
      if (typeof value == 'string') {
        editedValue = `'${value}'`;
      }
      where += `${field} = ${editedValue} `;
    });
  }
  const query = `
    SELECT * FROM
        (SELECT * FROM
            (SELECT * FROM transactions WHERE date BETWEEN '${startStr}' AND '${endStr}') AS trans
              LEFT JOIN 
              (SELECT name as category, id FROM categories) as categories 
              ON trans.categoryId = categories.id) as trans_with_cate
        LEFT JOIN (SELECT name as wallet, id FROM wallets) as wallets 
        ON trans_with_cate.walletId = wallets.id 
    ${where};
  `;
  console.log('=====\n', query);
  const results = await db.executeSql(query);
  return postHandler<GetTransactionResult>(results);
};

export const updateTransaction = async (db: SQLiteDatabase, trans: Transaction) => {
  let setCols = 'SET ';
  const entries = Object.entries(trans);
  const nFields = entries.length;
  entries.map(([field, value], idx) => {
    if (field !== 'id') {
      let edited = value;
      if (typeof value == 'string') {
        edited = `'${value}'`;
      }
      setCols += `${field} = ${edited}`;
      if (idx < nFields - 1) edited += ',';
    }
  });
  const query = `
  UPDATE table
  ${setCols}
  WHERE
    id = ${trans.id} ;
  `;
  const results = await db.executeSql(query);
  return postHandler<GetTransactionResult>(results);
};

// ------------------------------- Categories Query ---------------------------------------

export interface ICategory {
  id?: number;
  name: string;
  color: string;
}
export const createCategories = async (db: SQLiteDatabase) => {
  const categoryInfo = [
    {
      name: 'market',
      color: '#00C689',
    },
    {
      name: 'living',
      color: '#FE645A',
    },
    {
      name: 'rent',
      color: '#2A327D',
    },
    {
      name: 'payment',
      color: '#FFB039',
    },
    {
      name: 'income',
      color: '#cecece',
    },
  ];

  const results = await Promise.all(
    categoryInfo.map(category => {
      const query = `
    INSERT INTO categories (name, color)
    VALUES('${category.name}','${category.color}');
  `;
      return db.executeSql(query);
    }),
  );
  // console.log('🚀 ~ file: db-service.ts ~ line 189 ~ createCategories ~ results', results);
  return results.map(r => postHandler(r));
};

export const getAllCategories = async (db: SQLiteDatabase) => {
  const query = `
    SELECT * FROM categories;
  `;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};

// ------------------------------- Access Status ---------------------------------------
export interface AccessStatus {
  id: number;
  status: string;
}

export const createAccessStatus = async (db: SQLiteDatabase) => {
  const query = `
    INSERT INTO access_status (active)
    VALUES(1);
  `;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};

export const getAccessStatus = async (db: SQLiteDatabase) => {
  const query = `SELECT * FROM access_status;`;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};

// ------------------------------- Save Money ---------------------------------------
export interface SaveMoney {
  id?: number;
  amount: number;
  target: string;
  fromDate: Date;
}

export const createSaveMoney = async (db: SQLiteDatabase, info: SaveMoney) => {
  const fromDate = moment(info.fromDate).format('YYYY-MM-DD HH:mm:SS.SSS');
  const query = `
    INSERT INTO save_money (amount, target, fromDate)
    VALUES(${info.amount}, '${info.target}', '${fromDate}');
  `;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};

export const getSaveMoney = async (db: SQLiteDatabase) => {
  const current = new Date();
  const startStr = moment(current).startOf('month').format('YYYY-MM-DD HH:mm:SS.SSS');
  const endStr = moment(current).endOf('month').format('YYYY-MM-DD HH:mm:SS.SSS');
  const query = `SELECT * FROM access_status BETWEEN '${startStr}' AND '${endStr}');`;
  console.log('======\n', query);
  const results = await db.executeSql(query);
  return postHandler(results);
};
