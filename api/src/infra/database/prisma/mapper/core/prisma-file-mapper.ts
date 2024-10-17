import {
  Prisma,
  Files as PrismaFile,
  FileType as PrismaFileType,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { File, FileType } from 'src/domain/core/enterprise/file'

export class PrismaFileMapper {
  static toDomain(raw: PrismaFile): File {
    return File.create(
      {
        name: raw.name,
        key: raw.key,
        path: raw.path,
        type: raw.type ? FileType[raw.type] : null,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(file: File): Prisma.FilesUncheckedCreateInput {
    const isCreating = isNaN(Number(file.id.toString()))
    return {
      id: isCreating ? undefined : Number(file.id.toString()),
      name: file.name,
      key: file.key,
      path: file.path,
      type: file.type ? PrismaFileType[file.type] : null,
      createdAt: file.createdAt,
    }
  }
}
