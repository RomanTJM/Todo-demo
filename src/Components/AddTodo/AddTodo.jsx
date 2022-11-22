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
    const [titleDirty, setTitleDirty] = useState(false);
    const [titleErorr, setTitleErorr] = useState('Заголовок не может быть пустым');

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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                break
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            {(titleDirty && titleErorr) && <div style={{color:'red'}}>{titleErorr}</div>}
            <input 
                name='title'
                type="text"
                placeholder="Заголовок задачи"
                value={data.title}
                onChange={(e) => setData({...data, title: e.target.value})}
                onBlur={e => blurHandler(e)}
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
