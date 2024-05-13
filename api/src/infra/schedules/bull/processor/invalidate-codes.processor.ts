import { Processor, Process, OnQueueCompleted } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { PlayerRepository } from 'src/domain/tabletop/application/repositories/player-repository'

export const INVALIDATE_CODES_QUEUE = 'invalidate-codes-processor'
@Processor(INVALIDATE_CODES_QUEUE)
export class InvalidateCodesProcessor {
  constructor(private playerRepository: PlayerRepository) {}

  @Process('invalidate-registration-code')
  async invalidateMagicLink({ data: playerId }: Job<string>) {
    console.log(`Fila iniciada - invalidate-registration-code`)

    const player = await this.playerRepository.findByUniqueField({
      key: 'id',
      value: playerId,
    })

    if (!player) return

    player.registrationValidateCode = null

    await this.playerRepository.save(player)
  }

  @OnQueueCompleted({
    name: 'invalidate-registration-code',
  })
  onCompleted(job: Job<unknown>) {
    Logger.log(`Job ${job.id} has been finished`)
  }
}
