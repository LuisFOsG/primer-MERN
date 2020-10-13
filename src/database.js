const mongoose = require("mongoose");

const URI = "mongodb://localhost/mern-tareas";

mongoose
    .connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log("La Base de Datos Esta Conectada"))
    .catch(err => console.error(err));