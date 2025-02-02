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

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface PaginationProps<T> {
  table: Table<T>;
}

export type DeleteButtonProps = {
  id: string;
  apiUrl: string;
};
