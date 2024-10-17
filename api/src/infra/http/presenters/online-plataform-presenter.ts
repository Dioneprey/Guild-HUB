import { OnlinePlataform } from 'src/domain/tabletop-finder/enterprise/entities/online-plataform'

export class OnlinePlataformPresenter {
  static toHTTP(onlineplataform: OnlinePlataform | null) {
    if (onlineplataform === null) {
      return {}
    }

    return {
      id: onlineplataform.id.toString(),
      name: onlineplataform.name ?? null,
    }
  }
}
