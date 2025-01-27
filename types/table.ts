export interface Column {
  key: string;
  label: string;
  type?: 'avatar' | 'text';
}

export interface Action {
  label: string;
  onClick: (item: any) => void;
}

export interface ReusableTableProps {
  columns: Column[];
  data: any[];
  actions: Action[];
  onUpdate?: () => void;
  title?: string;
}
