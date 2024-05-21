import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopRepository,
  TabletopRepositoryFindByIdProps,
} from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopMapper } from '../mapper/tabletop/prisma-tabletop-mapper'

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
