import { Player } from 'src/domain/tabletop/enterprise/entities/player'
import { LanguagePresenter } from './language-presenter'
import { FilePresenter } from './file-presenter'

export class PlayerPresenter {
  static toHTTP(player: Player | null) {
    if (player === null) {
      return {}
    }

    return {
      id: player.id.toString() ?? null,
      name: player.name ?? null,
      nickname: player.nickname ?? null,
      bio: player.bio ?? null,
      player: player.gender ?? null,
      email: player.email ?? null,
      avatarFile: player.avatarFile
        ? FilePresenter.toHTTP(player.avatarFile)
        : null,
      cityId: player.cityId ?? null,
      countryId: player.countryId ?? null,
      birthdate: player.birthdate ?? null,
      registrationValidateCode: player.registrationValidateCode ?? null,
      registrationCompletedAt: player.registrationCompletedAt ?? null,
      registrationValidatedAt: player.registrationValidatedAt ?? null,
      role: player.role ?? null,
      playerLanguage: player.playerLanguage
        ? player.playerLanguage.map(LanguagePresenter.toHTTP)
        : null,
      createdAt: player.createdAt ?? null,
      updatedAt: player.updatedAt ?? null,
    }
  }
}
