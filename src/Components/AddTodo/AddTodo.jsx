import React from 'react';
import { db } from '../../firebace';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
// import AddFiles from '../AddFiles/AddFiles';

export default function AddTodo() {
    const initialData = {
        title: "",
        description: "",
        datecomplet: "",
        // files: "",
    }
    const [data, setData] = useState(initialData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, datecomplet } = data; //files } = data;
            await addDoc(collection(db, "todos"), {
                title,
                completed: false,
                description,
                datecomplet,
                // files,
            });
            setData(initialData);
    }

  return (
    <div>

<form onSubmit={handleSubmit}>
        <div>
            <input 
                type="text" required
                placeholder="Заголовок задачи"
                value={data.title}
                onChange={(e) => setData({...data, title: e.target.value})}
            />
            <input 
                type="text" required
                placeholder="Описание задачи"
                value={data.description}
                onChange={(e) => setData({...data, description: e.target.value})}
            />
            <input 
                type="date" required
                placeholder="Заголовок задачи"
                value={data.datecomplet}
                onChange={(e) => setData({...data, datecomplet: e.target.value})}
            />
            {/* <input 
                type="file" 
                value={data.files}
                onChange={(e) => setData({...data, files: e.target.value})}
            /> */}
            
        </div>
        
        <div>
            <button>Добавить</button>
        </div>
    </form>
    {/* <AddFiles /> */}
    </div>

  )
}
