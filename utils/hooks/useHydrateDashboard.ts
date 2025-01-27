import { useEffect } from 'react';
import { Manager, User } from '@/types/db-types';
import { useManagerStore } from '@/stores/manager-store';
import { useUserStore } from '@/stores/user-store';

export function useInitializeDashboardGeneral(
  manager: Manager,
  users: User[] | null
) {}
