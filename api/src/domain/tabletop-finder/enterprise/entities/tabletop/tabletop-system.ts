import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TabletopSystemProps {
  name: string
}

export class TabletopSystem extends Entity<TabletopSystemProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: TabletopSystemProps, id?: UniqueEntityID) {
    const tabletopsystem = new TabletopSystem(props, id)

    return tabletopsystem
  }
}
