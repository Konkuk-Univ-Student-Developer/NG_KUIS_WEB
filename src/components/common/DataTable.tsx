import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: Record<string, unknown>[];
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, className }) => {
  return (
    <div className={cn('w-full border rounded-lg', className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-lightgray">
            {columns.map((column) => (
              <TableHead key={column.key} className="mobile-extrasmall-bold text-black">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="hover:bg-beige">
              {columns.map((column) => (
                <TableCell key={column.key} className="mobile-extrasmall-regular">
                  {column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
