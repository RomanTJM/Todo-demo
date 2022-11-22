import './App.css';
import AddTodo from './Components/AddTodo/AddTodo';
import TitleTodo from './Components/TitleTodo/TitleTodo';
import TodoList from './Components/TodoList/TodoList';
import { query, 
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc } from 'firebase/firestore';
import { db } from './firebace';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({... doc.data(), id: doc.id});
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);


  // Редактирование
  const handleEdit = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), todo);
  };

 

  // Удаление
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="App">
      <div>
        <TitleTodo />
      </div>
      <AddTodo />
      <div>
        {todos.map((todo) => (
          <TodoList 
            key={todo.id}
            todo={todo}
            completed={todo.completed}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
