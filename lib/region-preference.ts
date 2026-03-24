import {
  DEFAULT_REGION_ID,
  REGION_PRICE_PROFILES,
  type RegionId,
} from "@/lib/regional-price-model"

const STORAGE_KEY = "dieselpris:selected-region"

const validIds = new Set(REGION_PRICE_PROFILES.map((p) => p.id))

const listeners = new Set<() => void>()

function notifyListeners() {
  for (const cb of listeners) cb()
}

export function subscribeRegionPreference(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  listeners.add(onStoreChange)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onStoreChange()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function getRegionPreferenceSnapshot(): RegionId {
  return readStoredRegionId() ?? DEFAULT_REGION_ID
}

export function readStoredRegionId(): RegionId | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw || !validIds.has(raw as RegionId)) return null
    return raw as RegionId
  } catch {
    return null
  }
}

export function writeStoredRegionId(id: RegionId): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, id)
    notifyListeners()
  } catch {
    // quota / private mode
  }
}
