"use client";

import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";



type Props = {
  label?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
};

const MultiTagInput: React.FC<Props> = ({
  label,
  values,
  onChange,
  placeholder = "Enter value...",
  error,
}) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const val = input.trim();
    if (!val || values.includes(val)) return;

    onChange([...values, val]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((v) => v !== tag));
  };

  return (
    <div className="space-y-2">
      {label && <label className="font-medium">{label}</label>}

      <div
        className={` relative border rounded-lg p-2 flex flex-wrap gap-2 min-h-[44px]
          ${error ? "border-red-500" : ""}
        `}
      >
        {values.map((tag) => (
          <span
            key={tag}
            className="bg-main-primary/80 text-secondary px-3 py-1 rounded-md flex items-center gap-2 text-sm"
          >
            {tag}
            <FaTimes
              className="cursor-pointer text-xs"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}

        <input
              className="flex-grow basis-[80px] min-w-[60px] outline-none"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />

        <button
          type="button"
          onClick={addTag}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2
                 text-main-primary  text-lg font-bold"
        >
          <FaPlus />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default MultiTagInput;
