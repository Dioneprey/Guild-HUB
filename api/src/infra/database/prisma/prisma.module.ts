// mongoose.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PlayerRepository } from 'src/domain/core/application/repositories/player-repository'
import { PrismaTabletopRepository } from './repositories/tabletop-finder/prisma-tabletop-repository'
import { PrismaTabletopLocationRepository } from './repositories/tabletop-finder/prisma-tabletop-location-repository'
import { TabletopLocationRepository } from 'src/domain/tabletop-finder/application/repositories/tabletop-location-repository'
import { TabletopRepository } from 'src/domain/tabletop-finder/application/repositories/tabletop-repository'
import { PrismaFileRepository } from './repositories/core/prisma-file.repository'
import { FileRepository } from 'src/domain/core/application/repositories/file.repository'
import { PrismaPlayerRepository } from './repositories/core/prisma-player-repository'
import { AccountRepository } from 'src/domain/core/application/repositories/account-repository'
import { PrismaAccountRepository } from './repositories/core/prisma-account.repository'
import { TokenRepository } from 'src/domain/core/application/repositories/token-repository'
import { PrismaTokenRepository } from './repositories/core/prisma-token.repository'

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
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: TokenRepository,
      useClass: PrismaTokenRepository,
    },
  ],
  exports: [
    PrismaService,
    PlayerRepository,
    TabletopRepository,
    TabletopLocationRepository,
    FileRepository,
    AccountRepository,
    TokenRepository,
  ],
})
export class PrismaModule {}
