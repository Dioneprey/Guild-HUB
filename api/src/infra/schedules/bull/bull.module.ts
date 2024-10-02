import { BullModule } from '@nestjs/bull'
import { Module, forwardRef } from '@nestjs/common'
import { EnvModule } from 'src/infra/env/env.module'
import { EnvService } from 'src/infra/env/env.service'
import { MailModule } from 'src/infra/mail/mail.module'
import { HttpModule } from 'src/infra/http/http.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import {
  InvalidateTokenProcessor,
  INVALIDATE_TOKEN_QUEUE,
} from './processor/invalidate-token.processor'
import { BullBoardModule } from '@bull-board/nestjs'
import { FastifyAdapter } from '@bull-board/fastify'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import {
  FILES_UPLOAD_QUEUE,
  FilesUploadProcessor,
} from './processor/upload-files.processor'
import { EventsModule } from 'src/infra/events/events.module'

@Module({
  imports: [
    forwardRef(() => HttpModule),
    DatabaseModule,
    MailModule,
    EventsModule,
    BullModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        redis: {
          host: envService.get('REDIS_HOST'),
          port: envService.get('REDIS_PORT'),
        },
      }),
    }),
    // Queues
    BullModule.registerQueue({
      name: INVALIDATE_TOKEN_QUEUE,
    }),
    BullModule.registerQueue({
      name: FILES_UPLOAD_QUEUE,
    }),

    // Bull board
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: FastifyAdapter,
    }),
    BullBoardModule.forFeature({
      name: INVALIDATE_TOKEN_QUEUE,
      adapter: BullAdapter,
    }),
    BullBoardModule.forFeature({
      name: FILES_UPLOAD_QUEUE,
      adapter: BullAdapter,
    }),
  ],
  providers: [InvalidateTokenProcessor, FilesUploadProcessor],
  exports: [BullModule],
})
export class BullConfigModule {}
