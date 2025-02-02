// components/ProductForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { Product } from "../../../types/types";
import { API_HOST } from "../../../utils/constants";
import { validationSchema } from "../../../utils/schema/validationSchema";
import FormInput from "./FormInput";
import { Button, Spinner } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetch } from "home/src/hooks/api/useFetch";

interface ProductFormProps {
  open: boolean;
  handleModalState: (open: boolean) => void;
  editMode: boolean;
  editData: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, handleModalState, editMode, editData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(validationSchema),
  });

  const { fetchData, loading, error } = useFetch<Product>(API_HOST);

  useEffect(() => {
    if (editMode && editData) {
      reset(editData);
    } else {
      reset({});
    }
  }, [editMode, editData, reset, open]);

  const onSubmit = async (formData: Product) => {
    try {
      await fetchData(editMode ? "PUT" : "POST", formData);
      mutate(API_HOST);
      handleModalState(false);
      reset();
    } catch (err) {
      // console.error("Submission failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Name"
        name="name"
        type="text"
        placeholder="Enter the product Name"
        register={register}
        required={true}
        errors={errors.name}
      />
      <FormInput
        label="Price"
        name="price"
        type="number"
        placeholder="Enter the product price"
        register={register}
        required={true}
        errors={errors.price}
        step="any"
      />
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
        label="Quantity"
        name="stockQuantity"
        type="number"
        placeholder="Enter product quantity"
        register={register}
        required={true}
        errors={errors.stockQuantity}
      />
      <div className="flex gap-2">
        <Button onClick={() => handleModalState(false)} className="w-full">
          Discard
        </Button>
        <Button type="submit" className="w-full">
          {loading && <Spinner aria-label="Spinner button example" size="sm" />}
          {loading ? (
            <span className="pl-3">{editMode ? "Updating..." : "Creating..."}</span>
          ) : editMode ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
