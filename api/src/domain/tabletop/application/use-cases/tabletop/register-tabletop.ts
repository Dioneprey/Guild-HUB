import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  Tabletop,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

interface RegisterTabletopUseCaseRequest {
  masterId: string
  tabletopData: {
    name: string
    description?: string
    playersLimit: number
    systemName?: string
    avatarUrl?: string
    minAge?: number
    type: TabletopType
  }
}

type RegisterTabletopUseCaseResponse = Either<ResourceNotFoundError, undefined>

@Injectable()
export class RegisterTabletopUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tabletopRepository: TabletopRepository,
  ) {}

  async execute({
    masterId,
    tabletopData,
  }: RegisterTabletopUseCaseRequest): Promise<RegisterTabletopUseCaseResponse> {
    const masterExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: masterId,
    })

    if (!masterExists) {
      return left(new ResourceNotFoundError(masterId))
    }

    const {
      name,
      description,
      playersLimit,
      systemName,
      avatarUrl,
      minAge,
      type,
    } = tabletopData

    const tabletop = Tabletop.create({
      ownerId: new UniqueEntityID(masterId),
      name,
      description,
      playersLimit,
      systemName,
      avatarUrl,
      minAge,
      type,
    })

    await this.tabletopRepository.create(tabletop)

    return right(undefined)
  }
}
