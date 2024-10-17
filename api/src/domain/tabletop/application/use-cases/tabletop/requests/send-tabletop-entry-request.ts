import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '../../@errors/resource-not-found.error'
import { ResourceAlreadyExistsError } from '../../@errors/resource-already-exists.error'
import { TabletopRepository } from '../../../repositories/tabletop-repository'
import { TabletopEntryRequestRepository } from '../../../repositories/tabletop-entry-request-repository'
import { TabletopEntryRequest } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-entry-request'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

interface SendTabletopEntryRequestUseCaseRequest {
  playerId: string
  tabletopId: string
}

type SendTabletopEntryRequestUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  undefined
>

@Injectable()
export class SendTabletopEntryRequestUseCase {
  constructor(
    private tabletopRepository: TabletopRepository,
    private tabletopEntryRequestRepository: TabletopEntryRequestRepository,
  ) {}

  async execute({
    playerId,
    tabletopId,
  }: SendTabletopEntryRequestUseCaseRequest): Promise<SendTabletopEntryRequestUseCaseResponse> {
    const [tabletopExists, entranceRequestAlreadyExists] = await Promise.all([
      this.tabletopRepository.findByUniqueField({
        key: 'id',
        value: tabletopId,
      }),
      this.tabletopEntryRequestRepository.findInTabletopByPlayerId({
        playerId,
        tabletopId,
      }),
    ])

    if (!tabletopExists) {
      return left(new ResourceNotFoundError('Tabletop dont exists'))
    }

    if (entranceRequestAlreadyExists) {
      return left(
        new ResourceAlreadyExistsError('Entry request already exists'),
      )
    }

    const entryRequest = TabletopEntryRequest.create({
      playerId: new UniqueEntityID(playerId),
      tabletopId: new UniqueEntityID(tabletopId),
    })

    await this.tabletopEntryRequestRepository.create(entryRequest)

    return right(undefined)
  }
}
