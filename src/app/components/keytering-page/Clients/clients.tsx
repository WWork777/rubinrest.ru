import styles from "./clients.module.scss"
import Image from "next/image";

interface ClientLogo {
  id: number;
  name: string;
  image: string;
}

const CLIENTS: ClientLogo[] = [
  { id: 1, name: "Клиент 1", image: "/clients/alfaStrah.webp" },
  { id: 2, name: "Клиент 2", image: "/clients/tbank.webp" },
  { id: 3, name: "Клиент 3", image: "/clients/sber.webp" },
  { id: 4, name: "Клиент 4", image: "/clients/yandex.webp" },
  { id: 5, name: "Клиент 5", image: "/clients/kemppi.webp" },
  { id: 6, name: "Клиент 6", image: "/clients/hutton.webp" },
  { id: 7, name: "Клиент 7", image: "/clients/ASB.webp" },
  { id: 8, name: "Клиент 8", image: "/clients/vebrf.webp" },
  { id: 9, name: "Клиент 9", image: "/clients/ranhigs.webp" },
  { id: 10, name: "Клиент 10", image: "/clients/komus.webp" },
  { id: 11, name: "Клиент 11", image: "/clients/akrihin.webp" },
  { id: 12, name: "Клиент 12", image: "/clients/spbmtsb.webp" },
  { id: 13, name: "Клиент 13", image: "/clients/MRgroup.webp" },
  { id: 14, name: "Клиент 14", image: "/clients/carcade.webp" },
  { id: 15, name: "Клиент 15", image: "/clients/bashneft.webp" },
  { id: 16, name: "Клиент 16", image: "/clients/pochtaRF.webp" },
  { id: 17, name: "Клиент 17", image: "/clients/autodor.webp" },
  { id: 18, name: "Клиент 18", image: "/clients/dmitovosh.webp" },
  { id: 19, name: "Клиент 19", image: "/clients/nspk.webp" },
  { id: 20, name: "Клиент 20", image: "/clients/farmster.webp" },
];

export default function Clients(){
    return(
        <section className="container">
            <h2 className={styles.title}>Клиенты, которые нам доверяют</h2>
            <div className={styles.clientsGrid}>
                {CLIENTS.map((client) => (
                <div key={client.id} className={styles.cell}>
                    <Image
                    src={client.image}
                    alt={client.name}
                    width={160}
                    height={80}
                    className={styles.logo}
                    />
                </div>
                ))}
            </div>
        </section>
    );
}