"use client";

import { useEffect } from "react";

import { dispatchProgramLoaderHide } from "@/lib/program-navigation-loader";

export function ProgramDetailsLoaderCleanup() {
  useEffect(() => {
    dispatchProgramLoaderHide();
  }, []);

  return null;
}
