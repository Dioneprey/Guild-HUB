import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  OTHER = 'OTHER',
}
export interface FileProps {
  name?: string | null
  key: string
  path?: string | null
  type?: FileType | null
  createdAt: Date
}

export class File extends Entity<FileProps> {
  get name() {
    return this.props.name
  }

  set name(name: string | undefined | null) {
    this.props.name = name
  }

  get key() {
    return this.props.key
  }

  set key(key: string) {
    this.props.key = key
  }

  get path() {
    return this.props.path
  }

  set path(path: string | undefined | null) {
    this.props.path = path
  }

  get type() {
    return this.props.type
  }

  set type(type: FileType | undefined | null) {
    this.props.type = type
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<FileProps, 'createdAt'>, id?: UniqueEntityID) {
    const file = new File(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return file
  }
}
