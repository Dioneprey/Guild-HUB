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
  TabletopExpertise,
  TabletopType,
} from 'src/domain/tabletop/enterprise/entities/tabletop/tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const registerTabletopBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  playersLimit: z.number(),
  tabletopSystemId: z.number().optional(),
  language: z.array(z.number()).optional(),
  minAge: z.number().optional(),
  type: z.nativeEnum(TabletopType),
  expertiseLevel: z.nativeEnum(TabletopExpertise),
  cadence: z.nativeEnum(TabletopCadence),
  avatarFileId: z.number().optional(),
  coverFileId: z.number().optional(),
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

    const {
      name,
      description,
      playersLimit,
      tabletopSystemId,
      language,
      minAge,
      type,
      expertiseLevel,
      cadence,
      avatarFileId,
      coverFileId,
      online,
      hasDungeonMaster,
    } = registerTabletopBodySchema.parse(body)

    const result = await this.registerTabletop.execute({
      masterId: userId,
      tabletopData: {
        name,
        description,
        playersLimit,
        tabletopSystemId,
        language,
        minAge,
        type,
        expertiseLevel,
        cadence,
        avatarFileId,
        coverFileId,
        online,
        hasDungeonMaster,
      },
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
