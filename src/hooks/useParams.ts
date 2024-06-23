import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const useParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`${pathname}?${params}`);
  };

  return { setParams };
};
