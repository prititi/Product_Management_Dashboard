import React from "react";
import { Modal } from "flowbite-react";
import ProductForm from "../form/ProductForm";
import { Product } from "../../../types/types";

interface ProductModalProps {
  open: boolean;
  editMode: boolean;
  editData: Product | null;
  handleModalState: (open: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, handleModalState, editMode, editData }) => {
  return (
    <div className="p-4">
      <Modal show={open} onClose={() => handleModalState(false)}>
        <Modal.Header>{editMode ? "Edit Product" : "Add New Product"}</Modal.Header>
        <Modal.Body>
          <ProductForm open={open} handleModalState={handleModalState} editMode={editMode} editData={editData} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductModal;
