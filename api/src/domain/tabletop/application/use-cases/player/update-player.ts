import { Either, left, right } from 'src/core/either'
import { PlayerProps } from '../../../enterprise/entities/player'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../repositories/player-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { Exclude } from 'src/core/types/exclude'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { PlayerAlreadyExistsError } from '../@errors/player-already-exists.error'
import { Optional } from 'src/core/types/optional'

interface UpdatePlayerUseCaseRequest {
  id: string
  playerData: Optional<
    Exclude<PlayerProps, 'createdAt' | 'updatedAt' | 'birthdate' | 'role'>,
    'email' | 'password'
  >
  registrationCompleted?: boolean
}

type UpdatePlayerUseCaseResponse = Either<ResourceNotFoundError, undefined>

@Injectable()
export class UpdatePlayerUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    id,
    playerData,
    registrationCompleted,
  }: UpdatePlayerUseCaseRequest): Promise<UpdatePlayerUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: id,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(id))
    }

    if (playerData.email) {
      const { email } = playerData
      const hasPlayerWithSameEmail =
        await this.playerRepository.findByUniqueField({
          key: 'email',
          value: email,
        })

      if (hasPlayerWithSameEmail) {
        return left(new PlayerAlreadyExistsError(email))
      }
    }

    let hashedPassword: string | null = null

    if (playerData.password) {
      hashedPassword = await this.hashGenerator.hash(playerData.password)
    }

    const properties = Object.keys(playerData)

    // Percorre todos os itens de playerData, objeto passado pela requisição, caso tenha um valor, atribui ao usuário existente, caso não, continuar valor atual
    properties.forEach((element) => {
      if (element === 'password') {
        playerData[element] = hashedPassword ?? playerExists[element]
      }

      playerExists[element] =
        playerData[element] !== undefined
          ? playerData[element]
          : playerExists[element]
    })

    if (registrationCompleted) {
      playerExists.registrationCompletedAt = new Date()
    }

    await this.playerRepository.save(playerExists)

    return right(undefined)
  }
}
