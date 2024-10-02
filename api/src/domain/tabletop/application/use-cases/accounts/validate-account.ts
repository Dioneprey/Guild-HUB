import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { TokenRepository } from '../../repositories/token-repository'
import { ForbiddenActionError } from '../@errors/forbidden-action.error'

interface ValidateAccountUseCaseRequest {
  playerId: string
  registrationValidateToken: string
}

type ValidateAccountUseCaseResponse = Either<
  ResourceNotFoundError | ForbiddenActionError,
  undefined
>

@Injectable()
export class ValidateAccountUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tokenRepository: TokenRepository,
  ) {}

  async execute({
    playerId,
    registrationValidateToken,
  }: ValidateAccountUseCaseRequest): Promise<ValidateAccountUseCaseResponse> {
    const [playerExists, tokenExists] = await Promise.all([
      this.playerRepository.findByUniqueField({
        key: 'id',
        value: playerId,
      }),
      this.tokenRepository.findById(registrationValidateToken),
    ])

    if (!playerExists) {
      return left(new ResourceNotFoundError(playerId))
    }
    if (!tokenExists) {
      return left(new ResourceNotFoundError(registrationValidateToken))
    }

    if (tokenExists.playerId.toString() !== playerExists.id.toString()) {
      return left(new ForbiddenActionError())
    }

    playerExists.registrationValidatedAt = new Date()

    await Promise.all([
      this.playerRepository.save(playerExists),
      this.tokenRepository.delete(tokenExists),
    ])

    return right(undefined)
  }
}
