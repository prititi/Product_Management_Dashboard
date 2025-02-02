import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DeleteButton } from "../components/button/DeleteButton";
import { Product } from "../types/types"; // Adjust path as needed

type UseColumnsProps = {
  handleSetEditData: (product: Product) => void;
  handleModalState: (open: boolean) => void;
  API_HOST: string;
};

export const useColumns = ({ handleSetEditData, handleModalState, API_HOST }: UseColumnsProps) => {
  return React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "Products",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "name",
            header: "Name",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "price",
            header: "Price",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "category",
            header: "Category",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "stockQuantity",
            header: "Quantity",
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
                      handleSetEditData(info.row.original);
                      handleModalState(true);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton id={info.row.original.id} apiUrl={API_HOST} />
                </div>
              );
            },
          },
        ],
      },
    ],
    [handleSetEditData, handleModalState, API_HOST]
  );
};
