import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FetchPlayerTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-player-tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { TabletopPresenter } from '../../presenters/tabletop-presenter'

@Controller('/tabletops/player')
export class FetchPlayerTabletopController {
  constructor(
    private readonly fetchPlayerTabletop: FetchPlayerTabletopUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const playerId = user.sub

    const result = await this.fetchPlayerTabletop.execute({
      playerId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { tabletops } = result.value

    return {
      tabletops: tabletops.map(TabletopPresenter.toHTTP),
    }
  }
}
