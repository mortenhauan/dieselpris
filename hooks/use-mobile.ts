import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const subscribe = function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
};

const getSnapshot = function getSnapshot() {
  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = function getServerSnapshot() {
  return false;
};

export const useIsMobile = function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
