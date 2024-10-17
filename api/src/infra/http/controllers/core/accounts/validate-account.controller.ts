import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ValidateAccountUseCase } from 'src/domain/core/application/use-cases/accounts/validate-account'
import { z } from 'zod'
import { Public } from 'src/infra/auth/public'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'

const validateAccountBodySchema = z.object({
  registrationValidateToken: z.string(),
})

type ValidateAccountBodySchema = z.infer<typeof validateAccountBodySchema>
const bodyValidationPipe = new ZodValidationPipe(validateAccountBodySchema)

@Controller('/accounts/validate-token')
export class ValidateAccountController {
  constructor(private readonly validateAccount: ValidateAccountUseCase) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: ValidateAccountBodySchema) {
    const { registrationValidateToken } = body

    const result = await this.validateAccount.execute({
      registrationValidateToken,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
