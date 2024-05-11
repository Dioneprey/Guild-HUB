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
import { PlayerAlreadyExistsError } from 'src/domain/tabletop/application/use-cases/@errors/player-already-exists.error'
import { UpdatePlayerUseCase } from 'src/domain/tabletop/application/use-cases/player/update-player'
import { GenderOptions } from 'src/domain/tabletop/enterprise/entities/player'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const updatePlayerBodySchema = z.object({
  playerData: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    nickname: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    gender: z.nativeEnum(GenderOptions).optional().nullable(),
    avatarUrl: z.string().optional().nullable(),
    cityId: z.string().optional(),
    countryId: z.string().optional(),
  }),
  registrationCompleted: z.boolean().optional(),
})

type updatePlayerBodySchema = z.infer<typeof updatePlayerBodySchema>
const bodyValidationPipe = new ZodValidationPipe(updatePlayerBodySchema)

@Controller('/player')
export class UpdatePlayerController {
  constructor(private readonly updatePlayer: UpdatePlayerUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: updatePlayerBodySchema,
  ) {
    const id = user.sub
    const { playerData, registrationCompleted } =
      updatePlayerBodySchema.parse(body)

    const result = await this.updatePlayer.execute({
      id,
      playerData,
      registrationCompleted,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PlayerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
