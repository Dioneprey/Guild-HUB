import { Prisma, Timezone as PrismaTimezone } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Timezone } from 'src/domain/core/enterprise/timezone'

export class PrismaTimezoneMapper {
  static toDomain(raw: PrismaTimezone): Timezone {
    return Timezone.create(
      {
        timezone: raw.timezone ?? '',
        utc: raw.utc ?? '',
        name: raw.name ?? '',
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(timezone: Timezone): Prisma.TimezoneUncheckedCreateInput {
    return {
      id: Number(timezone.id.toString()),
      timezone: timezone.timezone,
      utc: timezone.utc,
      name: timezone.name,
    }
  }
}
