import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface TabletopSchedulePlayerAvailabilityProps {
  scheduleId: UniqueEntityID
  playerId: UniqueEntityID
  availability?: boolean | null
  observation?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class TabletopSchedulePlayerAvailability extends Entity<TabletopSchedulePlayerAvailabilityProps> {
  get scheduleId() {
    return this.props.scheduleId
  }

  set scheduleId(scheduleId: UniqueEntityID) {
    this.props.scheduleId = scheduleId
    this.touch()
  }

  get playerId() {
    return this.props.playerId
  }

  set playerId(playerId: UniqueEntityID) {
    this.props.playerId = playerId
    this.touch()
  }

  get availability() {
    return this.props.availability
  }

  set availability(availability: boolean | null | undefined) {
    this.props.availability = availability
    this.touch()
  }

  get observation() {
    return this.props.observation
  }

  set observation(observation: string | null | undefined) {
    this.props.observation = observation
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TabletopSchedulePlayerAvailabilityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletopSchedulePlayerAvailability =
      new TabletopSchedulePlayerAvailability(
        { ...props, createdAt: props.createdAt ?? new Date() },
        id,
      )

    return tabletopSchedulePlayerAvailability
  }
}
