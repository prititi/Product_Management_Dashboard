import { TableBodyHeaderProps } from "../../../types/types";

export const TableBody = <T,>({ table, flexRender }: TableBodyHeaderProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        const isLowStock = row.original?.stockQuantity < 5;

        return (
          <tr key={row.id} className={`hover:bg-gray-50 ${isLowStock && "bg-red-100"}`}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-700 border-t">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
