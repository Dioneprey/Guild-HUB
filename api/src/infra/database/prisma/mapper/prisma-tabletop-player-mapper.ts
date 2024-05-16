import {
  Prisma,
  TabletopUsers as PrismaTabletopPlayers,
  User as PrismaPlayer,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop-player'
import { PrismaPlayerMapper } from './prisma-player-mapper'

export class PrismaTabletopPlayerMapper {
  static toDomain(
    raw: PrismaTabletopPlayers & {
      player?: PrismaPlayer
    },
  ): TabletopPlayer {
    return TabletopPlayer.create(
      {
        playerId: new UniqueEntityID(raw.userId),
        player: raw.player
          ? PrismaPlayerMapper.toDomain(raw.player)
          : undefined,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.tabletopId),
    )
  }

  static toPrisma(
    tabletopPlayer: TabletopPlayer,
  ): Prisma.TabletopUsersUncheckedCreateInput {
    return {
      tabletopId: tabletopPlayer.id.toString(),
      userId: tabletopPlayer.playerId.toString(),
      createdAt: tabletopPlayer.createdAt,
    }
  }
}
