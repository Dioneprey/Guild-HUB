import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  Tabletop,
  TabletopCadence,
  TabletopCommunicationType,
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
    tabletopLanguageId?: number[]
    avatarFileId?: string
    minAge?: number
    type: TabletopType
    tabletopSystemId?: number
    expertiseLevel?: TabletopExpertise
    cadence?: TabletopCadence
    coverFileId?: string
    online?: boolean
    hasDungeonMaster?: boolean
    onlinePlataformId?: number
    timezoneId?: number
    communication?: TabletopCommunicationType
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
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(playerId))
    }

    const {
      name,
      description,
      playersLimit,
      tabletopSystemId,
      avatarFileId,
      tabletopLanguageId,
      minAge,
      type,
      expertiseLevel,
      cadence,
      coverFileId,
      online,
      hasDungeonMaster,
      communication,
      onlinePlataformId,
      timezoneId,
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
      communication,
      online,
      hasDungeonMaster,
      onlinePlataformId,
      timezoneId,
    })

    await this.tabletopRepository.create(tabletop)

    if (tabletopLanguageId) {
      await this.tabletopRepository.createTabletopLanguage({
        tabletopId: tabletop.id.toString(),
        language: tabletopLanguageId,
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
