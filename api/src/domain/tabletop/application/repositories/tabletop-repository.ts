import { Tabletop } from '../../enterprise/entities/tabletop/tabletop'

export interface TabletopRepositoryFindByIdProps {
  id: string
  include?: {
    tabletopPlayers?: boolean
  }
}
export abstract class TabletopRepository {
  abstract findById({
    id,
    include,
  }: TabletopRepositoryFindByIdProps): Promise<Tabletop | null>

  abstract create(tabletop: Tabletop): Promise<void>
  abstract createTabletopLanguage({
    tabletopId,
    language,
  }: {
    tabletopId: string
    language: number[]
  }): Promise<void>

  abstract save(tabletop: Tabletop): Promise<void>
}
