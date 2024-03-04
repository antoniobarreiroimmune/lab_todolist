import { useState, useEffect } from "react";
import axios from "axios";
import './TaskList.css'
import NewTask from "../NewTask/NewTask";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    axios.get("http://localhost:3001");
                setTasks(response.data);
            } catch (error) {
                console.error("Error cargando las tareas", error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        return new Date(dateString).toLocaleDateString('es', options);
    };

    const completedTask = async (id) => {
        try {
            await axios.put(`http://localhost:3001/${id}`, { completed: true });
            setTasks(tasks.map(task => task._id === id ? { ...task, completed: true } : task));
        } catch (error) {
            console.error("Error al completar la tarea", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
        }
    };

    const isTaskCompleted = (id) => {
        const task = tasks.find(task => task._id === id);
        return task && task.completed;
    };



    return (
        <div className="container">
            <h2>Lista</h2>
            <NewTask setTasks={setTasks} />
            <ul >
                {tasks.map((task) => (
                    <li key={task._id} className="taskList" >
                        <h3>{task.title}</h3>
                        {task.description && <p>
                            Descripción:{task.description}</p>}
                        {task.completed ? <span>✅</span> : <span>❌</span>}
                        <p>Creado: {formatDate(task.createdAt)}</p>
                        <p>Actualizado: {formatDate(task.updatedAt)}</p>
                        <button onClick={() => completedTask(task._id)}>Completar</button>
                        <button onClick={() => deleteTask(task._id)} disabled={!isTaskCompleted(task._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TaskList;