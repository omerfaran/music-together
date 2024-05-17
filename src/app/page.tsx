"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Home page</h1>
      <Button
        as={Link}
        href="/members"
        color="primary"
        variant="solid"
        radius="full"
        startContent={<FaRegSmile />}
      >
        Members page
      </Button>
    </div>
  );
}
