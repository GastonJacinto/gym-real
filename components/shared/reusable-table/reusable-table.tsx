'use client';
import type React from 'react';
import { useState, useMemo } from 'react';
import type { ReusableTableProps } from '../../../types/table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, RefreshCw } from 'lucide-react';
import { SearchInput } from '../../SearchInput';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Avatar } from '@/components/avatar';
import { RoleSelector } from './components';
import { Roles } from '@/types/db-types';

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
                    ) : column.key == 'role' ? (
                      <RoleSelector role={item[column.key] as Roles} />
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {actions.map((action, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={
                              action.type === 'delete'
                                ? 'text-red-600 cursor-pointer gap-x-2'
                                : 'cursor-pointer gap-x-2'
                            }
                          >
                            {action.icon && (
                              <action.icon className="mr-2 h-4 w-4" />
                            )}
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
