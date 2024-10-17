import { Prisma, TabletopType as PrismaTabletopType } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopType } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-type'

export class PrismaTabletopTypeMapper {
  static toDomain(raw: PrismaTabletopType): TabletopType {
    return TabletopType.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(String(raw.id)),
    )
  }

  static toPrisma(
    tabletopType: TabletopType,
  ): Prisma.TabletopTypeUncheckedCreateInput {
    return {
      id: Number(tabletopType.id.toString()),
      name: tabletopType.name,
    }
  }
}
