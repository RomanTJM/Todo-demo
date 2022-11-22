import React from 'react';
import { db } from '../../firebace';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function AddTodo() {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title !== "") {
            await addDoc(collection(db, "todos"), {
                title,
                completed: false,
                // description,
                // datecomplet,
            });
            setTitle("");
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input 
                type="text"
                placeholder="Заголовок задачи"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* <input 
                type="text"
                placeholder="Описание задачи"
                value={description}
                onChange={(e) => setTitle(e.target.value, "description")}
            />
            <input 
                type="date"
                placeholder="Дата завершения"
                value={datecomplet}
                onChange={(e) => setTitle(e.target.value, "datecomplet")}
            /> */}
        </div>
        <div>
            <button>Добавить</button>
        </div>
    </form>
  )
}
