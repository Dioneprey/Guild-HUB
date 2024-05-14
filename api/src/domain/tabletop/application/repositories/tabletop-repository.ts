import { Tabletop } from '../../enterprise/entities/tabletop'

export abstract class TabletopRepository {
  abstract findById(id: string): Promise<Tabletop | null>

  abstract create(tabletop: Tabletop): Promise<Tabletop>
  abstract save(tabletop: Tabletop): Promise<Tabletop>
}
