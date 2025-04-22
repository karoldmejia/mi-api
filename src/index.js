const express = require("express")
const path = require('path');
const user = require("./control/usercontroller")

const app = express()
app.use(express.json())

const port = 5000

// Creando los endpoints para la gestion de usuarios:
app.get("/users", user.list)

app.get("/users/:id", user.get)

app.post("/users/", user.create)

app.put("/users/:id", user.update)

app.delete("/users/:id", user.delete)

app.get('/{*path}', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public' , 'notfound.html'))
})

app.listen(port)