import { useDeleteProduct } from "home/src/hooks/useDeleteProduct";

type DeleteButtonProps = {
  id: string;
  apiUrl: string;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, apiUrl }) => {
  const { deleteData, loading } = useDeleteProduct(apiUrl);

  return (
    <button
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
      onClick={() => deleteData(id)}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};
