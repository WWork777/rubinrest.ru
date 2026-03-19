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
                                    Приветственный welcome-drink — в подарок
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Первый тост — особенный момент. Мы угощаем выпускников и гостей приветственными напитками, 
                                чтобы ваш праздник начался красиво, ярко и с отличного настроения.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/special/4.webp"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Оформление фотозоны и декорирование столов
                                </h3>
                            </div>
                            <p className={styles.text}>
                                Мы создаём атмосферу, которая будет радовать глаз на протяжении всего вечера 
                                и прекрасно смотреться на фотографиях. Фотозона и столы оформляются в едином стиле, аккуратно и со вкусом.
                            </p>
                        </div>
                        <div className={styles.textCon}>
                            <div className={styles.textTitleCon}>
                                <Image src={"/special/3.svg"} width={50} height={50} alt="" className={styles.textIcon}/>
                                <h3 className={styles.textTitle}>
                                    Специальные условия на номера в отеле «Рубин»
                                </h3>
                            </div>
                            <p className={styles.text}>
                                После насыщенного вечера вам не придётся никуда ехать. Просторные номера в нашем отеле позволят 
                                завершить праздник спокойно и комфортно как выпускникам, так и их родителям.
                            </p>
                        </div>
                    </div>
                    <div className={styles.specialImg}>
                        
                        <div className={styles.rowImage}>
                            <Image src={"/special/2.webp"} width={288} height={233} alt="" className={styles.imgOne}/>
                            <Image src={"/special/3.webp"} width={288} height={233} alt="" className={styles.imgTwo} />
                        </div>
                        <Image src={"/special/1.webp"} width={298} height={481} alt="" className={styles.firstImg}/>
                    </div>
                </div>
            </section>
        </>
    )
}