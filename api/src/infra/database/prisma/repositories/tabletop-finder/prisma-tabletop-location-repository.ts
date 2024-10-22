import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import {
  RawTabletopLocation,
  TabletopLocationRepository,
  TabletopLocationRepositoryFindManyNearbyParams,
} from 'src/domain/tabletop-finder/application/repositories/tabletop-location-repository'
import { PrismaTabletopLocationMapper } from '../../mapper/tabletop-finder/prisma-tabletop-location-mapper'
import { TabletopLocation } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-location'

@Injectable()
export class PrismaTabletopLocationRepository
  implements TabletopLocationRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string) {
    const tabletopLocation = await this.prisma.tabletopLocation.findFirst({
      where: {
        id,
      },
    })

    if (!tabletopLocation) {
      return null
    }

    return PrismaTabletopLocationMapper.toDomain(tabletopLocation)
  }

  async findByTabletopId(tabletopId: string) {
    const tabletopLocation = await this.prisma.tabletopLocation.findFirst({
      where: {
        tabletopId,
      },
    })

    if (!tabletopLocation) {
      return null
    }

    return PrismaTabletopLocationMapper.toDomain(tabletopLocation)
  }

  async findManyNearby({
    latitude,
    longitude,
    filters,
  }: TabletopLocationRepositoryFindManyNearbyParams) {
    const { distanceRangeInKm, onlyOpenSlots, minAge } = filters

    let whereStatement = ''
    if (minAge) {
      whereStatement += `AND tabletop.min_age >= ${minAge}` // idade mínima passada pela aplicação
    }

    if (onlyOpenSlots) {
      whereStatement += `AND players_limit > (SELECT COUNT(*) FROM tabletop_players WHERE tabletop_id = tabletop_location.id)` // apenas mesas  com vagas abertas
    }

    const rawTabletopLocations = await this.prisma.$queryRawUnsafe<
      RawTabletopLocation[]
    >(
      `
          WITH numbered_rows AS (
            SELECT 
              tabletop_location.*,
              tabletop.name as tabletop_name,
              tabletop.slug as tabletop_slug,
              tabletop.players_limit as tabletop_players_limit,
              tabletop.cadence as tabletop_cadence,
              tabletop.min_age as tabletop_min_age,
              tabletop.has_dungeon_master as tabletop_has_dungeon_master,
              avatar.path as avatar_url,
              ROW_NUMBER() OVER (PARTITION BY "tabletop"."id" ORDER BY "tabletop"."created_at" DESC) as row_num
            FROM tabletop_location
            LEFT JOIN tabletop ON tabletop_location.tabletop_id = tabletop.id
            LEFT JOIN files as avatar ON tabletop.avatar_file_id = avatar.key
            LEFT JOIN tabletop_players ON tabletop_players.tabletop_id = tabletop.id
            WHERE 
              ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) 
              - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${distanceRangeInKm} -- range em KM passado pela aplicação
              ${whereStatement}
          )
          SELECT *
                FROM numbered_rows
                WHERE
                  row_num = 1
      `,
    )

    const tabletopLocations = rawTabletopLocations.map((item) => ({
      id: item.id,
      tabletopId: item.tabletop_id,
      avatarUrl: item.avatar_url,
      title: item.title,
      name: item.name,
      slug: item.slug,
      playersLimit: item.players_limit,
      cadence: item.cadence,
      minAge: item.min_age,
      hasDungeonMaster: item.has_dungeon_master,
      postalCode: item.postal_code,
      cityId: item.city_id,
      countryId: item.country_id,
      stateId: item.state_id,
      streetName: item.street_name,
      streetNumber: item.street_number,
      neighborhood: item.neighborhood,
      latitude: item.latitude,
      longitude: item.longitude,
    }))

    return tabletopLocations.map(PrismaTabletopLocationMapper.toDomain)
  }

  async create(tabletoplocation: TabletopLocation) {
    const data = PrismaTabletopLocationMapper.toPrisma(tabletoplocation)

    const newTabletopLocation = await this.prisma.tabletopLocation.create({
      data,
    })

    return PrismaTabletopLocationMapper.toDomain(newTabletopLocation)
  }

  async save(tabletoplocation: TabletopLocation) {
    const data = PrismaTabletopLocationMapper.toPrisma(tabletoplocation)

    const updatedTabletopLocation = await this.prisma.tabletopLocation.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaTabletopLocationMapper.toDomain(updatedTabletopLocation)
  }
}