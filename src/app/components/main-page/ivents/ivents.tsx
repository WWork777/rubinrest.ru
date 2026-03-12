"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  image: string;
  onCardClick: () => void;
}

function Card({ title, image, onCardClick }: CardProps) {
  return (
    <article
      className={styles.card}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onCardClick}
      onKeyDown={(e) => e.key === "Enter" && onCardClick()}
      tabIndex={0}
      role="button"
      aria-label={`Подробнее о событии ${title}`}
    >
      <div className={styles.overlay}></div>
      <div className={styles.cardContent}>
        <span>МЕРОПРИЯТИЕ</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  privacyPolicy?: string;
}

function Modal({ isOpen, onClose, eventTitle }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    date: "",
    privacyPolicy: true,
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
    const key = name as keyof FormErrors; // 🟢 приведение типа

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) return "Имя обязательно для заполнения";
    if (name.trim().length < 2) return "Имя должно содержать минимум 2 символа";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name))
      return "Имя может содержать только буквы, пробелы и дефисы";
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
      privacyPolicy: formData.privacyPolicy
        ? ""
        : "Необходимо согласие на обработку персональных данных",
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.privacyPolicy;
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
    const formattedValue = formatPhone(e.target.value);
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
      // Отправляем данные через наш API route
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle,
          name: formData.name.trim(),
          phone: formData.phone,
          comment: formData.comment.trim(),
          date: formData.date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setSubmitStatus("success");
      console.log("Заявка успешно отправлена:", data);

      // Закрываем модальное окно через 2 секунды после успешной отправки
      setTimeout(() => {
        onClose();
        // Сбрасываем форму
        setFormData({
          name: "",
          phone: "",
          comment: "",
          date: "",
          privacyPolicy: true,
        });
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalHeader}>
          <h2>Задать вопрос</h2>
          <p>По мероприятию: {eventTitle}</p>
          <p className={styles.modalSubtitle}>Мы обязательно вам перезвоним</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <label>Имя *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              className={errors.name ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+7 900 000-00-00"
              className={errors.phone ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Желаемая дата</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Комментарий</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Ваш вопрос или пожелания"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.privacyPolicy}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                disabled={isSubmitting}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.checkboxText}>
                Я соглашаюсь на обработку персональных данных согласно{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className={styles.privacyLink}
                >
                  политике конфиденциальности
                </a>
              </span>
            </label>
            {errors.privacyPolicy && (
              <span className={styles.errorText}>{errors.privacyPolicy}</span>
            )}
          </div>

          {/* Статус отправки */}
          {submitStatus === "success" && (
            <div className={styles.successMessage}>
              ✅ Заявка успешно отправлена!
            </div>
          )}
          {submitStatus === "error" && (
            <div className={styles.errorMessage}>
              ❌ Ошибка отправки. Попробуйте снова.
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (title: string) => {
    setSelectedEvent(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className={styles.container} id="ivents">
      <h2>События</h2>
      <p>
        К каждому событию мы относимся как к особенному. <br />
        Вот некоторые из них:
      </p>
      <div className={styles.grid}>
        <Card
          title="СВАДЬБА"
          image="/ivents/ivent1.webp"
          onCardClick={() => handleCardClick("СВАДЬБА")}
        />
        <Card
          title="ВЫПУСКНОЙ"
          image="/ivents/ivent2.webp"
          onCardClick={() => handleCardClick("ВЫПУСКНОЙ")}
        />
        <Card
          title="ФУРШЕТ"
          image="/ivents/ivent3.webp"
          onCardClick={() => handleCardClick("ФУРШЕТ")}
        />
        <Card
          title="ЮБИЛЕЙ"
          image="/ivents/ivent4.webp"
          onCardClick={() => handleCardClick("ЮБИЛЕЙ")}
        />
        <Card
          title="БАНКЕТ"
          image="/ivents/ivent5.webp"
          onCardClick={() => handleCardClick("БАНКЕТ")}
        />
        <Card
          title="ВЫЕЗДНАЯ РЕГИСТРАЦИЯ"
          image="/ivents/ivent6.webp"
          onCardClick={() => handleCardClick("ВЫЕЗДНАЯ РЕГИСТРАЦИЯ")}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventTitle={selectedEvent || ""}
      />
    </section>
  );
}
