import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { ChatPlayer } from './chat-player'
import { ChatMessage } from './chat-message'

export interface ChatProps {
  chatPlayer: ChatPlayer[]
  chatmessage: ChatMessage[]
  createdAt: Date
}

export class Chat extends Entity<ChatProps> {
  get chatPlayer() {
    return this.props.chatPlayer
  }

  set chatPlayer(chatPlayer: ChatPlayer[]) {
    this.props.chatPlayer = chatPlayer
  }

  get chatmessage() {
    return this.props.chatmessage
  }

  set chatmessage(chatmessage: ChatMessage[]) {
    this.props.chatmessage = chatmessage
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<ChatProps, 'createdAt'>, id?: UniqueEntityID) {
    const chat = new Chat(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return chat
  }
}
