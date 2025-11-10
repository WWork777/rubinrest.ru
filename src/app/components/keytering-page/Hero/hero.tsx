import styles from "./hero.module.scss";
import Image from "next/image";

export default function HeroKeytering() {
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
              src="/hero/pig.svg"
              width={50}
              height={50}
              alt="Иконка без сервисного сбора"
            />
            <span>Без сервисного сбора</span>
          </li>
          <li>
            <Image
              src="/hero/check.svg"
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
              src="/hero/alcohol.svg"
              width={50}
              height={50}
              alt="Иконка алкоголя"
            />
            <span>
              Мероприятия любого <br /> масштаба
            </span>
          </li>
        </ul>

        <form className={styles.bookingForm}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Ваше имя"
              className={styles.formInput}
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              className={styles.formInput}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Оставить заявку
          </button>
        </form>
      </div>
    </section>
  );
}
