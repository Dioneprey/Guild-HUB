import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface CityProps {
  name: string
  uf: string
  countryId: UniqueEntityID
}

export class City extends Entity<CityProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get uf() {
    return this.props.uf
  }

  set uf(uf: string) {
    this.props.uf = uf
  }

  get countryId() {
    return this.props.countryId
  }

  set countryId(countryId: UniqueEntityID) {
    this.props.countryId = countryId
  }

  static create(props: CityProps, id?: UniqueEntityID) {
    const city = new City(props, id)

    return city
  }
}
