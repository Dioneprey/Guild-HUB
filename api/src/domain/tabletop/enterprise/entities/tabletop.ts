import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopPlayer } from './tabletop-player'
import { TabletopMapMark } from './tabletop-map-marks'

export enum TabletopType {
  offline = 'P',
  online = 'O',
  hibrid = 'H',
}

export interface TabletopProps {
  ownerId: UniqueEntityID
  name?: string | null
  description?: string | null
  playersLimit?: number | null
  systemName?: string | null
  avatarUrl?: string | null
  minAge?: number | null
  type?: TabletopType | null
  createdAt: Date
  tabletopPlayers: TabletopPlayer[]
  tabletopMapMarks: TabletopMapMark[]
  updatedAt?: Date | null
}

export class Tabletop extends Entity<TabletopProps> {
  get ownerId() {
    return this.props.ownerId
  }

  set ownerId(ownerId: UniqueEntityID) {
    this.props.ownerId = ownerId
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(name: string | null | undefined) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null | undefined) {
    this.props.description = description
    this.touch()
  }

  get playersLimit() {
    return this.props.playersLimit
  }

  set playersLimit(playersLimit: number | null | undefined) {
    this.props.playersLimit = playersLimit
    this.touch()
  }

  get systemName() {
    return this.props.systemName
  }

  set systemName(systemName: string | null | undefined) {
    this.props.systemName = systemName
    this.touch()
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  set avatarUrl(avatarUrl: string | null | undefined) {
    this.props.avatarUrl = avatarUrl
    this.touch()
  }

  get minAge() {
    return this.props.minAge
  }

  set minAge(minAge: number | null | undefined) {
    this.props.minAge = minAge
    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(type: TabletopType | null | undefined) {
    this.props.type = type
    this.touch()
  }

  get tabletopPlayers() {
    return this.props.tabletopPlayers
  }

  set tabletopPlayers(tabletopPlayers: TabletopPlayer[]) {
    this.props.tabletopPlayers = tabletopPlayers
    this.touch()
  }

  get tabletopMapMarks() {
    return this.props.tabletopMapMarks
  }

  set tabletopMapMarks(tabletopMapMarks: TabletopMapMark[]) {
    this.props.tabletopMapMarks = tabletopMapMarks
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: TabletopProps, id?: UniqueEntityID) {
    const tabletop = new Tabletop(props, id)

    return tabletop
  }
}
