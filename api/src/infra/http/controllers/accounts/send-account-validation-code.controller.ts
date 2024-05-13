import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { SendAccountValidationCodeUseCase } from 'src/domain/tabletop/application/use-cases/accounts/send-account-validation-code'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { Public } from 'src/infra/auth/public'

const sendAccountValidationCodeBodySchema = z.object({
  email: z.string().email(),
})

type SendAccountValidationCodeBodySchema = z.infer<
  typeof sendAccountValidationCodeBodySchema
>
const bodyValidationPipe = new ZodValidationPipe(
  sendAccountValidationCodeBodySchema,
)

@Controller('/accounts/send-validation-code')
export class SendAccountValidationCodeController {
  constructor(
    private readonly sendAccountValidationCode: SendAccountValidationCodeUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: SendAccountValidationCodeBodySchema,
  ) {
    const { email } = body

    const result = await this.sendAccountValidationCode.execute({
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
