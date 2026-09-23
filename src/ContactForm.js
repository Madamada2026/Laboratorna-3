import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Валідація полів у режимі реального часу
  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'name') {
      if (!value.trim()) {
        errorMsg = "Ім'я є обов'язковим";
      } else if (value.trim().length < 2) {
        errorMsg = "Ім'я повинно містити принаймні 2 символи";
      }
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = "Електронна пошта є обов'язковою";
      } else if (!emailRegex.test(value)) {
        errorMsg = 'Введіть коректну електронну пошту';
      }
    }
    if (name === 'message') {
      if (!value.trim()) {
        errorMsg = "Повідомлення не може бути порожнім";
      } else if (value.trim().length < 10) {
        errorMsg = 'Повідомлення повинно містити мінімум 10 символів';
      }
    }
    return errorMsg;
  };

  // Обробник зміни значень у полях введення
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Валідація в реальному часі
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();

    // Валідація всіх полів перед відправкою
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    if (nameError || emailError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        message: messageError
      });
      return;
    }

    // Виведення даних у консоль браузера
    console.log('Дані форми успішно відправлено:', formData);

    // Встановлення прапорця успіху та очищення форми
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});

    // Приховуємо повідомлення про успіх через 4 секунди
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="card contact-form-card">
      <h2>Зв'язатися зі мною</h2>

      {isSubmitted && (
        <div className="success-message">
          Повідомлення успішно відправлено! (Дані виведено в консоль)
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Ім'я:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            placeholder="Введіть ваше ім'я"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Електронна пошта:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Повідомлення:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'input-error' : ''}
            placeholder="Введіть ваше повідомлення..."
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Надіслати
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
