import { UseCaseError } from 'src/core/errors/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Wrong credentials.')
  }
}
