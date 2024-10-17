import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { EditTabletopLocationUseCase } from 'src/domain/tabletop-finder/application/use-cases/edit-tabletop-location'

const editTabletopLocationBodySchema = z.object({
  tabletopId: z.string(),
  tabletopLocationData: z.object({
    title: z.string().optional(),
    postalCode: z.string().optional(),
    cityId: z.string().optional(),
    countryId: z.string().optional(),
    streetName: z.string().optional(),
    streetNumber: z.string().optional(),
    neighborhood: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
})

type EditTabletopLocationBodySchema = z.infer<
  typeof editTabletopLocationBodySchema
>
const bodyValidationPipe = new ZodValidationPipe(editTabletopLocationBodySchema)

@Controller('/tabletops/location/:tabletopLocationId')
export class EditTabletopLocationController {
  constructor(
    private readonly editTabletopLocation: EditTabletopLocationUseCase,
  ) {}

  @Patch()
  @HttpCode(201)
  async handle(
    @Param('tabletopLocationId') tabletopLocationId: string,
    @Body(bodyValidationPipe) body: EditTabletopLocationBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const { tabletopId, tabletopLocationData } =
      editTabletopLocationBodySchema.parse(body)

    const result = await this.editTabletopLocation.execute({
      playerId: userId,
      tabletopLocationId,
      tabletopId,
      tabletopLocationData,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
