import { Timezone } from 'src/domain/tabletop/enterprise/entities/timezone'

export class TimezonePresenter {
  static toHTTP(timezone: Timezone | null) {
    if (timezone === null) {
      return {}
    }

    return {
      id: timezone.id.toString(),
      timezone: timezone.timezone,
      utc: timezone.utc,
      name: timezone.name,
    }
  }
}
