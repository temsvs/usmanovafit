"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

import {
  PROGRAM_LOADER_DURATION_MS,
  dispatchProgramLoaderShow,
  initProgramLoaderSession,
  markProgramLoaderShown,
  shouldShowProgramLoader,
} from "@/lib/program-navigation-loader";
import {
  DEVICE_IDS,
  type DeviceId,
  type DeviceImageOverride,
} from "@/lib/device-profiles";

import imgFive from "@/assets/programs/imgFive.png";
import imgFour from "@/assets/programs/imgFour.png";
import imgOne from "@/assets/programs/imgOne.png";
import imgSix from "@/assets/programs/imgSix.png";
import imgSeven from "@/assets/programs/imgSeven.png";
import imgThree from "@/assets/programs/imgThree.png";
import imgThirteen from "@/assets/programs/imgThirteen.png";
import imgTwelve from "@/assets/programs/imgTwelve.png";
import imgTwo from "@/assets/programs/imgTwo.png";
import imgEight from "@/assets/programs/imgEight.png";
import imgEleven from "@/assets/programs/imgEleven.png";
import imgNine from "@/assets/programs/imgNine.png";
import imgTen from "@/assets/programs/imgTen.png";

import styles from "./ProgramsSection.module.css";

type BadgeVariant = "pill" | "plain" | "none";

interface ProgramCard {
  id: string;
  badge?: string;
  badgeVariant: BadgeVariant;
  title: string;
  titleSecondLine?: string;
  strongText: string;
  description: string;
  descriptionExtra?: string;
  href: string;
  imageAlt: string;
  imageSrc: StaticImageData;
  isBordered?: boolean;
  imageTuning?: {
    mobileMediaWidth?: string;
    desktopMediaWidth?: string;
    mobileWidth?: string;
    desktopWidth?: string;
    mobileImageMaxHeight?: string;
    desktopImageMaxHeight?: string;
    mobileScale?: string;
    desktopScale?: string;
    mobileX?: string;
    mobileY?: string;
    desktopX?: string;
    desktopY?: string;
    fit?: "cover" | "contain";
    deviceOverrides?: Partial<Record<DeviceId, DeviceImageOverride>>;
  };
}

interface ProgramGroup {
  id: string;
  heading: string;
  cards: ProgramCard[];
}

