import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtre global pour gérer toutes les exceptions HTTP
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Formatter la réponse d'erreur
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: this.getErrorMessage(exceptionResponse),
      errors: this.getValidationErrors(exceptionResponse),
    };

    // Logger l'erreur avec plus de contexte
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${errorResponse.message}`,
      {
        userId: (request as any).user?.id,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        body: this.sanitizeBody(request.body),
        stack: exception.stack,
      },
    );

    // Envoyer la réponse
    response.status(status).json(errorResponse);
  }

  /**
   * Extrait le message d'erreur de la réponse
   */
  private getErrorMessage(response: any): string {
    if (typeof response === 'string') {
      return response;
    }

    if (response?.message) {
      return Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
    }

    return 'Une erreur est survenue';
  }

  /**
   * Extrait les erreurs de validation
   */
  private getValidationErrors(
    response: any,
  ): Record<string, string[]> | undefined {
    if (typeof response === 'object' && response?.errors) {
      return response.errors;
    }

    // Pour les erreurs de class-validator
    if (Array.isArray(response?.message)) {
      const errors: Record<string, string[]> = {};
      response.message.forEach((msg: string) => {
        // Essayer de parser le format "property: message"
        const match = msg.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const [, property, message] = match;
          if (!errors[property]) {
            errors[property] = [];
          }
          errors[property].push(message);
        }
      });
      return Object.keys(errors).length > 0 ? errors : undefined;
    }

    return undefined;
  }

  /**
   * Nettoie le body des informations sensibles avant le logging
   */
  private sanitizeBody(body: unknown): unknown {
    if (!body || typeof body !== 'object') {
      return body;
    }

    const sanitized = { ...body };
    const sensitiveFields = [
      'password',
      'token',
      'refreshToken',
      'otpCode',
      'mfa_secret',
    ];

    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }
}

/**
 * Filtre pour toutes les exceptions (pas seulement HTTP)
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erreur interne du serveur';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    } else if (exception instanceof Error) {
      message = exception.message;

      // Gérer les erreurs Prisma
      if (exception.constructor.name === 'PrismaClientKnownRequestError') {
        const prismaError = exception as any;
        if (prismaError.code === 'P2002') {
          status = HttpStatus.CONFLICT;
          message = 'Cette ressource existe déjà';
        } else if (prismaError.code === 'P2025') {
          status = HttpStatus.NOT_FOUND;
          message = 'Ressource non trouvée';
        }
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : exception,
    );

    response.status(status).json(errorResponse);
  }
}
