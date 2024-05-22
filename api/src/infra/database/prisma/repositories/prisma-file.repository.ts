import {
  FileRepository,
  FileRepositoryFindByUniqueFieldProps,
} from 'src/domain/tabletop/application/repositories/file.repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { File } from 'src/domain/tabletop/enterprise/entities/file'
import { PrismaFileMapper } from '../mapper/prisma-file-mapper'

@Injectable()
export class PrismaFileRepository implements FileRepository {
  constructor(private prisma: PrismaService) {}
  async findByUniqueField({
    key,
    value,
  }: FileRepositoryFindByUniqueFieldProps) {
    if (!value) return null

    const people = await this.prisma.files.findFirst({
      where: {
        [key]: value,
      },
    })

    if (!people) {
      return null
    }

    return PrismaFileMapper.toDomain(people)
  }

  async create(file: File) {
    const raw = PrismaFileMapper.toPrisma(file)

    await this.prisma.files.create({
      data: raw,
    })
  }

  async delete(file: File) {
    const raw = PrismaFileMapper.toPrisma(file)

    await this.prisma.files.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
