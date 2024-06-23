import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const useParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [params, setParamsState] = useState(new URLSearchParams(searchParams));

  const setParams = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(params);
    updatedParams.set(key, value);
    setParamsState(updatedParams);
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  return { setParams };
};
