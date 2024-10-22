/* eslint-disable no-throw-literal */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'

@Catch()
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest()

    const status =
      exception instanceof HttpException ? exception?.getStatus() : 500

    if (status === 500) {
      // TODO implementar logs
      console.log('Erro interno')
    }
    console.log(status)

    const message = status === 500 ? 'Erro interno' : exception?.message

    throw {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message,
    }
  }
}
