import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { Tabletop } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { ResourceNotFoundError } from 'src/domain/core/application/@errors/resource-not-found.error'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface FetchPlayerTabletopUseCaseRequest {
  playerId: string
}

type FetchPlayerTabletopUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    tabletops: Tabletop[]
  }
>

@Injectable()
export class FetchPlayerTabletopUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tabletopRepository: TabletopRepository,
  ) {}

  async execute({
    playerId,
  }: FetchPlayerTabletopUseCaseRequest): Promise<FetchPlayerTabletopUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(playerId))
    }

    const tabletops = await this.tabletopRepository.findAllByPlayerId({
      playerId,
      include: {
        tabletopPlayers: true,
      },
    })

    return right({
      tabletops,
    })
  }
}
