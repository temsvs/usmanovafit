"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import arrowIcon from "@/assets/icons/arrow.svg";
import imgEight from "@/assets/result/imgEight.jpg";
import imgFive from "@/assets/result/imgFive.jpg";
import imgFour from "@/assets/result/imgFour.jpg";
import imgNine from "@/assets/result/imgNine.jpg";
import imgOne from "@/assets/result/imgOne.jpg";
import imgSeven from "@/assets/result/imgSeven.jpg";
import imgSix from "@/assets/result/imgSix.jpg";
import imgTen from "@/assets/result/imgTen.jpg";
import imgThree from "@/assets/result/imgThree.jpg";
import imgTwo from "@/assets/result/imgTwo.jpg";

import styles from "./ResultSection.module.css";

const resultBullets = [
  "Первые видимые результаты уже на 6-й день тренировок",
  "В среднем ученицы теряют 4–6 кг за первый месяц",
];

const resultPhotos = [
  { src: imgOne, alt: "Результат 1" },
  { src: imgTwo, alt: "Результат 2" },
  { src: imgThree, alt: "Результат 3" },
  { src: imgFour, alt: "Результат 4" },
  { src: imgFive, alt: "Результат 5" },
  { src: imgSix, alt: "Результат 6" },
  { src: imgSeven, alt: "Результат 7" },
  { src: imgEight, alt: "Результат 8" },
  { src: imgNine, alt: "Результат 9" },
  { src: imgTen, alt: "Результат 10" },
];

export function ResultSection() {
  const [counter, setCounter] = useState(3698);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const updateScrollProgress = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    if (maxScrollLeft <= 0) {
      setHasOverflow(false);
      if (sliderRef.current) {
        sliderRef.current.value = "0";
      }
      return;
    }

    setHasOverflow(true);
    const nextProgress = (gallery.scrollLeft / maxScrollLeft) * 100;
    if (sliderRef.current) {
      sliderRef.current.value = String(nextProgress);
    }
  }, []);

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  const handleSliderInput = (event: React.FormEvent<HTMLInputElement>) => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const nextProgress = Number(event.currentTarget.value);
    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    gallery.scrollLeft = (nextProgress / 100) * maxScrollLeft;
  };

  const formattedCounter = new Intl.NumberFormat("ru-RU")
    .format(counter)
    .replace(/\u00A0/g, " ");

  return (
    <section aria-labelledby="result-title" className={styles.section}>
      <div className={`${styles.container} site-container`}>
        <h2 id="result-title" className={styles.title}>
          <span className={styles.titleAccent}>580 000 девушек</span>
          <br />
          уже тренируются с Катей
        </h2>

        <div className={styles.card}>
          <div className={styles.bulletList}>
            {resultBullets.map((item) => (
              <div key={item} className={styles.bulletItem}>
                <Image
                  src={arrowIcon}
                  alt=""
                  width={30}
                  height={30}
                  className={styles.bulletIcon}
                  aria-hidden="true"
                />
                <p className={styles.bulletText}>{item}</p>
              </div>
            ))}
          </div>

          <div className={styles.statsBox}>
            <p className={styles.statsLabel}>
              <span className={styles.onlineDot} aria-hidden="true" />
              Тренируются прямо сейчас
            </p>
            <div className={styles.counterWrap}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={counter}
                  className={styles.counter}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {formattedCounter}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div
            ref={galleryRef}
            className={styles.galleryTrack}
            onScroll={updateScrollProgress}
          >
            {resultPhotos.map((photo) => (
              <div key={photo.alt} className={styles.galleryItem}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="180px"
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>

          <div className={styles.customScrollbarWrap}>
            <input
              ref={sliderRef}
              type="range"
              min={0}
              max={100}
              step={0.1}
              defaultValue={0}
              onInput={handleSliderInput}
              aria-label="Прокрутка галереи результатов"
              className={styles.customScrollbar}
              disabled={!hasOverflow}
            />
          </div>

          <div className={styles.scrollHint}>
            <p className={styles.scrollHintText}>Листайте вправо</p>
            <Image
              src={arrowIcon}
              alt=""
              width={15}
              height={15}
              className={styles.hintArrow}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
