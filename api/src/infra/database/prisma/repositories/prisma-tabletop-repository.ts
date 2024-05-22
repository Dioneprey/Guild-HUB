import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopRepository,
  TabletopRepositoryFindAllByPlayerIdProps,
  TabletopRepositoryFindByIdProps,
} from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopMapper } from '../mapper/tabletop/prisma-tabletop-mapper'
import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-player'

@Injectable()
export class PrismaTabletopRepository implements TabletopRepository {
  constructor(private prisma: PrismaService) {}
  async findById({ id, include }: TabletopRepositoryFindByIdProps) {
    const tabletop = await this.prisma.tabletop.findFirst({
      where: {
        id,
      },
      include: {
        ...(include?.tabletopPlayers && {
          tabletopUsers: include?.tabletopPlayers
            ? {
                include: {
                  user: true,
                },
              }
            : false,
        }),
        tabletopSystem: true,
        avatarFile: true,
        coverFile: true,
      },
    })

    if (!tabletop) {
      return null
    }

    return PrismaTabletopMapper.toDomain(tabletop)
  }

  async findAllByPlayerId({
    playerId,
    include,
  }: TabletopRepositoryFindAllByPlayerIdProps) {
    const tabletop = await this.prisma.tabletop.findMany({
      where: {
        ownerId: playerId,
      },
      include: {
        ...(include?.tabletopPlayers && {
          tabletopUsers: include?.tabletopPlayers
            ? {
                include: {
                  user: true,
                },
              }
            : false,
        }),
        tabletopSystem: true,
        avatarFile: true,
        coverFile: true,
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
    await this.prisma.tabletopUsers.createMany({
      data: tabletopPlayers.map((item) => {
        return {
          tabletopId: item.tabletopId.toString(),
          userId: item.playerId.toString(),
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
