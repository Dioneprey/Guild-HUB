import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPlayerMapper } from '../mapper/player/prisma-player-mapper'
import {
  PlayerRepository,
  PlayerRepositoryFindByUniqueFieldProps,
} from 'src/domain/tabletop/application/repositories/player-repository'
import { Player } from 'src/domain/tabletop/enterprise/entities/player'

@Injectable()
export class PrismaPlayerRepository implements PlayerRepository {
  constructor(private prisma: PrismaService) {}
  async findByUniqueField({
    key,
    value,
  }: PlayerRepositoryFindByUniqueFieldProps) {
    const player = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      include: {
        avatarFile: true,
        userLanguage: {
          select: {
            language: true,
          },
        },
      },
    })

    if (!player) {
      return null
    }

    return PrismaPlayerMapper.toDomain(player)
  }

  async create(player: Player) {
    const data = PrismaPlayerMapper.toPrisma(player)

    await this.prisma.user.create({
      data,
    })
  }

  async createPlayerLanguage({
    playerId,
    language,
  }: {
    playerId: string
    language: number[]
  }) {
    await this.prisma.userLanguage.deleteMany({
      where: {
        userId: playerId,
      },
    })

    await this.prisma.userLanguage.createMany({
      data: language.map((item) => {
        return {
          userId: playerId,
          languageId: item,
        }
      }),
    })
  }

  async save(player: Player) {
    const data = PrismaPlayerMapper.toPrisma(player)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
