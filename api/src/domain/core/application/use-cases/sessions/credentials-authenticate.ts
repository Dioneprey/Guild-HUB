import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../../cryptography/hash-comparer'
import { Encrypter } from '../../cryptography/encrypter'
import { WrongCredentialsError } from '../../../../shared/@errors/wrong-credentials.error'
import { PlayerRepository } from '../../repositories/player-repository'
import { AccountRepository } from '../../repositories/account-repository'
import { AccountProvider } from 'src/domain/core/enterprise/account'
import { ResourceNotFoundError } from '../../../../shared/@errors/resource-not-found.error'

interface CredentialsAuthenticateUseCaseRequest {
  email: string
  password: string
}
type CredentialsAuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

@Injectable()
export class CredentialsAuthenticateUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private accountRepository: AccountRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: CredentialsAuthenticateUseCaseRequest): Promise<CredentialsAuthenticateUseCaseResponse> {
    const player = await this.playerRepository.findByUniqueField({
      key: 'email',
      value: email,
    })

    if (!player) {
      return left(new WrongCredentialsError())
    }

    const credentialsAccountExists =
      this.accountRepository.findByPlayerIdAndProvider(
        player.id.toString(),
        AccountProvider.CREDENTIALS,
      )

    if (!credentialsAccountExists) {
      return left(new ResourceNotFoundError('Credentials account'))
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      player.password!,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: player.id.toString(),
      role: player.role,
      name: player.name,
      isAccountValidated: player.registrationValidatedAt !== null,
    })

    return right({
      accessToken,
    })
  }
}
