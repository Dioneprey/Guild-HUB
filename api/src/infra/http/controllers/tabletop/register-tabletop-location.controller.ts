import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { RegisterTabletopLocationUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop-location'

const registerTabletopLocationBodySchema = z.object({
  tabletopId: z.string(),
  tabletopLocationData: z.object({
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

type RegisterTabletopLocationBodySchema = z.infer<
  typeof registerTabletopLocationBodySchema
>
const bodyValidationPipe = new ZodValidationPipe(
  registerTabletopLocationBodySchema,
)

@Controller('/tabletops/location')
export class RegisterTabletopLocationController {
  constructor(
    private readonly registerTabletopLocation: RegisterTabletopLocationUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: RegisterTabletopLocationBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const { tabletopId, tabletopLocationData } =
      registerTabletopLocationBodySchema.parse(body)

    const result = await this.registerTabletopLocation.execute({
      masterId: userId,
      tabletopId,
      tabletopLocationData,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
