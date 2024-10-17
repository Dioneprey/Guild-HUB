import { TabletopPlayer } from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop-player'
import { PlayerPresenter } from './player-presenter'

export class TabletopPlayerPresenter {
  static toHTTP(tabletopPlayer: TabletopPlayer | null) {
    if (tabletopPlayer === null) {
      return {}
    }

    return {
      id: tabletopPlayer.id.toString(),
      tabletopId: tabletopPlayer.tabletopId.toString(),
      playerId: tabletopPlayer.playerId.toString(),
      player: tabletopPlayer?.player
        ? PlayerPresenter.toHTTP(tabletopPlayer.player)
        : null,
      gameMaster: tabletopPlayer.gameMaster ?? null,
      createdAt: tabletopPlayer.createdAt ?? null,
    }
  }
}
