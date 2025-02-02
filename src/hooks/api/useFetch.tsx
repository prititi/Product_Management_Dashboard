import { useState } from "react";

export function useFetch<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (method: "POST" | "PUT", data?: T & { id?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const requestUrl = method === "PUT" && data?.id ? `${url}/${data.id}` : url;

      const response = await fetch(requestUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
}
