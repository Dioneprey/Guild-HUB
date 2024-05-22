import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  Tabletop,
  TabletopCadence,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-player'

interface RegisterTabletopUseCaseRequest {
  playerId: string
  tabletopData: {
    name: string
    description?: string
    playersLimit: number
    language?: number[]
    avatarFileId?: number
    minAge?: number
    type: TabletopType
    tabletopSystemId?: number
    expertiseLevel?: TabletopExpertise
    cadence?: TabletopCadence
    coverFileId?: number
    online?: boolean
    hasDungeonMaster?: boolean
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
    playerId,
    tabletopData,
  }: RegisterTabletopUseCaseRequest): Promise<RegisterTabletopUseCaseResponse> {
    const masterExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!masterExists) {
      return left(new ResourceNotFoundError(playerId))
    }

    const {
      name,
      description,
      playersLimit,
      tabletopSystemId,
      avatarFileId,
      language,
      minAge,
      type,
      expertiseLevel,
      cadence,
      coverFileId,
      online,
      hasDungeonMaster,
    } = tabletopData

    const tabletop = Tabletop.create({
      ownerId: new UniqueEntityID(playerId),
      name,
      description,
      playersLimit,
      tabletopSystemId,
      minAge,
      type,
      expertiseLevel,
      cadence,
      avatarFileId,
      coverFileId,
      online,
      hasDungeonMaster,
    })

    await this.tabletopRepository.create(tabletop)
    if (language) {
      await this.tabletopRepository.createTabletopLanguage({
        tabletopId: tabletop.id.toString(),
        language,
      })
    }

    // Se mesa tiver dungeo master no cadastro, usuário é cadastrado como gm
    const tabletopPlayer = TabletopPlayer.create({
      playerId: new UniqueEntityID(playerId),
      tabletopId: tabletop.id,
      gameMaster: tabletop.hasDungeonMaster,
    })

    await this.tabletopRepository.createTabletopPlayers([tabletopPlayer])

    return right(undefined)
  }
}
