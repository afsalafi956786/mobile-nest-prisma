"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserBranch } from "@/service/API/orgnization.api";
import Dropdown from "../UI/Dropdown";


const BranchSelectWrapper = ({ value, onChange, error }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["branches-all"],
    queryFn: getUserBranch,
  });

  const options =
    data?.data?.map((b: any) => ({

      
      label: b.name,
      value: b.id,
    })) ?? [];

  return (
    <Dropdown
      label="Select Branch"
      options={options}
      value={value}
      onChange={onChange}
      loading={isLoading}
      error={error}
      multiple= {true}
    />
  );
};

export default BranchSelectWrapper;
