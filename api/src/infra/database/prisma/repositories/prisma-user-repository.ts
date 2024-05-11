import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPlayerMapper } from '../mapper/prisma-player-mapper'
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
    })

    if (!player) {
      return null
    }

    return PrismaPlayerMapper.toDomain(player)
  }

  async create(player: Player) {
    const data = PrismaPlayerMapper.toPrisma(player)

    const newPlayer = await this.prisma.user.create({
      data,
    })

    return PrismaPlayerMapper.toDomain(newPlayer)
  }

  async save(player: Player) {
    const data = PrismaPlayerMapper.toPrisma(player)

    const updatedPlayer = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaPlayerMapper.toDomain(updatedPlayer)
  }
}
