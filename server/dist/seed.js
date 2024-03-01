const mongoose = require("mongoose");
const Task = require("../models/task.model"); // Asegúrate de importar correctamente tu modelo de tareas

mongoose.connect("mongodb://localhost/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tasksData = [
  {
    title: "Comprar leche",
    completed: false,
  },
  {
    title: "Llamar al médico",
    description: "Llamar al médico para pedir cita",
    completed: false,
  },
  {
    title: "Hacer ejercicio",
    completed: true,
  },
];

async function seedTasks() {
  try {
    await Task.deleteMany();
    await Task.insertMany(tasksData);
    console.log("Tareas insertadas correctamente.");
  } catch (error) {
    console.error("Error al insertar las tareas:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedTasks();
