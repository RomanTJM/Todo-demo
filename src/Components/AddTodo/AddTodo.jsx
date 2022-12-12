import React from 'react';
import { db } from '../../firebace';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import AddFiles from '../AddFiles/AddFiles';

export default function AddTodo() {
    const initialData = {
        title: "",
        description: "",
        datecomplet: "",
    }

    const [data, setData] = useState(initialData);
    const [fileUrl, setFileUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, datecomplet } = data; 
            await addDoc(collection(db, "todos"), {
                title,
                completed: false,
                description,
                datecomplet,
                file: fileUrl,
            });
            setData(initialData);
            setFileUrl(null);
    }

  return (
    <div className='add-todo'>
        <form onSubmit={handleSubmit}>
            <div className='form-input-add'>
                <input
                    className='input-add' 
                    type="text" required
                    placeholder="Заголовок задачи"
                    value={data.title}
                    onChange={(e) => setData({...data, title: e.target.value})}
                />
                <textarea 
                    className='textarea-add'
                    type="text" required
                    placeholder="Описание задачи"
                    value={data.description}
                    onChange={(e) => setData({...data, description: e.target.value})}
                />
                <input 
                    className='input-date-app'
                    type="date" required
                    value={data.datecomplet}
                    onChange={(e) => setData({...data, datecomplet: e.target.value})}
                />
            </div>
            <AddFiles setFileUrl={setFileUrl}/>
            <div>
                <button className='form-btn'>Добавить задачу</button>
            </div>
        </form>
    </div>
  );
}
