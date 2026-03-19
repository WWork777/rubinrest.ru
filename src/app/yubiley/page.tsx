import type { Metadata } from "next";
import Description from '../components/yubiley-page/Descriton/Description';
import Hero from '../components/yubiley-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/yubiley-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Юбилей в ресторане «Рубин» Томск | Заказать банкет на юбилей",
  description:
    "Организация и проведение юбилея в Томске в ресторане «Рубин». Уютные залы, праздничное меню и безупречный сервис для вашего торжества.",
  keywords:
    "юбилей томск, заказать юбилей, ресторан для юбилея, банкетный зал на юбилей, отметить юбилей в томске, ресторан рубин юбилей",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/yubiley",
  },
  openGraph: {
    title: "Юбилей в ресторане «Рубин» — Томск",
    description:
      "Отпразднуйте свой юбилей в ресторане «Рубин». Красивые залы, вкусная кухня и теплая атмосфера для вашего праздника в Томске.",
    url: "https://rubinrest.ru/yubiley",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/ivents/ivent4.webp",
        width: 1200,
        height: 630,
        alt: "Юбилей в ресторане Рубин Томск",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Проведение юбилея в ресторане «Рубин» Томск",
    description: "Юбилей в «Рубине» — это праздник, который запомнится навсегда. Изысканное меню и уютная атмосфера.",
    images: ["/ivents/ivent4.webp"],
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
