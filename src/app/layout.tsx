import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/footer";

const geistSans = Noto_Sans({
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "cyrillic"],
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "Ресторан «Рубин» — Томск | Банкетный зал, свадьбы, корпоративы",
    template: "%s | Ресторан «Рубин» Томск",
  },
  description:
    "Ресторан «Рубин» в Томске — изысканная кухня, уютные залы, банкеты, свадьбы, корпоративы и дни рождения. Закажите праздник под ключ и насладитесь атмосферой уюта и вкуса!",
  keywords:
    "ресторан рубин томск, банкетный зал томск, свадьба ресторан томск, корпоратив томск, заказать банкет, рубин меню, ресторан на свадьбу томск",
  metadataBase: new URL("https://rubinrest.ru"),
  alternates: {
    canonical: "https://rubinrest.ru",
  },
  openGraph: {
    title: "Ресторан «Рубин» — Томск",
    description:
      "Изысканная кухня и уютная атмосфера для вашего праздника. Ресторан «Рубин» в Томске — банкеты, свадьбы и корпоративы под ключ.",
    url: "https://rubinrest.ru",
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
    title: "Ресторан «Рубин» — Томск",
    description: "Ресторан «Рубин» в Томске — вкус, уют и атмосфера праздника!",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Ресторан «Рубин»",
              image: "https://rubin-tomsk.ru/og/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Примерная, 10",
                addressLocality: "Томск",
                postalCode: "634000",
                addressCountry: "RU",
              },
              telephone: "+7 (3822) 123-456",
              servesCuisine: ["Европейская", "Русская"],
              priceRange: "₽₽",
              url: "https://rubin-tomsk.ru",
              sameAs: [
                "https://vk.com/rubin_tomsk",
                "https://instagram.com/rubin_tomsk",
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
