import { Database } from '@/types';

export type Manager = Database['public']['Tables']['managers']['Row'];
export type User = Database['public']['Tables']['users']['Row'];
export type Plan = Database['public']['Tables']['plans']['Row'];
export type Roles = Database['public']['Enums']['ROLE'];
export type SpanishRoles = 'USUARIO' | 'ADMINISTRADOR' | 'MANAGER';
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserWithProfile = User & { profiles: Profile };
