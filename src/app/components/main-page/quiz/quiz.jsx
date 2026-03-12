"use client";
import { useState, useEffect } from "react";
import styles from "./quiz.module.scss";
import Image from "next/image";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    customEventType: "",
    guests: 50,
    budget: "",
    customBudget: "",
    services: [],
    name: "",
    date: "",
    contact: "",
    contactType: "phone",
    privacyPolicy: true,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      title: "Какой формат мероприятия планируете?",
      type: "radio",
      name: "eventType",
      options: [
        { value: "Свадьба", label: "Свадьба" },
        { value: "Юбилей", label: "Юбилей" },
        { value: "Корпоратив", label: "Корпоратив" },
        { value: "День рождения", label: "День рождения" },
        { value: "Другое", label: "Другое" },
      ],
    },
    {
      title: "Сколько человек будет на мероприятии?",
      type: "guests",
      name: "guests",
      min: 1,
      max: 200,
    },
    {
      title: "Какой бюджет на человека планируете?",
      type: "budget",
      name: "budget",
      options: [
        { value: "2300", label: "2300 рублей" },
        { value: "2900", label: "2900 рублей" },
        { value: "3300", label: "3300 рублей" },
        { value: "Другой", label: "Другой" },
      ],
    },
    {
      title: "Выберите дополнительные услуги",
      type: "checkbox",
      name: "services",
      options: [
        { value: "Шоколадный фонтан", label: "Шоколадный фонтан" },
        {
          value: "Пирамида из бокалов шампанского",
          label: "Пирамида из бокалов шампанского",
        },
        {
          value: "Украшение стола + фотозона",
          label: "Украшение стола + фотозона",
        },
        { value: "Ничего", label: "Ничего" },
      ],
    },
  ];

  const calculatePrice = () => {
    const basePrice =
      formData.budget === "Другой"
        ? parseInt(formData.customBudget) || 0
        : parseInt(formData.budget) || 0;
    const guests = formData.guests;
    let total = basePrice * guests;

    // Добавляем стоимость дополнительных услуг
    if (formData.services.includes("Шоколадный фонтан")) total += 5000;
    if (formData.services.includes("Пирамида из бокалов шампанского"))
      total += 3000;
    if (formData.services.includes("Украшение стола + фотозона")) total += 8000;

    return total;
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (type === "checkbox") {
      setFormData((prev) => {
        const services = [...prev.services];
        if (checked) {
          if (value === "Ничего") {
            return { ...prev, services: ["Ничего"] };
          } else {
            return {
              ...prev,
              services: services.filter((s) => s !== "Ничего").concat(value),
            };
          }
        } else {
          return { ...prev, services: services.filter((s) => s !== value) };
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Функции валидации
  const validateName = (name) => {
    if (!name.trim()) return "Имя обязательно для заполнения";
    if (name.trim().length < 2) return "Имя должно содержать минимум 2 символа";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name))
      return "Имя может содержать только буквы, пробелы и дефисы";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Телефон обязателен для заполнения";
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, "")))
      return "Введите корректный номер телефона";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email обязателен для заполнения";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Введите корректный email адрес";
    return "";
  };

  const validateTelegram = (telegram) => {
    if (!telegram.trim()) return "Telegram username обязателен";
    if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(telegram))
      return "Введите корректный Telegram username (от 5 до 32 символов)";
    return "";
  };

  const validateWhatsApp = (whatsapp) => {
    if (!whatsapp.trim()) return "WhatsApp номер обязателен";
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(whatsapp.replace(/\s/g, "")))
      return "Введите корректный номер WhatsApp";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    // Валидация контакта в зависимости от типа
    switch (formData.contactType) {
      case "phone":
        const phoneError = validatePhone(formData.contact);
        if (phoneError) newErrors.contact = phoneError;
        break;
      case "email":
        const emailError = validateEmail(formData.contact);
        if (emailError) newErrors.contact = emailError;
        break;
      case "telegram":
        const telegramError = validateTelegram(formData.contact);
        if (telegramError) newErrors.contact = telegramError;
        break;
      case "whatsapp":
        const whatsappError = validateWhatsApp(formData.contact);
        if (whatsappError) newErrors.contact = whatsappError;
        break;
      default:
        newErrors.contact = "Выберите способ связи";
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy =
        "Необходимо согласие на обработку персональных данных";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция для форматирования телефона
  const formatPhone = (value) => {
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

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    // Форматирование телефона
    if (
      (formData.contactType === "phone" ||
        formData.contactType === "whatsapp") &&
      name === "contact"
    ) {
      const formattedValue = formatPhone(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Очищаем ошибку
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const sendToTelegram = async (data) => {
    const message = `
    Новая заявка на банкет из квиза!

💰 РАСЧЕТ СТОИМОСТИ:
• Формат мероприятия: ${
      data.eventType === "Другое" ? data.customEventType : data.eventType
    }
• Количество гостей: ${data.guests} человек
• Бюджет на человека: ${
      data.budget === "Другой" ? data.customBudget + " ₽" : data.budget + " ₽"
    }
• Дополнительные услуги: ${data.services.join(", ") || "Не выбрано"}
• ИТОГОВАЯ СТОИМОСТЬ: ${calculatePrice().toLocaleString()} ₽
• ПОДАРОК: 3000 ₽
• ЖЕЛАЕМАЯ ДАТА: ${data.date || "Не указана"}

👤 КОНТАКТНЫЕ ДАННЫЕ:
• Имя: ${data.name}
• Способ связи: ${data.contactType}
• Контакт: ${data.contact}

⏰ Время заявки: ${new Date().toLocaleString("ru-RU")}
    `;

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке в Telegram");
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация формы
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправляем данные в Telegram
      await sendToTelegram(formData);

      setIsAnimating(true);
      setTimeout(() => {
        setStep(7);
        setIsAnimating(false);
        setIsSubmitting(false);
      }, 300);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
      );
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    if (step === 0) return null;
    const question = questions[step - 1];

    // Проверка для поля "Другое"
    const isOtherFieldEmpty =
      step === 1 &&
      formData.eventType === "Другое" &&
      !formData.customEventType.trim();

    return (
      <div
        className={`${styles.question} ${
          isAnimating ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{ width: `${(step / (questions.length + 1)) * 100}%` }}
          ></div>
          <span className={styles.progressText}>
            Шаг {step} из {questions.length + 1}
          </span>
        </div>

        <h2 className={styles.questionTitle}>{question.title}</h2>

        {question.type === "radio" && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.option} ${
                  formData[question.name] === option.value ? styles.active : ""
                }`}
              >
                <input
                  type="radio"
                  name={question.name}
                  value={option.value}
                  checked={formData[question.name] === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
            {formData.eventType === "Другое" && (
              <input
                type="text"
                name="customEventType"
                value={formData.customEventType}
                onChange={handleChange}
                placeholder="Укажите ваш формат мероприятия"
                className={styles.textInput}
                required
              />
            )}
          </div>
        )}

        {question.type === "guests" && (
          <div className={styles.rangeContainer}>
            <div className={styles.guestsValue}>
              <span className={styles.selectedValue}>{formData.guests}</span>
              <span>человек</span>
            </div>
            <input
              type="range"
              name={question.name}
              min={question.min}
              max={question.max}
              value={formData[question.name]}
              onChange={handleChange}
              className={styles.rangeInput}
            />
            <div className={styles.rangeValues}>
              <span>{question.min}</span>
              <span>{question.max}</span>
            </div>
          </div>
        )}

        {question.type === "budget" && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.option} ${
                  formData[question.name] === option.value ? styles.active : ""
                }`}
              >
                <input
                  type="radio"
                  name={question.name}
                  value={option.value}
                  checked={formData[question.name] === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
            {formData.budget === "Другой" && (
              <input
                type="number"
                name="customBudget"
                value={formData.customBudget}
                onChange={handleChange}
                placeholder="Укажите ваш бюджет в рублях"
                className={styles.textInput}
                required
              />
            )}
          </div>
        )}

        {question.type === "checkbox" && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.option} ${
                  formData.services.includes(option.value) ? styles.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  name={question.name}
                  value={option.value}
                  checked={formData.services.includes(option.value)}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}

        <div className={styles.navigation}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            disabled={step === 1}
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={
              (step === 1 && !formData.eventType) ||
              (step === 1 &&
                formData.eventType === "Другое" &&
                !formData.customEventType.trim()) ||
              (step === 3 && !formData.budget) ||
              (step === 3 &&
                formData.budget === "Другой" &&
                !formData.customBudget) ||
              (step === 4 && formData.services.length === 0)
            }
          >
            {step === questions.length ? "Рассчитать стоимость" : "Далее"}
          </button>
        </div>
      </div>
    );
  };

  const renderPrice = () => (
    <div
      className={`${styles.priceScreen} ${
        isAnimating ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div className={styles.priceContent}>
        <div className={styles.priceIcon}>💰</div>
        <h2 className={styles.priceTitle}>Стоимость вашего банкета</h2>
        <div className={styles.priceAmount}>
          {calculatePrice().toLocaleString()} ₽
        </div>
        <p className={styles.priceDescription}>
          Рассчитана на основе ваших параметров:
          <br />
          {formData.eventType === "Другое"
            ? formData.customEventType
            : formData.eventType}{" "}
          • {formData.guests} человек •{" "}
          {formData.budget === "Другой"
            ? formData.customBudget
            : formData.budget}{" "}
          ₽/чел
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={handleNext} className={styles.giftButton}>
            Получить подарок 3000 ₽
          </button>

          <button
            onClick={handleBack}
            className={styles.backButton}
            style={{
              marginTop: "15px",
              background: "transparent",
              border: "2px solid #e9ecef",
              color: "#000000ff",
            }}
          >
            Назад к вопросам
          </button>
        </div>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <form
      onSubmit={handleSubmit}
      className={`${styles.contactForm} ${
        isAnimating ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <h2 className={styles.formTitle}>Получите подарок 3000 ₽</h2>
      <p className={styles.formDescription}>
        Оставьте контакты и мы забронируем для вас скидку
      </p>

      <div className={styles.inputGroup}>
        <label>Ваше имя *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleContactChange}
          placeholder="Как к вам обращаться?"
          className={errors.name ? styles.inputError : ""}
          disabled={isSubmitting}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>Желаемая дата</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleContactChange}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.contactType}>
        <label>Куда прислать подарок? *</label>
        <div className={styles.contactOptions}>
          <label
            className={`${styles.contactOption} ${
              formData.contactType === "phone" ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              name="contactType"
              value="phone"
              checked={formData.contactType === "phone"}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Телефон
          </label>
          <label
            className={`${styles.contactOption} ${
              formData.contactType === "email" ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              name="contactType"
              value="email"
              checked={formData.contactType === "email"}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Email
          </label>
          <label
            className={`${styles.contactOption} ${
              formData.contactType === "telegram" ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              name="contactType"
              value="telegram"
              checked={formData.contactType === "telegram"}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Telegram
          </label>
          <label
            className={`${styles.contactOption} ${
              formData.contactType === "whatsapp" ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              name="contactType"
              value="whatsapp"
              checked={formData.contactType === "whatsapp"}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            WhatsApp
          </label>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>
          {formData.contactType === "phone" && "Номер телефона *"}
          {formData.contactType === "email" && "Email адрес *"}
          {formData.contactType === "telegram" && "Telegram username *"}
          {formData.contactType === "whatsapp" && "WhatsApp номер *"}
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleContactChange}
          placeholder={
            formData.contactType === "phone"
              ? "+7 900 000-00-00"
              : formData.contactType === "email"
              ? "your@email.com"
              : formData.contactType === "telegram"
              ? "@username"
              : "+7 900 000-00-00"
          }
          className={errors.contact ? styles.inputError : ""}
          disabled={isSubmitting}
        />
        {errors.contact && (
          <span className={styles.errorText}>{errors.contact}</span>
        )}
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

      <div className={styles.navigation}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
          disabled={isSubmitting}
        >
          Назад
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Получить подарок"}
        </button>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <div className={styles.successScreen}>
      <div className={styles.checkmark}>🎁</div>
      <h2 className={styles.successTitle}>Подарок зарезервирован!</h2>
      <p className={styles.successText}>
        Мы свяжемся с вами в ближайшее время для подтверждения бронирования и
        предоставим подарок в размере 3000 рублей
      </p>
      <div className={styles.successDetails}>
        <p>
          Стоимость вашего банкета:{" "}
          <strong>{calculatePrice().toLocaleString()} ₽</strong>
        </p>
        <p>
          Ваша скидка: <strong className={styles.discount}>3000 ₽</strong>
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.container} id="quiz">
      {step === 0 && (
        <div
          className={`${styles.welcomeScreen} ${
            isAnimating ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <div className={styles.welcomeContent}>
            <Image
              src={"/logo/logo.svg"}
              alt="Ресторан Рубин"
              width={120}
              height={60}
              className={styles.logo}
            />
            <h1 className={styles.welcomeTitle}>
              Рассчитайте стоимость своего банкета
            </h1>
            <p className={styles.welcomeText}>
              Ответьте на 4 вопроса и получите подарок в конце теста
            </p>
            <button onClick={handleNext} className={styles.startButton}>
              Узнать стоимость моего банкета
            </button>
          </div>
        </div>
      )}

      {step > 0 && step <= questions.length && renderQuestion()}
      {step === questions.length + 1 && renderPrice()}
      {step === questions.length + 2 && renderContactForm()}
      {step === 7 && renderSuccess()}
    </div>
  );
}
