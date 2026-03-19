import type { Metadata } from "next";
import Description from '../components/registraciya-page/Descriton/Description';
import Hero from '../components/registraciya-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/registraciya-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Выездная регистрация в Томске | Свадебная церемония в ресторане «Рубин»",
  description:
    "Организация выездной регистрации брака в Томске. Красивая церемония на свежем воздухе или в элегантном зале ресторана «Рубин». Незабываемое начало вашей семейной жизни.",
  keywords:
    "выездная регистрация томск, регистрация брака томск, свадебная церемония, заказать выездную регистрацию, ресторан рубин свадьба, место для регистрации брака",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/registraciya",
  },
  openGraph: {
    title: "Выездная регистрация в ресторане «Рубин» — Томск",
    description:
      "Проведите сказочную церемонию регистрации брака в живописном месте. Индивидуальный сценарий и волшебная атмосфера в ресторане «Рубин».",
    url: "https://rubinrest.ru/registraciya",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/ivents/ivent6.webp",
        width: 1200,
        height: 630,
        alt: "Выездная регистрация в ресторане Рубин Томск",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Выездная регистрация брака в ресторане «Рубин» Томск",
    description: "Самый трогательный момент вашей свадьбы в идеальном исполнении. Выездная регистрация в «Рубине».",
    images: ["/ivents/ivent6.webp"],
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function svadba() {
  return (
    <>
      <Hero />
      <Description />
      <Special />
      <Zali />
      <Whyus />
      <Meropriyatiya />
      <ContactUs />
      <div className={styles.contactsWrapper}>
        <Contacts />
      </div>
    </>
  );
}
