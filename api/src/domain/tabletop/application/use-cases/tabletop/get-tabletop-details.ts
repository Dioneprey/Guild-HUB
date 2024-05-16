import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop'

interface GetTabletopDetailsUseCaseRequest {
  tabletopId: string
}

type GetTabletopDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    tabletop: Tabletop
  }
>

@Injectable()
export class GetTabletopDetailsUseCase {
  constructor(private tabletopRepository: TabletopRepository) {}

  async execute({
    tabletopId,
  }: GetTabletopDetailsUseCaseRequest): Promise<GetTabletopDetailsUseCaseResponse> {
    const tabletop = await this.tabletopRepository.findById({
      id: tabletopId,
      include: {
        tabletopPlayers: true,
      },
    })

    if (!tabletop) {
      return left(new ResourceNotFoundError(tabletopId))
    }

    return right({
      tabletop,
    })
  }
}
