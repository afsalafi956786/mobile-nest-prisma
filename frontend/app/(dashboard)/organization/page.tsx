"use client";

import React from "react";
import AddButton from "@/components/UI/AddButton";

const OrganizationPage = () => {
  return (
    <div className="p-2">

      {/* Header Row */}
      <div className="flex items-start justify-between">

        {/* Left side (Heading + Breadcrumbs stacked) */}
        <div className="flex flex-col gap-1">

          {/* Heading FIRST */}
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Organization
          </h2>

          {/* Breadcrumbs UNDER heading */}
          <div className="text-sm text-text-secondary">
            Dashboard
            <span className="mx-2">/</span>
            <span className="text-text-primary font-medium">
              Organization
            </span>
          </div>
        </div>

        {/* Right side button */}
        <AddButton
          logo="+"
          btnHeading="Add Organization"
        />
      </div>

      {/* spacing for future table */}
      <div className="mt-6">
        {/* Table will come here later */}
      </div>

    </div>
  );
};

export default OrganizationPage;
