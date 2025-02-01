import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "home/src/types";

const columnHelper = createColumnHelper<Product>();

export const getTitleColumn = () =>
  columnHelper.accessor("title", {
    cell: (info) => info.getValue()?.split(" ").slice(0, 5).join(" ") + "...",
    footer: (info) => info.column.id,
  });

export const getPriceColumn = () =>
  columnHelper.accessor((row) => row.price, {
    id: "price",
    cell: (info) => info.getValue().toFixed(2),
    header: () => <span>Price</span>,
    footer: (info) => info.column.id,
  });

export const getDescriptionColumn = () =>
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) => info.renderValue()?.split(" ").slice(0, 5).join(" ") + "...",
    footer: (info) => info.column.id,
  });

export const getCategoryColumn = () =>
  columnHelper.accessor("category", {
    header: () => <span>Category</span>,
    footer: (info) => info.column.id,
  });

export const useColumns = () => [getTitleColumn(), getPriceColumn(), getDescriptionColumn(), getCategoryColumn()];
