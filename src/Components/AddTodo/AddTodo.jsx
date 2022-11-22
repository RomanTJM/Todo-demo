import React from 'react';
import { db } from '../../firebace';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function AddTodo() {
    const initialData = {
        title: "",
        description: "",
        datecomplet: "",
    }
    const [data, setData] = useState(initialData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, datecomplet } = data;
            await addDoc(collection(db, "todos"), {
                title,
                completed: false,
                description,
                datecomplet,
            });
            setData(initialData);
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input 
                type="text"
                placeholder="Заголовок задачи"
                value={data.title}
                onChange={(e) => setData({...data, title: e.target.value})}
            />
            <input 
                type="text"
                placeholder="Описание задачи"
                value={data.description}
                onChange={(e) => setData({...data, description: e.target.value})}
            />
            <input 
                type="date"
                placeholder="Заголовок задачи"
                value={data.datecomplet}
                onChange={(e) => setData({...data, datecomplet: e.target.value})}
            />
        </div>
        <div>
            <button>Добавить</button>
        </div>
    </form>
  )
}
