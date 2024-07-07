import { Logo } from "./Logo";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default {
  title: "UI / Logo",
  component: Logo,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Logo>;

export const Basic: Story = {
  args: {},
};
