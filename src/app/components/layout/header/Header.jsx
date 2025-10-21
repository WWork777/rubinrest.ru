"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isPrivacyPolicyPage = pathname === "/privacy-policy";

  useEffect(() => {
    const handleScroll = () => {
      // Фон появляется когда страница прокручена больше чем на 50px
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Очистка при размонтировании
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${
        isScrolled && !menuOpen ? styles.scrolled : ""
      } ${isPrivacyPolicyPage ? styles.privacyPolicyHeader : ""}`}
    >
      {/* Остальной код без изменений */}
      <div>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo/logo.svg"
              alt="Логотип"
              width={200}
              height={40}
              priority
            />
          </Link>

          {/* Навигация desktop */}
          <nav className={styles.nav}>
            <a href="#keytering">Кейтеринг</a>
            <a href="#reviews">Отзывы</a>
            <a href="#ivents">События</a>
            <a href="#banquet">Залы</a>
            <a href="#choose">Почему мы</a>
            <a href="#tabs">Меню</a>
            <a href="#contact">Контакты</a>
          </nav>

          {/* Контакты и кнопка */}
          <div className={styles.actions}>
            <div className={styles.contacts}>
              <div className={styles.socials}>
                <Link href="https://wa.me/79138154130" target="_blank">
                  <Image
                    src="/socials/wa.svg"
                    alt="WA"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://t.me/zayavka_rest" target="_blank">
                  <Image
                    src="/socials/tg.svg"
                    alt="TG"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <a href="tel:+7 993 571-41-30" className={styles.phone}>
                +7 993 571-41-30
              </a>
            </div>
          </div>

          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {/* Мобильное меню */}
      <div
        className={`${styles.mobileMenuOverlay} ${
          menuOpen ? styles.mobileMenuOverlayActive : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileMenuActive : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={styles.mobile_logo_container}
          >
            <img src="/logo/logo.svg" alt="" className={styles.mobile_logo} />
          </Link>
          <nav className={styles.nav_mobile}>
            <a href="#keytering" onClick={() => setMenuOpen(false)}>
              Кейтеринг
            </a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              Отзывы
            </a>
            <a href="#ivents" onClick={() => setMenuOpen(false)}>
              События
            </a>
            <a href="#banquet" onClick={() => setMenuOpen(false)}>
              Залы
            </a>
            <a href="#choose" onClick={() => setMenuOpen(false)}>
              Почему мы
            </a>
            <a href="#tabs" onClick={() => setMenuOpen(false)}>
              Меню
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Контакты
            </a>
          </nav>
          <div className={styles.mobileContacts}>
            <Link href="tel:+7 993 571-41-30">
              <span>+7 993 571-41-30</span>
            </Link>

            <div className={styles.socials}>
              <Link href="https://t.me/zayavka_rest" target="_blank">
                <Image
                  src="/socials/tg.svg"
                  alt="whatsapp"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://api.whatsapp.com/send/?phone=79138154130&text&type=phone_number&app_absent=0"
                target="_blank"
              >
                <Image
                  src="/socials/wa.svg"
                  alt="telegram"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
