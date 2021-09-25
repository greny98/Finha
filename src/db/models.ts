import { Column } from "db/db-service";

export const models: { [key: string]: Column[] } = {
  categories: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "name", dataType: "TEXT", defaultValue: "''" },
    { name: "color", dataType: "TEXT", defaultValue: "'#000'" }
  ],
  wallets: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "name", dataType: "TEXT", defaultValue: "''" }
  ],
  transactions: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "categoryId", dataType: "INTEGER", notNull: true },
    { name: "factor", dataType: "INTEGER", notNull: true },
    { name: "date", dataType: "TEXT", notNull: true }
  ]
};
