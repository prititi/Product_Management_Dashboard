import React, { useState, useEffect, useRef } from "react";
import { CellContext } from "@tanstack/react-table";

interface EditableCellProps<TData, TValue> extends CellContext<TData, TValue> {}

const EditableCell = <TData, TValue>({ getValue, row, column, table }: EditableCellProps<TData, TValue>) => {
  const initialValue = getValue() as string | number;
  const [value, setValue] = useState<string | number>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const saveValue = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setValue(initialValue);
    setIsEditing(false);
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
    <input
      ref={inputRef}
      type={typeof value === "number" ? "number" : "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={saveValue}
      onKeyDown={handleKeyDown}
      className="border p-1 w-full focus:ring focus:ring-blue-500"
    />
  ) : (
    <div
      className="cursor-pointer p-1 hover:bg-gray-100"
      onClick={() => setIsEditing(true)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
    >
      {value}
    </div>
  );
};

export default EditableCell;
