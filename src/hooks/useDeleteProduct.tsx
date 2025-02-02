import { useState } from "react";
import { mutate } from "swr";

export function useDeleteProduct(apiUrl: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      mutate(apiUrl);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Error deleting data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
}
