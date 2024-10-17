import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface TabletopScheduleProps {
  tabletopId: UniqueEntityID
  dayOfWeek?: number | null
  startTimeMinutes?: number | null
  endTimeMinutes?: number | null
  createdAt: Date
  updatedAt?: Date | null
}

export class TabletopSchedule extends Entity<TabletopScheduleProps> {
  get tabletopId() {
    return this.props.tabletopId
  }

  set tabletopId(tabletopId: UniqueEntityID) {
    this.props.tabletopId = tabletopId
    this.touch()
  }

  get dayOfWeek() {
    return this.props.dayOfWeek
  }

  set dayOfWeek(dayOfWeek: number | null | undefined) {
    this.props.dayOfWeek = dayOfWeek
    this.touch()
  }

  get startTimeMinutes() {
    return this.props.startTimeMinutes
  }

  set startTimeMinutes(startTimeMinutes: number | null | undefined) {
    this.props.startTimeMinutes = startTimeMinutes
    this.touch()
  }

  get endTimeMinutes() {
    return this.props.endTimeMinutes
  }

  set endTimeMinutes(endTimeMinutes: number | null | undefined) {
    this.props.endTimeMinutes = endTimeMinutes
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
    props: Optional<TabletopScheduleProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletopSchedule = new TabletopSchedule(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return tabletopSchedule
  }
}
