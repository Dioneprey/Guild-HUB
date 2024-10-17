import { Language } from 'src/domain/core/enterprise/language'

export class LanguagePresenter {
  static toHTTP(language: Language | null) {
    if (language === null) {
      return {}
    }

    return {
      id: language.id.toString(),
      name: language.name ?? null,
    }
  }
}
