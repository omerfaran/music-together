// Name matters here! Next will catch any unhandled error and display it in this component

"use client";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui";

import { BiSolidError } from "react-icons/bi";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const cardHeader = (
    <div className="flex flex-col items-center justify-center">
      <BiSolidError size={30} />
      <h1 className="text-3xl font-semibold">Error</h1>
    </div>
  );

  const cardFooter = (
    <div className="flex justify-center">
      <Button onClick={reset} color="secondary" variant="bordered">
        Try again
      </Button>
    </div>
  );

  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto" header={cardHeader} footer={cardFooter}>
        <div className="flex justify-center text-danger">{error.message}</div>
      </Card>
    </div>
  );
}
