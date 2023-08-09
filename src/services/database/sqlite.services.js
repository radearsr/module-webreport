const sqlite3 = require("better-sqlite3");
const path = require("path");
const databasePath = "webreport.db";

const checkAndCreateAllTable = () => {
  const db = sqlite3(databasePath);
  const createTableAuth =
    "CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY AUTOINCREMENT, id_list INTEGER, token TEXT)";
  const createTableList =
    "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), username VARCHAR(100), password VARCHAR(100), status BOOLEAN DEFAULT FALSE)";
  const createTableNotes =
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), contents TEXT)";
  db.exec(createTableList);
  db.exec(createTableAuth);
  db.exec(createTableNotes);
  db.close();
};

const createLists = (title, username, password) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryInsert = "INSERT INTO lists (title, username, password) VALUES (?, ?, ?)";
  const dataToInsert = [title, username, password];
  const createStatement = db.prepare(queryInsert);
  const createdList = createStatement.run(dataToInsert);
  // console.log(createdList);
  db.close();
  return createdList;
};

const readListByTitle = (title) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const querySelect = "SELECT * FROM lists WHERE title = ?";
  const dataToSelect = [title];
  const readStatement = db.prepare(querySelect);
  const lists = readStatement.get(dataToSelect);
  db.close();
  // console.log({ lists });
  return lists;
};

const createAuth = async (listId, token) => {
  console.log("CREATED");
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryInsert = "INSERT INTO auth (id_list, token) VALUES (?, ?)";
  const dataToInsert = [listId, token];
  const createStatement = db.prepare(queryInsert)
  const createdAuth = createStatement.run(dataToInsert);
  db.close();
  // console.log({ createdAuth });
  return createdAuth;
};

const updateListStatus = async (listId, status) => {
  console.log("UPDATE");
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  status = status ? 1 : 0;
  const queryUpdate = "UPDATE lists SET status = ? WHERE id = ?";
  const dataToUpdate = [status, listId];
  const updateStatement = db.prepare(queryUpdate);
  const updatedList = updateStatement.run(dataToUpdate);
  db.close();
  // console.log(updatedList);
  return updatedList;
};

const updateListStatusByTitle = async (title, status) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  status = status ? 1 : 0;
  const queryUpdate = "UPDATE lists SET status = ? WHERE title = ?";
  const dataToUpdate = [status, title];
  const updateStatement = db.prepare(queryUpdate);
  const updatedList = updateStatement.run(dataToUpdate);
  db.close();
  // console.log(updatedList);
  return updatedList;
};

const readAllLists = async () => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const querySelect = "SELECT * FROM lists";
  const readStatement = db.prepare(querySelect);
  const lists = readStatement.all();
  db.close();
  // console.log(lists);
  return lists;
};

const readAuthByListId = async (listId) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const querySelect = "SELECT * FROM auth WHERE id_list = ?";
  const dataToSelect = [listId];
  const readStatement = db.prepare(querySelect);
  const auth = readStatement.get(dataToSelect);
  db.close();
  // console.log({ auth });
  return auth;
};

const updateAuthByListId = async (listId, token) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryUpdate = "UPDATE auth SET token = ? WHERE id_list = ?";
  const dataToUpdate = [token, listId];
  const updateStatement = db.prepare(queryUpdate);
  const updatedAuth = updateStatement.run(dataToUpdate);
  db.close();
  // console.log(updatedAuth);
  return updatedAuth;
};

const createNote = async (title, contents) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryInsert = "INSERT INTO notes (title, contents) VALUES (?, ?)";
  const dataToInsert = [title, contents];
  const insertStatement = db.prepare(queryInsert);
  const insertedNote = insertStatement.run(dataToInsert);
  db.close();
  // console.log(insertedNote);
  return insertedNote;
};

const updateNote = async (id, title, contents) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryUpdate = "UPDATE notes SET title = ?, contents = ? WHERE id = ?";
  const dataToUpdate = [title, contents, id];
  const updateStatement = db.prepare(queryUpdate);
  const updatedNote = updateStatement.run(dataToUpdate);
  db.close();
  // console.log(updatedNote);
  return updatedNote;
};

const deleteNote = async (id) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const queryDelete = "DELETE FROM notes WHERE id = ?";
  const dataToDelete = [id];
  const deleteStatement = db.prepare(queryDelete);
  const deletedNote = deleteStatement.run(dataToDelete);
  db.close();
  console.log(deletedNote);
  return deletedNote;
};

const getNoteById = async (id) => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const querySelect = "SELECT * FROM notes WHERE id = ?";
  const dataToSelect = [id];
  const selectStatement = db.prepare(querySelect);
  const selectedNote = selectStatement.get(dataToSelect);
  db.close();
  // console.log(selectedNote);
  return selectedNote;
}

const getAllNotes = async () => {
  checkAndCreateAllTable();
  const db = sqlite3(databasePath);
  const querySelect = "SELECT * FROM notes";
  const readStatement = db.prepare(querySelect);
  const notes = readStatement.all();
  db.close();
  // console.log(notes);
  return notes;
};

module.exports = {
  createLists,
  createAuth,
  readListByTitle,
  updateListStatus,
  readAllLists,
  readAuthByListId,
  updateAuthByListId,
  updateListStatusByTitle,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  getAllNotes,
};
