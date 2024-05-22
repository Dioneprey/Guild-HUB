import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TabletopLanguageProps {
  name: string
}

export class TabletopLanguage extends Entity<TabletopLanguageProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: TabletopLanguageProps, id?: UniqueEntityID) {
    const tabletoplanguage = new TabletopLanguage(props, id)

    return tabletoplanguage
  }
}
