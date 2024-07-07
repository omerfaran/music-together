// "use client";

// import { useMessagesStore } from "@/hooks/useMessagesStore";
// import { NavbarItem, type NavbarItemProps } from "@nextui-org/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { type FC } from "react";

// interface NavLinkProps {
//   href: JSX.IntrinsicElements["a"]["href"];
//   label: NavbarItemProps["children"];
// }

// export const NavLink: FC<NavLinkProps> = ({ href, label }) => {
//   const pathname = usePathname();
//   const { unreadCount } = useMessagesStore((state) => ({
//     unreadCount: state.unreadCount,
//   }));

//   return (
//     <NavbarItem isActive={href === pathname} href={href} as={Link}>
//       <span>{label}</span>
//       {href === "/messages" && unreadCount > 0 && (
//         <span className="ml-1">({unreadCount})</span>
//       )}
//     </NavbarItem>
//   );
// };
