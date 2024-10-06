import { TabletopSystem } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-system'

export class TabletopSystemPresenter {
  static toHTTP(tabletopsystem: TabletopSystem | null) {
    if (tabletopsystem === null) {
      return {}
    }

    return {
      id: tabletopsystem.id.toString(),
      name: tabletopsystem.name ?? null,
    }
  }
}
