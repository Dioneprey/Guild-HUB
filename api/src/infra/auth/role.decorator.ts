import { SetMetadata } from '@nestjs/common'
import { RoleOptions } from 'src/domain/core/enterprise/player/player'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RoleOptions[]) => SetMetadata(ROLES_KEY, roles)
