import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onAdd: (text: string, date: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onAdd, onDelete, onToggle }) => {
  const [newTodo, setNewTodo] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo, newDate);
      setNewTodo('');
      setNewDate('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">قائمة المهام</h2>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="أضف مهمة جديدة"
          className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all"
        >
          إضافة
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded transition-all"
          >
            <div>
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{todo.date}</span>
            </div>
            <div>
              <button
                onClick={() => onToggle(todo.id)}
                className="mr-2 text-green-500 hover:text-green-700"
              >
                {todo.completed ? 'تراجع' : 'إكمال'}
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};