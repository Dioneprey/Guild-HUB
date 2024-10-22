import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLocation } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-location'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'
import { ResourceNotFoundError } from 'src/domain/shared/@errors/resource-not-found.error'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { TabletopLocationRepository } from '../repositories/tabletop-location-repository'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface RegisterTabletopLocationUseCaseRequest {
  masterId: string
  tabletopId: string
  tabletopLocationData: {
    title: string
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

type RegisterTabletopLocationUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  undefined
>

@Injectable()
export class RegisterTabletopLocationUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tabletopRepository: TabletopRepository,
    private tabletopLocationRepository: TabletopLocationRepository,
  ) {}

  async execute({
    masterId,
    tabletopId,
    tabletopLocationData,
  }: RegisterTabletopLocationUseCaseRequest): Promise<RegisterTabletopLocationUseCaseResponse> {
    const [masterExists, tabletopExists, tabletopLocationExists] =
      await Promise.all([
        this.playerRepository.findByUniqueField({
          key: 'id',
          value: masterId,
        }),
        this.tabletopRepository.findByUniqueField({
          key: 'id',
          value: tabletopId,
        }),
        this.tabletopLocationRepository.findByTabletopId(tabletopId),
      ])

    if (!masterExists) return left(new ResourceNotFoundError(masterId))
    if (!tabletopExists) return left(new ResourceNotFoundError(tabletopId))
    if (tabletopLocationExists)
      return left(new ResourceAlreadyExistsError('Tabletop Location'))

    const {
      title,
      postalCode,
      cityId,
      countryId,
      streetName,
      streetNumber,
      neighborhood,
      latitude,
      longitude,
    } = tabletopLocationData

    const tabletopLocation = TabletopLocation.create({
      tabletopId: new UniqueEntityID(tabletopId),
      title,
      postalCode,
      cityId,
      countryId,
      streetName,
      streetNumber,
      neighborhood,
      latitude,
      longitude,
    })

    await this.tabletopLocationRepository.create(tabletopLocation)

    return right(undefined)
  }
}
