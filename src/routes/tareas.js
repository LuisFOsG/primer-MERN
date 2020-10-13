const { Router } = require("express");
const ruta = Router();
const Tarea = require("../models/tareas");

ruta.get("/", async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
});

ruta.post("/", async (req, res) => {
    const { title, description } = req.body;
    const tarea = new Tarea({ title, description });
    await tarea.save();
    res.json({
        status: "Tarea Guardada"
    });
});

ruta.put("/:id", async (req, res) => {
    const { title, description } = req.body;
    const nuevaTarea = {title, description};
    await Tarea.findByIdAndUpdate(req.params.id, nuevaTarea);
    res.json({
        status: "Tarea Actualizada"
    });
})

ruta.delete("/:id", async (req, res) => {
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({
        status: "Tarea Eliminada"
    });
})

ruta.get("/:id", async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);
    res.json(tarea);
})

module.exports = ruta;
