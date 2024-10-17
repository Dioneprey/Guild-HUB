import { PaginationProps, PaginationResponse } from 'src/core/types/pagination'
import {
  Tabletop,
  TabletopCadence,
  TabletopExpertise,
} from '../../enterprise/entities/tabletop/tabletop'
import { TabletopPlayer } from '../../enterprise/entities/tabletop/tabletop-player'

export interface TabletopRepositoryFindByUniqueFieldProps {
  key: 'id' | 'slug'
  value: string
  include?: {
    tabletopPlayers?: boolean
  }
}

interface TabletopRepositoryFindAllFilters {
  online?: boolean
  countryId?: string
  stateId?: string
  cityId?: string
  playersLimit?: number
  onlyOpenSlots?: boolean
  withGameMaster?: boolean
  minAge?: number
  onlyVerifiedTabletop?: boolean
  tabletopCadence?: TabletopCadence
  tabletopExpertise?: TabletopExpertise
  tabletopTypeId?: number[]
  tabletopSystemId?: number[]
  timezoneId?: number
  tabletopLanguageId?: number[]
}
export interface TabletopRepositoryFindAllProps
  extends PaginationProps<TabletopRepositoryFindAllFilters> {
  include?: {
    tabletopPlayers?: boolean
  }
}

export interface TabletopRepositoryFindAllByPlayerIdProps {
  playerId: string
  include?: {
    tabletopPlayers?: boolean
  }
}

export interface TabletopRepositoryCreateProps {
  tabletop: Tabletop
  language: number[]
  tabletopPlayer: TabletopPlayer
}
export abstract class TabletopRepository {
  abstract findByUniqueField({
    key,
    value,
    include,
  }: TabletopRepositoryFindByUniqueFieldProps): Promise<Tabletop | null>

  abstract findAll({
    pageIndex,
    filters,
  }: TabletopRepositoryFindAllProps): Promise<PaginationResponse<Tabletop>>

  abstract findAllByPlayerId({
    playerId,
    include,
  }: TabletopRepositoryFindAllByPlayerIdProps): Promise<Tabletop[]>

  abstract create({
    tabletop,
    language,
    tabletopPlayer,
  }: TabletopRepositoryCreateProps): Promise<void>

  abstract updateTabletopLanguage({
    tabletopId,
    language,
  }: {
    tabletopId: string
    language: number[]
  }): Promise<void>

  abstract updateTabletopPlayers(
    tabletopPlayers: TabletopPlayer[],
  ): Promise<void>

  abstract save(tabletop: Tabletop): Promise<void>
}
