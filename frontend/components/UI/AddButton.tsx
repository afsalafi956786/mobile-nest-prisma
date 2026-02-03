import React from "react";

type Props = {
  logo?: React.ReactNode;
  btnHeading?: string;
  onClick?: () => void;
};



const AddButton = ({ logo, btnHeading, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="bg-main-primary rounded-md p-3 cursor-pointer hover:bg-main-hover-primary transition"
      >
        <span className="text-white text-lg font-bold">{logo}</span>
      </button>

      <p className="text-sm font-bold text-main-primary mt-1">
        {btnHeading}
      </p>
    </div>
  );
};

export default AddButton;
