import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopRepository,
  TabletopRepositoryFindAllByPlayerIdProps,
  TabletopRepositoryFindAllProps,
  TabletopRepositoryFindByUniqueFieldProps,
} from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopMapper } from '../mapper/tabletop/prisma-tabletop-mapper'
import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-player'

@Injectable()
export class PrismaTabletopRepository implements TabletopRepository {
  constructor(private prisma: PrismaService) {}
  async findByUniqueField({
    key,
    value,
    include,
  }: TabletopRepositoryFindByUniqueFieldProps) {
    const tabletop = await this.prisma.tabletop.findFirst({
      where: {
        [key]: value,
      },
      include: {
        ...(include?.tabletopPlayers && {
          tabletopPlayers: include?.tabletopPlayers
            ? {
                include: {
                  player: true,
                },
              }
            : false,
        }),
        tabletopSystem: true,
        tabletopLocation: true,
        tabletopLanguage: {
          select: {
            language: true,
          },
        },
        avatarFile: true,
        coverFile: true,
        onlinePlataform: true,
        timezone: true,
      },
    })

    if (!tabletop) {
      return null
    }

    return PrismaTabletopMapper.toDomain(tabletop)
  }

  async findAll({ pageIndex, filters }: TabletopRepositoryFindAllProps) {
    const [tabletops, totalCount] = await Promise.all([
      this.prisma.tabletop.findMany({
        where: {
          ...(filters?.online && {
            online: filters.online,
          }),
          ...(filters?.countryId && {
            tabletopLocation: {
              some: {
                countryId: filters.countryId,
              },
            },
          }),
          ...(filters?.stateId && {
            tabletopLocation: {
              some: {
                stateId: filters.stateId,
              },
            },
          }),
          ...(filters?.cityId && {
            tabletopLocation: {
              some: {
                cityId: filters.cityId,
              },
            },
          }),
          ...(filters?.playersLimit && {
            playersLimit: filters.playersLimit,
          }),
          ...(filters?.withGameMaster && {
            hasDungeonMaster: true,
          }),
          ...(filters?.minAge && {
            minAge: {
              gte: filters.minAge,
            },
          }),
          ...(filters?.tabletopType && {
            type: filters.tabletopType,
          }),
          ...(filters?.tabletopSystemId && {
            tabletopSystemId: filters.tabletopSystemId,
          }),
          ...(filters?.tabletopLanguageId && {
            tabletopLanguage: {
              some: {
                languageId: {
                  in: filters.tabletopLanguageId,
                },
              },
            },
          }),
          ...(filters?.tabletopCadence && {
            cadence: filters.tabletopCadence,
          }),
          ...(filters?.tabletopExpertise && {
            expertiseLevel: filters.tabletopExpertise,
          }),
          ...(filters?.timezoneId && {
            timezoneId: filters.timezoneId,
          }),
        },
        include: {
          tabletopPlayers: {
            include: {
              player: true,
            },
          },
          tabletopSystem: true,
          tabletopLocation: true,
          tabletopLanguage: {
            select: {
              language: true,
            },
          },
          avatarFile: true,
          coverFile: true,
          onlinePlataform: true,
          timezone: true,
        },
        skip: pageIndex * 10,
        take: 10,
      }),
      this.prisma.tabletop.count({
        where: {
          ...(filters?.online && {
            online: filters.online,
          }),
          ...(filters?.countryId && {
            tabletopLocation: {
              some: {
                countryId: filters.countryId,
              },
            },
          }),
          ...(filters?.stateId && {
            tabletopLocation: {
              some: {
                stateId: filters.stateId,
              },
            },
          }),
          ...(filters?.cityId && {
            tabletopLocation: {
              some: {
                cityId: filters.cityId,
              },
            },
          }),
          ...(filters?.playersLimit && {
            playersLimit: filters.playersLimit,
          }),
          ...(filters?.withGameMaster && {
            hasDungeonMaster: true,
          }),
          ...(filters?.minAge && {
            minAge: {
              gte: filters.minAge,
            },
          }),
          ...(filters?.tabletopType && {
            type: filters.tabletopType,
          }),
          ...(filters?.tabletopSystemId && {
            tabletopSystemId: filters.tabletopSystemId,
          }),
          ...(filters?.tabletopLanguageId && {
            tabletopLanguage: {
              some: {
                languageId: {
                  in: filters.tabletopLanguageId,
                },
              },
            },
          }),
        },
      }),
    ])
    const totalPages = Math.ceil(totalCount / 10)

    return {
      data: tabletops.map(PrismaTabletopMapper.toDomain),
      pageIndex,
      totalCount,
      totalPages,
    }
  }

  async findAllByPlayerId({
    playerId,
    include,
  }: TabletopRepositoryFindAllByPlayerIdProps) {
    const tabletop = await this.prisma.tabletop.findMany({
      where: {
        tabletopPlayers: {
          some: {
            playerId,
          },
        },
      },
      include: {
        ...(include?.tabletopPlayers && {
          tabletopPlayers: include?.tabletopPlayers
            ? {
                include: {
                  player: true,
                },
              }
            : false,
        }),
        tabletopSystem: true,
        tabletopLocation: true,
        avatarFile: true,
        coverFile: true,
        tabletopLanguage: {
          select: {
            language: true,
          },
        },
        onlinePlataform: true,
        timezone: true,
      },
    })

    return tabletop.map(PrismaTabletopMapper.toDomain)
  }

  async create(tabletop: Tabletop) {
    const data = PrismaTabletopMapper.toPrisma(tabletop)

    await this.prisma.tabletop.create({
      data,
    })
  }

  async createTabletopLanguage({
    tabletopId,
    language,
  }: {
    tabletopId: string
    language: number[]
  }) {
    await this.prisma.tabletopLanguage.deleteMany({
      where: {
        tabletopId,
      },
    })

    await this.prisma.tabletopLanguage.createMany({
      data: language.map((item) => {
        return {
          tabletopId,
          languageId: item,
        }
      }),
    })
  }

  async createTabletopPlayers(tabletopPlayers: TabletopPlayer[]) {
    await this.prisma.tabletopPlayers.createMany({
      data: tabletopPlayers.map((item) => {
        return {
          tabletopId: item.tabletopId.toString(),
          playerId: item.playerId.toString(),
          gameMaster: item.gameMaster,
        }
      }),
    })
  }

  async save(tabletop: Tabletop) {
    const data = PrismaTabletopMapper.toPrisma(tabletop)

    await this.prisma.tabletop.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
