import { CellContext } from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";

interface EditableCellProps<TData, TValue> extends CellContext<TData, TValue> {}

import { TextInput } from "flowbite-react";

import * as yup from "yup";

const getValidationSchema = (columnId: string) => {
  if (columnId === "price" || columnId === "stockQuantity") {
    return yup
      .number()
      .typeError("This field must be a number")
      .required("This field is required")
      .positive("Value must be greater than 0")
      .min(0, "Value cannot be negative");
  }

  return yup
    .string()
    .required("This field is required")
    .min(3, "Minimum length is 3")
    .max(100, "Maximum length is 100");
};

interface EditableCellProps<TData, TValue> {
  getValue: () => TValue;
  row: any;
  column: any;
  table: any;
}

const EditableCell = <TData, TValue>({ getValue, row, column, table }: EditableCellProps<TData, TValue>) => {
  const initialValue = getValue() as string | number;
  const [value, setValue] = useState<string | number>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const saveValue = () => {
    const schema = getValidationSchema(column.id);
    schema
      .validate(value)
      .then(() => {
        table.options.meta?.updateData(row.index, column.id, value);
        setIsEditing(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const cancelEdit = () => {
    setValue(initialValue);
    setIsEditing(false);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      saveValue();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <div>
      <TextInput
        ref={inputRef}
        type={typeof value === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={saveValue}
        onKeyDown={handleKeyDown}
        className="w-full border focus:ring focus:ring-blue-500"
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>} 
    </div>
  ) : (
    <div
      className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
      onClick={() => setIsEditing(true)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
    >
      {value}
    </div>
  );
};

export default EditableCell;
