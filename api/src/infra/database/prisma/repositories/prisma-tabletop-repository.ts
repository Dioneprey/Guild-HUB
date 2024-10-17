import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopRepository,
  TabletopRepositoryCreateProps,
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
        tabletopType: true,
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
          ...(filters?.tabletopTypeId && {
            tabletopTypeId: {
              in: filters.tabletopTypeId,
            },
          }),
          ...(filters?.tabletopSystemId && {
            tabletopSystemId: {
              in: filters.tabletopSystemId,
            },
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
          tabletopType: true,
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
          ...(filters?.tabletopTypeId && {
            tabletopTypeId: {
              in: filters.tabletopTypeId,
            },
          }),
          ...(filters?.tabletopSystemId && {
            tabletopSystemId: {
              in: filters.tabletopSystemId,
            },
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
        tabletopType: true,
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

  async create({
    tabletop,
    language,
    tabletopPlayer,
  }: TabletopRepositoryCreateProps) {
    const data = PrismaTabletopMapper.toPrisma(tabletop)

    await this.prisma.$transaction(async (prisma) => {
      const createdTabletop = await prisma.tabletop.create({
        data,
      })

      await prisma.tabletopLanguage.createMany({
        data: language.map((item) => ({
          tabletopId: createdTabletop.id,
          languageId: item,
        })),
      })

      await prisma.tabletopPlayers.create({
        data: {
          tabletopId: createdTabletop.id,
          playerId: tabletopPlayer.playerId.toString(),
          gameMaster: tabletopPlayer.gameMaster,
        },
      })
    })
  }

  async updateTabletopLanguage({
    tabletopId,
    language,
  }: {
    tabletopId: string
    language: number[]
  }) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.tabletopLanguage.deleteMany({
        where: {
          tabletopId,
        },
      })

      await prisma.tabletopLanguage.createMany({
        data: language.map((item) => {
          return {
            tabletopId,
            languageId: item,
          }
        }),
      })
    })
  }

  async updateTabletopPlayers(tabletopPlayers: TabletopPlayer[]) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.tabletopPlayers.deleteMany({
        where: {
          tabletopId: tabletopPlayers[0].tabletopId.toString(),
        },
      })

      await prisma.tabletopPlayers.createMany({
        data: tabletopPlayers.map((item) => {
          return {
            tabletopId: item.tabletopId.toString(),
            playerId: item.playerId.toString(),
            gameMaster: item.gameMaster,
          }
        }),
      })
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
