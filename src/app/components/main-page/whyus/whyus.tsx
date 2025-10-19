import styles from "./styles.module.scss";
import Image from "next/image";

interface cardProps {
  image: string;
  title: string;
  subTitle: string;
}

function Card({ image, title, subTitle }: cardProps) {
  return (
    <div className={styles.card}>
      <Image src={image} alt={title} width={80} height={80} />
      <p>{title}</p>
      <span>{subTitle}</span>
    </div>
  );
}

export default function Whyus() {
  return (
    <section className={styles.container} id="choose">
      <h2>Почему нас выбирают?</h2>
      <div className={styles.gtid}>
        <Card
          image="/whyus/taste.svg"
          title="Вкусно"
          subTitle="Более 50 различных блюд на выбор"
        />
        <Card
          image="/whyus/parking.svg"
          title="Удобно"
          subTitle="Большая парковка"
        />
        <Card
          image="/whyus/vigodno.svg"
          title="Выгодно"
          subTitle="Средний чек 2900 р."
        />
        <Card
          image="/whyus/pay.svg"
          title="Экономно"
          subTitle="Отсутствует сервисный сбор"
        />
        <Card
          image="/whyus/krasivo.svg"
          title="Красиво"
          subTitle="Расположение в лесопарковой зоне"
        />
      </div>
    </section>
  );
}
