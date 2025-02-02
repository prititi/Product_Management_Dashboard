import { PaginationProps } from "home/src/types/types";

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const pageLength = [10, 20, 30, 40, 50];

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-4 w-full md:w-[50%]">
      <div className="flex gap-2">
        <button
          className="border rounded px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"} Prev
        </button>
        <button
          className="border rounded px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next {">"}
        </button>
      </div>

      <span className="text-sm sm:text-base">
        Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of <strong>{table.getPageCount()}</strong>
      </span>

      <div className="flex items-center gap-2">
        <span className="text-sm">Go to:</span>
        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-2 rounded w-14 text-center text-sm sm:w-16"
        />
      </div>

      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        className="border p-2 rounded text-sm"
      >
        {pageLength.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
