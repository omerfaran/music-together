import { FC } from "react";
import { Spinner } from "./ui";

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
