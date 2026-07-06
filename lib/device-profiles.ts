/**
 * Справочник профилей мобильных устройств.
 * Рабочие стили — в styles/device-profiles.css (менять значения нужно там).
 * Этот файл дублирует данные для документации и типизации.
 */

export interface DeviceProgramsProfile {
  cardMinHeight: string;
  imgYAdjust: string;
  imgXAdjust: string;
  imgScaleFactor: number;
}

export interface DeviceProfile {
  id: string;
  label: string;
  viewportWidth: number;
  viewportHeight: number;
  mediaMinWidth: number;
  mediaMaxWidth: number | null;
  programs: DeviceProgramsProfile;
  heroButtonWidth: string;
}

/** iPhone 14/15 Pro Max — эталон, отдельный профиль не нужен */
export const DEVICE_BASELINE = {
  id: "iphone-14-pro-max",
  label: "iPhone 14/15 Pro Max",
  viewportWidth: 430,
  viewportHeight: 932,
} as const;

/** ID профилей для deviceOverrides в imageTuning карточек */
export const DEVICE_IDS = [
  "iphone-xr",
  "pixel-7",
  "iphone-pro",
  "iphone-se",
  "galaxy-s8-plus",
] as const;

export type DeviceId = (typeof DEVICE_IDS)[number];

/** Переопределение позиции/масштаба фото для конкретной модели телефона */
export interface DeviceImageOverride {
  mobileX?: string;
  mobileY?: string;
  mobileScale?: string;
}

export const DEVICE_PROFILES: DeviceProfile[] = [
  {
    id: "iphone-xr",
    label: "iPhone XR / iPhone 11",
    viewportWidth: 414,
    viewportHeight: 896,
    mediaMinWidth: 414,
    mediaMaxWidth: 429,
    programs: {
      cardMinHeight: "168px",
      imgYAdjust: "4px",
      imgXAdjust: "0px",
      imgScaleFactor: 0.98,
    },
    heroButtonWidth: "354px",
  },
  {
    id: "pixel-7",
    label: "Google Pixel 7 / Samsung Galaxy S20 Ultra",
    viewportWidth: 412,
    viewportHeight: 915,
    mediaMinWidth: 411,
    mediaMaxWidth: 413,
    programs: {
      cardMinHeight: "172px",
      imgYAdjust: "6px",
      imgXAdjust: "0px",
      imgScaleFactor: 0.97,
    },
    heroButtonWidth: "352px",
  },
  {
    id: "iphone-pro",
    label: "iPhone 14/15 Pro",
    viewportWidth: 393,
    viewportHeight: 852,
    mediaMinWidth: 390,
    mediaMaxWidth: 410,
    programs: {
      cardMinHeight: "180px",
      imgYAdjust: "8px",
      imgXAdjust: "2px",
      imgScaleFactor: 0.96,
    },
    heroButtonWidth: "330px",
  },
  {
    id: "iphone-se",
    label: "iPhone SE (3rd gen)",
    viewportWidth: 375,
    viewportHeight: 667,
    mediaMinWidth: 361,
    mediaMaxWidth: 389,
    programs: {
      cardMinHeight: "190px",
      imgYAdjust: "10px",
      imgXAdjust: "4px",
      imgScaleFactor: 0.95,
    },
    heroButtonWidth: "315px",
  },
  {
    id: "galaxy-s8-plus",
    label: "Samsung Galaxy S8+",
    viewportWidth: 360,
    viewportHeight: 740,
    mediaMinWidth: 0,
    mediaMaxWidth: 360,
    programs: {
      cardMinHeight: "200px",
      imgYAdjust: "12px",
      imgXAdjust: "6px",
      imgScaleFactor: 0.94,
    },
    heroButtonWidth: "300px",
  },
];
