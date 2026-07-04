"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import styles from "./CookieBanner.module.css";

const COOKIE_BANNER_KEY = "cookie-banner-accepted-until";
const TEN_MINUTES_MS = 10 * 60 * 1000;

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const acceptedUntilRaw = window.localStorage.getItem(COOKIE_BANNER_KEY);
    const acceptedUntil = acceptedUntilRaw ? Number(acceptedUntilRaw) : 0;
    const shouldHide = Number.isFinite(acceptedUntil) && acceptedUntil > Date.now();

    setIsVisible(!shouldHide);
    setIsReady(true);
  }, []);

  const handleAccept = () => {
    const acceptedUntil = Date.now() + TEN_MINUTES_MS;
    window.localStorage.setItem(COOKIE_BANNER_KEY, String(acceptedUntil));
    setIsVisible(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.aside
          className={styles.root}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className={styles.content}>
            <div className={styles.textWrap}>
              <p className={styles.text}>
                Мы используем cookie-файлы. Это нужно для лучшей работы сайта.
                Продолжая пользоваться сайтом, вы соглашаетесь с этим.
              </p>
            </div>
            <div className={styles.buttonWrap}>
              <button type="button" onClick={handleAccept} className={styles.button}>
                OK
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
