import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLocation } from './tabletop-location'
import { Optional } from 'src/core/types/optional'
import { TabletopPlayer } from './tabletop-player'
import { File } from '../file'
import { TabletopSystem } from './tabletop-system'
import { TabletopLanguage } from './tabletop-language'

export enum TabletopType {
  rpg = 'R',
  warGaming = 'W',
  boardGaming = 'B',
}

export enum TabletopExpertise {
  beginner = 'P',
  intermediate = 'O',
  advanced = 'H',
}

export enum TabletopCadence {
  oneShot = 'O',
  weekly = 'S',
  fortnightly = 'Q',
  monthly = 'M',
}

export interface TabletopProps {
  ownerId: UniqueEntityID
  name?: string | null
  description?: string | null
  playersLimit?: number | null
  tabletopSystemId?: number | null
  tabletopLanguage?: TabletopLanguage[] | null
  tabletopSystem?: TabletopSystem | null
  expertiseLevel?: TabletopExpertise | null
  cadence?: TabletopCadence | null
  avatarFileId?: number | null
  avatarFile?: File | null
  coverFileId?: number | null
  coverFile?: File | null
  minAge?: number | null
  hasDungeonMaster?: boolean | null
  type?: TabletopType | null
  online?: boolean | null
  tabletopPlayers?: TabletopPlayer[] | null
  tabletopLocations?: TabletopLocation[] | null
  createdAt: Date
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

  get tabletopSystemId() {
    return this.props.tabletopSystemId
  }

  set tabletopSystemId(tabletopSystemId: number | null | undefined) {
    this.props.tabletopSystemId = tabletopSystemId
    this.touch()
  }

  get tabletopLanguage() {
    return this.props.tabletopLanguage
  }

  set tabletopLanguage(
    tabletopLanguage: TabletopLanguage[] | null | undefined,
  ) {
    this.props.tabletopLanguage = tabletopLanguage
    this.touch()
  }

  get tabletopSystem() {
    return this.props.tabletopSystem
  }

  set tabletopSystem(tabletopSystem: TabletopSystem | null | undefined) {
    this.props.tabletopSystem = tabletopSystem
    this.touch()
  }

  get expertiseLevel() {
    return this.props.expertiseLevel
  }

  set expertiseLevel(expertiseLevel: TabletopExpertise | null | undefined) {
    this.props.expertiseLevel = expertiseLevel
    this.touch()
  }

  get cadence() {
    return this.props.cadence
  }

  set cadence(cadence: TabletopCadence | null | undefined) {
    this.props.cadence = cadence
    this.touch()
  }

  get avatarFileId() {
    return this.props.avatarFileId
  }

  set avatarFileId(avatarFileId: number | null | undefined) {
    this.props.avatarFileId = avatarFileId
    this.touch()
  }

  get avatarFile() {
    return this.props.avatarFile
  }

  set avatarFile(avatarFile: File | null | undefined) {
    this.props.avatarFile = avatarFile
    this.touch()
  }

  get coverFileId() {
    return this.props.coverFileId
  }

  set coverFileId(coverFileId: number | null | undefined) {
    this.props.coverFileId = coverFileId
    this.touch()
  }

  get coverFile() {
    return this.props.coverFile
  }

  set coverFile(coverFile: File | null | undefined) {
    this.props.coverFile = coverFile
    this.touch()
  }

  get minAge() {
    return this.props.minAge
  }

  set minAge(minAge: number | null | undefined) {
    this.props.minAge = minAge
    this.touch()
  }

  get hasDungeonMaster() {
    return this.props.hasDungeonMaster
  }

  set hasDungeonMaster(hasDungeonMaster: boolean | null | undefined) {
    this.props.hasDungeonMaster = hasDungeonMaster
    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(type: TabletopType | null | undefined) {
    this.props.type = type
    this.touch()
  }

  get online() {
    return this.props.online
  }

  set online(online: boolean | null | undefined) {
    this.props.online = online
    this.touch()
  }

  get tabletopPlayers() {
    return this.props.tabletopPlayers
  }

  set tabletopPlayers(tabletopPlayers: TabletopPlayer[] | null | undefined) {
    this.props.tabletopPlayers = tabletopPlayers
    this.touch()
  }

  get tabletopLocations() {
    return this.props.tabletopLocations
  }

  set tabletopLocations(
    tabletopLocations: TabletopLocation[] | null | undefined,
  ) {
    this.props.tabletopLocations = tabletopLocations
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

  static create(
    props: Optional<TabletopProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletop = new Tabletop(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return tabletop
  }
}
