import {useState} from 'react';
import axios from 'axios';

function NewTask({setTasks}){
    const [title, setTitle] = useState('');
    const[description, setDescription] = 
useState('');

const handleSubmit = async (event)=>{
    event.preventDefault();
    try {
        const response = await
        axios.post('http://localhost:3001',{title,description});
        setTasks(task=>[...task,response.data]);
        
    } catch (error) {
        console.error('Error al crear la tarea', error);
        
    }
};

return(
<form onSubmit={handleSubmit}
className='newTask'>
    <label htmlFor='title'>
        Título:
    </label>
    <input
    id='title'
    value={title}
    onChange={(event)=>
    setTitle(event.target.value)}
    required
    />
    <label htmlFor='description'>Descripción:</label>
    <textarea
    id='description'
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    />
    <button type="submit">Agregar</button>
</form>


);

}

export default NewTask;