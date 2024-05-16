import { TabletopType as PrismaTabletopType } from '@prisma/client'
import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop'
import { TabletopPlayerPresenter } from './tabletop-player-presenter'

export class TabletopPresenter {
  static toHTTP(tabletop: Tabletop | null) {
    if (tabletop === null) {
      return {}
    }

    return {
      id: tabletop.id.toString(),
      ownerId: tabletop.ownerId.toString(),
      type: tabletop.type ? PrismaTabletopType[tabletop.type] : null,
      name: tabletop.name,
      description: tabletop.description,
      playersLimit: tabletop.playersLimit,
      systemName: tabletop.systemName,
      avatarUrl: tabletop.avatarUrl,
      minAge: tabletop.minAge,
      tabletopPlayers: tabletop.tabletopPlayers
        ? tabletop.tabletopPlayers.map(TabletopPlayerPresenter.toHTTP)
        : [],
      createdAt: tabletop.createdAt,
      updatedAt: tabletop.updatedAt,
    }
  }
}
