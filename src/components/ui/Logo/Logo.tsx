import { FC } from "react";
import { AiFillAlert } from "react-icons/ai";

interface LogoProps {}

export const Logo: FC<LogoProps> = ({}) => {
  return (
    <div className="flex items-center">
      <AiFillAlert size={40} className="text-gray-200" />
      <div className="font-bold text-3xl flex">
        <span className="text-gray-900">Next</span>
        <span className="text-gray-200">Match</span>
      </div>
    </div>
  );
};
