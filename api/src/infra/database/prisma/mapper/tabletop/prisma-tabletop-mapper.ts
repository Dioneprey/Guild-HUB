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
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { PrismaTabletopSystemMapper } from './prisma-tabletop-system-mapper'
import { PrismaFileMapper } from '../file-mapper'

type TabletopWithInclude = Prisma.TabletopGetPayload<{
  include: {
    tabletopUsers?: {
      include: {
        user: true
      }
    }
    tabletopSystem: true
    avatarFile: true
    coverFile: true
  }
}>

export class PrismaTabletopMapper {
  static toDomain(raw: TabletopWithInclude): Tabletop {
    return Tabletop.create(
      {
        ownerId: new UniqueEntityID(raw.ownerId),
        type: raw.type ? TabletopType[raw.type] : null,
        name: raw.name,
        description: raw.description,
        playersLimit: raw.playersLimit,
        tabletopSystem: raw.tabletopSystem
          ? PrismaTabletopSystemMapper.toDomain(raw.tabletopSystem)
          : null,
        expertiseLevel: raw.expertiseLevel
          ? TabletopExpertise[raw.expertiseLevel]
          : null,
        cadence: raw.cadence ? TabletopCadence[raw.cadence] : null,
        avatarFile: raw.avatarFile
          ? PrismaFileMapper.toDomain(raw.avatarFile)
          : null,
        coverFile: raw.coverFile
          ? PrismaFileMapper.toDomain(raw.coverFile)
          : null,
        minAge: raw.minAge,
        online: raw.online,
        hasDungeonMaster: raw.hasDungeonMaster,
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
      tabletopSystemId: Number(tabletop.tabletopSystem?.id.toString()),
      expertiseLevel: tabletop.expertiseLevel
        ? PrismaTabletopExpertise[tabletop.expertiseLevel]
        : null,
      cadence: tabletop.cadence
        ? PrismaTabletopCadence[tabletop.cadence]
        : null,
      avatarFileId: Number(tabletop.avatarFile?.id.toString()),
      coverFileId: Number(tabletop.coverFile?.id.toString()),
      online: tabletop.online,
      minAge: tabletop.minAge,
      hasDungeonMaster: tabletop.hasDungeonMaster,
      createdAt: tabletop.createdAt,
      updatedAt: tabletop.updatedAt,
    }
  }
}
