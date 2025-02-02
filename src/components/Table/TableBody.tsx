import { TableBodyHeaderProps } from "../../types";

export const TableBody = <T,>({ table, flexRender }: TableBodyHeaderProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
