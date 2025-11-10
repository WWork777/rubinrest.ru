"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  people: string;
  price: string;
  onCardClick: () => void;
  showMore?: boolean;
  isKeyteringPage?: boolean;
}

interface PageProps{
  isKeyt? : boolean;
}


function Card({
  title,
  image,
  people,
  price,
  onCardClick,
  isKeyteringPage = false,
  showMore = false, // Пропс для показа ссылки "Подробнее"
}: CardProps) {
  return (
    <div className={`${styles.card} ${isKeyteringPage ? styles.cardKeytering : ''} ${showMore ? styles.card_withMore : ''}`}>
      <div className={styles.card_content} onClick={!showMore ? onCardClick : undefined}>
        <h3>{title}</h3>
        <span>
          {people} | {price}
        </span>
      </div>
      <div
        className={styles.card_image}
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Показываем кнопку для всех карточек на странице кейтеринга, и для первых двух на главной */}
        {(isKeyteringPage || !showMore) && (
          <button className={styles.orderButton} onClick={onCardClick}>
            <span>{isKeyteringPage ? "Заказать" : "Подробнее"}</span>
          </button>
        )}
      </div>
      
      {/* Ссылка "Подробнее" только для третьей карточки на главной странице */}
      {showMore && (
        <Link href="/keytering" className={styles.card_more}>
          Подробнее
        </Link>
      )}
    </div>
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
    const key = name as keyof FormErrors;

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
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle,
          name: formData.name.trim(),
          phone: formData.phone,
          comment: formData.comment.trim(),
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
          <p>По кейтерингу: {eventTitle}</p>
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

export default function Keytering({ isKeyt }: PageProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cateringOptions = [
    {
      image: "/keytering/1.webp",
      title: "Банкет на юбилей",
      people: "70 человек",
      price: "120 000 руб.",
    },
    {
      image: "/keytering/2.webp",
      title: "Фуршет на день рождения",
      people: "35 человек",
      price: "50 000 руб.",
    },
    {
      image: "/keytering/3.webp",
      title: "Банкет на свадьбу",
      people: "70 человек",
      price: "120 000 руб.",
    },
  ];

  const handleCardClick = (title: string) => {
    setSelectedEvent(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className="container" id="keytering">
      <h2 className={styles.title}>Кейтеринг</h2>
      <p className={styles.subTitle}>
        Превратим любое пространство в изысканный ресторан с нашей атмосферой,
        кухней и сервисом
      </p>
      <div className={styles.grid}>
        {cateringOptions.map((option, index) => (
          <Card
            key={index}
            image={option.image}
            title={option.title}
            people={option.people}
            price={option.price}
            onCardClick={() => handleCardClick(option.title)}
            isKeyteringPage={isKeyt}
            // Показываем "Подробнее" только для третьей карточки И только на главной странице
            showMore={index === 2 && !isKeyt}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventTitle={selectedEvent || ""}
      />
    </section>
  );
}