import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: '*',
  namespace: '/io',
})
export class NotificationGateway {
  @WebSocketServer() server: Server

  handleEvent({ playerId }: { playerId: string }): void {
    this.server.to(playerId).emit('new-notification')
  }
}
