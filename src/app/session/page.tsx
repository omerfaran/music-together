import { auth, signOut } from "@/auth";
import ClientSession from "@/components/ClientSession";
import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import { FC } from "react";
import { FaRegSmile } from "react-icons/fa";

// By having this function as async, we're converting this component to a server side component!
// It's not a client side anymore now, therefore we can use the await auth() here which works on a server, and therefore we need the form for a
// button click...

interface HomePageProps {
  session: Session | null;
}

export const HomePage: FC<HomePageProps> = ({ session }) => {
  return (
    <div className="flex flex-grow justify-around mt-20 gap-6">
      <div className="bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
        <h3>Server sessions data:</h3>
        {session ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        ) : (
          <div>not signed in</div>
        )}
      </div>
      <ClientSession />
    </div>
  );
};

export default async function Page() {
  const session = await auth();

  return <HomePage session={session} />;
}
