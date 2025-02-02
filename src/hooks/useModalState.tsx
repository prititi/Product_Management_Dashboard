import { useState } from "react";
import type { Product } from "home/src/types/types";

export function useModalState() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);
  
  const handleModalState = (state: boolean) => {
    if (state === false) {
      setEditData(null);
    }
    setOpen(state);
  };
  const handleSetEditData = (product: Product) => setEditData(product);

  return {
    open,
    editData,
    handleModalState,
    handleSetEditData,
  };
}
