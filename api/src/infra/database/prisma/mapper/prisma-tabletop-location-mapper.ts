import {
  Prisma,
  TabletopLocation as PrismaTabletopLocation,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLocation } from 'src/domain/tabletop/enterprise/entities/tabletop-location'

export class PrismaTabletopLocationMapper {
  static toDomain(raw: PrismaTabletopLocation): TabletopLocation {
    return TabletopLocation.create(
      {
        ...raw,
        tabletopId: new UniqueEntityID(raw.tabletopId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    tabletopLocation: TabletopLocation,
  ): Prisma.TabletopLocationUncheckedCreateInput {
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
