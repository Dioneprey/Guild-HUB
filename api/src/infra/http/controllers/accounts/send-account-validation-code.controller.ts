import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { Public } from 'src/infra/auth/public'
import { SendAccountValidationTokenUseCase } from 'src/domain/core/application/use-cases/accounts/send-account-validation-token'

const sendAccountValidationTokenBodySchema = z.object({
  email: z.string().email(),
})

type SendAccountValidationTokenBodySchema = z.infer<
  typeof sendAccountValidationTokenBodySchema
>
const bodyValidationPipe = new ZodValidationPipe(
  sendAccountValidationTokenBodySchema,
)

@Controller('/accounts/send-validation-token')
export class SendAccountValidationTokenController {
  constructor(
    private readonly sendAccountValidationToken: SendAccountValidationTokenUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: SendAccountValidationTokenBodySchema,
  ) {
    const { email } = body

    const result = await this.sendAccountValidationToken.execute({
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
