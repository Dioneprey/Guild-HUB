import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { PlayerRepository } from '../../../../tabletop/application/repositories/player-repository'
import { ResourceNotFoundError } from '../../../../tabletop/application/use-cases/@errors/resource-not-found.error'
import { SendEmail } from '../../../../tabletop/application/mail/send-email'
import { env } from '../../../../tabletop/application/env/domain-env'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { Token, TokenType } from 'src/domain/tabletop/enterprise/entities/token'
import { TokenRepository } from '../../../../tabletop/application/repositories/token-repository'
import { INVALIDATE_TOKEN_QUEUE } from 'src/infra/schedules/bull/processor/invalidate-token.processor'

interface SendAccountValidationTokenUseCaseRequest {
  email: string
}

type SendAccountValidationTokenUseCaseResponse = Either<
  ResourceNotFoundError,
  undefined
>

@Injectable()
export class SendAccountValidationTokenUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private tokenRepository: TokenRepository,
    private sendEmail: SendEmail,
    @InjectQueue(INVALIDATE_TOKEN_QUEUE)
    private InvalidateTokenProcessor: Queue,
  ) {}

  async execute({
    email,
  }: SendAccountValidationTokenUseCaseRequest): Promise<SendAccountValidationTokenUseCaseResponse> {
    const playerExists = await this.playerRepository.findByUniqueField({
      key: 'email',
      value: email,
    })

    if (!playerExists) {
      return left(new ResourceNotFoundError(email))
    }

    const registrationValidateToken = Token.create({
      type: TokenType.VALIDATE_ACCOUNT,
      playerId: playerExists.id,
    })

    await this.tokenRepository.create(registrationValidateToken)

    if (env.NODE_ENV !== 'production') {
      console.log({
        recipientEmail: playerExists.email,
        subject: 'Finalize seu cadastro - GuildHUB',
        message: `${env.FRONT_END_URL}/verify-account?token=${registrationValidateToken.id.toString()}`,
      })
    } else {
      this.sendEmail
        .send({
          recipientEmail: playerExists.email,
          subject: 'Finalize seu cadastro - GuildHUB',
          message: `${env.FRONT_END_URL}/verify-account?token=${registrationValidateToken}`,
        })
        .then(() => console.log('Email enviado'))
        .catch(() => console.log('Erro no envio de email'))
    }

    const jobId = `${playerExists.id.toString()}.invalidate-registration-token`

    this.InvalidateTokenProcessor.removeJobs(jobId)
      .then(() => {
        this.InvalidateTokenProcessor.add(
          `invalidate-registration-token`,
          registrationValidateToken.id.toString(),
          {
            delay: 1000 * 60 * 5, // 5 minutos
            jobId,
          },
        ).catch((err) =>
          console.log('Redis connection error, more details: ', err),
        )
      })
      .catch((err) =>
        console.log('Redis connection error, more details: ', err),
      )

    return right(undefined)
  }
}
