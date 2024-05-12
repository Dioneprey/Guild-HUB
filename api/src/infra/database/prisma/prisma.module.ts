// mongoose.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PlayerRepository } from 'src/domain/tabletop/application/repositories/player-repository'
import { PrismaPlayerRepository } from './repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PlayerRepository,
      useClass: PrismaPlayerRepository,
    },
  ],
  exports: [PrismaService, PlayerRepository],
})
export class PrismaModule {}
