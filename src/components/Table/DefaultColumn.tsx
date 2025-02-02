import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../../types";
import EditableCell from "./EditableCell";

export const DefaultColumn: Partial<ColumnDef<Product>> = {
  cell: (props) => <EditableCell {...props} />,
};
