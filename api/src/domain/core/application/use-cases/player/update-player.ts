import { Either, left, right } from 'src/core/either'
import { GenderOptions } from '../../../../tabletop/enterprise/entities/player/player'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../../../tabletop/application/repositories/player-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { ResourceNotFoundError } from '../../../../tabletop/application/use-cases/@errors/resource-not-found.error'
import { ResourceAlreadyExistsError } from '../../../../tabletop/application/use-cases/@errors/resource-already-exists.error'

interface UpdatePlayerUseCaseRequest {
  playerId: string
  playerData: {
    name?: string | null
    nickname?: string | null
    bio?: string | null
    gender?: GenderOptions | null
    email?: string
    password?: string | null
    avatarFileId?: string | null
    cityId?: string | null
    countryId?: string | null
    birthdate?: Date | null
    playerLanguageId?: number[] | null
  }
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
    playerId,
    playerData,
    registrationCompleted,
  }: UpdatePlayerUseCaseRequest): Promise<UpdatePlayerUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(playerId))
    }

    if (playerData.email) {
      const { email } = playerData
      const hasPlayerWithSameEmail =
        await this.playerRepository.findByUniqueField({
          key: 'email',
          value: email,
        })

      if (hasPlayerWithSameEmail) {
        return left(new ResourceAlreadyExistsError(email))
      }
    }

    let hashedPassword: string | null = null

    if (playerData.password) {
      hashedPassword = await this.hashGenerator.hash(playerData.password)
    }

    const properties = Object.keys(playerData)

    let playerLanguageId: number[] | null = null

    // Percorre todos os itens de playerData, objeto passado pela requisição, caso tenha um valor, atribui ao usuário existente, caso não, continuar valor atual
    properties.forEach((element) => {
      if (element === 'password') {
        playerData[element] = hashedPassword ?? playerExists[element]
      }

      if (element === 'playerLanguageId') {
        playerLanguageId = playerData[element] as number[]
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

    if (playerLanguageId) {
      await this.playerRepository.createPlayerLanguage({
        playerId,
        language: playerLanguageId,
      })
    }

    return right(undefined)
  }
}
