import {
  Prisma,
  TabletopLocation as PrismaTabletopLocation,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLocation } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-location'

export class PrismaTabletopLocationMapper {
  static toDomain(
    raw: PrismaTabletopLocation & {
      name?: string | null
      slug?: string | null
      playersLimit?: number | null
      cadence?: string | null
      minAge?: string | null
      hasDungeonMaster?: string | null
      avatarUrl?: string | null
    },
  ): TabletopLocation {
    return TabletopLocation.create(
      {
        ...raw,
        tabletopData: {
          name: raw.name,
          slug: raw.slug,
          playersLimit: raw.playersLimit,
          cadence: raw.cadence,
          minAge: raw.minAge,
          hasDungeonMaster: raw.hasDungeonMaster,
          avatarUrl: raw.avatarUrl,
        },
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
      title: tabletopLocation.title,
      postalCode: tabletopLocation.postalCode,
      cityId: tabletopLocation.cityId,
      stateId: tabletopLocation.stateId,
      countryId: tabletopLocation.countryId,
      streetName: tabletopLocation.streetName,
      streetNumber: tabletopLocation.streetNumber,
      neighborhood: tabletopLocation.neighborhood,
      latitude: tabletopLocation.latitude,
      longitude: tabletopLocation.longitude,
    }
  }
}
