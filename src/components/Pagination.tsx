"use client";

import { Pagination as PaginationComponent } from "@nextui-org/react";
import clsx from "clsx";
import React, { useState } from "react";

export const Pagination = () => {
  const [active, setActive] = useState(3);

  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>Showing 1-10 of 23 results</div>
        <PaginationComponent
          total={20}
          color="secondary"
          initialPage={1}
          variant="bordered"
        />
        <div className="flex gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => {
            return (
              <div
                key={size}
                className={clsx("page-size-box", {
                  "bg-secondary text-white hover:bg-secondary hover:text-white":
                    active === size,
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
