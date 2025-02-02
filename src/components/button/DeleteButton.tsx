import { Button, Modal } from "flowbite-react";
import { useDeleteProduct } from "home/src/hooks/product/useDeleteProduct";
import { DeleteButtonProps } from "home/src/types/types";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, apiUrl }) => {
  const { deleteData, loading } = useDeleteProduct(apiUrl);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (!loading) {
      deleteData(id);
      setOpen(false);
    }
  };
  return (
    <>
      <MdDelete
        className={`text-red-500 h-5 w-5 hover:text-red-700 cursor-pointer ${
          loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
        onClick={() => setOpen(true)}
      />
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>Are you sure you want to delete this item? This action cannot be undone.</Modal.Body>
        <div className="flex justify-center p-4 gap-4">
          <Button
            color="gray"
            onClick={() => setOpen(false)}
            className="hover:bg-gray-200 border-gray-300 rounded-md text-sm"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            disabled={loading}
            className="hover:bg-red-600 border-red-500 rounded-md text-sm"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
