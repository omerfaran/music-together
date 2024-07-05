import { FaRadiation } from "react-icons/fa";
import { Dropdown } from "./Dropdown";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default {
  title: "UI / Dropdown",
  component: Dropdown,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {
    trigger: <FaRadiation size={20} />,
    items: [
      { label: "Edit Profile", href: "/members/edit" },
      {
        label: "Logout",
        color: "danger",
        onClick: () => console.log("Clicked to logout"),
      },
    ],
  },
};

export const WithHeader: Story = {
  args: {
    ...Basic.args,
    header: "This is the header",
  },
};
