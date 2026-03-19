import type { Metadata } from "next";
import Description from '../components/svadba-page/Descriton/Description';
import Hero from '../components/svadba-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/svadba-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Свадьба в ресторане «Рубин» Томск | Банкетный зал для свадьбы",
  description:
    "Организация свадебного банкета в Томске в ресторане «Рубин». Уютные залы, изысканное меню, живописное место и проведение свадьбы под ключ по выгодной цене.",
  keywords:
    "свадьба томск, банкетный зал для свадьбы томск, ресторан для свадьбы, заказать свадебный банкет, проведение свадеб томск, ресторан рубин свадьба",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/svadba",
  },
  openGraph: {
    title: "Свадьба в ресторане «Рубин» — Томск",
    description:
      "Идеальная свадьба в живописном уголке Томска. Банкетные залы, выездная регистрация и безупречный сервис в ресторане «Рубин».",
    url: "https://rubinrest.ru/svadba",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/zali/kolonny/zal1.jpg",
        width: 1200,
        height: 630,
        alt: "Ресторан Рубин Томск — уютный банкетный зал",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Свадебный банкет в ресторане «Рубин» Томск",
    description: "Проведите незабываемую свадьбу в ресторане «Рубин». Уют, вкус и атмосфера праздника!",
    images: ["/zali/kolonny/zal1.jpg"],
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
      <InPrice />
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