const homePrograms: ProgramCard[] = [
  {
    id: "flagman",
    badge: "ФЛАГМАН",
    badgeVariant: "pill",
    title: "Метод Усмановой",
    strongText: "Освоите технику и втянетесь в регулярные тренировки",
    description:
      "— без травм и через силу. Первая программа, с которой начинают все ученицы Кати.",
    href: "#",
    imageAlt: "Катя Усманова с гантелями",
    imageSrc: imgOne,
    isBordered: true,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      mobileScale: "1.2",
      desktopWidth: "110%",
      desktopMediaWidth: "46%",
      mobileX: "-60px",
      mobileY: "0px",
      desktopX: "10px",
      desktopY: "0px",
      fit: "cover",
    },
  },
  {
    id: "slimness-marathon",
    badge: "Марафон",
    badgeVariant: "plain",
    title: "Стройности",
    strongText: "Первый видимый результат за 21 день",
    description:
      "— уходит первый жир, появляется тонус и легкость. Для тех, кто стартует с нуля.",
    href: "#",
    imageAlt: "Программа Марафон Стройности",
    imageSrc: imgTwo,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      mobileScale: "1.05",
      mobileX: "-10px",
      desktopWidth: "90%",
      desktopMediaWidth: "46%",
      desktopX: "10px",
      desktopY: "0px",
      fit: "cover",
      deviceOverrides: {
        "iphone-pro": { mobileY: "0px" },
      }
    },
  },
  {
    id: "glutes-1",
    badge: "Марафон",
    badgeVariant: "plain",
    title: "Упругая попа 1.0",
    strongText: "Первый объем и подтянутость ягодиц",
    description:
      "— с собственным весом. Для тех, кто впервые целенаправленно работает над попой.",
    href: "#",
    imageAlt: "Программа Упругая попа 1.0",
    imageSrc: imgThree,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      desktopWidth: "90%",
      desktopMediaWidth: "46%",
      desktopX: "10px",
      desktopY: "0px",
      fit: "cover",
    },
  },
  {
    id: "glutes-2",
    badge: "Марафон",
    badgeVariant: "plain",
    title: "Упругая попа 2.0",
    strongText: "Плотные, упругие ягодицы",
    description:
      "— следующий уровень после 1.0. С резинкой и утяжелителями, для подготовленных.",
    href: "#",
    imageAlt: "Программа Упругая попа 2.0",
    imageSrc: imgFour,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      desktopWidth: "90%",
      desktopMediaWidth: "46%",
      desktopX: "10px",
      desktopY: "0px",
      fit: "cover",
    },
  },
  {
    id: "flat-stomach",
    badge: "Марафон",
    badgeVariant: "plain",
    title: "Плоский живот",
    strongText: "Убрать вываливающийся живот,",
    description:
      "который не уходит даже после похудения. Тренировки на глубокие мышцы пресса, которые отвечают за плоский живот — а не за «кубики».",
    href: "#",
    imageAlt: "Программа Плоский живот",
    imageSrc: imgFive,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      mobileScale: "1.3",
      mobileX: "-30px",
      desktopWidth: "100%",
      desktopMediaWidth: "46%",
      desktopX: "10px",
      desktopY: "0px",
      fit: "cover",
    },
  },
  {
    id: "fatburn-course",
    badge: "Курс",
    badgeVariant: "plain",
    title: "Жиросжигающий",
    strongText: "Сжечь жир и проявить рельеф — за 6 недель.",
    description:
      "Для тех, кто уже тренировался: с гантелями, по схеме интервальных нагрузок.",
    href: "#",
    imageAlt: "Курс Жиросжигающий",
    imageSrc: imgSix,
    imageTuning: {
      mobileMediaWidth: "68%",
      mobileWidth: "100%",
      mobileImageMaxHeight: "none",
      mobileScale: "1.15",
      mobileX: "-40px",
      desktopMediaWidth: "46%",
      desktopWidth: "100%",
      desktopImageMaxHeight: "320px",
      desktopScale: "1",
      fit: "cover",
    },
  },
];

