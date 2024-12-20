import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      // If the response is an object (common in custom errors), extract the message
      const message =
        typeof responseBody === 'object'
          ? responseBody['message']
          : responseBody;
      response.status(exception.getStatus()).json({
        errors: message,
      });
    } else if (exception instanceof ZodError) {
      // Include the field name (path) and the error message from ZodError
      const errors = exception.errors.map((error) => ({
        field: error.path.join('.'), // Join the path array to get the full field name
        message: error.message,
      }));

      response.status(422).json({
        errors: errors,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
