import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Pipe de validation personnalisé avec logging et messages d'erreur améliorés
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<unknown> {
  private readonly logger = new Logger(CustomValidationPipe.name);

  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transformer les données brutes en instance de classe
    const object = plainToInstance(metatype, value, {
      // Enlève les propriétés non définies dans le DTO
      excludeExtraneousValues: false,
      // Active la transformation des types
      enableImplicitConversion: true,
    });

    // Valider l'objet
    const errors = await validate(object, {
      // Valide aussi les objets imbriqués
      validationError: { target: false },
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Rejette si des propriétés non autorisées sont présentes
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);

      this.logger.warn(`Validation failed: ${JSON.stringify(formattedErrors)}`);

      throw new BadRequestException({
        statusCode: 400,
        message: 'Erreur de validation',
        errors: formattedErrors,
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    errors.forEach((error: any) => {
      const property = error.property;
      const messages = Object.values(error.constraints || {}) as string[];

      if (formattedErrors[property]) {
        formattedErrors[property].push(...messages);
      } else {
        formattedErrors[property] = messages;
      }

      // Gérer les erreurs imbriquées
      if (error.children && error.children.length > 0) {
        const childErrors = this.formatErrors(error.children);
        Object.keys(childErrors).forEach((childProperty) => {
          const fullProperty = `${property}.${childProperty}`;
          formattedErrors[fullProperty] = childErrors[childProperty];
        });
      }
    });

    return formattedErrors;
  }
}

/**
 * Pipe de validation strict pour les endpoints critiques
 */
@Injectable()
export class StrictValidationPipe extends CustomValidationPipe {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    // Validation supplémentaire pour les endpoints critiques
    if (value && typeof value === 'object') {
      // Vérifier la taille maximale du payload
      const jsonString = JSON.stringify(value);
      const maxSize = 1024 * 1024; // 1MB

      if (jsonString.length > maxSize) {
        throw new BadRequestException('Payload trop volumineux');
      }

      // Vérifier la profondeur maximale de l'objet
      if (this.getObjectDepth(value) > 10) {
        throw new BadRequestException('Structure de données trop complexe');
      }
    }

    return super.transform(value, metadata);
  }

  private getObjectDepth(obj: unknown, currentDepth = 0): number {
    if (typeof obj !== 'object' || obj === null) {
      return currentDepth;
    }

    const values = Array.isArray(obj) ? obj : Object.values(obj);
    const depths = values.map((value) =>
      this.getObjectDepth(value, currentDepth + 1),
    );

    return Math.max(currentDepth, ...depths);
  }
}
