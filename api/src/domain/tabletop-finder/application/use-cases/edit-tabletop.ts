import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
} from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'
import { ResourceNotFoundError } from 'src/domain/shared/@errors/resource-not-found.error'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface EditTabletopUseCaseRequest {
  playerId: string
  tabletopId: string
  tabletopData: {
    name?: string | null
    slug?: string | null
    description?: string | null
    playersLimit?: number
    tabletopLanguageId?: number[] | null
    avatarFileId?: string | null
    minAge?: number
    tabletopTypeId?: number
    tabletopSystemId?: number
    expertiseLevel?: TabletopExpertise | null
    cadence?: TabletopCadence | null
    coverFileId?: string | null
    online?: boolean
    hasDungeonMaster?: boolean
    onlinePlataformId?: number | null
    timezoneId?: number | null
    communication?: TabletopCommunicationType | null
  }
}

type EditTabletopUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  undefined
>

@Injectable()
export class EditTabletopUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tabletopRepository: TabletopRepository,
  ) {}

  async execute({
    playerId,
    tabletopId,
    tabletopData,
  }: EditTabletopUseCaseRequest): Promise<EditTabletopUseCaseResponse> {
    const [playerExists, tabletopExists] = await Promise.all([
      this.playerRepository.findByUniqueField({
        key: 'id',
        value: playerId,
      }),
      this.tabletopRepository.findByUniqueField({
        key: 'id',
        value: tabletopId,
      }),
    ])

    if (!playerExists) return left(new ResourceNotFoundError(playerId))
    if (!tabletopExists) return left(new ResourceNotFoundError(tabletopId))

    if (tabletopData.slug) {
      const tabletopWithSameSlugExists =
        await this.tabletopRepository.findByUniqueField({
          key: 'slug',
          value: tabletopData.slug,
        })

      if (
        tabletopWithSameSlugExists?.id.toString() !==
        tabletopExists.id.toString()
      ) {
        return left(new ResourceAlreadyExistsError(tabletopData.slug))
      }
    }

    const properties = Object.keys(tabletopData)

    let tabletopLanguageId: number[] | null = null
    // Percorre todos os itens de playerData, objeto passado pela requisição, caso tenha um valor, atribui ao usuário existente, caso não, continuar valor atual
    properties.forEach((element) => {
      if (element === 'tabletopLanguageId') {
        tabletopLanguageId = tabletopData[element] as number[]
      }

      tabletopExists[element] =
        tabletopData[element] !== undefined
          ? tabletopData[element]
          : tabletopExists[element]
    })

    await this.tabletopRepository.save(tabletopExists)

    if (tabletopLanguageId) {
      await this.tabletopRepository.updateTabletopLanguage({
        tabletopId,
        language: tabletopLanguageId,
      })
    }

    return right(undefined)
  }
}
