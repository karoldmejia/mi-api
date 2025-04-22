const dbConnection = require("../connection/database");
const User = require("../model/user");

const UserController = {
  list: (req, res) => {
    const db = dbConnection.readDB();
    res.status(200).json(db.users);
  },

  get: (req, res) => {
    const db = dbConnection.readDB();
    const id = parseInt(req.params.id);
    const userGet = db.users.find(user => user.id === id);
    res.status(200).json(userGet);
  },

  create: (req, res) => {
    const db = dbConnection.readDB();
    const userData = req.body;
    const newUser = new User(userData.name, userData.email);

    newUser.id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1;

    db.users.push(newUser);
    dbConnection.writeDB(db);

    res.status(201).send("Usuario creado");
  },

  update: (req, res) => {
    const db = dbConnection.readDB();
    const id = parseInt(req.params.id);
    const userData = req.body;

    const userIndex = db.users.findIndex(user => user.id === id);
    db.users[userIndex] = { id, ...userData };

    dbConnection.writeDB(db);
    res.status(204).send("Usuario modificado");
  },

  delete: (req, res) => {
    const db = dbConnection.readDB();
    const id = parseInt(req.params.id);
    const userIndex = db.users.findIndex(user => user.id === id);

    db.users.splice(userIndex, 1);
    dbConnection.writeDB(db);

    res.status(204).send("Usuario eliminado");
  }
};

module.exports = UserController;
