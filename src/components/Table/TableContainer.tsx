import { flexRender } from "@tanstack/react-table";
import { TableHeaders } from "./TableHeaders";
import { TableBody } from "./TableBody";
import type { Table } from "@tanstack/react-table";

interface TableContainerProps<T> {
  table: Table<T>;
}

export const TableContainer = <T,>({ table }: TableContainerProps<T>) => {
  return (
    <table className="w-full border border-gray-300">
      <TableHeaders table={table} flexRender={flexRender} />
      <TableBody table={table} flexRender={flexRender} />
    </table>
  );
};
