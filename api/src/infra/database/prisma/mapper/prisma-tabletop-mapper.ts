import {
  Prisma,
  Tabletop as PrismaTabletop,
  TabletopType as PrismaTabletopType,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  Tabletop,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop'

export class PrismaTabletopMapper {
  static toDomain(raw: PrismaTabletop): Tabletop {
    return Tabletop.create(
      {
        ...raw,
        ownerId: new UniqueEntityID(raw.ownerId),
        type: raw.type ? TabletopType[raw.type] : null,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(tabletop: Tabletop): Prisma.TabletopUncheckedCreateInput {
    return {
      id: tabletop.id.toString(),
      ownerId: tabletop.ownerId.toString(),
      type: tabletop.type ? PrismaTabletopType[tabletop.type] : null,
      name: tabletop.name,
      description: tabletop.description,
      playersLimit: tabletop.playersLimit,
      systemName: tabletop.systemName,
      avatarUrl: tabletop.avatarUrl,
      minAge: tabletop.minAge,
      createdAt: tabletop.createdAt,
      updatedAt: tabletop.updatedAt,
    }
  }
}
