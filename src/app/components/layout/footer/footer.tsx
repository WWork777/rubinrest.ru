import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer_item}>
          <Image src={"/logo/logo.svg"} alt="logo" width={200} height={70} />
          <span>Доверь своё мероприятие профессионалам</span>
        </div>
        <div className={styles.footer_item}>
          <p>СОБЫТИЯ</p>
          <span>
            Свадьба, юбилей, выездная регистрация, банкет, фуршет, выпускной
          </span>
        </div>
        <div className={styles.footer_item}>
          <p>КОНТАКТЫ</p>
          <div>
            <Image src="/footer/geo.svg" width={20} height={20} alt="geo" />
            <span>634055, Россия, г. Томск, пр. Академический, д. 16</span>
          </div>
          <div>
            <Image src="/footer/phone.svg" width={20} height={20} alt="phone" />
            <Link href="tel:+7 993 571-41-30">
              <span>+7 993 571-41-30</span>
            </Link>
          </div>
          <div>
            <Image src="/footer/mail.svg" width={20} height={20} alt="mail" />
            <Link href="mailto:rubinrest70@gmail.ru">
              <span>rubinrest70@gmail.ru</span>
            </Link>
          </div>
        </div>
        <div className={styles.footer_item}>
          <p>МЫ В СОЦСЕТЯХ</p>
          <div>
            <Link
              href="https://api.whatsapp.com/send/?phone=79138154130&text&type=phone_number&app_absent=0"
              target="_blanc"
            >
              <Image src="/footer/wa.svg" width={40} height={40} alt="wa" />
            </Link>
            <Link href="https://t.me/zayavka_rest" target="_blanc">
              <Image src="/footer/tg.svg" width={40} height={40} alt="tg" />
            </Link>
          </div>
        </div>
      </div>

      {/* Добавляем блок с копирайтом */}
      <div className={styles.footer__bottom}>
        <span>© 2025 Ресторан «Рубин». Все права защищены.</span>
      </div>
    </section>
  );
}
