import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopLocationRepository,
  TabletopLocationRepositoryFindManyNearbyParams,
} from 'src/domain/tabletop/application/repositories/tabletop-location-repository'
import { PrismaTabletopLocationMapper } from '../mapper/prisma-tabletop-location-mapper'
import { TabletopLocation } from 'src/domain/tabletop/enterprise/entities/tabletop-location'

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

  // @ts-expect-error tipagem
  async findManyNearby({
    latitude,
    longitude,
  }: TabletopLocationRepositoryFindManyNearbyParams) {
    const tabletopLocations = await this.prisma.$queryRaw<TabletopLocation[]>`
        SELECT * from tabletop_location
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) 
        - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 -- 10km
    `
    console.log(tabletopLocations)

    // return tabletopLocations.map(PrismaTabletopLocationMapper.toDomain)
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
