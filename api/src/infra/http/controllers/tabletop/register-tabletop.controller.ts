import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { RegisterTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop'
import {
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const registerTabletopBodySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(TabletopType),
  playersLimit: z.number(),
  tabletopSystemId: z.number().optional(),
  minAge: z.number().optional(),
  expertiseLevel: z.nativeEnum(TabletopExpertise),
  cadence: z.nativeEnum(TabletopCadence),
  tabletopLanguageId: z.array(z.number()).optional(),
  communication: z.nativeEnum(TabletopCommunicationType).optional(),
  onlinePlataformId: z.number().optional(),
  timezoneId: z.number().optional(),
  avatarFileId: z.string().optional(),
  coverFileId: z.string().optional(),
  online: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
  hasDungeonMaster: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
})

type RegisterTabletopBodySchema = z.infer<typeof registerTabletopBodySchema>
const bodyValidationPipe = new ZodValidationPipe(registerTabletopBodySchema)

@Controller('/tabletops')
export class RegisterTabletopController {
  constructor(private readonly registerTabletop: RegisterTabletopUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: RegisterTabletopBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const tabletopData = registerTabletopBodySchema.parse(body)

    const result = await this.registerTabletop.execute({
      playerId: userId,
      tabletopData,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
