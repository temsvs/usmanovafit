"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import React from "react";

import heroImg from "@/assets/heroimg.png";

import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  programsHref?: string;
  heroImage?: StaticImageData;
  heroImageAlt?: string;
}

export function HeroSection({
  programsHref = "#programs",
  heroImage = heroImg,
  heroImageAlt = "Фитнес-тренер Катя Усманова с гантелью",
}: HeroSectionProps) {
  const handleProgramsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!programsHref.startsWith("#")) {
      return;
    }

    const targetId = programsHref.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section aria-labelledby="hero-title" className={styles.section}>
      <div className={`${styles.container} site-container`}>
        <div className={styles.contentColumn}>
          <motion.div
            className={styles.titleWrap}
            initial={{
              x: "var(--hero-enter-text-x)",
              y: "var(--hero-enter-text-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p id="hero-title" className={styles.title}>
              ПРИВЕДИТЕ ТЕЛО В ФОРМУ
              <br className={styles.mobileBreak} /> С ЧЕМПИОНКОЙ КАТЕЙ УСМАНОВОЙ
            </p>
          </motion.div>

          <motion.div
            className={styles.smallSubtitleWrap}
            initial={{
              x: "var(--hero-enter-text-x)",
              y: "var(--hero-enter-text-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          >
            <p className={styles.smallSubtitle}>
              без диет, голода и запретов
              <br />
              с пользой для здоровья
            </p>
          </motion.div>

          <motion.div
            className={styles.imageWrapMobile}
            initial={{
              x: "var(--hero-enter-image-x)",
              y: "var(--hero-enter-image-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          >
            <figure className={styles.figureMobile}>
              <Image
                src={heroImage}
                alt={heroImageAlt}
                width={570}
                height={663}
                className={`${styles.image} ${styles.imageMobile}`}
                priority
              />
            </figure>
          </motion.div>

          <motion.div
            className={styles.subtitleWrap}
            initial={{
              x: "var(--hero-enter-text-x)",
              y: "var(--hero-enter-text-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
          >
            <p className={styles.subtitle}>
              <span className={styles.subtitleMobile}>
                Похудеть, подтянуть попу и живот, набрать форму в зале,
                восстановиться после родов — тренировки и питание под вашу цель.
              </span>
              <span className={styles.subtitleDesktop}>
                <span className={styles.subtitleDesktopLine}>
                  Похудеть, подтянуть попу и живот, набрать форму
                </span>
                <span className={styles.subtitleDesktopLine}>
                  в зале, восстановиться после родов — тренировки
                </span>
                <span className={styles.subtitleDesktopLine}>
                  и питание под вашу цель.
                </span>
              </span>
            </p>
          </motion.div>

          <motion.div
            className={styles.buttonWrap}
            initial={{
              x: "var(--hero-enter-text-x)",
              y: "var(--hero-enter-text-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Link
                href={programsHref}
                className={styles.button}
                onClick={handleProgramsClick}
              >
                ВЫБРАТЬ ПРОГРАММУ
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.captionWrap}
            initial={{
              x: "var(--hero-enter-text-x)",
              y: "var(--hero-enter-text-y)",
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.32, ease: "easeOut" }}
          >
            <p className={styles.caption}>
              Для корректной работы сайта отключите VPN
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageWrapDesktop}
          initial={{
            x: "var(--hero-enter-image-x)",
            y: "var(--hero-enter-image-y)",
            opacity: 0,
          }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <figure className={styles.figureDesktop}>
            <Image
              src={heroImage}
              alt={heroImageAlt}
              width={570}
              height={663}
              className={`${styles.image} ${styles.imageDesktop}`}
              priority
            />
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
