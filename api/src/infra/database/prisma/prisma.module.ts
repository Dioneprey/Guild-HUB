// mongoose.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PlayerRepository } from 'src/domain/tabletop/application/repositories/player-repository'
import { PrismaTabletopRepository } from './repositories/prisma-tabletop-repository'
import { PrismaTabletopLocationRepository } from './repositories/prisma-tabletop-location-repository'
import { TabletopLocationRepository } from 'src/domain/tabletop/application/repositories/tabletop-location-repository'
import { TabletopRepository } from 'src/domain/tabletop/application/repositories/tabletop-repository'
import { PrismaFileRepository } from './repositories/prisma-file.repository'
import { FileRepository } from 'src/domain/tabletop/application/repositories/file.repository'
import { PrismaPlayerRepository } from './repositories/prisma-player-repository'
import { AccountRepository } from 'src/domain/tabletop/application/repositories/account-repository'
import { PrismaAccountRepository } from './repositories/prisma-account.repository'
import { TokenRepository } from 'src/domain/tabletop/application/repositories/token-repository'
import { PrismaTokenRepository } from './repositories/prisma-token.repository'

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
