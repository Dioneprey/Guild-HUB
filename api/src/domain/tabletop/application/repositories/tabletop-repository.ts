import { Tabletop } from '../../enterprise/entities/tabletop'

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

  abstract create(tabletop: Tabletop): Promise<Tabletop>
  abstract save(tabletop: Tabletop): Promise<Tabletop>
}
