import styles from "./includes.module.scss"

interface Feature {
  image: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    image: "/includes/include1.webp",
    title: "Качественные продукты",
    description:
      "Продукты специально закупаются для каждого отдельного мероприятия под строгим контролем шеф-повара. По желанию гостей мы можем разработать индивидуальное меню с учётом особенностей предпочтений, типа и ассортимента блюд.",
  },
  {
    image: "/includes/include2.webp",
    title: "Сервис и обслуживание",
    description:
      "Команда профессионалов обеспечивает высокий уровень обслуживания на каждом этапе мероприятия. Все сотрудники проходят подготовку для создания безупречного впечатления у гостей.",
  },
  {
    image: "/includes/include3.webp",
    title: "Логистика",
    description:
      "Продукты специально закупаются для каждого отдельного мероприятия под строгим контролем шеф-повара. Мы подбираем меню и логистику с учётом формата события и пожеланий клиента.",
  },
  {
    image: "/includes/include4.webp",
    title: "Работа шеф-повара и его команды",
    description:
      "Шеф-повар и его команда готовят блюда на месте проведения мероприятия, обеспечивая свежесть, вкус и ресторанное качество.",
  },
];

export default function Includes(){
    return(
        <section className="container">
            <h2 className={styles.title}>Что входит в стоимость</h2>

            <div className={styles.includeGrid}>
                {features.map((item, index) => (
                <div key={index} className={styles.card}>
                    <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className={styles.text}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}