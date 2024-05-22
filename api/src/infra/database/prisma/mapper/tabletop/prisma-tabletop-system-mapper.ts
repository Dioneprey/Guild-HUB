import { Prisma, TabletopSystem as PrismaTabletopSystem } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopSystem } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-system'

export class PrismaTabletopSystemMapper {
  static toDomain(raw: PrismaTabletopSystem): TabletopSystem {
    return TabletopSystem.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(String(raw.id)),
    )
  }

  static toPrisma(
    tabletopSystem: TabletopSystem,
  ): Prisma.TabletopSystemUncheckedCreateInput {
    return {
      id: Number(tabletopSystem.id.toString()),
      name: tabletopSystem.name,
    }
  }
}
