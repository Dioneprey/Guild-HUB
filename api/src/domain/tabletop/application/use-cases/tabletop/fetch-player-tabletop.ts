import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { PlayerRepository } from '../../repositories/player-repository'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'

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
