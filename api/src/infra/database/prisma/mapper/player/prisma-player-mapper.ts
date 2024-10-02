import {
  Prisma,
  GenderOptions as PrismaGenderOptions,
  RoleOptions as PrismaRoleOptions,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  GenderOptions,
  Player,
  RoleOptions,
} from 'src/domain/tabletop/enterprise/entities/player/player'
import { PrismaFileMapper } from '../prisma-file-mapper'
import { PrismaLanguageMapper } from '../prisma-language-mapper'

export type PlayerWithInclude = Prisma.PlayerGetPayload<{
  include: {
    playerLanguage: {
      select: {
        language: true
      }
    }
    avatarFile?: true
  }
}>

export class PrismaPlayerMapper {
  static toDomain(raw: PlayerWithInclude): Player {
    const role = raw?.role ? RoleOptions[raw.role] : RoleOptions.user
    const gender = raw.gender ? GenderOptions[raw.gender] : null

    return Player.create(
      {
        name: raw.name ?? '',
        nickname: raw.nickname,
        bio: raw.bio,
        gender,
        email: raw.email,
        password: raw.password,
        avatarFileId: raw.avatarFileId ? raw.avatarFileId : null,
        cityId: raw.cityId,
        countryId: raw.countryId,
        birthdate: raw.birthdate,
        registrationCompletedAt: raw.registrationCompletedAt,
        registrationValidatedAt: raw.registrationValidatedAt,
        role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        avatarFile: raw.avatarFile
          ? PrismaFileMapper.toDomain(raw.avatarFile)
          : null,
        playerLanguage: raw.playerLanguage
          ? raw.playerLanguage.map((item) =>
              PrismaLanguageMapper.toDomain(item.language),
            )
          : null,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(player: Player): Prisma.PlayerUncheckedCreateInput {
    const role = player?.role
      ? PrismaRoleOptions[player.role]
      : PrismaRoleOptions.U
    const gender = player.gender ? PrismaGenderOptions[player.gender] : null

    return {
      id: player.id.toString(),
      name: player.name,
      nickname: player.nickname,
      bio: player.bio,
      gender,
      email: player.email,
      password: player.password,
      avatarFileId: player.avatarFileId ? player.avatarFileId : null,
      cityId: player.cityId,
      countryId: player.countryId,
      birthdate: player.birthdate,
      registrationCompletedAt: player.registrationCompletedAt,
      registrationValidatedAt: player.registrationValidatedAt,
      role,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    }
  }
}
