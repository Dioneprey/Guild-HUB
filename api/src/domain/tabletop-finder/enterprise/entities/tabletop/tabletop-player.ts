import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { Player } from '../../../../core/enterprise/player/player'

export interface TabletopPlayerProps {
  tabletopId: UniqueEntityID
  playerId: UniqueEntityID
  gameMaster?: boolean | null
  player?: Player | null
  createdAt: Date
}

export class TabletopPlayer extends Entity<TabletopPlayerProps> {
  get tabletopId() {
    return this.props.tabletopId
  }

  set tabletopId(tabletopId: UniqueEntityID) {
    this.props.tabletopId = tabletopId
  }

  get playerId() {
    return this.props.playerId
  }

  set playerId(playerId: UniqueEntityID) {
    this.props.playerId = playerId
  }

  get gameMaster() {
    return this.props.gameMaster
  }

  set gameMaster(gameMaster: boolean | undefined | null) {
    this.props.gameMaster = gameMaster
  }

  get player() {
    return this.props.player
  }

  set player(player: Player | undefined | null) {
    this.props.player = player
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<TabletopPlayerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletopPlayer = new TabletopPlayer(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return tabletopPlayer
  }
}
