'use client';
import type React from 'react';
import { useState, useMemo } from 'react';
import type { ReusableTableProps } from '../types/table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Avatar } from './Avatar';
import { SearchInput } from './SearchInput';
import { ellipsis } from '@/public';

export const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  actions,
  onUpdate,
  title = 'Tabla',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = useMemo(() => {
    if (!columns || !data) return [];
    return data.filter((item) =>
      columns.some(
        (column) =>
          column.type === 'avatar' &&
          item?.[column.key]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, columns, searchTerm]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre"
          />
          {onUpdate && (
            <Button onClick={onUpdate} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="border  rounded-lg overflow-hidden">
        <Table className="">
          <TableHeader className="">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium">
                  {column.label}
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="font-medium">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.type === 'avatar' ? (
                      <Avatar
                        src={item?.avatar || ''}
                        name={item[column.key]}
                        email={item.email}
                      />
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <div className="flex space-x-2">
                      {actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          variant="ghost"
                          size="sm"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
