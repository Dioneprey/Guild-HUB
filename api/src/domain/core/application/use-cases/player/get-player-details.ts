import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../../@errors/resource-not-found.error'
import { PlayerRepository } from '../../repositories/player-repository'
import { Player } from 'src/domain/core/enterprise/player/player'

interface GetPlayerDetailsUseCaseRequest {
  playerId: string
}

type GetPlayerDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    player: Player
  }
>

@Injectable()
export class GetPlayerDetailsUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  async execute({
    playerId,
  }: GetPlayerDetailsUseCaseRequest): Promise<GetPlayerDetailsUseCaseResponse> {
    const player = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!player) {
      return left(new ResourceNotFoundError(playerId))
    }

    return right({
      player,
    })
  }
}
