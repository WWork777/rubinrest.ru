import styles from "./styles.module.scss";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";

export default function Contacts() {
  return (
    <section className={styles.contacts__container} id="contact">
      <h2 className={styles.title}>Контакты</h2>

      {/* Блок контактов поверх карты */}
      <div className={styles.contacts}>
        <div className={styles.contacts__item}>
          <p>АДРЕС</p>
          <div>
            <Image src={"/contacts/geo.svg"} alt="geo" width={14} height={14} />
            <span>634055, Россия, г. Томск, пр. Академический, д. 16</span>
          </div>
        </div>
        <div className={styles.contacts__item}>
          <p>ТЕЛЕФОН</p>
          <div>
            <Image
              src={"/contacts/phone.svg"}
              alt="phone"
              width={14}
              height={14}
            />
            <Link href={"tel:+7 952 153-49-90"}>
              <span>+7 952 153-49-90</span>
            </Link>
          </div>
        </div>
        <div className={styles.contacts__item}>
          <p>EMAIL</p>
          <div>
            <Image
              src={"/contacts/mail.svg"}
              alt="email"
              width={14}
              height={14}
            />
            <Link href={"mailto:rubinrest70@gmail.ru"}>
              <span>rubinrest70@gmail.ru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Карта в отдельном контейнере */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A6e98bea4202edcf15acd0054fc302b5953565f352d7df55e737f4ec4630cf887&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </section>
  );
}
