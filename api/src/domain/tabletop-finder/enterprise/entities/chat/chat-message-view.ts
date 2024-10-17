import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface ChatMessageViewProps {
  messageId: UniqueEntityID
  viewerId: UniqueEntityID
  createdAt: Date
}

export class ChatMessageView extends Entity<ChatMessageViewProps> {
  get messageId() {
    return this.props.messageId
  }

  set messageId(messageId: UniqueEntityID) {
    this.props.messageId = messageId
  }

  get viewerId() {
    return this.props.viewerId
  }

  set viewerId(viewerId: UniqueEntityID) {
    this.props.viewerId = viewerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ChatMessageViewProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const chatmessageview = new ChatMessageView(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return chatmessageview
  }
}
