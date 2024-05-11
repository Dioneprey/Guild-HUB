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
      email: player.email,
      password: player.password,
      nickname: player.nickname,
      bio: player.bio,
      gender,
      avatarUrl: player.avatarUrl,
      cityId: player.cityId,
      countryId: player.countryId,
      birthdate: player.birthdate,
      registrationCompletedAt: player.registrationCompletedAt,
      role,
    }
  }
}
