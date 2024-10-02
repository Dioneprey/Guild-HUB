import { Account, AccountProvider } from '../../enterprise/entities/account'

export abstract class AccountRepository {
  abstract findByPlayerIdAndProvider(
    playerId: string,
    accountProvider: AccountProvider,
  ): Promise<Account | null>

  abstract findManyByPlayerId(playerId: string): Promise<Account[]>

  abstract create(account: Account): Promise<void>
  abstract save(account: Account): Promise<void>
}
