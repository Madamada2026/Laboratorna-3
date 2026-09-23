import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  // Використовуємо useState для збереження стану теми
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  // Використовуємо useEffect для оновлення класу на body та збереження у localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      Переключити на {theme === 'light' ? 'темну' : 'світлу'} тему
    </button>
  );
}

export default ThemeToggle;
