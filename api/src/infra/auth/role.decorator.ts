import { SetMetadata } from '@nestjs/common'
import { RoleOptions } from 'src/domain/tabletop/enterprise/entities/player'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RoleOptions[]) => SetMetadata(ROLES_KEY, roles)
