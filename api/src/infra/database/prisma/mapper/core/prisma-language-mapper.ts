import { Prisma, OnlineGamePlataform as PrismaLanguage } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Language } from 'src/domain/core/enterprise/language'

export class PrismaLanguageMapper {
  static toDomain(raw: PrismaLanguage): Language {
    return Language.create(
      {
        name: raw.name ?? '',
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(
    language: Language,
  ): Prisma.OnlineGamePlataformUncheckedCreateInput {
    return {
      id: Number(language.id.toString()),
      name: language.name,
    }
  }
}
