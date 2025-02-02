import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { Modal, Button } from "flowbite-react";
import FormInput from "./FormInput";
import { API_HOST } from "../constants";
import { Product } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AddProductsProps {
  open: boolean;
  editMode: boolean;
  editData: Product | null;
  handleClose: () => void;
}

const AddProducts: React.FC<AddProductsProps> = ({ open, handleClose, editMode, editData }) => {
  const { data: products, error } = useSWR(API_HOST, fetcher);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  // Prepopulate the form if in edit mode
  useEffect(() => {
    if (editMode && editData) {
      reset(editData); // Prepopulate form fields with the existing data
    }
  }, [editMode, editData, reset]);

  const onSubmit = async (formData: Product) => {
    try {
      if (editMode) {
        // PUT request to update the product
        await fetch(`${API_HOST}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // POST request to create a new product
        await fetch(API_HOST, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      // Revalidate the products list cache
      mutate(API_HOST);
      handleClose();
      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  if (error) return <p className="text-red-500">Failed to load products</p>;
  if (!products) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>{editMode ? "Edit Product" : "Add New Product"}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Name"
              name="name"
              type="text"
              placeholder="Enter the product Name"
              register={register}
              required={true}
              errors={errors.name}
              className="dark:text-white"
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              placeholder="Enter the product price"
              register={register}
              required={true}
              errors={errors.price}
               className="dark:text-white"
            />
            <div className="relative">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-white">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                placeholder="Enter a product description"
                className={`w-full mt-2 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.description && <p className="text-sm text-red-500 mt-1">Description is required</p>}
            </div>
            <FormInput
              label="Category"
              name="category"
              type="text"
              placeholder="Enter product category"
              register={register}
              required={true}
              errors={errors.category}
               className="dark:text-white"
            />
            <FormInput
              label="Image URL"
              name="image"
              type="text"
              placeholder="Enter product image URL"
              register={register}
              required={true}
              errors={errors.image}
               className="dark:text-white"
            />
            <FormInput
              label="Quantity"
              name="stockQuantity"
              type="number"
              placeholder="Enter product quantity"
              register={register}
              required={true}
              errors={errors.stockQuantity}
               className="dark:text-white"
            />
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              {editMode ? "Update" : "Submit"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProducts;
