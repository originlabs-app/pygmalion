import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export interface LogContext {
  userId?: string;
  requestId?: string;
  module?: string;
  action?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf(
          ({ timestamp, level, message, context, stack, ...meta }: winston.Logform.TransformableInfo) => {
            const logObject: Record<string, unknown> = {
              timestamp,
              level,
              message,
            };
            
            if (context) {
              logObject.context = context;
            }
            
            if (stack) {
              logObject.stack = stack;
            }
            
            Object.assign(logObject, meta);
            
            return JSON.stringify(logObject);
          },
        ),
      ),
      transports: [
        // Console pour développement
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf(
              ({ timestamp, level, message, context }: winston.Logform.TransformableInfo) => {
                let contextStr = '';
                if (context && typeof context === 'object' && 'module' in context) {
                  contextStr = ` [${context.module || 'App'}]`;
                }
                return `${timestamp}${contextStr} ${level}: ${message}`;
              },
            ),
          ),
        }),

        // Fichier de logs avec rotation quotidienne
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        }),

        // Fichier séparé pour les erreurs
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '20m',
          maxFiles: '30d',
          zippedArchive: true,
        }),
      ],
    });
  }

  info(message: string, context?: LogContext): void {
    this.logger.log(message, { context });
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.logger.error(message, {
      context,
      ...(error && {
        error: error.message,
        stack: error.stack,
      }),
    });
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: LogContext): void {
    this.logger.debug(message, { context });
  }

  // Méthodes spécialisées pour les cas métier
  apiRequest(
    method: string,
    url: string,
    userId?: string,
    duration?: number,
  ): void {
    this.info(`API ${method} ${url}${duration ? ` (${duration}ms)` : ''}`, {
      module: 'API',
      action: 'request',
      metadata: { method, url, userId, duration },
    });
  }

  databaseQuery(query: string, duration?: number, context?: LogContext): void {
    this.debug(`DB Query: ${query}${duration ? ` (${duration}ms)` : ''}`, {
      ...context,
      module: 'Database',
      action: 'query',
      metadata: { query, duration },
    });
  }

  authEvent(event: string, userId?: string, success = true): void {
    this.info(`Auth ${event}: ${success ? 'SUCCESS' : 'FAILED'}`, {
      module: 'Auth',
      action: event,
      metadata: { userId, success },
    });
  }

  securityAlert(
    message: string,
    userId?: string,
    severity: 'low' | 'medium' | 'high' = 'medium',
  ): void {
    this.warn(`🚨 SECURITY: ${message}`, {
      module: 'Security',
      action: 'alert',
      metadata: { userId, severity },
    });
  }

  examEvent(
    event: string,
    examId: string,
    userId?: string,
    metadata?: Record<string, any>,
  ): void {
    this.info(`Exam ${event}`, {
      module: 'Exam',
      action: event,
      metadata: { examId, userId, ...metadata },
    });
  }

  uploadEvent(
    filename: string,
    size: number,
    userId?: string,
    success = true,
  ): void {
    this.info(
      `Upload ${success ? 'SUCCESS' : 'FAILED'}: ${filename} (${size} bytes)`,
      {
        module: 'Upload',
        action: 'file_upload',
        metadata: { filename, size, userId, success },
      },
    );
  }
}
