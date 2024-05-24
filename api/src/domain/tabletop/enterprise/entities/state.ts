import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface StateProps {
  name: string
  uf: string
  countryId: string
}

export class State extends Entity<StateProps> {
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

  set countryId(countryId: string) {
    this.props.countryId = countryId
  }

  static create(props: StateProps, id?: UniqueEntityID) {
    const state = new State(props, id)

    return state
  }
}
