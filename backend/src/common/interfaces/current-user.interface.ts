// Interface SSOT pour l'utilisateur authentifié
export interface ICurrentUser {
  id: string;
  email: string;
  role: 'admin' | 'training_org' | 'student' | 'manager';
  firstName?: string;
  lastName?: string;
  organization?: string;
  organizationId?: string;
  mfaEnabled?: boolean;
  mfaVerified?: boolean;

  // Propriétés optionnelles avec snake_case pour compatibilité Prisma
  first_name?: string;
  last_name?: string;
  mfa_enabled?: boolean;
}

// Type guard pour vérifier si un objet est un ICurrentUser valide
export function isCurrentUser(obj: unknown): obj is ICurrentUser {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const user = obj as Record<string, unknown>;
  
  return (
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.role === 'string' &&
    ['admin', 'training_org', 'student', 'manager'].includes(user.role as string)
  );
}
