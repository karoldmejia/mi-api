const express = require("express");
const user = require("./control/usercontroller");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/users", user.list);
app.get("/users/:id", user.get);
app.post("/users", user.create);
app.put("/users/:id", user.update);
app.delete("/users/:id", user.delete);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
