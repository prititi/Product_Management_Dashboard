import { Table } from "@tanstack/react-table";

export type Product = {
  // id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export interface TableProps {
  data: Product[];
}


export interface TableBodyHeaderProps<T> {
  table: Table<T>;
  flexRender: (header: any, context: any) => React.ReactNode;
}
