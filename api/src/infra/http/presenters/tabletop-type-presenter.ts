import { TabletopType } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-type'

export class TabletopTypePresenter {
  static toHTTP(tabletoptype: TabletopType | null) {
    if (tabletoptype === null) {
      return {}
    }

    return {
      id: tabletoptype.id.toString(),
      name: tabletoptype.name ?? null,
    }
  }
}
