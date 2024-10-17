import {
  Prisma,
  OnlineGamePlataform as PrismaOnlinePlataform,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { OnlinePlataform } from 'src/domain/tabletop-finder/enterprise/entities/online-plataform'

export class PrismaOnlinePlataformMapper {
  static toDomain(raw: PrismaOnlinePlataform): OnlinePlataform {
    return OnlinePlataform.create(
      {
        name: raw.name ?? '',
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(
    onlineplataform: OnlinePlataform,
  ): Prisma.OnlineGamePlataformUncheckedCreateInput {
    return {
      id: Number(onlineplataform.id.toString()),
      name: onlineplataform.name,
    }
  }
}
