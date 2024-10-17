import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export enum TokenType {
  VALIDATE_ACCOUNT = 'VALIDATE_ACCOUNT',
}

export interface TokenProps {
  playerId: UniqueEntityID
  type: TokenType
  createdAt: Date
}

export class Token extends Entity<TokenProps> {
  get playerId() {
    return this.props.playerId
  }

  set playerId(playerId: UniqueEntityID) {
    this.props.playerId = playerId
  }

  get type() {
    return this.props.type
  }

  set type(type: TokenType) {
    this.props.type = type
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<TokenProps, 'createdAt'>, id?: UniqueEntityID) {
    const token = new Token(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return token
  }
}
