import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import {
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'

interface EditTabletopUseCaseRequest {
  playerId: string
  tabletopId: string
  tabletopData: {
    name?: string | null
    description?: string | null
    playersLimit?: number
    tabletopLanguageId?: number[] | null
    avatarFileId?: string | null
    minAge?: number
    type?: TabletopType | null
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

type EditTabletopUseCaseResponse = Either<ResourceNotFoundError, undefined>

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
      this.tabletopRepository.findById({
        id: tabletopId,
      }),
    ])

    if (!playerExists) return left(new ResourceNotFoundError(playerId))
    if (!tabletopExists) return left(new ResourceNotFoundError(tabletopId))

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
      await this.tabletopRepository.createTabletopLanguage({
        tabletopId,
        language: tabletopLanguageId,
      })
    }

    return right(undefined)
  }
}
