import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface PlayerFriendProps {
  requesterId: UniqueEntityID
  receiverId: UniqueEntityID
  friendshipStartDate?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class PlayerFriend extends Entity<PlayerFriendProps> {
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

  get friendshipStartDate() {
    return this.props.friendshipStartDate
  }

  set friendshipStartDate(friendshipStartDate: Date | null | undefined) {
    this.props.friendshipStartDate = friendshipStartDate
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
    props: Optional<PlayerFriendProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const playerFriend = new PlayerFriend(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return playerFriend
  }
}
