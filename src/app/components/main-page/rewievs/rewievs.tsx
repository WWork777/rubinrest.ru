"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useEffect } from "react";

interface CardProps {
  img: string;
  text: string;
  name: string;
  date: string;
}

function Card({ img, text, name, date }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.avatarWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={img}
            alt={`Фото автора отзыва ${name}`}
            width={65}
            height={65}
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        <p>{text}</p>
        <h3>{name}</h3>
        <time itemProp="datePublished" dateTime={date}>
          {date}
        </time>
        <meta itemProp="itemReviewed" content="Ресторан Рубин Томск" />
        <meta itemProp="reviewRating" content="5" />
      </div>
    </article>
  );
}

export default function Reviews() {
  const reviews = [
    {
      img: "/rewievs/rewie1.png",
      text: "5 августа праздновали свадьбу, все было на высшем уровне!! Руслан - это не лучший админ, это просто рубин Рубина) Спасибо большое за таких сотрудников и прекрасную кухню,администрацию и официантов! Я так рада,что решила оставить празднование свадьбы в этом ресторане! Всего вам самого лучшего,СПАСИБО!",
      name: "Ольга Нагайчук",
      date: "08.08.2023",
    },
    {
      img: "/rewievs/rewie2.png",
      text: "Прекрасное место, вкусная еда! Рекомендую для ежедневных обедов, для организации банкетов и фуршетов. Прекрасное обслуживание, высокий уровень организации мероприятий!",
      name: "Виктор Шишко",
      date: "20.01.2025",
    },
    {
      img: "/rewievs/rewie3.png",
      text: "Отмечали свадьбу в маленьком банкетном зале. Всё понравилось, закусок было много, порции большие, еда очень вкусная. Официант Яна очень внимательная, всегда подскажет. Атмосфера была замечательная. Спасибо вам!",
      name: "Ксения Булыгина",
      date: "27.12.2024",
    },
    {
      img: "/rewievs/rewie4.png",
      text: "Отличный ресторан! Отметили новогодний банкет на высшем уровне! Вкусная кухня, прекрасное обслуживание и очень клиентоориентированный подход к пожеланиям гостей! Огромное спасибо за организацию нашего торжества Ольге и администратору Марине! Дальнейшего Вам процветания и благодарных гостей! Обязательно вернёмся к вам ещё!",
      name: "Елена Женина",
      date: "21.12.2024",
    },
    {
      img: "/rewievs/rewie5.png",
      text: "Отмечали корпоратив в ресторане Рубин . Все понравилось ! Вкусные закуски , очень хорошее горячее, заказывали утиную ножку .Сервировка столов на высоте . Официанты вежливые , обслуживание хорошее . Менеджер Ольга очень приятная девушка, предложила готовое меню ,на нем и остановились и не пожалели . Рекомендую",
      name: "Мария",
      date: "20.12.2024",
    },
    {
      img: "/rewievs/rewie6.png",
      text: "Ходим в Ваш ресторан очень давно. Молодцы! Отличный ремонт произвели. Хочется отметить работу данного ресторана. Повара просто волшебники!!! Очень все вкусно, всего в меру, качественно и красивая подача. Компот, как в детстве🤭 Выпечка наисвежейшая, горячая и очень вкусная.",
      name: "Ульяна Мацияускас",
      date: "18.05.2023",
    },
  ];

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Ресторан «Рубин»",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: reviews.length.toString(),
      },
      review: reviews.map((r) => ({
        "@type": "Review",
        author: r.name,
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: { "@type": "Rating", ratingValue: "5" },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, []);

  return (
    <section className="container" id="reviews">
      <div className={styles.rewievs__container}>
        <div className={styles.rewies__left}>
          <h2>Отзывы о ресторане</h2>
          <div className={styles.rating}>
            <Image
              src={"/socials/2gis.svg"}
              width={70}
              height={70}
              alt="Рейтинг ресторана Рубин на 2ГИС"
            />
            <div className={styles.rating__mark}>
              <span>4.7</span>
              <Image
                src={"/other/star.svg"}
                width={10}
                height={10}
                alt="Звезда рейтинга"
              />
            </div>
          </div>
          <p>
            Отзывы наших довольных клиентов. Закажите мероприятие и оставьте ваш
            отзыв на 2ГИС
          </p>
          <button>
            <Link
              href={
                "https://2gis.ru/tomsk/search/%D1%80%D1%83%D0%B1%D0%B8%D0%BD/firm/70000001033898144/85.053677%2C56.473169?m=85.052352%2C56.472799%2F16"
              }
              target="_blanc"
            >
              <span style={{ color: "black" }}>ВСЕ ОТЗЫВЫ</span>
            </Link>
          </button>
        </div>
        <div className={styles.slider}>
          <Swiper
            modules={[Navigation]}
            loop={true}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            spaceBetween={30}
            slidesPerView={1}
            className={styles.mySwiper}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Card {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Кастомные стрелки */}
          <div className={styles.swiperButtonNext}></div>
          <div className={styles.swiperButtonPrev}></div>
        </div>
      </div>
    </section>
  );
}
