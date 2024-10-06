import { TabletopLocation } from '../../enterprise/entities/tabletop/tabletop-location'

export interface RawTabletopLocation {
  id: string
  tabletop_id: string
  title: string | null
  avatar_url: string | null
  postal_code: string
  city_id: string | null
  country_id: string | null
  state_id: string | null
  street_name: string
  street_number: string
  neighborhood: string
  latitude: number
  longitude: number
}
export interface TabletopLocationRepositoryFindManyNearbyParams {
  latitude: number
  longitude: number
  filters: {
    distanceRangeInKm: number
    onlyOpenSlots?: boolean
    minAge?: number
    onlyVerifiedTabletop?: boolean
  }
}

export abstract class TabletopLocationRepository {
  abstract findById(id: string): Promise<TabletopLocation | null>
  abstract findByTabletopId(
    tabletopId: string,
  ): Promise<TabletopLocation | null>

  abstract findManyNearby({
    latitude,
    longitude,
    filters,
  }: TabletopLocationRepositoryFindManyNearbyParams): Promise<
    TabletopLocation[]
  >

  abstract create(tabletoplocation: TabletopLocation): Promise<TabletopLocation>
  abstract save(tabletoplocation: TabletopLocation): Promise<TabletopLocation>
}
