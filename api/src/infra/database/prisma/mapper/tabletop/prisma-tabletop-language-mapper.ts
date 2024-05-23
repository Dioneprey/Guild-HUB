import {
  Prisma,
  TabletopLanguage as PrismaTabletopLanguage,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLanguage } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-language'

export class PrismaTabletopLanguageMapper {
  static toDomain(raw: PrismaTabletopLanguage): TabletopLanguage {
    return TabletopLanguage.create(
      {
        languageId: raw.languageId,
        tabletopId: new UniqueEntityID(raw.tabletopId),
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(
    tabletopLanguage: TabletopLanguage,
  ): Prisma.TabletopLanguageUncheckedCreateInput {
    return {
      id: Number(tabletopLanguage.id.toString()),
      languageId: Number(tabletopLanguage.languageId.toString()),
      tabletopId: tabletopLanguage.tabletopId.toString(),
    }
  }
}
