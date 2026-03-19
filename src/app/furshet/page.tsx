import type { Metadata } from "next";
import Description from '../components/furshet-page/Descriton/Description';
import Hero from '../components/furshet-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/furshet-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Фуршет в Томске в ресторане «Рубин» | Заказать фуршет на мероприятие",
  description:
    "Организация фуршета в Томске в ресторане «Рубин». Изысканные закуски, профессиональное обслуживание и стильная подача для вашего мероприятия.",
  keywords:
    "фуршет томск, заказать фуршет, организация фуршета, фуршет на мероприятие, ресторан рубин фуршет, кейтеринг фуршет томск",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/furshet",
  },
  openGraph: {
    title: "Фуршет в ресторане «Рубин» — Томск",
    description:
      "Изысканный фуршет в ресторане «Рубин». Разнообразное меню закусок и безупречный сервис для вашего события в Томске.",
    url: "https://rubinrest.ru/furshet",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/ivents/ivent3.webp",
        width: 1200,
        height: 630,
        alt: "Фуршет в ресторане Рубин Томск",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Организация фуршета в ресторане «Рубин» Томск",
    description: "Стильный фуршет в ресторане «Рубин». Вкусные закуски и праздничная подача!",
    images: ["/ivents/ivent3.webp"],
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
