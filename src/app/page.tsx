import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

// By having this function as async, we're converting this component to a server side component!
// It's not a client side anymore now, therefore we can use the await auth() here which works on a server, and therefore we need the form for a
// button click...
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-3xl">Home page</h1>
      <h3>User sessions data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="solid"
              radius="full"
              startContent={<FaRegSmile />}
            >
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>not signed in</div>
      )}
    </div>
  );
}
