import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface ChatPlayerProps {
  chatId: UniqueEntityID
  createdAt: Date
}

export class ChatPlayer extends Entity<ChatPlayerProps> {
  get chatId() {
    return this.props.chatId
  }

  set chatId(chatId: UniqueEntityID) {
    this.props.chatId = chatId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ChatPlayerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const chatPlayer = new ChatPlayer(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return chatPlayer
  }
}
