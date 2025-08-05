import pino from 'pino';

// Configuration du logger Pino pour le frontend
const logger = pino({
  browser: {
    // Configuration spécifique au navigateur
    serialize: true,
    asObject: true,
    transmit: {
      level: 'error',
      send: (level, logEvent) => {
        // En production, on pourrait envoyer les erreurs à un service de monitoring
        // Pino nécessite console.error ici pour le browser transport
        // eslint-disable-next-line no-console
        if (level === 'error') {
          logger.error('🚨 Error logged:', logEvent);
        }
      }
    }
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  // Formatage personnalisé pour le développement
  formatters: {
    level: (label) => {
      return { level: label };
    }
  }
});

// Interface pour typer notre logger
export interface Logger {
  debug: (msg: string, ...args: unknown[]) => void;
  info: (msg: string, ...args: unknown[]) => void;
  warn: (msg: string, ...args: unknown[]) => void;
  error: (msg: string, ...args: unknown[]) => void;
}

// Wrapper pour une utilisation plus simple
export const appLogger: Logger = {
  debug: (msg: string, ...args: unknown[]) => logger.debug(msg, ...args),
  info: (msg: string, ...args: unknown[]) => logger.info(msg, ...args),
  warn: (msg: string, ...args: unknown[]) => logger.warn(msg, ...args),
  error: (msg: string, ...args: unknown[]) => logger.error(msg, ...args),
};

// Export par défaut pour faciliter l'import
export default appLogger;