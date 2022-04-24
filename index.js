const express = require("express")
// import package express
const mainRouter = require("./src/routes/index")
const db = require("./src/config/db")

// create express application
const server = express()
const PORT = 8080

// jika db connect maka jalankan
db.connect()
    .then(() => {
        console.log("DB Connected")
        // pasang router ke server
        server.use(mainRouter)

        server.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })



