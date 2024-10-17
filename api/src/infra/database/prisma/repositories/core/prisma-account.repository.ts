import { PrismaService } from '../../prisma.service'
import { Injectable } from '@nestjs/common'
import { Account, AccountProvider } from 'src/domain/core/enterprise/account'
import { PrismaAccountMapper } from '../../mapper/core/prisma-account-mapper'
import { AccountRepository } from 'src/domain/core/application/repositories/account-repository'

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}
  async findByPlayerIdAndProvider(
    playerId: string,
    accountProvider: AccountProvider,
  ) {
    const account = await this.prisma.account.findFirst({
      where: {
        playerId,
        provider: accountProvider,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }

  async findManyByPlayerId(playerId: string) {
    const account = await this.prisma.account.findMany({
      where: {
        playerId,
      },
    })

    return account.map(PrismaAccountMapper.toDomain)
  }

  async create(account: Account) {
    const raw = PrismaAccountMapper.toPrisma(account)

    await this.prisma.account.create({
      data: raw,
    })
  }

  async save(account: Account) {
    const raw = PrismaAccountMapper.toPrisma(account)

    await this.prisma.account.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
