import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { Modal, Button } from "flowbite-react";
import FormInput from "./FormInput";

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AddProductsProps {
  open: boolean;
  editMode: boolean;
  editData: Product | null;
  handleClose : () => void;
}

const AddProducts: React.FC<AddProductsProps> = ({ open,handleClose,  editMode, editData }) => {
  const { data: products, error } = useSWR("http://localhost:8080/products", fetcher);


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
        await fetch(`http://localhost:8080/products/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // POST request to create a new product
        await fetch("http://localhost:8080/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      // Revalidate the products list cache
      mutate("http://localhost:8080/products");
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
              label="Title"
              name="title"
              type="text"
              placeholder="Enter the product title"
              register={register}
              required={true}
              errors={errors.title}
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              placeholder="Enter the product price"
              register={register}
              required={true}
              errors={errors.price}
            />
            <div className="relative">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
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
            />
            <FormInput
              label="Image URL"
              name="image"
              type="text"
              placeholder="Enter product image URL"
              register={register}
              required={true}
              errors={errors.image}
            />
            <FormInput
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
              register={register}
              required={true}
              errors={errors.quantity}
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
