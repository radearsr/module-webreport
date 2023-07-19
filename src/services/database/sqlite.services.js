const db = require("../../config/db.config");

const checkAndCreateTableAuth = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY AUTOINCREMENT, id_list INTEGER, username VARCHAR(100), password VARCHAR(100), search VARCHAR(100))", (result, error) => {
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

const checkAndCreateTableLists = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), username VARCHAR(100), password VARCHAR(100), search VARCHAR(100))", (result, error) => {
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

(async () => {
  try {
    const result = await checkAndCreateTableAuth();
    console.log(result);
  } catch (error) {
    console.log(error);    
  }
})();
