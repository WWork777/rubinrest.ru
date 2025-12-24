import styles from "./styles.module.scss"
export default function Description() {
    return (
        <>
        <section className={styles.description}>
            <h2 className={styles.title}>
                Сделали банкеты для более<br/>чем 200 свадеб
            </h2>
            <p className={styles.firstDesc}>
                Мы приглашаем вас отметить самый важный день в вашей жизни в месте, 
                в нашем уютном ресторане.
            </p>
            <p className={styles.lastDesc}>
                Если вы ищете идеальный баланс между потрясающей природной красотой и разумным 
                бюджетом, вы нашли то, что искали. Мы предлагаем не просто банкет, а изысканное торжество в 
                экологически чистом и живописном уголке Томска, гарантируя при этом лучшую цену на рынке.
            </p>
        </section>
        </>
    )
}