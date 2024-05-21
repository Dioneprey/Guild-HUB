import { Prisma, Files as PrismaFile } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { File } from 'src/domain/tabletop/enterprise/entities/file'

export class PrismaFileMapper {
  static toDomain(raw: PrismaFile): File {
    return File.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(file: File): Prisma.FilesUncheckedCreateInput {
    return {
      id: Number(file.id.toString()),
      name: file.name,
    }
  }
}
