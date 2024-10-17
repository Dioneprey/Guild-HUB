import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { Public } from 'src/infra/auth/public'
import { GetTabletopDetailsUseCase } from 'src/domain/tabletop-finder/application/use-cases/get-tabletop-details'
import { TabletopPresenter } from '../../presenters/tabletop-presenter'

@Controller('/tabletops/:slug')
export class GetTabletopDetailsController {
  constructor(private readonly getTabletopDetails: GetTabletopDetailsUseCase) {}

  @Get()
  @Public()
  async handle(@Param('slug') slug: string) {
    const result = await this.getTabletopDetails.execute({
      slug,
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