const otherGroups: ProgramGroup[] = [
  {
    id: "gym",
    heading: "Тренировки в зале",
    cards: [
      {
        id: "gym-course",
        badge: "Курс",
        badgeVariant: "plain",
        title: "Для зала",
        strongText: "Мышцы снова растут",
        description:
          "— когда дома прогресс уже встал. Готовая программа для зала на мышечный объём.",
        href: "#",
        imageAlt: "Курс для зала",
        imageSrc: imgSeven,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          mobileScale: "1.03",
          mobileX: "-30px",
          desktopWidth: "130%",
          desktopMediaWidth: "46%",
          desktopX: "0px",
          fit: "cover",
        },
      },
    ],
  },
  {
    id: "pregnancy-postpartum",
    heading: "Беременность и после родов",
    cards: [
      {
        id: "pregnant-course",
        badge: "Курс",
        badgeVariant: "plain",
        title: "Для беременных",
        strongText: "Лёгкие роды и тело без перегрузки",
        description:
          "— безопасные тренировки на всех триместрах. Те самые, по которым Катя тренировалась в свои беременности: спина, тазовое дно, подготовка к родам.",
        href: "#",
        imageAlt: "Курс для беременных",
        imageSrc: imgEight,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          mobileScale: "1.2",
          mobileX: "-60px",
          desktopWidth: "130%",
          desktopMediaWidth: "46%",
          desktopX: "0px",
          fit: "cover",
        },
      },
      {
        id: "postpartum-recovery",
        badge: "Курс",
        badgeVariant: "plain",
        title: "Восстановление",
        titleSecondLine: "после родов",
        strongText: "Вернётесь в форму после родов и кесарева",
        description:
          "— сначала диастаз, тазовое дно и осанка, потом стройность и тонус. По системе, по которой Катя возвращалась сама.",
        href: "#",
        imageAlt: "Восстановление после родов",
        imageSrc: imgNine,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          mobileScale: "1.26",
          mobileX: "-22px",
          desktopWidth: "130%",
          desktopMediaWidth: "46%",
          desktopX: "10px",
          fit: "cover",
        },
      },
    ],
  },
  {
    id: "nutrition",
    heading: "Питание",
    cards: [
      {
        id: "ai-nutritionist",
        badge: "БЕСТСЕЛЛЕР",
        badgeVariant: "pill",
        title: "ИИ-нутрицолог",
        strongText: "Едите без срывов и понимаете своё тело",
        description:
          "— питание, тренировки, анализы в кармане. Подскажет, поддержит, не осудит.",
        href: "#",
        imageAlt: "ИИ нутрицолог",
        imageSrc: imgTen,
        isBordered: true,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "80%",
          mobileX: "20px",
          mobileY: "-30px",
          mobileImageMaxHeight: "none",
          desktopWidth: "90%",
          desktopMediaWidth: "46%",
          desktopX: "10px",
          fit: "cover",
          deviceOverrides: {
            "iphone-pro": { mobileY: "-40px" },
          }
        },
      },
      {
        id: "nutrition-course",
        badge: "Курс",
        badgeVariant: "plain",
        title: "По питанию",
        strongText: "Сбросить вес без диет и жёстких ограничений.",
        description: "Избавиться от срывов, заедания и качелей веса.",
        href: "#",
        imageAlt: "Курс по питанию",
        imageSrc: imgEleven,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          mobileX: "0px",
          mobileY: "0px",
          desktopWidth: "110%",
          desktopMediaWidth: "46%",
          desktopX: "0px",
          fit: "cover",
        },
      },
    ],
  },
  {
    id: "self-love",
    heading: "Любовь к себе",
    cards: [
      {
        id: "self-love-1",
        badgeVariant: "none",
        title: "Любовь к себе 1.0",
        strongText: "Перестать ненавидеть своё отражение",
        description: "и начать тренироваться из любви, а не из злости.",
        descriptionExtra:
          "Программа для тех, кто худеет годами и всё равно недоволен собой.",
        href: "#",
        imageAlt: "Любовь к себе 1.0",
        imageSrc: imgTwelve,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          mobileScale: "1.1",
          mobileX: "-30px",
          mobileY: "20px",
          desktopMediaWidth: "46%",
          fit: "cover",
          deviceOverrides: {
            "iphone-pro": { mobileY: "10px" },
            "galaxy-s8-plus": { mobileY: "-10px" },
          }
        },
      },
      {
        id: "self-love-2",
        badgeVariant: "none",
        title: "Любовь к себе 2.0",
        strongText: "Не приносить себя в жертву",
        description:
          "— ни делам, ни близким, ни еде. Вторая ступень после 1.0, для тех, кто живёт «потом».",
        href: "#",
        imageAlt: "Любовь к себе 2.0",
        imageSrc: imgThirteen,
        imageTuning: {
          mobileMediaWidth: "68%",
          mobileWidth: "100%",
          mobileImageMaxHeight: "none",
          desktopWidth: "90%",
          desktopMediaWidth: "46%",
          desktopX: "10px",
          fit: "cover",
        },
      },
    ],
  },
];

