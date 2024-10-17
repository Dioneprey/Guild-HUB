import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface LanguageProps {
  name: string
}

export class Language extends Entity<LanguageProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: LanguageProps, id?: UniqueEntityID) {
    const language = new Language(props, id)

    return language
  }
}
