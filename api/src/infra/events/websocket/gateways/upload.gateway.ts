import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: '*',
  namespace: '/io',
})
export class UploadGateway {
  @WebSocketServer() server: Server

  handleEvent({
    playerId,
    url,
    key,
  }: {
    playerId: string
    url: string
    key: string
  }): void {
    this.server.to(playerId).emit('upload-finished', { url, key })
  }
}
