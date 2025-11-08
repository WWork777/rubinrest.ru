import styles from "./work.module.scss"

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: 1, title: "Заявка", description: "Любым удобным способом" },
  { number: 2, title: "Предложение", description: "Любым удобным способом" },
  { number: 3, title: "Договор", description: "Любым удобным способом" },
  { number: 4, title: "Мероприятие", description: "Приезжаем, накрываем стол, обслуживаем" },
];

export default function Work(){
    return(
        <section className="container">
            <h2 className={styles.title}>Как мы работаем</h2>
            <div className={styles.workGrid}>
                {steps.map((step) => (
                <div key={step.number} className={styles.card}>
                    <div className={styles.circle}>{step.number}</div>
                    <div className={styles.text}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}