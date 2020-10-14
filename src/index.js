const express = require("express");
const morgan = require("morgan");
const path = require("path");

require("./database");

const server = express();

// TODO crear el frontend con React
// TODO hacer proyectos con APIs

server.set("port", process.env.PORT || 3000);

// Middlewares
server.use(morgan("dev"));
server.use(express.json());

// Rutas
server.use("/api/tareas", require("./routes/tareas"));

// Archivos Estaticos
server.use(express.static(path.join(__dirname, "public")))

server.listen(server.get("port"), () => {
    console.log("Servidor listo En el Puerto", server.get("port"));
})