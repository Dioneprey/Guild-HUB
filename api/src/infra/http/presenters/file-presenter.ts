import { File } from 'src/domain/tabletop/enterprise/entities/file'

export class FilePresenter {
  static toHTTP(file: File | null) {
    if (file === null) {
      return {}
    }

    return {
      id: file.id.toString(),
      name: file.name ?? null,
      key: file.key ?? null,
      path: file.path ?? null,
    }
  }
}
