import { Navbar } from "./Navbar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

export default {
  title: "UI / Navbar",
  component: Navbar,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Navbar>;

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    links: [
      { href: "/members", label: "Matches" },
      { href: "/lists", label: "Lists" },
      { href: "/messages", label: "Messages" },
    ],
    userName: "Haveri",
    userImage: "https://picsum.photos/id/237/200/300",
  },
};

export const NotAuthenticated: Story = {
  args: {
    ...Authenticated.args,
    isAuthenticated: false,
  },
};
