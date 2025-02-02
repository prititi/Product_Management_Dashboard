// import { Table } from "home/src/components/Table";

// function Product() {
//

//   if (error) return <div>Error loading data</div>;
//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-2">
//       <Table data={data} />
//       <div className="h-4" />
//     </div>
//   );
// }

// export default Product;
"use client";

import React from "react";
import useSWR, { useSWRConfig } from "swr";
import type { Product } from "home/src/types";

import {
  // Column,
  // Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { API_HOST } from "home/src/constants";
import AddProducts from "home/src/components/AddProducts";

import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "flowbite-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const DefaultColumn: Partial<ColumnDef<Product>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue);
    const [isEditing, setIsEditing] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const saveValue = () => {
      table.options.meta?.updateData(index, id, value);
      setIsEditing(false);
    };

    const cancelEdit = () => {
      setValue(initialValue);
      setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Tab") {
        saveValue();
      } else if (e.key === "Escape") {
        cancelEdit();
      }
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);

    return isEditing ? (
      <input
        ref={inputRef}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={saveValue}
        onKeyDown={handleKeyDown}
        className="border p-1 w-full"
      />
    ) : (
      <div
        className="cursor-pointer p-1"
        onClick={() => setIsEditing(true)}
        onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
        tabIndex={0}
      >
        {value as string}
      </div>
    );
  },
};

function Product() {
  const { data = [], error, isLoading } = useSWR(API_HOST);
  const { mutate } = useSWRConfig();
  const [editData, setEditData] = React.useState<Product | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "Products",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "title",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "price",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "description",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "category",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "quantity",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "Actions",
            footer: (props) => props.column.id,
            cell: (info) => {
              return (
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                      console.log("Edit", info.row.original);

                      setEditData(info.row.original);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={async () => {
                      console.log("Delete", info.row.original);
                      try {
                        const response = await fetch(`${API_HOST}/${info.row.original.id}`, {
                          method: "DELETE",
                        });
                        if (!response.ok) {
                          throw new Error("Failed to delete data");
                        }
                        // Fetch the updated data from the API
                        mutate(API_HOST);
                      } catch (error) {
                        console.error("Error deleting data:", error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            },
          },
          // {
          //   accessorFn: (row) => row.lastName,
          //   id: "lastName",
          //   header: () => <span>Last Name</span>,
          //   footer: (props) => props.column.id,
          // },
        ],
      },
      // {
      //   header: "Info",
      //   footer: (props) => props.column.id,
      //   columns: [
      //     {
      //       accessorKey: "age",
      //       header: () => "Age",
      //       footer: (props) => props.column.id,
      //     },
      //     {
      //       header: "More Info",
      //       columns: [
      //         {
      //           accessorKey: "visits",
      //           header: () => <span>Visits</span>,
      //           footer: (props) => props.column.id,
      //         },
      //         {
      //           accessorKey: "status",
      //           header: "Status",
      //           footer: (props) => props.column.id,
      //         },
      //         {
      //           accessorKey: "progress",
      //           header: "Profile Progress",
      //           footer: (props) => props.column.id,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    []
  );

  // const [data, setData] = React.useState(() => makeData(1000));

  const table = useReactTable({
    data,
    columns,
    defaultColumn: DefaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: async (rowIndex, columnId, value) => {
        console.log({ rowIndex, columnId, value });
        try {
          const response = await fetch(`${API_HOST}/${data[rowIndex].id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data[rowIndex],
              [columnId]: value,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to update data");
          }
          await response.json();
          // Fetch the updated data from the API
          mutate(API_HOST);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      },
    },
    debugTable: true,
  });

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="h-2" />

      <Button onClick={() => setOpen(true)}>{"Add Product"}</Button>
      <AddProducts open={open} editMode={true} editData={editData} handleClose={handleClose} />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
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
      </table>
      <div className="h-2" />
      {/* <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}
      {/* <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div> */}
    </div>
  );
}
// function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === "number" ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ""}
//         onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ""}
//         onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   );
// }

export default Product;
