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
import { INVALIDATE_CODES_QUEUE } from 'src/infra/schedules/bull/processor/invalidate-codes.processor'

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
    @InjectQueue(INVALIDATE_CODES_QUEUE)
    private invalidateCodesProcessor: Queue,
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
      console.log({
        recipientEmail: playerExists.email,
        subject: 'Finalize seu cadastro - GuildHUB',
        message: `${env.FRONT_END_URL}/verify-account?token=${registrationValidateCodeToken}`,
      })
    } else {
      this.sendEmail
        .send({
          recipientEmail: playerExists.email,
          subject: 'Finalize seu cadastro - GuildHUB',
          message: `${env.FRONT_END_URL}/verify-account?token=${registrationValidateCodeToken}`,
        })
        .then(() => console.log('Email enviado'))
        .catch(() => console.log('Erro no envio de email'))
    }

    const jobId = `${playerExists.id.toString()}.invalidate-registration-code`

    this.invalidateCodesProcessor
      .removeJobs(jobId)
      .then(() => {
        this.invalidateCodesProcessor
          .add(`invalidate-registration-code`, playerExists.id.toString(), {
            delay: 1000 * 60 * 5, // 5 minutos
            jobId,
          })
          .catch((err) =>
            console.log('Redis connection error, more details: ', err),
          )
      })
      .catch((err) =>
        console.log('Redis connection error, more details: ', err),
      )

    playerExists.registrationValidateCode = registrationValidateCode
    await this.playerRepository.save(playerExists)

    return right(undefined)
  }
}
