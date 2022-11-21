import React from 'react'
import { useState } from 'react'

export default function TodoList( {
    todo, 
    toggleComplete,
    handleDelete,
    handleEdit,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if(todo.completed === true) {
        setNewTitle(todo.title);
    } else {
        todo.title = "";
        setNewTitle(e.target.value);
    }
  };

  return (
    <div>
        <input 
            type="text"
            value={todo.title === "" ? newTitle : todo.title}
            onChange={handleChange}
        />
        <div>
            <button
                onClick={() => toggleComplete(todo)}
            >
                Завершено{/* {completed ? "Не завершено" : "Завершено"} */}
            </button>
            <button
                onClick={() => handleEdit(todo, newTitle)}
            >
                Редактировать
            </button>
            <button
                onClick={() => handleDelete(todo.id)}
            >
                Удалить
            </button>
        </div>
    </div>
  );
}