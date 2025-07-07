import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger('CatchEverythingFilter');
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    // let message = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      // message = exception.message;
    }

    const message =
      exception instanceof HttpException
        ? exception.getResponse()['message']
          ? exception.getResponse()['message']
          : exception.getResponse()
        : '服务器内部错误';

    // console.error('Unhandled Exception:', exception);

    this.logger.error(`Unhandled Exception -> ${exception}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
