/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, flexRender } from "@tanstack/react-table";
import type { Product, TableProps } from "home/src/types";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TableBody } from "./TableBody";
import { TableHeaders } from "./TableHeaders";
import { useColumns } from "./useColumns";
import React from "react";


  /* eslint-disable @typescript-eslint/no-explicit-any */
  const DefaultColumn: Partial<ColumnDef<Product>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
    },
  };

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const Table = ({ data }: TableProps) => {
  const columns = useColumns();



  const table = useReactTable({
    data,
    columns,
    defaultColumn: DefaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: any, columnId: any, value: any) => {
        console.log(rowIndex, columnId, value);
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex]!,
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
      },
    },
  });
  return (
    <table>
      <TableHeaders table={table} flexRender={flexRender} />
      <TableBody table={table} flexRender={flexRender} />
    </table>
  );
};
