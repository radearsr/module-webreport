const loggingService = require("../../utils/logging/logging.utils");
const dbServices = require("../database/sqlite.services");

const createOrUpdateNote = async (data) => {
  try {
    loggingService.showLogging("INFO", JSON.stringify(data));
    const { id, title, contents } = data;
    const note = await dbServices.getNoteById(id);
    if (!note) {
      return dbServices.createNote(title, contents);
    }
    return dbServices.updateNote(id, title, contents);
  } catch (error) {
    loggingService.showLogging("ERROR", error.stack); 
  }
};

const deleteNotes = async (id) => {
  try {
    loggingService.showLogging("INFO", JSON.stringify(id));
    return dbServices.deleteNote(id);
  } catch (error) {
    loggingService.showLogging("ERROR", error.stack); 
  }
};

const getAllNotes = async (electronMainProccess) => {
  try {
    const notes = await dbServices.getAllNotes();
    loggingService.showLogging("WARN", JSON.stringify(notes));
    return electronMainProccess.send("res-notes-lists", notes);
  } catch (error) {
    loggingService.showLogging("ERROR", error.stack);    
  }
};

module.exports = {
  createOrUpdateNote,
  deleteNotes,
  getAllNotes,
};
