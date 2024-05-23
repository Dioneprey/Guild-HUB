import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TimezoneProps {
  timezone: string
  utc: string
  name: string
}

export class Timezone extends Entity<TimezoneProps> {
  get timezone() {
    return this.props.timezone
  }

  set timezone(timezone: string) {
    this.props.timezone = timezone
  }

  get utc() {
    return this.props.utc
  }

  set utc(utc: string) {
    this.props.name = utc
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: TimezoneProps, id?: UniqueEntityID) {
    const timezone = new Timezone(props, id)

    return timezone
  }
}
