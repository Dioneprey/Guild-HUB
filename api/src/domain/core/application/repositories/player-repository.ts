import { Player } from '../../enterprise/player/player'

export interface PlayerRepositoryFindByUniqueFieldProps {
  key: 'id' | 'email'
  value: string
}

export abstract class PlayerRepository {
  abstract findByUniqueField({
    key,
    value,
  }: PlayerRepositoryFindByUniqueFieldProps): Promise<Player | null>

  abstract create(player: Player): Promise<void>
  abstract createPlayerLanguage({
    playerId,
    language,
  }: {
    playerId: string
    language: number[]
  }): Promise<void>

  abstract save(player: Player): Promise<void>
}
