import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ValidateAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/validate-account'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { Public } from 'src/infra/auth/public'

const validateAccountBodySchema = z.object({
  userId: z.string(),
  registrationValidateCode: z.string(),
})

type ValidateAccountBodySchema = z.infer<typeof validateAccountBodySchema>
const bodyValidationPipe = new ZodValidationPipe(validateAccountBodySchema)

@Controller('/accounts/validate-code')
export class ValidateAccountController {
  constructor(private readonly validateAccount: ValidateAccountUseCase) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: ValidateAccountBodySchema) {
    const { userId, registrationValidateCode } = body

    const result = await this.validateAccount.execute({
      userId,
      registrationValidateCode,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
