const User = {
    // GET -> Listar
    list: (req, res) => {
        res.status(200).send("Lista de usuarios")
    }, 
    get: (req, res) => {
        res.status(200).send("Get unique element")
        console.log(req.params)
    },
    // POST -> Modificar
    create: (req, res) => {
        res.status(201).send("modify user")
        console.log(req.body)  
    }
}

module.exports = User