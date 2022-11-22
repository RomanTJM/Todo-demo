import React from 'react';

export default function TodoList( {
    todo, 
    toggleComplete,
    handleDelete,
    handleEdit,
    completed,
    data,
}) 
{

  return (
    <div>
        <input 
            type="text"
            value={data.title}
            onChange={(e) => handleEdit({...todo, title: e.target.value})}
        />
        <input 
            type="text"
            value={data.description}
            onChange={(e) => handleEdit({...todo, description: e.target.value})}
        />
        <input 
            type="date"
            value={data.datecomplet}
            onChange={(e) => handleEdit({...todo, datecomplet: e.target.value})}
        />
        <p>{completed ? "Завершено" : "В процессе"}</p>
        <div>
            <button onClick={() => toggleComplete(todo)}>
                {completed ? "Не завершено" : "Завершено"}
            </button>
            <button>
                Редактировать
            </button>
            <button onClick={() => handleDelete(todo.id)}>
                Удалить
            </button>
        </div>
    </div>
  );
}
