import {
  Prisma,
  User as PrismaPlayer,
  GenderOptions as PrismaGenderOptions,
  RoleOptions as PrismaRoleOptions,
} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  GenderOptions,
  Player,
  RoleOptions,
} from 'src/domain/tabletop/enterprise/entities/player'

export class PrismaPlayerMapper {
  static toDomain(raw: PrismaPlayer): Player {
    const role = raw?.role ? RoleOptions[raw.role] : RoleOptions.user
    const gender = raw.gender ? GenderOptions[raw.gender] : null

    return Player.create(
      {
        ...raw,
        gender,
        role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(player: Player): Prisma.UserUncheckedCreateInput {
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
      avatarFileId: player.avatarFileId ? Number(player.avatarFileId) : null,
      cityId: player.cityId,
      countryId: player.countryId,
      birthdate: player.birthdate,
      registrationValidateCode: player.registrationValidateCode,
      registrationCompletedAt: player.registrationCompletedAt,
      registrationValidatedAt: player.registrationValidatedAt,
      role,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    }
  }
}
