import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface PlayerFriendRequestProps {
  requesterId: UniqueEntityID
  receiverId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class PlayerFriendRequest extends Entity<PlayerFriendRequestProps> {
  get requesterId() {
    return this.props.requesterId
  }

  set requesterId(requesterId: UniqueEntityID) {
    this.props.requesterId = requesterId
    this.touch()
  }

  get receiverId() {
    return this.props.receiverId
  }

  set receiverId(receiverId: UniqueEntityID) {
    this.props.receiverId = receiverId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<PlayerFriendRequestProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const playerFriendRequest = new PlayerFriendRequest(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return playerFriendRequest
  }
}
