import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  TabletopRepository,
  TabletopRepositoryFindByIdProps,
} from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop'
import { PrismaTabletopMapper } from '../mapper/prisma-tabletop-mapper'

@Injectable()
export class PrismaTabletopRepository implements TabletopRepository {
  constructor(private prisma: PrismaService) {}
  async findById({ id, include }: TabletopRepositoryFindByIdProps) {
    const tabletop = await this.prisma.tabletop.findFirst({
      where: {
        id,
      },
      include: {
        tabletopUsers: include?.tabletopPlayers
          ? {
              include: {
                user: true,
              },
            }
          : false,
      },
    })

    if (!tabletop) {
      return null
    }

    // @ts-expect-error Tipagem
    return PrismaTabletopMapper.toDomain(tabletop)
  }

  async create(tabletop: Tabletop) {
    const data = PrismaTabletopMapper.toPrisma(tabletop)

    const newTabletop = await this.prisma.tabletop.create({
      data,
    })

    return PrismaTabletopMapper.toDomain(newTabletop)
  }

  async save(tabletop: Tabletop) {
    const data = PrismaTabletopMapper.toPrisma(tabletop)

    const updatedTabletop = await this.prisma.tabletop.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaTabletopMapper.toDomain(updatedTabletop)
  }
}
