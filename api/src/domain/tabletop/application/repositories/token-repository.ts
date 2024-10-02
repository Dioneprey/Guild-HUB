import { Token } from '../../enterprise/entities/token'

export abstract class TokenRepository {
  abstract findById(id: string): Promise<Token | null>

  abstract create(token: Token): Promise<void>
  abstract delete(token: Token): Promise<void>
}
