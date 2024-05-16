import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop-player'
import { PlayerPresenter } from './player-presenter'

export class TabletopPlayerPresenter {
  static toHTTP(tabletopPlayer: TabletopPlayer | null) {
    if (tabletopPlayer === null) {
      return {}
    }

    return {
      tabletopId: tabletopPlayer.id.toString(),
      playerId: tabletopPlayer.playerId.toString(),
      player: tabletopPlayer?.player
        ? PlayerPresenter.toHTTP(tabletopPlayer.player)
        : null,
      createdAt: tabletopPlayer.createdAt,
    }
  }
}
