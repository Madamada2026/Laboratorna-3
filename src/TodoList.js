import React, { useState, useEffect } from 'react';

function TodoList() {
  // Зчитування завдань з localStorage при першому рендері
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('app-todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: 1, text: 'Вивчити базові концепції React', completed: true },
      { id: 2, name: 'Створити індивідуальне завдання TodoList', completed: false }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Збереження списку завдань у localStorage при зміні стану todos
  useEffect(() => {
    localStorage.setItem('app-todos', JSON.stringify(todos));
  }, [todos]);

  // Додавання нового завдання
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  // Перемикання статусу виконання
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Видалення завдання
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Фільтрація завдань
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Підрахунок кількості активних завдань
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="card todo-card">
      <h2>Мій список завдань (Todo List)</h2>

      {/* Форма додавання */}
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введіть нове завдання..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          Додати
        </button>
      </form>

      {/* Кнопки фільтрації */}
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => setFilter('all')}
        >
          Усі ({todos.length})
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => setFilter('active')}
        >
          Активні ({activeCount})
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => setFilter('completed')}
        >
          Виконані ({todos.length - activeCount})
        </button>
      </div>

      {/* Список завдань */}
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="no-todos">Завдань не знайдено</li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <span onClick={() => toggleTodo(todo.id)} className="todo-text">
                {todo.completed ? '✓ ' : '○ '}
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
                title="Видалити"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
