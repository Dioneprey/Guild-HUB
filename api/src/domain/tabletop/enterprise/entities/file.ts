import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface FileProps {
  name?: string | null
}

export class File extends Entity<FileProps> {
  get name() {
    return this.props.name
  }

  set name(name: string | undefined | null) {
    this.props.name = name
  }

  static create(props: FileProps, id?: UniqueEntityID) {
    const file = new File(props, id)

    return file
  }
}
