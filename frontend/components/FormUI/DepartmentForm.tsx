"use client";

import React, { useRef, useState } from "react";
import FormButtons from "../UI/FormButtons";
import * as yup from "yup";
import MultiTagInput from "../UI/MultiTagInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import BranchSelectWrapper from "../wrapper/BranchSelectWrapper";

type FormValues = {
  branchIds: number[];
  departments: string[];
};

const schema = yup.object({
  branchIds: yup
    .array()
    .of(yup.number())
    .min(1, "Select at least one branch")
    .required(),

  departments: yup
    .array()
    .of(yup.string().trim().required())
    .min(1, "Add at least one department")
    .required(),
});

type Props = {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<FormValues>;
};

const DepartmentForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData = {},
}) => {

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      branchIds: initialData.branchIds ?? [],
      departments: initialData.departments ?? [],
    },
  });

  //     React.useEffect(() => {
  //   if (initialData) {
  //     Object.entries(initialData).forEach(([key, value]) => {
  //       setValue(key as keyof FormValues, value as any);
  //     });
  //   }
  // }, [initialData]);

  

  const submit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Branch Information */}

        {/* Branch dropdown */}
        <Controller
          name="branchIds"
          control={control}
          render={({ field }) => (
            <BranchSelectWrapper
              value={field.value || []} 
              onChange={field.onChange}
              error={errors.branchIds?.message}
            />
          )}
        />

        <Controller
          name="departments"
          control={control}
          render={({ field }) => (
            <MultiTagInput
              label="Department"
              values={field.value}
              onChange={field.onChange}
              placeholder="Enter department names..."
              error={errors.departments?.message}
            />
          )}
        />
      </div>

      <FormButtons
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitText="Save"
        submitDisabled={!isValid}
      />
    </form>
  );
};

export default DepartmentForm;
