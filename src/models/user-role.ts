export const userRoles = {
  guest: 'Guest',
  visitor: 'Visitor',
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
