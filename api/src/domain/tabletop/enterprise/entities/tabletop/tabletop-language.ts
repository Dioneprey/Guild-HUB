import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TabletopLanguageProps {
  tabletopId: UniqueEntityID
  languageId: number
}

export class TabletopLanguage extends Entity<TabletopLanguageProps> {
  get tabletopId() {
    return this.props.tabletopId
  }

  set tabletopId(tabletopId: UniqueEntityID) {
    this.props.tabletopId = tabletopId
  }

  get languageId() {
    return this.props.languageId
  }

  set languageId(languageId: number) {
    this.props.languageId = languageId
  }

  static create(props: TabletopLanguageProps, id?: UniqueEntityID) {
    const tabletoplanguage = new TabletopLanguage(props, id)

    return tabletoplanguage
  }
}
