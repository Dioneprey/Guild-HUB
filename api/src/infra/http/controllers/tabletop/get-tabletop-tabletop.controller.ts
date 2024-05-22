import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { Public } from 'src/infra/auth/public'
import { GetTabletopDetailsUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/get-tabletop-details'
import { TabletopPresenter } from '../../presenters/tabletop-presenter'

@Controller('/tabletops/:tabletopId')
export class GetTabletopDetailsController {
  constructor(private readonly getTabletopDetails: GetTabletopDetailsUseCase) {}

  @Get()
  @Public()
  async handle(@Param('tabletopId') tabletopId: string) {
    const result = await this.getTabletopDetails.execute({
      tabletopId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { tabletop } = result.value

    return {
      tabletop: TabletopPresenter.toHTTP(tabletop),
    }
  }
}
