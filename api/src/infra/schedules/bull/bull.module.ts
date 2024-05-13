import { BullModule } from '@nestjs/bull'
import { Module, forwardRef } from '@nestjs/common'
import { EnvModule } from 'src/infra/env/env.module'
import { EnvService } from 'src/infra/env/env.service'
import { MailModule } from 'src/infra/mail/mail.module'
import { HttpModule } from 'src/infra/http/http.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { HandleInvalidateCodesProcessor } from './processor/invalidate-codes.processor'

@Module({
  imports: [
    forwardRef(() => HttpModule),
    DatabaseModule,
    MailModule,
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
    BullModule.registerQueue({
      name: 'invalidate-codes-processor',
    }),
  ],
  providers: [HandleInvalidateCodesProcessor],
  exports: [BullModule],
})
export class BullConfigModule {}
