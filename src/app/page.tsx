import { auth } from "@/auth";
import { JobPostForm } from "@/components/JobPostForm/JobPostForm";
import { Button } from "@/components/ui";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { GiMatchTip } from "react-icons/gi";

// By having this function as async, we're converting this component to a server side component!
// It's not a client side anymore now, therefore we can use the await auth() here which works on a server, and therefore we need the form for a
// button click...

interface HomePageProps {
  session: Session | null;
}

export const HomePage: FC<HomePageProps> = ({ session }) => {
  // TODO - outsource to a component. This page should only render whatever needs to be in home page
  return (
    <div className="flex flex-col flex-grow justify-center items-center mt-20 gap-6 text-secondary">
      <GiMatchTip size={100} />
      <h1 className="text-4xl font-bold">Welcome to NextMatch</h1>
      <JobPostForm />
      {session ? (
        <Button
          as={Link}
          href="/members"
          size="lg"
          color="secondary"
          variant="bordered"
        >
          Continue
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button
            as={Link}
            href="/login"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href="/register"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default async function Page() {
  const session = await auth();

  return <HomePage session={session} />;
}
