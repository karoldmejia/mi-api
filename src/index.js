const express = require("express")
const cors = require("cors"); // Importar la librería
const path = require('path');
const user = require("./control/usercontroller")

const app = express()
app.use(express.json())

app.use(cors()); // Habilitarla

const port = 5000


// Creando los endpoints para la gestion de usuarios:
app.get("/users", user.list)

app.get("/users/:id", user.get)

app.post("/users/", user.create)

app.put("/users/:id", user.update)

app.delete("/users/:id", user.delete)

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/{*path}', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public' , 'notfound.html'))
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});