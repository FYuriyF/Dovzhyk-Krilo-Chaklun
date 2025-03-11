import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import RegistrationModal from "../RegistrationModal/RegistrationModal"; // Імпорт модального вікна

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Закриття модального вікна при натисканні на Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className={styles.header}>
      <h1>Чаклун</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <a href="#">Головна</a>
          </li>
          <li>
            <a href="#">Про нас</a>
          </li>
          <li>
            <a href="#">Відео</a>
          </li>
          <li>
            <a href="#">Контакти</a>
          </li>
        </ul>
      </nav>
      <button
        className={styles.registerButton}
        onClick={() => setIsModalOpen(true)}
        title="Натисніть для реєстрації"
      >
        Реєстрація
      </button>
      {isModalOpen && (
        <RegistrationModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
