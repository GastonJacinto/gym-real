import { Roles, SpanishRoles } from '@/types/db-types';

export const RoleSelector = ({ role }: { role: Roles }) => {
  let spanishRole: SpanishRoles;

  switch (role) {
    case 'ADMIN':
      spanishRole = 'ADMINISTRADOR';
      break;
    case 'MANAGER':
      spanishRole = 'MANAGER';
      break;
    case 'USER':
      spanishRole = 'USUARIO';
      break;
    default:
      spanishRole = 'USUARIO';
  }
  return (
    <p className={`capitalize flex items-center gap-x-2`}>
      <span className="inline-block bg-green-500 rounded-full w-2 h-2"></span>
      {spanishRole.toLocaleLowerCase()}
    </p>
  );
};
