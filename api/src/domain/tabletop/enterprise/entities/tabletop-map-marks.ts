import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface TabletopMapMarkProps {
  tabletopId: UniqueEntityID
  cityId?: string | null
  countryId?: string | null
  latitude?: number | null
  longitude?: number | null
  createdAt: Date
}

export class TabletopMapMark extends Entity<TabletopMapMarkProps> {
  get tabletopId() {
    return this.props.tabletopId
  }

  set tabletopId(tabletopId: UniqueEntityID) {
    this.props.tabletopId = tabletopId
  }

  get cityId() {
    return this.props.cityId
  }

  set cityId(cityId: string | null | undefined) {
    this.props.cityId = cityId
  }

  get countryId() {
    return this.props.countryId
  }

  set countryId(countryId: string | null | undefined) {
    this.props.countryId = countryId
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

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<TabletopMapMarkProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletopMapMark = new TabletopMapMark(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return tabletopMapMark
  }
}
