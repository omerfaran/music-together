import { Spinner } from "./Spinner";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
};

export default {
  title: "UI / Spinner",
  component: Spinner,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {
  args: {},
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const SuccessColor: Story = {
  args: {
    color: "success",
  },
};
