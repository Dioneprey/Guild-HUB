import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvModule } from './env/env.module'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from './http/http.module'
import { envSchema } from 'src/domain/core/application/env/env-schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
