"use client";

import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination as PaginationComponent } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  // TODO - as usual, move store stuff out of here
  const { setPage, setPageSize, setPagination, pagination } =
    usePaginationStore((state) => ({
      setPage: state.setPage,
      setPageSize: state.setPageSize,
      setPagination: state.setPagination,
      pagination: state.pagination,
    }));
  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  // from where to start the cards, for example, if pageNumber is 1,
  // we start from 0, if page number is 2, we skip the pageSize number of records
  const start = (pageNumber - 1) * pageSize + 1;

  // we use .min, because totalCount can be less that pageNumber*pageSize,
  // so we'd want the smaller number
  const end = Math.min(pageNumber * pageSize, totalCount);

  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  const handleChangePageSize = (size: number) => {
    // move to usePaginationStore ??

    setPageSize(size);

    params.set("pageSize", size.toString());
    router.replace(`${pathname}?${params}`);
  };

  const handleSetPage = (pageNumber: number) => {
    // move to usePaginationStore ??
    setPage(pageNumber);

    params.set("pageNumber", pageNumber.toString());
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>{resultText}</div>
        <PaginationComponent
          total={totalPages}
          color="secondary"
          page={pageNumber}
          variant="bordered"
          onChange={handleSetPage}
        />
        <div className="flex gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => {
            return (
              <div
                onClick={() => handleChangePageSize(size)}
                key={size}
                className={clsx("page-size-box", {
                  "bg-secondary text-white hover:bg-secondary hover:text-white":
                    pageSize === size,
                })}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
