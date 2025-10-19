"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface CardProps {
  title: string;
  desc: string;
  people: string;
  image: string;
  onCardClick: () => void;
}

interface FormErrors {
  phone?: string;
}

interface HallData {
  title: string;
  desc: string;
  people: string;
  images: string[];
}

const hallData: Record<string, HallData> = {
  Колонный: {
    title: "Колонный зал",
    desc: "Просторный зал, в интерьере царит торжественная атмосфера. Идеально подходит для крупных мероприятий и свадеб.",
    people: "до 200 человек",
    images: [
      "/zali/kolonny/zal1.webp",
      "/zali/kolonny/zal2.webp",
      "/zali/kolonny/zal3.webp",
      "/zali/kolonny/zal4.webp",
      "/zali/kolonny/zal5.webp",
      "/zali/kolonny/zal6.webp",
      "/zali/kolonny/zal7.webp",
      "/zali/kolonny/zal8.webp",
    ],
  },
  Основной: {
    title: "Основной зал",
    desc: "Прекрасный вместительный зал, подходит для всех типов торжеств. Уютная атмосфера и современный дизайн.",
    people: "до 80 человек",
    images: [
      "/zali/osnovnoy/zal1.webp",
      "/zali/osnovnoy/zal2.webp",
      "/zali/osnovnoy/zal3.webp",
      "/zali/osnovnoy/zal4.webp",
      "/zali/osnovnoy/zal5.webp",
      "/zali/osnovnoy/zal6.webp",
    ],
  },
  Каминный: {
    title: "Каминный зал",
    desc: "Уютный зал с камином создает особую атмосферу тепла и уюта. Идеален для небольших мероприятий и романтических вечеров.",
    people: "до 60 человек",
    images: ["/zali/zal3.webp"],
  },
};

function Card({ title, desc, people, image, onCardClick }: CardProps) {
  return (
    <div className={styles.card} onClick={onCardClick}>
      <div
        className={styles.card__image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={styles.card__container}>
        <div className={styles.card__top}>
          <p>{title}</p>
          <div>
            <Image
              src={"/zali/people.svg"}
              width={20}
              height={20}
              alt="people"
            />
            <span>{people}</span>
          </div>
        </div>
        <div className={styles.desc}>
          <span>{desc}</span>
        </div>
        <button>
          <span>ПОДРОБНЕЕ</span>
        </button>
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hall: HallData | null;
}

function Modal({ isOpen, onClose, hall }: ModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!isOpen || !hall) return null;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % hall.images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + hall.images.length) % hall.images.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Телефон обязателен для заполнения";
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, "")))
      return "Введите корректный номер телефона";
    return "";
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
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
    setPhone(formattedValue);

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(phone);
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Отправляем данные через наш API route
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hall: hall.title,
          phone: phone,
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
        setPhone("");
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setSubmitStatus("error");
    } finally {
      setPhone("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalContent}>
          {/* Заголовок и описание */}
          <div className={styles.modalHeader}>
            <h2>{hall.title}</h2>
            <p className={styles.hallDescription}>{hall.desc}</p>
          </div>

          {/* Слайдер */}
          <div className={styles.slider}>
            <div className={styles.sliderContainer}>
              <div
                className={styles.slidesWrapper}
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: isTransitioning
                    ? "transform 0.5s ease-in-out"
                    : "none",
                }}
              >
                {hall.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.slide} ${
                      index === currentSlide ? styles.active : ""
                    }`}
                  >
                    <div className={styles.sliderImage}>
                      <Image
                        src={image}
                        alt={`${hall.title} - фото ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {hall.images.length > 1 && (
              <>
                <button
                  className={styles.sliderButton}
                  onClick={prevSlide}
                  disabled={isTransitioning}
                >
                  ‹
                </button>
                <button
                  className={styles.sliderButton}
                  onClick={nextSlide}
                  disabled={isTransitioning}
                >
                  ›
                </button>

                <div className={styles.sliderDots}>
                  {hall.images.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${
                        index === currentSlide ? styles.active : ""
                      }`}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Вместимость и форма */}
          <div className={styles.modalFooter}>
            <div className={styles.hallDetails}>
              <div className={styles.detailItem}>
                <Image
                  src={"/zali/people.svg"}
                  width={20}
                  height={20}
                  alt="people"
                />
                <span>Вместимость: {hall.people}</span>
              </div>
            </div>

            {/* Форма заявки */}
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 900 000-00-00"
                    className={errors.phone ? styles.inputError : ""}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone}</span>
                  )}
                  {submitStatus === "success" && (
                    <span className={styles.successText}>
                      Заявка отправлена!
                    </span>
                  )}
                  {submitStatus === "error" && (
                    <span className={styles.errorText}>
                      Ошибка отправки. Попробуйте снова.
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Оставить заявку"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Zali() {
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (title: string) => {
    setSelectedHall(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  return (
    <section
      className="container"
      style={{ backgroundColor: "#FFFDF7" }}
      id="banquet"
    >
      <h2 className={styles.title}>Банкетные залы</h2>
      <p className={styles.subTitle}>
        У нас есть три варианта залов. Мы предоставляем услуги проведения
        различных мероприятий: свадьбы, корпоративы, выпускные, выездные
        регистрации
      </p>
      <div className={styles.grid}>
        <Card
          image="/zali/zal1.jpg"
          title="Колонный"
          desc="Просторный зал, в интерьере царит торжественная атмосфера"
          people="200"
          onCardClick={() => handleCardClick("Колонный")}
        />
        <Card
          image="/zali/zal2.jpg"
          title="Основной"
          desc="Прекрасный вместительный зал, подходит для всех типов торжеств"
          people="80"
          onCardClick={() => handleCardClick("Основной")}
        />
        <Card
          image="/zali/zal3.jpg"
          title="Каминный"
          desc="Уютный зал с камином"
          people="60"
          onCardClick={() => handleCardClick("Каминный")}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hall={selectedHall ? hallData[selectedHall] : null}
      />
    </section>
  );
}
