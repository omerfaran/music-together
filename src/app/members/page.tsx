import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

// We can name the function MembersPage however we want (it's default), but that's his convention
export default function MembersPage() {
  return (
    <div>
      <h3 className="text-3xl">This will be members page</h3>
      <Button as={Link} href="/" variant="flat" color="primary">
        Home
      </Button>
    </div>
  );
}
