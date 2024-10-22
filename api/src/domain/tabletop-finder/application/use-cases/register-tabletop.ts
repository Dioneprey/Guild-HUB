import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  Tabletop,
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
} from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopPlayer } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-player'
import { createSlug } from 'src/core/utils/create-slug'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'
import { ResourceNotFoundError } from 'src/domain/shared/@errors/resource-not-found.error'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface RegisterTabletopUseCaseRequest {
  playerId: string
  tabletopData: {
    name: string
    slug?: string
    description?: string
    playersLimit: number
    tabletopLanguageId: number[]
    avatarFileId?: string
    minAge: number
    tabletopTypeId: number
    tabletopSystemId?: number
    expertiseLevel?: TabletopExpertise
    cadence?: TabletopCadence
    coverFileId?: string
    online?: boolean
    hasDungeonMaster: boolean
    onlinePlataformId?: number
    timezoneId?: number
    communication: TabletopCommunicationType
  }
}

type RegisterTabletopUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  undefined
>

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
    const tabletopSlug = tabletopData.slug ?? createSlug(tabletopData.name)

    const [playerExists, tabletopWithSameSlugExists] = await Promise.all([
      this.playerRepository.findByUniqueField({
        key: 'id',
        value: playerId,
      }),
      this.tabletopRepository.findByUniqueField({
        key: 'slug',
        value: tabletopSlug,
      }),
    ])

    if (!playerExists) {
      return left(
        new ResourceNotFoundError(`Player with id: ${playerId} doesn't exists`),
      )
    }

    if (tabletopWithSameSlugExists) {
      return left(
        new ResourceAlreadyExistsError(`Slug: ${tabletopSlug} already existss`),
      )
    }

    const {
      name,
      slug,
      description,
      playersLimit,
      tabletopSystemId,
      avatarFileId,
      tabletopLanguageId,
      minAge,
      tabletopTypeId,
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
      slug,
      name,
      description,
      playersLimit,
      tabletopSystemId,
      minAge,
      tabletopTypeId,
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

    // Se mesa tiver dungeon master no cadastro, usuário é cadastrado como gm
    const tabletopPlayer = TabletopPlayer.create({
      playerId: new UniqueEntityID(playerId),
      tabletopId: tabletop.id,
      gameMaster: tabletop.hasDungeonMaster,
    })

    await this.tabletopRepository.create({
      tabletop,
      language: tabletopLanguageId,
      tabletopPlayer,
    })

    return right(undefined)
  }
}
