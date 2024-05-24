import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TabletopLocationProps {
  tabletopId: UniqueEntityID
  postalCode?: string | null
  cityId?: string | null
  stateId?: string | null
  countryId?: string | null
  streetName?: string | null
  streetNumber?: string | null
  neighborhood?: string | null
  latitude?: number | null
  longitude?: number | null
}

export class TabletopLocation extends Entity<TabletopLocationProps> {
  get tabletopId() {
    return this.props.tabletopId
  }

  set tabletopId(tabletopId: UniqueEntityID) {
    this.props.tabletopId = tabletopId
  }

  get postalCode() {
    return this.props.postalCode
  }

  set postalCode(postalCode: string | null | undefined) {
    this.props.postalCode = postalCode
  }

  get cityId() {
    return this.props.cityId
  }

  set cityId(cityId: string | null | undefined) {
    this.props.cityId = cityId
  }

  get stateId() {
    return this.props.stateId
  }

  set stateId(stateId: string | null | undefined) {
    this.props.stateId = stateId
  }

  get countryId() {
    return this.props.countryId
  }

  set countryId(countryId: string | null | undefined) {
    this.props.countryId = countryId
  }

  get streetName() {
    return this.props.streetName
  }

  set streetName(streetName: string | null | undefined) {
    this.props.streetName = streetName
  }

  get streetNumber() {
    return this.props.streetNumber
  }

  set streetNumber(streetNumber: string | null | undefined) {
    this.props.streetNumber = streetNumber
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string | null | undefined) {
    this.props.neighborhood = neighborhood
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number | null | undefined) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number | null | undefined) {
    this.props.longitude = longitude
  }

  static create(props: TabletopLocationProps, id?: UniqueEntityID) {
    const tabletopLocation = new TabletopLocation(props, id)

    return tabletopLocation
  }
}
