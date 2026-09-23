import React from 'react';

function PersonalInfo({ name, position, description, avatarUrl }) {
  return (
    <div className="card profile-card">
      {/* Умовний рендеринг: фото відображається тільки якщо є prop avatarUrl */}
      {avatarUrl && (
        <img src={avatarUrl} alt={name} className="profile-img" />
      )}
      <div>
        <h2>{name}</h2>
        <h3>{position}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PersonalInfo;
