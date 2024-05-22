import { Tabletop } from '../../enterprise/entities/tabletop/tabletop'
import { TabletopPlayer } from '../../enterprise/entities/tabletop/tabletop-player'

export interface TabletopRepositoryFindByIdProps {
  id: string
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
export abstract class TabletopRepository {
  abstract findById({
    id,
    include,
  }: TabletopRepositoryFindByIdProps): Promise<Tabletop | null>

  abstract findAllByPlayerId({
    playerId,
    include,
  }: TabletopRepositoryFindAllByPlayerIdProps): Promise<Tabletop[]>

  abstract create(tabletop: Tabletop): Promise<void>
  abstract createTabletopLanguage({
    tabletopId,
    language,
  }: {
    tabletopId: string
    language: number[]
  }): Promise<void>

  abstract createTabletopPlayers(
    tabletopPlayers: TabletopPlayer[],
  ): Promise<void>

  abstract save(tabletop: Tabletop): Promise<void>
}
