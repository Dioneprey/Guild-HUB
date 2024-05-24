import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: '*',
  namespace: '/io',
})
export class NotificationGateway {
  @WebSocketServer() server: Server

  handleEvent({ userId }: { userId: string }): void {
    this.server.to(userId).emit('new-notification')
  }
}
