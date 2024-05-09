import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { ChatMessageView } from './chat-message-view'

export interface ChatMessageProps {
  chatId: UniqueEntityID
  senderId: UniqueEntityID
  content?: string | null
  imageUrl?: string | null
  chatMessageView: ChatMessageView[]
  createdAt: Date
}

export class ChatMessage extends Entity<ChatMessageProps> {
  get chatId() {
    return this.props.chatId
  }

  set chatId(chatId: UniqueEntityID) {
    this.props.chatId = chatId
  }

  get senderId() {
    return this.props.senderId
  }

  set senderId(senderId: UniqueEntityID) {
    this.props.senderId = senderId
  }

  get content() {
    return this.props.content
  }

  set content(content: string | undefined | null) {
    this.props.content = content
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  set imageUrl(imageUrl: string | undefined | null) {
    this.props.imageUrl = imageUrl
  }

  get chatMessageView() {
    return this.props.chatMessageView
  }

  set chatMessageView(chatMessageView: ChatMessageView[]) {
    this.props.chatMessageView = chatMessageView
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ChatMessageProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const chatmessage = new ChatMessage(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        chatMessageView: props.chatMessageView ?? [],
      },
      id,
    )

    return chatmessage
  }
}