export function ProgramsSection() {
  const router = useRouter();
  const defaultProgramDetailsHref = "/program-details";
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    initProgramLoaderSession();

    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleProgramNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (navigationTimeoutRef.current !== null) {
      return;
    }

    if (!shouldShowProgramLoader()) {
      router.push(href);
      return;
    }

    markProgramLoaderShown();
    dispatchProgramLoaderShow();

    navigationTimeoutRef.current = window.setTimeout(() => {
      navigationTimeoutRef.current = null;
      router.push(href);
    }, PROGRAM_LOADER_DURATION_MS);
  };

  const getDeviceOverrideVars = (
    overrides?: Partial<Record<DeviceId, DeviceImageOverride>>,
  ) => {
    const vars: Record<string, string> = {};

    for (const deviceId of DEVICE_IDS) {
      const override = overrides?.[deviceId];
      if (override?.mobileX !== undefined) {
        vars[`--program-img-x-${deviceId}`] = override.mobileX;
      }
      if (override?.mobileY !== undefined) {
        vars[`--program-img-y-${deviceId}`] = override.mobileY;
      }
      if (override?.mobileScale !== undefined) {
        vars[`--program-img-scale-${deviceId}`] = override.mobileScale;
      }
    }

    return vars;
  };

  const getImageStyleVars = (program: ProgramCard) =>
    ({
      "--program-media-width-mobile":
        program.imageTuning?.mobileMediaWidth ?? "42%",
      "--program-media-width-desktop":
        program.imageTuning?.desktopMediaWidth ?? "44%",
      "--program-img-width-mobile": program.imageTuning?.mobileWidth ?? "82%",
      "--program-img-width-desktop": program.imageTuning?.desktopWidth ?? "86%",
      "--program-img-max-h-mobile":
        program.imageTuning?.mobileImageMaxHeight ?? "none",
      "--program-img-max-h-desktop":
        program.imageTuning?.desktopImageMaxHeight ?? "320px",
      "--program-img-scale-mobile": program.imageTuning?.mobileScale ?? "1",
      "--program-img-scale-desktop": program.imageTuning?.desktopScale ?? "1",
      "--program-img-x-mobile": program.imageTuning?.mobileX ?? "0px",
      "--program-img-y-mobile": program.imageTuning?.mobileY ?? "0px",
      "--program-img-x-desktop": program.imageTuning?.desktopX ?? "0px",
      "--program-img-y-desktop": program.imageTuning?.desktopY ?? "0px",
      "--program-img-fit": program.imageTuning?.fit ?? "cover",
      ...getDeviceOverrideVars(program.imageTuning?.deviceOverrides),
    }) as CSSProperties;

  const renderCard = (program: ProgramCard) => {
    const nextHref =
      program.href === "#" ? defaultProgramDetailsHref : program.href;

    return (
    <motion.article
      key={program.id}
      className={`${styles.card} ${
        program.isBordered ? styles.cardPrimary : styles.cardSecondary
      }`}
      style={getImageStyleVars(program)}
      initial={{ x: -36, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.media}>
        <Image
          src={program.imageSrc}
          alt={program.imageAlt}
          className={styles.image}
          sizes="(max-width: 1023px) 100vw, 246px"
        />
      </div>

      <div className={styles.content}>
        {program.badgeVariant !== "none" ? (
          <p
            className={`${styles.badge} ${
              program.badgeVariant === "plain" ? styles.badgePlain : ""
            }`}
          >
            {program.badge}
          </p>
        ) : null}

        <h3 className={styles.cardTitle}>
          {program.title}
          {program.titleSecondLine ? (
            <>
              <br />
              <span className={styles.cardTitleSecondLine}>
                {program.titleSecondLine}
              </span>
            </>
          ) : null}
        </h3>
        <p className={styles.description}>
          <strong>{program.strongText}</strong> {program.description}
        </p>
        {program.descriptionExtra ? (
          <p className={styles.description}>{program.descriptionExtra}</p>
        ) : null}
        <Link
          href={nextHref}
          className={styles.button}
          onClick={(event) => handleProgramNavigation(event, nextHref)}
        >
          Подробнее
        </Link>
      </div>
    </motion.article>
    );
  };

  return (
    <section
      id="programs"
      aria-labelledby="programs-title"
      className={styles.section}
    >
      <div className={`${styles.container} site-container`}>
        <h2 id="programs-title" className={styles.title}>
          Тренировки дома
        </h2>

        <div className={styles.cardsWrap}>
          {homePrograms.map(renderCard)}
        </div>

        {otherGroups.map((group, index) => (
          <div key={group.id} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {group.id === "pregnancy-postpartum" ? (
                <>
                  Беременность
                  <br className={styles.mobileOnlyBreak} /> и после родов
                </>
              ) : (
                group.heading
              )}
            </h3>
            <div
              className={`${styles.cardsWrap} ${
                index === otherGroups.length - 1 ? styles.cardsWrapLast : ""
              }`}
            >
              {group.cards.map(renderCard)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
