import { UseCaseError } from 'src/core/errors/use-case-error'

export class ForbiddenActionError extends Error implements UseCaseError {
  constructor() {
    super('Forbidden action.')
  }
}
