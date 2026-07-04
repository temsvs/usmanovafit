import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import { NavigationLoaderGate } from "@/components/NavigationLoader/NavigationLoaderGate";

import "./globals.css";

const gilroy = localFont({
  src: [
    {
      path: "../fonts/Gilroy-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "Usmanova Fit",
  description: "Персональные программы тренировок с Катей Усмановой",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={gilroy.variable}>
        <NavigationLoaderGate />
        {children}
      </body>
    </html>
  );
}
