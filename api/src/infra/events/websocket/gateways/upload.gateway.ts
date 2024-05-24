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
    key,
  }: {
    userId: string
    url: string
    key: string
  }): void {
    this.server.to(userId).emit('upload-finished', { url, key })
  }
}
