"use client";
import { useState } from "react";
import styles from "./dostavka.module.scss";
import Image from "next/image";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  privacyPolicy?: string;
  comment?: string;
}

function Modal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    privacyPolicy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const key = name as keyof FormErrors;
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
    const newErrors: FormErrors = {
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
    let value = e.target.value;
    value = value.replace(/[^\d+\s]/g, "");
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      console.log("Заявка успешно отправлена в Telegram:", data);

      setTimeout(() => {
        onClose();
        setFormData({
          name: "",
          phone: "",
          comment: "",
          privacyPolicy: false,
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
          <h2>Узнать подробнее</h2>
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
                Я согласен с Политикой обработки персональных данных и даю
                согласие на обработку персональных данных
              </span>
            </label>
            {errors.privacyPolicy && (
              <span className={styles.errorText}>{errors.privacyPolicy}</span>
            )}
          </div>

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

export default function Dostavka() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.dostavkaSection}>
      <div className={styles.quiestion}>
        <div className={styles.quiestion__left}>
          <div className={styles.deliveryInfo}>
            <h3>Доставка готовой еды</h3>
            <div className={styles.deliveryDetails}>
              <p className={styles.deliveryFor}>
                на день рождения и другие мероприятия
              </p>
              <p className={styles.deliveryPrice}>от 3000 ₽</p>
              <p className={styles.deliveryNote}>
                Работаем даже для одного человека
              </p>
            </div>
          </div>
        </div>
        <div className={styles.quiestion__rigth}>
          <div className={styles.quiestion__rigth_left}>
            <div className={styles.manager}>
              <span>Менеджер ответит на ваши вопросы</span>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleOpenModal}>
                <span>УЗНАТЬ ПОДРОБНЕЕ</span>
              </button>
            </div>
          </div>
          <div className={styles.quiestion__rigth_rigth}>
            <div className={styles.contactsHeader}>
              <span>Свяжитесь с нами, любым удобным способом:</span>
            </div>
            <div className={styles.contacts}>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Image
                      src={"/socials/wa.svg"}
                      alt="WhatsApp"
                      height={20}
                      width={20}
                    />
                  </div>
                  <Link
                    href="https://api.whatsapp.com/send/?phone=79138154130&text&type=phone_number&app_absent=0"
                    target="_blank"
                    className={styles.contactLink}
                  >
                    <span>Чат в WhatsApp</span>
                  </Link>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Image
                      src={"/socials/phone.svg"}
                      alt="Телефон"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Link href="tel:+79935714130" className={styles.contactLink}>
                    <span>+7 952 153-49-90</span>
                  </Link>
                </div>
              </div>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Image
                      src={"/socials/tg.svg"}
                      alt="Telegram"
                      height={20}
                      width={20}
                    />
                  </div>
                  <Link
                    href="https://t.me/zayavka_rest"
                    target="_blank"
                    className={styles.contactLink}
                  >
                    <span>Чат в Telegram</span>
                  </Link>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Image
                      src={"/socials/mail.svg"}
                      alt="Email"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Link
                    href="mailto:rubinrest70@gmail.com"
                    target="_blank"
                    className={styles.contactLink}
                  >
                    <span>rubinrest70@gmail.com</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
