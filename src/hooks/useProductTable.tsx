import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Product } from "../types/types";
import { mutate } from "swr";
import { useColumns } from "./useColumns";
import { DefaultColumn } from "../components/table/components/DefaultColumn";

type UseProductTableProps = {
  data: Product[];
  API_HOST: string;
  handleSetEditData: (product: Product) => void;
  handleModalState: (open: boolean) => void;
};

export const useProductTable = ({ data, API_HOST, handleSetEditData, handleModalState }: UseProductTableProps) => {
  const columns = useColumns({ handleSetEditData, handleModalState, API_HOST });
  const table = useReactTable({
    data,
    columns,
    defaultColumn: DefaultColumn,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: async (rowIndex: number, columnId: string, value: any) => {
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
          // Revalidate data with SWR
          mutate(API_HOST);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      },
    },
    // debugTable: true,
  });

  return table;
};
