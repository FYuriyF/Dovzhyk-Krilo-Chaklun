import React, { useState } from "react";
import styles from "./RegistrationStep1.module.css";

const RegistrationStep1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName) newErrors.lastName = "Прізвище обов'язкове";
    if (!formData.firstName) newErrors.firstName = "Ім'я обов'язкове";
    if (!formData.email) newErrors.email = "Email обов'язковий";
    if (!formData.role) newErrors.role = "Роль обов'язкова";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Форматування ПІБ (перша літера велика)
    const formattedLastName =
      formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1);
    const formattedFirstName =
      formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1);
    const formattedMiddleName =
      formData.middleName.charAt(0).toUpperCase() +
      formData.middleName.slice(1);

    const fullName = `${formattedLastName} ${formattedFirstName} ${formattedMiddleName}`;

    // Відправка даних на сервер
    try {
      const response = await fetch("http://localhost:3001/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email: formData.email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Відповідь від сервера:", result);
        alert("Дані успішно відправлені!");
        onNext(); // Перехід до наступного кроку
      } else {
        console.error("Помилка при відправці даних:", response.statusText);
        alert("Помилка при відправці даних.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Щось пішло не так.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Крок 1: Введіть ваші дані</h2>
      <div className={styles.row}>
        <div>
          <label className={styles.label}>Прізвище:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          {errors.lastName && (
            <span className={styles.errorMessage}>{errors.lastName}</span>
          )}
        </div>
        <div>
          <label className={styles.label}>Ім'я:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          {errors.firstName && (
            <span className={styles.errorMessage}>{errors.firstName}</span>
          )}
        </div>
        <div>
          <label className={styles.label}>По батькові:</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          {errors.middleName && (
            <span className={styles.errorMessage}>{errors.middleName}</span>
          )}
        </div>
      </div>
      <div>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>
      <div>
        <label className={styles.label}>Роль:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={styles.selectField}
          required
        >
          <option value="">Оберіть роль</option>
          <option value="Курсант">Курсант</option>
          <option value="Інструктор">Інструктор</option>
        </select>
        {errors.role && (
          <span className={styles.errorMessage}>{errors.role}</span>
        )}
      </div>
      <button type="submit" className={styles.nextButton}>
        Далі
      </button>
    </form>
  );
};

export default RegistrationStep1;
