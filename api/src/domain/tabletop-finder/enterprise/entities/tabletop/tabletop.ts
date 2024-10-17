import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopLocation } from './tabletop-location'
import { Optional } from 'src/core/types/optional'
import { TabletopPlayer } from './tabletop-player'
import { File } from '../../../../core/enterprise/file'
import { TabletopSystem } from './tabletop-system'
import { OnlinePlataform } from '../online-plataform'
import { Timezone } from '../../../../core/enterprise/timezone'
import { Language } from '../../../../core/enterprise/language'
import { createSlug } from 'src/core/utils/create-slug'
import { TabletopType } from './tabletop-type'

export enum TabletopExpertise {
  BEGINNER = 'BEGINNER',
  INTERMEDIARY = 'INTERMEDIARY',
  ADVANCED = 'ADVANCED',
}

export enum TabletopCadence {
  ONE_SHOT = 'ONE_SHOT',
  WEEKLY = 'WEEKLY',
  FORTWEEKLY = 'FORTWEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum TabletopCommunicationType {
  VIDEO_VOIP = 'VIDEO_VOIP',
  VOIP = 'VOIP',
  TEXT = 'TEXT',
}
export interface TabletopProps {
  ownerId: UniqueEntityID
  name: string
  slug: string
  description?: string | null
  playersLimit?: number | null
  tabletopTypeId?: number | null
  tabletopType?: TabletopType | null
  tabletopSystemId?: number | null
  tabletopSystem?: TabletopSystem | null
  tabletopLanguage?: Language[] | null
  expertiseLevel?: TabletopExpertise | null
  cadence?: TabletopCadence | null
  avatarFileId?: string | null
  avatarFile?: File | null
  coverFileId?: string | null
  coverFile?: File | null
  minAge?: number | null
  hasDungeonMaster?: boolean | null
  online?: boolean | null
  communication?: TabletopCommunicationType | null
  onlinePlataformId?: number | null
  onlinePlataform?: OnlinePlataform | null
  timezoneId?: number | null
  timezone?: Timezone | null
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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  set slug(slug: string) {
    this.props.slug = slug
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

  set tabletopLanguage(tabletopLanguage: Language[] | null | undefined) {
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

  set avatarFileId(avatarFileId: string | null | undefined) {
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

  set coverFileId(coverFileId: string | null | undefined) {
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

  get tabletopTypeId() {
    return this.props.tabletopTypeId
  }

  set tabletopTypeId(tabletopTypeId: number | null | undefined) {
    this.props.tabletopTypeId = tabletopTypeId
    this.touch()
  }

  get tabletopType() {
    return this.props.tabletopType
  }

  set tabletopType(tabletopType: TabletopType | null | undefined) {
    this.props.tabletopType = tabletopType
    this.touch()
  }

  get online() {
    return this.props.online
  }

  set online(online: boolean | null | undefined) {
    this.props.online = online
    this.touch()
  }

  get communication() {
    return this.props.communication
  }

  set communication(
    communication: TabletopCommunicationType | null | undefined,
  ) {
    this.props.communication = communication
    this.touch()
  }

  get onlinePlataformId() {
    return this.props.onlinePlataformId
  }

  set onlinePlataformId(onlinePlataformId: number | null | undefined) {
    this.props.onlinePlataformId = onlinePlataformId
    this.touch()
  }

  get timezoneId() {
    return this.props.timezoneId
  }

  set timezoneId(timezoneId: number | null | undefined) {
    this.props.timezoneId = timezoneId
    this.touch()
  }

  get onlinePlataform() {
    return this.props.onlinePlataform
  }

  set onlinePlataform(onlinePlataform: OnlinePlataform | null | undefined) {
    this.props.onlinePlataform = onlinePlataform
    this.touch()
  }

  get timezone() {
    return this.props.timezone
  }

  set timezone(timezone: Timezone | null | undefined) {
    this.props.timezone = timezone
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
    props: Optional<TabletopProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const tabletop = new Tabletop(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? createSlug(props.name),
      },
      id,
    )

    return tabletop
  }
}
