// mongoose.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PlayerRepository } from 'src/domain/tabletop/application/repositories/player-repository'
import { PrismaPlayerRepository } from './repositories/prisma-user-repository'
import { PrismaTabletopRepository } from './repositories/prisma-tabletop-repository'
import { PrismaTabletopLocationRepository } from './repositories/prisma-tabletop-location-repository'
import { TabletopLocationRepository } from 'src/domain/tabletop/application/repositories/tabletop-location-repository'
import { TabletopRepository } from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { PrismaFileRepository } from './repositories/prisma-file.repository'
import { FileRepository } from 'src/domain/tabletop/application/repositories/file.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PlayerRepository,
      useClass: PrismaPlayerRepository,
    },
    {
      provide: TabletopRepository,
      useClass: PrismaTabletopRepository,
    },
    {
      provide: TabletopLocationRepository,
      useClass: PrismaTabletopLocationRepository,
    },
    {
      provide: FileRepository,
      useClass: PrismaFileRepository,
    },
  ],
  exports: [
    PrismaService,
    PlayerRepository,
    TabletopRepository,
    TabletopLocationRepository,
    FileRepository,
  ],
})
export class PrismaModule {}
