import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { TabletopEntryRequest } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-entry-request'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'
import { ResourceNotFoundError } from 'src/domain/shared/@errors/resource-not-found.error'
import { TabletopEntryRequestRepository } from '../../repositories/tabletop-entry-request-repository'
import { TabletopRepository } from '../../repositories/tabletop-repository'
import { NoAvailableSlotsError } from 'src/domain/shared/@errors/no-available-slots.error'

interface SendTabletopEntryRequestUseCaseRequest {
  playerId: string
  tabletopId: string
}

type SendTabletopEntryRequestUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError | NoAvailableSlotsError,
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
        include: {
          tabletopPlayers: true,
        },
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

    const tabletopHasOpenSlots =
      Number(tabletopExists?.playersLimit) <
      Number(tabletopExists.tabletopPlayers?.length)

    if (!tabletopHasOpenSlots) {
      return left(new NoAvailableSlotsError())
    }

    const entryRequest = TabletopEntryRequest.create({
      playerId: new UniqueEntityID(playerId),
      tabletopId: new UniqueEntityID(tabletopId),
    })

    await this.tabletopEntryRequestRepository.create(entryRequest)

    return right(undefined)
  }
}
