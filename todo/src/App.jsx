import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import styles from './css/App.module.css'

function App() { const [todos, setTodos] = useState(() => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
  // 로컬스토리지에 데이터가 없으면 빈 배열로 초기화
});
// todos가 변경될 때만 로컬 스토리지 업데이트
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
const addTodo = (text) => {
  setTodos([...todos, { id: Date.now(), text, completed: false }]);
};
const updateTodo = (id, updatedText) => {
  setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo)));
};
const toggleComplete = (id) => {
  setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
};
const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
return (
  <div className={styles.app}>
    <h1>하나도 안 가볍지만<br />가볍게 만들어보려 노력한<br />React To-Do List</h1>
    <TodoInput addTodo={addTodo} />
    <TodoList
      todos={todos}
      updateTodo={updateTodo}
      toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}
    />
  </div>
  )
}

export default App
