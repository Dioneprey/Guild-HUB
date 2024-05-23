import {
  Prisma,
  TabletopType as PrismaTabletopType,
  TabletopExpertise as PrismaTabletopExpertise,
  TabletopCadence as PrismaTabletopCadence,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  Tabletop,
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopSystemMapper } from './prisma-tabletop-system-mapper'
import { PrismaFileMapper } from '../prisma-file-mapper'
import { PrismaTabletopPlayerMapper } from './prisma-tabletop-player-mapper'
import { PrismaOnlinePlataformMapper } from '../prisma-online-plataform-mapper'
import { PrismaTimezoneMapper } from '../prisma-timezone-mapper'
import { PrismaTabletopLanguageMapper } from './prisma-tabletop-language-mapper'
import { PrismaTabletopLocationMapper } from './prisma-tabletop-location-mapper'

type TabletopWithInclude = Prisma.TabletopGetPayload<{
  include: {
    tabletopUsers?: {
      include: {
        user: true
      }
    }
    tabletopSystem: true
    tabletopLanguage: true
    tabletopLocation: true
    avatarFile: true
    coverFile: true
    onlinePlataform: true
    timezone: true
  }
}>

export class PrismaTabletopMapper {
  static toDomain(raw: TabletopWithInclude): Tabletop {
    const expertiseLevel =
      raw.expertiseLevel === 'B'
        ? TabletopExpertise.beginner
        : raw.expertiseLevel === 'I'
          ? TabletopExpertise.intermediate
          : TabletopExpertise.advanced

    const cadence =
      raw.cadence === 'O'
        ? TabletopCadence.oneShot
        : raw.cadence === 'S'
          ? TabletopCadence.weekly
          : raw.cadence === 'Q'
            ? TabletopCadence.fortnightly
            : TabletopCadence.monthly

    const type =
      raw.type === 'R'
        ? TabletopType.rpg
        : raw.type === 'B'
          ? TabletopType.boardGaming
          : TabletopType.warGaming

    const communication =
      raw.communication === 'A'
        ? TabletopCommunicationType.videoVoice
        : raw.communication === 'B'
          ? TabletopCommunicationType.voice
          : TabletopCommunicationType.text

    return Tabletop.create(
      {
        ownerId: new UniqueEntityID(raw.ownerId),
        type,
        name: raw.name,
        description: raw.description,
        playersLimit: raw.playersLimit,
        tabletopSystem: raw.tabletopSystem
          ? PrismaTabletopSystemMapper.toDomain(raw.tabletopSystem)
          : null,
        expertiseLevel,
        cadence,
        tabletopSystemId: raw.tabletopSystemId,
        avatarFileId: raw.avatarFileId,
        avatarFile: raw.avatarFile
          ? PrismaFileMapper.toDomain(raw.avatarFile)
          : null,
        coverFileId: raw.coverFileId,
        coverFile: raw.coverFile
          ? PrismaFileMapper.toDomain(raw.coverFile)
          : null,
        tabletopPlayers: raw.tabletopUsers
          ? raw.tabletopUsers.map(PrismaTabletopPlayerMapper.toDomain)
          : null,
        minAge: raw.minAge,
        communication,
        onlinePlataformId: raw.onlinePlataformId,
        onlinePlataform: raw.onlinePlataform
          ? PrismaOnlinePlataformMapper.toDomain(raw.onlinePlataform)
          : null,
        timezoneId: raw.timezoneId,
        timezone: raw.timezone
          ? PrismaTimezoneMapper.toDomain(raw.timezone)
          : null,
        tabletopLanguage: raw.tabletopLanguage
          ? raw.tabletopLanguage.map(PrismaTabletopLanguageMapper.toDomain)
          : null,
        online: raw.online,
        hasDungeonMaster: raw.hasDungeonMaster,
        tabletopLocations: raw.tabletopLocation
          ? raw.tabletopLocation.map(PrismaTabletopLocationMapper.toDomain)
          : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(tabletop: Tabletop): Prisma.TabletopUncheckedCreateInput {
    return {
      id: tabletop.id.toString(),
      ownerId: tabletop.ownerId.toString(),
      type: tabletop.type ? PrismaTabletopType[tabletop.type] : null,
      name: tabletop.name,
      description: tabletop.description,
      playersLimit: tabletop.playersLimit,
      tabletopSystemId: tabletop.tabletopSystemId,
      expertiseLevel: tabletop.expertiseLevel
        ? PrismaTabletopExpertise[tabletop.expertiseLevel]
        : null,
      cadence: tabletop.cadence
        ? PrismaTabletopCadence[tabletop.cadence]
        : null,
      avatarFileId: tabletop.avatarFileId,
      coverFileId: tabletop.coverFileId,
      online: tabletop.online,
      minAge: tabletop.minAge,
      hasDungeonMaster: tabletop.hasDungeonMaster,
      onlinePlataformId: tabletop.onlinePlataformId,
      timezoneId: tabletop.timezoneId,
      communication: tabletop.communication,
      createdAt: tabletop.createdAt,
      updatedAt: tabletop.updatedAt,
    }
  }
}
