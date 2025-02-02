"use client";
import { useMemo, useState } from "react";
import { Button, Navbar, TextInput, Select } from "flowbite-react";
import { LoadingAndError } from "home/src/components/product/LoadingAndError";
import ProductModal from "home/src/components/product/modal/ProductModal";
import { TableContainer } from "home/src/components/table/containers/TableContainer";
import { useModalState } from "home/src/hooks/product/useModalState";
import { useProductTable } from "home/src/hooks/product/useProductTable";
import { useProducts } from "home/src/hooks/product/useProducts";
import type { Product } from "home/src/types/types";
import { API_HOST } from "home/src/utils/constants";
import ProtectedRoute from "home/src/components/ProtectedRoute";
import { useAuth } from "home/src/hooks/auth/useAuth";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Pagination } from "home/src/components/table/components/Pagination";
import Image from "next/image";

const Product = () => {
  const { data = [], error, isLoading } = useProducts();
  const { open, editData, handleModalState, handleSetEditData } = useModalState();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)));
    return ["All Categories", ...uniqueCategories];
  }, [data]);

  const filteredData = useMemo(
    () =>
      data.filter(
        (product: Product) =>
          (categoryFilter === "All" || categoryFilter === "" || product.category === categoryFilter) &&
          (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [data, searchQuery, categoryFilter]
  );

  const table = useProductTable({ data: filteredData, API_HOST, handleSetEditData, handleModalState });

  return (
    <ProtectedRoute>
      <CustomNavbar />
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-6 space-y-4 sm:space-y-0">
          <TextInput
            icon={IoIosSearch}
            placeholder="Search product or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-md"
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:max-w-xs"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Button onClick={() => handleModalState(true)}>
            <IoMdAddCircleOutline className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </div>

        <ProductModal open={open} editMode={!!editData} editData={editData} handleModalState={handleModalState} />
        <LoadingAndError isLoading={isLoading} error={error} />

        {!isLoading && !error && (
          <div className="w-full overflow-x-auto bg-white">
            {filteredData.length === 0 ? (
              <div className="flex items-center justify-center h-[40vh] text-gray-500">No data found.</div>
            ) : (
              <TableContainer table={table} />
            )}
          </div>
        )}

        <Pagination table={table} />
      </div>
    </ProtectedRoute>
  );
};

export default Product;

export function CustomNavbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <img src="/productLogo.svg" className="mr-3 md:h-14 h-12 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
