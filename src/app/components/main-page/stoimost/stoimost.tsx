import styles from "./styles.module.scss";
import Image from "next/image";

interface cardProps {
  image: string;
  title: string;
  text: string;
}

function Card({ image, text, title }: cardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <p className={styles.card__title}>{title}</p>
      <span className={styles.card__text}>{text}</span>
    </div>
  );
}

export default function Stoimost() {
  return (
    <section className="container">
      <h2 className={styles.title}>Входит в стоимость</h2>
      <p className={styles.subTitle}>
        В зависимости от мероприятия, следующие услуги будут бесплатными:
      </p>
      <div className={styles.grid}>
        <Card
          image="/stoimost/shampane.svg"
          title="САДЬБА"
          text="Бутылка шампанского, в подарок молодоженам"
        />
        <Card
          image="/stoimost/otel.svg"
          title="СВАДЬБА"
          text="Номер в отеле «Рубин», в подарок молодоженам"
        />
        <Card
          image="/stoimost/micro.svg"
          title="ДЛЯ ВСЕХ"
          text="Подбор услуг ди-джея, ведущего, фотографа и других специалистов"
        />
        <Card
          image="/stoimost/widding.svg"
          title="СВАДЬБА"
          text="Оформление фотозоны, декорирование столов, президиума для молодоженов"
        />
        <Card
          image="/stoimost/officiant.svg"
          title="ДЛЯ ВСЕХ"
          text="Команда профессиональных официантов"
        />
        <Card
          image="/stoimost/tea.svg"
          title="ДЛЯ ВСЕХ"
          text="Предоставление бесплатного чайного стола"
        />
      </div>
    </section>
  );
}
