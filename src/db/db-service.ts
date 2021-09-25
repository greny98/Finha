import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
import moment from "moment";

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: "finha.db", location: "default" });
};


export interface Column {
  name: string;
  dataType: string;
  defaultValue?: any;
  primaryKey?: boolean;
  notNull?: boolean;
}

export const createTable = async (db: SQLiteDatabase, tableName: string, columns: Column[]) => {
  let colInfos = "";
  columns.forEach((col, index) => {
    colInfos += `${col.name} ${col.dataType}`;
    // default value
    if (typeof col.defaultValue !== "undefined") {
      colInfos += ` DEFAULT ${col.defaultValue}`;
    }
    // not null
    if (col.notNull) {
      colInfos += ` NOT NULL`;
    }
    // Primary key
    if (col.primaryKey) {
      colInfos += " PRIMARY KEY AUTOINCREMENT";
    }
    // add , if not last col
    if (index < columns.length - 1) {
      colInfos += ",";
    }
  });
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${colInfos});`;
  console.log(query);
  await db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `drop table ${tableName}`;
  await db.executeSql(query);
};

export const createWallets = async (db: SQLiteDatabase) => {
  const wallets = ["Digital Wallet", "Cash", "Internet Banking"];
  await Promise.all(wallets.map(wallet => {
    const query = `INSERT INTO wallets (name) VALUES('${wallet}');`;
    return db.executeSql(query);
  }));
};

export const getWallets = async (db: SQLiteDatabase) => {
  const query = `
    SELECT *
    FROM wallets`;
  const wallets: { id: number, name: string }[] = [];
  const results = await db.executeSql(query);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      wallets.push(result.rows.item(index));
    }
  });
  return wallets;
};

export interface Transaction {
  id?: number;
  categoryId: number;
  walletId: number;
  factor: number; // thu: +1, chi: -1
  date: Date | string;
  amount: number;
  note: string;
}

export const createTransactions = (db: SQLiteDatabase, transaction: Transaction) => {
  const { categoryId, walletId, factor, date, amount, note } = transaction;
  const query = `
      INSERT INTO transactions (categoryId, walletId, factor, date, amount, note) 
      VALUES(${categoryId}, ${walletId}, ${factor}, '${moment(date).format("YYYY-MM-DD HH:mm:SS.SSS")}', ${amount}, '${note}');`;
  return db.executeSql(query);
};

export const getTransactions = async (db: SQLiteDatabase, start: Date, end: Date) => {
  const startStr = moment(start).format("YYYY-MM-DD HH:mm:SS.SSS");
  const endStr = moment(end).format("YYYY-MM-DD HH:mm:SS.SSS");

  const query = `
    SELECT * FROM transactions WHERE date BETWEEN '${startStr}' AND '${endStr}'
  `;
  const transactions: Transaction[] = [];
  const results = await db.executeSql(query);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      transactions.push(result.rows.item(index));
    }
  });
  return transactions;
};


