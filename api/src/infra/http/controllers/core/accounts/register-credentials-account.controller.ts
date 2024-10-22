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
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'
import { RegisterCredentialsAccountUseCase } from 'src/domain/core/application/use-cases/accounts/register-credentials-account'
import { ResourceAlreadyExistsError } from 'src/domain/shared/@errors/resource-already-exists.error'

const registerCredentialsAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
})

type RegisterCredentialsAccountBodySchema = z.infer<
  typeof registerCredentialsAccountBodySchema
>
const bodyValidationPipe = new ZodValidationPipe(
  registerCredentialsAccountBodySchema,
)

@Public()
@Controller('/accounts/credentials')
export class RegisterCredentialsAccountController {
  constructor(
    private readonly registerCredentialsAccount: RegisterCredentialsAccountUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: RegisterCredentialsAccountBodySchema,
  ) {
    const { name, email, password } =
      registerCredentialsAccountBodySchema.parse(body)

    const result = await this.registerCredentialsAccount.execute({
      name,
      email,
      password,
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
