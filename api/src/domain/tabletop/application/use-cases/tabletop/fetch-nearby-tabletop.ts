import { Either, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { TabletopLocation } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-location'
import { TabletopLocationRepository } from '../../repositories/tabletop-location-repository'

interface FetchNearbyTabletopUseCaseRequest {
  latitude: number
  longitude: number
  filters: {
    distanceRangeInKm: number
    onlyOpenSlots?: boolean
    minAge?: number
    onlyVerifiedTabletop?: boolean
  }
}

type FetchNearbyTabletopUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    tabletopLocation: TabletopLocation[]
  }
>

@Injectable()
export class FetchNearbyTabletopUseCase {
  constructor(private tabletopLocationRepository: TabletopLocationRepository) {}

  async execute({
    latitude,
    longitude,
    filters,
  }: FetchNearbyTabletopUseCaseRequest): Promise<FetchNearbyTabletopUseCaseResponse> {
    const { distanceRangeInKm } = filters

    const tabletopsNearby =
      await this.tabletopLocationRepository.findManyNearby({
        latitude,
        longitude,
        filters: {
          distanceRangeInKm,
        },
      })

    return right({
      tabletopLocation: tabletopsNearby,
    })
  }
}
