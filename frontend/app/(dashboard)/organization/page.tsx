"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddButton from "@/components/UI/AddButton";
import { Building } from "lucide-react";
import EditDeleteIcon from "@/components/UI/TableCompoents/EditDeleteIcon";
import Table from "@/components/UI/TableCompoents/Table";
import {
  createOrganization,
  getOrganizations,
} from "@/service/API/orgnization.api";
import toast from "react-hot-toast";
import BranchForm from "@/components/branch/BranchForm";
import Modal from "@/components/UI/Modal";

const OrganizationPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();



  //  React Query magic
  const { data, isLoading,error } = useQuery({
    queryKey: ["organizations", page, limit, search],
    queryFn: () => getOrganizations({ page, limit, search }),

    // v5 replacement for keepPreviousData
    placeholderData: (prev) => prev,
    staleTime: 1000 * 30, // 30s cache
    retry:false,
  });

    React.useEffect(() => {
    if (error) {
      toast.error(error.message || "Server error. Please check if server is running.");
    }
  }, [error]);

  const organizations = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const columns = [
    { key: "no", label: "No." },
    {
      key: "logo",
      label: "Logo",
      render: (row: any) => (
        <img
          src={row.logo || "/placeholder.png"}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    { key: "name", label: "Branch Name" },
    { key: "city", label: "City" },
    { key: "contact", label: "Contact" },
    { key: "createdAt", label: "Created At" },
    {
      key: "actions",
      label: "Actions",
      render: () => <EditDeleteIcon />,
    },
  ];

  const addMutation = useMutation({
    mutationFn: createOrganization,

    onSuccess: () => {
      toast.success("Organization added successfully");
      setIsModalOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["organizations"], //  refetch list
      });
    },

    onError: () => {
      toast.error("Failed to add organization");
    },
  });

  const handleAddOrganization = (formData: any) => {
    addMutation.mutate(formData);
  };

  const handleCancel = () => {
if (!addMutation.isPending) {
  setIsModalOpen(false);
}
  };

  const tableData = organizations.map((org: any, index: number) => ({
    ...org,
    no: (page - 1) * limit + index + 1,
  }));

  return (
    <div className="p-2">
      <div className="flex items-start justify-between">
        <h2 className="text-xl md:text-3xl font-semibold">Organization</h2>

        <AddButton
          onClick={() => setIsModalOpen(true)}
          logo={<Building size={30} />}
          btnHeading="Add Organization"
        />
      </div>

      <Table
        title="Organization"
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        search={search}
        onSearchChange={setSearch}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        itemsPerPage={limit}
        onItemsPerPageChange={(v) => {
          setLimit(v);
          setPage(1);
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Add Organization"
        size="lg"
      >
        <BranchForm
          onSubmit={handleAddOrganization}
          onCancel={handleCancel}
          isSubmitting={addMutation.isPending}
        />
      </Modal>
    </div>
  );
};

export default OrganizationPage;
