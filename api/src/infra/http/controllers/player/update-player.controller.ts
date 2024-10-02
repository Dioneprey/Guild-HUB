import { z } from 'zod'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Patch,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { UpdatePlayerUseCase } from 'src/domain/tabletop/application/use-cases/player/update-player'
import { GenderOptions } from 'src/domain/tabletop/enterprise/entities/player/player'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ResourceAlreadyExistsError } from 'src/domain/tabletop/application/use-cases/@errors/resource-already-exists.error'

const updatePlayerBodySchema = z.object({
  playerData: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    nickname: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    gender: z.nativeEnum(GenderOptions).optional().nullable(),
    avatarFileId: z.string().optional().nullable(),
    countryId: z.string().optional(),
    cityId: z.string().optional(),
    birthdate: z.coerce.date().optional(),
    playerLanguageId: z.array(z.number()).optional(),
  }),
  registrationCompleted: z.boolean().optional(),
})

type updatePlayerBodySchema = z.infer<typeof updatePlayerBodySchema>
const bodyValidationPipe = new ZodValidationPipe(updatePlayerBodySchema)

@Controller('/players')
export class UpdatePlayerController {
  constructor(private readonly updatePlayer: UpdatePlayerUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: updatePlayerBodySchema,
  ) {
    const playerId = user.sub
    const { playerData, registrationCompleted } =
      updatePlayerBodySchema.parse(body)

    const result = await this.updatePlayer.execute({
      playerId,
      playerData,
      registrationCompleted,
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
