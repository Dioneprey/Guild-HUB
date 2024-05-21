import { Tabletop } from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'

export class TabletopPresenter {
  static toHTTP(tabletop: Tabletop | null) {
    if (tabletop === null) {
      return {}
    }

    return {
      id: tabletop.id.toString(),
      ownerId: tabletop.ownerId.toString(),
      type: tabletop.type ?? null,
      name: tabletop.name ?? null,
      description: tabletop.description ?? null,
      playersLimit: tabletop.playersLimit ?? null,
      tabletopSystemId: tabletop.tabletopSystem?.id.toString() ?? null,
      expertiseLevel: tabletop.expertiseLevel ?? null,
      cadence: tabletop.cadence ?? null,
      avatarFileId: tabletop.avatarFile?.id.toString() ?? null,
      coverFileId: tabletop.coverFile?.id.toString() ?? null,
      online: tabletop.online ?? null,
      minAge: tabletop.minAge ?? null,
      hasDungeonMaster: tabletop.hasDungeonMaster ?? null,
      createdAt: tabletop.createdAt ?? null,
      updatedAt: tabletop.updatedAt ?? null,
    }
  }
}
