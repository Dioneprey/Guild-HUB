import { Either, left, right } from 'src/core/either'
import { Player } from '../../../enterprise/player/player'
import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '../../../../shared/@errors/resource-already-exists.error'
import { PlayerRepository } from '../../repositories/player-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import {
  Account,
  AccountProvider,
} from 'src/domain/core/enterprise/account'
import { AccountRepository } from '../../repositories/account-repository'

interface RegisterCredentialsAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterCredentialsAccountUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    player: Player
  }
>

@Injectable()
export class RegisterCredentialsAccountUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private accountRepository: AccountRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterCredentialsAccountUseCaseRequest): Promise<RegisterCredentialsAccountUseCaseResponse> {
    const hasPlayerWithSameEmail =
      await this.playerRepository.findByUniqueField({
        key: 'email',
        value: email,
      })

    if (hasPlayerWithSameEmail) {
      return left(new ResourceAlreadyExistsError(email))
    }

    const player = Player.create({
      name,
      email,
    })

    const account = Account.create({
      playerId: player.id,
      provider: AccountProvider.CREDENTIALS,
    })

    const hashedPassword = await this.hashGenerator.hash(password)

    player.password = hashedPassword

    await this.playerRepository.create(player)
    await this.accountRepository.create(account)

    return right({
      player,
    })
  }
}
