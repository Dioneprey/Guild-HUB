import {
  Controller,
  Post,
  UsePipes,
  Body,
  UnauthorizedException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'

import { z } from 'zod'
import { Public } from 'src/infra/auth/public'
import { WrongCredentialsError } from 'src/domain/tabletop/application/use-cases/@errors/wrong-credentials.error'
import { CredentialsAuthenticateUseCase } from 'src/domain/tabletop/application/use-cases/sessions/credentials-authenticate'

const CredentialsAuthenticateBodyBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type CredentialsAuthenticateBodyBodySchema = z.infer<
  typeof CredentialsAuthenticateBodyBodySchema
>

@Public()
@Controller('/sessions/credentials')
export class CredentialsAuthenticateController {
  constructor(
    private credentialsAuthenticate: CredentialsAuthenticateUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(CredentialsAuthenticateBodyBodySchema))
  async handle(@Body() body: CredentialsAuthenticateBodyBodySchema) {
    const { email, password } = body

    const result = await this.credentialsAuthenticate.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return { accessToken }
  }
}
