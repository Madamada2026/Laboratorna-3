import React from 'react';
import './App.css';
import PersonalInfo from './PersonalInfo';
import SkillsList from './SkillsList';
import ThemeToggle from './ThemeToggle';
import ContactForm from './ContactForm';
import TodoList from './TodoList';

function App() {
  const skillsData = [
    { id: 1, name: 'React', level: 85, description: 'Створення компонентів, використання hooks, HMR' },
    { id: 2, name: 'JavaScript (ES6+)', level: 90, description: 'Робота з масивами, асинхронний код, DOM' },
    { id: 3, name: 'HTML5 / CSS3', level: 95, description: 'Адаптивна верстка, Flexbox, Grid, анімації' },
    { id: 4, name: 'Git / GitHub', level: 80, description: 'Контроль версій, робота з гілками та репозиторіями' }
  ];

  return (
    <div className="App">
      <header>
        <h1>Особистий кабінет розробника</h1>
        <ThemeToggle />
      </header>

      <main>
        <PersonalInfo
          name="Олександр Коваленко"
          position="Frontend Developer"
          description="Займаюся розробкою веб-інтерфейсів на React. Захоплююся сучасними технологіями та створенням зручних користувацьких інтерфейсів."
          avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        />

        <SkillsList skills={skillsData} />

        {/* Завдання 7: Індивідуальне завдання TodoList */}
        <TodoList />

        <ContactForm />
      </main>
    </div>
  );
}

export default App;

