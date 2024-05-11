import { Player } from '../../enterprise/entities/player'

export interface PlayerRepositoryFindByUniqueFieldProps {
  key: 'id' | 'email'
  value: string
}

export abstract class PlayerRepository {
  abstract findByUniqueField({
    key,
    value,
  }: PlayerRepositoryFindByUniqueFieldProps): Promise<Player | null>

  abstract create(player: Player): Promise<Player>
  abstract save(player: Player): Promise<Player>
}
