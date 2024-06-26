import { Prisma, TabletopUsers as PrismaTabletopPlayers } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TabletopPlayer } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop-player'
import {
  PlayerWithInclude,
  PrismaPlayerMapper,
} from '../player/prisma-player-mapper'

export class PrismaTabletopPlayerMapper {
  static toDomain(
    raw: PrismaTabletopPlayers & {
      player?: PlayerWithInclude
    },
  ): TabletopPlayer {
    return TabletopPlayer.create(
      {
        tabletopId: new UniqueEntityID(raw.tabletopId),
        playerId: new UniqueEntityID(raw.userId),
        player: raw.player
          ? PrismaPlayerMapper.toDomain(raw.player)
          : undefined,
        createdAt: raw.createdAt,
        gameMaster: raw.gameMaster,
      },
      new UniqueEntityID(raw.id.toString()),
    )
  }

  static toPrisma(
    tabletopPlayer: TabletopPlayer,
  ): Prisma.TabletopUsersUncheckedCreateInput {
    return {
      id: Number(tabletopPlayer.id.toString()),
      tabletopId: tabletopPlayer.tabletopId.toString(),
      userId: tabletopPlayer.playerId.toString(),
      createdAt: tabletopPlayer.createdAt,
    }
  }
}
