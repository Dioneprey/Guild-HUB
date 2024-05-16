import { TabletopLocation } from 'src/domain/tabletop/enterprise/entities/tabletop-location'

export class TabletopLocationPresenter {
  static toHTTP(tabletopLocation: TabletopLocation | null) {
    if (tabletopLocation === null) {
      return {}
    }

    return {
      id: tabletopLocation.id.toString(),
      tabletopId: tabletopLocation.tabletopId.toString(),
      postalCode: tabletopLocation.postalCode,
      cityId: tabletopLocation.cityId,
      countryId: tabletopLocation.countryId,
      streetName: tabletopLocation.streetName,
      streetNumber: tabletopLocation.streetNumber,
      neighborhood: tabletopLocation.neighborhood,
      latitude: tabletopLocation.latitude,
      longitude: tabletopLocation.longitude,
    }
  }
}
