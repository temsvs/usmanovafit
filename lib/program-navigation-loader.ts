export const PROGRAM_LOADER_DURATION_MS = 3500;
export const PROGRAM_LOADER_COOLDOWN_MS = 10 * 60 * 1000;

const SESSION_START_KEY = "usmanovafit_session_start";
const LOADER_LAST_SHOWN_KEY = "usmanovafit_loader_last_shown";
const LOADER_ACTIVE_KEY = "usmanovafit_loader_active";

export const PROGRAM_LOADER_SHOW_EVENT = "usmanovafit:loader-show";
export const PROGRAM_LOADER_HIDE_EVENT = "usmanovafit:loader-hide";

export function initProgramLoaderSession() {
  if (typeof window === "undefined") {
    return;
  }

  if (!sessionStorage.getItem(SESSION_START_KEY)) {
    sessionStorage.setItem(SESSION_START_KEY, String(Date.now()));
  }
}

export function shouldShowProgramLoader() {
  if (typeof window === "undefined") {
    return true;
  }

  initProgramLoaderSession();

  const lastShown = sessionStorage.getItem(LOADER_LAST_SHOWN_KEY);
  if (!lastShown) {
    return true;
  }

  const now = Date.now();
  return now - Number(lastShown) >= PROGRAM_LOADER_COOLDOWN_MS;
}

export function markProgramLoaderShown() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(LOADER_LAST_SHOWN_KEY, String(Date.now()));
  sessionStorage.setItem(LOADER_ACTIVE_KEY, "1");
}

export function clearProgramLoaderActive() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(LOADER_ACTIVE_KEY);
}

export function isProgramLoaderActive() {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(LOADER_ACTIVE_KEY) === "1";
}

export function dispatchProgramLoaderShow() {
  window.dispatchEvent(new Event(PROGRAM_LOADER_SHOW_EVENT));
}

export function dispatchProgramLoaderHide() {
  window.dispatchEvent(new Event(PROGRAM_LOADER_HIDE_EVENT));
}
