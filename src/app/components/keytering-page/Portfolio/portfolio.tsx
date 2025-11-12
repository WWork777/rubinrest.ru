import styles from "./portfolio.module.scss";
import Image from "next/image";

interface CateringItem {
  title: string;
  people: string;
  price: string;
  image: string;
}

const cateringData: CateringItem[] = [
  {
    title: "Банкет на юбилей",
    people: "30 человек",
    price: "87 000 руб.",
    image: "/portfolio/port1.webp",
  },
  {
    title: "Фуршет на день рождения",
    people: "3 человека",
    price: "5 000 руб.",
    image: "/portfolio/port2.webp",
  },
  {
    title: "Банкет на свадьбу",
    people: "70 человек",
    price: "203 000 руб.",
    image: "/portfolio/port3.webp",
  },
  {
    title: "Кофе брейк",
    people: "45 человек",
    price: "40 000 руб.",
    image: "/portfolio/port4.webp",
  },
];

export default function Portfolio() {
    return(
        <section className="container">
            <h2 className={styles.title}>Наше портфолио</h2>

            <div className={styles.portfolioGrid}>
                {cateringData.map((item, index) => (
                <div key={index} className={styles.card}>
                    <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p className={styles.people}>{item.people}</p>
                    <p className={styles.price}>{item.price}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}