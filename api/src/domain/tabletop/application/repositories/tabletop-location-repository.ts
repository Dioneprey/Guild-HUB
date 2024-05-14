import { TabletopLocation } from '../../enterprise/entities/tabletop-location'

export interface TabletopLocationRepositoryFindManyNearbyParams {
  latitude: number
  longitude: number
}

export abstract class TabletopLocationRepository {
  abstract findById(id: string): Promise<TabletopLocation | null>
  abstract findManyNearby({
    latitude,
    longitude,
  }: TabletopLocationRepositoryFindManyNearbyParams): Promise<
    TabletopLocation[]
  >

  abstract create(tabletoplocation: TabletopLocation): Promise<TabletopLocation>
  abstract save(tabletoplocation: TabletopLocation): Promise<TabletopLocation>
}
