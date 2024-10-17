import { PrismaService } from '../../prisma.service'
import { Injectable } from '@nestjs/common'
import { Token } from 'src/domain/core/enterprise/token'
import { PrismaTokenMapper } from '../../mapper/core/prisma-token-mapper'
import { TokenRepository } from 'src/domain/core/application/repositories/token-repository'

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string) {
    const token = await this.prisma.token.findFirst({
      where: {
        id,
      },
    })

    if (!token) {
      return null
    }

    return PrismaTokenMapper.toDomain(token)
  }

  async create(token: Token) {
    const raw = PrismaTokenMapper.toPrisma(token)

    await this.prisma.token.create({
      data: raw,
    })
  }

  async delete(token: Token) {
    const raw = PrismaTokenMapper.toPrisma(token)

    await this.prisma.token.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
