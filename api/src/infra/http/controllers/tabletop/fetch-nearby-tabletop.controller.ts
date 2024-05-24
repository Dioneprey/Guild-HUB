import { z } from 'zod'
import { BadRequestException, Query, Controller, Get } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { FetchNearbyTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-nearby-tabletop'
import { Public } from 'src/infra/auth/public'
import { TabletopLocationPresenter } from '../../presenters/tabletop-location-presenter'

const fetchNearbyTabletopQuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  distanceRangeInKm: z.coerce.number().optional().default(10),
  onlyOpenSlots: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
  minAge: z.coerce.number().optional(),
  onlyVerifiedTabletop: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
})

type FetchNearbyTabletopQuerySchema = z.infer<
  typeof fetchNearbyTabletopQuerySchema
>
const queryValidationPipe = new ZodValidationPipe(
  fetchNearbyTabletopQuerySchema,
)

@Controller('/tabletops/location')
export class FetchNearbyTabletopController {
  constructor(
    private readonly fetchNearbyTabletop: FetchNearbyTabletopUseCase,
  ) {}

  @Get()
  @Public()
  async handle(
    @Query(queryValidationPipe) query: FetchNearbyTabletopQuerySchema,
  ) {
    const {
      latitude,
      longitude,
      distanceRangeInKm,
      minAge,
      onlyOpenSlots,
      onlyVerifiedTabletop,
    } = fetchNearbyTabletopQuerySchema.parse(query)

    const result = await this.fetchNearbyTabletop.execute({
      latitude,
      longitude,
      filters: {
        distanceRangeInKm,
        minAge,
        onlyOpenSlots,
        onlyVerifiedTabletop,
      },
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { tabletopLocation } = result.value

    return {
      tabletopLocation: tabletopLocation.map(TabletopLocationPresenter.toHTTP),
    }
  }
}
