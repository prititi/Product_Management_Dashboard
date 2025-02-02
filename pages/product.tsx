"use client";
import { Button } from "flowbite-react";
import { LoadingAndError } from "home/src/components/product/LoadingAndError";
import ProductModal from "home/src/components/product/modal/ProductModal";
import { TableContainer } from "home/src/components/table/containers/TableContainer";
import { useModalState } from "home/src/hooks/useModalState";
import { useProductTable } from "home/src/hooks/useProductTable";
import { useProducts } from "home/src/hooks/useProducts";
import type { Product } from "home/src/types/types";
import { API_HOST } from "home/src/utils/constants";

const Product = () => {
  const { data = [], error, isLoading } = useProducts();
  const { open, editData, handleModalState, handleSetEditData } = useModalState();

  const table = useProductTable({ data, API_HOST, handleSetEditData, handleModalState });

  return (
    <ProtectedRoute>
      <Component />
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6">
        <Button onClick={() => handleModalState(true)} className="mb-4">
          Add Product
        </Button>
        <ProductModal open={open} editMode={!!editData} editData={editData} handleModalState={handleModalState} />
        <LoadingAndError isLoading={isLoading} error={error} />
        {!isLoading && !error && (
          <div className="w-full overflow-x-auto shadow-md rounded-lg bg-white p-4">
            <TableContainer table={table} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Product;

import { Navbar } from "flowbite-react";
import ProtectedRoute from "home/src/components/ProtectedRoute";
import { useAuth } from "home/src/context/AuthContext";
import Link from "next/link";

export function Component() {
  const { isAuthenticated } = useAuth();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/window.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link href="/">
          <Button>{isAuthenticated ? "Logout" : "Login"}</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
