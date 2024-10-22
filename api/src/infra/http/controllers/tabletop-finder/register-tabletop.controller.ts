import { z } from 'zod'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'
import { RegisterTabletopUseCase } from 'src/domain/tabletop-finder/application/use-cases/register-tabletop'
import {
  TabletopCadence,
  TabletopCommunicationType,
  TabletopExpertise,
} from 'src/domain/tabletop-finder/enterprise/entities/tabletop/tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'

const registerTabletopBodySchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  tabletopTypeId: z.number(),
  playersLimit: z.number(),
  tabletopSystemId: z.number().optional(),
  minAge: z.number(),
  expertiseLevel: z.nativeEnum(TabletopExpertise),
  cadence: z.nativeEnum(TabletopCadence),
  tabletopLanguageId: z.array(z.number()),
  communication: z.nativeEnum(TabletopCommunicationType),
  onlinePlataformId: z.number().optional(),
  timezoneId: z.number().optional(),
  avatarFileId: z.string().optional(),
  coverFileId: z.string().optional(),
  online: z.coerce
    .string()
    .optional()
    .transform((value) => value === 'true'),
  hasDungeonMaster: z.coerce.string().transform((value) => value === 'true'),
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

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
