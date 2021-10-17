import {Column} from 'db/db-service';

export const models: {[key: string]: Column[]} = {
  categories: [
    {name: 'id', primaryKey: true, dataType: 'INTEGER', notNull: true},
    {name: 'name', dataType: 'TEXT', defaultValue: "''"},
    {name: 'color', dataType: 'TEXT', defaultValue: "'#000'"},
  ],
  wallets: [
    {name: 'id', primaryKey: true, dataType: 'INTEGER', notNull: true},
    {name: 'name', dataType: 'TEXT', defaultValue: "''"},
  ],
  transactions: [
    {name: 'id', primaryKey: true, dataType: 'INTEGER', notNull: true},
    {name: 'categoryId', dataType: 'INTEGER', notNull: true},
    {name: 'factor', dataType: 'INTEGER', notNull: true},
    {name: 'date', dataType: 'TEXT', notNull: true},
    {name: 'walletId', dataType: 'INTEGER', notNull: true},
    {name: 'amount', dataType: 'REAL', notNull: true},
    {name: 'note', dataType: 'TEXT', defaultValue: "''"},
  ],
  personal_income: [
    {name: 'id', primaryKey: true, dataType: 'INTEGER', notNull: true},
    {name: 'total', dataType: 'REAL', notNull: true},
  ],
  access_status: [
    {name: 'id', primaryKey: true, dataType: 'INTEGER', notNull: true},
    {name: 'active', dataType: 'INTEGER', defaultValue: 1},
  ],
};
