import type { Metadata } from "next";
import Description from '../components/vypusknoy-page/Descriton/Description';
import Hero from '../components/vypusknoy-page/Hero/Hero';
import InPrice from '../components/svadba-page/IncludedInPrice/IncludedInPrice';
import Meropriyatiya from '../components/svadba-page/meropriyatiya/meropriyatiya';
import Special from '../components/vypusknoy-page/Special/Special';
import Whyus from '../components/svadba-page/whyus/whyus';
import Zali from '../components/svadba-page/Zali/zali';
import ContactUs from '../components/svadba-page/ContactUs/ContactUs';
import Contacts from '../components/main-page/contacts/contacts';
import styles from './page.module.scss';


export const metadata: Metadata = {
  title: "Выпускной в ресторане «Рубин» Томск | Банкетный зал для выпускного",
  description:
    "Организация выпускного вечера в Томске в ресторане «Рубин». Просторные залы, праздничное меню, современное оборудование и проведение выпускного под ключ.",
  keywords:
    "выпускной томск, банкетный зал для выпускного томск, ресторан для выпускного, заказать выпускной вечер, проведение выпускных томск, ресторан рубин выпускной",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru/vypusknoy",
  },
  openGraph: {
    title: "Выпускной в ресторане «Рубин» — Томск",
    description:
      "Незабываемый выпускной в ресторане «Рубин». Банкетные залы, праздничная атмосфера и безупречный сервис в Томске.",
    url: "https://rubinrest.ru/vypusknoy",
    siteName: "Ресторан Рубин Томск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/ivents/ivent2.webp",
        width: 1200,
        height: 630,
        alt: "Выпускной в ресторане Рубин Томск",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Выпускной вечер в ресторане «Рубин» Томск",
    description: "Проведите яркий выпускной в ресторане «Рубин». Вкус, драйв и атмосфера праздника!",
    images: ["/ivents/ivent2.webp"],
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
