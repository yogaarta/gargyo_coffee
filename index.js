require("dotenv").config();
const express = require("express");
// import package express
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");
const logger = require("morgan");
const cors = require("cors");

// create express application
const server = express();
const PORT = 8080;

// jika db connect maka jalankan
db.connect()
    .then(() => {
        console.log("DB Connected");
        // pasang middleware global

        // logger
        server.use(logger(":method :url :status :res[content-length] - :response-time ms"));
        // handler untuk body berbentuk form urlencode
        server.use(express.urlencoded({ extended:  false }));

        // handler untuk body berbentuk raw json
        server.use(express.json());
        const corsOptions = {
            origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
            methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
          };
          server.use(cors(corsOptions));

        server.use(express.static("public"));

        // pasang router ke server
        server.use(mainRouter);

        server.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });



