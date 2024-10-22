import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { Tabletop } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { ResourceNotFoundError } from 'src/domain/shared/@errors/resource-not-found.error'
import { TabletopRepository } from '../repositories/tabletop-repository'

interface GetTabletopDetailsUseCaseRequest {
  slug: string
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
    slug,
  }: GetTabletopDetailsUseCaseRequest): Promise<GetTabletopDetailsUseCaseResponse> {
    const tabletop = await this.tabletopRepository.findByUniqueField({
      key: 'slug',
      value: slug,
      include: {
        tabletopPlayers: true,
      },
    })

    if (!tabletop) {
      return left(new ResourceNotFoundError(slug))
    }

    return right({
      tabletop,
    })
  }
}