// TodoItem.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
      )}
      <button onClick={handleEdit}>
        {isEditing ? '등록' : '수정'}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>
        삭제
      </button>
    </li>
  );
};
export default TodoItem;