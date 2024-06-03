import { Spinner } from "@nextui-org/react";
import React, { FC } from "react";

interface LoadingComponentProps {
  label?: string;
}

export const LoadingComponent: FC<LoadingComponentProps> = ({ label }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={label ?? "Loading..."}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
};
