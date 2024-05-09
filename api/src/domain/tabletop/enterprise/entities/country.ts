import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface CountryProps {
  name: string
}

export class Country extends Entity<CountryProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: CountryProps, id?: UniqueEntityID) {
    const country = new Country(props, id)

    return country
  }
}
