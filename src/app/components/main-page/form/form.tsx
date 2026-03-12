"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface FormErrors {
  name?: string;
  phone?: string;
  agreement?: string;
}

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
    agreement: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof FormErrors; // 🟢 вот это важно

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) return "Имя обязательно для заполнения";
    if (name.trim().length < 2) return "Имя должно содержать минимум 2 символа";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Телефон обязателен для заполнения";
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, "")))
      return "Введите корректный номер телефона";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      agreement: formData.agreement
        ? ""
        : "Необходимо согласие на обработку персональных данных",
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.agreement;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 1) return value;

    let formatted = "+7 ";
    if (numbers.length > 1) {
      formatted += numbers.substring(1, 4);
    }
    if (numbers.length > 4) {
      formatted += " " + numbers.substring(4, 7);
    }
    if (numbers.length > 7) {
      formatted += " " + numbers.substring(7, 9);
    }
    if (numbers.length > 9) {
      formatted += " " + numbers.substring(9, 11);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Удаляем все нецифровые символы кроме + и пробелов
    value = value.replace(/[^\d+\s]/g, "");

    // Форматируем номер
    const formattedValue = formatPhone(value);
    setFormData((prev) => ({ ...prev, phone: formattedValue }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Отправляем данные через API route
      const response = await fetch("/api/mainform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          date: formData.date,
          comment: formData.message.trim(),
          source: "contact_form", // Добавляем источник заявки
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setSubmitStatus("success");
      console.log("Заявка успешно отправлена в Telegram:", data);

      // Сбрасываем форму через 2 секунды после успешной отправки
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          date: "",
          message: "",
          agreement: false,
        });
        setSubmitStatus(null);
      }, 1000);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setSubmitStatus("error");
    } finally {
      alert("Заявка успешно отправлена");
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.form__container}>
      <div className={styles.image}></div>
      <div className={styles.form}>
        <h2>Свяжитесь с нами</h2>
        <p>Напишите ваш вопрос и мы обязательно на него ответим</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя*"
              className={errors.name ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Ваш телефон*"
              className={errors.phone ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.dateInput}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваш вопрос или сообщение"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.checkbox__container}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                disabled={isSubmitting}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.checkboxText}>
                Даю согласие на обработку{" "}
                <Link
                  href="/privacy-policy"
                  target="_blanc"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  персональных данных
                </Link>
              </span>
            </label>
            {errors.agreement && (
              <span className={styles.errorText}>{errors.agreement}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "ПЕРЕЗВОНИТЕ МНЕ"}
          </button>
        </form>
      </div>
    </section>
  );
}
