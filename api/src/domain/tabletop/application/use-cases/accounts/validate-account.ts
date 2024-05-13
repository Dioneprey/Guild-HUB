import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { ResourceInvalidError } from '../@errors/resource-invalid.error'

interface ValidateAccountUseCaseRequest {
  userId: string
  registrationValidateCode: string
}

type ValidateAccountUseCaseResponse = Either<ResourceNotFoundError, undefined>

@Injectable()
export class ValidateAccountUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  async execute({
    userId,
    registrationValidateCode,
  }: ValidateAccountUseCaseRequest): Promise<ValidateAccountUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: userId,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(userId))
    }

    const isRegistrationValidateCodeValid =
      playerExists.registrationValidateCode === registrationValidateCode

    if (!isRegistrationValidateCodeValid) {
      return left(new ResourceInvalidError(registrationValidateCode))
    }

    playerExists.registrationValidateCode = null
    playerExists.registrationValidatedAt = new Date()

    await this.playerRepository.save(playerExists)

    return right(undefined)
  }
}
