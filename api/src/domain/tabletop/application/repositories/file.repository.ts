import { File } from '../../enterprise/entities/file'

export interface FileRepositoryFindByUniqueFieldProps {
  key: 'id' | 'url' | 'key'
  value: string
}

export abstract class FileRepository {
  abstract findByUniqueField({
    key,
    value,
  }: FileRepositoryFindByUniqueFieldProps): Promise<File | null>

  abstract create(file: File): Promise<void>
  abstract delete(file: File): Promise<void>
}
