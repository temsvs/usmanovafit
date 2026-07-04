"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import styles from "./ScrollToTopButton.module.css";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 280);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={handleClick}
          className={styles.button}
          aria-label="Наверх"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <span className={styles.icon}>↑</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
