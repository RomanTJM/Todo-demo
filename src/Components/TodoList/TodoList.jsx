import React from 'react';
import { useState } from 'react';

export default function TodoList( {
    todo, 
    handleDelete,
    handleEdit,
    completed  
}) 
{
    const [isEditTable, setEditTable] = useState(false);

  return (
    <div className='todo-render'>
        {isEditTable ? (
            <>
                <input
                    className='input-add todo-render-input' 
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleEdit({...todo, title: e.target.value})}
                />
                <textarea 
                    className='textarea-add todo-render-textarea'
                    type="text"
                    value={todo.description}
                    onChange={(e) => handleEdit({...todo, description: e.target.value})}
                />
                <input 
                    className='input-date-app todo-render-date'
                    type="date"
                    value={todo.datecomplet}
                    onChange={(e) => handleEdit({...todo, datecomplet: e.target.value})}
                />
            </>
        ) : (
            <>
                <h3>Задача: {todo.title}</h3>
                <p>Описание задачи: {todo.description}</p>
                <p>Дата выполнения: {todo.datecomplet}</p>
                <a target="_blank" rel="noreferrer" href={todo.file}>{todo.file}</a>                                 
            </>            
        )
        }            
        <p>{completed ? "Завершено" : "В процессе"}</p>
        <div>
            <button className='form-btn todo-render-btn' onClick={() => handleEdit({ ...todo, completed: !todo.completed })}>
                {completed ? "Не завершено" : "Завершено"}
            </button>
            <button className='form-btn todo-render-btn' onClick={()=>setEditTable(!isEditTable)}>
                {isEditTable ? "Сохранить" : "Редактировать"}
            </button>
            <button className='form-btn todo-render-btn' onClick={() => handleDelete(todo.id)}>
                Удалить
            </button>
        </div>
    </div>
  );
}
