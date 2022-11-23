import React from 'react';
import { useState } from 'react';

export default function TodoList( {
    todo, 
    handleDelete,
    handleEdit,
    completed,
   
}) 
{
    const [isEditTable, setEditTable] = useState(false);


  return (
    <div>
        {isEditTable ? (
            <>
                <p>
                    <input 
                        type="text"
                        value={todo.title}
                        onChange={(e) => handleEdit({...todo, title: e.target.value})}
                    />
                </p>
                <p>
                    <input 
                        type="text"
                        value={todo.description}
                        onChange={(e) => handleEdit({...todo, description: e.target.value})}
                    />
                </p>
                <p>
                    <input 
                        type="date"
                        value={todo.datecomplet}
                        onChange={(e) => handleEdit({...todo, datecomplet: e.target.value})}
                    />
                </p>
                {/* <p>
                    <input 
                        type="file" 
                        value={todo.files}
                        onChange={(e) => handleEdit({...todo, files: e.target.value})}
                     />
                </p> */}
            </>
        ) : (
            <>
                <h3>Задача: {todo.title}</h3>
                <p>Описание задачи: {todo.description}</p>
                <p>Дата выполнения: {todo.datecomplet}</p>
                {/* <p>Вложенные файлы: {todo.files}</p> */}
            </>
        )
        }

        
       
        <p>{completed ? "Завершено" : "В процессе"}</p>
        <div>
            <button onClick={() => handleEdit({ ...todo, completed: !todo.completed })}>
                {completed ? "Не завершено" : "Завершено"}
            </button>
            <button onClick={()=>setEditTable(!isEditTable)}>
                {isEditTable ? "Сохранить" : "Редактировать"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>
                Удалить
            </button>
        </div>
    </div>
  );
}
