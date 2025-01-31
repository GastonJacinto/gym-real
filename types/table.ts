import { LucideIcon } from 'lucide-react';
import { Roles } from './db-types';

export interface Column {
  key: string;
  label: string;
  type?: 'avatar' | 'text';
}

export type ActionType = 'edit' | 'delete' | 'view';

export interface Action {
  label: string;
  onClick: (item: any) => void;
  icon?: LucideIcon;
  type?: 'delete' | 'edit' | 'view';
}

export interface ReusableTableProps {
  columns: Column[];
  data: any[];
  actions: Action[];
  onUpdate?: () => void;
  title?: string;
}
