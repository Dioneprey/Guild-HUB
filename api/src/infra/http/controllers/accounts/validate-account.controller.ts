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
  playerId: z.string(),
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
    const { playerId, registrationValidateToken } = body

    const result = await this.validateAccount.execute({
      playerId,
      registrationValidateToken,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }
  }
}
