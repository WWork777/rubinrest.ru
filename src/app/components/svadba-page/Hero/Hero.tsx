import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Идеальный банкет на свадьбу в ресторане «Рубин» в живописном месте в Томске!</h1>
        {/* <p className={styles.subtitle}>
          Просторные залы, изысканная кухня и атмосфера праздника. Организуем
          ваш банкет под ключ — без сервисного сбора.
        </p> */}

        {/* <ul
          className={styles.benefits}
          aria-label="Преимущества ресторана Рубин"
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
              alt="Иконка среднего чека"
            />
            <span>Средний чек — 2900 ₽</span>
          </li>
          <li>
            <Image
              src="/hero/alcohol.svg"
              width={50}
              height={50}
              alt="Иконка алкоголя"
            />
            <span>Можно со своим алкоголем</span>
          </li>
        </ul> */}

        <Link href="#contactus" className={styles.ctaButton}>
          <span>Узнать стоимость моего банкета</span>
        </Link>
      </div>
    </section>
  );
}