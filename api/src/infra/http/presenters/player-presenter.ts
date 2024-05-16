import { Player } from 'src/domain/tabletop/enterprise/entities/player'

export class PlayerPresenter {
  static toHTTP(player: Player | null) {
    if (player === null) {
      return {}
    }

    return {
      id: player.id.toString(),
      name: player.name,
      nickname: player.nickname,
      email: player.email,
      avatarUrl: player.avatarUrl,
    }
  }
}
