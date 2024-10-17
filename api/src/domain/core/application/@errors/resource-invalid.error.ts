import { UseCaseError } from 'src/core/errors/use-case-error'

export class ResourceInvalidError extends Error implements UseCaseError {
  constructor(value: unknown) {
    super(`Invalid resource: ${value}`)
  }
}
