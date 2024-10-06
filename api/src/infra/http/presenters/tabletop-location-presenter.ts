import { TabletopLocation } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-location'

export class TabletopLocationPresenter {
  static toHTTP(tabletopLocation: TabletopLocation | null) {
    if (tabletopLocation === null) {
      return {}
    }

    return {
      id: tabletopLocation.id.toString(),
      tabletopId: tabletopLocation.tabletopId.toString(),
      title: tabletopLocation.title ?? null,
      avatarUrl: tabletopLocation.avatarUrl ?? null,
      postalCode: tabletopLocation.postalCode ?? null,
      cityId: tabletopLocation.cityId ?? null,
      countryId: tabletopLocation.countryId ?? null,
      streetName: tabletopLocation.streetName ?? null,
      streetNumber: tabletopLocation.streetNumber ?? null,
      neighborhood: tabletopLocation.neighborhood ?? null,
      latitude: tabletopLocation.latitude ?? null,
      longitude: tabletopLocation.longitude ?? null,
    }
  }
}
