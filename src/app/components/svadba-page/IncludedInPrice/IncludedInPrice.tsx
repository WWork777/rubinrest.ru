import styles from "./styles.module.scss";
import Image from "next/image";
export default function InPrice() {
    return (
        <>
            <section className={styles.inPrice}>
                <h2 className={styles.title}>
                    Что еще входит в стоимость
                </h2>
                <div className={styles.inPriceCon}>
                    <div className={styles.inPriceImg}>
                        <Image src={"/special/1.webp"} width={298} height={481} alt="" className={styles.firstImg}/>
                        <div className={styles.rowImage}>
                            <Image src={"/special/2.webp"} width={288} height={233} alt="" className={styles.imgOne}/>
                            <Image src={"/special/3.webp"} width={288} height={233} alt="" className={styles.imgTwo} />
                        </div>
                    </div>
                    <div className={styles.inPriceText}>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/includedInPrice/1.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Команда профессиональных официантов
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Во время торжества вас обслуживает опытная команда, которая работает 
                                незаметно, быстро и тактично. Подача блюд, сервировка и внимание к деталям — всё на высоком уровне, чтобы вы могли полностью погрузиться в атмосферу праздника.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/includedInPrice/2.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Бесплатный чайный стол
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Гости смогут отдохнуть и согреться между танцами и фотографиями. 
                                На чайном столе — свежая выпечка, ароматный чай и лёгкие угощения, которые подаются в течение всего вечера.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/includedInPrice/3.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Помощь в подборе ди-джея, ведущего, фотографа и других специалистов
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Мы предложим проверенных партнёров, которые отлично зарекомендовали себя на наших мероприятиях. 
                                Вам не нужно тратить время на поиски — мы соберём для вас команду, способную создать идеальную атмосферу и запечатлеть важные моменты.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}