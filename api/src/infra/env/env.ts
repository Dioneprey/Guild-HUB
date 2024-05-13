import { envSchema } from 'src/domain/tabletop/application/env/env-schema'
import { z } from 'zod'

export type Env = z.infer<typeof envSchema>
