const { AsyncDatabase } = require("promised-sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "webreport.db");

const checkAndCreateAllTable = async () => {
  const db = await AsyncDatabase.open(databasePath);
  const createTableAuth = "CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY AUTOINCREMENT, id_list INTEGER, token TEXT)";
  const createTableList = "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), username VARCHAR(100), password VARCHAR(100), status BOOLEAN DEFAULT FALSE)";
  await db.run(createTableAuth);
  await db.run(createTableList);
  db.close();
};

const createLists = async (title, username, password) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const queryInsert = `INSERT INTO lists (title, username, password) VALUES ('${title}', '${username}', '${password}')`;
  const createdList = await db.run(queryInsert);
  db.close();
  return createdList;
};

const readListByTitle = async (title) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const querySelect = `SELECT * FROM lists WHERE title = '${title}'`;
  const list = await db.get(querySelect);
  db.close();
  return list;
};

const createAuth = async (listId, token) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const queryInsert = `INSERT INTO auth (id_list, token) VALUES ('${listId}', '${token}')`;
  const createdAuth = await db.run(queryInsert);
  db.close();
  return createdAuth;
};

const updateListStatus = async (listId, status) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const queryUpdate = `UPDATE lists SET status = ${status} WHERE id = ${listId}`;
  const updatedList = await db.run(queryUpdate);
  db.close();
  return updatedList;
};

const readAllLists = async () => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const querySelect = "SELECT * FROM lists";
  const lists = await db.all(querySelect);
  db.close();
  return lists;
};

const readAuthByListId = async (listId) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const querySelect = `SELECT * FROM auth WHERE id_list = ${listId}`;
  const auth = await db.get(querySelect);
  db.close();
  return auth;
};

const updateAuthByListId = async (listId, token) => {
  await checkAndCreateAllTable();
  const db = await AsyncDatabase.open(databasePath);
  const queryUpdate = `UPDATE auth SET token = '${token}' WHERE id_list = ${listId}`;
  const updatedAuth = await db.run(queryUpdate);
  db.close();
  return updatedAuth;
};

module.exports = {
  createLists,
  createAuth,
  readListByTitle,
  updateListStatus,
  readAllLists,
  readAuthByListId,
  updateAuthByListId,
};
