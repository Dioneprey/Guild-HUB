import {
  ExceptionFilter,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common'

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException) {
    // TODO implementar logs
    console.log(exception)

    throw exception
  }
}
