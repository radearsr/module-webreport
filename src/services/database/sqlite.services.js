const db = require("../../config/db.config");

const checkAndCreateTableAuth = () => {
  return new Promise((resolve, reject) => {
    const query = "CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY AUTOINCREMENT, id_list INTEGER, token TEXT)";
    db.serialize(() => {
      db.run(query, (result, error) => {
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
    const query = "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), username VARCHAR(100), password VARCHAR(100), search VARCHAR(100), status BOOLEAN DEFAULT FALSE)";
    db.serialize(() => {
      db.run(query, (result, error) => {
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

const createList = (title, username, password, search) => {
  checkAndCreateTableLists();
  checkAndCreateTableAuth();
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO lists (title, username, password, search) VALUES ('${title}', '${username}', '${password}', '${search}')`;
    db.serialize(() => {
      db.all(query, function(error) {
        db.close();
        console.log(this);
        if (!error) {
          resolve(this);
        }
        reject(error);
      });
    });
  }); 
};

const readLists = () => {
  checkAndCreateTableLists();
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM lists`;
    db.serialize(() => {
      db.all(query, (result, error) => {
        db.close();
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  }); 
};

const createAuth = (idList, token) => {
  checkAndCreateTableLists();
  checkAndCreateTableAuth();
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO auth (id_list, token) VALUES (${idList}, '${token}')`;
    db.serialize(() => {
      db.all(query, (result, error) => {
        db.close();
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

const readAuthByIdList = (idList) => {
  checkAndCreateTableAuth();
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM auth WHERE id = ${idList}`;
    db.serialize(() => {
      db.all(query, (result, error) => {
        db.close();
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

const updateListStatusById = (id, status) => {
  checkAndCreateTableLists();
  return new Promise((resolve, reject) => {
    const query = `UPDATE lists SET status = ${status} WHERE id = ${id}`;
    db.serialize(() => {
      db.run(query, (result, error) => {
        db.close();
        if (!error) {
          resolve(result);
        }
        reject(error);
      });
    });
  });
};

module.exports = {
  createList,
  readLists,
  createAuth,
  readAuthByIdList,
  updateListStatusById,
};
