import { z } from 'zod'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { Public } from 'src/infra/auth/public'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { RegisterAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/register-account'
import { PlayerAlreadyExistsError } from 'src/domain/tabletop/application/use-cases/@errors/player-already-exists.error'

const RegisterAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
})

type RegisterAccountBodySchema = z.infer<typeof RegisterAccountBodySchema>
const bodyValidationPipe = new ZodValidationPipe(RegisterAccountBodySchema)

@Public()
@Controller('/accounts')
export class RegisterAccountController {
  constructor(private readonly RegisterAccount: RegisterAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: RegisterAccountBodySchema) {
    const { name, email, password } = RegisterAccountBodySchema.parse(body)

    const result = await this.RegisterAccount.execute({
      name,
      email,
      password,
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
