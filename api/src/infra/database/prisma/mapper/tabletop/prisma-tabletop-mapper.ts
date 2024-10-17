import {
  Prisma,
  TabletopExpertise as PrismaTabletopExpertise,
  TabletopCadence as PrismaTabletopCadence,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  Tabletop,
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopSystemMapper } from './prisma-tabletop-system-mapper'
import { PrismaFileMapper } from '../prisma-file-mapper'
import { PrismaTabletopPlayerMapper } from './prisma-tabletop-player-mapper'
import { PrismaOnlinePlataformMapper } from '../prisma-online-plataform-mapper'
import { PrismaTimezoneMapper } from '../prisma-timezone-mapper'
import { PrismaTabletopLocationMapper } from './prisma-tabletop-location-mapper'
import { PrismaLanguageMapper } from '../prisma-language-mapper'
import { PrismaTabletopTypeMapper } from './prisma-tabletop-type-mapper'

type TabletopWithInclude = Prisma.TabletopGetPayload<{
  include: {
    tabletopPlayers?: {
      include: {
        player: true
      }
    }
    tabletopSystem: true
    tabletopType: true
    tabletopLanguage: {
      select: {
        language: true
      }
    }
    tabletopLocation: true
    avatarFile: true
    coverFile: true
    onlinePlataform: true
    timezone: true
  }
}>

export class PrismaTabletopMapper {
  static toDomain(raw: TabletopWithInclude): Tabletop {
    return Tabletop.create(
      {
        ownerId: new UniqueEntityID(raw.ownerId),
        name: raw.name ?? '',
        slug: raw.slug,
        description: raw.description,
        playersLimit: raw.playersLimit,
        tabletopTypeId: raw.tabletopTypeId,
        tabletopType: raw.tabletopType
          ? PrismaTabletopTypeMapper.toDomain(raw.tabletopType)
          : null,
        tabletopSystem: raw.tabletopSystem
          ? PrismaTabletopSystemMapper.toDomain(raw.tabletopSystem)
          : null,
        expertiseLevel: raw.expertiseLevel
          ? TabletopExpertise[raw.expertiseLevel]
          : null,
        cadence: raw.cadence ? TabletopCadence[raw.cadence] : null,
        tabletopSystemId: raw.tabletopSystemId,
        avatarFileId: raw.avatarFileId,
        avatarFile: raw.avatarFile
          ? PrismaFileMapper.toDomain(raw.avatarFile)
          : null,
        coverFileId: raw.coverFileId,
        coverFile: raw.coverFile
          ? PrismaFileMapper.toDomain(raw.coverFile)
          : null,
        tabletopPlayers: raw.tabletopPlayers
          ? raw.tabletopPlayers.map(PrismaTabletopPlayerMapper.toDomain)
          : null,
        minAge: raw.minAge,
        communication: raw.communication
          ? TabletopCommunicationType[raw.communication]
          : null,
        onlinePlataformId: raw.onlinePlataformId,
        onlinePlataform: raw.onlinePlataform
          ? PrismaOnlinePlataformMapper.toDomain(raw.onlinePlataform)
          : null,
        timezoneId: raw.timezoneId,
        timezone: raw.timezone
          ? PrismaTimezoneMapper.toDomain(raw.timezone)
          : null,
        tabletopLanguage: raw.tabletopLanguage
          ? raw.tabletopLanguage.map((item) =>
              PrismaLanguageMapper.toDomain(item.language),
            )
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
      tabletopTypeId: tabletop.tabletopTypeId,
      name: tabletop.name,
      slug: tabletop.slug,
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
