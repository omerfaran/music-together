import { Divider } from "./Divider";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Divider> = {
  component: Divider,
};

export default {
  title: "UI / Divider",
  component: Divider,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Divider>;

export const Basic: Story = {
  args: {},
};

export const WithTailwindClass: Story = {
  args: {
    ...Basic.args,
    className: "bg-red-500",
  },
};
