import { Table } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stockQuantity: number;
};

export interface TableProps {
  data: Product[];
}

export interface TableBodyHeaderProps<T> {
  table: Table<T>;
  flexRender: (header: any, context: any) => React.ReactNode;
}

export interface ProductModalProps {
  open: boolean;
  editMode: boolean;
  editData: Product | null;
  handleModalState: (open: boolean) => void;
}
