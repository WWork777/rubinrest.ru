"use client";
import { useState } from "react";
import styles from "./hero.module.scss";
import Image from "next/image";

export default function HeroKeytering() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);
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
    value = value.replace(/[^\d+\s]/g, "");
    const formattedValue = formatPhone(value);
    setFormData((prev) => ({ ...prev, phone: formattedValue }));
    if (submitStatus) setSubmitStatus(null);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !validatePhone(formData.phone)) {
      alert("Пожалуйста, заполните имя и корректный номер телефона");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle: "Заявка с главного экрана кейтеринга",
          name: formData.name.trim(),
          phone: formData.phone,
          date: formData.date,
          comment: "Заявка из формы Hero",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setSubmitStatus("success");
      alert("Заявка успешно отправлена!");
      
      // Очистка формы
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          date: "",
        });
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Выездной кейтеринг в Томске</h1>
        <p className={styles.subtitle}>
          Профессиональная организация выездных мероприятий любого масштаба.
          Приготовим и сервируем блюда на вашем мероприятии — от бизнес-ланчей
          до свадебных банкетов.
        </p>

        <ul
          className={styles.benefits}
          aria-label="Преимущества нашего кейтеринга"
        >
          <li>
            <Image
              src="/hero/service-keyt.svg"
              width={50}
              height={50}
              alt="Иконка без сервисного сбора"
            />
            <span>Без сервисного сбора</span>
          </li>
          <li>
            <Image
              src="/hero/check-keyt.svg"
              width={50}
              height={50}
              alt="Иконка стоимости"
            />
            <span>
              Средний чек <br></br> 2900 р.
            </span>
          </li>
          <li>
            <Image
              src="/hero/event-keyt.svg"
              width={50}
              height={50}
              alt="Иконка алкоголя"
            />
            <span>
              Мероприятия любого <br /> масштаба
            </span>
          </li>
        </ul>

        <form className={styles.bookingForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              className={styles.formInput}
              required
              disabled={isSubmitting}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Телефон"
              className={styles.formInput}
              required
              disabled={isSubmitting}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Желаемая дата"
              className={styles.formInput}
              disabled={isSubmitting}
            />
          </div>
          {/* {submitStatus === "success" && (
            <p style={{ color: "#4CAF50", marginBottom: "10px" }}>✅ Заявка успешно отправлена!</p>
          )}
          {submitStatus === "error" && (
            <p style={{ color: "#f44336", marginBottom: "10px" }}>❌ Ошибка отправки. Попробуйте позже.</p>
          )} */}
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Оставить заявку"}
          </button>
        </form>
      </div>
    </section>
  );
}
