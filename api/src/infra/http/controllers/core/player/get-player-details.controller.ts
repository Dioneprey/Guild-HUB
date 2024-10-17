import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { Public } from 'src/infra/auth/public'
import { PlayerPresenter } from '../../../presenters/player-presenter'
import { GetPlayerDetailsUseCase } from 'src/domain/core/application/use-cases/player/get-player-details'

@Controller('/players/:playerId')
export class GetPlayerDetailsController {
  constructor(private readonly getPlayerDetails: GetPlayerDetailsUseCase) {}

  @Get()
  @Public()
  async handle(@Param('playerId') playerId: string) {
    const result = await this.getPlayerDetails.execute({
      playerId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { player } = result.value

    return {
      player: PlayerPresenter.toHTTP(player),
    }
  }
}
