import type { Metadata } from "next";
import Description from '../components/banket-page/Descriton/Description';
import Hero from '../components/banket-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/banket-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Банкет в Томске в ресторане «Рубин» | Заказать банкет на мероприятие",
  description:
    "Организация банкетов в Томске в ресторане «Рубин». Просторные залы, изысканное меню и безупречный сервис для вашего торжества.",
  keywords:
    "банкет томск, заказать банкет, организация банкета, банкетный зал томск, ресторан для банкета, ресторан рубин банкет",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/banket",
  },
  openGraph: {
    title: "Банкет в ресторане «Рубин» — Томск",
    description:
      "Профессиональная организация банкетов в ресторане «Рубин». Вкусная кухня и праздничная атмосфера для вашего события в Томске.",
    url: "https://rubinrest.ru/banket",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/ivents/ivent5.webp",
        width: 1200,
        height: 630,
        alt: "Банкет в ресторане Рубин Томск",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Организация банкета в ресторане «Рубин» Томск",
    description: "Проведите незабываемый банкет в ресторане «Рубин». Изысканное меню и отличный сервис!",
    images: ["/ivents/ivent5.webp"],
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
