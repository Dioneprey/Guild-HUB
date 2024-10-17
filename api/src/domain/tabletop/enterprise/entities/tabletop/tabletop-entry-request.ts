import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { Player } from '../player/player'

export interface TabletopEntryRequestProps {
  tabletopId: UniqueEntityID
  playerId: UniqueEntityID
  player?: Player | null
  createdAt: Date
}

export class TabletopEntryRequest extends Entity<TabletopEntryRequestProps> {
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
    props: Optional<TabletopEntryRequestProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const tabletopEntryRequest = new TabletopEntryRequest(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return tabletopEntryRequest
  }
}
