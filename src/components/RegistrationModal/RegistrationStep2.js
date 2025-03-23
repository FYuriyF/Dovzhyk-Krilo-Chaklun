import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uk } from "date-fns/locale";
import styles from "./RegistrationStep2.module.css";

const Step2Schema = Yup.object().shape({
  startDate: Yup.date().required("Оберіть дату початку занять"),
  endDate: Yup.date().required("Оберіть дату закінчення занять"),
  trainingPurpose: Yup.string().required("Оберіть ціль навчання"),
  militaryUnit: Yup.string().required("Введіть назву військової частини"),
  brigadeNumber: Yup.string().required(
    "Введіть номер бригади чи назву підрозділу"
  ),
  commanderName: Yup.string().required("Введіть ПІБ командира"),
  commanderPhone: Yup.string()
    .matches(
      /^0\d{9}$/,
      "Номер телефону повинен починатися з 0 та містити 10 цифр"
    )
    .required("Введіть номер телефону командира"),
});

const RegistrationStep2 = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        startDate: null,
        endDate: null,
        trainingPurpose: "",
        militaryUnit: "",
        brigadeNumber: "",
        commanderName: "",
        commanderPhone: "",
      }}
      validationSchema={Step2Schema}
      onSubmit={(values) => {
        console.log("Дані форми:", values);
        onNext();
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className={styles.form}>
          <h2>Крок 2: Додаткова інформація</h2>

          <div className={styles.dateRow}>
            <div className={styles.dateContainer}>
              <label className={styles.label}>Дата початку занять:</label>
              <DatePicker
                selected={values.startDate}
                onChange={(date) => setFieldValue("startDate", date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Оберіть дату"
                className={styles.inputField}
                locale={uk}
              />
              <ErrorMessage
                name="startDate"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.dateContainer}>
              <label className={styles.label}>Дата закінчення занять:</label>
              <DatePicker
                selected={values.endDate}
                onChange={(date) => setFieldValue("endDate", date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Оберіть дату"
                className={styles.inputField}
                locale={uk}
              />
              <ErrorMessage
                name="endDate"
                component="span"
                className={styles.errorMessage}
              />
            </div>
          </div>

          <div className={styles.radioGroupContainer}>
            <label className={styles.label}>Ціль навчання:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <Field type="radio" name="trainingPurpose" value="Розвідник" />
                Розвідник
              </label>
              <label className={styles.radioOption}>
                <Field type="radio" name="trainingPurpose" value="Камікадзе" />
                Камікадзе
              </label>
              <label className={styles.radioOption}>
                <Field type="radio" name="trainingPurpose" value="Buster" />
                Buster
              </label>
              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="trainingPurpose"
                  value="Interceptor"
                />
                Interceptor
              </label>
            </div>
            <ErrorMessage
              name="trainingPurpose"
              component="span"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.largeInputContainer}>
              <label className={styles.label}>
                Номер бригади чи назва підрозділу:
              </label>
              <Field
                type="text"
                name="brigadeNumber"
                className={styles.inputField}
              />
              <ErrorMessage
                name="brigadeNumber"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.smallInputContainer}>
              <label className={styles.label}>Військова частина:</label>
              <Field
                type="text"
                name="militaryUnit"
                className={styles.inputField}
              />
              <ErrorMessage
                name="militaryUnit"
                component="span"
                className={styles.errorMessage}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.largeInputContainer}>
              <label className={styles.label}>ПІБ командира:</label>
              <Field
                type="text"
                name="commanderName"
                className={styles.inputField}
              />
              <ErrorMessage
                name="commanderName"
                component="span"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.smallInputContainer}>
              <label className={styles.label}>Телефон командира:</label>
              <div className={styles.phoneInputContainer}>
                <span className={styles.phonePrefix}>+38</span>
                <Field
                  type="tel"
                  name="commanderPhone"
                  className={styles.phoneInputField}
                  placeholder="0XXXXXXXXX"
                />
              </div>
              <ErrorMessage
                name="commanderPhone"
                component="span"
                className={styles.errorMessage}
              />
            </div>
          </div>

          <button type="submit" className={styles.nextButton}>
            Завершити
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationStep2;
