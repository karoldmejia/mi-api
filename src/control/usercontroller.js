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

    if (!userGet) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userGet);
  },

  create: (req, res) => {
    try {
      const db = dbConnection.readDB();
      const userData = req.body;

      const newUser = new User(userData.name, userData.email);

      newUser.id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1;

      db.users.push(newUser);
      dbConnection.writeDB(db);

      res.status(201).send("User created");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: (req, res) => {
    const db = dbConnection.readDB();
    const id = parseInt(req.params.id);
    const userData = req.body;

    const userIndex = db.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    db.users[userIndex] = { id, ...userData };
    dbConnection.writeDB(db);
    res.status(200).send("User updated");
  },

  delete: (req, res) => {
    const db = dbConnection.readDB();
    const id = parseInt(req.params.id);
    const userIndex = db.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    db.users.splice(userIndex, 1);
    dbConnection.writeDB(db);
    res.status(200).send("User deleted");
  }
};

module.exports = UserController;
