import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

/**
 * Validateur personnalisé pour détecter les tentatives d'injection SQL
 */
@ValidatorConstraint({ name: 'noSqlInjection', async: false })
export class NoSqlInjectionConstraint implements ValidatorConstraintInterface {
  validate(text: unknown, args: ValidationArguments) {
    if (typeof text !== 'string') return true;

    // Patterns d'injection SQL courants
    const sqlPatterns = [
      /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|eval)\b)/i,
      /(--|#|\/\*|\*\/|xp_|sp_)/i,
      /(\bunion\s+select\b)/i,
      /(\bor\s+1\s*=\s*1\b)/i,
      /(\band\s+1\s*=\s*1\b)/i,
      /(';|";|`|'--|"--)/,
    ];

    return !sqlPatterns.some((pattern) => pattern.test(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Le texte contient des caractères potentiellement dangereux';
  }
}

/**
 * Validateur personnalisé pour détecter les tentatives XSS
 */
@ValidatorConstraint({ name: 'noXss', async: false })
export class NoXssConstraint implements ValidatorConstraintInterface {
  validate(text: unknown, args: ValidationArguments) {
    if (typeof text !== 'string') return true;

    // Patterns XSS courants
    const xssPatterns = [
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      /<iframe[^>]*>[\s\S]*?<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi, // onclick, onload, etc.
      /<img[^>]*onerror\s*=/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
    ];

    return !xssPatterns.some((pattern) => pattern.test(text));
  }

  defaultMessage(args: ValidationArguments) {
    return 'Le texte contient du code HTML/JavaScript potentiellement dangereux';
  }
}

/**
 * Décorateur pour valider contre les injections SQL
 */
export function NoSqlInjection(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NoSqlInjectionConstraint,
    });
  };
}

/**
 * Décorateur pour valider contre les attaques XSS
 */
export function NoXss(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NoXssConstraint,
    });
  };
}

/**
 * Décorateur combiné pour une validation de sécurité complète
 */
export function IsSafeString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    NoSqlInjection(validationOptions)(object, propertyName);
    NoXss(validationOptions)(object, propertyName);
  };
}
