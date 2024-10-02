import { UseCaseError } from 'src/core/errors/use-case-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Resource "${identifier}" already exists.`)
  }
}
