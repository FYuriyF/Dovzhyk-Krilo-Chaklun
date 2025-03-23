import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RegistrationStep1.module.css";

const Step1Schema = Yup.object().shape({
  lastName: Yup.string().required("Прізвище обов'язкове"),
  firstName: Yup.string().required("Ім'я обов'язкове"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  phone: Yup.string()
    .matches(
      /^0\d{9}$/,
      "Номер телефону повинен починатися з 0 та містити 10 цифр"
    )
    .required("Номер телефону обов'язковий"),
  role: Yup.string().required("Роль обов'язкова"),
});

const RegistrationStep1 = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        lastName: "",
        firstName: "",
        middleName: "",
        email: "",
        callsign: "",
        phone: "",
        role: "",
      }}
      validationSchema={Step1Schema}
      onSubmit={(values) => {
        console.log("Дані форми:", values);
        onNext();
      }}
    >
      {() => (
        <Form className={styles.form}>
          <h2>Крок 1: Введіть ваші дані</h2>

          {/* Контейнер для ПІБ (Прізвище, Ім'я, По батькові) */}
          <div className={styles.nameContainer}>
            <div className={styles.nameField}>
              <label className={styles.label}>Прізвище:</label>
              <Field
                type="text"
                name="lastName"
                className={styles.inputField}
              />
              <ErrorMessage
                name="lastName"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.nameField}>
              <label className={styles.label}>Ім'я:</label>
              <Field
                type="text"
                name="firstName"
                className={styles.inputField}
              />
              <ErrorMessage
                name="firstName"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.nameField}>
              <label className={styles.label}>По батькові:</label>
              <Field
                type="text"
                name="middleName"
                className={styles.inputField}
              />
              <ErrorMessage
                name="middleName"
                component="span"
                className={styles.errorMessage}
              />
            </div>
          </div>

          {/* Контейнер для Email, Позивного та Телефону */}
          <div className={styles.contactContainer}>
            <div className={styles.emailField}>
              <label className={styles.label}>Email:</label>
              <Field type="email" name="email" className={styles.inputField} />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.callsignField}>
              <label className={styles.label}>Позивний:</label>
              <Field
                type="text"
                name="callsign"
                className={styles.inputField}
              />
            </div>
            <div className={styles.phoneField}>
              <label className={styles.label}>Телефон:</label>
              <div className={styles.phoneInputContainer}>
                <span className={styles.phonePrefix}>+38</span>
                <Field
                  type="tel"
                  name="phone"
                  className={styles.phoneInputField}
                  placeholder="0XXXXXXXXX"
                />
              </div>
              <ErrorMessage
                name="phone"
                component="span"
                className={styles.errorMessage}
              />
            </div>
          </div>

          {/* Контейнер для Ролі */}
          <div className={styles.roleContainer}>
            <label className={styles.label}>Роль:</label>
            <Field as="select" name="role" className={styles.selectField}>
              <option value="">Оберіть роль</option>
              <option value="Старший групи">Старший групи</option>
              <option value="Курсант">Курсант</option>
              <option value="Інструктор">Інструктор</option>
            </Field>
            <ErrorMessage
              name="role"
              component="span"
              className={styles.errorMessage}
            />
          </div>

          <button type="submit" className={styles.nextButton}>
            Далі
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationStep1;
