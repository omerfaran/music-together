import { FC } from "react";
import { auth } from "@/auth";
import { Filters } from "./Filters/Filters";
import { LinkInterface } from "@/types";
import { Navbar } from "../ui/Navbar/Navbar";
import { signOutUser } from "@/app/actions/authActions";

const memberLinks: LinkInterface[] = [
  { href: "/feed", label: "Feed" },
  // { href: "/lists", label: "Lists" },
  { href: "/messages", label: "Messages" },
];

const adminLinks: LinkInterface[] = [
  { href: "/admin/moderation", label: "Photo Moderation" },
];

// this is a server side component (we don't do "use client"), so we're allowed to use async

interface TopNavProps {}

export const TopNav: FC<TopNavProps> = async () => {
  const session = await auth();

  const links = session?.user.role === "ADMIN" ? adminLinks : memberLinks;

  return (
    <>
      <Navbar
        isAuthenticated={!!session?.user}
        links={links}
        userName={session?.user.name ?? undefined}
        userImage={session?.user.image ?? undefined}
        onUserLogout={signOutUser}
      />
      <Filters />
    </>
  );

  //   return (
  //     <>
  //       <Navbar
  //         maxWidth="xl"
  //         className="bg-gradient-to-r from-purple-400 to-purple-700"
  //         classNames={{
  //           item: [
  //             "text-xl",
  //             "text-white",
  //             "uppercase",
  //             "data-[active=true]:text-yellow-500",
  //           ],
  //         }}
  //       >
  //         <NavbarBrand as={Link} href="/">
  //           <AiFillAlert size={40} className="text-gray-200" />
  //           <div className="font-bold text-3xl flex">
  //             <span className="text-gray-900">Next</span>
  //             <span className="text-gray-200">Match</span>
  //           </div>
  //         </NavbarBrand>
  //         <NavbarContent justify="center">
  //           {session &&
  //             links.map(({ href, label }) => {
  //               return <NavLink key={href} href={href} label={label} />;
  //             })}
  //         </NavbarContent>
  //         <NavbarContent justify="end">
  //           {session?.user ? (
  //             <UserMenu user={session.user} />
  //           ) : (
  //             <>
  //               <Button
  //                 as={Link}
  //                 href="/login"
  //                 variant="bordered"
  //                 className="text-white"
  //               >
  //                 Login
  //               </Button>
  //               <Button
  //                 as={Link}
  //                 href="/register"
  //                 variant="bordered"
  //                 className="text-white"
  //               >
  //                 Register
  //               </Button>
  //             </>
  //           )}
  //         </NavbarContent>
  //       </Navbar>
  //       <Filters />
  //     </>
  //   );
};
