import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { FilePresenter } from './file-presenter'
import { TabletopPlayerPresenter } from './tabletop-player-presenter'
import { TabletopLocationPresenter } from './tabletop-location-presenter'
import { TimezonePresenter } from './timezone-presenter'
import { TabletopSystemPresenter } from './tabletop-system-presenter'
import { OnlinePlataformPresenter } from './online-plataform-presenter'
import { LanguagePresenter } from './language-presenter'

export class TabletopPresenter {
  static toHTTP(tabletop: Tabletop | null) {
    if (tabletop === null) {
      return {}
    }

    return {
      id: tabletop.id.toString() ?? null,
      ownerId: tabletop.ownerId.toString() ?? null,
      type: tabletop.type ?? null,
      slug: tabletop.slug ?? null,
      name: tabletop.name ?? null,
      description: tabletop.description ?? null,
      playersLimit: tabletop.playersLimit ?? null,
      expertiseLevel: tabletop.expertiseLevel ?? null,
      cadence: tabletop.cadence ?? null,
      avatarFile: tabletop.avatarFile
        ? FilePresenter.toHTTP(tabletop.avatarFile)
        : null,
      coverFile: tabletop.coverFile
        ? FilePresenter.toHTTP(tabletop.coverFile)
        : null,
      online: tabletop.online ?? null,
      minAge: tabletop.minAge ?? null,
      hasDungeonMaster: tabletop.hasDungeonMaster ?? null,
      communication: tabletop.communication ?? null,
      createdAt: tabletop.createdAt ?? null,
      updatedAt: tabletop.updatedAt ?? null,
      onlinePlataform: tabletop.onlinePlataform
        ? OnlinePlataformPresenter.toHTTP(tabletop.onlinePlataform)
        : null,
      timezone: tabletop.timezone
        ? TimezonePresenter.toHTTP(tabletop.timezone)
        : null,
      tabletopSystem: tabletop.tabletopSystem
        ? TabletopSystemPresenter.toHTTP(tabletop.tabletopSystem)
        : null,
      tabletopPlayer: tabletop.tabletopPlayers
        ? tabletop.tabletopPlayers.map(TabletopPlayerPresenter.toHTTP)
        : null,
      tabletopLocations: tabletop.tabletopLocations
        ? tabletop.tabletopLocations.map(TabletopLocationPresenter.toHTTP)
        : null,
      tabletopLanguage: tabletop.tabletopLanguage
        ? tabletop.tabletopLanguage.map(LanguagePresenter.toHTTP)
        : null,
    }
  }
}
