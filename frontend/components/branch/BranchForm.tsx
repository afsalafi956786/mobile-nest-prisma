'use client'

import React, { useRef, useState } from 'react'
import { FaTimes, FaUpload } from 'react-icons/fa';
import FormButtons from '../UI/FormButtons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormValues, Organization } from '@/types/organization.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiFetch } from '@/service/api';
import toast, { useToaster } from 'react-hot-toast';
import Input from '../UI/Input';
import { useMutation } from '@tanstack/react-query';

const branchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  contact: yup.string().required("Contact number required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  address: yup.string().required("Address is required"),
  logo: yup.string().optional().nullable()
})


type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<Organization>;
};


const BranchForm : React.FC<Props> = (
  {
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData = {},
  }
) => {

      const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData.logo ?? null
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
     resolver: yupResolver(branchSchema) as any,
      defaultValues: {
      name: initialData.name || '',
      contact: initialData.contact || '',
      email: initialData.email || '',
      city: initialData.city || '',
      state: initialData.state || '',
      address: initialData.address || '',
      logo: initialData.logo || null,
    },
    mode: "onChange",
  });


  const uploadMutation = useMutation({
  mutationFn: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return apiFetch.post("/upload", fd); // your API call
  },
  onSuccess: (res: any) => {
    setLogoPreview(res.url);
    setValue("logo", res.url);
    toast.success("Logo uploaded successfully");
  },
  onError: (err: any) => {
    toast.error(err.message || "Upload failed");
  },
});

    /* Upload logo instantly */
      const handleLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
  if (!file) return;

  uploadMutation.mutate(file);

  };

 /* Submit */

   const submit : SubmitHandler<FormValues> = (data) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
      fd.append(key, String(value));
    }
    });

    onSubmit(fd);
  };



  return (
     <form  onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branch Information */}
        <Input
          type="text"
          label="Branch Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter branch name"
          required
        />

        {/* // logo upload here  */}
         <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {logoPreview ? (
              <img src={logoPreview} className="w-full h-full object-cover" />
            ) : (
              <FaUpload />
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={handleLogoChange}
          />
        </div>

        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter email address"
          required
        />

        <Input
          label="Contact Number"
          type="number"
          {...register("contact")}
          error={errors.contact?.message}
          placeholder="Enter contact number"
          required
        />

         <Input
          label="City"
          type="text"
          {...register("city")}
          error={errors.city?.message}
          placeholder="Enter City"
          required
        />

         <Input
          type="text"
          label="State"
          {...register("state")}
          error={errors.state?.message}
          placeholder="Enter State"
          required
        />
      </div>



      {/* Address Information */}
        <Input
          type="text"
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          placeholder="Enter full address"
          required
        />

      <FormButtons
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitText="Save"
        submitDisabled={!isValid}
      />
    </form>
  )
}

export default BranchForm
