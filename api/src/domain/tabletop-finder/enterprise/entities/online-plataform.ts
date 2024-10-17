import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface OnlinePlataformProps {
  name: string
}

export class OnlinePlataform extends Entity<OnlinePlataformProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: OnlinePlataformProps, id?: UniqueEntityID) {
    const onlineplataform = new OnlinePlataform(props, id)

    return onlineplataform
  }
}
