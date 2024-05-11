import { Either, left, right } from 'src/core/either'
import { Player } from '../../../enterprise/entities/player'
import { Injectable } from '@nestjs/common'
import { PlayerAlreadyExistsError } from '../@errors/player-already-exists.error'
import { PlayerRepository } from '../../repositories/player-repository'
import { HashGenerator } from '../../cryptography/hash-generator'

interface RegisterAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterAccountUseCaseResponse = Either<
  PlayerAlreadyExistsError,
  {
    player: Player
  }
>

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    private playerRepository: PlayerRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAccountUseCaseRequest): Promise<RegisterAccountUseCaseResponse> {
    const hasPlayerWithSameEmail =
      await this.playerRepository.findByUniqueField({
        key: 'email',
        value: email,
      })

    if (hasPlayerWithSameEmail) {
      return left(new PlayerAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const player = Player.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.playerRepository.create(player)

    return right({
      player,
    })
  }
}
