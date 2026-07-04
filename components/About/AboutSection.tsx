"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import imgEight from "@/assets/about/imgEight.jpg";
import imgFive from "@/assets/about/imgFive.jpg";
import imgFour from "@/assets/about/imgFour.jpg";
import imgNine from "@/assets/about/imgNine.jpg";
import imgOne from "@/assets/about/imgOne.jpg";
import imgSeven from "@/assets/about/imgSeven.jpg";
import imgSix from "@/assets/about/imgSix.jpg";
import imgThree from "@/assets/about/imgThree.jpg";
import imgTwo from "@/assets/about/imgTwo.jpg";
import arrowIcon from "@/assets/icons/arrow.svg";
import dumbbellIcon from "@/assets/icons/dumbbell.svg";

import styles from "./AboutSection.module.css";

const advantages = [
  "Вице-чемпионка мира и чемпионка России по фитнес-бикини",
  "Профессиональный фитнес-тренер с опытом более 15 лет",
  "Мама 2-х детей. Всего за 100 дней после первых родов похудела на 20 кг и вернулась в прежнюю форму",
  "Автор первых в России масштабных марафонов стройности",
  "Чемпионка России и мира по жиму лёжа",
];

const aboutImages = [
  { src: imgOne, alt: "Фото до и после 1" },
  { src: imgTwo, alt: "Фото до и после 2" },
  { src: imgThree, alt: "Фото до и после 3" },
  { src: imgFour, alt: "Фото до и после 4" },
  { src: imgFive, alt: "Фото до и после 5" },
  { src: imgSix, alt: "Фото до и после 6" },
  { src: imgSeven, alt: "Фото до и после 7" },
  { src: imgEight, alt: "Фото до и после 8" },
  { src: imgNine, alt: "Фото до и после 9" },
];

function AdvantageIcon() {
  return (
    <Image
      src={dumbbellIcon}
      alt=""
      width={30}
      height={30}
      aria-hidden="true"
      className={styles.listIcon}
    />
  );
}

function RightArrowIcon() {
  return (
    <Image
      src={arrowIcon}
      alt=""
      width={15}
      height={15}
      aria-hidden="true"
      className={styles.arrowIcon}
    />
  );
}

export function AboutSection() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

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

  return (
    <section aria-labelledby="about-title" className={styles.section}>
      <div className={`${styles.container} site-container`}>
        <div className={styles.titleWrap}>
          <p id="about-title" className={styles.title}>
            Доверьте свое тело чемпионке
            <br />
            фитнес-бикини и тренеру{" "}
            <span className={styles.titleAccent}>Кате Усмановой</span>
          </p>
        </div>

        <div className={styles.subtitleWrap}>
          <p className={styles.subtitle}>
            С 2015 года создаёт топовые тренировки для идеальных ягодиц, плоского
            живота и стройности без жёстких диет.
            <br />
            Уже более 580 000+ участниц тренируются с Катей, ведь она:
          </p>
        </div>

        <div className={styles.advantagesBox}>
          <ul className={styles.advantagesList}>
            {advantages.map((item) => (
              <li key={item} className={styles.advantagesItem}>
                <AdvantageIcon />
                <p className={styles.advantagesText}>{item}</p>
              </li>
            ))}
          </ul>

          <div className={styles.galleryWrap}>
            <div
              ref={galleryRef}
              className={styles.galleryTrack}
              onScroll={updateScrollProgress}
            >
              {aboutImages.map((item) => (
                <div key={item.alt} className={styles.galleryItem}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={styles.galleryImage}
                    sizes="300px"
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
                aria-label="Прокрутка галереи"
                className={styles.customScrollbar}
                disabled={!hasOverflow}
              />
            </div>
          </div>

          <div className={styles.scrollHint}>
            <p className={styles.scrollHintText}>Листайте вправо</p>
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
