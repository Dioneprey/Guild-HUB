import { Module, forwardRef } from '@nestjs/common'
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { AuthModule } from '../auth/auth.module'
import { UpdatePlayerController } from './controllers/player/update-player.controller'
import { UpdatePlayerUseCase } from 'src/domain/tabletop/application/use-cases/player/update-player'
import { CredentialsAuthenticateController } from './controllers/sessions/credentials-authenticate.controller'
import { CredentialsAuthenticateUseCase } from 'src/domain/tabletop/application/use-cases/sessions/credentials-authenticate'
import { ValidateAccountController } from './controllers/accounts/validate-account.controller'
import { ValidateAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/validate-account'
import { MailModule } from '../mail/mail.module'
import { BullConfigModule } from '../schedules/bull/bull.module'
import { RegisterTabletopController } from './controllers/tabletop/register-tabletop.controller'
import { RegisterTabletopLocationController } from './controllers/tabletop/register-tabletop-location.controller'
import { RegisterTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop'
import { RegisterTabletopLocationUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop-location'
import { FetchNearbyTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-nearby-tabletop'
import { FetchNearbyTabletopController } from './controllers/tabletop/fetch-nearby-tabletop.controller'
import { GetTabletopDetailsController } from './controllers/tabletop/get-tabletop-details.controller'
import { GetTabletopDetailsUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/get-tabletop-details'
import { FetchPlayerTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-player-tabletop'
import { FetchPlayerTabletopController } from './controllers/tabletop/fetch-player-tabletop.controller'
import { UploadFileController } from './controllers/upload/upload-file.controller'
import { UploadFilesAsyncController } from './controllers/upload/upload-async-files.controller'
import { UploadFileUseCase } from 'src/domain/tabletop/application/use-cases/upload/upload-file'
import { UploadFilesAsyncUseCase } from 'src/domain/tabletop/application/use-cases/upload/upload-files-async'
import { StorageModule } from '../storage/storage.module'
import { EditTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/edit-tabletop'
import { EditTabletopController } from './controllers/tabletop/edit-tabletop.controller'
import { GetPlayerDetailsUseCase } from 'src/domain/tabletop/application/use-cases/player/get-player-details'
import { GetPlayerDetailsController } from './controllers/player/get-player-details.controller'
import { FetchAllTabletopsController } from './controllers/tabletop/fetch-all-tabletop.controller'
import { FetchAllTabletopsUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-all-tabletop'
import { RegisterCredentialsAccountController } from './controllers/accounts/register-credentials-account.controller'
import { SendAccountValidationTokenController } from './controllers/accounts/send-account-validation-code.controller'
import { RegisterCredentialsAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/register-credentials-account'
import { SendAccountValidationTokenUseCase } from 'src/domain/tabletop/application/use-cases/accounts/send-account-validation-token'
import { EditTabletopLocationController } from './controllers/tabletop/edit-tabletop-location.controller'
import { EditTabletopLocationUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/edit-tabletop-location'

@Module({
  imports: [
    forwardRef(() => BullConfigModule),
    DatabaseModule,
    CryptographyModule,
    AuthModule,
    MailModule,
    StorageModule,
  ],
  controllers: [
    // Accounts
    RegisterCredentialsAccountController,
    SendAccountValidationTokenController,
    ValidateAccountController,

    // Sessions
    CredentialsAuthenticateController,

    // Player
    UpdatePlayerController,
    GetPlayerDetailsController,

    // Tabletop
    RegisterTabletopController,
    RegisterTabletopLocationController,
    FetchNearbyTabletopController,
    GetTabletopDetailsController,
    FetchPlayerTabletopController,
    EditTabletopController,
    FetchAllTabletopsController,
    EditTabletopLocationController,

    // Upload\
    UploadFileController,
    UploadFilesAsyncController,
  ],
  providers: [
    // Accounts
    RegisterCredentialsAccountUseCase,
    SendAccountValidationTokenUseCase,
    ValidateAccountUseCase,

    // Sessions
    CredentialsAuthenticateUseCase,

    // Player
    UpdatePlayerUseCase,
    GetPlayerDetailsUseCase,

    // Tabletop
    RegisterTabletopUseCase,
    RegisterTabletopLocationUseCase,
    FetchNearbyTabletopUseCase,
    GetTabletopDetailsUseCase,
    FetchPlayerTabletopUseCase,
    EditTabletopUseCase,
    FetchAllTabletopsUseCase,
    EditTabletopLocationUseCase,

    // Upload\
    UploadFileUseCase,
    UploadFilesAsyncUseCase,
  ],
  exports: [UploadFilesAsyncUseCase],
})
export class HttpModule {}
