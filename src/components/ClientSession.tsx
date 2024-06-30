"use client";

import { useSession } from "next-auth/react";

export const ClientSession = () => {
  const session = useSession();
  return (
    <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
      {" "}
      <h3>Client sessions data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>not signed in</div>
      )}
    </div>
  );
};

export default ClientSession;
