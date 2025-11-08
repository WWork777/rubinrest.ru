"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

import Questions from "../questions/questions";

export default function Meropriyatiya() {
  

  return (
    <section
      className="container"
      style={{ backgroundColor: "#FFFDF7" }}
      id="tabs"
    >
      <h2 className={styles.title}>Наши мероприятия</h2>
      <p className={styles.subTitle}>
        Ресторан «Рубин», это гарантия того, что вы и ваши гости останутся
        довольны едой и качеством обслуживания!
      </p>
      <div className={styles.subText}>
        <Image
          src={"/meropriyatiya/check.svg"}
          alt="check"
          width={30}
          height={30}
        />
        <span>Средний чек 2900 р.</span>
      </div>
      <div className={styles.grid}>
        <div className={styles.left}></div>
        <div className={styles.rigth}>
          <div className={styles.rigth__top}></div>
          <div className={styles.rigth__bottom}></div>
        </div>
      </div>

      <a
        href="/menu/rubin-menyu-30.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.downloadLink}
      >
        <div className={styles.donwload}>
          <Image
            src={"/meropriyatiya/pdf.svg"}
            alt="pdf"
            width={30}
            height={30}
          />
          <span style={{ color: "black" }}>Скачать меню в PDF</span>
        </div>
      </a>

      <Questions/>
      
    </section>
  );
}
