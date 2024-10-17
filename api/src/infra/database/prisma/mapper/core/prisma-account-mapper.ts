import { Prisma, Account as PrismaAccount } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Account, AccountProvider } from 'src/domain/core/enterprise/account'

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        playerId: new UniqueEntityID(raw.playerId),
        provider: AccountProvider[raw.provider],
        providerAccountId: raw.providerAccountId,
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(account: Account): Prisma.AccountUncheckedCreateInput {
    return {
      id: account.id.toString(),
      playerId: account.playerId.toString(),
      provider: account.provider,
      providerAccountId: account.providerAccountId,
    }
  }
}
