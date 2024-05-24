import { Either, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import {
  Tabletop,
  TabletopCadence,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'

interface FetchAllTabletopsUseCaseRequest {
  pageIndex: number
  filters?: {
    online?: boolean
    countryId?: string
    stateId?: string
    cityId?: string
    playersLimit?: number
    onlyOpenSlots?: boolean
    withGameMaster?: boolean
    minAge?: number
    onlyVerifiedTabletop?: boolean
    tabletopType?: TabletopType
    tabletopCadence?: TabletopCadence
    tabletopExpertise?: TabletopExpertise
    timezoneId?: number
    tabletopSystemId?: number
    tabletopLanguageId?: number[]
  }
}

type FetchAllTabletopsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    tabletops: Tabletop[]
    pageIndex: number
    totalCount: number
    totalPages: number
  }
>

@Injectable()
export class FetchAllTabletopsUseCase {
  constructor(private tabletopRepository: TabletopRepository) {}

  async execute({
    pageIndex,
    filters,
  }: FetchAllTabletopsUseCaseRequest): Promise<FetchAllTabletopsUseCaseResponse> {
    const { data, totalCount, totalPages } =
      await this.tabletopRepository.findAll({
        pageIndex,
        filters,
        include: {
          tabletopPlayers: false,
        },
      })

    return right({
      tabletops: data,
      pageIndex,
      totalCount,
      totalPages,
    })
  }
}
