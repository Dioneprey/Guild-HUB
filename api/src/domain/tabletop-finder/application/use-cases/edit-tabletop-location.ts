import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ForbiddenActionError } from 'src/domain/core/application/@errors/forbidden-action.error'
import { ResourceNotFoundError } from 'src/domain/core/application/@errors/resource-not-found.error'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { TabletopLocationRepository } from '../repositories/tabletop-location-repository'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface EditTabletopLocationUseCaseRequest {
  playerId: string
  tabletopLocationId: string
  tabletopId: string
  tabletopLocationData: {
    title?: string
    postalCode?: string
    cityId?: string
    countryId?: string
    streetName?: string
    streetNumber?: string
    neighborhood?: string
    latitude?: number
    longitude?: number
  }
}

type EditTabletopLocationUseCaseResponse = Either<
  ResourceNotFoundError | ForbiddenActionError,
  undefined
>

@Injectable()
export class EditTabletopLocationUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tabletopRepository: TabletopRepository,
    private tabletopLocationRepository: TabletopLocationRepository,
  ) {}

  async execute({
    playerId,
    tabletopId,
    tabletopLocationId,
    tabletopLocationData,
  }: EditTabletopLocationUseCaseRequest): Promise<EditTabletopLocationUseCaseResponse> {
    const [masterExists, tabletopExists, tabletopLocationExists] =
      await Promise.all([
        this.playerRepository.findByUniqueField({
          key: 'id',
          value: playerId,
        }),
        this.tabletopRepository.findByUniqueField({
          key: 'id',
          value: tabletopId,
        }),
        this.tabletopLocationRepository.findById(tabletopLocationId),
      ])

    if (!masterExists) return left(new ResourceNotFoundError(playerId))
    if (!tabletopExists) return left(new ResourceNotFoundError(tabletopId))
    if (!tabletopLocationExists)
      return left(new ResourceNotFoundError(tabletopLocationId))

    const tabletopBelongsToPlayer =
      tabletopExists.ownerId.toString() === playerId

    if (!tabletopBelongsToPlayer) return left(new ForbiddenActionError())

    const properties = Object.keys(tabletopLocationData)

    // Percorre todos os itens de tabletopLocationData, objeto passado pela requisição, caso tenha um valor, atribui ao valor existente, caso não, continuar valor atual
    properties.forEach((element) => {
      tabletopLocationExists[element] =
        tabletopLocationData[element] !== undefined
          ? tabletopLocationData[element]
          : tabletopLocationExists[element]
    })

    await this.tabletopLocationRepository.save(tabletopLocationExists)

    return right(undefined)
  }
}
