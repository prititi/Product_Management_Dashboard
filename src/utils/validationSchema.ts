import * as yup from "yup";
export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .transform((val, orig) => (orig == "" ? undefined : val))
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a valid number"),
  category: yup.string().required("Category is required"),
  stockQuantity: yup
    .number()
    .transform((val, orig) => (orig == "" ? undefined : val))
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .typeError("Quantity must be a valid number"),
});
