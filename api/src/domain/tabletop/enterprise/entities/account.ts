import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export enum AccountProvider {
  GOOGLE = 'GOOGLE',
  CREDENTIALS = 'CREDENTIALS',
}

export interface AccountProps {
  playerId: UniqueEntityID
  provider: AccountProvider
  providerAccountId?: string | null
}

export class Account extends Entity<AccountProps> {
  get playerId() {
    return this.props.playerId
  }

  set playerId(playerId: UniqueEntityID) {
    this.props.playerId = playerId
  }

  get provider() {
    return this.props.provider
  }

  set provider(provider: AccountProvider) {
    this.props.provider = provider
  }

  get providerAccountId() {
    return this.props.providerAccountId
  }

  set providerAccountId(providerAccountId: string | undefined | null) {
    this.props.providerAccountId = providerAccountId
  }

  static create(props: AccountProps, id?: UniqueEntityID) {
    const account = new Account({ ...props }, id)

    return account
  }
}
