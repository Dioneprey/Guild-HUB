import { UseCaseError } from 'src/core/errors/use-case-error'

export class NoAvailableSlotsError extends Error implements UseCaseError {
  constructor() {
    super(`No available slots for new players.`)
  }
}
