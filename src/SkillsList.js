import React from 'react';

function SkillsList({ skills }) {
  return (
    <div className="card">
      <h2>Мої навички</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="card skill-card">
            <h3>{skill.name}</h3>
            <p>Рівень: {skill.level}%</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsList;
