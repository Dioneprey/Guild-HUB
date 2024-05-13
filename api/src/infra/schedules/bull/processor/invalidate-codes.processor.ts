import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { PlayerRepository } from 'src/domain/tabletop/application/repositories/player-repository'

@Processor('invalidate-codes-processor')
export class HandleInvalidateCodesProcessor {
  constructor(private playerRepository: PlayerRepository) {}

  @Process('invalidate-registration-validate-code')
  async invalidateMagicLink({ data: playerId }: Job<string>) {
    console.log('Fila iniciada - invalidate-registration-validate-code')

    const player = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!player) return
    console.log(player)

    player.registrationValidateCode = null
    console.log(player)

    await this.playerRepository.save(player)
  }
}
