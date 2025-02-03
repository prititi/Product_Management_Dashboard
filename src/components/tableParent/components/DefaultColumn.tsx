import { ColumnDef } from "@tanstack/react-table";
import EditableCell from "./EditableCell";
import { Product } from "home/src/types/types";


export const DefaultColumn: Partial<ColumnDef<Product>> = {
  cell: (props) => <EditableCell {...props} />,
};
