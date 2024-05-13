import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../repositories/player-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'
import { SendEmail } from '../../mail/send-email'
import { env } from '../../env/domain-env'
import { randomUUID } from 'crypto'
import { Encrypter } from '../../cryptography/encrypter'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

interface SendAccountValidationCodeUseCaseRequest {
  email: string
}

type SendAccountValidationCodeUseCaseResponse = Either<
  ResourceNotFoundError,
  undefined
>

@Injectable()
export class SendAccountValidationCodeUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private sendEmail: SendEmail,
    private encrypter: Encrypter,
    @InjectQueue('invalidate-codes-processor')
    private handleInvalidateCodesProcessor: Queue,
  ) {}

  async execute({
    email,
  }: SendAccountValidationCodeUseCaseRequest): Promise<SendAccountValidationCodeUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'email',
      value: email,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(email))
    }

    const registrationValidateCode = randomUUID()

    const registrationValidateCodeToken = await this.encrypter.encrypt({
      userId: playerExists.id.toString(),
      registrationValidateCode,
    })

    if (env.NODE_ENV !== 'production') {
      console.log(registrationValidateCodeToken)
    } else {
      this.sendEmail
        .send({
          recipientEmail: playerExists.email,
          subject: 'Seu Link Exclusivo para Entrar no Prazer Oculto',
          message: `${env.FRONT_END_URL}/verify-account?token=${registrationValidateCodeToken}`,
        })
        .then(() => console.log('Email enviado'))
        .catch(() => console.log('Erro no envio de email'))
    }

    this.handleInvalidateCodesProcessor
      .add(
        'invalidate-registration-validate-code',
        playerExists.id.toString(),
        {
          delay: 1000 * 60 * 5, // 5 minutos
        },
      )
      .catch((err) =>
        console.log('Redis connection error, more details: ', err),
      )

    playerExists.registrationValidateCode = registrationValidateCode
    await this.playerRepository.save(playerExists)

    return right(undefined)
  }
}
