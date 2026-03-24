"use client"

import { useCallback, useSyncExternalStore } from "react"
import { DEFAULT_REGION_ID, type RegionId } from "@/lib/regional-price-model"
import {
  getRegionPreferenceSnapshot,
  subscribeRegionPreference,
  writeStoredRegionId,
} from "@/lib/region-preference"

export function usePersistedRegionId(): readonly [RegionId, (id: RegionId) => void] {
  const regionId = useSyncExternalStore(
    subscribeRegionPreference,
    getRegionPreferenceSnapshot,
    () => DEFAULT_REGION_ID,
  )
  const setRegionId = useCallback((id: RegionId) => {
    writeStoredRegionId(id)
  }, [])
  return [regionId, setRegionId] as const
}
