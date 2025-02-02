import { flexRender } from "@tanstack/react-table";
import { TableHeaders } from "../components/TableHeaders";
import { TableBody } from "../layouts/TableBody";
import type { Table } from "@tanstack/react-table";

interface TableContainerProps<T> {
  table: Table<T>;
}

export const TableContainer = <T,>({ table }: TableContainerProps<T>) => {
  return (
    <div className="overflow-x-auto w-full ">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <TableHeaders table={table} flexRender={flexRender} />
        <TableBody table={table} flexRender={flexRender} />
      </table>
    </div>
  );
};
