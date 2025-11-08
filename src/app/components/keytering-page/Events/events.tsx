"use client"
import styles from "./events.module.scss"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type EventType = "Фуршет" | "Банкет" | "Кофе-брейк"

interface Step {
  id: number
  title: string
  text: string
  image: string
}

const EVENT_TYPES: EventType[] = ["Фуршет", "Банкет", "Кофе-брейк"]

const STEPS_BY_TYPE: Record<EventType, Step[]> = {
  Фуршет: [
    {
      id: 1,
      title: "Составим уникальное меню",
      text: "Обычно подготовка занимает 1–2 дня.",
      image: "/portfolio/port3.webp",
    },
    {
      id: 2,
      title: "Привезём всю еду",
      text: "К оговоренному времени.",
      image: "/includes/include3.webp",
    },
    {
      id: 3,
      title: "Накроем на стол",
      text: "Аренда посуды и столовых приборов включена в стоимость.",
      image: "/includes/include1.webp",
    },
  ],
  Банкет: [
    {
      id: 1,
      title: "Подбор банкетного меню",
      text: "Учитываем все пожелания по блюдам и подаче.",
      image: "/images/banquet-1.jpg",
    },
    {
      id: 2,
      title: "Сервировка и декор",
      text: "Оформляем зал и столы в едином стиле.",
      image: "/images/banquet-2.jpg",
    },
    {
      id: 3,
      title: "Сопровождение мероприятия",
      text: "Координатор следит за таймингом и сервисом.",
      image: "/images/banquet-3.jpg",
    },
  ],
  "Кофе-брейк": [
    {
      id: 1,
      title: "Подбор ассортимента",
      text: "Кофе, чай, напитки и лёгкие закуски.",
      image: "/images/coffee-1.jpg",
    },
    {
      id: 2,
      title: "Доставка и монтаж зоны",
      text: "Привезём оборудование и всё быстро соберём.",
      image: "/images/coffee-2.jpg",
    },
    {
      id: 3,
      title: "Обслуживание гостей",
      text: "Следим за наполнением столов в течение мероприятия.",
      image: "/images/coffee-3.jpg",
    },
  ],
}

interface StepCardProps {
  step: Step
}

const StepCard: React.FC<StepCardProps> = ({ step }) => (
  <motion.article
    className={styles.step}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.stepImageWrapper}>
      <img src={step.image} alt={step.title} className={styles.stepImage} />
    </div>
    <h3 className={styles.stepTitle}>{step.title}</h3>
    <p className={styles.stepDescription}>{step.text}</p>
  </motion.article>
)

export default function KeytEvents() {
  const [activeType, setActiveType] = useState<EventType>("Банкет")
  const steps = STEPS_BY_TYPE[activeType]

  return (
    <section className="container">
      <h2 className={styles.title}>Как пройдет ваше мероприятие</h2>

      <div className={styles.eventFlow}>
        {/* Меню выбора мероприятия */}
        <div className={styles.menu}>
          <div className={styles.menuInner}>
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.menuItem} ${
                  type === activeType ? styles.menuItemActive : ""
                }`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Таймлайн */}
        <div className={styles.timeline}>
          <AnimatePresence mode="wait">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={step.id}
                  className={styles.row}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {isLeft ? (
                    <>
                      <div className={styles.col}>
                        <StepCard step={step} />
                      </div>
                      <div className={styles.center}>
                        <span className={styles.line} />
                        <span className={styles.point} />
                      </div>
                      <div className={styles.col} />
                    </>
                  ) : (
                    <>
                      <div className={styles.col} />
                      <div className={styles.center}>
                        <span className={styles.line} />
                        <span className={styles.point} />
                      </div>
                      <div className={styles.col}>
                        <StepCard step={step} />
                      </div>
                    </>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
