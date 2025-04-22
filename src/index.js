const express = require("express")
const user = require("./control/user.js")

const app = express()
app.use(express.json())

const port = 5000

// Creando los endpoints para la gestion de usuarios:
app.get("/users", user.list)

app.get("/users/:id", user.get)

app.post("/users/:id", user.create)


// método | verbo GET
app.get("/", (req, res) => {
  // 200 -> OK : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
  res.status(200).send("Hola desde el API")  
})

app.post("/", (req, res) => {
   // 201 -> OK -> Data Created : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  res.status(201).send("element created")  
})

app.put("/", (req, res) => {
  res.status(204).send("NO Content in edit")  
})

app.delete("/", (req, res) => {
  res.status(204).send("NO content in delete")  
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
