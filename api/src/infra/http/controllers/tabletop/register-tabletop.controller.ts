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
import { TabletopType } from 'src/domain/tabletop/enterprise/entities/tabletop'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const registerTabletopBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  playersLimit: z.number(),
  systemName: z.string().optional(),
  avatarUrl: z.string().optional(),
  minAge: z.number().optional(),
  type: z.nativeEnum(TabletopType),
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
      systemName,
      avatarUrl,
      minAge,
      type,
    } = registerTabletopBodySchema.parse(body)

    const result = await this.registerTabletop.execute({
      masterId: userId,
      tabletopData: {
        name,
        description,
        playersLimit,
        systemName,
        avatarUrl,
        minAge,
        type,
      },
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
