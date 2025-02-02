import { Table } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stockQuantity: number;
};

export interface TableProps {
  data: Product[];
}


export interface TableBodyHeaderProps<T> {
  table: Table<T>;
  flexRender: (header: any, context: any) => React.ReactNode;
}
