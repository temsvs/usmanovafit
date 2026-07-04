"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";

import heroImgTwo from "@/assets/heroImgTwo.png";

import styles from "./ProgramDetailsHero.module.css";

const START_COUNTDOWN_SECONDS = 2 * 24 * 60 * 60 + 8 * 60 * 60 + 13 * 60 + 55;

const textEnterInitial = {
  x: "var(--pd-hero-enter-text-x)",
  y: "var(--pd-hero-enter-text-y)",
  opacity: 0,
};

const imageEnterInitial = {
  x: "var(--pd-hero-enter-image-x)",
  y: "var(--pd-hero-enter-image-y)",
  opacity: 0,
};

const enterAnimate = { x: 0, y: 0, opacity: 1 };

export function ProgramDetailsHero() {
  const [remainingSeconds, setRemainingSeconds] = useState(START_COUNTDOWN_SECONDS);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const formattedTimer = useMemo(() => {
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    return `${days} дня ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingSeconds]);

  return (
    <>
      <section className={styles.section} aria-labelledby="program-details-hero-title">
        <motion.div
          className={styles.backgroundWrap}
          initial={imageEnterInitial}
          animate={enterAnimate}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <Image
            src={heroImgTwo}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className={styles.backgroundImage}
            aria-hidden="true"
          />
          <div className={styles.overlay} aria-hidden="true" />
        </motion.div>

        <div className={`${styles.content} site-container`}>
          <div className={styles.contentColumn}>
            <motion.div
              className={styles.leadWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <p className={styles.lead}>
                ХВАТИТ ИСКАТЬ СПОСОБ. ЕСТЬ ОБНОВЛЁННЫЙ «МЕТОД УСМАНОВОЙ»
              </p>
            </motion.div>

            <motion.div
              className={styles.titleWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            >
              <p id="program-details-hero-title" className={styles.title}>
                <span className={styles.titlePrimary}>ЗА ЛЕТО ВЕРНИТЕ</span>
                <br />
                <span className={styles.titleAccent}>ЛЁГКОСТЬ, ЭНЕРГИЮ</span>
                <br />
                <span className={styles.titleAccent}>И ФОРМУ</span>
              </p>
            </motion.div>

            <motion.div
              className={styles.imageWrapMobile}
              initial={imageEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            >
              <figure className={styles.figureMobile}>
                <Image
                  src={heroImgTwo}
                  alt="Фитнес-тренер Катя Усманова"
                  width={740}
                  height={854}
                  priority
                  quality={95}
                  sizes="370px"
                  className={styles.imageMobile}
                />
              </figure>
            </motion.div>

            <motion.div
              className={styles.subtitleWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
            >
              <p className={styles.subtitle}>
                <strong>Домашние тренировки с Катей и готовое питание по неделям</strong>
                <br className={styles.subtitleBreak} />
                {" "}
                 возвращают лёгкость, подтягивают тело и наконец превращают
                <br className={styles.desktopBreak} />
                спорт в чистое удовольствие.
              </p>
            </motion.div>

            <motion.div
              className={styles.buttonWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
            >
              <Link href="/#programs" className={styles.button}>
                ПОЛУЧИТЬ МЕТОД
              </Link>
            </motion.div>

            <motion.div
              className={styles.captionWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.32, ease: "easeOut" }}
            >
              <p className={styles.caption}>
                Для корректной работы сайта отключите VPN
              </p>
            </motion.div>

            <motion.div
              className={styles.saleWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.4, ease: "easeOut" }}
            >
              <p className={styles.saleText}>
                Успейте забрать тренировки со скидкой до 82%
              </p>
            </motion.div>

            <motion.div
              className={styles.timerWrap}
              initial={textEnterInitial}
              animate={enterAnimate}
              transition={{ duration: 0.65, delay: 0.48, ease: "easeOut" }}
            >
              <p className={styles.timer}>{formattedTimer}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span className={styles.marqueeText}>
            ● По Методу Усмановой уже тренируются более 590 000 женщин
          </span>
          <span className={styles.marqueeText}>
            ● По Методу Усмановой уже тренируются более 590 000 женщин
          </span>
          <span className={styles.marqueeText}>
            ● По Методу Усмановой уже тренируются более 590 000 женщин
          </span>
          <span className={styles.marqueeText}>
            ● По Методу Усмановой уже тренируются более 590 000 женщин
          </span>
        </div>
      </div>
    </>
  );
}
