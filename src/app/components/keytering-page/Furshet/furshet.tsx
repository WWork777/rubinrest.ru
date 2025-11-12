import styles from "./furshet.module.scss";

export default function Furshet() {
  return (
    <section className="container" id="keytering">
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h2>Фуршетный набор<br />для любого события!</h2>
          <p className={styles.price}>От <strong>5000 р.</strong></p>
          <div className={styles.buttons}>
            <button className={styles.orderButton}>ЗАКАЗАТЬ НАБОР</button>
            <button className={styles.menuButton}>СКАЧАТЬ МЕНЮ</button>
          </div>
        </div>
        <div className={styles.imageBlock}>
          <img src="/furshet/furshet.png" alt="Фуршетный набор" />
        </div>
      </div>
    </section>
  );
}
