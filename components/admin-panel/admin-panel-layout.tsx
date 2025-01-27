'use client';

import { Footer } from '@/components/admin-panel/footer';
import { Sidebar } from '@/components/admin-panel/sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { useManagerStore } from '@/stores/manager-store';
import { useUserStore } from '@/stores/user-store';
import { Manager, User } from '@/types/db-types';
import React from 'react';

export default function AdminPanelLayout({
  children,
  managerData,
  usersData,
}: {
  managerData: Manager;
  usersData: User[] | null;
  children: React.ReactNode;
}) {
  const setManager = useManagerStore((state) => state.setManager);
  const setUsers = useUserStore((state) => state.setUsers);

  const users = useUserStore((state) => state.users);
  const manager = useManagerStore((state) => state.manager);
  React.useEffect(() => {
    const initializeState = () => {
      if (!manager && managerData) {
        setManager(managerData);
      }
      if (!users?.length && usersData) {
        setUsers(usersData);
      }
    };
    initializeState();
  }, [users, manager]);
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
