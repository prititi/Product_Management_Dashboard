import { TableBodyHeaderProps } from "../../../types/types";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export const TableHeaders = <T,>({ table, flexRender }: TableBodyHeaderProps<T>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-gray-100 border-b">
          {headerGroup.headers.map((header) => {
            const isSortable = header.column.getCanSort() && header.column.columnDef.header !== "Action";
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-900"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`flex items-center space-x-2 ${isSortable ? "cursor-pointer select-none" : ""}`}
                    onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    title={
                      isSortable
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                        : undefined
                    }
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortable && (
                      <span className="text-gray-500 text-sm transition-transform duration-200">
                        {header.column.getIsSorted() === "asc" ? (
                          <GoArrowUp className="text-blue-700 h-3 w-3 ml-1" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <GoArrowDown className="text-blue-700 h-3 w-3 ml-1" />
                        ) : null}
                      </span>
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
