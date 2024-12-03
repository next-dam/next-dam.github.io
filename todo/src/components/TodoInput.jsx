// TodoInput.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoInput.css";
const TodoInput = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };
  return (
    <div className={style.container}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="오늘 해야하는 일을 등록해 주세요🙌"
        className={style.todoInput}
      />
      <button onClick={handleAdd}> 할 일 등록 </button>
    </div>
  );
};
export default TodoInput;