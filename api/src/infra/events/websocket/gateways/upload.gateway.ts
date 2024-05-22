import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: '*',
  namespace: '/io',
})
export class UploadGateway {
  @WebSocketServer() server: Server

  handleEvent({
    userId,
    url,
    id,
  }: {
    userId: string
    url: string
    id: string
  }): void {
    this.server.to(userId).emit('upload-finished', { url, id })
  }
}
