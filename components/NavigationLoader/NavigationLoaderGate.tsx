"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  PROGRAM_LOADER_HIDE_EVENT,
  PROGRAM_LOADER_SHOW_EVENT,
  clearProgramLoaderActive,
  initProgramLoaderSession,
  isProgramLoaderActive,
} from "@/lib/program-navigation-loader";

import styles from "./NavigationLoaderGate.module.css";

export function NavigationLoaderGate() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const lockBodyScroll = useCallback(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  const showLoader = useCallback(() => {
    setIsVisible(true);
    lockBodyScroll();
  }, [lockBodyScroll]);

  const hideLoader = useCallback(() => {
    setIsVisible(false);
    unlockBodyScroll();
    clearProgramLoaderActive();
  }, [unlockBodyScroll]);

  useEffect(() => {
    setIsMounted(true);
    initProgramLoaderSession();

    if (isProgramLoaderActive()) {
      showLoader();
    }

    const handleShow = () => {
      showLoader();
    };

    const handleHide = () => {
      hideLoader();
    };

    window.addEventListener(PROGRAM_LOADER_SHOW_EVENT, handleShow);
    window.addEventListener(PROGRAM_LOADER_HIDE_EVENT, handleHide);

    return () => {
      window.removeEventListener(PROGRAM_LOADER_SHOW_EVENT, handleShow);
      window.removeEventListener(PROGRAM_LOADER_HIDE_EVENT, handleHide);
      unlockBodyScroll();
    };
  }, [hideLoader, showLoader, unlockBodyScroll]);

  if (!isMounted || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Загрузка">
      <div className={styles.spinner} aria-hidden="true" />
    </div>,
    document.body,
  );
}
