import { z } from 'zod'
import { BadRequestException, Body, Controller, Patch } from '@nestjs/common'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'
import { EditTabletopUseCase } from 'src/domain/tabletop-finder/application/use-cases/edit-tabletop'
import {
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
} from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const editTabletopBodySchema = z.object({
  tabletopId: z.string(),
  tabletopData: z.object({
    name: z.string().optional().nullable(),
    slug: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    tabletopTypeId: z.number(),
    playersLimit: z.number().optional(),
    tabletopSystemId: z.number().optional(),
    minAge: z.number().optional(),
    expertiseLevel: z.nativeEnum(TabletopExpertise).optional().nullable(),
    cadence: z.nativeEnum(TabletopCadence).optional(),
    tabletopLanguageId: z.array(z.number()).optional().nullable(),
    communication: z
      .nativeEnum(TabletopCommunicationType)
      .optional()
      .nullable(),
    onlinePlataformId: z.number().optional().nullable(),
    timezoneId: z.number().optional().nullable(),
    avatarFileId: z.string().optional().nullable(),
    coverFileId: z.string().optional().nullable(),
    online: z.coerce
      .string()
      .optional()
      .transform((value) => value === 'true'),
    hasDungeonMaster: z.coerce
      .string()
      .optional()
      .transform((value) => value === 'true'),
  }),
})

type EditTabletopBodySchema = z.infer<typeof editTabletopBodySchema>
const bodyValidationPipe = new ZodValidationPipe(editTabletopBodySchema)

@Controller('/tabletops')
export class EditTabletopController {
  constructor(private readonly editTabletop: EditTabletopUseCase) {}

  @Patch()
  async handle(
    @Body(bodyValidationPipe) body: EditTabletopBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const { tabletopId, tabletopData } = editTabletopBodySchema.parse(body)

    const result = await this.editTabletop.execute({
      playerId: userId,
      tabletopId,
      tabletopData,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}