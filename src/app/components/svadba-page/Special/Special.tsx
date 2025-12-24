import styles from "./styles.module.scss";
import Image from "next/image";
export default function Special() {
    return (
        <>
            <section className={styles.special}>
                <h2 className={styles.title}>
                    Специальное предложение только для Вас!
                </h2>
                <div className={styles.specialCon}>
                    <div className={styles.specialText}>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/special/1.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Бутылка шампанского — в подарок молодоженам
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Первый тост — особенный момент. Мы дарим бутылку охлаждённого шампанского, 
                                чтобы ваше торжество началось красиво, торжественно и с нужного настроения.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/special/2.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Оформление фотозоны и декорирование столов и президиума
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Мы создаём атмосферу, которая будет радовать глаз на протяжении всего вечера 
                                и прекрасно смотреться на фотографиях. Фотозона, президиум и столы оформляются в едином стиле свадьбы, аккуратно и со вкусом.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/special/3.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Номер в отеле «Рубин», в подарок молодоженам
                                </h3>
                            </div>
                            <p className={styles.text}>
                                После насыщенного дня вам не придётся никуда ехать. Просторный номер в отеле позволит 
                                завершить праздник спокойно и комфортно — только вы вдвоём.
                            </p>
                        </div>
                    </div>
                    <div className={styles.specialImg}>
                        <Image src={"/special/1.webp"} width={298} height={481} alt="" className={styles.firstImg}/>
                        <div className={styles.rowImage}>
                            <Image src={"/special/2.webp"} width={288} height={233} alt="" className={styles.imgOne}/>
                            <Image src={"/special/3.webp"} width={288} height={233} alt="" className={styles.imgTwo} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}