import { Module } from '@nestjs/common'
import { NotificationGateway } from './websocket/gateways/notification.gateway'
import { SocketService } from './websocket/socket.service'
import { SocketGateway } from './websocket/gateways/socket.gateway'
import { UploadGateway } from './websocket/gateways/upload.gateway'

@Module({
  providers: [NotificationGateway, SocketService, SocketGateway, UploadGateway],
  exports: [NotificationGateway, UploadGateway],
})
export class EventsModule {}
