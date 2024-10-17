import { Prisma, Token as PrismaToken } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Token, TokenType } from 'src/domain/core/enterprise/token'

export class PrismaTokenMapper {
  static toDomain(raw: PrismaToken): Token {
    return Token.create(
      {
        playerId: new UniqueEntityID(raw.playerId),
        type: TokenType[raw.type],
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(token: Token): Prisma.TokenUncheckedCreateInput {
    return {
      id: token.id.toString(),
      playerId: token.playerId.toString(),
      type: token.type,
      createdAt: token.createdAt,
    }
  }
}
