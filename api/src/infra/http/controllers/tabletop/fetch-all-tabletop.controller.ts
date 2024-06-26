import { z } from 'zod'
import { BadRequestException, Query, Controller, Get } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { Public } from 'src/infra/auth/public'
import { FetchAllTabletopsUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-all-tabletop'
import { TabletopPresenter } from '../../presenters/tabletop-presenter'
import {
  TabletopCadence,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'

const fetchAllTabletopsQuerySchema = z.object({
  pageIndex: z.coerce.number().default(0),
  online: z.coerce.boolean().optional(),
  countryId: z.string().optional(),
  stateId: z.string().optional(),
  cityId: z.string().optional(),
  playersLimit: z.coerce.number().optional(),
  onlyOpenSlots: z.boolean().optional(),
  withGameMaster: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
  minAge: z.coerce.number().optional(),
  onlyVerifiedTabletop: z.boolean().optional(),
  tabletopType: z.nativeEnum(TabletopType).optional(),
  tabletopSystemId: z.coerce.number().optional(),
  timezoneId: z.coerce.number().optional(),
  tabletopCadence: z.nativeEnum(TabletopCadence).optional(),
  tabletopExpertise: z.nativeEnum(TabletopExpertise).optional(),
  tabletopLanguageId: z.string().optional(),
})

type FetchAllTabletopsQuerySchema = z.infer<typeof fetchAllTabletopsQuerySchema>
const queryValidationPipe = new ZodValidationPipe(fetchAllTabletopsQuerySchema)

@Controller('/tabletops')
export class FetchAllTabletopsController {
  constructor(private readonly fetchAllTabletops: FetchAllTabletopsUseCase) {}

  @Get()
  @Public()
  async handle(
    @Query(queryValidationPipe) query: FetchAllTabletopsQuerySchema,
  ) {
    const {
      pageIndex,
      online,
      countryId,
      stateId,
      cityId,
      playersLimit,
      onlyOpenSlots,
      withGameMaster,
      minAge,
      onlyVerifiedTabletop,
      tabletopType,
      tabletopSystemId,
      tabletopLanguageId,
      timezoneId,
      tabletopCadence,
      tabletopExpertise,
    } = fetchAllTabletopsQuerySchema.parse(query)

    const result = await this.fetchAllTabletops.execute({
      pageIndex,
      filters: {
        online,
        countryId,
        stateId,
        cityId,
        playersLimit,
        onlyOpenSlots,
        withGameMaster,
        minAge,
        onlyVerifiedTabletop,
        tabletopType,
        tabletopSystemId,
        tabletopCadence,
        tabletopExpertise,
        timezoneId,
        tabletopLanguageId: tabletopLanguageId
          ? JSON.parse(tabletopLanguageId).map((id: string) => parseInt(id))
          : undefined,
      },
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { tabletops, totalCount, totalPages } = result.value

    return {
      tabletops: tabletops.map(TabletopPresenter.toHTTP),
      meta: {
        pageIndex: pageIndex ?? 0,
        totalCount,
        totalPages,
      },
    }
  }
}
