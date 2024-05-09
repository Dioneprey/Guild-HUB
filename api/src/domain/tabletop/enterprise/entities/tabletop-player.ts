import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { Player } from './player'

export interface TabletopPlayerProps {
  playerId: UniqueEntityID
  player: Player
  createdAt: Date
}

export class TabletopPlayer extends Entity<TabletopPlayerProps> {
  get playerId() {
    return this.props.playerId
  }

  set playerId(playerId: UniqueEntityID) {
    this.props.playerId = playerId
  }

  get player() {
    return this.props.player
  }

  set player(player: Player) {
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
