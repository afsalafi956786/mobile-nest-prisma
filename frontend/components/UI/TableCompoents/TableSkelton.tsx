"use client";

import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

interface Props {
  columns: number;
  rows?: number;
}

const TableSkeleton: React.FC<Props> = ({
  columns,
  rows = 6,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-grey">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-3 py-4">
              <Skeleton className="h-4 w-full rounded-md" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
