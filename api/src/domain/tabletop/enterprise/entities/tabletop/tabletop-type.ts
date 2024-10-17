import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TabletopTypeProps {
  name: string
}

export class TabletopType extends Entity<TabletopTypeProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: TabletopTypeProps, id?: UniqueEntityID) {
    const tabletoptype = new TabletopType(props, id)

    return tabletoptype
  }
}
